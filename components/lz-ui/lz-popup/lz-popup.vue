<template>
	<div class="lz-popup-wrap" v-if="status" :style="popupStyle">
		<div 
			class="mask" 
			v-if="data.mask" 
			:style="getMaskColor" 
			@click="hide"
		>
		</div>
		<div class="lz-popup-box" :class="getBodyClass" :style="getBodyStyle">
			<slot name="top"></slot>
			<div v-if="data.isHeader" class="lz-popup-header" :style="popupHeaderStyle">
				<slot name="header">
					<view class="popup-header-left">
						<slot name="header-left">
							<text class="iconfont popup-icon">{{data.leftIcon}}</text>
						</slot>
					</view>
					<view class="popup-header-center" :style="data.centerStyle">
						<text class="popup-header-title">{{data.title}}</text>
					</view>
					<view class="popup-header-right" @click="hide">
						<text class="iconfont popup-icon">{{data.rightIcon}}</text>
					</view>
				</slot>
			</div>
			<div 
				class="lz-popup-content" 
				:style="popupContentStyle"
			>
				<slot></slot>
			</div>
			<div v-if="data.isFooter" class="lz-popup-footer" :style="popupFooterStyle">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	/**
	 * author codelz
	 * popup 弹出层
	 * @description 弹出层容器，用于展示弹窗、信息提示等内容
	 * @property {Boolean} maskColor 遮罩颜色
	 * @property {Boolean} mask 是否显示遮罩	
	 * @property {Boolean} fixedBottom 遮罩是否固定在底部
	 * @property {Number} bodyWidth 遮罩内容区域宽度
	 * @property {Number} bodyHeight 遮罩内容区域高度
	 */

	import { ref, computed, onMounted } from "vue"

	interface Props {
		maskColor?: boolean
		mask?: boolean
		fixedBottom?: boolean
		bodyWidth?: number
		bodyHeight?: number
		title?: string
		center?: boolean
		rounded?: number | string
		headerH?: number | string
		footerH?: number | string
		isHeader?: boolean
		isFooter?: boolean
		leftIcon?: string
		rightIcon?: string
		bgColor?: string
		centerStyle?: object | string
	}

	const data = withDefaults(defineProps<Props>(), {
		maskColor: false,
		mask: true,
		fixedBottom: false,
		bodyWidth: 0,
		bodyHeight: 0,
		title: "title",
		center: false,
		rounded: 20,
		headerH: 0,
		footerH: 0,
		isHeader: false,
		isFooter: false,
		leftIcon: "",
		rightIcon: "\ue60d",
		bgColor: "#fff"
	})

	let status = ref(false)
	let X = -1;
	let Y = -1;
	let maxX = 0;
	let maxY = 0;

	const getMaskColor = computed(() => {
		let i = data.maskColor ? 0.5 : 0
		return `background-color: rgba(0, 0, 0, ${i});`
	})

	const getBodyClass = computed(() => {
		let fixedBottom = data.fixedBottom ? 'bodyClass' : 'rounded'
		return fixedBottom
	})
	
	const getBodyStyle = computed(() => {
		let left = X > -1 ? `left:${X}px;` : ``
		let top = Y > -1 ? `top:${Y}px;` : ``
		return `
			${left};
			${top};
			border-radius: ${data.rounded}rpx;
			width: ${data.bodyWidth}rpx;
			height: ${data.bodyHeight}rpx;
			background: ${data.bgColor};
		`
	})

	const show = (x = -1, y = -1) => {
		X = (x > maxX) ? maxX : x;
		Y = (y > maxY) ? maxY : y;
		status.value = true
	}

	const hide = () => {
		status.value = false
	}

	const popupStyle = computed(() => {
		if(data.center){
			return `
				display: flex;
				align-items: center;
				justify-content: center;
			`
		}
	})
	
	const popupHeaderStyle = computed(() => {
		return `
			height: ${data.headerH}rpx;
		`
	})
	
	const popupContentStyle = computed(() => {
		if(data.center){
			return `
				top: ${data.headerH}rpx;
				bottom: ${data.footerH}rpx;
			`
		}
	})
	
	const popupFooterStyle = computed(() => {
		return `
			height: ${data.footerH}rpx;
		`
	})
	
	onMounted(() => {
		try {
			const res = uni.getSystemInfoSync();
			maxX = res.windowWidth - uni.upx2px(data.bodyWidth)
			maxY = res.windowHeight - uni.upx2px(data.bodyHeight)
		} catch (e) {

		}
	})

	defineExpose({
		show,
		hide
	})
</script>

<style lang="scss" scoped>
	.lz-popup-wrap {
		overflow: hidden;
		height: 100vh;
		// top: 0;
		// right: 0;
		// bottom: 0;
		// left: 0;
		position: relative;
		z-index: 999999;
		.mask {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
		}
		.lz-popup-box{
			position: fixed;
			box-sizing: border-box;
			
			.lz-popup-header{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.popup-header-left{
					position: absolute;
					left: 40rpx;
				}
				
				.popup-header-center{
					font-size: 28rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #333;
					// background-image: url('/static/images/habitBuildingSystem/animal/title-box.png');
					// width: 297.62rpx;
					// height: 59.52rpx;
					// background-repeat: no-repeat;
					// background-size: 100% 100%;
					// background-position: center;
				}
				
				.popup-header-right{
					position: absolute;
					right: 40rpx;
				}
				.popup-icon{
					width: 32rpx;
					height: 32rpx;
					font-size: 48rpx;
				}
			}
			
			.lz-popup-content{
				position: absolute;
				left: 0;
				right: 0;
				overflow-y: scroll;
			}
			
			.lz-popup-footer{
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
		}
	}

	.bodyClass {
		left: 0;
		right: 0;
		bottom: 0;
	}

	.rounded {
		border-radius: 20rpx;
		box-shadow: 0px 0px 24rpx rgba(0, 0, 0, .12);
	}
</style>