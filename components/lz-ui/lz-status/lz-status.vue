<template>
	<view class="lz-status" :style="statusStyle"></view>
</template>

<script lang="ts" setup>
	import { ref, onMounted, computed } from "vue"

	interface Props {
		bgColor ?: string | object
	}

	const data = withDefaults(defineProps<Props>(), {
		bgColor: '#F0F4F7',
	})

	let statusBarHeight = ref<string | number>(0);

	const statusStyle = computed(() => {
		return `
			height: ${statusBarHeight.value}px;
			background: ${data.bgColor};
		`
	})

	onMounted(() => {
		statusBarHeight.value = getApp().globalData.statusBarHeight;
	})

	defineExpose({
		statusBarHeight
	})
</script>

<style lang="scss" scoped>
	.lz-status {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>