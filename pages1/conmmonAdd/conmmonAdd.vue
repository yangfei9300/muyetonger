<template>
	<view>
		<view class="colonn">
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>企业名称</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input v-model="commend.name" placeholder="请输入" />
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>企业地址</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input v-model="commend.address" placeholder="请输入" />
				</view>
			</view>
			
			
			
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>选择企业分类</view>
				</view>
				<picker :range="hangyeList" range-key="name"
				@change="hangyeChange">
					<view
					style="padding: 0rpx 30rpx 20rpx 30rpx;"
					>
						<view style="color: #666666;" v-if="!commend.industryId">请选择</view>
						<view style="color: #000000;" v-else>{{hangyeTypetxt}}</view>
					</view>     
				</picker>
				
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>展览计划图</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<image class="w-150 h-150"
					v-if="commend.exhPlan"  mode="aspectFill"
					@click.stop="selImg(2)"
					 :src="commend.exhPlan"
					 style="background-color: aquamarine;"></image>
					 <image class="w-150 h-150"
					 v-else  mode="aspectFill"
					 @click.stop="selImg(2)"
					  src="/static/shangchaum.png"
					  style="background-color: aquamarine;"></image>
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>电话</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input v-model="commend.tel"  placeholder="请输入" />
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>企业LOGO</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
				
					<image class="w-150 h-150"
					v-if="commend.image"  mode="aspectFill"
					@click.stop="selImg(1)"
					 :src="commend.image"
					 style="background-color: aquamarine;"></image>
					 <image class="w-150 h-150"
					 v-else  mode="aspectFill"
					 @click.stop="selImg(1)"
					  src="/static/shangchaum.png"
					  style="background-color: aquamarine;"></image>
					  
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>上传企业营业执照</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					
					
					<image class="w-300 h-150"
					v-if="commend.license"
					@click.stop="selImg(3)"
					 :src="commend.license"  mode="aspectFill"
					 style="background-color: aquamarine;"></image>
					 <image class="w-150 h-150"
					 v-else
					 @click.stop="selImg(3)"
					  src="/static/shangchaum.png"
					  style="background-color: aquamarine;"></image>
					
				</view>
			</view>
		</view>
		
		<view class="roww center_center">
			<view class="querenbtn" @click.stop="toSubmit">确认修改</view>
		</view>
		<view class="h-30"></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commend:{
					'name':"",
					'image':'',//logo
					'address':'',
					'tel':'',
					'exhPlan':'',
					'industryId':"",
					image:"",
					exhPlan:"",
					license:"",
					createUserId:""
				},
				hangyeList:[],//行业列标
				hangyeTypetxt:"",
				userInfo:null
			}
		},
		onLoad() {
			var  userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo; 
			}
			var commend=uni.getStorageSync("commend")
			if(commend){
				this.commend=commend;
			}
			this.getHangye();
		},
		methods: {
			isSubmit(){
				if(this.commend.name==""){
					this.$tools.showToast("请输入企业名称");
					return false;
				}
				if(this.commend.address==""){
					this.$tools.showToast("请输入企业地址");
					return false;
				}
				if(this.commend.industryId==""){
					this.$tools.showToast("请选择企业分类");
					return false;  
				}
				if(this.commend.exhPlan==""){
					this.$tools.showToast("请选择展览计划图");
					return false;
				}
				if(this.commend.tel==""){
					this.$tools.showToast("请输入联系电话");
					return false;
				}
				if(this.commend.image==""){
					this.$tools.showToast("请上传企业LOGO");
					return false;
				}
				if(this.commend.license==""){
					this.$tools.showToast("请上传企业营业执照");
					return false;
				}
				return true;
			},
			toSubmit(){  
				if(!this.isSubmit()){
					return false;
				}
				var data=this.commend;
				data.createUserId=this.userInfo.id;
				var url = this.$paths.publishcompany;
				if(this.userInfo.companyId){
					var url = this.$paths.updatecompany;
					data.id=this.userInfo.companyId
				}
				
				this.$axios
					.axios('post', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("提交成功");
							uni.setStorageSync("commend",data)
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
			// 行业选择
			hangyeChange(res){
				this.commend.industryId=res.detail.value;
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
			selImg(type){
				uni.chooseImage({
				  count: 1,
				  mediaType: ['image'],
				  sourceType: ['album', 'camera'],
				  maxDuration: 30,
				  camera: 'back',
				  success:(res)=> {
					if(res.tempFiles.length>0){
						this.uploadimg(res.tempFiles[0].path,type) 
					}
				  }
				})
			},
			uploadimg(imgurl,type){
				console.log(imgurl);
				this.$axios
					.axiosUpload(this.$paths.uploaduploadOSS,{},imgurl )
					.then(res => {
						if (res.code ==200) { 
							if(type==1){
								this.commend.image=res.url;
							}else if(type==2){
								this.commend.exhPlan=res.url;
							}else if(type==3){
								this.commend.license=res.url;
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
@import url(conmmonAdd.css);
</style>
