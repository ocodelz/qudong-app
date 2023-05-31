<template>
	<view class="about-wrap">
		<lz-nav-bar 
			:left-icon="'\ue602'" 
			leftText="个人中心"
		>
		</lz-nav-bar>
		<view class="about-content" :style="contentStyle">
			<lz-feature-list :data="list" @click="handleCell" @switch-change="switchChange"></lz-feature-list>
			<lz-feature-list :data="notice" @click="handleCell"></lz-feature-list>
		</view>
	</view>
	<lz-popup 
		ref="popup"
		title="完成提示音" 
		is-header
		:header-h="122" 
		maskColor 
		:bodyWidth="590" 
		:bodyHeight="520" 
		center
		left-icon=""
		right-icon=""
		is-footer
		:footer-h="96"
	>
		<view class="popup-content">
			<radio-group @change="radioChange">
				<label class="cell" v-for="(item, index) in radioList" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === radioCurrent" style="transform: scale(0.6);" />
					</view>
					<view class="radio-name">{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<template #footer>
			<view class="popup-bottom-action">
				<text>取消</text>
			</view>
			<view class="popup-bottom-action">
				<text>确定</text>
			</view>
		</template>
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
	
	const list: Array<Cell> = [
		{
			title: "完成提示音",
			type: "popup"
		},
		{
			title: "提示铃声",
			type: "popup"
		},
		{
			title: "提示震动",
			value: false,
			type: "switch",
			isRightIcon: false,
			label: "开启后，提醒持续2分钟"
		}
	]
	
	const notice: Array<Cell> = [
		{
			title: "提示未生效？",
			icon: "/static/images/common/notice_warning.png",
			url: "/pages/audioAndAlertSettings/completionSound/completionSound"
		}
	]
	
	const popup = ref < InstanceType < typeof lzPopup >> ();
	
	const handleCell = (item: Cell) => {
		if(item.type == "popup"){
			popup.value.show()
		}
		if(item.url){
			uni.navigateTo({
				url: item.url
			})
		}
	}
	
	let radioCurrent = ref<number>(-1);
	const radioList = [
		{
			value: 'dd',
            name: '叮咚'
		},
		{
			value: 'fg',
		    name: '复古'
		},
		{
			value: 'kh',
		    name: '科幻'
		},
		{
			value: 'wu',
		    name: '无'
		}
	]
	const radioChange = (e: any) => {
		
	}
	
	let isSwitch: boolean = false;
	
	const switchChange = (value: boolean) => {
		isSwitch = value;
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
	}
	
	.popup-content{
		padding: 0 40rpx;
		
		.cell{
			display: flex;
			align-items: center;
			
			.radio-name{
				margin-left: 10rpx;
				font-size: 26rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #333;
			}
		}
		
		.cell:not(:last-child){
			margin-bottom: 40rpx;
		}
	}
	
	.popup-bottom-action{
		text-align: center;
		flex: 1;
		font-size: 28rpx;
		font-family: 江城圆体-500W, 江城圆体;
		font-weight: normal;
		color: #ED4C46;
	}
</style>