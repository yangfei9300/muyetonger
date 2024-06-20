<template>
	<view>
		<view class="colonn">
			<view class="roww p-all-30 fs-28 border_bottom"
			v-for="(item,index) in qiyeList"
			@click.stop="toInfo(item)" v-if="item.recruit"
			>
				<view class="w-400 txtShowLength1">{{item.name}}</view>
				<view class="allline"></view>
				<view style="color:blue;">查看招聘详情> </view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qiyeList:[]
			}
		},
		onLoad() {
			this.getQiyeList();
		},
		methods: {
			getQiyeList(){
					var url = this.$paths.companylist;
					var data={
						pageNum:1,
						pageSize:10000,
					}
					this.$axios
						.axios('get', url, data)  
						.then(res => {  
							if (res.code == 200) {
								this.qiyeList=res.rows;
							} else {
								this.$tools.showToast(res.msg);
							}
						})
						.catch(err => {
							console.log('错误回调', err);
						});
			},
			toInfo(item){
				uni.setStorageSync("qiyeInfo",item)
				uni.navigateTo({
					url:"/pages2/zpInfo/zpInfo"
				})
			},
		}
	}
</script>

<style>
@import url(zpAll.css);
</style>
