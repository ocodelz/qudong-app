<template>
	<lz-popup 
		ref="popup"
		title="重要程度"
		:body-width="600" 
		:body-height="498"
		:header-h="122"
		mask-color
		is-header
		center
		left-icon=""
		right-icon=""
	>
		<view class="popup-content">
			<lz-feature-list 
				:data="list" 
				:height="90" 
				margin-top="0" 
				:left-icon-style="leftIconStyle"
			>
			</lz-feature-list>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import { Cell } from "@/common/interface"
	import { ref } from "vue"
	import lzFeatureList from "@/components/lz-ui/lz-feature-list/lz-feature-list.vue"

	const list : Array<Cell> = [
		{
			title: '非常重要',
			icon: '/static/images/index/level-1.png',
			isRightIcon:false
		},
		{
			title: '比较重要',
			icon: '/static/images/index/level-2.png',
			isRightIcon:false
		},
		{
			title: '一般重要',
			icon: '/static/images/index/level-3.png',
			isRightIcon:false
		},
		{
			title: '不重要',
			icon: '/static/images/index/level-4.png',
			isRightIcon:false
		}
	]

	const popup = ref<InstanceType<typeof lzPopup>>();

	const show = () => {
		popup.value.show();
	}
	
	const leftIconStyle = {
		width: "28rpx",
		height: "28rpx"
	}

	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup-content{
		padding: 0 20rpx;
	}
</style>