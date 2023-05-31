<template>
	<view class="lz-cell" :style="cellStyle">
		<view class="lz-cell-left">
			<view class="left-info" :style="topStyle">
				<view class="left-info-content">
					<view class="left-info-top">
						<image 
							class="iconfont icon" 
							v-if="data.icon" 
							:src="data.icon" 
							:style="data.leftIconStyle"
						/>
						<view>
							<text class="title" :style="data.titleStyle">{{data.title}}</text>
							<text
								class="label" 
								v-if="data.label"
								:style="data.labelStyle"
							>
								{{data.label}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lz-cell-right">
			<text 
				class="value" 
				v-if="data.value && data.type == 'text'"
			>
				{{data.value}}
			</text>
			<image class="img" v-if="data.type == 'img'" :src="data.value" />
			<!-- <text class="iconfont right-icon" v-if="!data.value && data.isRightIcon">{{data.rightIcon}}</text> -->
			<image 
				class="iconfont right-icon"  
				v-if="data.isRightIcon"
				:src="data.rightIcon" 
				:style="data.rightIconStyle"
			/>
			<lz-switch v-if="data.type == 'switch'" @click="toggleSwitch"></lz-switch>
		</view>
	</view>
</template>

<script lang="ts" setup>
	/**
	 * author codelz
	 * cell 单元格
	 * @description 一般用于一组列表的情况，比如个人中心页，设置页等
	 * @property {String | Number} title 左侧标题
	 * @property {String | Number} label 标题下方的描述信息	
	 * @property {String | Number | Boolean} value 右侧的内容
	 * @property {String} icon 左侧图标名称
	 * @property {String} rightIcon 右侧的图标箭头
	 * @property {String} url 点击后跳转的URL地址
	 * @property {String | Number} height cell高度
	 * @property {String | Number} type value类型 
	 * @property {Boolean} isRightIcon 是否显示右侧的图标箭头
	 * @property {String | Number} radius cell圆角
	 * @property {Arrary} padding 设置padding，数组形式，比如[0,20]
	 * @property {Object | String} titleStyle 标题的样式
	 */

	import { computed } from "vue";
	import lzSwitch from "@/components/lz-ui/lz-switch/lz-switch.vue"
	
	interface Props {
		title: string | number
		label?: string | number
		value?: string | number | boolean
		icon?: string
		rightIcon?: string
		url?: string
		height?: string | number
		type?: string | number
		isRightIcon?: boolean
		radius?: string | number
		padding?: Array<string | number>
		rightIconStyle?: Object | string
		titleStyle?: Object | string
		labelStyle?: Object | string
		leftIconStyle?: Object | string
	}

	const data = withDefaults(defineProps<Props>(), {
		title: "提示铃声",
		icon: "",
		rightIcon: "/static/images/common/arrow-right.png",
		height: 108,
		type: "text",
		isRightIcon: true,
		label: "",
		radius: 0,
		padding: () => [0,0],
		rightIconStyle: "width: 28rpx;height: 28rpx;"
	})

	const topStyle = computed(() => {
		return `
			height: ${data.height}rpx;
		`
	})
	
	const cellStyle = computed(() => {
		return `
			border-radius: ${data.radius}rpx;
			padding: ${data.padding[0]}rpx ${data.padding[1]}rpx
		`
	})
	
	const toggleSwitch = (value: boolean) => {
		emit("switchChange",value)
	}
	
	const emit = defineEmits(['switchChange'])
</script>

<style lang="scss" scoped>
	.lz-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		font-family: 江城圆体-600W, 江城圆体;
		font-weight: normal;
		color: #333;
		
		&-left {
			.left-info {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: center;

				&-content {
					display: flex;
					flex-direction: column;

					.left-info-top {
						display: flex;
						align-items: center;

						.title {
							font-size: 28rpx;
						}

						.icon {
							margin-right: 20rpx;
							// font-size: 36rpx;
							width: 36rpx;
							height: 36rpx;
						}
					}

					.label {
						display: block;
						// flex-basis: 100%;
						font-size: 20rpx;
						font-family: 江城圆体-500W, 江城圆体;
						font-weight: normal;
						color: #666;
					}
				}
			}
		}

		&-right {
			font-size: 28rpx;
			display: flex;
			align-items: center;
			
			.value {
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #999;
			}

			.img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
			}
			.right-icon{
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
</style>