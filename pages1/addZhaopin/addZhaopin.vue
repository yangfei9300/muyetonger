<template>
	<view>
		<view class="colonn">
			<image :src="imgs" class="w-750 " mode="widthFix"></image>
		</view>
		<view class="querenbtn" @click.stop="selImg">上传招聘海报</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs:"",
				userInfo:{}
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
			}
			this.getQiyeInfo();
		},
		methods: {
			// 获取企业信息
			getQiyeInfo(){
				// 
				var data={
				};
				var url = this.$paths.companycompanyId+this.userInfo.companyId;
				this.$axios
					.axios('get', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.imgs=res.data.recruit;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 提交
			submit(){
				var data={
					id:this.userInfo.companyId,
					recruit:this.imgs,
				};
				var url = this.$paths.updaterecruit;
				this.$axios
					.axios('post', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("修改成功");
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			// updaterecruit
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
							this.imgs=res.url;
							this.submit();
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
	.querenbtn{
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
