<template>
	<div class="container">
		<navbarbase :title="title" :leftText="''" :rightText="rightText" @isRight="onClickRight"></navbarbase>
		<div class="content">
			<div class="content_item" v-for="(item,i) in list" @click="go_detail(item.spuId,item.skuId,item.originalPrice,item.discount,item.isSampleSack)">
				<div class="content_item_img">
					<img class="contentims" :src="item.imagePath"/>
				</div>
				<div class="content_item_text">
					<p class="text_p">{{item.name}}</p>
					<div class="content_item_text_pirce">
						<span class="price" v-if="flag">￥{{item.originalPrice}}</span>
						<span class="price" v-if="!flag" style="margin-right: 0rem;">￥{{item.discountPrice}} +{{item.discount}}积分</span>
						<div v-if="num==0">
							<div class="vip" v-if="item.isBought!=1&&item.isSampleSack==1">免费试用</div>
								<div class="vip" v-else-if="item.isContinued==1&&item.isBought==1">VIP续领</div>
								<div class="vip" v-else>成为VIP</div>
								</div>
						<span class="mail">{{item.mailing}}</span>
					</div>
				</div>
			</div>
			<div class="content_item">
				<div class="content_item_more_img">
					<img src="../../assets/goods/items_icon_coming_soon@2x.png"/>
				</div>
			</div>
			<div class="bottom_msg">
				<p>没有想要的?</p>
				<p>告诉我们，您的心怡宝贝，火速优惠上新哦!</p>
				<div class="serve">
					<i class="serve_img">
						
					</i>
					<div @click="cust" style="background: #FFFFFF;">联系客服</div>
				</div>
			</div>
			<div style="height: 1rem;width: 100%;"></div>
		</div>
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		
		name: "allgoods",
		components: {
			navbarbase
		},
		data() {
		    return {
		    	title:'美丽领吧',
		    	list:[],
		    	rightText:"积分专区",
		    	flag:true,
		    	num:0,
		    	lv:1
			};
		},
		computed: {},
		created() {
		    console.log("allgoods created");
		   if(this.$route.query.flag=="false"){
		   	this.flag=false
		   	this.num=3
		   	this.rightText="其他商品"
		   	 this.getData(3)
		   }else{
		   		this.flag=true
		   	 	this.num=0
		   	 	this.rightText="积分专区"
		   	 this.getData(0)
		   }
		    if(this.$store.state.isLogin){
		    	this.getUserDetails()
		    }
		     
		    
		},
		mounted() {},
		methods: {
			getUserDetails(){
			this.$Api.UserDetails(0).then((res)=>{
				console.log(res)
				this.lv=res.q.user.lv
			})
			},
			cust(){
				this.$call.invokeImHelper({})
			},
			onClickRight(){
	            console.log(1)
	            this.list=[]
	            this.flag=!this.flag
	            if(this.flag){
	             	this.rightText="积分专区"
	             	this.getData(0)
	             	this.num=0
	            }else{
	             	this.rightText="其他商品"
	             	this.getData(3)
	             	this.num=3
	            }
			},
		  	go_detail(spuId,skuId,price,score,isfree){
		  		if(this.num==0){
		  			this.$router.push({
		  			name:"GoodsDetail",
		  			query:{
		  				spuId:spuId,
		  				skuId:skuId,
		  				
		  				type:this.num,
		  				
		  			}
		  		})
		  			
		  		}else{
		  			this.$router.push({
		  			name:"GoodsDetail",
		  			query:{
		  				spuId:spuId,
		  				skuId:skuId,
		  				
		  				score:score,
		  				type:this.num
		  			}
		  		})
		  			
		  			
		  		}
		  		
		  		
		  	},
		  	getData(num){
		  		this.$Api.getGoodsList(num).then((res)=>{
		  			if(res.q.goodses.length>0){
		  				for(let i=0;i<res.q.goodses.length;i++){
		  					this.list.push(res.q.goodses[i])
		  				}
		  			}
		  			console.log(res)
		  		})
		  	}
		},
		beforeRouteLeave(to, from, next) {
			let position = window.scrollY //记录离开页面的位置 
			console.log(position)
			if (position == null) position = 0 
			this.$store.dispatch("increment",{scrollY:position,router:from.name}) //离开路由时把位置存起来 
			 next() 
		},
		 beforeRouteEnter(to, from, next){
		 	next(vm=>{
		 		if(vm.$store.getters.recruitScrollY(to.name)==undefined){
		         	vm.$store.dispatch("increment",{scrollY:0,router:to.name})
		        }
		       let recruitScrollY =vm.$store.getters.recruitScrollY(to.name)
		       console.log(recruitScrollY)
		         
//		      	  window.scrollTo(0, recruitScrollY) 
		     
	 		})
	 	}
	 
	};
	
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0 0;}
	.content{
		width: 100%;
		padding: 0 0.24rem;
		box-sizing: border-box;
		background: #F3F3F3;
		
		/*overflow: hidden;*/
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/*align-content:space-between;*/
	}
	.content_item{
		width: 3.4rem;
		height: 4.5rem;
		background: #FFFFFF;
		border-radius: 0.15rem;
		overflow: hidden;
		margin-top: 0.2rem;
		position: relative;
	}
	.content_item_img{
		width: 100%;
		height: 2.9rem;
		margin-top: 0.18rem ;
		text-align: center;
	}
	.contentims{height: 2.9rem;}
	.content_item_text{
		height: 1.1rem;
		margin-top: 0.05rem;
		/*margin-left: 0.28rem;*/
	}
	.text_p{
		height: 0.69rem;
		font-size: 0.25rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-align: center;
	}
	.content_item_text_pirce{
		display: flex;
		flex-direction: row;
		justify-content:space-between;
		margin-top: 0.15rem;
		color: #E6BF6B;
		padding: 0 0.1rem;
		box-sizing: border-box;
	}
	.content_item_text_pirce .price{
		font-size: 0.24rem;
		
	}
	.content_item_text_pirce .mail{
		color: #000000;
			
		font-size: 0.24rem;
	}
	
	.content_item_text_pirce .vip{
	display: inline-block;background-color: #996023;color: #fff;font-size: 0.2rem;padding: 0.02rem 0.05rem;
	}

	
	.content_item_more_img{
		width: 2rem;
		height: 1.7rem;
		background: url(../../assets/goods/items_icon_coming_soon@2x.png) no-repeat;
		background-size:100% 100% ;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.bottom_msg{
		width: 100%;
		height: 2rem;
		margin-top: 0.3rem;
		text-align: center;
		color: #666666;
		font-size: 0.24rem;
	}
	.bottom_btn{
		width: 1.4rem;
		margin-top: 0.24rem;
		border: 0.01rem solid #CCCCCC;
		display: flex;
		margin: 0.2rem auto;
	}
	.bottom_btn p:nth-of-type(1){
		width: 0.26rem;
		height: 0.28rem;
		margin-top: 0.01rem;
		margin-right: 0.1rem;
		
	}
	.serve{
		width: 1.48rem;
		height: 0.4rem;
		border: 0.02rem solid #CCCCCC;
		border-radius:0.05rem ;
		margin: 0.3rem auto;
	}
	.serve div{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		line-height: 0.4rem;
	}
	.serve_img{
		width: 0.24rem;
		height: 0.24rem;
		float: left;
		background: url(../../assets/goods/items_icon_service_small@2x.png) no-repeat;
		background-size:100% 100% ;
		position: relative;
		top: 0.05rem;
		left: 0.05rem;
	}
</style>
