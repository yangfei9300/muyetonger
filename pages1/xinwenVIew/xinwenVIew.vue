<template>
	<view>
		<web-view v-if="url&&url!=''" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			}
		},
		onLoad() {
			this.url=uni.getStorageSync("xinwenUrl")
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
