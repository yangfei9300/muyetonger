<template>
	<view>
		<image mode="widthFix" class="topviewimg" src="/static/xinwenzixuna.png"></image>
		<view class="colonn " style="z-index: 10000;">
			<view class="roww rowsb m-top-107" style="z-index: 10000;padding:40rpx;">
				<!-- <view class="sousuoview roww center_center ">
					<input class="pltxt" placeholder-class="pltxt" placeholder="请输入搜索内容" />
				</view> -->
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
					<block v-for="(item,index) in znewList">
						<view class="roww" @click.stop="toshowInfo(item)">
							<image class="leftimg" mode="aspectFill" :src="item.image"></image>
							<view class="w-10"></view>
							<view class="colonn rowsb">
								<view class="colonn">
									<view class="fs-30 w-400 txtShowLength" style="font-weight: bold;">{{item.title}}</view>
									<view class="h-10"></view>
									<view class="fs-25 yincang1 txtShowLength w-420">
										新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介
									</view>
								</view>
								<view class="fs-25">{{item.createTime}}</view>
							</view>
						</view>
						<view class="cenline"></view>
					</block>

				</view>
				<!-- </scroll-view> -->
			</view>

			<view class="colonn" v-if="type==3" style="margin:0rpx 15rpx;">
				<view class="h-20"></view>
				<!-- addImgs3 -->

				<swiper class="swimff swioead1">
					<swiper-item class="swimff" v-for="(item,index) in addImgs3">
						<image @click.stop="toWebview(item)" :src="item.image" mode="aspectFill" class="swimff"></image>
					</swiper-item>
				</swiper>

				<!-- <view class="h-30"></view> -->
				<!-- <video class="h-318 w-688 ppimg1"></video> -->
				<view class="h-30"></view>
				<view class="huanhang m-left-15">
					<view class="colonn " 
					v-for="(item,index) in qiyeList"
					 v-if="item.jumpPath"
					 @click.stop="toViewp(item)"
					style="margin:10rpx;">
						<image class="goodimg" mode="aspectFill" :src="item.image"></image>
						<view class="h-10"></view>
						<view class="w-151 txtShowLength fs-25" style="text-align: center;">{{item.name}}</view>
					</view>
				</view>
				<view class="h-26"></view>
				<view class="roww rowsa">
					<image src="/static/zsjm.jpg" @click.stop="phoenAlertClick(0)" class="w-121 h-121"></image>
					<image src="/static/qiyedizhi.jpg" @click.stop="phoenAlertClick(1)" class="w-121 h-121"></image>
					<image src="/static/qitanhezuo.jpg" @click.stop="phoenAlertClick(2)" class="w-121 h-121"></image>
				</view>
				<view class="h-16"></view>
			</view>

			<view class="contentview " v-if="type==4">
				<view class="colonn center_center">
					<view style="color:#327441;font-weight: bold;">全国展会按照时间排名</view>
					<image v-for="(item,index) in zhanhuiList" :src="item.image" class="br-20 w-635 m-top-23 h-277">
					</image>
					<view class="h-20"></view>
				</view>
				<view class="roww w-635 rowsa">
					<view class="colonn center_center" @click.stop="phoenAlertClick(0)">
						<image class="w-250 h-70 br-100" src="/static/baomingcanzhan.png"></image>
						<view class="h-10"></view>
						<!-- <view class="dianhuaa">0000-123456789</view> -->
					</view>
					<view class="colonn center_center" @click.stop="phoenAlertClick(0)">
						<image class="w-250 h-70 br-100" src="/static/baomingcnaguian.jpg"></image>
						<view class="h-10"></view>
						<!-- <view class="dianhuaa">0000-123456789</view> -->
					</view>
				</view>
			</view>
			<view class="h-20"></view>
			<swiper class="swimff swioead">
				<swiper-item class="swimff" v-for="(item,index) in addImgs">
					<image v-if="type<=2" @click.stop="toWebview(item)" :src="item.image" mode="aspectFill"
						class="swimff"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="h-100"></view>

		<view class="huuibeijing colonn center_center" style="z-index:1000000;" v-if="phoenAlert">
			<view class="viewss colonn center_center">
				<view>招商加盟</view>
				<view class="h-40"></view>
				<view class="roww center_center">
					<view class="w200h"></view>
					<view class="hyico"></view>
					<view class="w200h"></view>
				</view>
				<view class="h-40"></view>
				<view class="dianhuas">0000-123456789</view>
				<view class="h-40"></view>
				<image src="/static/myt1.png" class="w-60 h-60"></image>
			</view>
			<image src="/static/guanbi.png" @click.stop="phoenAlertClick" class="w-50 h-50 m-top-50"></image>
		</view>

		<tabbarBottom :index="3"></tabbarBottom>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				phoenAlert: false,

				znewList: [], //最新新闻列表
				// 获取全国展会排名
				zhanhuiList: [], //全国展会
				qiyeList: [], //推荐品牌
				addImgs: [],

				addImgs3: [],
			}
		},
		onLoad(options) {
			
			if(options.index){
				this.type=options.index;
			}
			
			this.getZNews();
			this.getPaiming();
			this.getPinpai();
			this.adImagelist();
			this.adImagelist3();
		},
		methods: {
	toViewp(item) {
				if (!item.jumpPath) {
					this.$tools.showToast("请完善企业链接");
					return false;
				}
				uni.setStorageSync("xinwenUrl", item.jumpPath)
				uni.navigateTo({
					url: "/pages1/xinwenVIew/xinwenVIew"
				})
			},
			tokefu() {
				uni.navigateTo({
					url: "/pages3/kefus/kefus"
				})
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
			adImagelist3() {
				var data = {
					adPlace: '3'
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

			// 获取广告
			adImagelist() {
				var data = {
					adPlace: '2'
				};
				var url = this.$paths.adImagelist;
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.addImgs = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},

			// 获取推荐品牌
			getPinpai() {
				var url = this.$paths.companylist;
				var data = {
					pageNum: 1,
					pageSize: 10000,
					recommend: '1'
				}
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.qiyeList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取全国展会排名
			getPaiming() {
				var data = {};
				var url = this.$paths.exhibitionInfolist;
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.zhanhuiList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取协会动态 
			getXiehuiDongtai() {
				var data = {};
				var url = this.$paths.associationNewslist;
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.znewList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取最新新闻
			getZNews() {
				var data = {};
				var url = this.$paths.newslistnew;
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.znewList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},

			typeClick(index) {
				this.type = index;
				if (index == 1) {
					this.getZNews()
				} else if (index == 2) {
					this.getXiehuiDongtai();
				}
			},
			toshowInfo(item) {
				uni.setStorageSync("xinwenUrl", item.jumpPath);
				uni.navigateTo({
					url: "/pages1/xinwenVIew/xinwenVIew"
				})
			},
			phoenAlertClick() {
				// this.phoenAlert = !this.phoenAlert;
				this.tokefu();
			},
		}
	}
</script>

<style>
	@import url(menus.css);
</style>