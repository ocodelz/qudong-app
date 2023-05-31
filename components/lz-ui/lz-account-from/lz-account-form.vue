<template>
	<view class="about-wrap">
		<lz-nav-bar 
			statusBgColor="#fff"
			bgColor="#fff" 
			:left-icon="'\ue602'" 
			:leftText="leftText"
		>
		</lz-nav-bar>
		<view class="about-content" :style="contentStyle">
			<view class="about-plc">
				<view class="risk-warning" v-if="data.type == '4' || data.type == '5'">
					<text>⚠ 注销后，该账号将永久删除，所有该账号相关的数据将被抹去。注销后 账号无法找回和再次注册。该操作是不可逆的，请三思 ！</text>
				</view>
				<view class="account" :style="accountStyle">
					<view :class="data.type == '5' ? 'item item1' : 'item'">
						<image class="item-icon" src="/static/images/userProfile/evaluation.png" />
						<input 
							class="item-input"
							v-model="form.email" 
							:placeholder="data.type == '5' ? '正在获取确认码...' : '请输入邮箱'" 
							:disabled="data.type == '5' ? true : false"
							placeholder-class="plc"
						/>
					</view>
					<view class="item" :style="itemStyle" v-if="data.type != '0'">
						<image class="item-icon" src="/static/images/userProfile/evaluation.png" />
						<input 
							class="item-input"
							v-model="form.code" 
							:placeholder="data.type == '5' ? '请输入上方确认码' : '输入验证码'" 
							placeholder-class="plc"
						/>
						<text class="verification-code" v-if="data.type != '5'" @click="getVerifyCode" :style="disabled ? 'color: #999;' : ''">{{verifyCodeText}}</text>
					</view>
					<view class="item" :style="itemStyle" v-if="data.type != '4' && data.type != '5'">
						<image 
							v-if="data.type != '2'" 
							class="item-icon" 
							src="/static/images/userProfile/evaluation.png" 
						/>
						<input 
							class="item-input"
							v-model="form.password" 
							:placeholder="data.type == '0' ? '请输入密码' : '新密码，6-20位字符'" 
							placeholder-class="plc"
							:type="showPassword ? 'text' : 'password'"
						/>
						<image
							@click="showPassword = !showPassword" 
							class="input-right-icon" 
							:src="showPassword ? '/static/images/common/eye-open.png' : '/static/images/common/eye-close.png'" 
						/>
					</view>
					<view class="item" v-if="data.type == '1' || data.type == '2' || data.type == '3'">
						<image 
							v-if="data.type != '2'" 
							class="item-icon" 
							src="/static/images/userProfile/evaluation.png" 
						/>
						<input 
							class="item-input"
							v-model="form.passwordtwo" 
							placeholder="确认密码" 
							placeholder-class="plc"
							:type="showPassword ? 'text' : 'password'"
						/>
						<image 
							@click="showPassword = !showPassword" 
							class="input-right-icon" 
							:src="showPassword ? '/static/images/common/eye-open.png' : '/static/images/common/eye-close.png'" 
						/>
					</view>
				</view>
				<view class="action-account" v-if="data.type == '0'">
					<text @click="toAccountForm(1)">忘记密码</text>
					<text @click="toAccountForm(2)">立即注册</text>
				</view>
				<view class="login-now" v-if="data.type == '2'">
					<text @click="toLogin">已有账户，立即登录</text>
				</view>
				<button class="btn" @click="handleTapBtn">{{btnText}}</button>
				<lz-agreement v-if="data.type == '0' || data.type == '2'"></lz-agreement>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	/**
	 * author codelz
	 * accountForm 帐号表单 
	 * @description 用于帐号相关的表单操作，例如 邮箱登录、忘记密码等
	 * @property {String} type 类型 0邮箱登录  1忘记密码 2立即注册 3修改密码 4注销帐号(邮箱登录) 5注销帐号(授权登录)
	 * @property {String} leftText 左边的提示文字	
	 * @property {String} btnText 按钮文字
	 */

	import { ref, computed } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzAgreement from "@/components/lz-ui/lz-agreement/lz-agreement.vue"
	import $tips from "@/utils/tips.js"
	
	interface Props {
		leftText?: string
		type: string
		btnText: string
	}
	
	const data = withDefaults(defineProps<Props>(), {
		leftText: "",
		btnText: "",
		type: ""
	})
	
	const emit = defineEmits(['btnClick']);
	
	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})
	
	const form = {
		email: "",
		code: "",
		password: "",
		passwordtwo: ""
	}
	
	const toAccountForm = (type: number) => {
		let url: string = type == 1 ? "/pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword?type=1" : "/pages/accountManagement/registerAccount/registerAccount"
		uni.navigateTo({
			url
		})
	}
	
	const toLogin = () => {
		uni.navigateTo({
			url: '/pages/accountManagement/emailLogin/emailLogin'
		})
	} 
	
	const handleTapBtn = () => {
		// uni.reLaunch({
		// 	url: '/pages/tabBar/index/index'
		// })
		emit('btnClick')
	}
	
	const itemStyle = computed(() => {
		const num: number = data.type == '5' || data.type == '4' ? 20 : 40
		return `
			margin-top: ${num}rpx
		`
	})
	
	const accountStyle = computed(() => {
		const num: number = data.type == '5' || data.type == '4' ? -20 : 80
		return `
			margin-top: ${num}rpx
		`
	})
	
	let showPassword = ref<boolean>(false);
	
	
	let verifyCodeText = ref<string>('发送验证码');
	let disabled = ref<boolean>(false);
	let time: NodeJS.Timeout;
	
	const getVerifyCode = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!form.email){
			return $tips.toast('请先输入邮箱');
		}
		if (!emailRegex.test(form.email)) {
			return $tips.toast('请输入正确的邮箱地址');
		}
		if (disabled.value){
			return $tips.toast('倒计时结束后再获取');
		}
		
		let seconds: number = 60;
		// $http.signCode({phone}).then((res: any) => {}).catch((err: any) => {
		// 	$tips.toast('获取失败,' + err.errMsg);
		// })
		time = setInterval(() => {
			seconds --;
			if (seconds > 0) {
				disabled.value = true;
				verifyCodeText.value = seconds + 's'
			} else {
				seconds = 60;
				disabled.value = false;
				verifyCodeText.value = '重新发送';
				clearInterval(time);
			}
		}, 1000)
	}
	
