<template>
	<div>
		<div style="height: .9rem;">
  			<navbarbase :title="title" :left="'back'"  @isLeft="onClickLeft"></navbarbase>
  		</div>
  		<div class="top">
  			兑奖期限：{{deadline}}
  		</div>
  		<div class="content_bg">
  			<div class="content_top">
  				<div class="top_detile">
  					兑奖详情：
  				</div>
  				<div class="top_list">
  					<p style="color: #666666;">有效日期</p>
  					<p style="color: #333333;padding-left: 0.4rem;">{{userfulLife}}</p>
  				</div>
  				<div class="top_list">
  					<p style="color: #666666;">可用时段</p>
  					<p style="color: #333333;padding-left: 0.4rem;">周一至周四</p>
  				</div>
  				<div class="top_list">
  					<p style="color: #666666;">兑奖地址</p>
  					<p style="color: #333333;padding-left: 0.4rem;">
  						<input placeholder="请填写您的兑奖地址或门店地址"/>
  					</p>
  				</div>
  				<div class="top_list">
  					<p style="color: #666666;">兑奖须知</p>
  					<p style="color: #333333;padding-left: 0.4rem;">不填写则不显示</p>
  				</div>
  			</div>
  		</div>
  		<div class="btn" @click="ClaimPrize">
  			立即兑换
  		</div>
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	import { Toast } from 'vant';
	export default{
		components: {
			navbarbase,	
		},
		created(){
//			console.log(this.$route.query.code)
			this.$Api.DrawDetail(this.$route.query.code).then((res)=>{
				console.log(res)
				this.userfulLife = res.q.award.userfulLife
				this.deadline = res.q.award.deadline
			})
		},
		data(){
			return{
				title:'参与活动赢大奖',
				userfulLife:"",
				deadline:"",
			}
		},
		methods:{
			onClickLeft(data){this.$router.go(-1)},
			ClaimPrize(){
				this.$Api.ClaimPrize(this.$route.query.code).then((res)=>{
				console.log(res)
				if(res.q.s == 0){
//					Toast('兑奖成功');
					this.$router.push({
						name:"PrizeWin",
					})
				}
			})
			}
		}
	}
</script>

<style scoped="scoped">
	.top{text-align: center;line-height: 2.2rem;background-image: url(../../assets/game/common_bg_blue@2x.png);background-size: 100% 100%;height: 2.2rem;background-repeat: no-repeat;color: #FFFFFF;font-size: 0.36rem;}
	.content_bg{background: #EEEEEE;}
	.content_top{padding: .2rem .3rem;background: #FFFFFF;}
	.top_detile{font-size: 0.32rem;height: .62rem;}
	.top_list{overflow: hidden;font-size: 0.28rem;padding-top: 0.3rem;}
	.top_list p{float: left;}
	.top_list input{width: 5.2rem;border:none}
	.btn{position: absolute;width: 6.9rem;height: .95rem;background: #41BD43;border-radius: 0.1rem;color: #FFFFFF;font-size: .36rem;text-align: center;line-height: .95rem;bottom: .3rem;left: 0.3rem;}
</style>