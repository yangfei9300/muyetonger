<template>
	<view>
		<view class="colonn">
			<!-- :scroll="true"  -->
			<!-- <view class="topviewmenu">
				<v-tabs  v-model="current" :scroll="false"
							activeColor="#21B783" 
							lineColor="#21B783"  
							field="name"
							:tabs="hangyeList" 
							@change="changeTab"></v-tabs> 
			</view> -->
			
			<!-- <view class="h-100"></view> -->
			<view class="colonn">
					<view class="roww border_bottom p-all-20"
					v-for="(item,index) in newList" @click.stop="toInfo(item)"
					>
						<image class="leftimg" mode="aspectFill" :src="item.image"></image>
						<view class="w-20"></view>
						<view class="colonn rowsb">
							<view class="w-500 txtShowLength1 fs-30">{{item.title}}</view>
							<view class="roww w-500 fs-30">
								<view>时间：{{item.createTime}}</view>
								<view class="allline"></view>
								<!-- <view>浏览量：100</view> -->
							</view>
						</view>
					</view>
					<view v-if="newList.length<=0">
						<noList></noList>
					</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				options:{},
				hangyeList:[],//行业列表
				newList:[]
			}
		},
		onLoad(options) {
			var title=["国内木业新闻","国际木业新闻","最新展会新闻"];
			console.log("仔细",options)
			uni.setNavigationBarTitle({
				title:title[options.index-1]
			})
			if(options.index==3){
				options.index="";
				this.options=options;
				this.getZXinwenList()
			}else{
				this.options=options;
				this.getXinwenList();
			}
		},
		methods: {
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
							this.getXinwenList();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
			// 获取最新新闻列表  
			getZXinwenList(){
				var data ={
					// 'newsType':this.options.index-1,
				};
				var url = this.$paths.newslistnew;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.newList=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取新闻列表
			getXinwenList(){
				var data ={
					'newsType':this.options.index,
					// 'industryId':this.hangyeList[this.current].id
					'industryId':""
				};
				var url = this.$paths.newslist;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.newList=res.rows;
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
			},
			toInfo(item){
				uni.setStorageSync("xinwenUrl",item.jumpPath);
				uni.navigateTo({
					url:"/pages1/xinwenVIew/xinwenVIew"
				})
			}
		}
	}
</script>

<style>
@import url(xinwenList.css);
</style>
