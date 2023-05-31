<template>
	<view class="about-wrap">
		<lz-nav-bar :left-icon="'\ue602'" leftText="关于我们"></lz-nav-bar>
		<view class="about-content" :style="contentStyle">
			<view class="app-information">
				<image class="logo-img" src="/static/images/common/logo.png" />
				<text class="logo-name">Todo 计划</text>
				<text class="version">1.0.0</text>
			</view>
			<lz-feature-list 
				:height="82" 
				:data="list" 
				:margin-top="40" 
				:padding="[0,30]"
			>
			</lz-feature-list>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { computed, reactive } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzFeatureList from "@/components/lz-ui/lz-feature-list/lz-feature-list.vue"
	
	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})
	
	const list = [
		{
			title: "官网",
			value: "www.funthy.com"
		},
		{
			title: "邮箱",
			value: "modai08@163.com"
		},
		{
			title: "QQ群",
			value: "89126378613"
		},
		{
			title: "用户协议"
		},
		{
			title: "隐私协议"
		},
		{
			title: "个人信息收集清单"
		},
		{
			title: "第三方信息共享清单"
		}
	]
	
</script>

<style lang="scss" scoped>
	.about-content{
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 30rpx;
		.app-information{
			margin-top: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.logo-img{
				width: 175.58rpx;
				height: 176.99rpx;
			}
			.logo-name{
				font-size: 44rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #333;
				margin-top: 30rpx;
			}
			.version{
				font-size: 28rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #666;
				margin-top: 10rpx;
			}
		}
	}
</style>