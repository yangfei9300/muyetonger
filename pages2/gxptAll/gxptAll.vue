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
			
			<v-tabs v-if="renwufenlei.length>0" v-model="current"
			activeColor="#21B783" 
			lineColor="#21B783" :scroll="true" 
			:tabs="renwufenlei"
				@change="changeTab"
				field="txt"
				></v-tabs>
				
			<view class="colonn viewitem"
			v-for="(item,index) in qiuzhiZhe"
			>
				<view class="roww">
					<view class="atgview">{{item.taskTypeTxt}}</view>
					<view class="w-10"></view>
					<view class="w-520 fs-30 txtShowLength">{{item.title}}</view>
				</view>
				<view class="fs-28 m-top-10" style="color:#8B8682;">联系人：{{item.params.createUserName}}</view>
				<view class="fs-28 m-top-10" style="color:#8B8682;">联系电话：{{item.params.createUserPhone}}</view>
				<view class="fs-28 m-top-10" style="color:#8B8682;">发布时间：{{item.content}}</view>
				<view class="fs-28 m-top-10" style="color:#8B8682;">详细描述：{{item.createTime}}</view>
			</view>
			
			
			<view v-if="qiuzhiZhe.length<=0">
				<noList></noList>
			</view>
			
			
			<view class="h-30"></view>
		</view>
		
		<image src="/static/zengjia.png" @click.stop="toAddGx"
		class="w-110 h-110 jiahoa"></image>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [
				  '全部',
				  '供应',
				  '求购',
				],
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
			this.adImagelist3();
		},
		methods: {
			// 获取广告
			adImagelist3() {
				var data = {
					adPlace: '6'
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
			// 获取任务分类
			getRenwuTypes(){
				var data ={
				};
				var url = this.$paths.dicttype+"supply_need_type";
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
					if(this.renwufenlei[a].id==item.supplyNeedType){
						return this.renwufenlei[a].txt;
						break;
					}
				}
			},
			// 获取任务列表
			getLievbiba(){
				var url = this.$paths.supplyNeedlist;
				var data={
					'supplyNeedType':this.current==0?"":this.renwufenlei[this.current].id
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
			
			changeTab(index) {
			  console.log('当前选中的项：' + index)
			  this.current=index;
			  this.getLievbiba();
			},
			toAddGx(){
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
					url:"/pages3/addGq/addGq"
				})
			}
		}
	}
</script>

<style>
@import url(gxptAll.css);
</style>
