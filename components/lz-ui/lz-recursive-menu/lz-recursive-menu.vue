<template>
	<view class="recursive-menu-wrap">
		<view 
			class="cell" 
			:key="index"
			v-for="(item,index) in data.list" 
			:style="cellStyle(item)"
		>
			<view class="pinned" v-if="item.isTop">
				<view class="pinned-left">
					<image class="pinned-img" src="/static/images/index/pinned.png" />
					<text class="pinned-text">置顶</text>
				</view>
				<view class="pinned-right" v-if="hasChildren(item)">
					<text class="num">{{item.children.length + 1}}</text>
					<text 
						class="iconfont pinned-action-icon"
						:class="item.expanded ? 'icon-a-Group2028' : 'icon-a-Group35752'"
					>
					</text>
				</view>
			</view>
			<view v-if="data.type == 'quadrants' && item.children && item.children.length > 0"
			 class="quadrants-box"
			>
				<text class="quadrants-directory-name" v-if="item.directoryName">{{item.directoryName}}</text>
				<view v-if="item.directoryName">
					<text class="num">{{item.children.length}}</text>
					<text 
						class="iconfont icons" 
						@click="toggleExpand(index)"
						:class="item.expanded ? 'icon-a-Group2028' : 'icon-a-Group35752'"
					>
					</text>
				</view>
			</view>	
			<view class="item" v-if="item.name">
				<view class="item-left">
					<label class="label">
						<checkbox-group>
							<checkbox value="agreement" color="#ED4C46" style="transform:scale(0.6);" />
						</checkbox-group>
					</label>
				</view>
				<view class="item-right" :style="data.type == 'quadrants' ? 'margin-top: 10rpx;' : ''">
					<view class="item-right-content">
						<view class="item-right-name" :style="nameStyle">{{item.name}}</view>
						<view class="collapse" v-if="hasChildren(item)">
							<text class="num">{{item.children.length + 1}}</text>
							<text 
								class="iconfont icons" 
								@click="toggleExpand(index)"
								:class="item.expanded ? 'icon-changyong_shouqi' : 'icon-changyong_zhankai'"
							>
							</text>
						</view>
					</view>
					<text class="item-right-info" v-if="item.info && data.displayMode == false">{{item.info}}</text>
					<view class="item-bottom">
						<view class="item-bottom-left">
							<text class="tips" :style="dataStyle(item)">{{item.tips}}</text>
						</view>
						<view class="item-bottom-right" v-if="item.directoryName && data.type != 'quadrants'">
							<text class="directory-cion">{{item.directoryIcon}}</text>
							<text class="directory-name">{{item.directoryName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="item.children && item.children.length > 0">
				<lz-recursive-menu 
					:display-mode="data.displayMode" 
					:list="item.children" 
					v-if="item.expanded"
					:indent="item.name ? data.indent + 1 : data.indent"
					:type="data.type"
				>
				</lz-recursive-menu>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	/**
	 * author 
	 * recursive-menu 无限级目录
	 * @description 一般用于多级树结构目录
	 * @property {String | Number} list 数组
	 * @property {Number} indent 缩进
	 */
	import lzRecursiveMenu from "@/components/lz-ui/lz-recursive-menu/lz-recursive-menu"
	import { computed } from "vue";

	interface Props {
		list: Array<any>,
		indent?: number,
		displayMode?: boolean,
		padding?: Array<string | number>
		type?: string
	}

	const data = withDefaults(defineProps<Props>(), {
		list: () => [],
		indent: 0,
		displayMode: false,
		type: ""
	})
	
	/**
	 * @description: 动态处理主体内容样式
	 * @return 主体文字颜色
	 * @author lz 2023-05-19
	 */
	const dataStyle = computed(() => {
		return function (item) {
			let color : string = item.type == 'parent' ? '#E96161' : ''
			let size: number = data.type == 'quadrants' ? 16 : 20;
			return `
				color: ${color};
				font-size: ${size}rpx;
			`
		}
	})
	
	/**
	 * @description: 动态处理cell样式
	 * @return 主体文字颜色
	 * @author lz 2023-05-24
	 */
	const cellStyle = computed(() => {
		return function(item){
			if(item.name){
				return `
					padding-left: ${getIndentation()}rpx;
				`
			}
		}
	})
	
	/**
	 * @description: 动态计算缩进距离
	 * @return 缩进距离
	 * @author lz 2023-05-23
	 */
	const getIndentation = () => {
		const indentationSize: number = data.type == 'quadrants' ? 18 : 28;
		return data.indent * indentationSize;
	}

	/**
	 * @description: 是否展示收缩按钮
	 * @return true/false
	 * @author lz 2023-05-23
	 */
	const hasChildren = (item: any) => {
		return item.children && item.children.length > 0;
	}

	/**
	 * @description: 动态设置name样式 
	 * @return 超出一行显示省略号样式
	 * @author lz 2023-05-23
	 */
	const nameStyle = computed(() => {
		const size : number = data.type == "quadrants" ? 20 : 28
		if (data.displayMode) {
			return `
				-webkit-line-clamp: 1;
				font-size: ${size}rpx;
			`
		}
		return `
			font-size: ${size}rpx;
		`
	})
	
	/**
	 * @description: 切换显示方式 收缩/展开
	 * @return void
	 * @author lz 2023-05-23
	 */
	const toggleExpand = (index: number) => {
		data.list[index].expanded = !data.list[index].expanded
	}
	
	/**
	 * @description: 注册事件
	 * @return void
	 * @author lz 2023-05-23
	 */
	const emit = defineEmits(['expanded'])
</script>

<style lang="scss" scoped>
	.recursive-menu-wrap {
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
		// padding: 20rpx;
		.cell {
			// border: 1px solid #000;
			margin-top: 20rpx;
			.pinned {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;
		
				&-left {
					display: flex;
					align-items: center;
		
					.pinned-img {
						width: 28rpx;
						height: 28rpx;
					}
		
					.pinned-text {
						font-size: 24rpx;
						font-family: 江城圆体-600W;
						font-weight: normal;
						color: #666;
						margin-left: 18rpx;
					}
				}
		
				&-right {
					color: #666;
					display: flex;
					align-items: center;
		
		
		
					.pinned-action-icon {
						font-size: 28rpx;
					}
				}
			}
			.quadrants-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.quadrants-directory-name{
				font-size: 20rpx;
				font-family: 江城圆体-600W, 江城圆体;
				font-weight: normal;
				color: #666;
			}
			.item {
				display: flex;
		
				&-left {
					// margin-top: -3.5rpx;
					flex-shrink: 0;
				}
		
				&-right {
					display: flex;
					flex-direction: column;
					flex: 1;
					.collapse{
						display: flex;
						align-items: center;
					}
					.icons {
						font-size: 28rpx;
						color: #666;
					}
		
					&-content {
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
		
					&-name {
						font-size: 28rpx;
						font-family: 江城圆体-600W, 江城圆体;
						font-weight: normal;
						color: #333;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
		
					}
		
					&-info {
						font-size: 24rpx;
						font-family: 江城圆体-500W, 江城圆体;
						font-weight: normal;
						color: #666;
					}
		
					.item-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;
		
						&-left {
							display: flex;
							align-items: center;
		
							.tips {
								font-size: 20rpx;
								font-family: 江城圆体-500W, 江城圆体;
								font-weight: normal;
								color: #999;
							}
						}
		
						&-right {
							display: flex;
							align-items: center;
							font-size: 20rpx;
							font-family: 江城圆体-500W, 江城圆体;
							font-weight: normal;
							color: #999;
		
							.directory-cion {
								margin-right: 8rpx;
							}
		
							.directory-name {}
						}
					}
				}
			}
		}
		
		.cell:not(:last-child) {
			// padding-bottom: 20rpx;
		}
	}

	.num {
		font-size: 24rpx;
		font-family: 江城圆体-500W, 江城圆体;
		font-weight: normal;
		margin-right: 8rpx;
		color: #666;
	}
</style>