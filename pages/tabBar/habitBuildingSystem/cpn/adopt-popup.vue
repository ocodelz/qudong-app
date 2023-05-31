<template>
	<lz-popup 
		ref="popup" 
		title="领养" 
		is-header
		:body-width="634.92" 
		:body-height="555.56" 
		:header-h="99.21"
		center 
		mask-color
		bg-color="#FAF5F2"
		right-icon=""
		:centerStyle="centerStyle"
	>

		<view class="popup-content">
			<view class="popup-content-plc"></view>
			<view class="body">
				<image class="body-img" src="/static/images/habitBuildingSystem/corgi.png" />
				<text class="body-desc">快去领养一只新的小动物吧~</text>
				<view class="btn" :style="{ 'background-image': `url(${bgImage})` }">
					<text class="btn-txt">去领养</text>
				</view>
			</view>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	
	const popup = ref<InstanceType<typeof lzPopup>>();

	const show = () => {
		popup.value.show();
	}
	
	const bgImage = "/static/images/habitBuildingSystem/btn-active.png"
	
	const hide = () => {
		popup.value.hide();
	}
	
	const centerStyle = {
		width: "100%",
		fontSize: "32rpx",
		fontFamily: "江城圆体-500W, 江城圆体",
		fontWeight: "normal",
		color: "#72695B",
		textAlign: "center"
	}

	defineExpose({
		show,
		hide
	})
</script>

<style lang="scss" scoped>
	.popup-content{
		&-plc{
			border: 4rpx dashed #E6DED4;
			position: absolute;
			left: 99.21rpx;
			right: 79.37rpx;
			top: 0;
		}
		.body{
			// width: 515.87rpx;
			margin-top: 41.67rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			&-img{
				width: 131rpx;
				height: 204rpx;
			}
			&-desc{
				margin-top: 19.84rpx;
				font-size: 28rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #B97F59;
			}
			.btn{
				width: 238.1rpx;
				height: 75.4rpx;
				background-repeat: no-repeat;
				background-position: "center";
				position: relative;
				text-align: center;
				line-height: 75.4rpx;
				margin-top: 33.73rpx;
				&-txt{
					font-size: 32rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
					color: #804B19;
				}
			}
		}
	}
</style>