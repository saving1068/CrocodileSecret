<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft" ></navbarbase>
		<div class="content">
			<div class="ranking" v-for="(v,i) in rankings">
				<div class="ranking-val">
					<div class="ranking-val-img">
						<p class="ranking-val-img-1">
							<img v-if="i==0" src="../../assets/home/@3x/home_icon_gold@3x.png"/>
							<img v-if="i==1" src="../../assets/home/@3x/home_icon_silver@3x.png"/>
							<img v-if="i==2" src="../../assets/home/@3x/home_icon_bronze@3x.png"/>
							{{i+1}}
						</p>
					</div>
					<div class="ranking-val-text">
						<div class="ranking-val-text-img">
							<img v-if="v.imagePath != ''" :src="v.imagePath"/>
							<img v-else src="../../assets/my/3x/my_img_avatar_big@3x.png"/>
						</div>
						<div class="ranking-val-text-msg">
							<a>{{v.userName}}</a>
							<p>昨日可提现奖金：{{v.money}}元</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		data(){
			return{
				title:'排行榜',
				rankings:[],//每日财富星
				
			}
		},
		created(){
			this.StarRank();//财富之星排行榜
		},
		methods:{
			onClickLeft(data){
				this.$router.go(-1)
			},
			StarRank(){//财富之星排行榜
		  	 	this.$Api.StarRanking().then((res)=>{
		  			if(res.q.s==0){
						this.rankings = res.q.rankings
		  			}
		  		})
		  	},
		}
	}
</script>
<style type="text/css" scoped="scoped">
	.container{padding:0.92rem 0 0;}
	.top{
		width: 100%;
		height: 0.9rem;
		background: white;
		text-align: center;
		line-height: 0.9rem;
		border-bottom: 0.01rem solid #CCCCCB;
		position: fixed;
		top: 0;
	}
	.top-left{
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin-left: 0.24rem;
	}
	.content{
		width: 100%;
	}
	.ranking{
		/*width:7.05rem;*/
		height: 1.62rem;
		/*background: salmon;*/
		margin: 0 auto;
		padding-left: 0.45rem;
		
	}
	.ranking-val{
		width: 7.05rem;
		overflow: hidden;
		border-bottom: 0.02rem solid #e5e5e5;
	}
	.ranking-val-img{
		width: 0.68rem;
		height: 1.62rem;
		float: left;
	}
	.ranking-val-img-1{
		width: 0.4rem;
		height: 0.5rem;
		float: left;
		margin-top: 0.55rem;
		text-align: center;
		line-height: 0.44rem;
		/*font-size: 2.25rem;*/
		overflow: hidden;
	}
	.ranking-val-img-1>img{width:100%;height: 100%;}
	.ranking-val-text-img{
		width: 1.04rem;
		height: 1.04rem;
		border-radius:50%;
		margin-top: 0.3rem;
		float: left;
		overflow: hidden;
	}
	.ranking-val-text-img>img{width:100%;height: 100%;}
	.ranking-val-text-msg{
		float: left;
		padding-top: 0.35rem;
		padding-left: 0.43rem;
	}
	.ranking-val-text-msg p{
		padding-top: 0.1rem;
		font-size: 0.24rem;
	}
</style>
