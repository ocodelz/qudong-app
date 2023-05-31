<template>
	<view class="lunc-calendar">
		<!-- 头部上下月按钮及月份 -->
		<!-- <view class="header">
			<view class="head-icon head-pre-month" v-show="showChangeBtn" @click="changeMonthOrWeek('prev')"></view>
			<view class="head-month">
				{{data.selDate.year+'年'+(data.selDate.month<10?'0'+data.selDate.month:data.selDate.month)+'月'}}
			</view>
			<view class="head-icon head-next-month" v-show="showChangeBtn" @click="changeMonthOrWeek('next')"></view>
			<view class="go-to-today" v-show="data.showToday" @click="goToday">今</view>
		</view> -->
		<!-- 星期 -->
		<view class="week-area">
			<view class="week-font" v-for="(item, index) in data.weekArr" :key="index ">{{ weekType + '' + item }}
			</view>
		</view>
		<!-- 日历 -->
		<swiper class="calendar-data" :current="data.shrinkType?data.tranCurrent:data.tranIndex" circular
			:duration="data.tranDuration" @change="swiperChange" @animationfinish="swiperEndChange"
			:style="{height:data.shrinkType?'56px':'266px'}">
			<swiper-item class="swiper-item swiper-prev-item" v-for="(a, i) in getAllData" :key="i">
				<!-- <view class="month-bg" v-if="showMonthBg">{{ getMontBg }}</view> -->
				<view class="month-days" :class="data.shrinkType?'item-week':''">
					<view class="week-days" v-for="(b, j) in a" :key="j">
						<view class="day" v-for="(c, k) in b" :key="k" @click="clickDay(c)">
							<view class="day-info">
								<view class="infoof"
									:class="[c.dayClass, getIsSelDay(c)?'is-sel':'', c.dayType!='normal'?'un-month':'']">
									<text class="day-solar">{{ c.day }}</text>
									<template v-if="showLunar || c.sign && c.sign.length > 0">
										<text class="day-tag" v-if="c.sign && c.sign.length > 0"></text>
										<text class="day-sign"
											v-if="c.sign && c.sign.length > 0">{{ c.sign[0].title }}</text>
										<text class="day-lunar">{{c.dayLunar}}</text>
									</template>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- 收缩按钮 -->
		<view class="shrink" v-if="showShrink" @click="changeShrink">
			<!-- <image class="tran1" src="/static/calendar/tran.png" mode=""
				:class="data.shrinkType?'shrink-open':'shrink-close'"></image> -->
			<text class="iconfont shrink-btn" :class="data.shrinkType?'icon-a-Group35516':'icon-a-Group35587'"></text>
		</view>
	</view>
