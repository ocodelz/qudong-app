<template>
	<view>
		<lz-account-form 
			type="0" 
			left-text="邮箱登录" 
			btn-text="登录"
			@btnClick="btnClick"
		>
		</lz-account-form>
	</view>
</template>

<script lang="ts" setup>
	import lzAccountForm from "@/components/lz-ui/lz-account-from/lz-account-form.vue"
	
	const btnClick = () => {
		uni.reLaunch({
			url: "/pages/tabBar/index/index"
		})
	}
</script>

<style>

</style>