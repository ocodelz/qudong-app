<template>
	<lz-popup title="你好" ref="popup" :body-width="696" :body-height="552" center maskColor>
		<view class="popup">
			<view class="popup-header">
				<view class="popup-header-left" @click="hide">
					<text class="iconfont icon-guanbi"></text>
				</view>
				<view class="popup-header-right">
					<text class="popup-header-title">选择图标</text>
				</view>
			</view>
			<view class="popup-content">
				<view 
					v-for="(item,index) in data.list" 
					:key="index" 
					:class="popupItemStyle(index)"
					@click="handlePopupItem(index)"
				>
					<view class="icon-wrap" :style="iconWrapStyle(index)">
						<text class="iconfont">{{item.icon}}</text>
					</view>
					<text class="name">{{item.name}}</text>
				</view>
			</view>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import { Item } from "@/common/interface"
	import { computed, ref } from "vue"

	interface Props {
		list : Array<Item>
	}

	const data = withDefaults(defineProps<Props>(), {
		list: () => []
	})

	const popup = ref<InstanceType<typeof lzPopup>>();

	const show = () => {
		popup.value.show();
	}
	
	const hide = () => {
		popup.value.hide();
	}
	
	let current = ref<number>(-1);
	
	const handlePopupItem = (index: number) => {
		current.value = index;
	}
	
	const popupItemStyle = computed(() => {
		return function(index: number){
			return current.value == index ? 'popup-item active-popup-item' : 'popup-item'
		}
	})
	
	const iconWrapStyle = computed(() => {
		return function(index: number){
			let bgColor:string = current.value == index ? '#E96161' : '#fff' 
			return `background-color: ${bgColor};`
		}
	})
	
	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup {
		width: 696rpx;
		height: 552rpx;
		overflow: hidden;
		padding: 0 20rpx;
		box-sizing: border-box;
		&-header{
			display: flex;
			align-items: center;
			height: 112rpx;
			position: relative;
			&-left{
				z-index: 3;
				.icon-guanbi{
					width: 32rpx;
					height: 32rpx;
					font-size: 48rpx;
				}
			}
			&-right{
				position: absolute;
				left: 0;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 1;
				.popup-header-title{
					font-size: 28rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #333;
				}
			}
		}
		&-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.popup-item {
				display: flex;
				align-items: center;
				flex-shrink: 0;
				width: 204rpx;
				height: 64rpx;
				background-color: #F0F0F0;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				box-sizing: border-box;
				color: #333;
				.icon-wrap {
					margin-left: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 52rpx;
					height: 52rpx;
					border-radius: 12rpx;
				}

				.name {
					padding-left: 12rpx;
					font-size: 24rpx;
					font-family: 江城圆体-500W, 江城圆体;
					font-weight: normal;
				}
			}
			.active-popup-item{
				background-color: #ED4C46;
				color: #fff;
			}
		}
	}
</style>