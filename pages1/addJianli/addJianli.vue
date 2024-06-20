<template>
	<view>
		<view class="colonn">
			<image :src="imgs" mode="widthFix" class="w-750"></image>
		</view>
		<view class="querenbtn" @click.stop="selImg">上传简历</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs:""
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
				this.imgs=userInfo.resume;
			} 
		},
		methods: {
			// 提交
			submit(){
				var data={
					id:this.userInfo.id,
					resume:this.imgs
				};
				var url = this.$paths.updatehunt;
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
