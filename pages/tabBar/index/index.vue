<template>
	<view class="index-wrap">
		<lz-nav-bar 
			:is-back="false" 
			:left-icon="'\ue61d'" 
			left-icon-color="#db584e" 
			:rightIcon="'\ue627'"
			leftText="收集箱" 
			@rightIcon="navRightIcon" 
			@leftIcon="navLeftIcon"
		>
		</lz-nav-bar>
		<view class="index-content" :style="contentStyle">
			<view class="list-content">
				<view class="pinned-list">
					<lz-recursive-menu :display-mode="displayMode" :list="pinnedList"></lz-recursive-menu>
				</view>
				<view class="list">
					<lz-recursive-menu :display-mode="displayMode" :list="list"></lz-recursive-menu>
				</view>
			</view>
			<view class="bottom-action">
				<view class="bottom-action-item">
					<text class="iconfont icon-a-Group1972"></text>
				</view>
				<view class="bottom-action-item">
					<text class="iconfont icon-a-Group2003"></text>
				</view>
			</view>
			<lz-tab-bar :current="0"></lz-tab-bar>
		</view>
		<!-- 	<lz-empty
			center
			:width="300" 
			:height="300" 
			img="/static/images/empty/list.png" 
			text="当前暂无任务"
			info="快点击“+”按钮添加任务吧"
		>
		</lz-empty> -->
	</view>
	<lz-popup 
		ref="popup" 
		:body-width="260" 
		:body-height="popupBodyHeight"
	>
		<view 
			class="popup-menus-wrap" 
			:style="'height:' + popupBodyHeight + 'rpx;'"
		>
			<view 
				class="popup-menus-item" 
				hover-class="menus-hover" 
				v-for="(item,index) in menus" :key="index"
				@click="handleMenus(item,index)"
			>
				<text class="iconfont menus-icon">{{item.icon}}</text>
				<text class="menus-name">{{item.name}}</text>
			</view>
		</view>
	</lz-popup>
	<!-- 清单=新建清单-选择图标popup -->
	<lz-select-icon ref="selectIconRef"></lz-select-icon>
	<!-- 任务排序popup -->
	<lz-task-sorting ref="taskSortingRef"></lz-task-sorting>
	<!-- 新建清单popup -->
	<lz-create-list ref="createListRef"></lz-create-list>
	<!-- nav-left popup -->
	<lz-nav-left-menus  ref="navLeftMenusRef"></lz-nav-left-menus>
	<!-- 应用更新popup -->
	<lz-todo ref="todoRef" type="update"></lz-todo>
	<!-- 批量编辑-重要程度 -->
	<lz-importance-level ref="importanceLevelRef"></lz-importance-level>
</template>

