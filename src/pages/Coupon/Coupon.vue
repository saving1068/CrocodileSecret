<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title" :right="'message'" :num="total" :left="'back'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		<div style="padding-bottom: 1.9rem;">
			<div class="navbar">
				<div class="tab">
					<li :class="[tabIndex==0?'active':'']" @click="tab(0)">全部</li>
					<li :class="[tabIndex==1?'active':'']" @click="tab(1)">未使用</li>
					<li :class="[tabIndex==2?'active':'']" @click="tab(2)">已使用</li>
					<div class="bottom"  :style="bottomStyle"></div>
				</div>
			</div>
			<div class="navbar-content" v-if="tabIndex==0" >
				<div class="Notcounpon" v-if="Oldcounpon.length == 0&&CouponList.length == 0&&CouponEdList.length == 0">
					<div class="Notcounpon_img">
						<img src="../../assets/my_icon_coupon@2x.png"/>
					</div>
					<p>暂无优惠券记录</p>
				</div>
				<div class="item-content" v-for="(v,i) in CouponList"> <!--未使用-->
					<img src="../../assets/my/3x/my_bg_discount_black@3x.png"/>
			  		<div class="item-content-img">
			  			<p v-if="v.reductionType == 1">
			  				￥
			  				<span>
			  					{{v.totalAmount}}
			  				</span>
			  			</p>
			  			<p v-else>
			  				{{v.totalAmount}}折
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.name}}</p>
			  			<p>{{v.desctipition}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.cardNum}}</a>
			  				<p>剩<span>{{v.residueDate}}</span>天</p>	
			  			</div>
			  		</div>
			  	</div>
		  		<div class="item-content" v-for="(v,i) in Oldcounpon"> <!--已使用-->
		  			<img src="../../assets/my/3x/my_bg_discount_gray@3x.png"/>
			  		<div class="item-content-img over">
			  			<p v-if="v.reductionType == 1">
			  				￥
			  				<span>
			  					{{v.totalAmount}}
			  				</span>
			  			</p>
			  			<p v-else>
			  				{{v.totalAmount}}折
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.name}}</p>
			  			<p>{{v.desctipition}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.cardNum}}</a>
			  				<p style="color: red;">已使用</p>		
			  			</div>
			  		</div>
			  	</div>	
			  	<div class="item-content" v-for="(v,i) in CouponEdList"> <!--已过期-->
		  			<img src="../../assets/my/3x/my_bg_discount_gray@3x.png"/>
			  		<div class="item-content-img over">
			  			<p v-if="v.reductionType == 1">
			  				￥
			  				<span>
			  					{{v.totalAmount}}
			  				</span>
			  			</p>
			  			<p v-else>
			  				{{v.totalAmount}}折
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.name}}</p>
			  			<p>{{v.desctipition}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.cardNum}}</a>
			  				<p style="color: red;">已过期</p>		
			  			</div>
			  		</div>
			  	</div>	
			</div>
			<div class="navbar-content" v-if="tabIndex==1">
				<div class="Notcounpon" v-if="CouponList.length == 0">
					<div class="Notcounpon_img">
						<img src="../../assets/my_icon_coupon@2x.png"/>
					</div>
					<p>暂无优惠券记录</p>
				</div>
				<div class="item-content" v-for="(v,i) in CouponList">
					<img src="../../assets/my/3x/my_bg_discount_black@3x.png"/>
			  		<div class="item-content-img">
			  			<p v-if="v.reductionType == 1">
			  				￥
			  				<span>
			  					{{v.totalAmount}}
			  				</span>
			  			</p>
			  			<p v-else>
			  				{{v.totalAmount}}折
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.name}}</p>
			  			<p>{{v.desctipition}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.cardNum}}</a>
			  				<p>剩<span>{{v.residueDate}}</span>天</p>	
			  			</div>
			  		</div>
			  	</div>
			</div>  	
			<div class="navbar-content" v-if="tabIndex==2">
				<div class="Notcounpon" v-if="Oldcounpon.length == 0">
					<div class="Notcounpon_img">
						<img src="../../assets/my_icon_coupon@2x.png"/>
					</div>
					<p>暂无优惠券记录</p>
				</div>
				<div class="item-content" v-for="(v,i) in Oldcounpon">
		  			<img src="../../assets/my/3x/my_bg_discount_gray@3x.png"/>
			  		<div class="item-content-img over">
			  			<p v-if="v.reductionType == 1">
			  				￥
			  				<span>
			  					{{v.totalAmount}}
			  				</span>
			  			</p>
			  			<p v-else>
			  				{{v.totalAmount}}折
			  			</p>
			  		</div>
			  		<div class="item-content-text">
			  			<p>{{v.name}}</p>
			  			<p>{{v.desctipition}}</p>
			  			<div class="item-content-text-bottom">
			  				<a>{{v.cardNum}}</a>
			  				<p style="color: red;">已使用</p>		
			  			</div>
			  		</div>
			  	</div>
			</div>
		</div>
		<div class="bottom-btn" v-if="isOver" @click="go">
			我要使用优惠卷
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
			tabIndex: 0,
			CouponList: [],
			CouponEdList: [],
			Oldcounpon:[],
			list:[],
			remainingTime: "",
			arr: [
				1, 1, 1, 1, 1, 1
			],
			selected: "1",
			title: "优惠券",
			isOver: true,
			total: 0
		};
	},
	computed: {},
	created() {
		console.log("container created");

		console.log(localStorage.getItem('sessionId'))
		this.getCoupon(0);
		this.QueryAdvices(); //获取消息总条数
	},
	mounted() {

	},
	methods: {
		tab(num) {
			this.tabIndex = num
			if(this.tabIndex == 0) {
				console.log(1)
				this.getCoupon(0);
				this.isOver = true;
			} else if(this.tabIndex == 1) {
				console.log(2)
				this.getCoupon(1);
				this.isOver = true;
			} else if(this.tabIndex == 2) {
				console.log(3)
				this.getCoupon(2);
				this.isOver = false;
			}
		},
		go() {
			this.$router.push({name: "Allgoods"})
		},

		onClickLeft() {
			this.$router.go(-1)
		},
		onClickRight() {
			this.$router.push({name: "Mymessage"})
		},
		getCoupon(num) {
//			console.log(this.$Api.getCouponList)
            var obj={
            	  pa:1,
            
    status:num,
  
            	
            }
          this.CouponList=[]
          this.Oldcounpon=[]
          this.CouponEdList=[]
			this.$Api.getCouponList(obj).then((res) => {
			
			
				

				for(var i = 0; i <  res.q.coupons.length; i++) {
					if(res.q.coupons[i].status == 1) {
						console.log("未使用的下标：" + i)
						this.CouponList.push(res.q.coupons[i])
						
					}
					if(res.q.coupons[i].status == 2) {
						console.log("已使用的下标：" + i)
						this.Oldcounpon.push(res.q.coupons[i])
						
					}
					if(res.q.coupons[i].status == 3) {
						console.log("已过期的下标：" + i)
						this.CouponEdList.push(res.q.coupons[i])
						
					}
					
					
					
				}
			
				
				
				console.log(this.Oldcounpon,"已过期")
				console.log(this.CouponEdList,"已使用")
				console.log(this.CouponList,"未使用优惠卷")
			})
		},
		QueryAdvices() { //获取消息总数
			this.$Api.QueryAdvices().then((res) => {
				if(res.q.s == 0) {
					if(res.q.total < 99) {
						this.total = res.q.total
					} else {
						this.total = 99
					}
				}
			})
		}
	},
	computed: {
		bottomStyle() {
			if(this.tabIndex == 0) {
				return {
					"left": "9%"
				}
			} else if(this.tabIndex == 1) {
				return {
					"left": "42.5%"
				}
			} else if(this.tabIndex == 2) {
				return {"left": "75.5%"
					}
				}
			},
		},
	};
</script>

<style scoped="scoped">
	.tab{width: 100%;height: 0.88rem;list-style: none;position: relative;border-bottom: 0.01rem solid #d6d6d6;margin-top: 0.2rem;}
	.tab>li{width:33.33%;font-size: 0.3rem;text-align: center;line-height: 0.88rem;float: left;color: #999999;}
	.tab>.active{color: #e6bf6b;}
	.tab>.bottom{width: 15%;height: 0.04rem;background: #e6bf6b;position: absolute;bottom: 0.01rem;left: 12%;transition: 0.5s;}
	
	.Notcounpon{position: absolute;top: 3.85rem;left: 2.5rem;text-align: center;color: #666666;font-size: 0.3rem;}
	.Notcounpon_img{width: 2.5rem;height: 2.5rem;border-radius: 50%;overflow: hidden;}
	.Notcounpon p{padding-top: 0.3rem;}
	img{
		width: 100%;
		height: 100%;
	}
	.top{
		height: 0.9rem;
		border-bottom:0.02rem solid #cdcdcd;
	}
	.navbar{
		width: 100%;
		background: #FFFFFF;
		overflow: hidden;
	}
	.navbar li{
		width:33.3%;
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
