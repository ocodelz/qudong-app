<template>
	<view class="lz-feature-list" :style="featureListStyle">
		<view class="feature-list-title" v-if="data.name">
			<text>{{data.name}}</text>
		</view>
		<view 
			class="cell" 
			v-for="(item,index) in data.data" 
			:key="index" 
			@click="handleCell(item)"
		>
			<lz-cell 
				:title="item.title" 
				:icon="item.icon" 
				:right-icon="item.rightIcon" 
				:value="item.value"
				:height="data.height"
				:is-right-icon="item.isRightIcon"
				:type="item.type"
				:label="item.label"
				:label-style="data.labelStyle"
				:left-icon-style="data.leftIconStyle"
				@switch-change="switchChange"
			>
			</lz-cell>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import lzCell from "@/components/lz-ui/lz-cell/lz-cell.vue"
	import { computed } from "vue";
	import { Cell } from "@/common/interface"

	
	interface Props {
		data: Array<Cell>,
		name?: string
		height?: string | number
		marginTop?: string | number
		padding?: Array<string | number>
		labelStyle?: Object | string
		leftIconStyle?: Object | string
	}
	
	const data = withDefaults(defineProps<Props>(), {
		name: "",
		height: 108,
		marginTop: 20,
		padding: () => [0,20]
	})
	
	const featureListStyle = computed(() => {
		return `
			margin-top: ${data.marginTop}rpx;
			padding: ${data.padding[0]}rpx ${data.padding[1]}rpx;
		`
	})
	const emit = defineEmits(['click','switchChange']);
	
	const handleCell = (item: Cell) => {
		emit('click',item)
	}
	
	const switchChange = (value: boolean) => {
		emit('switchChange',value)
	}
	
</script>

<style lang="scss" scoped>
	.lz-feature-list{
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		box-sizing: border-box;
		.feature-list-title{
			padding: 8rpx 0;
			font-size: 28rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #ED4C46;
			border-bottom: 2rpx solid #F5F5F5;
		}
	}
</style>