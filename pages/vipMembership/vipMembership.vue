<template>
	<view class="about-wrap">
		<lz-nav-bar :left-icon="'\ue602'" leftText="高级会员"></lz-nav-bar>
		<view class="about-content" :style="contentStyle">
			<lz-cell 
				title="Todo计划"
				:radius="20" 
				:height="140" 
				:label="label" 
				:padding="[0,20]"
				:rightIconStyle="rightIconStyle"
				:right-icon="'/static/images/common/logo.png'"
				:title-style="titleStyle"
				:labelStyle="labelStyle"
			>
			</lz-cell>
			<view class="membership-features">
				<view class="title-box">
					<view class="border-plc"></view>
					<text class="title-text">会员功能</text>
				</view>
				<lz-feature-list 
					:data="membershipFeatures" 
					:margin-top="6"
					:labelStyle="vipLabelStyle"
				>
				</lz-feature-list>
				<view class="membership-features-type">
					<view 
						v-for="(item,index) in vipTypes" 
						:key="index" 
						:class="vipCurrent == index ? 'item item-active' : 'item'"
						@click="vipTypesChange(index)"
					>
						<text class="item-name">{{item.name}}</text>
						<text class="item-price">￥{{item.price}}</text>
					</view>
				</view>
				<view class="membership-features-payment">
					<button class="payment-methods-btn" @click="pay(0)">微信支付</button>
					<button class="payment-methods-btn" @click="pay(1)">支付宝支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { computed, ref, reactive } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzFeatureList from "@/components/lz-ui/lz-feature-list/lz-feature-list.vue"
	import lzCell from "@/components/lz-ui/lz-cell/lz-cell.vue"
	import { Cell } from "@/common/interface";
	import $tips from "@/utils/tips.js"
	
	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})
	
	const label: string = "升级Todo计划会员，畅想更多权益"
	
	const titleStyle = {
		fontSize: "36rpx"
	}
	
	const rightIconStyle = {
		width: "88rpx",
		height: "88rpx"
	}
	
	const labelStyle = {
		fontSize: "24rpx",
		fontFamily: "江城圆体-600W, 江城圆体",
		marginTop: "10rpx"
	}
	
	const vipLabelStyle = {
		fontSize: "24rpx",
		fontFamily: "江城圆体-600W, 江城圆体",
		color: "#999"
	}
	
	const membershipFeatures: Array<Cell> = [
		{
			title: "「数据云同步」",
			label: "自动同步数据到云端服务器",
			icon: "/static/images/userProfile/feedback.png",
			isRightIcon: false
		},
		{
			title: "主题样式",
			label: "多种主题，随心切换",
			icon: "/static/images/userProfile/evaluation.png",
			isRightIcon: false
		},
		{
			title: "周期事件",
			label: "设定周期事件，自动生成并保存账单",
			icon: "/static/images/userProfile/about.png",
			isRightIcon: false
		},
		{
			title: "分期事件",
			label: "设定分期事件，每期自动进行入账操作",
			icon: "/static/images/userProfile/feedback.png",
			isRightIcon: false
		},
		{
			title: "账单图片",
			label: "添加图片备注到账单中",
			icon: "/static/images/userProfile/feedback.png",
			isRightIcon: false
		},
		{
			title: "截图导入",
			label: "通过OCR识别账单截图并导入",
			icon: "/static/images/userProfile/about.png",
			isRightIcon: false
		}
	]
	
	interface Vip{
		name: string
		price: string | number
		type?: number
	}
	
	const vipTypes = reactive<Array<Vip>>([
		{
			name: "月会员",
			price: "7.9"
		},
		{
			name: "年会员",
			price: "49.0"
		},
		{
			name: "永久会员",
			price: "119.0"
		}
	])
	
	let vipCurrent = ref<number>(0);
	
	const vipTypesChange = (index: number) => {
		vipCurrent.value = index
	}
	
	const pay = (type: number) => {
		$tips.toast('你选择的是"'+ vipTypes[vipCurrent.value].name + '"' +"," + "支付方式为：" + type)
	}
	
</script>

<style lang="scss" scoped>
	.about-content{
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 30rpx;
		.membership-features{
			margin-top: 40rpx;
			.title-box{
				display: flex;
				align-items: center;
				.border-plc{
					width: 8rpx;
					height: 20rpx;
					background-color: #ED4C46;
					border-radius: 32rpx;
				}
				.title-text{
					font-size: 28rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #333;
					margin-left: 6rpx;
				}
			}
			&-type{
				display: flex;
				justify-content: space-between;
				margin-top: 40rpx;
				.item{
					width: 216rpx;
					height: 144rpx;
					background: #fff;
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #333;
					font-weight: bolder;
					&-name{
						font-size: 28rpx;
						font-family: 江城圆体-500W, 江城圆体;
					}
					&-price{
						font-size: 36rpx;
						font-family: 江城圆体-600W, 江城圆体;
					}
				}
				.item-active{
					background-color: #ED4C46;
					color: #fff;
				}
			}
			&-payment{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40rpx;
				.payment-methods-btn{
					width: 324rpx;
					height: 76rpx;
					background-color: #76C067;
					border-radius: 20rpx;
					font-size: 28rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.payment-methods-btn:last-child{
					background-color: #66AAD8;
				}
			}
		}
	}
</style>