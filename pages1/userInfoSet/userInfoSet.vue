<template>
	<view>
		<view>
			<view class="colonn">
				<view class="roww border_bottom w-750 center_center"
				style="padding: 20rpx 30rpx; "
				>
					<view>头像</view>
					<view style="color: red;">*</view>
					<view class="allline"></view>
					
					<image mode="aspectFill" 
					 v-if="userInfo.image"
					:src="userInfo.image" class="w-110 h-110" 
					style="background-color: aqua;border-radius: 50%;"
					@click.stop="selImg"
					></image>
					<image src="/static/shangchaum.png"
					class="w-110 h-110" v-else
					@click.stop="selImg"
					></image>
				</view>
				
			</view>
			
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>姓名</view>
					<view style="color: red;">*</view>
				</view>
				
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input v-model="userInfo.name" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>手机号</view>
					<view style="color: red;">*</view>
				</view>
				
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input  v-model="userInfo.phone" placeholder="请输入手机号" />
				</view>
			</view>
			
			<view class="roww center_center">
				<view class="querenbtn" @click.stop="saveuserInfo">确认修改</view>
			</view>
			
		</view>
	</view>   
</template>
  
<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onLoad() {
			this.userInfo=uni.getStorageSync("userInfo");
		},
		methods: {
			saveuserInfo(){
				var data={
					id:this.userInfo.id,
					name:this.userInfo.name,
					nickname:this.userInfo.name,  
					phone:this.userInfo.phone,
					image:this.userInfo.image,
				}
				var url = this.$paths.updateWxUser;
				// return false;   
				this.$axios
					.axios('post', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("修改完成");
							uni.navigateBack({
								delta:1
							})
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			selImg(){
				uni.chooseImage({
				  count: 1,
				  mediaType: ['image'],
				  sourceType: ['album', 'camera'],
				  maxDuration: 30,
				  camera: 'back',
				  success:(res)=> {
					if(res.tempFiles.length>0){
						this.uploadimg(res.tempFiles[0].path) 
					}
				  }
				})

			},
			uploadimg(imgurl){
				console.log(imgurl);
				this.$axios
					.axiosUpload(this.$paths.uploaduploadOSS,{},imgurl )
					.then(res => {
						if (res.code ==200) { 
							console.log(res)  
							this.userInfo.image=res.url;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			}
		}
	}
</script>

<style>
@import url(userInfoSet.css);
</style>
