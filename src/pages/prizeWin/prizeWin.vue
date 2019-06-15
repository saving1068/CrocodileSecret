<template>
	<div>
		<div style="height: .9rem;">
  			<navbarbase :title="title" :left="'back'"  @isLeft="onClickLeft"></navbarbase>
  		</div>
  		<div class="img">
  			<img src="../../assets/game/icon_present@2x.png"/>
  		</div>
  		<p style="font-size: .36rem;text-align: center;">兑换成功！</p>
  		<div class="btn">
  			<p @click="goToGame">返回</p>
  			<p @click="goToCoupon">查看</p>
  		</div>
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase,	
		},
		data(){
			return{
				title:"兑奖成功"
			}
		},
		methods:{
			onClickLeft(){
				this.$router.push({
					name:"Game"
				})
			},
			goToGame(){
				this.$router.push({
					name:"Game"
				})
			},
			goToCoupon(){
				this.$router.push({
					name:"Coupon"
				})
			}
		}
	}
</script>

<style scoped="scoped">
	img{width: 100%;height: 100%;}
	.img{margin: .6rem auto;width: 5rem;}
	.btn{padding: 0.78rem 1.45rem;display: flex;justify-content: space-between;}
	.btn p{width: 2rem;height: .7rem;font-size: .32rem;text-align: center;line-height: .7rem;border-radius: .1rem;}
	.btn p:nth-of-type(1){background: #E6BF6B;color: #FFFFFF;}
	.btn p:nth-of-type(2){color: #E6BF6B;border: 0.02rem solid #E6BF6B;}
</style>