<template>
	<view>
		<image mode="widthFix" class="topviewimg" src="/static/xinwenzixuna.png"></image>
		<view class="colonn " style="z-index: 10000;">
			<view class="roww rowsb m-top-107" style="z-index: 10000;padding:40rpx;">
				<image src="/static/zuojiantou.png" class="w-50 h-50"></image>
				<view class="sousuoview roww center_center ">
					<input class="pltxt" placeholder-class="pltxt" placeholder="请输入搜索内容" />
				</view>
			</view>
			<view class="roww rowsa center_center menus">
				<view :class="{
					'menuxselview':type==1,
					'menuxselview1':type!=1,
				}" @click="typeClick(1)">新闻资讯</view>
				<view :class="{
					'menuxselview':type==2,
					'menuxselview1':type!=2,
				}" @click="typeClick(2)">协会动态</view>
				<view :class="{
					'menuxselview':type==3,
					'menuxselview1':type!=3,
				}" @click="typeClick(3)">品牌推荐</view>
				<view :class="{
					'menuxselview':type==4,
					'menuxselview1':type!=4,
				}" @click="typeClick(4)">全国展会</view>
			</view>
			<view class="contentview" v-if="type<=2">
				<!-- <scroll-view class="colonn " scroll-y 
				style="height:820rpx;"> -->
				<view class="colonn">
					<block v-for="(item,index) in 7">
						<view class="roww">
							<image class="leftimg"></image>
							<view class="w-10"></view>
							<view class="colonn rowsb">
								<view class="colonn">
									<view class="fs-40" style="font-weight: bold;">协会状态</view>
									<view class="h-10"></view>
									<view class="fs-25 txtShowLength w-420">新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介
									</view>
								</view>
								<view class="fs-25">2024-04-04</view>
							</view>
						</view>
						<view class="cenline"></view>
					</block>
				</view>
				<!-- </scroll-view> -->
			</view>

			<view class="colonn" v-if="type==3" style="margin:0rpx 15rpx;">
				<view class="h-20"></view>
				<image class="h-318 w-688 ppimg1"></image>
				<view class="h-30"></view>
				<video class="h-318 w-688 ppimg1"></video>
				<view class="h-30"></view>
				<view class="huanhang">
					<view class="colonn " v-for="(item,index) in 10" style="margin:15rpx;">
						<image class="goodimg"></image>
						<view class="h-10"></view>
						<view class="w-151 txtShowLength fs-25">啊实打实大啊实打实大</view>
					</view>
				</view>
				<view class="h-26"></view>
				<view class="roww rowsa">
					<image src="/static/zsjm.jpg" class="w-121 h-121"></image>
					<image src="/static/qiyedizhi.jpg" class="w-121 h-121"></image>
					<image src="/static/qitanhezuo.jpg" class="w-121 h-121"></image>
				</view>
				<view class="h-16"></view>
			</view>

			<view class="contentview " v-if="type==4">
				<view class="colonn center_center">
					<view style="color:#327441;font-weight: bold;">全国行业按照时间排名</view>
					<image v-for="(item,index) in 3" src="../../static/as.jpg" class="br-20 w-635 m-top-23 h-277">
					</image>
					<view class="h-20"></view>
				</view>
				<view class="roww w-635 rowsa">
					<view class="colonn center_center">
						<image class="w-250 h-70 br-100" src="/static/baomingcanzhan.png"></image>
						<view class="h-10"></view>
						<view class="dianhuaa">0000-123456789</view>
					</view>
					<view class="colonn center_center">
						<image class="w-250 h-70 br-100" src="/static/baomingcnaguian.jpg"></image>
						<view class="h-10"></view>
						<view class="dianhuaa">0000-123456789</view>
					</view>
				</view>
			</view>

			<view class="h-20"></view>
			<image v-if="type<=2" class="swimff"></image>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 3
			}
		},
		onLoad(index) {
			
		},
		methods: {
			typeClick(index) {
				this.type = index;
			}
		}
	}
</script>

<style>
	@import url(menus.css);
</style>