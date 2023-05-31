<template>
	<view class="login-wrap">
		<lz-nav-bar 
			:left-icon="'\ue602'" 
			bg-color="#fff" 
			statusBgColor="#fff"
		>
		</lz-nav-bar>
		<view class="login-content" :style="contentStyle">
			<view class="logo-box">
				<image class="logo-img" src="/static/images/common/logo.png" />
				<text class="logo-name">Todo 计划</text>
			</view>
			<view class="btn-box" @click="login(0)">
				<image class="email-img" src="/static/images/common/email.png" />
				<text class="btn-txt">邮箱登录/注册</text>
			</view>
			<lz-agreement ref="agreement"></lz-agreement>
			<view class="features-menu">
				<view 
					class="features-menu-item" 
					v-for="item in menus" 
					:key="item.type" 
					@click="login(item.type)"
				>
					<image class="features-menu-img" :src="item.img" />
				</view>
			</view>
		</view>
	</view>
	<lz-popup ref="popup" center mask-color :body-width="638" :body-height="320">
		<view class="login-popup-wrap">
			<view class="title">
				<text>用户协议及隐私保护</text>
			</view>
			<view class="login-popup-content">
				<text class="text">已阅读并同意</text>
				<text class="link-text">《用户协议》</text>
				<text class="text">和</text>
				<text class="link-text">《隐私政策》</text>
			</view>
			<view class="login-popup-bottom">
				<view class="popup-btn" @click="handlePopupBtn(0)">
					<text>拒绝</text>
				</view>
				<view class="popup-btn" @click="handlePopupBtn(1)">
					<text>同意</text>
				</view>
			</view>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import { ref, computed } from "vue"
	import lzAgreement from "@/components/lz-ui/lz-agreement/lz-agreement.vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"

	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})

	interface Menus {
		img : string,
		type : number
	}

	const menus : Array<Menus> = [
		{
			img: '/static/images/common/wx.png',
			type: 1
		},
		{
			img: '/static/images/common/qq.png',
			type: 2
		},
		{
			img: '/static/images/common/wb.png',
			type: 3
		}
	]

	const agreement = ref(null)
	const popup = ref < InstanceType < typeof lzPopup >> ();
	
	const login = (type : number) => {
		if (!agreement.value.checked) return popup.value.show()
		switch (type) {
			case 0:
				emailLogin()
				break;
			case 1:
				weChatLogin()
				break;
			case 2:
				QQLogin();
				break;
			case 3:
				weiboLogin()
				break;
		}
	}

	const emailLogin = () => {
		uni.navigateTo({
			url: "/pages/accountManagement/emailLogin/emailLogin"
		})
	}

	const weChatLogin = () => {

	}

	const QQLogin = () => {

	}

	const weiboLogin = () => {

	}
	
	const handlePopupBtn = (type: number) => {
		if(type == 0) return popup.value.hide();
		agreement.value.checked = true;
		popup.value.hide()
	}
	
</script>

<style lang="scss" scoped>
	.login-content {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		.logo-box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.logo-img {
				width: 160rpx;
				height: 160rpx;
			}

			.logo-name {
				font-size: 56rpx;
				font-family: 江城圆体-600W, 江城圆体;
				color: #333;
				margin-top: 40rpx;
				font-weight: normal;
			}
		}

		.btn-box {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 294rpx 58rpx 0 58rpx;
			width: 634rpx;
			height: 76rpx;
			background: #ED4C46;
			border-radius: 20rpx;

			.btn-txt {
				font-size: 28rpx;
				font-family: 江城圆体-700W, 江城圆体;
				font-weight: normal;
				color: #fff;
			}

			.email-img {
				width: 36rpx;
				height: 36rpx;
				margin-right: 20rpx;
			}
		}


		.features-menu {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 76rpx;

			.features-menu-item:not(:last-child) {
				margin-right: 92rpx;
			}

			.features-menu-img {
				width: 88rpx;
				height: 88rpx;
			}
		}
	}
	.login-popup-wrap{
		width: 638rpx;
		height: 320rpx;
		position: relative;
		.title{
			font-size: 32rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 40rpx;
		}
		.login-popup-content{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-family: 江城圆体-600W, 江城圆体;
			font-weight: normal;
			color: #333;
			padding-top: 30rpx;
			.link-text{
				color: #E96161;
			}
		}
		.login-popup-bottom{
			position: absolute;
			bottom: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			left: 0;
			right: 0;
			.popup-btn{
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #999;
			}
			.popup-btn:last-child{
				color: #ED4C46;
			}
		}
	}
</style>