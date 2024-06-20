<template>
	<view>
		<image class="topviewimg" src="/static/indextop.png"></image>
		<view class="colonn p-all-36 poab" style="margin-top:100rpx;z-index: 1000;">
			<view class="roww rowsa center_center">
				<view class="shouyyetx">首页</view>
				<image class="w-470 h-50" 
				 @click.stop="toQiyeList(0)"
				src="../../static/sousuoimg.png"></image>
			</view>
			<view class="h-40"></view>
			<swiper class="w-678 h-315">
				<swiper-item class="w-678 h-315"
				v-for="(item,index) in bannerList"
				@click.stop="toWebview(item)"
				>
					<image mode="aspectFill" 
					class="bannerimg" 
					:src="item.image"></image>
				</swiper-item>
			</swiper>
			<view class="roww rowsa fs-25 center_center menus"
			 >
				<view  @click.stop="toxwPage(1)">新闻资讯</view>
				<view  @click.stop="toxwPage(2)">协会动态</view>
				<view  @click.stop="toxwPage(3)">品牌推荐</view>
				<view  @click.stop="toxwPage(4)">全国展会</view>
			</view>
			<view class="h-19"></view>
			<view class="roww">
				<view class="colonn">
					<image src="/static/muye.png" @click.stop="toXinwenList(2)" class="w-337 h-98"></image>
					<view class="h-10"></view>
					<image src="/static/guojimuye.png" @click.stop="toXinwenList(1)" class="w-337 h-98"></image>
				</view>
				<view class="w-10"></view>
				<image @click.stop="toXinwenList(3)" src="../../static/zhanhuixinwen.png" class="w-339 h-202"></image>
			</view>   
			<view class="h-18"></view>
			<view class="roww rowsa">
				<view class="pore colonn  typeviewqq1" @click.stop="toQiyeList(0)">
					<view class="fs-25 typename">全屋定制</view>
					<view class="numjiajia" v-if="qiyeNums.length>0">{{qiyeNums[0].params.companyNum}}</view>
					<view class="numjiajia" v-else>0</view>
					<view class="zaixianqiye">在线企业</view>
					<image src="/static/hongseicon.png" class="righticon"
						style="position:absolute;bottom:5rpx; right: 5rpx;"></image>
				</view>

				<view class="pore colonn  typeviewqq2" @click.stop="toQiyeList(1)">
					<view class="fs-25 typename">人造板</view>
					<view class="numjiajia" v-if="qiyeNums.length>0">{{qiyeNums[1].params.companyNum}}</view>
						<view class="numjiajia" v-else>0</view>
						<view class="zaixianqiye">在线企业</view>
					<image src="/static/lvseicon.png" class="righticon"
						style="position: absolute;bottom: 5rpx; right: 5rpx;"></image>
				</view>

				<view class="pore colonn  typeviewqq3" @click.stop="toQiyeList(2)">
					<view class="fs-25 typename">辅料专区</view>
					<view class="numjiajia" v-if="qiyeNums.length>0">{{qiyeNums[2].params.companyNum}}</view>
					
						<view class="numjiajia" v-else>0</view>
						<view class="zaixianqiye">在线企业</view>
					<image src="/static/lanseicon.png" class="righticon"
						style="position: absolute;bottom: 5rpx; right: 5rpx;"></image>
				</view>

				<view class="pore colonn  typeviewqq4" @click.stop="toQiyeList(3)">
					<view class="fs-25 typename">木工机械</view>
					<view class="numjiajia" v-if="qiyeNums.length>0">{{qiyeNums[3].params.companyNum}}</view>
					
						<view class="numjiajia" v-else>0</view>
					<view class="zaixianqiye">在线企业</view>
					<image src="/static/zongseicon.png" class="righticon"
						style="position: absolute;bottom: 5rpx; right: 5rpx;"></image>
				</view>
			</view>

			<view class="colonn">
				<image src="/static/gongxufabu.png" @click="toGxfb" class="w-688 h-300"></image>
				<view class="h-12"></view>
				<view class="huanhang rowsa">
					<image @click.stop="toScfb" class="w-335 h-165" src="/static/quanguoshichangfenbu.png"></image>
					<image @click.stop="tSc" class="w-335 h-165" src="/static/shichangdaipaotuiguangyewu.png"></image>
					<image @click.stop="toZplist" class="w-335 h-165" src="/static/qiyezhoapin.png"></image>
					<image @click.stop="toQz" class="w-335 h-165" src="/static/qiuzhixinxi.png"></image>
				</view>
				<view class="h-10"></view>
				<view class="roww center_center">
					<scroll-view class="w-670" scroll-x>
						<view class="roww">
							<image v-for="(item,index) in addImgs" 
							@click.stop="toWebview(item)"
							:src="item.image"  mode="aspectFill"
							class="adimg"></image>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="h-100"></view>
		</view>
		<!-- <image class="h-950 w-750"></image> -->
		<tabbarBottom :index="1"></tabbarBottom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[],//轮播图
				qiyeNums:[],
				addImgs:[],
			}
		},
		onLoad() {
			this.getBanner();
			this.getQiyeNums();
			this.adImagelist();
		},
		methods: {
			
			// 获取广告 
			adImagelist(){
				var data ={
					adPlace:'1',
				};
				var url = this.$paths.adImagelist;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.addImgs=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
			// 获取企业数量
			getQiyeNums(){
				var data ={};
				var url = this.$paths.listCompanyNum;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.qiyeNums=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 前往网页
			toWebview(item){
				if(item.jumpPath){
					uni.setStorageSync("webview",item.jumpPath)
					uni.navigateTo({
						url:"/pages3/webview/webview"
					})
				}
			},
			
			// 获取轮播图
			getBanner(){
				var data ={};
				var url = this.$paths.imageCarouselList;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.bannerList=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			tSc(){
				uni.navigateTo({
					url:"/pages2/daipaiyewu/daipaiyewu"
				})
			},
			toQz(){
				uni.navigateTo({
					url:"/pages2/showJl/showJl"
				})
			},
			toZplist(){
				uni.navigateTo({
					url:"/pages2/zpAll/zpAll"
				})
			},
			toGxfb(){
				uni.navigateTo({
					url:"/pages2/gxptAll/gxptAll"
				})
			},
			toScfb(){
				uni.navigateTo({
					url:"/pages2/qgscfb/qgscfb"
				})
			},
			toQiyeList(index) {
				uni.navigateTo({
					url: "/pages1/qiyeList/qiyeList?index=" + index
				})
			},
			toXinwenList(index) {
				uni.navigateTo({
					url: "/pages1/xinwenList/xinwenList?index=" + index
				})
			},
			toxwPage(index) {
				uni.redirectTo({
					url: "/pages/index3/index3?index="+index
				})
			},
		}
	}
</script>

<style>
	@import url(index.css);
	page {
		background-color: #f5f5f5;
	}
</style>