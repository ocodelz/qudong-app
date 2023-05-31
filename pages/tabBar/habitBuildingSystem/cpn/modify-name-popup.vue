<template>
	<lz-popup 
		ref="popup" 
		title="名称修改" 
		is-header
		:body-width="634.92" 
		:body-height="396.83" 
		:header-h="95.21"
		center 
		mask-color
		bg-color="#FAF5F2"
		right-icon=""
		:centerStyle="centerStyle"
	>
		<template #top>
			<view class="popup-close-box" @click="hide">
				<image class="popup-close-img" src="/static/images/habitBuildingSystem/close.png" />
			</view>
		</template>
		<view class="popup-content">
			<view class="popup-content-plc"></view>
			<view class="body">
				<view class="input-box">
					<input class="body-input" :maxlength="5" value="犀利的托尼"/>
				</view>
				<text class="body-desc">修改名称需要消耗1张改名卡</text>
				<view class="botton-action">
					<view class="btn" :style="{ 'background-image': `url(${bgImage})` }">
						<text class="btn-txt">修改</text>
					</view>
					<view class="name-change-card">
						<image class="card-img" src="/static/images/habitBuildingSystem/name-change-card.png" />
						<text class="num">×1</text>
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
	.popup-close-box {
		position: absolute;
		right: 11.84rpx;
		top: -10rpx;
		.popup-close-img {
			width: 59.6rpx;
			height: 67.46rpx;
		}
	}
	
	.popup-content{
		padding: 0 59.52rpx;
		&-plc{
			border: 4rpx dashed #DED6C9;
			position: absolute;
			left: 59.52rpx;
			right: 59.52rpx;
			top: 4rpx;
		}
		.body{
			// width: 515.87rpx;
			margin-top: 43.68rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			
			.input-box{
				width: 476.19rpx;
				height: 63.49rpx;
				box-sizing: border-box;
				background: #F8F4EB;
				border-radius: 36rpx;
				border: 2rpx solid #CFC5BC;
				display: flex;
				align-items: center;
				justify-content: center;
				.body-input{
					text-align: center;
					width: 139rpx;
					font-size: 28rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
					color: #BDB4AB;
				}
			}
			&-desc{
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #D28C58;
				margin-top: 7.94rpx;
			}
			.botton-action{
				display: flex;
				align-items: center;
				margin-top: 39.68rpx;
				justify-content: center;
				width: 100%;
				.btn{
					width: 238.1rpx;
					height: 75.4rpx;
					background-repeat: no-repeat;
					background-position: "center";
					position: relative;
					text-align: center;
					line-height: 75.4rpx;
					&-txt{
						font-size: 32rpx;
						font-family: 江城圆体-500W, 江城圆体;
						font-weight: normal;
						color: #804B19;
					}
				}
				.name-change-card{
					position: absolute;
					display: flex;
					align-items: center;
					right: 109.13rpx;
					.card-img{
						width: 39.68rpx;
						height: 39.68rpx;
						margin-top: 10rpx;
					}
					.num{
						font-size: 24rpx;
						font-family: 江城圆体-500W, 江城圆体;
						font-weight: normal;
						color: #804B19;
					}
				}
			}
		}
	}
</style>