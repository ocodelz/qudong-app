<template>
	<view class="wrap">
		<view class="content">
			<image class="loading-logo" src="/static/images/habitBuildingSystem/corgi.png"/>
			<view class="progress-box">
				<lz-progress 
					mode="bottom" 
					activeBackgroundColor="linear-gradient(360deg, #F4CE69 0%, #F9DF95 100%)"
				>
				</lz-progress>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import lzProgress from "@/components/lz-ui/lz-progress-bar/lz-progress-bar.vue"
</script>

<style lang="scss" scoped>
	.wrap{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #E2DAD7;
		display: flex;
		align-items: center;
		justify-content: center;
		.content{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.loading-logo{
				width: 192.46rpx;
				height: 297.62rpx;
			}
			.progress-box{
				width: 476.19rpx;
				margin-top: 39.68rpx;
			}
		}
	}
	
</style>