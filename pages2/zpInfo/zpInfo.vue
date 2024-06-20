<template>
	<view>
		<image :src="qiyeInfo.recruit" class="w-750 " mode="widthFix"></image>
		<view class="h-120"></view>
		<view class="querenbtn" @click.stop="makePhone">点击联系</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qiyeInfo: ""
			}
		},
		onLoad() {
			this.qiyeInfo = uni.getStorageSync("qiyeInfo");
		},
		methods: {
			makePhone(){
				uni.makePhoneCall({
					phoneNumber:this.qiyeInfo.tel
				})
			},
		}
	}
</script>

<style>
	.querenbtn {
		width: 500rpx;
		height: 70rpx;
		/* background-image: url(/static/#61C0AE); */
		background-color: #61C0AE;
		background-size: 100% 100%;
		border-radius: 20rpx;
		text-align: center;
		color: white;
		font-weight: bold;
		line-height: 70rpx;
		margin-top: 35rpx;
		position: fixed;
		bottom: 50rpx;
		left: 125rpx;
	}
</style>