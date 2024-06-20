<template>
	<view>
		<view class="colonn" style="padding: 30rpx;">
			<view class="colonn">
				<view class="titlevi">类型：</view>
				<view class="h-10"></view>
				<view class="fs-30">闲置物品</view>
				<view class="h-20"></view>
			</view>
			<view class="colonn">
				<view class="titlevi">标题：</view>
				<view class="h-10"></view>
				<view class="fs-30">洗衣机出售</view>
				<view class="h-20"></view>
			</view>
			<view class="colonn">
				<view class="titlevi">姓名：</view>
				<view class="h-10"></view>
				<view class="fs-30">高胜飞</view>
				<view class="h-20"></view>
			</view>
			<view class="colonn">
				<view class="titlevi">电话：</view>
				<view class="h-10"></view>
				<view class="roww" style="color: blue;">
					<view class="fs-30" >18340070905</view>
					<view class="allline"></view>
					<view style="font-weight: bold;"
					@click.stop="tomakePhone"
					>点击拨打</view>
				</view>
				<view class="h-20"></view>
			</view>
			<view class="colonn">
				<view class="titlevi">详情：</view>
				<view class="h-10"></view>
				<view class="fs-30" >贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机贩卖二手洗衣机</view>
				<view class="h-20"></view>
				<image src="../../static/indextop.png" class="w-700" mode="widthFix"></image>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tomakePhone(phone){
				uni.makePhoneCall({
					phoneNumber:"546546"
				})
			}
		}
	}
</script>

<style>
@import url(gqInfo.css);
</style>
