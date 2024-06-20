<template>
	<view>
		<view class="colonn">
			<view class="topview colonn" style="z-index: 1000;">
				<view class="colonn center_center">
					<view class="h-50"></view>
					<view class="fs-45" style="font-weight: bold;">我的</view>
					<view class="colonn center_center" v-if="userInfo">
						<view class="h-60"></view>
						
						<image v-if="userInfo.image" 
						class="headeim" 
						:src="userInfo.image"></image>
						<image v-else
						class="headeim" 
						src="/static/touxaing.png"></image>
						
						<!-- <view class="h-23"></view> -->
						<view>{{userInfo.nickname}}</view>
						<view class="fs-20" style="color:#F1917E;">ID：{{userInfo.id}}</view>
					</view>
					<view class="colonn center_center h-400" v-else>
						<view class="pore"  >请先授权登录
							<button 
							open-type="getPhoneNumber"
							@getphonenumber="getPhone"
							class="button1_sa"></button>
						</view>
					</view>
				</view>
			</view>

			<view class="bottomview colonn center_center">
				<view class="caidanview">
					<view class="roww  h-50" @click.stop="toPage(1)">
						<view>资料设置</view>
						<view class="allline"></view>
						<image src="/static/youjiantou.png" class="w-30 h-30"></image>
					</view>
					<view class="menuline1"></view>
						<view class="roww  h-50" @click.stop="toPage(2)"
						>
							<view v-if="userInfo.userType==2">企业信息修改</view>
							<view v-if="!userInfo||userInfo.userType==1">企业入驻</view>
							<view class="allline"></view>
							<image src="/static/youjiantou.png" class="w-30 h-30"></image>
						</view>
						<view class="menuline1"></view>
					
					<!-- <view class="roww  h-50">
						<view>我收藏的企业，供求，产品</view>
						<view class="allline"></view>
						<image src="/static/youjiantou.png" class="w-30 h-30"></image>
					</view> -->
					<!-- <view class="menuline1"></view> -->
					
					<block  v-if="userInfo&&userInfo.userType==2">
						<view class="roww  h-50" 
						v-if="userInfo&&userInfo.userType==2"
						@click.stop="toPage(10)"
						>
							<view>我发布的代跑业务</view>
							<view class="allline"></view>
							<image src="/static/youjiantou.png" class="w-30 h-30"></image>
						</view>
						<view class="menuline1"></view>
					</block>
					
					<view class="roww  h-50" @click.stop="toPage(5)"
					
					>
						<view>我发布的简历</view>
						<view class="allline"></view>
						<image src="/static/youjiantou.png" class="w-30 h-30"></image>
					</view>
					<view class="menuline1"></view>
					
					
					<block  v-if="userInfo&&userInfo.userType==2">
						<view class="roww  h-50"
						@click.stop="toPage(9)"
						>
							<view>我发布的招聘</view>
							<view class="allline"></view>
							<image src="/static/youjiantou.png" class="w-30 h-30"></image>
						</view>
						<view class="menuline1"></view>
					</block>
					
					<!-- <block  v-if="userInfo&&userInfo.userType==2">
						<view class="roww  h-50" @click.stop="toPage(7)"
						>
							<view>收到简历</view>
							<view class="allline"></view>
							<image src="/static/youjiantou.png" class="w-30 h-30"></image>
						</view>
						<view class="menuline1"></view>
					</block> -->
					
					
					<block  v-if="userInfo&&userInfo.userType==2">
						<view class="roww  h-50"  @click.stop="toPage(8)"
						>
							<view>我发布的视频</view>
							<view class="allline"></view>
							<image src="/static/youjiantou.png" class="w-30 h-30"></image>
						</view>
						<view class="menuline1"></view>
					</block>
					
					
				</view>
				<view class="h-100"></view>
			</view>
		</view>
		<view class="h-100"></view>

		<tabbarBottom  :index="4"></tabbarBottom>

	</view>
</template>

<script>
	export default {
		data() {
			return {    
				userInfo:null,
			}
		},
		onLoad() {  
			this.userInfo=uni.getStorageSync("userInfo");
			if(this.userInfo){
				this.getUserInfo()
			}    
			this.getUserInfo()
		},
		onShow() {
			if(this.userInfo){
				this.getUserInfo()
			}
		},
		methods: {     
			toSubmit(){
				// marketTaskpublish
			},
			getUserInfo(){
				var url = this.$paths.wxUserselect;
				var data={
					phone:this.userInfo.phone,
					// phone:"18340070905"
				}
				this.$axios
					.axios('post', url, data)  
					.then(res => {  
						if (res.code == 200) {
							uni.setStorageSync("userInfo",res.data);
							this.userInfo=res.data;
							this.$forceUpdate();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			getPhone(res){
				console.log("电话",res.detail.encryptedData,res.detail.iv,res);
				this.getCode(res.detail.encryptedData,res.detail.iv)
			},
			getCode(encryptedData,iv){
				console.log('--',encryptedData,iv)
				uni.login({
					success:(res)=> {
						console.log("login",res);
						this.getPhone1(encryptedData,iv,res.code)
					}
				})   
			},
			getPhone1(encryptedData,iv,code){
				var data={
					params:{
						encryptedData:encryptedData,
						iv:iv,
						code:code
					}  
				}
				console.log("参数",JSON.stringify(data));
				var url = this.$paths.wxUserlogin;
				// return false;   
				this.$axios
					.axios('post', url, data)  
					.then(res => {  
						if (res.code == 200) {
							uni.setStorageSync("userInfo",res.data);
							this.userInfo=res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			toPage(index) {
				console.log("ass",index,!this.userInfo);
				if(!this.userInfo){
					this.$tools.showToast("请先授权登录");
					return false;
				}
				if (index == 1) {
					uni.navigateTo({
						url: "/pages1/userInfoSet/userInfoSet"
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages1/conmmonAdd/conmmonAdd"
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: "/pages1/addJianli/addJianli"
					})
				} else if (index == 7) {
					uni.navigateTo({
						url: "/pages1/qiuzhiliebiao/qiuzhiliebiao"
					})
				} else if (index == 8) {
					uni.navigateTo({
						url: "/pages1/releaseVideo/releaseVideo"
					})
				} else if (index == 9) {
					uni.navigateTo({
						url: "/pages1/addZhaopin/addZhaopin"
					})
				}else if (index == 10) {
					uni.navigateTo({
						url: "/pages3/myRenwu/myRenwu"
					})  
				}
				
				
			},
		}
	}
</script>

<style>
	@import url(index4.css);
</style>