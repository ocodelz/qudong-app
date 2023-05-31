<template>
	<view class="about-wrap">
		<lz-nav-bar 
			:left-icon="'\ue602'" 
			leftText="提醒工作"
		>
		</lz-nav-bar>
		<view class="about-content" :style="contentStyle">
			<view class="friendly-reminde">
				<text>当应用处于后台，或者手机息屏时，系统会限制应用的活动，我们建议您 进行以下操作</text>
			</view>
			<lz-feature-list :data="list"></lz-feature-list>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { computed } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzFeatureList from "@/components/lz-ui/lz-feature-list/lz-feature-list.vue"
	import { Cell } from "@/common/interface"
	
	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})
	
	const list: Array<Cell> = [
		{
			title: "允许后台运行",
			label: "设置「允许后台运行」"
		},
		{
			title: "忽略电池优化",
			label: "设置「不优化」"
		},
		{
			title: "关闭省电模式",
			label: "关闭「省电模式」"
		},
		{
			title: "允许后台运行",
			label: "允许「自启动」"
		},
		{
			title: "允许后台运行",
			label: "进入「后台管理」，设置「应用后台锁定」"
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
		.friendly-reminde{
			margin-top: 20rpx;
			font-size: 20rpx;
			font-family: 江城圆体-500W, 江城圆体;
			font-weight: normal;
			color: #666;
		}
	}
</style>