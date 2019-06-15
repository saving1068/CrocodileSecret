<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title"   :left="'back'" @isLeft="onClickLeft" ></navbarbase>
		</div>
		<div style="padding-bottom: 1.9rem;">
			<div class="navbar">
				<div class="tab">
					
					<li :class="[tabIndex==0?'active':'']" @click="tab(0)">可用</li>
					<li :class="[tabIndex==1?'active':'']" @click="tab(1)">不可用</li>
					<div class="bottom"  :style="bottomStyle"></div>
				</div>
			</div>
			
			<div class="navbar-content" v-if="tabIndex==0">
				<div class="item-content" v-for="(v,i) in catusecoupons" @click="goPer(v.id)">
					<img src="../../assets/my/3x/my_bg_discount_black@3x.png"/>
			  		<div class="item-content-img">
			  			<p>
			  				￥
			  				<span>
			  					{{v.denomination}}
			  				</span>
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.couponName}}</p>
			  			<p>{{v.remark}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.couponCardnum}}</a>
			  				<p>剩<span>{{v.residueDate}}</span>天</p>	
			  			</div>
			  		</div>
			  	</div>
			</div>  	
			<div class="navbar-content" v-if="tabIndex==1">
				<div class="item-content" v-for="(v,i) in nocatusecoupons">
		  			<img src="../../assets/my/3x/my_bg_discount_gray@3x.png"/>
			  		<div class="item-content-img over">
			  			<p>
			  				￥
			  				<span>
			  					{{v.denomination}}
			  				</span>
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.couponName}}</p>
			  			<p>{{v.remark}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.couponCardnum}}</a>
			  				<p >不可使用</p>		
			  			</div>
			  		</div>
			  	</div>
			</div>
		</div>
	
	</div>
</template>

<script>import navbarbase from '../../components/Navbarbase/Navbarbase'
export default {
	name: "container",
	components: {
		navbarbase,
	},
	data() {
		return {
			bg: {
				'background': "#f5f5f5",
				'min-height': document.body.clientHeight / 50 + "rem",
			},
			skuId:this.$route.query.skuId,
			spuId:this.$route.query.spuId,
			type:this.$route.query.type,
			id:this.$route.query.id,
			catusecoupons:[],
			nocatusecoupons:[],
			tabIndex: 0,
			CouponList: [],
			CouponEdList: [],
			Oldcounpon:[],
			remainingTime: "",
			arr: [
				1, 1, 1, 1, 1, 1
			],
			selected: "1",
			title: "选择优惠券",
			isOver: true,
			total: 0,
			couponId:0
		};
	},
	
	created() {
		console.log("container created");

		console.log(localStorage.getItem('sessionId'))
		this.getCoupon();
	
	},
	mounted() {

	},
	methods: {
		goPer(id){
			this.couponId=id
			this.$router.go(-1)
		},
		tab(num) {
			this.tabIndex = num
			if(this.tabIndex == 0) {
				console.log(1)
				this.isOver = true;
			} else if(this.tabIndex == 1) {
				console.log(2)
				this.isOver = true;
			} else if(this.tabIndex == 2) {
				console.log(3)
				this.isOver = false;
			}
		},
		go() {
			this.$router.push({name: "Allgoods"})
		},

		onClickLeft() {
		this.$router.go(-1)
		},
	
		getCoupon() {
       var obj={
					"a":0,
					 "note":"",
					 "skuId":this.skuId,
					 "spuId":this.spuId,
					 "num":1,
					 
				}
				if(this.$route.query.type==0){
					obj.a=5
				}else if(this.$route.query.type==1){
					obj.a=8
				}
				
				
				else if(this.$route.query.type==2){
					obj.a=6
				}else if(this.$route.query.type==3){
					obj.a=7
				}
				
				
				this.$Api.getOrderSubmit(obj).then((res)=>{
					this.list=res.q
					this.catusecoupons=this.list.catusecoupons
					this.nocatusecoupons=this.list.nocatusecoupons
					console.log(res)
				})
			
		},
	
	},
	beforeRouteLeave(to,from,next){
		to.query.skuId=this.skuId
		to.query.spuId=this.spuId
		to.query.type=this.type
		to.query.id=this.id
		to.query.couponId=this.couponId
		
		next()
	},
	computed: {
		bottomStyle() {
			if(this.tabIndex == 0) {
				return {
					"left": "21%",
					"width":'8%'
				}
			} else if(this.tabIndex == 1) {
				return {
					"left": "68%",
					"width":'14%'
				}
			} 
			},
		},
	};
