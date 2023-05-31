<template>
	<view class="percentage-progress-bar">
		<view class="progress-bar">
			<view class="progress" :style="progressStyle" v-if="percentage >= 10"
			>
				<text v-if="percentage >= 10 && data.mode == 'center'">{{percentage}}%</text>
			</view>
		</view>
		<view class="txt" v-if="percentage >= 10 && data.mode == 'bottom'">加载中: {{percentage}}%</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue';

	// 定义接收的参数类型
	interface Props {
		initialPercentage?: number
		activeBackgroundColor?: string
		mode?: string
	}

	// 使用defineProps定义接收的props
	const data = withDefaults(defineProps<Props>(), {
		initialPercentage: 0,
		activeBackgroundColor :"da594e",
		mode: "center"
	})

	// 使用ref创建响应式数据
	const percentage = ref(data.initialPercentage);

	// 模拟加载进度的函数，这里使用setTimeout来模拟异步操作
	const startUpdate = () => {
		const updateInterval = setInterval(() => {
			percentage.value += 10;
			if (percentage.value >= 100) {
				percentage.value = 100;
				clearInterval(updateInterval);
				// 先模拟跳养成系统主页 后续根据真实需求再做处理
				uni.reLaunch({
					url: "/pages/tabBar/habitBuildingSystem/index/index"
				})
			}
		}, 500);
	};
	
	const progressStyle = computed(() => {
		return `
			 width: ${percentage.value}%;
			 background: ${data.activeBackgroundColor};
		`
	})
	
	// 在组件挂载时开始模拟加载进度
	onMounted(() => {
		startUpdate()
	});
</script>

<style lang="scss" scoped>
	.percentage-progress-bar {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.progress-bar {
			width: 100%;
			height: 36rpx;
			background-color: #d9d9d9;
			border-radius: 50rpx;
			overflow: hidden;

			.progress {
				height: 100%;
				transition: width 0.3s ease;
				/* padding-right: 20rpx; */
				border-radius: 50rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.txt{
			font-size: 36rpx;
			font-family: 江城圆体-500W, 江城圆体;
			font-weight: normal;
			color: #BDB4AB;
			margin-top: 19.84rpx;
		}
	}
</style>