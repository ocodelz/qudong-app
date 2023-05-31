<template>
	<view class="lz-leve-wrap">
		<view class="leve-header" :style="leveHeaderStyle">
			<view class="leve-header-left">
				<image class="leve-img" :src="data.icon" />
				<text class="title">{{data.title}}</text>
			</view>
			<text class="iconfont icon-a-Group1455"></text>
		</view>
		<scroll-view class="leve-box" scroll-y>
			<lz-recursive-menu type="quadrants" :list="data.list" :indentationSize="18"></lz-recursive-menu>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import lzRecursiveMenu from "@/components/lz-ui/lz-recursive-menu/lz-recursive-menu.vue"
	import { computed } from "vue";

	interface Props {
		icon?: string,
		title?: string
		list?: Array<any>,
		headerBg?: string
	}

	const data = withDefaults(defineProps<Props>(), {
		icon: "",
		title: "",
		list: () => [],
		headerBg: ""
	})
	
	const leveHeaderStyle = computed(() => {
		return `
			background-color: ${data.headerBg};
		`
	})
	
</script>

<style lang="scss" scoped>
	.lz-leve-wrap {
		width: 334rpx;
		height: 630rpx;
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;

		.leve-header {
			height: 42rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12rpx;
			color: #fff;

			&-left {
				display: flex;
				align-items: center;
				justify-content: center;

				.leve-img {
					width: 24rpx;
					height: 24rpx;
				}

				.title {
					font-size: 20rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					margin-left: 8rpx;
				}
			}

			.icon-a-Group1455 {
				font-size: 24rpx;
			}
		}
		.leve-box{
			box-sizing: border-box;
			height: 588rpx;
			padding: 0 20rpx 0 18rpx;
		}
	}
</style>