</script>

<style scoped="scoped">
	.tab{width: 100%;height: 0.88rem;list-style: none;position: relative;border-bottom: 0.01rem solid #d6d6d6;margin-top: 0.2rem;}
	.tab li{width:50%;font-size: 0.3rem;text-align: center;line-height: 0.88rem;float: left;color: #999999;}
	.tab>.active{color: #e6bf6b;}
	.tab>.bottom{width: 15%;height: 0.04rem;background: #e6bf6b;position: absolute;bottom: 0.01rem;left: 12%;transition: 0.5s;}
	
	img{
		width: 100%;
		height: 100%;
	}
	.top{
		height: 0.9rem;
	
	}
	.navbar{
		width: 100%;
		background: #FFFFFF;
		overflow: hidden;
	}
	.navbar li{
		width:50%;
		height: 0.82rem;
		color: #999999;
		float: left;
		text-align: center;
		line-height: 0.82rem;
	}
	.navbar a{
		height:0.82rem;
		display: inline-flex;
	}
	.navbar-content{
		width: 7.06rem;
		background: #F3F3F3;
		margin: 0 auto;
	}
	.item-content{
		width: 100%;
		height: 2.02rem;
		background: #FFFFFF;
		margin: 0.2rem auto;
		overflow: hidden;
		position: relative;
	}
	.item-content-img{
		width: 37%;
		height: 100%;
		color: white;
		position: absolute;
		top: 0;
	}
	.item-content-img p{
		width: 100%;
		line-height: 2.02rem;
		text-align: center;
		font-size: 0.36rem;
	}
	.item-content-img span{
		font-size: 0.54rem;
	}
	.item-content-text{
		position: absolute;
		width: 63%;
		height: 100%;
		top: 0;
		left: 37%;
	}
	.item-content-text p:nth-of-type(1){
		margin: 0.2rem 0 0.2rem 0.2rem;
	}
	.item-content-text p:nth-of-type(2){
		width: 54.7%;
		margin-left: 0.1rem;
		border: 0.02rem solid #ecd098;
		border-radius:0.1rem ;
		text-align: center;
		color: #ecd098;
		padding: 0 0.1rem;
		text-overflow:ellipsis;
		white-space: nowrap;	
		overflow: hidden;
	}
	.item-content-text-bottom{
		width: 100%;
		/*background: seagreen;*/
		margin-top: 0.2rem;	
		overflow: hidden;
		color: #666666;
		font-size: 0.26rem;
	}
	.item-content-text-bottom a{
		float: left;
		margin-left: 0.2rem;font-size: 0.2rem;
	}
	.item-content-text-bottom p{
		float: right;
		margin: 0 0.2rem 0 0 !important;
		font-size: 0.24rem;
	}
	.item-content-text-bottom span{
		color: #FE4436;
	}
	.bottom-btn{
		width: 7.04rem;
		height: 0.9rem;
		background: #e6bf6b;
		border-radius: 0.1rem;
		text-align: center;
		line-height: 0.9rem;
		color: white;	
		position: fixed;
		bottom: 0.3rem;
		left: 0.24rem;
	}
	/*.btn{
		width: 7.05rem;
		background: #e6bf6b;
		border-radius: 0.1rem;
		text-align: center;
		line-height: 0.9rem;
		color: white;	
		
	}*/
	.message{
		width: 1.5rem;
		height: 1.5rem;
		/*background: salmon;*/
	}
</style>
