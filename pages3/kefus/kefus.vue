<template>
	<view>
		<view class="p-all-20">
			<rich-text :nodes="kefu.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kefu:{}
			}
		},
		onLoad() {
			this.getKefus();
		},
		methods: {
			getKefus(){
				var data ={};
				var url = this.$paths.customerServiceget;
				this.$axios
					.axios('POST', url, data)
					.then(res => {  
						if (res.code == 200) {
							this.kefu=res.data;
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

</style>
