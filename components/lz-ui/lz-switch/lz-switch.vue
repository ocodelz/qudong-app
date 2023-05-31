<template>
	<div 
		class="switch" 
		:class="{ 'switch--on': modelValue, 'switch--off': !modelValue }" 
		@click="toggleSwitch"
	>
		<div class="switch__button"></div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	
	let modelValue = ref<boolean>(false);
	
	const toggleSwitch = () => {
		modelValue.value = !modelValue.value;
		emit('click', modelValue.value)
	}
	
	const emit = defineEmits(['click'])
</script>

<style scoped>
	.switch {
		position: relative;
		width: 44rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background-color: #ccc;
		cursor: pointer;
	}

	.switch--on {
		background-color: #E96161;
	}

	.switch--off {
		background-color: #999;
	}

	.switch__button {
		position: absolute;
		top: -4rpx;
		left: 0px;
		width: 28rpx;
		height: 28rpx;
		border-radius: 100rpx;
		background-color: #333;
		transition: left 0.3s;

	}

	.switch--on .switch__button {
		left: 20rpx;
		background-color: #ED4C46;
	}

	.switch--off .switch__button {
		left: 0px;
	}
</style>