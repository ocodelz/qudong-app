<template>
	<view class="agreement">
		<label class="agreement-label">
			<checkbox-group @change="checkboxChange">
				<checkbox value="agreement" :checked="checked" color="#ED4C46" style="transform:scale(0.5)" />
				<text>同意并阅读</text>
				<text class="agreement-link">《用户协议》</text>
				<text>与</text>
				<text class="agreement-link">《隐私政策》</text>
			</checkbox-group>
		</label>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	let checked = ref<boolean>(false);
	const checkboxChange = () => {
		checked.value = !checked.value
	}
	defineExpose({
		checked
	})
</script>

<style lang="scss" scoped>
	.agreement {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		font-family: 江城圆体-700W, 江城圆体;
		font-weight: normal;
		color: #999;
		height: 30rpx;

		&-link {
			color: #E96161;
			text-decoration: underline;
		}
	}
</style>