</template>
<script lang="ts" setup>
	/**
	 * author lz
	 * @property {Boolean} showLunar = [true|false] 是否显示农历，默认false
	 * @property {Boolean} showMonthBg = [true|false] 是否显示月份背景，默认true
	 * @property {Boolean} showChangeBtn = [true|false] 是否显示上月下月箭头按钮，默认true
	 * @property {String} firstDayOfWeek = [monday|sunday] 周几为每周的第一天，默认sunday
	 *  @value monday 每周从周一开始(默认)
	 *  @value sunday 每周从周日开始
	 * @property {String} weekType = [''|周|星期] 星期的前缀；如周一周二或星期一星期二，为空则只显示一、二等；不用预设值时可自定义前缀，填的值即为星期前缀；默认周
	 *  @value '' 星期显示：只显示一、二等
	 *  @value 周 星期显示：周一、周二等(默认)
	 *  @value 星期 星期显示：星期一、星期二等
	 * @property {Boolean} weekend = [true|false] 周末标红(周六周日日期用红色字体)，默认true
	 * @property {Boolean} showShrink = [true|false] 是否显示收缩按钮，可显示一周的日期，默认false
	 * @property {String} shrinkState = [week|month] 收缩状态，默认month
	 *  @value week 默认打开显示周数据（收起状态）
	 *  @value month 默认打开显示月数据（展开状态）
	 * @property {Array} signList 标记数组，若当前有多个标记，则显示最后一个，期待格式[{date: '2021-09-10', title: '生日', info: '八月初四张三生日'}]
	 * @event {Function()} dayChange 点击日期触发事件
	 * @event {Function()} monthChange 切换月份触发事件
	 * @event {Function()} shrinkClick 收缩和展开时触发事件
	 */
	import { calendar } from "@/utils/calendar.js"
	import { computed, reactive, onMounted } from "vue";

	/**
	 * @description: 组件参数类型约束
	 * @author lz 2023-05-26
	 */
	interface Props {
		showLunar ?: boolean
		showMonthBg ?: boolean
		showChangeBtn ?: boolean
		firstDayOfWeek ?: string
		weekType ?: string
		weekend ?: boolean
		showShrink ?: boolean
		shrinkState ?: string
		signList ?: Array<any>
	}

	interface DateInfo {
		year : number
		month : number
		day : number
	}

	/**
	 * @description: data数据源类型约束
	 * @author lz 2023-05-25
	 */
	interface MyData {
		weekArr : Array<string>
		today : DateInfo
		selDate : DateInfo
		allMonthList : any
		tranIndex : number
		allWeekList : any
		tranCurrent : number
		tranDuration : number
		signArr : Array<any>
		showToday : boolean
		shrinkType : boolean
		deterChange : boolean
	}

	/**
	 * @description: 组件参数默认值
	 * @author lz 2023-05-26
	 */
	const props = withDefaults(defineProps<Props>(), {
		showLunar: false,
		showMonthBg: true,
		showChangeBtn: true,
		firstDayOfWeek: "sunday",
		weekType: "周",
		weekend: true,
		showShrink: false,
		shrinkState: "month",
		signList: () => []
	})

	const data = reactive<MyData>({
		weekArr: ["日", "一", "二", "三", "四", "五", "六"],
		today: {
			year: 0,
			month: 0,
			day: 0
		},
		selDate: {
			year: 0,
			month: 0,
			day: 0
		},
		allMonthList: [],
		tranIndex: 1,
		allWeekList: [],
		tranCurrent: 1,
		tranDuration: 300,
		signArr: props.signList,
		showToday: false,
		shrinkType: false,
		deterChange: true
	})

	const create = () => {
		let nd = new Date();
		data.today = {
			year: nd.getFullYear(),
			month: nd.getMonth() + 1,
			day: nd.getDate()
		}
		if (props.firstDayOfWeek == "monday") {
			data.weekArr = ["一", "二", "三", "四", "五", "六", "日"]
		}
		initDate();
	}
	// create();


	const getAllData = computed(() => {
		return data.shrinkType ? data.allWeekList : data.allMonthList;
	})


	// const getMontBg = computed(() => {
	// 	let monthBg = data.selDate.month;
	// 	return !data.shrinkType ? (monthBg < 10 ? '0' + monthBg : monthBg) : '';
	// })

	const getIsSelDay = computed(() => {
		return function (d) {
			let { year, month, day } = data.selDate;
			return year == d.year && month == d.month && day == d.day
		}
	})

	/**
	 * @description: 初始化日期
	 * @author lz 2023-05-26
	 * @return void
	*/
	const initDate = () => {
		data.selDate = JSON.parse(JSON.stringify(data.today));
		let monthList = getMonthData(data.selDate); // 获取当月数据
		let prevMonthList = getMonthData(getMonthDate(data.selDate, -1)); // 上月数据
		let nextMonthList = getMonthData(getMonthDate(data.selDate)); // 下月数据
		data.allMonthList = [prevMonthList, monthList, nextMonthList]
		data.tranIndex = 1;
		if (props.shrinkState == "week" && !data.shrinkType) changeShrink();
	}

	/**
	 * 根据指定日期获取当月的数据
	 * @param {Object} date = { year, month, day } 指定的日期
	 */
	const getMonthData = (date : DateInfo) => {
		const { year, month, day } = date; //指定的日期
		let maxDay = new Date(year, month, 0).getDate(); //当前月最大日期
		let firstWeek = new Date(year + "/" + month + "/1").getDay(); //月份1号的星期数
		if (props.firstDayOfWeek == "monday") firstWeek = firstWeek - 1 < 0 ? 6 : firstWeek - 1;
		let list = [];
		//每月显示42天，6周，每周7天
		for (var i = 0; i < 42; i++) {
			let dayInfo = {}; // 每天的详细信息
			if (i < firstWeek) { //指定月份上月的最后几天
				let { year, month } = getMonthDate(date, -1);
				let preMaxDay = new Date(year, month, 0).getDate(); //上月最大日期
				let day = preMaxDay - firstWeek + i + 1;
				dayInfo = getDayInfo({ year, month, day }, 'prev');
			} else if (i > maxDay + firstWeek - 1) { //指定月份下月的前几天
				let { year, month } = getMonthDate(date);
				let day = i - maxDay - firstWeek + 1;
				dayInfo = getDayInfo({ year, month, day }, 'next');
			} else {
				let day = i - firstWeek + 1;
				dayInfo = getDayInfo({ year, month, day }, 'normal');
			}
			if (i % 7 == 0) list.push(new Array());
			list[list.length - 1].push(dayInfo);
		}
		return list;
	}
	/**
	 * 获取指定日期的详细信息，包括农历节假日等
	 * @param {Object} date = { year, month, day } 指定的日期
	 * @param {String} dayType = [prev|next|normal] 日期类型，上月|下月|当前月
	 */
	const getDayInfo = (date : DateInfo, dayType : string) => {
		const { year, month, day } = date;
		let isToday = false; //是否今天
		if (year == data.today.year && month == data.today.month && day == data.today.day) isToday = true;
		let week = new Date(year + "/" + month + "/" + day).getDay(); //星期数
		let lunar : any = calendar.solar2lunar(year, month, day); //农历
		let dayLunar = lunar.IDayCn == '初一' ? lunar.IMonthCn + lunar.IDayCn : lunar.IDayCn;
		if (lunar.festival) dayLunar = lunar.festival; // 阳历节日
		else if (lunar.lunarFestival) dayLunar = lunar.lunarFestival; // 农历节日
		else if (lunar.Term) dayLunar = lunar.Term; // 节气
		let holidayArr = [
			"元旦", "情人节", "妇女节", "植树节", "愚人节", "清明节", "劳动节", "青年节", "护士节", "儿童节", "建党节", "建军节", "教师节", "国庆节", "平安夜", "圣诞节",
			"除夕", "春节", "元宵节", "龙抬头", "端午节", "七夕节", "中元节", "中秋节", "重阳节", "寒衣节", "下元节", "腊八节", "北方小年", "南方小年"
		];
		let isHoliday = false;
		if (holidayArr.indexOf(dayLunar) != -1) isHoliday = true;
		let dayInfo = {
			date: year + "-" + month + "-" + day,
			year, month, day, week,
			lunar, // 农历
			dayLunar, // 显示的农历
			isToday, // 是否是今日
			isHoliday, // 是否是节假日
			dayType, // 日期类型，上月、下月或当前月
			sign: getSignByDate(date)
		}
		let dayClass = getDayClass(dayInfo);
		dayInfo["dayClass"] = dayClass;
		return dayInfo;
	}

	/**
	 * 根据日期详细信息添加对应的class
	 * @param {Object} dayInfo 日期详情
	 */
	const getDayClass = (dayInfo) => {
		let dClass = "";
		if (dayInfo.isToday) dClass += ' is-today'; // 今天日期
		if (dayInfo.isHoliday) dClass += ' is-holiday'; // 法定假日
		if (props.weekend && (dayInfo.week == 0 || dayInfo.week == 6)) dClass += ' week-end'; // 周末标红
		return dClass;
	}

	/**
	 * 根据日期获取日期对应的事件
	 * @param {Object} date = { year, month, day } 指定的日期
	 */
	const getSignByDate = (date : DateInfo) => {
		const { year, month, day } = date;
		let dayDateS = new Date(year + "/" + month + "/" + day + " 00:00:00").getTime();
		let dayDateE = new Date(year + "/" + month + "/" + day + " 23:59:59").getTime();
		let daySign = [];
		data.signArr.map(sign => {
			let signDate = sign.date.replace(/-/g, '/');
			let signTimes = new Date(sign.date).getTime();
			if (signTimes >= dayDateS && signTimes <= dayDateE) daySign.push(sign)
		})
		return daySign;
	}

	/**
	 * 获取月份数据
	 * @param {String} type=[pre|next]
	 */
	const getOtherData = (type) => {
		let nowMont = getMonthDate(data.selDate, type == 'prev' ? -1 : 1); // 获取当前月份
		data.selDate = nowMont; // 切换月份后设置选中的日期
		let monthData = getMonthData(getMonthDate(nowMont, type == 'prev' ? -1 : 1));
		// 获取上月或下月轮播所在位置
		let current = getTranIndex().prevNum;
		if (type == "next") current = getTranIndex().nextNum;
		data.allMonthList.splice(current, 1, monthData);
		judgeShowToday();
		returnMonthChange(type);
	}

	/**
	 * 获取周数据
	 * @param {String} type=[pre|next]
	 */
	const getOtherWeekData = (type) => {
		let oldSel = data.selDate; // 原选中的日期
		let newSel = getDateByDateAndDay(oldSel, type == 'prev' ? -7 : 7); // 获取7天前或后的日期
		if (oldSel.month != newSel.month) { // 跨月，先设置跨月后的月历
			// 设置月轮播位置
			let current = getTranIndex("month").prevNum;
			if (type == "next") current = getTranIndex("month").nextNum;
			data.tranIndex = current;
			getOtherData(type);
		}
		data.selDate = newSel;
		getWeekData(type);
		judgeShowToday();
	}

	// 从月历中获取周数据，切换周后获取上周或下周数据
	const getWeekData = (type) => {
		const { prevNum: prevIndex, nowNum: nowIndex, nextNum: nextIndex } = getTranIndex("month");
		const { prevNum: prevCurrent, nowNum: nowCurrent, nextNum: nextCurrent } = getTranIndex("week");
		const { year: selYear, month: selMonth, day: selDay } = data.selDate;
		let sDate = selYear + "-" + selMonth + "-" + selDay
		let prevMonthList : any = data.allMonthList[prevIndex];
		let nowMonthList : any = data.allMonthList[nowIndex];
		let nextMonthList : any = data.allMonthList[nextIndex];
		for (let i = 0; i < nowMonthList.length; i++) {
			for (let j = 0; j < nowMonthList[i].length; j++) {
				if (sDate == nowMonthList[i][j].date) {
					returnDayChange(nowMonthList[i][j]); // 返回选中的日期
					if (type == "next") {
						data.allWeekList.splice(nextCurrent, 1, [nowMonthList[i + 1]]);
						if (i == 5) data.allWeekList.splice(nextCurrent, 1, [nextMonthList[1]]);
					} else {
						data.allWeekList.splice(prevCurrent, 1, [nowMonthList[i - 1]]);
						if (i == 0) {
							for (let k = prevMonthList.length - 1; k >= 0; k--) {
								if (prevMonthList[k][6].dayType == "normal") {
									data.allWeekList.splice(prevCurrent, 1, [prevMonthList[k]]);
									break;
								}
							}
						}
					}
					break;
				}
			}
		}
	}

	// 根据月份数据获取周数据，相当初始化周数据
	const getAllWeekData = () => {
		const { prevNum, nowNum, nextNum } = getTranIndex("month");
		const { year: selYear, month: selMonth, day: selDay } = data.selDate;
		let sDate = selYear + "-" + selMonth + "-" + selDay; // 选中的日期
		let allWeekList = [[], [], []];
		let prevMonthList : any = data.allMonthList[prevNum];
		let nowMonthList : any = data.allMonthList[nowNum];
		let nextMonthList = data.allMonthList[nextNum];
		for (let i = 0; i < nowMonthList.length; i++) {
			for (let j = 0; j < nowMonthList[i].length; j++) {
				if (sDate == nowMonthList[i][j].date) {
					allWeekList[0][0] = nowMonthList[i - 1];
					allWeekList[1][0] = nowMonthList[i];
					allWeekList[2][0] = nowMonthList[i + 1];
					if (i == 5) {
						allWeekList[2][0] = nextMonthList[1];
					} else if (i == 0) {
						for (let k = prevMonthList.length - 1; k >= 0; k--) {
							if (prevMonthList[k][6].dayType == "normal") {
								allWeekList[0][0] = prevMonthList[k];
								break;
							}
						}
					}
					break;
				}
			}
		}
		data.allWeekList = allWeekList;
	}

	// 滑动切换结束
	const swiperEndChange = () => {
		data.tranDuration = 300;
	}

	// 滑动切换月份或周
	const swiperChange = (e) => {
		let current = e.detail.current;
		let oldIndex = data.shrinkType ? data.tranCurrent : data.tranIndex;
		let type = (oldIndex - current == -1 || oldIndex - current == 2) ? 'next' : 'prev';
		if (data.shrinkType) {
			data.tranCurrent = current;
			if (current != oldIndex) getOtherWeekData(type);
		} else {
			data.tranIndex = current;
			if (current != oldIndex) getOtherData(type);
		}
		emit('swiperChange',data.showToday)
	}

	// 点击切换月份或周（上月下月切换或上周下周切换）type = [prev|next] 切换类型
	const changeMonthOrWeek = (type) => {
		if (!data.deterChange) return;
		data.deterChange = false;
		setTimeout(_ => {
			data.deterChange = true;
		}, 400); // 防止点击过快
		data.tranDuration = 300;
		let tranType = data.shrinkType ? 'week' : 'month';
		let current = getTranIndex(tranType).prevNum;
		if (type == "next") current = getTranIndex(tranType).nextNum;
		if (tranType == "week") {
			data.tranCurrent = current;
			getOtherWeekData(type);
		} else {
			data.tranIndex = current;
			getOtherData(type);
		}
	}
	// 点击收缩按钮，切换显示月份或显示周
	const changeShrink = () => {
		data.shrinkType = !data.shrinkType;
		if (data.tranDuration != 0) data.tranDuration = 0;
		if (data.shrinkType) {
			data.tranCurrent = 1;
			getAllWeekData();
		}
		returnShrinkChange();
		judgeShowToday();
	}
	// 点击回到今天
	const goToday = () => {
		if (data.tranDuration != 0) data.tranDuration = 0;
		let oldDate = JSON.parse(JSON.stringify(data.selDate));
		initDate();
		if (data.shrinkType) {
			data.tranCurrent = 1;
			getAllWeekData();
			let today = data.today;
			// 判断是否需要触发改变月份事件
			if (oldDate.year != today.year || oldDate.month != today.month) {
				returnMonthChange("today");
			} else {
				returnDayChange(data.today);
			}
		} else {
			returnMonthChange("today"); // 事件
		}
		judgeShowToday();
	}

	// 点击日期
	const clickDay = (dayInfo) => {
		let { year, month, day } = data.selDate;
		if (day == dayInfo.day && month == dayInfo.month && year == dayInfo.year) return;
		let oldSel = JSON.parse(JSON.stringify(data.selDate));
		data.selDate.day = dayInfo.day;
		if (oldSel.month != dayInfo.month) {
			if (!data.shrinkType) {
				changeMonthOrWeek(dayInfo.dayType);
				return;
			} else {
				data.selDate.year = dayInfo.year;
				data.selDate.month = dayInfo.month;
				let current = getTranIndex("month").prevNum;
				if (dayInfo.dayType == "next") current = getTranIndex("month").nextNum;
				data.tranIndex = current;
				let monthData = getMonthData(getMonthDate(data.selDate, dayInfo.dayType == 'prev' ? -1 : 1));
				let current2 = getTranIndex("month").prevNum;
				if (dayInfo.dayType == "next") current2 = getTranIndex("month").nextNum;
				data.allMonthList.splice(current2, 1, monthData); // 设置上月或下月数据
			}
			returnMonthChange(dayInfo.dayType);
		} else {
			returnDayChange(dayInfo);
		}
	}
	// 判断是否需要显示回到今天（非本月或本周时显示）
	const judgeShowToday = () => {
		const { year, month, day } = data.today;
		const { year: selYeat, month: selMonth, day: selDay } = data.selDate;
		if (data.shrinkType) { // 显示的周
			let selTimes = new Date(selYeat, selMonth - 1, selDay).getTime(); // 选中日期的时间戳
			let week = new Date(year, month - 1, day).getDay(); // 今天星期
			let firstWD = getDateByDateAndDay(data.today, -week + (props.firstDayOfWeek == "monday" ? 1 : 0));
			let lastWD = getDateByDateAndDay(data.today, 6 - week + (props.firstDayOfWeek == "monday" ? 1 : 0));
			let firstTimes = new Date(firstWD.year, firstWD.month - 1, firstWD.day).getTime();
			let lastTimes = new Date(lastWD.year, lastWD.month - 1, lastWD.day).getTime();
			if (selTimes > lastTimes || selTimes < firstTimes) data.showToday = true;
			else data.showToday = false;
		} else {
			if (year != selYeat || month != selMonth) data.showToday = true;
			else data.showToday = false;
		}
	}
	// 重新设置标记
	const setSignList = () => {
		data.allMonthList.map(month => {
			month.map(week => {
				week.map((day : any) => {
					day.sign = getSignByDate({ year: day.year, month: day.month, day: day.day })
				})
			})
		})
	}
	/**
	 * 添加标记
	 * @param {Array} list 需要添加的标记
	 */
	const addSignList = (list) => {
		let signArr = data.signArr.concat(list);
		data.signArr = signArr;
		setSignList();
	}
	/**
	 * 删除标记
	 * 根据date和title共同判断是否删除
	 * @param {Array} list 需要删除的标记
	 */
	const deleteSignList = (list) => {
		let signArr = data.signArr;
		signArr = signArr.filter(s => {
			if (list.find(l => l.date == s.date && l.title == s.title)) return false
			else return true;
		})
		data.signArr = signArr;
		setSignList();
	}
	/**
	 * 事件 - 设置返回日期
	 * @param {Object} dayInfo 日期详情
	 */
	const returnDayChange = (dayInfo) => {
		let { year, month, day } = dayInfo;
		let dayDate = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
		let returnData = {
			date: dayDate,
			year: year,
			month: month,
			day: day,
			week: dayInfo.week,
			daySign: dayInfo.sign
		}
		if (props.showLunar) returnData["lunar"] = dayInfo.lunar;
		emit("dayChange", returnData);
	}
	/**
	 * 事件 - 设置返回月份
	 * @param {String} type 类型
	 */
	const returnMonthChange = (type) => {
		let selDate = data.selDate.year + "-" + data.selDate.month + "-" + data.selDate.day;
		let monthList = data.allMonthList.flat().flat(); // 二维转一维
		let dayInfo : any = monthList.find((day : any) => day.date == selDate);
		returnDayChange(dayInfo)
		emit("monthChange", {
			year: dayInfo.year,
			month: dayInfo.month,
			type: type
		});
	}
	/**
	 * 事件 - 返回收缩状态
	 */
	const returnShrinkChange = () => {
		let type = data.shrinkType ? 'week' : 'month'
		emit("shrinkClick", type);
	}
	/**
	 * 获取上一个或下一个轮播位置
	 * @param {String} type = [month|week] 轮播类型，月轮播(tranIndex),周轮播(tranCurrent)
	 * @returns {Object} {prevNum, nowNum, nextNum}
	 */
	const getTranIndex = (type = 'month') => {
		let current = data.tranIndex;
		if (type == "week") current = data.tranCurrent;
		let prevNum = current - 1 < 0 ? 2 : current - 1;
		let nowNum = current;
		let nextNum = current + 1 > 2 ? 0 : current + 1;
		return { prevNum, nowNum, nextNum }
	}
	/**
	 * 根据日期获取几天后的日期
	 * @param {Object} date = {year, month, day} 当前日期
	 * @param {Number} day 当前日期的几天前或几天后(负数)
	 * @returns {Object} {year, month, day}
	 */
	const getDateByDateAndDay = (date, num) => {
		let dTime = new Date(date.year + "/" + date.month + "/" + date.day).getTime() + num * 24 * 60 * 60 * 1000;
		let nd = new Date(dTime);
		return {
			year: nd.getFullYear(),
			month: nd.getMonth() + 1,
			day: nd.getDate()
		}
	}
	/**
	 * 获取几个月前或后的日期
	 * @param {Object} date = {year, month, day} 当前日期
	 * @param {Number} num 当前日期的num月前或后，默认1月后(下月)
	 * @returns {Object} {year, month, day}
	 */
	const getMonthDate = (date, num = 1) => {
		let nextMonth = date.month + num;
		let diffYear = parseInt((Math.abs(nextMonth) / 12) as any);
		let year = date.year;
		let month = nextMonth;
		if (nextMonth > 12) {
			year = date.year + diffYear;
			month = nextMonth % 12;
		} else if (nextMonth < 1) {
			year = date.year - (diffYear + 1);
			month = nextMonth + 12 * (diffYear + 1);
		}
		let monthMaxDay = new Date(year, month, 0).getDate(); // 月份最大日期
		let day = date.day > monthMaxDay ? monthMaxDay : date.day;
		return { year, month, day }
	}
	const emit = defineEmits(['dayChange', 'monthChange', 'shrinkClick','swiperChange'])
	
	onMounted(() => {
		create()
	})
	defineExpose({
		goToday
	})
	
