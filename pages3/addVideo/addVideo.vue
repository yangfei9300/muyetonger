<template>
	<view>
		<view>
			<view class="colonn border_bottom">
				<view class="roww  w-750 " style="padding: 20rpx 30rpx;">
					<view>视频分类</view>
				</view>
				<picker :range="hangyeList" range-key="name"
				@change="hangyeChange">
					<view
					style="padding: 0rpx 30rpx 20rpx 30rpx;"
					>
						<view style="color: #666666;" v-if="!form.industryId">请选择</view>
						<view style="color: #000000;" v-else>{{hangyeTypetxt}}</view>
					</view>     
				</picker>
			</view>
			<view class="colonn border_bottom">
				<view class="roww  w-750 " style="padding: 20rpx 30rpx;">
					<view>视频标题</view>
				</view>
				<view style="padding: 0rpx 30rpx 20rpx 30rpx;">
					<input v-model="form.adTitle" placeholder="请输入视频标题" />
				</view>
			</view>

			<view class="colonn border_bottom">
				<view class="roww  w-750 " style="padding: 20rpx 30rpx;">
					<view>视频封面</view>
				</view>
				<view style="padding: 0rpx 30rpx 20rpx 30rpx;">
					
					
					
						<image class="w-300 br-10 h-150"
						v-if="form.image"  mode="aspectFill"
						@click.stop="selImg(2)"
						 :src="form.image"
						 style="background-color: aquamarine;"></image>
						 <image class="w-150 h-150"
						 v-else  mode="aspectFill"
						 @click.stop="selImg(2)"
						  src="/static/shangchaum.png"
						  style="background-color: aquamarine;"></image>
						
				
				</view>
			</view>

			<view class="colonn border_bottom">
				<view class="roww  w-750 " style="padding: 20rpx 30rpx;">
					<view>上传视频</view>
				</view>
				<view style="padding: 0rpx 30rpx 20rpx 30rpx;">
					
					<view style="color: blue;" 
					  @click.stop="selVideo" 
					v-if="form.video">视频上传完成（点击重新上传）</view>
					  
					   <image class="w-150 h-150"
					   v-else  mode="aspectFill"
					   @click.stop="selVideo(1)"
					    src="/static/shangchaum.png"
					    style="background-color: aquamarine;"></image>
					  
				</view>
			</view>

			<view class="roww center_center">
				<view class="querenbtn" @click.stop="toSubmit">确认上传</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					'adTitle': "",
					'image': '',
					'video': '',
					'industryId': '',
					'createUserId':""
				},
				hangyeList:[],
				hangyeTypetxt:"",  
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
			}
			this.getHangye();
		},
		methods: {
			toSubmit(){
				if(!this.isSubmit()){
					return false;  
				}
				var data =this.form;
				data.createUserId=this.userInfo.id;
				var url = this.$paths.videopublish;
				this.$axios
					.axios('post', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("发布成功");
							setTimeout(res=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
			isSubmit(){
				if(this.form.industryId==""){
					this.$tools.showToast("请选择视频分类");
					return false;
				}
				if(this.form.adTitle==""){
					this.$tools.showToast("请输入视频标题");
					return false;
				}
				if(this.form.image==""){
					this.$tools.showToast("请上传视频封面");
					return false;
				}
				if(this.form.video==""){
					this.$tools.showToast("请上传视频");
					return false;
				}
				return true;
			},
			// 行业选择
			hangyeChange(res){
				this.form.industryId=res.detail.value;
				this.hangyeTypetxt=this.hangyeList[parseInt(res.detail.value)].name;
			},
			// 获取行业列表
			getHangye(){
				var data ={
				};
				var url = this.$paths.industrylist;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.hangyeList=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
			selImg() {
				uni.chooseImage({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					maxDuration: 30,
					camera: 'back',
					success: (res) => {
						if (res.tempFiles.length > 0) {
							this.uploadimg(res.tempFiles[0].path,1)
						}
					}
				})
			},
			selVideo() {
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: (res)=> {
						self.src = res.tempFilePath;
						console.log("视频",self.src);
						this.uploadimg(self.src,2);
					} 
				});
			},
			uploadimg(imgurl,type) {
				console.log(imgurl);
				this.$axios
					.axiosUpload(this.$paths.uploaduploadOSS, {}, imgurl)
					.then(res => {
						if (res.code == 200) {
							if(type==1){
								this.form.image = res.url;
							}else{
								this.form.video = res.url;
							}
							
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
	@import url(addVideo.css);

	.querenbtn {
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
	}
</style>