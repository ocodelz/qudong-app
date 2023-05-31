<template>
	<view class="wrap">
		<view class="content">
			<view class="header-container">
				<view class="left" @click="showPersonalInfoPopup">
					
				</view>
			</view>
			<view class="exit-box " @click="handleTapExitImg">
				<image class="exit-img" src="/static/images/habitBuildingSystem/exit.png"/>
			</view>
			<view class="right-bottom-menus">
				<view 
					class="bottom-menus-item" 
					v-for="item in rightBottomMenus" 
					:key="item.id" 
					@click="handleRigtBottomMenus(item.id)"
				>
					<image class="bottom-menus-img" :src="item.url" />
				</view>
			</view>
		</view>
	</view>
	<!-- 以下为各个功能模块的弹窗 -->
	<!-- 领养 -->
	<adopt-popup ref="adoptPopupRef" />
	<!-- 邮箱列表 -->
	<email-list-popup ref="emailListPopupRef" />
	<!-- 个人信息 -->
	<personal-info-popup ref="personalInfoPopupRef" @click="showModifyNamePopup" />
	<!-- 名称修改 -->
	<modify-name-popup ref="modifyNamePopupRef" />
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from "vue";
	import emailListPopup from "@/pages/tabBar/habitBuildingSystem/cpn/email-list-popup.vue"
	import personalInfoPopup from "@/pages/tabBar/habitBuildingSystem/cpn/personal-Info-popup.vue"
	import modifyNamePopup from "@/pages/tabBar/habitBuildingSystem/cpn/modify-name-popup.vue"
	import adoptPopup from "@/pages/tabBar/habitBuildingSystem/cpn/adopt-popup.vue"
	
	const rightBottomMenus = [
		{
			id: 1,
			url: "/static/images/habitBuildingSystem/fangshou.png"
		},
		{
			id: 2,
			url: "/static/images/habitBuildingSystem/sunsiwanhui.png"
		},
		{
			id: 3,
			url: "/static/images/habitBuildingSystem/youjian.png"
		},
		{
			id: 4,
			url: "/static/images/habitBuildingSystem/bujizhan.png"
		},
		{
			id: 5,
			url: "/static/images/habitBuildingSystem/shangdian.png"
		},
		{
			id: 6,
			url: "/static/images/habitBuildingSystem/beibao.png"
		}
	]
		
	/**
	 * @description: 显示个人信息弹窗
	 * @author lz 2023-05-31
	 */
	const personalInfoPopupRef = ref(null); // 个人信息弹窗实例
	const showPersonalInfoPopup = () => {
		personalInfoPopupRef.value.show()
	}
	
	/**
	 * @description: 显示名称修改弹窗
	 * @author lz 2023-05-31
	 */
	const modifyNamePopupRef = ref(null); // 名称修改弹窗实例
	const showModifyNamePopup = () => {
		personalInfoPopupRef.value.hide()
		
		modifyNamePopupRef.value.show();
	}
	
	/**
	 * @description: 点击退出按钮
	 * @author lz 2023-05-31
	 */
	const handleTapExitImg = () => {
		uni.reLaunch({
			url: "/pages/tabBar/habitBuildingSystem/main"
		})
	}
	
	/**
	 * @description: 右下角菜单
	 * @author lz 2023-05-31
	 */
	const emailListPopupRef = ref(null); // 邮箱列表弹窗实例
	const handleRigtBottomMenus = (id: number) => {
		switch (id){
			case 1:
				break;
			case 2:
				break;
			case 3:
			emailListPopupRef.value.show();
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
		}
	}
	const adoptPopupRef = ref(null) // 领养弹窗实例
	
	onMounted(() => {
		// adoptPopupRef.value.show()
	})
</script>

<style lang="scss" scoped>
	.wrap {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 19.84rpx;
		box-sizing: border-box;
		background: url(/static/images/habitBuildingSystem/bg-img.png) no-repeat fixed center;
		background-size: cover;

		.content {
			width: 100%;
			height: 100vh;
			
			.header-container{
				.left{
					width: 127rpx;
					height: 127rpx;
					background: #FFF8E6;
					border-radius: 20rpx;
					border: 4rpx solid #8D6951;
				}
			}
			.exit-box{
				position: fixed;
				left: 19.84rpx;
				top: 186.51rpx;
				.exit-img{
					width: 47.62rpx;
					height: 67.46rpx;
				}
			}
			.right-bottom-menus{
				position: fixed;
				bottom: 19.84rpx;
				right: 19.84rpx;
				.bottom-menus-item:not(:last-child){
					margin-bottom: 19.84rpx;
				}
				.bottom-menus-img{
					width: 88.3rpx;
					height: 99.21rpx;
				}
			}
		}
	}
</style>