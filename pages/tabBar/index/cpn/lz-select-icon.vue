<template>
	<lz-popup 
		ref="popup"
		title="选择图标"
		:body-width="696"
		:body-height="552"
		is-header
		center
		mask-color
		:header-h="112"
		right-icon=""
		:left-icon="'\ue60d'"
	>
		<view class="popup-content">
			<view 
				v-for="(item,index) in seletIconArr" 
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
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import { Item } from "@/common/interface"
	import { computed, ref } from "vue"
	
	/**
	 * @description: 新建清单-选择图标 相关
	 * @@return void
	 * @author lz 2023-05-22
	 */
	const seletIconArr:Array<Item> = [
		{
			icon: "\ue611",
			name: "工作"
		},
		{
			icon: "\ue611",
			name: "学习"
		},
		{
			icon: "\ue611",
			name: "生活"
		},
		{
			icon: "\ue611",
			name: "娱乐"
		},
		{
			icon: "\ue611",
			name: "运动"
		},
		{
			icon: "\ue611",
			name: "美食"
		},
		{
			icon: "\ue611",
			name: "医疗"
		},
		{
			icon: "\ue611",
			name: "出行"
		},
		{
			icon: "\ue611",
			name: "野营"
		},
		{
			icon: "\ue611",
			name: "孕儿"
		},
		{
			icon: "\ue611",
			name: "宠物"
		},
		{
			icon: "\ue611",
			name: "纪念日"
		},
		{
			icon: "\ue611",
			name: "购物"
		},
		{
			icon: "\ue611",
			name: "礼物"
		},
		{
			icon: "\ue611",
			name: "手账"
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
	.popup-content{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20rpx;
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
</style>