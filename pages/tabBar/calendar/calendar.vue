<template>
	<view class="calendar-wrap">
		<lz-nav-bar>
			<template #content>
				<view class="nav-bar-content">
					<view class="nav-bar-left">
						<text class="date">2023年3月</text>
						<text class="iconfont icon-a-Group35752 left-icon"></text>
					</view>
					<view class="nav-bar-right">
						<text v-if="showToday" class="action-txt" @click="handleGoToday">今</text>
						<text class="iconfont icon-a-Group2033 action-txt"></text>
						<text class="iconfont icon-a-Group1499 action-txt"></text>
					</view>
				</view>
			</template>
		</lz-nav-bar>
		<view class="calendar-content" :style="contentStyle">
			<!-- 日历内容 -->
			<lz-calendar 
				ref="calendarRef" 
				weekType="" 
				showLunar 
				showMonthBg 
				showShrink 
				:signList="selected" 
				@swiperChange="swiperChange"
			>
			</lz-calendar>
		</view>
		<lz-tab-bar :current="1"></lz-tab-bar>
	</view>
</template>

<script lang="ts" setup>
	import { ref, computed } from "vue";
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzTabBar from "@/components/lz-ui/lz-tab-bar/lz-tab-bar.vue"
	import lzCalendar from "@/components/lz-ui/lz-calendar/lz-calendar.vue"

	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;

	const selected = [
		{ date: '2023-05-22', info: '签到1' },
		{ date: '2023-05-23', info: '签到' },
		{ date: '2023-05-24', info: '签到1' },
		{ date: '2023-05-25', info: '签到' },
		{ date: '2023-05-26', info: '签到1' },
		{ date: '2023-05-27', info: '签到' },
		{ date: '2023-05-28', info: '签到1' },
		{ date: '2023-05-29', info: '签到' },
		{ date: '2023-06-03', info: '签到' },
	]

	let showToday = ref<boolean>(false);
	let calendarRef = ref(null)


	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})

	const handleGoToday = () => {
		calendarRef.value.goToday();
		showToday.value = false;
	}

	const swiperChange = (show : boolean) => {
		showToday.value = show;
	}
	
</script>

<style lang="scss" scoped>
	.calendar-wrap {
		.nav-bar-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex: 1;

			.nav-bar-left {
				margin-left: 40rpx;
				display: flex;
				align-items: center;

				.left-icon {
					font-size: 24rpx;
				}

				.date {
					font-size: 32rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #333;
				}
			}

			.nav-bar-right {
				display: flex;
				align-items: center;

				.action-txt {
					margin-right: 40rpx;
					font-size: 32rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
					color: #333;
				}
			}
		}

		.calendar-content {
			box-sizing: border-box;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			margin: 0 30rpx;
		}
	}
</style>