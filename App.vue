<script>
	export default {
		onLoad() {   
		},
		onLaunch: function() {
			console.log('App Launch');
		},  
		onShow: function() {
			console.log('App Show');  
		},
		onHide: function() {
			console.log('App Hide');  
		}
	}
</script>     
<style  lang="scss">
	/*每个页面公共css */
	@import url("/style/style.css");
	@import url("/style/style_rpx.css");
	@import "/style/ty_style_scss.scss";
	.topviewmenu{
		position: fixed;
		/*  #ifdef  H5  */
		top:90rpx;
		/*  #endif  */
		/*  #ifndef  H5  */
		left: 0rpx;
		/*  #endif  */
		width: 750rpx;
		z-index: 1000;
		background-color: white;
	}
</style>  
  