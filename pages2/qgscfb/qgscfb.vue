<template>
	<view>
		<!-- <view class="roww center_center  border_bottom"
		style="padding:20rpx;background-color: #C3DDBC;"
		>
			<view class="roww allline sousuoc">
				<view class="w-15"></view>
				<input 
				class="allline"
				placeholder-class="fs-28"
				placeholder="请输入市场名称" />
				<view class="w-15"></view>
			</view>
			<view class="shengshiqu">山东省</view>
		</view> -->
		
		<view class="colonn jiancaiview" 
		v-for="(item,index) in shichangList"
		style="">
			<view>{{item.name}}</view>
			<view class="h-15"></view>
			<view class="roww ">
				<view class="fs-25" style="color: red;">商户：{{item.companyNumber}}家</view>
				<view class="allline "></view>
				<view class="fs-25">添加时间：{{item.createTime}}</view>
			</view>
		</view>
		<view class="h-30"></view>
		<view class="roww center_center" v-if="shichangList.length<=0">
			<view>暂无市场数据</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shichangList:[]
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList(){
				var data ={
				};
				var url = this.$paths.marketInfolist;
				this.$axios
					.axios('get', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.shichangList=res.rows;
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
	@import url(qgscfb.css);
</style>
