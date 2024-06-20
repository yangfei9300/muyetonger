<template>
	<view>
		<view class="colonn viewitem"
		v-for="(item,index) in qiuzhiZhe">
			<view class="roww">
				<view class="atgview">{{item.taskTypeTxt}}</view>
				<view class="w-10"></view>
			</view>
			<view class="fs-28 m-top-10" style="color:#8B8682;">任务标题：{{item.title}}</view>
			<view v-if="item.params" class="roww center_center">
				<view class="fs-28 m-top-10" style="color:#8B8682;">联系电话：{{item.params.createUserPhone}}</view>
				<view class="w-20"></view>
				<view class="boda fs-30" @click.stop="callPhgone">拨打</view>
				<view class="allline"></view>
			</view>
			<view class="fs-28 m-top-10" style="color:#8B8682;">发布时间：{{item.createTime}}</view>
			<view class="fs-28 m-top-10" style="color:#8B8682;">任务内容：{{item.content}}</view>
			<view class="roww endend">
				<view style="color: red;" @click.stop="delModal(item)">删除</view>
			</view>
		</view>
		
		<image src="/static/zengjia.png" @click.stop="toDp" class="w-110 h-110 jiahoa"></image>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				qiuzhiZhe:[],
			}
		},
		onLoad() {
			this.userInfo=uni.getStorageSync("userInfo")
			this.getRenwuTypes()
		},
		onShow() {
			this.getLievbiba();
		},
		methods: {
			toDp() {
				var userInfo=uni.getStorageSync("userInfo");
				if(!userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.navigateTo({
							url:"/pages/index4/index4"
						})
					},1000)   
					return false;
				}
				uni.navigateTo({
					url: "/pages3/addShichangdaipai/addShichangdaipai"
				})
			},
			
			delModal(item){
				uni.showModal({
					title: '提示',
					content: '确认要删除吗',
					success:  (res)=> {
						if (res.confirm) {
							this.delRenwu(item)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delRenwu(item){
				var url = this.$paths.marketTaskDelete+item.id;
				var data={
				}
				this.$axios
					.axios('post', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("删除成功");
							setTimeout(res=>{
								this.getLievbiba();
							},1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取任务列表
			getLievbiba(){
				var url = this.$paths.wxUsertasklist;
				var data={
					'createUserId':this.userInfo.id
				}
				this.$axios
					.axios('get', url, data)  
					.then(res => {  
						if (res.code == 200) {  
							var list = res.rows;
							for(var a=0;a<list.length;a++){
								var txt=this.getTypetxt(list[a]);
								list[a].taskTypeTxt=txt;
							}
							console.log("--标题-",list)
							this.qiuzhiZhe=list;
							this.$forceUpdate();
						} else {  
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			getTypetxt(item){
				for(var a=0;a<this.renwufenlei.length;a++){
					if(this.renwufenlei[a].id==item.taskType){
						return this.renwufenlei[a].txt;
						break;
					}
				}
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
							var renwufenlei=[{'id':'','txt':'全部'}];
							for(var a=0;a<res.data.length;a++){
								var obg={'id':res.data[a].dictValue,
								'txt':res.data[a].dictLabel};
								renwufenlei.push(obg);
							}  
							this.renwufenlei=renwufenlei;
							this.getLievbiba(); 
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
		}
	}
</script>

<style>
@import url(myRenwu.css);
</style>
