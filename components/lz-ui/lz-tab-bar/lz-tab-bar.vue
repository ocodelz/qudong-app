<template>
	<view class="tabbar" :style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }">
		<view 
			class="tabbar-item" 
			v-for="(item, index) in list" 
			:key="index" 
			@click="handleTabBarChange(item.path)"
		>
			<image v-if="data.current == index" class="tabbar-item-img" :src="item.iconPath" />
			<image v-else class="tabbar-item-img" :src="item.icon" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	// import { onShow } from '@dcloudio/uni-app';
	interface Props {
		current : number;
	}

	const data = withDefaults(defineProps<Props>(), {
		current: 0,
	})

	let paddingBottomHeight = ref<number>(0);
	uni.getSystemInfo({
		success: function (res) {
			let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
			model.forEach(item => {
				if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
					paddingBottomHeight.value = 40;
				}
			})
		}
	})
	
	
	interface TabBar {
		text: string,
		icon: string
		iconPath: string
		path: string
	}
	
	const list: Array<TabBar> = [
		{
			text: "",
			icon: "/static/images/tabBar/index.png",
			iconPath: "/static/images/tabBar/index_active.png",
			path: "/pages/tabBar/index/index"
		},
		{
			text: "",
			icon: "/static/images/tabBar/calendar.png",
			iconPath: "/static/images/tabBar/calendar_active.png",
			path: "/pages/tabBar/calendar/calendar"
		},
		{
			text: "",
			icon: "/static/images/tabBar/quadrants.png",
			iconPath: "/static/images/tabBar/quadrants_active.png",
			path: "/pages/tabBar/quadrants/quadrants"
		},
		{
			text: "",
			icon: "/static/images/tabBar/habit_building_system.png",
			iconPath: "/static/images/tabBar/habit_building_system_active.png",
			path: "/pages/tabBar/habitBuildingSystem/main"
		},
		{
			text: "",
			icon: "/static/images/tabBar/user_profile.png",
			iconPath: "/static/images/tabBar/user_profile_active.png",
			path: "/pages/tabBar/userProfile/userProfile"
		}
	]

	const emit = defineEmits(["click"]);

	const handleTabBarChange = (path : string) => {
		uni.redirectTo({
			url: path
		})
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		position: fixed;
		bottom: 40rpx;
		left: 42rpx;
		right: 42rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 98rpx;
		background: #FFFFFF;
		box-shadow: 4rpx -4rpx 12rpx 0rpx rgba(0, 0, 0, 0.1), 4rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 40rpx;
		opacity: 1;

		&-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100rpx;

			&-img {
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
</style>