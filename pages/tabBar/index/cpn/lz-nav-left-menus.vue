<template>
	<lz-popup ref="popup" :body-width="496" :body-height="882">
		<view class="popup">
			
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import { ref } from "vue"
	const popup = ref<InstanceType<typeof lzPopup>>();

	const show = (x?:number,y?: number) => {
		popup.value.show(x,y);
	}

	const hide = () => {
		popup.value.hide();
	}
	
	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup {
		width: 496rpx;
		height: 882rpx;
		overflow: hidden;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
</style>