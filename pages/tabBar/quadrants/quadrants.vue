<template>
	<view class="quadrants-wrap">
		<lz-nav-bar 
			:is-back="false" 
			:rightIcon="'\ue627'" 
			leftText="四象限" 
			@rightIcon="navRightIcon"
		>
		</lz-nav-bar>
		<view class="quadrants-content" :style="contentStyle">
			<view style="display: flex;justify-content: space-between;">
				<lz-leve-list
					title="重要且紧急" 
					:list="leveList"
					icon="/static/images/quadrants/leve1.png"
					headerBg="#E87A87"
				>
				</lz-leve-list>
				<lz-leve-list
					title="重要不紧急" 
					:list="leveList"
					icon="/static/images/quadrants/leve2.png"
					headerBg="#FBB116"
				>
				</lz-leve-list>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 22rpx;">
				<lz-leve-list
					title="不重要但紧急" 
					:list="leveList"
					icon="/static/images/quadrants/leve3.png"
					headerBg="#81A5FB"
				>
				</lz-leve-list>
				<lz-leve-list
					title="不重要不紧急" 
					:list="leveList"
					icon="/static/images/quadrants/leve4.png"
					headerBg="#6EC1A3"
				>
				</lz-leve-list>
			</view>
		</view>
		<lz-tab-bar :current="2"></lz-tab-bar>
	</view>
	<lz-popup ref="popup" :body-width="260" :body-height="popupBodyHeight">
		<view class="popup-menus-wrap" :style="'height:' + popupBodyHeight + 'rpx;'">
			<view 
				class="popup-menus-item" 
				hover-class="menus-hover" 
				v-for="(item,index) in menus" 
				:key="index"
				@click="handleMenus(item)"
			>
				<text class="iconfont menus-icon">{{item.icon}}</text>
				<text class="menus-name">{{item.name}}</text>
			</view>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import { ref, computed, reactive } from "vue"
	import lzNavBar from "@/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"
	import lzTabBar from "@/components/lz-ui/lz-tab-bar/lz-tab-bar.vue"
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import lzLeveList from "@/pages/tabBar/quadrants/cpn/lz-leve-list"
	import { Item } from "@/common/interface"

	const navHeight : number = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
	/**
	 * @description: 右上角功能菜单列表
	 * @author lz 2023-05-23
	 */
	interface Menu extends Item {
		event ?: string
	}

	const menus : Array<Menu> = [
		{
			icon: "\ue621",
			name: "任务排序",
			event: "popup"
		},
		{
			icon: "\ue624",
			name: "显示已完成"
		}
	]

	const popup = ref<InstanceType<typeof lzPopup>>();
	/**
	 * @description: 动态设置右上角弹出 功能菜单高度
	 * @return {H} 高度
	 * @author lz 2023-05-23
	 */
	const popupBodyHeight = computed(() => {
		const H : number = menus.length * 76;
		return H
	})

	const navRightIcon = () => {
		popup.value.show(uni.upx2px(460), navHeight + uni.upx2px(20))
	}

	/**
	 * @description: 导航栏右上角列表逻辑处理
	 * @@return void
	 * @author lz 2023-05-23
	 */
	const handleMenus = (item : Menu) => {
		if (item.event == "popup") {
			popup.value.show()
		}
	}

	/**
	 * @description: 动态设置内容区域样式
	 * @author lz 2023-05-19
	 */
	const contentStyle = computed(() => {
		return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`
	})

	const leveList = reactive([
		{
			name: '别睡懒觉',
			tips: "3月10日 过期三天",
			expanded: true,
			directoryIcon: "icon",
			type: "parent"
		},
		{
			name: '周六计划',
			expanded: true,
			directoryIcon: "icon",
			type: "parent",
			children: [
				{
					name: '春游',
				}
			]
		},
		{
			expanded: true,
			directoryIcon: "icon",
			directoryName: "伟大的计划😊",
			children: [
				{
					name: '周六计划',
					tips: "3月10日 过期三天"
				},
				{
					name: '胶卷相机',
					tips: "3月22日"
				}
			]
		}
	])
	
</script>

<style lang="scss" scoped>
	.quadrants-wrap {
		display: flex;
		flex-direction: column;
		height: 100vh;
		.quadrants-content {
			box-sizing: border-box;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			margin: 0 30rpx;
		}
	}

	.popup-menus-wrap {
		width: 260rpx;

		.popup-menus-item {
			padding: 0 20rpx;
			height: 80rpx;
			display: flex;
			align-items: center;

			.menus-icon {
				// font-size: 40rpx;
			}

			.menus-name {
				margin-left: 20rpx;
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #333;
			}
		}

		.menus-hover {
			background-color: #f8f9fa;
		}
	}
</style>