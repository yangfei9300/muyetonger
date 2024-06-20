<template>
	<view>
		<swiper class="topimg" v-if="addImgs3.length>0">
			<swiper-item class="topimg" v-for="(item,index) in addImgs3" @click="toWebview(item)">
				<image class="topimg" mode="aspectFill" :src="item.image"></image>
			</swiper-item>
		</swiper>

		<v-tabs v-model="current" 
		activeColor="#21B783" 
		lineColor="#21B783" 
		:tabs="hangyeList" field="name"
		:scroll="false" 
		@change="changeTab"></v-tabs>

		<view class="huanhang rowsb" style="padding:25rpx;">
			<view class="colonn m-bottom-30" 
			v-for="(item,index) in videlList" 
			@click.stop="toVideoInfo(item)"
				v-if="videlList.length>0">
				<image mode="aspectFill" :src="item.image" class="w-335 h-200 br-15"></image>
				<view class="h-10"></view>
				<view class="roww">
					<view  class="w-335 fs-30 txtShowLength">{{item.adTitle}}</view>
				</view>
			</view>
			<block v-if="videlList.length<=0">
				<view class="roww w-750 center_center">
					<noList></noList>
				</view>
			</block>
		</view>
		<view class="h-100"></view>

		<tabbarBottom :index="2"></tabbarBottom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				options: {},
				hangyeList: [],
				videlList: [],
				addImgs3: [],
			}
		},

		onLoad(options) {
			if (options.index) {
				this.current = parseInt(options.index);
			}
			this.getHangye();
			this.adImagelist3();
		},
		methods: {

			// 前往网页
			toWebview(item) {
				if (item.jumpPath) {
					uni.setStorageSync("webview", item.jumpPath)
					uni.navigateTo({
						url: "/pages3/webview/webview"
					})
				}
			},
			// 前往网页
			toWebview(item) {
				if (item.jumpPath) {
					uni.setStorageSync("webview", item.jumpPath)
					uni.navigateTo({
						url: "/pages3/webview/webview"
					})
				}
			},
			// 获取广告
			// 获取广告
			adImagelist3() {
				var data = {
					adPlace: '4'
				};
				var url = this.$paths.adImagelist;
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.addImgs3 = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取视频列表
			getVideoList() {
				var url = this.$paths.videolistvideo;
				var data = {
					industryId: this.hangyeList[this.current].id
				}
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.videlList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取行业列表
			getHangye() {
				var url = this.$paths.industrylist;
				var data = {}
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.hangyeList = res.rows;
							this.getVideoList();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},

			toVideoInfo(item) {
				uni.setStorageSync("videourl", item.video)
				uni.navigateTo({
					url: "/pages3/videoInfo/videoInfo"
				})
			},
			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.current = index;
				this.getVideoList();
			},
		}
	}
</script>

<style>
	.topimg {
		width: 750rpx;
		height: 400rpx;
	}
</style>