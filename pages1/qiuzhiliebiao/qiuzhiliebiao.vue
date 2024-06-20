<template>
	<view>
		
		<view class="colonn">
			<view class="roww p-all-25 border_bottom">
				<image class="headerd"></image>
				<view class="w-20"></view>
				<view class="colonn rowsb fs-30">
					<view>姓名</view>
					<view class="roww w-500">
						<view style="color: blue;font-weight: bold;"
						@click.stop="closeJl"
						>查看简历</view>
						<view class="allline"></view>
						<view class="bodadianhua">拨打电话</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="huuibeijing colonn center_center"
		v-if="jsAlert"
		>
			<image class="w-680" mode="widthFix" src="../../static/lanse1.png"></image>
			<view class="guianbibtn" @click.stop="closeJl">关闭</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jsAlert:false,
			}
		},
		methods: {
			closeJl() {
				this.jsAlert=!this.jsAlert;
			}
		}
	}
</script>

<style>
@import url(qiuzhiliebiao.css);
</style>