<script lang="ts" setup>
	import { ref, computed, reactive, onMounted } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import lzTabBar from "@/components/lz-ui/lz-tab-bar/lz-tab-bar.vue"
	import lzEmpty from "@/components/lz-ui/lz-empty/lz-empty.vue"
	import { Item } from "@/common/interface"
	import lzSelectIcon from "@/pages/tabBar/index/cpn/lz-select-icon.vue"
	import lzTaskSorting from "@/pages/tabBar/index/cpn/lz-task-sorting.vue"
	import lzCreateList from "@/pages/tabBar/index/cpn/lz-create-list.vue"
	import lzRecursiveMenu from "@/components/lz-ui/lz-recursive-menu/lz-recursive-menu.vue"
	import lzNavLeftMenus from "@/pages/tabBar/index/cpn/lz-nav-left-menus.vue"
	import lzTodo from "@/components/lz-ui/lz-todo/lz-todo.vue"
	import lzImportanceLevel from "@/pages/tabBar/index/cpn/lz-importance-level.vue"

	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;

	/**
	 * @description: 动态设置内容区域样式
	 * @author lz 2023-05-19
	 */
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})

	/**
	 * @description: 右上角功能菜单列表
	 * @author lz 2023-05-19
	 */
	interface Menu extends Item {
		event ?: string
		mode ?: boolean
	}

	const pinnedList = [
		{
			name: "别睡懒觉",
			info: "别睡懒觉！别睡懒觉！千万别睡懒觉！重要的事情",
			tips: "今天 本周五 09:00",
			directoryIcon: "icon",
			directoryName: "伟大的计划😊",
			isTop: true,
			expanded: true
		}
	]

	const list = reactive([
		{
			name: '2.制作薄脆',
			tips: "今天 本周五 09:40",
			expanded: true,
			directoryIcon: "icon",
			directoryName: "伟大的计划😊",
			type: "parent",
			info: "data3",
			children: [
				{
					name: '1.面粉加盐，打入鸡蛋、食用油，搅拌成光 滑面团，醒5分钟，21.面粉加盐，打入鸡蛋、食用油，搅拌成光 滑面团，醒5分钟',
					data: "面团略微光滑，油放多了",
					tips: "今天 09:40~09:50 过期1小时",
					type: "parent",
					expanded: false,
					info: "data4",
					children: [
						{
							name: '1-2.制作薄脆',
							tips: "今天 本周五 09:40",
							expanded: false,
							directoryIcon: "icon",
							directoryName: "伟大的计划😊",
							type: "parent",
							info: "data5"
						}
					]
				},
				{
					name: '2.醒好的面团压平，切成小块矩形状面块',
					data: "切不开，面团黏在一起",
					tips: "今天 09:50~10:00 过期51分钟",
					type: "child",
					expanded: false,
					info: "data6"
				},
				{
					name: '3.烧油，待到油温7成热，面块下锅油炸， 炸至金黄香脆',
					data: "炸成了实心，变成了炸馒头",
					tips: "今天 10:00~10:15 过期36分钟",
					type: "child",
					expanded: false,
					info: "data7"
				}
			]
		}
	])

	let displayMode = ref(uni.getStorageSync('display-mode') || false);

	const menus = reactive<Array<Menu>>([
		{
			icon: "\ue621",
			name: "任务排序",
			event: "taskSorting"
		},
		{
			icon: displayMode.value ? "\ue623" : "\ue624",
			name: displayMode.value ? "详细显示" : "简洁显示",
			mode: displayMode.value || false,
			event: "change"
		},
		{
			icon: "\ue625",
			name: "隐藏已完成"
		},
		{
			icon: "\ue622",
			name: "批量编辑"
		}
	])

	/**
	 * @description: 动态设置右上角弹出 功能菜单高度
	 * @return {H} 高度
	 * @author lz 2023-05-19
	 */
	const popupBodyHeight = computed(() => {
		const H : number = menus.length * 80;
		return H
	})


	/**
	 * @description: 导航栏右上角icon点击显示弹出层
	 * @@return void
	 * @author lz 2023-05-19
	 */
	const popup = ref<InstanceType<typeof lzPopup>>();
	const navRightIcon = () => {
		popup.value.show(uni.upx2px(460), navHeight + uni.upx2px(20))
	}

	let selectIconRef = ref(null);
	let taskSortingRef = ref(null);
	let createListRef = ref(null);
	let navLeftMenusRef = ref(null);
	let todoRef = ref(null);
	let importanceLevelRef = ref(null);
	
	const navLeftIcon = () => {
		navLeftMenusRef.value.show(uni.upx2px(30),navHeight + uni.upx2px(20))
	}

	/**
	 * @description: 导航栏右上角列表逻辑处理
	 * @@return void
	 * @author lz 2023-05-19
	 */
	const handleMenus = (item : Menu, index : number) => {
		if (item.event == "taskSorting") {
			taskSortingRef.value.show()
		}
		if (item.event == "change") {
			item.mode = !item.mode;
			item.name = item.mode ? "详细显示" : "简洁显示"
			item.icon = item.mode ? "\ue623" : "\ue624"
			displayMode.value = item.mode;
			uni.setStorageSync('display-mode', displayMode.value)
		}
		popup.value.hide()
	}
	
	onMounted(() => {
		// importanceLevelRef.value.show()
	})
</script>

<style lang="scss" scoped>
	.index-content {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 30rpx;

		.bottom-action {
			position: fixed;
			left: 0;
			right: 0;
			padding: 0 50rpx;
			bottom: 196rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 92rpx;
				height: 92rpx;
				background-color: #e8a14f;
				color: #fff;
				font-size: 52rpx;
				font-weight: bolder;
				border-radius: 100%;
			}

			&-item:last-child {
				background-color: #db584e;

			}
		}

		.list-content {
			margin-top: 20rpx;

			.pinned-list, .list {
				margin-top: 20rpx;
				background-color: #fff;
				border-radius: 20rpx;
				padding: 0 20rpx;
				padding-bottom: 20rpx;
				padding-top: 5rpx;
				box-sizing: border-box;
			}
		}
	}

	.popup-menus-wrap {
		width: 260rpx;

		.popup-menus-item {
			padding: 0 20rpx;
			height: 80rpx;
			display: flex;
			align-items: center;

			.menus-icon {
				// font-size: 40rpx;
			}

			.menus-name {
				margin-left: 20rpx;
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #333;
			}
		}
	}

	.menus-hover {
		background-color: #f8f9fa;
	}
</style>