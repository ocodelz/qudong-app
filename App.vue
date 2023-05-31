<script>
	export default {
		globalData: {
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏高度)
		},
		onLaunch: function() {
			uni.hideTabBar()
			const system = uni.getSystemInfoSync();
			this.globalData.statusBarHeight = system.statusBarHeight;
			// #ifdef MP-WEIXIN
			// 获取微信胶囊的位置信息 width,height,top,right,left,bottom
			const custom = uni.getMenuButtonBoundingClientRect();
			// 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
			this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2;
			// 总体高度 = 状态栏高度 + 导航栏高度
			this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight;
			// #endif
			// // #ifdef APP-PLUS
			// this.globalData.navHeight = this.globalData.statusBarHeight + (system.system.indexOf('iOS') > -1 ? 44 : 48)
			// // #endif
			this.globalData.navHeight = (system.system.indexOf('iOS') > -1 ? 44 : 48)
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url('@/common/iconfont.css');

	page {
		background-color: #F0F4F7;
	}
	
	uni-checkbox .uni-checkbox-input {
		border-radius: 80rpx !important;
	}
	
	uni-checkbox.checked .uni-checkbox-input {
		background-color: #E96161 !important;
		border-color: #ED4C46 !important;
	}
</style>