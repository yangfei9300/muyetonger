<template>
	<view>
		<view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>任务分类</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 0rpx;"
				>
					<picker :range="renwufenlei" 
					range-key="dictLabel"
					@change="hangyeChange">
						<view
						style="padding: 0rpx 30rpx 20rpx 30rpx;"
						>
							<view style="color: #666666;" v-if="!form.taskType">请选择</view>
							<view style="color: #000000;" v-else>{{form.taskType.dictLabel}}</view>
						</view>     
					</picker>
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>任务标题</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input  v-model="form.title" placeholder="请输入" />
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>任务金额</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<input   v-model="form.price"  type="number"  placeholder="请输入" />
				</view>
			</view>
			<view class="colonn border_bottom"
			>
				<view class="roww  w-750 " 
				style="padding: 20rpx 30rpx;"
				>
					<view>任务内容</view>
				</view>
				<view
				style="padding: 0rpx 30rpx 20rpx 30rpx;"
				>
					<textarea  v-model="form.content"   placeholder="请输入" />
				</view>
			</view>
			
			<view class="roww center_center">
				<view class="querenbtn" @click.stop="toSubmit">确认提交</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					'taskType':'',//任务类型
					'industryId':'',//行业ID
					'title':'',
					'content':'',
					'price':'',
					'createUserId':''
				},
				hangyeList:[],
				renwufenlei:[],
				userInfo:null,
			}
		},
		onLoad(){
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
			}
			this.getRenwuTypes();
		},
		methods: {
			toSubmit(){
				if(!this.isSubmit()){
					return false;
				}
				var data =this.form;  
				data.createUserId=this.userInfo.id;
				data.taskType=data.taskType.dictValue;
				var url = this.$paths.marketTaskpublish;
				this.$axios  
					.axios('post', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("任务提交成功");
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
				if(this.form.taskType==""){
					this.$tools.showToast("请选择任务分类");
					return false;
				}
				if(this.form.title==""){
					this.$tools.showToast("请输入任务标题");
					return false;
				}
				if(this.form.price==""){
					this.$tools.showToast("请输入悬赏金额");
					return false;
				}
				if(this.form.content==""){
					this.$tools.showToast("请输入任务内容");
					return false;
				}
				return true;
			},
			hangyeChange(res){  
				this.form.taskType=this.renwufenlei[parseInt(res.detail.value)];
			},
			// 获取任务分类
			getRenwuTypes(){
				var data ={
				};
				var url = this.$paths.dicttype+"market_task_type";
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							console.log(res)
							this.renwufenlei=res.data;
							
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
@import url(addShichangdaipai.css);
</style>
