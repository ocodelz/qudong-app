<template>
	<lz-popup 
		ref="popup" 
		title="任务排序"
		:body-width="610" 
		:body-height="560" 
		center 
		mask-color 
		is-header 
		:header-h="122"
	>
		<view class="popup-content">
			<view 
				class="popup-item"
				v-for="(item,index) in list" 
				:key="index" 
				@click="handlePopupItem(index)"
			>
				<view class="name">{{item.name}}</view>
				<text v-if="current == index" class="iconfont icon-gouxuan"></text>
			</view>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import { Item } from "@/common/interface"
	import { ref } from "vue"

	const list: Array<Item> = [
		{
			name: '自定义排序'
		},
		{
			name: '时间排序'
		},
		{
			name: '清单排序'
		},
		{
			name: '重要程度排序'
		}
	]
	
	
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
	
	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup {
		width: 610rpx;
		height: 560rpx;
		overflow: hidden;
		padding: 0 20rpx;
		box-sizing: border-box;
		&-header{
			display: flex;
			align-items: center;
			height: 130rpx;
			position: relative;
			&-right{
				position: absolute;
				right: 20rpx;
				z-index: 3;
				.icon-guanbi{
					width: 32rpx;
					height: 32rpx;
					font-size: 48rpx;
				}
			}
			&-center{
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
	}
	.popup-content{
		display: flex;
		flex-direction: column;
		margin-top: 8rpx;
		.popup-item {
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex: 1;
			margin-bottom: 60rpx;
			.name{
				font-size: 28rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #333;
			}
			.icon-gouxuan{
				color: #db584d;
				font-size: 28rpx;
			}
		}
	}
</style>