</script>
<style lang="scss">
	.lunc-calendar {

		// 头部
		.header {
			display: flex;
			flex-direction: row;
			justify-content: center;
			// text-align: left;
			position: relative;
			height: 90rpx;
			line-height: 90rpx;

			.head-month {
				font-size: 36rpx;
				padding: 0 40rpx;
			}

			.go-to-today {
				position: absolute;
				right: 82rpx;
				// top: 26rpx;
				// padding: 8rpx 12rpx 8rpx 22rpx;
				// background-color: rgba(255, 184, 0, 1);
				// border-radius: 22rpx 0 0 22rpx;
				font-size: 40rpx;
				// line-height: 24rpx;
				color: #333333;
			}

			.head-icon {
				width: 20rpx;
				height: 20rpx;
				margin-top: 36rpx;
			}

			.head-icon::after {
				content: '';
				display: block;
				width: 18rpx;
				height: 18rpx;
				border-top: 2rpx solid #606266;
				border-left: 2rpx solid #606266;
			}

			.head-icon.head-pre-month {
				transform: rotate(-45deg);
			}

			.head-icon.head-next-month {
				transform: rotate(135deg);
			}
		}

		// 星期
		.week-area {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			// margin: 0 10rpx;

			.week-font {
				flex: 1;
				text-align: center;
				color: #666;
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #666;
			}
		}

		// 日历
		.calendar-data {
			// transition: all 300ms;
			// background: #FFFFFF;
			padding: 0 20upx;

			.swiper-item {
				position: relative;
				display: -webkit-box;

				.month-bg {
					position: absolute;
					font-size: 240px;
					font-weight: bold;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -55%);
					color: #EEE;
					opacity: 0.4;
					z-index: -1;
					word-break: initial;
				}

				.month-days {
					width: 100%;
					margin: 0 auto;
					// margin-top: 14rpx;
					position: relative;

					// transition: all 300ms;
					.week-days {
						display: flex;
						flex-direction: row;

						.day {
							flex: 1;
							width: 14.28%;
							text-align: center;
							height: 84rpx;
							color: #000;
							box-sizing: border-box;

							.day-info {
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								align-items: center;
								position: relative;

								.infoof {
									display: flex;
									flex-direction: column;
									width: 72rpx;
									height: 72rpx;
									line-height: 0;
								}

								.day-solar {
									display: block;
									line-height: 40rpx;
									font-size: 28rpx;
									font-family: 江城圆体-500W, 江城圆体;
									font-weight: normal;
									color: #333;
								}

								.day-lunar,
								.day-sign {
									line-height: 25rpx;
									transform: scale(1);
									white-space: nowrap;
									font-size: 16rpx;
									font-family: 江城圆体-400W, 江城圆体;
									font-weight: normal;
									color: #666;
								}

								.day-sign {
									color: #F75858 !important;
								}

								.day-tag {
									content: "";
									position: absolute;
									bottom: 14rpx;
									left: 42rpx;
									width: 6rpx;
									height: 6rpx;
									border-radius: 50%;
									display: inline-block;
									background-color: #F75858;
								}
							}

							// 非当月日期
							.infoof.un-month {
								opacity: 0.5;
								font-size: 28rpx;
								font-family: 江城圆体-500W, 江城圆体;
								font-weight: normal;
								transition: all 300ms;
							}

							// 今天日期
							.is-today .day-solar,
							.is-today .day-sign,
							.is-today .day-lunar {
								color: #E96161;
							}

							// 周末
							.week-end .day-solar {
								color: #666666;
							}

							// 法定假日
							.is-holiday .day-solar,
							.is-holiday .day-sign,
							.is-holiday .day-lunar {
								color: #E96161 !important;
							}

							// 当前选中的日期
							.is-sel {
								border-radius: 50%;
								// background-color: #ED4C46;
								border: 1upx solid #ED4C46;
							}
						}
					}

					.week-days.week-hide {
						display: none;
					}
				}

				.item-week {
					.un-month {
						opacity: 1 !important;
					}
				}
			}
		}

		// 收缩按钮
		.shrink {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			margin-bottom: 22rpx;

			.shrink-btn {
				// background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAMhJREFUOE/dky8LAkEQxd9w0WjV72KxWXfggmAyWWzXxHbNYjIJhoOZarvid9FqNB4jCyes3h9OLghu3fceb36zS+h5qKcf/xYgIisAayJKnHMa8lFVZ2YpgB0z7193FQYisgCwAXA3s8QLicgbhwC2zHwMgxshBkFeXzE2Nvh2rW8NsiybRFE0ZuZTXZCIzIuiuMZxfKltICJTAAciegDwIM9eqKozAKmZDQAsmTlvHSGY/1YKR00cWl9iGYRP8p220BXm7//CE8WyQBHBXZb9AAAAAElFTkSuQmCC);
				font-size: 52rpx;
				transition: all 300ms;
				color: #999;

			}

			.tran1 {
				width: 52rpx;
				height: 52rpx;
			}

			.shrink-close {
				transform: rotate(-180deg);
			}
		}
	}
</style>