<template>
	<view class="wrap">
		<lz-status :bgColor="data.statusBgColor" ref="statusRef"></lz-status>
		<view class="nav-bar" :style="navBarStyle">
			<slot name="content">
				<view class="nav-bar-left">
					<text 
						v-if="data.leftIcon" 
						class="iconfont left-icon" 
						:style="leftIconStyle"
						@click="navleftIcon"
					>
						{{data.leftIcon}}
					</text>
					<text class="left-text">{{data.leftText}}</text>
				</view>
				<view class="nav-bar-right">
					<text>{{data.rightText}}</text>
					<text class="iconfont" v-if="rightIcon" @click="navRightIcon">{{data.rightIcon}}</text>
				</view>
			</slot>
		</view>
	</view>
</template>

<script setup lang="ts">
	/**
	 * author codelz
	 * navBar 自定义导航栏 
	 * @description 一般用于在特殊情况下，需要自定义导航栏的时候用到
	 * @property {String} bgColor 导航栏背景色	
	 * @property {String} titleStyle 标题的样式
	 * @property {String} leftIcon 左边返回图标的名称
	 * @property {String} leftText 左边的提示文字	
	 * @property {String} leftIconSize 左侧返回图标的大小	
	 * @property {String} leftIconColor 左侧返回图标的颜色	
	 * @property {String} rightIcon 右边返回图标的名称
	 * @property {String} rightText 右边的提示文字
	 */

	import { ref, onMounted, computed } from "vue"
	import lzStatus from "@/components/lz-ui/lz-status/lz-status.vue"
	
	interface Props {
		bgColor?: string | object
		statusBgColor?: string | object
		titleStyle?: string
		leftIcon?: string
		leftText?: string
		leftIconSize?: string | number
		leftIconColor?: string | number
		rightIcon?: string
		rightText?: string
		isBack?: boolean
	}
	
	const data = withDefaults(defineProps<Props>(), {
		bgColor: '#F0F4F7',
		statusBgColor: '#F0F4F7',
		leftIcon: '',
		leftText: '',
		leftIconSize: 32,
		leftIconColor: '#000',
		rightIcon: '',
		rightText: '',
		isBack: true
	})
	
	let statusRef = ref(null)
	let status = ref<number>(0);
	
	const navBarStyle = computed(() => {
		return `
			top:${status.value}px;
			height: ${navBarHeight.value}px;
			background: ${data.bgColor};
		`
	})
	
	const leftIconStyle = computed(() => {
		return `
			font-size: ${data.leftIconSize}rpx;
			color: ${data.leftIconColor};
		`
	})
	
	const navleftIcon = () => {
		if(data.isBack){
			uni.navigateBack()
			return;
		}
		emit('leftIcon')
	}
	
	const navRightIcon = () => {
		emit('rightIcon')
	}
	
	const emit = defineEmits(['click','rightIcon','leftIcon']);
	
	// let statusBarHeight = ref<string | number>(0);
	let navBarHeight = ref<string | number>(0);
	onMounted(() => {
		// statusBarHeight.value = getApp().globalData.statusBarHeight;
		navBarHeight.value = getApp().globalData.navHeight;
		status.value = statusRef.value.statusBarHeight
	})
	

</script>

<style lang="scss" scoped>
	.lz-status {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 8888;
	}
	.nav-bar {
		position: fixed;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 8888;
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		&-left{
			display: flex;
			align-items: center;
			.left-icon{
				margin-right: 20rpx;
			}
			.left-text{
				display: -webkit-box;
				overflow: hidden;
				word-break: break-all; 
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1; 
				flex-shrink: 0;
				width: 400rpx;
				font-size: 36rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #333;
			}
		}
	}
</style>