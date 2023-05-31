<template>
	<lz-popup 
		ref="popup" 
		:body-width="640" 
		:body-height="bodyHeight"
		center   
		:header-h="headerH"
		mask-color
		is-header
		is-footer
		:footerH="192"
	>
		<template #header>
			<view class="popup-header">
				<text class="popup-header-title">感谢使用Todo计划</text>
				<image class="popup-header-logo" src="/static/images/common/logo.png" />
			</view>
		</template>
		<view class="popup-content">
			<view class="version" v-if="data.type != 'info'">
				<text>V1.0.2</text>
			</view>
			<text>感谢您使用「Todo计划」，我们非常重视您的 个人信息和隐私保护。在您使用「Todo计划」服 务之前，请仔细阅读</text>
			<text class="agreement">《用户隐私政策》</text>
			<text>和</text>
			<text class="agreement">《用户服务协议》</text>
			的全部内容同意并接受全部条款 后开始我们的产品和服务。
			<text class="popup-content-bottom">如您同意此政策，请点击“同意”并开始我们 的产品和服务。</text>
		</view>
		<template #footer>
			<view class="popup-bottom">
				<template v-if="updateStatus == false">
					<view class="popup-bottom-btn" @click="btnClick">
						<text>{{btnText}}</text>
					</view>
					<view class="popup-bottom-txt">
						<text>{{text}}</text>
					</view>
				</template>
				<template v-if="updateStatus">
					<view class="progress">
						<lz-progress :initial-percentage="20"></lz-progress>
					</view>
					<view class="update-text">
						<text>新版本正在努力更新中，请稍后</text>
					</view>
				</template>
			</view>
		</template>
	</lz-popup>
</template>

<script lang="ts" setup>
	import { computed, ref } from "vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import lzProgress from "@/components/lz-ui/lz-progress-bar/lz-progress-bar.vue"

	interface Props {
		type ?: string
	}

	const data = withDefaults(defineProps<Props>(), {
		type: "info",
	})

	const popup = ref<InstanceType<typeof lzPopup>>();

	const bodyHeight = computed(() => {
		let height : number = 0;

		if (updateStatus.value) {
			height = 852;
		}

		if (updateStatus.value == false) {
			height = data.type == "update" ? 892 : 872
		}

		return height
	})

	const headerH = computed(() => {
		const height : number = data.type == "info" ? 260 : 226;
		return height
	})

	const show = () => {
		popup.value.show();
	}

	const btnText = computed(() => {
		return data.type == "update" ? "立即更新" : "同意并使用"
	})

	const text = computed(() => {
		return data.type == "update" ? "暂不更新" : "不同意并退出"
	})

	let updateStatus = ref<boolean>(false)

	const btnClick = () => {
		if (data.type == "update") {
			updateStatus.value = true;
		}
	}

	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup-header {
		display: flex;
		align-items: center;
		justify-content: center;

		&-title {
			font-size: 36rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #333;
		}

		&-logo {
			width: 140rpx;
			height: 140rpx;
			margin-left: 20rpx;
		}
	}

	.popup-content {
		font-size: 28rpx;
		font-family: 江城圆体-500W, 江城圆体;
		font-weight: normal;
		color: #333;
		padding: 0 41rpx;

		.agreement {
			color: #ED4C46;
		}

		.version {
			font-size: 36rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
		}

		&-bottom {
			display: block;
			margin-top: 30rpx;
		}
	}


	.popup-bottom {
		display: flex;
		align-items: center;
		flex-direction: column;

		.progress {
			width: 532rpx;
		}

		&-btn {
			width: 356rpx;
			height: 76rpx;
			background-color: #ED4C46;
			border-radius: 20rpx;
			font-size: 28rpx;
			font-family: 江城圆体-500W, 江城圆体;
			font-weight: normal;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&-txt {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-family: 江城圆体-500W, 江城圆体;
			font-weight: normal;
			color: #000;
		}

		.update-text {
			width: 280rpx;
			height: 30rpx;
			font-size: 20rpx;
			font-family: 江城圆体-500W, 江城圆体;
			font-weight: normal;
			color: #999;
			margin-top: 12rpx;
		}
	}
</style>