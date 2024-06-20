<template>
	<view>
		<view class="huanhang rowsb p-all-15" v-if="qiuzhiZhe.length>0">
			<view v-for="(item,index) in qiuzhiZhe" 
			@click.stop="showimg(item)"
			class="colonn m-bottom-20 center_center w-340" 
			style="background-color: white;border-radius: 20rpx;">
				<image 
				:src="item.resume"  
				class="w-340" 
				mode="aspectFill"></image>
				<view class="h-20"></view>
				<view class="name">{{item.name}}</view>
				<view class="h-10"></view>
				<view class="roww w-300">
					<view class="allline"></view>
					<view class="fs-25" style="color:blue;"
					@click.stop="toCallPhone(item)"
					>点击联系</view>
				</view>
				<view class="h-20"></view>
			</view>
		</view>
		
		<view v-if="qiuzhiZhe.length<=0" class="roww m-top-20 center_center">
			<view>无数据</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qiuzhiZhe:[]
			}
		},
		onLoad() {
			this.jobHuntlist();
		},
		methods: {
			jobHuntlist(){
				var url = this.$paths.jobHuntlist;
				var data={}
				this.$axios
					.axios('get', url, data)  
					.then(res => {  
						if (res.code == 200) {
							this.qiuzhiZhe=res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			toCallPhone(item){
				uni.makePhoneCall({  
					phoneNumber:item.phone
				})
			},
			showimg(item){
				uni.previewImage({
					current:item.resume,
					urls:[item.resume]
				})
			}
		}
	}
</script>

<style>
@import url(showJl.css);
</style>
