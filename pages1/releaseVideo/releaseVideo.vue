<template>
	<view>
		<view class="huanhang rowsb" style="padding:25rpx;">
			<view class="colonn pore m-bottom-30" v-for="(item,index) in videoList">
				<image :src="item.image" mode="aspectFill" class="w-335 h-200"></image>
				<view class="h-10"></view>
				<view class="roww">
					<view class="w-235 fs-30 txtShowLength">{{item.adTitle}}</view>
					<!-- <view class="fs-25">浏览：35</view> -->
				</view>
				<view class="deltxt" @click.stop="delModal(item)"> 删除</view>
			</view>
			<view class="roww w-750 center_center" v-if="videoList.length<=0">
				<noList></noList>
			</view>
		</view>
		
		<image src="/static/zengjia.png"
		 @click.stop="toAddVideo"
		 class="w-110 h-110 jiahoa"></image>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList:[],
				userInfo:""
			}
		},
		onLoad() {
		},
		onShow() {
			this.userInfo=uni.getStorageSync("userInfo");
			this.getVideoList();
		},
		methods: {
			delModal(item){
				uni.showModal({
					title: '提示',
					content: '确认要删除吗',
					success:  (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							this.delVideo(item);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delVideo(item){
				var url = this.$paths.videodelete+item.id;
				var data={
				}
				this.$axios
					.axios('post', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.$tools.showToast("删除成功");
							setTimeout(res=>{
								this.getVideoList();
							},1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取我自己的视频列表
			getVideoList(){
				var url = this.$paths.videolist;
				var data={
					'createUserId':this.userInfo.id
				}
				this.$axios
					.axios('get', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.videoList=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			toAddVideo(){
				uni.navigateTo({
					url:"/pages3/addVideo/addVideo"
				})
			},
			
		}
	}
</script>

<style>
@import url(releaseVideo.css);
</style>