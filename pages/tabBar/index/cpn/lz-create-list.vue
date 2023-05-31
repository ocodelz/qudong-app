<template>
	<lz-popup 
		ref="popup" 
		title="新建清单"
		:body-width="690" 
		:body-height="492"
		:header-h="122"
		mask-color
		is-header
		center
		:left-icon="'\ue60d'"
		:right-icon="'\ue60d'"
	>
		<view class="popup-content">
			<view class="input-wrap">
				<input 
					class="popup-content-input" 
					v-model="inputText" 
					placeholder="清单名称" 
					placeholder-class="plc" 
				/>
			</view>
			<view class="popup-content-cell">
				<lz-feature-list 
					:height="100" 
					:data="list" 
					:margin-top="10" 
					:padding="[0,20]"
				>
				</lz-feature-list>
			</view>
		</view>
	</lz-popup>
</template>

<script lang="ts" setup>
	import lzPopup from "@/components/lz-ui/lz-popup/lz-popup.vue"
	import { Cell } from "@/common/interface"
	import { ref } from "vue"
	import lzFeatureList from "@/components/lz-ui/lz-feature-list/lz-feature-list.vue"

	const list : Array<Cell> = [
		{
			title: '清单图标',
			value: ""
		},
		{
			title: '文件夹',
			value: "无"
		}
	]

	let inputText = ref<string>("");

	const popup = ref<InstanceType<typeof lzPopup>>();

	const show = () => {
		popup.value.show();
	}

	const hide = () => {
		popup.value.hide();
	}

	let current = ref<number>(-1);

	const handlePopupItem = (index : number) => {
		current.value = index;
	}

	defineExpose({
		show
	})
</script>

<style lang="scss" scoped>
	.popup {
		width: 690rpx;
		height: 492rpx;
		overflow: hidden;
		padding: 0 20rpx;
		box-sizing: border-box;

		&-content {
			padding: 0 40rpx;
			box-sizing: border-box;

			.input-wrap {
				width: 610rpx;
				height: 76rpx;
				background-color: #F5F5F5;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;

				.popup-content-input {
					flex: 1;
				}

				::v-deep .plc {
					font-size: 28rpx;
					font-family: 江城圆体-600W, 江城圆体;
					font-weight: normal;
					color: #999;
				}
			}
		}
	}
</style>