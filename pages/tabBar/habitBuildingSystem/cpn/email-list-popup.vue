<template>
	<lz-popup 
		ref="popup" 
		title="邮件" 
		:body-width="650.79" 
		:body-height="1073.41" 
		center 
		mask-color 
		is-header
		:header-h="138.88" 
		is-footer 
		:footer-h="101.19" 
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
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-left">
					<image class="img" :src="emailIcon" />
				</view>
				<view class="item-right" @click="handleTapCell(item)">
					<image v-if="item.read == false" class="item-right-txt"
						src="/static/images/habitBuildingSystem/not-read-txt.png" />
					<text class="content-title">{{item.content}}</text>
					<view class="content-time">
						<text class="content-time-txt">{{item.date.split(' ')[0]}}</text>
						<text class="content-time-txt">{{item.date.split(' ')[1]}}</text>
					</view>
				</view>
			</view>
		</view>
		<template #footer>
			<view class="popup-footer">
				仅显示最近20封邮件
			</view>
		</template>
	</lz-popup>
	
	<!-- 邮箱内容 -->
	<email-content-popup ref="emailContentPopupRef" />
</template>

<script lang="ts" setup>
	import { ref, reactive } from "vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import emailContentPopup from "@/pages/tabBar/habitBuildingSystem/cpn/email-content-popup.vue"

	let emailIcon : string = "/static/images/habitBuildingSystem/owl.png"

	interface List {
		read ?: boolean,
		content : string
		date : string
	}
	const list = reactive<Array<List>>([
		{
			read: false,
			content: "学校每日新闻",
			date: "2022/08/19 09:47"
		},
		{
			content: "学校每周总结",
			date: "2022/08/19 09:47"
		},
		{
			content: "学校每周总结",
			date: "2022/08/19 09:47"
		},
		{
			content: "学校每周总结",
			date: "2022/08/19 09:47"
		},
		{
			content: "学校每周总结",
			date: "2022/08/19 09:47"
		}
	])

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
	
	let emailContentPopupRef = ref(null); // 邮箱内容实例
	
	
	const popup = ref<InstanceType<typeof lzPopup>>();
	
	const handleTapCell = (item: List) => {
		hide();
		setTimeout(() => {
			emailContentPopupRef.value.show();
		},180)
	}

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

		.item {
			width: 591.27rpx;
			height: 158.73rpx;
			background-color: #FAF5F2;
			border-radius: 20rpx;
			padding: 19.84rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			margin-bottom: 19.84rpx;

			&-left {
				width: 119.05rpx;
				height: 119.05rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;

				.img {
					width: 99.21rpx;
					height: 111.11rpx;
				}
			}

			&-right {
				height: 100%;
				margin-left: 21.83rpx;
				border-left: 2rpx dashed #E6DED4;
				display: flex;
				align-items: center;
				flex: 1;

				&-txt {
					width: 99.21rpx;
					height: 39.68rpx;
					position: absolute;
					right: 19.84rpx;
					top: 19.84rpx;
				}

				.content-title {
					font-size: 32rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
					color: #72695B;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-left: 19.84rpx;
				}

				.content-time {
					text-align: end;
					font-size: 24rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #A3A9C1;
					position: absolute;
					right: 19.84rpx;
					bottom: 15.87rpx;

					&-txt:first-child {
						margin-right: 20rpx;
					}
				}
			}
		}
	}

	.popup-footer {
		position: absolute;
		bottom: 0;
		left: 29.76rpx;
		right: 29.76rpx;
		height: 101.19rpx;
		padding-top: 19.84rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		font-family: 江城圆体-500W, 江城圆体;
		font-weight: normal;
		color: #72695B;
	}
</style>