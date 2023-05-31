<template>
	<lz-popup 
		ref="popup" 
		title="" 
		:body-width="634.92" 
		:body-height="371.03" 
		center 
		mask-color
		bg-color="#FAF5F2"
		right-icon=""
	>
		<template #top>
			<view class="popup-close-box" @click="hide">
				<image class="popup-close-img" src="/static/images/habitBuildingSystem/close.png" />
			</view>
		</template>
		<view class="popup-content">
			<view class="popup-content-left">
				<image class="img" src="/static/images/habitBuildingSystem/corgi.png"/>
			</view>
			<view class="popup-content-right">
				<view class="item">
					<text>姓名：江远</text>
					<view class="edit-icon" @click="showModifyNamePopup">
						<text class="iconfont icon-yangchengxitong-bianji"></text>
					</view>
				</view>
				<view class="item">
					<text>性别：男</text>
				</view>
				<view class="item">
					<text>形态：幼态</text>
				</view>
				<view class="bottom-action">
					<view class="bottom-action-btn">
						<text>饥恶</text>
					</view>
					<view class="bottom-action-btn">
						<text>生病</text>
					</view>
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

	const hide = () => {
		popup.value.hide();
	}

	const showModifyNamePopup = () => {
		emit('click')
	}
	
	const emit = defineEmits(['click'])
	
	defineExpose({
		show,
		hide
	})
</script>

<style lang="scss" scoped>
	.popup-close-box {
		position: absolute;
		right: 5.9rpx;
		top: -10rpx;

		.popup-close-img {
			width: 59.6rpx;
			height: 67.46rpx;
		}
	}
	
	.popup-content{
		padding: 57.54rpx 47.62rpx 59.52rpx 51.59rpx;
		display: flex;
		&-left{
			width: 179rpx;
			height: 254rpx;
			background: #F8F4E9;
			border-radius: 20rpx;
			border: 4rpx solid #CFC5BC;
			display: flex;
			align-items: center;
			justify-content: center;
			.img{
				width: 140.87rpx;
				height: 218.25rpx;
			}
		}
		&-right{
			margin-left: 59.52rpx;
			flex: 1;
			.item{
				border-bottom: 1.98rpx solid #F0C06B;
				font-size: 28rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #B97F59;
				padding: 7.94rpx;
				margin-bottom: 5.95rpx;
				position: relative;
				.edit-icon{
					position: absolute;
					top: 0;
					right: 9.92rpx;
					color: #dca855;
					font-size: 31.75rpx;
				}
			}
			.item:first-child{
				padding-top: 0 !important;
			}
			.bottom-action{
				display: flex;
				align-items: center;
				justify-content: space-around;
				&-btn{
					width: 99.21rpx;
					height: 43.65rpx;
					background-color: #F9DF95;
					border-radius: 73rpx;
					margin-top: 13.9rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
					color: #B97F59;
				}
				&-btn:last-child{
					background-color: #EEBB98;
				}
			}
		}
	}
</style>