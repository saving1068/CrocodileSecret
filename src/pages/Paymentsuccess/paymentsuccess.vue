<template>
	<div >
		<navbarbase :title="title" :left="'back'" :right="'fuck'"  @isLeft="onClickLeft" @isRight="onClickRight" ></navbarbase>
		
		<div class="cashier">
			<div class="sesect">
				<div class="sesect_img"></div>
				<p class="sesect_com">支付成功</p>
			</div>
			<div class="tis">
				<h3>温馨提示</h3>
				<p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
			</div>
			
			<div class="btn_a">
				<div class="btn_div">查看订单</div>
				<div class="btn_div">分享好友</div>
			</div>
			
			<div class="btn_b">
				<div class='gohome'>回到首页</div>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'

	export default {
		data() {
			return {
				title:'支付成功',
				
			}
		},
		components: {
			navbarbase
		},
		watch: {},
		created() {},
		methods: {
			onClickLeft(data){
				this.$router.go(-1)
			},
			onClickRight(){
				console.log(111)
			},
			share(){
				if(this.$store.state.isLogin) {
					var obj = {
						shareType: 2,
						shareTitle: this.goods.name,
						mpUserName:"gh_0990137c737d",
						shareContent: '',
						shareImage: this.goods.imagePath
					}
					this.$call.invokeShare(obj)
				} else {
					this.$call.invokeLogin({})
				}
			}
		},
	}
</script>

<style scoped="scoped">
	.cashier{padding-top: 0.92rem;width: 100%;height: 100%;}
	
	.sesect{width: 100%;height: 3.3rem;padding-top: 0.8rem;text-align: center;}
	.sesect_img{width: 1.4rem;height: 1.4rem;background-image: url(../../assets/items/@3x/items_icon_payment_success@3x.png);background-size: 100% 100%;margin: 0 auto;}
	.sesect_com{font-size: 0.35rem;color: #333333;padding-top: 0.15rem;}
	
	.tis{width: 100%; padding: 0 0.24rem;padding-bottom: 0.38rem;}
	.tis>h3{font-size: 0.30rem;color: #333333;}
	.tis>p{font-size: 0.28rem;color: #666666;}
	
	.btn_a{width: 100%;height: auto; padding: 0 0.24rem;display: flex;justify-content: space-between;}
	.btn_div{width: 3.19rem;height: 0.88rem;border: 0.01rem solid #e6bf6b;box-sizing: border-box;border-radius: 0.1rem; color: #e6bf6b;text-align: center;line-height: 0.86rem;font-size: 0.3rem;}
	
	.btn_b{width: 100%;height: 0.88rem;padding: 0 0.24rem;position: fixed;bottom: 0.3rem;}
	.gohome{width: 100%;height: 0.88rem;background-color: #e6bf6b;color: #fff;border-radius: 0.1rem;text-align: center;line-height: 0.88rem;font-size: 0.3rem;}
</style>