<template>
	<view class="colonn center_center" style="height: 100vh;">
		<video class="videoview" v-if="url" :src="url"></video>
	</view>
</template>

<script>
	export default {  
		data() {
			return {
				url:null
			}  
		},
		onLoad() {
			this.url=uni.getStorageSync("videourl")
		},
		methods: {
			
		}
	}
</script>

<style>
@import url(videoInfo.css);
</style>
