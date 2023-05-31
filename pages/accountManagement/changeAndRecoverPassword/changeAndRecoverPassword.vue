<template>
	<view>
		<lz-account-form 
			:type="type" 
			:left-text="leftText" 
			:btn-text="btnText"
		>
		</lz-account-form>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { onLoad } from '@dcloudio/uni-app'
	import lzAccountForm from "@/components/lz-ui/lz-account-from/lz-account-form.vue"

	let type = ref<string>("")
	let leftText = ref<string>("")
	let btnText = ref<string>("")

	onLoad((opt) => {
		if (opt?.type) {
			type.value = opt.type
		}
		init()
	})

	const init = () => {
		leftText.value = type.value == "1" ? "忘记密码" : "修改密码"
		btnText.value = type.value == "1" ? "重置密码" : "修改密码"
	}
</script>

<style>

</style>