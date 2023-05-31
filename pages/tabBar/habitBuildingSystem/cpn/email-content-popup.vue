<template>
	<lz-popup 
		ref="popup" 
		title="卡顿问题补偿" 
		:body-width="650.79" 
		:body-height="1035.71" 
		center 
		mask-color 
		is-header
		:header-h="138.88" 
		is-footer 
		:footer-h="type == 'text' ? 198.41 : 353.17" 
		bg-color="#F5E4D2"
		:center-style="centerStyle" 
		right-icon=""
	>
		<template #top>
			<view class="popup-close-box" @click="hide">
				<image class="popup-close-img" src="/static/images/habitBuildingSystem/close.png" />
			</view>
		</template>
		
		<view class="popup-center">
			<view v-html="data.content"></view>
		</view>
		
		<template #footer>
			<view class="popup-footer" :style="popupFooterStyle">
				<image 
					v-if="type == 'text'" 
					class="footprint-img"
					src="/static/images/habitBuildingSystem/footprint.png" 
				/>
				<template v-else>
					<scroll-view class="scroll" scroll-x>
						<view class="scroll-item" v-for="(item,index) in data.list" :key="index">
							<image class="scroll-item-img" :src="item.url" />
						</view>
					</scroll-view>
					<view class="btn-box">
						<view class="btn-content">
							<text>领取</text>
						</view>
					</view>
				</template>
			</view>
		</template>
	</lz-popup>
</template>

<script lang="ts" setup>
	import { ref, reactive, computed } from "vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"

	const data = reactive({
		content: `<p>尊敬的贝吉塔王子</p><p>您好，关于测试期间遇到的砍树、卡顿问题已恢复正常。给您带来了不便非常抱歉。收下岛务厅为您准备的礼物。</p>`,
		list: [
			{
				url: "/static/images/habitBuildingSystem/footprint.png"
			},
			{
				url: "/static/images/habitBuildingSystem/footprint.png"
			},
			{
				url: "/static/images/habitBuildingSystem/footprint.png"
			},
			{
				url: "/static/images/habitBuildingSystem/footprint.png"
			}
		]
	})

	let type = "text";

	const centerStyle = {
		backgroundImage: "url('/static/images/habitBuildingSystem/title-box.png')",
		width: "297.62rpx",
		height: "59.52rpx",
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%",
		backgroundPosition: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "32rpx",
		fontFamily: "江城圆体-500W, 江城圆体",
		fontWeight: "normal",
		color: "#72695B",
	}
	
	const popupFooterStyle = computed(() => {
		if(type != "text"){
			return `
				position: absolute;
				left: 29.76rpx;
				top: 0;
				right: 29.76rpx;
				border-top: 4rpx dashed #72695B;
			`
		}
	})
	
	const popup = ref<InstanceType<typeof lzPopup>>();

	const show = () => {
		popup.value.show();
	}

	const hide = () => {
		popup.value.hide();
	}


	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup-close-box {
		position: absolute;
		right: -19.92rpx;
		top: -10rpx;

		.popup-close-img {
			width: 59.6rpx;
			height: 67.46rpx;
		}
	}

	.popup-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 21.83rpx;
		padding: 0 43.65rpx;
		
		font-size: 32rpx;
		font-family: 江城圆体-500W, 江城圆体;
		font-weight: normal;
		color: #72695B;
	}

	.popup-footer {
		.footprint-img {
			position: absolute;
			left: 19.84rpx;
			right: 19.84rpx;
			bottom: 0;
			width: 158.73rpx;
			height: 158.73rpx;
		}

		.scroll {
			width: 100%;
			overflow: hidden;
			margin-top: 39.68rpx;
			padding: 0 29.76rpx;
			box-sizing: border-box;
			white-space: nowrap;

			&-item {
				display: inline-block;
				width: 119rpx;
				height: 119rpx;
				text-align: center;
				line-height: 119rpx;
				margin-right: 25.79rpx;

				&-img {
					border-radius: 20rpx;
					width: 119rpx;
					height: 119rpx;
				}
			}
		}

		.btn-box {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 47.62rpx;
			flex: 1;

			.btn-content {
				width: 238.1rpx;
				height: 75.4rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				// background-image: url('/static/images/habitBuildingSystem/btn-active.png');
				// background-repeat: no-repeat;
				// background-position: "center";
				font-size: 32rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #804B19;
			}
		}
	}
</style>