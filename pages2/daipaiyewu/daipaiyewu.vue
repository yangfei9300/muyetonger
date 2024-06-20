<template>
	<view>
		<view class="colonn">
			<swiper class="topimg" v-if="addImgs3.length>0">
				<swiper-item class="topimg" 
				v-for="(item,index) in addImgs3"
				@click="toWebview(item)"
				>
					<image class="topimg" mode="aspectFill" 
					:src="item.image"></image>
				</swiper-item>
			</swiper>
			<view class="huanhang rowsa">
				<view class="viewmenu1" @click.stop="showimg(index)"
				 v-for="(item,index) in menu">{{item}}</view>
			</view>
			<view class="h-20"></view>
			<view class="colonn">
				<v-tabs v-if="renwufenlei.length>0" v-model="current" 
				activeColor="#21B783" 
				lineColor="#21B783" :scroll="false" 
				:tabs="renwufenlei"
					@change="changeTab"
					field="txt"
					></v-tabs>
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
				</view>
				
				<view v-if="qiuzhiZhe.length<=0">
					<noList></noList>
				</view>
				
			</view>
			<view class="h-20"></view>
		</view>

		<image src="/static/zengjia.png" @click.stop="toDp" class="w-110 h-110 jiahoa"></image>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				menu: ["路线图", '业务范围', '收费标准', '洽谈合作'],
				current: 0,
				renwufenlei:[],
				qiuzhiZhe:[],
				newImgs:{},
				addImgs3:[],
			}
		},
		onLoad() {
			this.getRenwuTypes();
			this.getNews();
			this.adImagelist3();
		},
		methods: {
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
					adPlace: '5'
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
			// 获取新闻 
			getNews(){
				var data ={
				};
				var url = this.$paths.marketnewsget;
				this.$axios
					.axios('post', url, data)
					.then(res => {  
						if (res.code == 200) {
							console.log("--",res);
							this.newImgs=res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
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
			
			getTypetxt(item){
				for(var a=0;a<this.renwufenlei.length;a++){
					if(this.renwufenlei[a].id==item.taskType){
						return this.renwufenlei[a].txt;
						break;
					}
				}
			},
			
			// 获取任务列表
			getLievbiba(){
				var url = this.$paths.marketTasklist;
				var data={
					'taskType':this.current==0?"":this.renwufenlei[this.current].id
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
			callPhgone() {
				uni.makePhoneCall({
					phoneNumber: "1231321"
				})
			},
			showimg(index) {
				var img="";
				if(index==0){
					img=this.newImgs.recentLine;
				}else if(index==1){
					img=this.newImgs.businessScope;
				}else if(index==2){
					img=this.newImgs.feeStandard;
				}else if(index==3){
					img=this.newImgs.contactUs;
				}
				uni.previewImage({
					urls: [img],
				});
			},
			changeTab(index) {
				this.current=index;
				this.getLievbiba();
				console.log('当前选中的项：' + index);
			},
		}
	}
</script>

<style>
	@import url(daipaiyewu.css);
</style>