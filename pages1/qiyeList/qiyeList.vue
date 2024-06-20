<template>
	<view>

		<view class="colonn" 
		style="background-color: white;padding:15rpx 0rpx;">
			<view class="roww center_center">
				<view class="sousuoview roww center_center ">
					<input v-model="commendName"
					 class="pltxt allline" 
					 placeholder-class="pltxt" 
					 placeholder="请输入搜索内容" />
					 
					 
					 
				</view>
				<view style="margin-bottom: 15rpx;"
				@click="getQiyeList(2)"
				>搜索</view>
			</view>
			<block v-if="hangyeList.length>0">
				<v-tabs v-model="current" activeColor="#21B783" lineColor="#21B783" :tabs="hangyeList" field="name"
					:scroll="false" @change="changeTab"></v-tabs>
			</block>
		</view>

		<view class="h-30"></view>
		<view class="huanhang rowsb w-750"
		style="padding:0rpx 25rpx;"
		>
			<view class="colonn w-335  m-bottom-15 p-bottom-15" 
			@click.stop="toViewp(item)"
			
				v-for="(item,index) in qiyeList" 
				v-if="qiyeList.length>0&&item.jumpPath">
				<image mode="aspectFill" 
				:src="item.image" class="w-330 h-330 br-20"></image>
				<view class="h-10"></view>
				<view class="roww w-330 center_center duiqi">
					<view class="w-330 fs-30 txtShowLength" style="text-align: center;">{{item.name}}</view>
				</view>
			</view>
			<view class="roww w-750 center_center" v-if="qiyeList.length<=0">
				<noList></noList>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,

				options: {},
				qiyeList: [],
				hangyeList: [],
				commendName:"",
			}
		},
		onLoad(options) {
			if (options.index) {
				this.current = parseInt(options.index);
			}
			this.getHangye();
		},
		methods: {
			// 获取行业列表
			getHangye() {
				var url = this.$paths.industrylist;
				var data = {
					field: ""
				}
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.hangyeList = res.rows;
							this.getQiyeList(1);
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			//获取企业列表
			getQiyeList(type) {
				var url = this.$paths.companylist;
				var data = {
					pageNum: 1,
					pageSize: 10000,
					name:type!=1?this.commendName:"",
					industryId:type==1?this.hangyeList[this.current].id:''
				}
				this.$axios
					.axios('get', url, data)
					.then(res => {
						if (res.code == 200) {
							this.qiyeList = res.rows;
							this.$forceUpdate();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},    
			toViewp(item) {
				if (!item.jumpPath) {
					this.$tools.showToast("请完善企业链接");
					return false;
				}
				uni.setStorageSync("xinwenUrl", item.jumpPath)
				uni.navigateTo({
					url: "/pages1/xinwenVIew/xinwenVIew"
				})
			},
			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.current = index;
				this.getQiyeList(1);
			},
			toInfo() {
				uni.navigateTo({
					url: "/pages1/xinwenVIew/xinwenVIew"
				})
			}
		}
	}
</script>

<style>
	@import url(qiyeList.css);
</style>