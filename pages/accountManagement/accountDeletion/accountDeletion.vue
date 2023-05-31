<template>
	<view>
		<lz-account-form 
			:type="type" 
			left-text="注销帐号" 
			btn-text="注销帐号"
		>
		</lz-account-form>
	</view>
	
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { onLoad } from '@dcloudio/uni-app'
	import lzAccountForm from "@/components/lz-ui/lz-account-from/lz-account-form.vue"
	
	let type = ref<string>("");
	
	onLoad((opt) => {
		if(opt?.type){
			type.value = opt.type
		}
	})
</script>

<style lang="scss" scoped>
	.popup{
		width: 590rpx;
		height: 270rpx;
		box-sizing: border-box;
		&-body{
			box-sizing: border-box;
			margin-top: 58rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.info{
				width: 240rpx;
				font-size: 28rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #333;
			}
			.desc{
				width: 408rpx;
				margin-top: 34rpx;
				font-size: 24rpx;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #ED4C46;
			}
		}
		&-bottom{
			margin-top: 80rpx;
			display: flex;
			.btn{
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				font-size: 14px;
				font-family: 江城圆体-500W, 江城圆体;
				font-weight: normal;
				color: #ED4C46;
			}
			.btn:last-child{
				color: #333;
			}
		}
	}
</style>