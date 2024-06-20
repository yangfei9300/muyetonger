<template>
	<view>
		<view 
		class="bigview roww rowsa w-750" 
		>
			
			<view class="colonn center_center"
			@click.stop="toPage(1)" 
			>
				<image v-if="index==1" :src="icons[0].sel" 
				class="w-50 h-50"></image>
				<image v-else :src="icons[0].no"
				class="w-50 h-50"></image>
				<view class="h-10"></view>
				<view class="bottomno" v-if="index==1"></view>
				<view class="bottomno1" v-else></view>
			</view>
			
			<view class="colonn center_center"
			@click.stop="toPage(2)">
				<image v-if="index==2" :src="icons[1].sel"
				class="w-50 h-50"></image>
				<image v-else :src="icons[1].no"
				class="w-50 h-50"></image>
				<view class="h-10"></view>
				<view class="bottomno" v-if="index==2"></view>
				<view class="bottomno1" v-else></view>
			</view>
			
			<view class="colonn center_center"
			@click.stop="toPage(3)">
				<image v-if="index==3" :src="icons[2].sel"
				class="w-50 h-50"></image>
				<image v-else :src="icons[2].no"
				class="w-50 h-50"></image>
				<view class="h-10"></view>
				<view class="bottomno" v-if="index==3"></view>
				<view class="bottomno1" v-else></view>
			</view>
			<!-- <image src="/static/wowde1.png"></image> -->
			<view class="colonn center_center"
			@click.stop="toPage(4)">
				<image v-if="index==4" :src="icons[3].sel"
				class="w-50 h-50"></image>
				<image v-else :src="icons[3].no"  
				class="w-50 h-50"></image>
				<view class="h-10"></view>
				<view class="bottomno" v-if="index==4"></view>
				<view class="bottomno1" v-else></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabbarBottom",
		
		props: {
			index: {
				type: Number,
				value: null  
			},
		},
		
		data() {
			return {
				icons:[
					{
						'no':'/static/home2.png',
						'sel':'/static/home1.png',
					},
					{
						'no':'/static/video2.png',
						'sel':'/static/video1.png',
					},
					{
						'no':'/static/xinwen2.png',
						'sel':'/static/xinwen1.png',
					},{
						'no':'/static/wode2.png',
						'sel':'/static/wowde1.png',
					}
				]
			};
		},
		onLoad() {
			
		},
		methods:{
			toPage(index){
				if(index==1){
					uni.reLaunch({
						url:"/pages/index/index"
					})
				}else if(index==2){
					uni.redirectTo({
						url:"/pages/index2/index2"
					})
				}else if(index==3){
					uni.redirectTo({
						url:"/pages/index3/index3"
					})
				}else if(index==4){
					uni.redirectTo({
						url:"/pages/index4/index4"
					})
				}
			}
		}
	}
</script>

<style>
.bottomno{
	width: 50rpx;
	height:6rpx;
	background-color: #16805A;
}
.bottomno1{
	width: 50rpx;
	height:6rpx;
	background-color: #8a8a8a;
}
.bigview{
	padding:20rpx 0rpx;
	background-color: white;
	position: fixed;
	bottom: 0rpx;
	z-index: 999999;
	border-radius: 40rpx 40rpx 0rpx 0rpx;
}
</style>