</script>


<style lang="scss" scoped>
	.about-content{
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		.about-plc{
			margin: 0 50rpx;
			.risk-warning{
				font-size: 20rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #ED4C46;
			}
			.account{
				margin-top: 80rpx;
				.item{
					display: flex;
					align-items: center;
					border-radius: 20rpx;
					background-color: #F5F5F5;
					height: 80rpx;
					margin-top: 40rpx;
					padding: 0 40rpx;
					box-sizing: border-box;
					&-icon{
						width: 36rpx;
						height: 36rpx;
						margin-right: 22rpx;
					}
					&-input{
						flex: 1;
						font-size: 28rpx;
						font-family: 江城圆体-600W, 江城圆体;
						font-weight: normal;
						color: #333;
					}
					.input-right-icon{
						width: 36rpx;
						height: 36rpx;
					}
					.verification-code{
						max-width: 120rpx;
						font-size: 24rpx;
						font-family: 江城圆体-600W, 江城圆体;
						font-weight: normal;
						color: #E96161;
					}
				}
				.item1{
					background-color: transparent;
				}
			}
			.action-account, .login-now{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #999;
				margin-top: 20rpx;
			}
			.login-now{
				justify-content: flex-end;
			}
			.btn{
				width: 632rpx;
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
				margin-top: 160rpx;
			}
			::v-deep .plc{
				font-size: 24rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #999;
			}
		}
	}
</style>