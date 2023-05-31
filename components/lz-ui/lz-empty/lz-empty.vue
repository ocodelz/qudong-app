<template>
	<view class="lz-empty-wrap" :style="emptyWrapStyle">
		<view class="lz-empty" :style="emptyStyle">
			<image :style="imgStyle" :src="data.img" />
			<text class="lz-empty-text" :style="textStyle">{{data.text}}</text>
			<text class="lz-empty-info">{{data.info}}</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	/**
	 * author codelz
	 * empty 内容为空
	 * @description 用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景
	 * @property {String} img 图片路径
	 * @property {String} text 文字提示	
	 * @property {String} info 文字描述
	 * @property {String} textColor 文字颜色	
	 * @property {String} textSize 文字大小	
	 * @property {String} width 图片的宽度，单位rpx
	 * @property {String} height 图标的高度，单位rpx
	 * @property {String} marginTop 组件到上一个元素的间距,单位rpx
	 */
	import { computed } from "vue";
	// import { onLoad } from '@dcloudio/uni-app';

	interface Props {
		img?: string
		text?: string
		info?: string
		textColor?: string
		textSize?: string | number
		width?: string | number
		height?: string | number
		marginTop?: string | number
		textTop?: string | number
		center?: boolean
	}

	const data = withDefaults(defineProps<Props>(), {
		text: '暂无日程安排',
		img: '/static/images/empty/data.png',
		textColor: '#B6B6B6',
		textSize: 32,
		width: 184,
		height: 184,
		marginTop: 0,
		info: "",
		textTop: 52,
		center: false
	})
	
	const emptyWrapStyle = computed(() => {
		if(data.center){
			return `
				height: 100vh;
				display: flex;
				align-items: center;
				justify-content: center;
			`
		}
	})

	const imgStyle = computed(() => {
		return `
			width: ${data.width}rpx;
			height: ${data.height}rpx;
		`
	})

	const emptyStyle = computed(() => {
		return `
			margin-top: ${data.marginTop}rpx;
		`
	})

	const textStyle = computed(() => {
		return `
			color: ${data.textColor};
			font-size: ${data.textSize}rpx;
			margin-top: ${data.textTop}rpx;
		`
	})
</script>

<style lang="scss" scoped>
	.lz-empty {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		&-text {
			font-size: 32rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #999999;
		}
		&-info{
			font-size: 28rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #B6B6B6;
			margin-top: 24rpx;
		}
	}
</style>