<template>
	<view class="wrap">
		<view class="content">
			<view class="greeting-message">
				<text class="greeting-message-txt">快来培育一颗树苗</text>
				<text class="greeting-message-txt">或领养一只小动物吧！</text>
			</view>
			<view class="cultivation-category">
				<view class="cell" v-for="(item,index) in list" :key="index">
					<view :class="current == index ? 'item item-active' : 'item'" @click="current = index">
						<image class="item-img" :src="item.img" />
					</view>
				</view>
			</view>
			<view class="bottom-action">
				<button class="bottom-action-btn" @click="toLoadingPage">开始专注</button>
				<text class="bottom-action-txt">快来开启你的专注之旅吧~</text>
			</view>
		</view>
		<lz-tab-bar :current="3"></lz-tab-bar>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import lzTabBar from '@/components/lz-ui/lz-tab-bar/lz-tab-bar.vue'

	interface List {
		img ?: string
		type : number | string
	}

	const list : Array<List> = [
		{
			img: '',
			type: 0
		},
		{
			img: '/static/images/habitBuildingSystem/corgi.png',
			type: 1
		}
	]

	let current = ref<number>(1)
	
	const toLoadingPage = () => {
		
		uni.reLaunch({
			url: "/pages/tabBar/habitBuildingSystem/loadingPage/loadingPage"
		})
	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		align-items: center;
		justify-content: center;

		.content {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			.greeting-message {
				display: flex;
				flex-direction: column;
				margin-bottom: 120rpx;
				flex-shrink: 0;

				&-txt {
					font-size: 40rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #333;
				}

				&-txt:first-child {
					margin-left: 16rpx;
				}
			}

			.cultivation-category {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				.cell {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					flex-shrink: 0;
					.item {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 240rpx;
						height: 280rpx;
						background: #fff;
						border-radius: 40rpx;
						flex-shrink: 0;
						&-img {
							width: 162rpx;
							height: 252rpx;
						}
					}

					.item-active {
						border: 4rpx solid #ED4C46;
					}
					
				}
				.cell:not(:last-child) {
					margin-right: 110rpx;
				}
			}

			.bottom-action {
				margin-top: 252rpx;
				flex-shrink: 0;

				&-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 40rpx;
					width: 356rpx;
					height: 76rpx;
					background: #ED4C46;
					border-radius: 20rpx;
					font-size: 28rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
					color: #fff;
				}

				&-txt {
					font-size: 32rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #333;
				}
			}
		}
	}
</style>