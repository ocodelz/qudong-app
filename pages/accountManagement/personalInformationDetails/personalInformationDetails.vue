<template>
	<view class="about-wrap">
		<lz-nav-bar 
			:left-icon="'\ue602'" 
			:rightIcon="'\ue627'" 
			leftText="个人中心"
			@rightIcon="navRightIcon"
		>
		</lz-nav-bar>
		<view class="about-content" :style="contentStyle">
			<lz-feature-list :data="basicInformation"></lz-feature-list>
			<lz-feature-list :data="accountInformation" @click="handleCell"></lz-feature-list>
			<button class="btn">退出登录</button>
		</view>
	</view>
	<lz-popup ref="popup" :bodyWidth="258" :bodyHeight="76">
		<view class="popup-content" @click="toAccountDeletion">
			<image class="popup-content-img" src="/static/images/common/logout.png" />
			<text class="popup-content-text">注销账号</text>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import { ref, computed } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzFeatureList from "@/components/lz-ui/lz-feature-list/lz-feature-list.vue"
	import { Cell } from "@/common/interface"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	
	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})
	
	const basicInformation: Array<Cell> = [
		{
			title: "头像",
			value: 'data:image/jpeg;base64,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',
			type: "img"
		},
		{
			title: "昵称",
			value: "正在战斗的乌龟123456"
		},
		{
			title: "会员",
			value: '普通用户'
		}
	]
	
	const accountInformation: Array<Cell> = [
		{
			title: "邮箱",
			value: "codelz@163.com"
		},
		{
			title: "修改密码",
			isRightIcon: false,
			url: "/pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword?type=3"
		}
	]
	
	const popup = ref < InstanceType < typeof lzPopup >> ();
	
	const toAccountDeletion = () => {
		uni.navigateTo({
			url: "/pages/accountManagement/accountDeletion/accountDeletion?type=4"
		})
		popup.value.hide()
	}
	
	const navRightIcon = () => {
		popup.value.show(240,navHeight + 10)
	}
	
	const handleCell = (item: Cell) => {
		if(item.url){
			uni.navigateTo({
				url: item.url
			})
		}
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
		.btn{
			width: 100%;
			height: 76rpx;
			background-color: #ED4C46;
			border-radius: 20rpx;
			font-size: 28rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 184rpx;
		}
	}
	.popup-content{
		width: 258rpx;
		height: 76rpx;
		display: flex;
		align-items: center;
		&-img{
			width: 36rpx;
			height: 36rpx;
			margin-left: 20rpx;
		}
		&-text{
			font-size: 24rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #333;
			margin-left: 20rpx;
		}
	}
</style>