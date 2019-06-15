<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" :right="'fuck'" @isLeft="onClickLeft"  @isRight="onClickRight"></navbarbase>
		
		<!--添加地址-->
		<div class="add_Region" @click="selectAddress" v-if="havesite">
			<div class="Region_div_a">
				<span class="Region_span_a"><img src="../../assets/common/3x/common_icon_location@3x.png"/></span>
				<p class="Region_p">暂无收货地址，点击添加收货地址</p>
				<span class="Region_span_b"><img src="../../assets/common/3x/common_btn_arrow_grey@3x.png"/></span>
			</div>
			<ul class="Region_ul_a">
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
			</ul>
		</div>
		
		<!--已有地址-->
		<div class="add_Regions" @click="selectAddress" v-if="!havesite">
			<div class="Region_div_a">
				<span class="Region_span_a"><img src="../../assets/common/3x/common_icon_location@3x.png"/></span>
				<div class="have_top">
					<p class="have_p_top">
						<span class="have_name">{{address.name}}</span>
						<span class="have_phone">{{address.mobile}}</span>
					</p>
					<p class="have_p_bottom">{{address.regionInfo[0].region.name}}{{address.regionInfo[1].region.name}}{{address.regionInfo[2].region.name}}{{address.street}}</p>
				</div>
				<span class="Region_span_b"><img src="../../assets/common/3x/common_btn_arrow_grey@3x.png"/></span>
			</div>
			<ul class="Region_ul_a">
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
				<li class="Region_li li_a"></li>
				<li class="Region_li li_b"></li>
				<li class="Region_li li_c"></li>
			</ul>
		</div>
		
		<!--商品信息-->
		<div class="merchandise_news">
			<p class="merchandise_title">商品详情</p>
			<ul class="merchandise_list">
				<li class="lis merchandise_li_a">
					<div class="merchandise_li_div_a" >
						<img class="merchandise_li_a_img" :src="goods.imagePath"/>
					</div>
					<div class="merchandise_li_div_b">
						<p class="merchandise_li_p_a">{{goods.name}}</p>
						<p class="merchandise_li_p_b">
							<span class="merchandise_span_a" v-if="type!=3">￥{{parseFloat(goods.originalPrice)}}</span>
							<span class="merchandise_span_a" v-if="type==3">￥{{parseFloat(goods.discountPrice)}}</span>
							<span class="merchandise_span_b">x1</span>
						</p>
					</div>
				</li>
				<li class="lis  merchandise_li_b">
					<span class="li_b_span_a">商品总额：</span>
					<span class="li_b_span_b" >￥{{parseFloat(list.goodsAmount)}}</span>
				</li>
				
				<li class="lis  merchandise_li_b" @click="goselectCoupon" v-if="type==0">
					<span class="li_b_span_a">优惠券：</span>
					<span class="li_b_span_b" style="margin-right: 0.24rem;color:#FE4436;" v-if="catusecoupons.length>0||couponId!=0">-￥{{parseFloat(list.reductionAmount)}}</span>
					<span class="li_b_span_b" style="margin-right: 0.24rem;" v-if="catusecoupons.length==0&&couponId==0">无可用</span>
					<img src="../../assets/arrow_gray.png" />
				</li>
				<li class="lis  merchandise_li_b" v-else-if="type!=3">
					<span class="li_b_span_a">优惠：</span>
					<span class="li_b_span_b">-￥{{parseFloat(list.reductionAmount)}}</span>
				</li>
				<li class="lis  merchandise_li_b">
					<span class="li_b_span_a">运费：</span>
					<span class="li_b_span_b">￥{{list.distributionAmount}}</span>
				</li>
				<li class="lis  merchandise_li_b" v-if="type==2||type==4">
					<span class="li_b_span_a">税费：</span>
					<span class="li_b_span_b">￥{{list.taxesDues}}</span>
				</li>
				<li class="lis  merchandise_li_b" v-if="type==3">
					<span class="li_b_span_a">您拥有的积分：</span>
					<span class="li_b_span_b">{{pointsCash}}</span>
				</li>
				<li class="lis  merchandise_li_b" v-if="type==3">
					<span class="li_b_span_a">积分：</span>
					<span class="li_b_span_b">-{{list.integralAmount}}</span>
				</li>
				<li class="lis  merchandise_li_b">
					<span class="li_b_span_a">订单总计：</span>
					<span class="li_b_span_b">￥{{parseFloat(list.realAmount)}}</span>
				</li>
				
			</ul>
		</div>
		
		<!--用户留言-->
		<div class="warp">
			<div class="leave_word">
				<textarea rows="3" cols="20" maxlength="120" placeholder="用户留言(选填)" v-model="textareaText" class="leave_textarea" @input="descInput(textareaText)">
					
				</textarea>
			</div>
			<div class="numb">{{textareaNum}}/120</div>
		</div>
		
		<div style="height: 1rem;"></div>
		<!--提交订单栏-->
		<van-submit-bar
		  :price="list.realAmount*100"
		  button-text="提交订单"
		  @submit="onSubmit"
		/>
		
		
		<!--弹框-->
		<van-dialog v-model="show" showConfirmButton confirmButtonText="知道了" :before-close="beforeClose" @confirm="confirm">
		 	<p class="dialog_title">订单温馨提示</p>
		 	<p class="dialog_con"><span class="dot">●</span><span>该订单不支持更改收货地址，请确保收货地址正确。</span></p>
		 	<p class="dialog_con"><span class="dot">●</span><span>该订单支付成功后，不支持取消订单操作。</span></p>
		 	<p class="dialog_con"><span class="dot">●</span><span>该商品一经售出，不退不换，有问题请咨询客服。</span></p>
		  	<van-checkbox class="dialog_checked" v-model="checked">不再提醒</van-checkbox>
		</van-dialog>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		components: {
			navbarbase,
			Toast
		},
		
		data() {
			return {
				title:'订单结算',
				checked:false,
				show: true,
				textareaText:this.$store.state.orderText,
				textareaNum:0,
				havesite:true,//true无地址，false有地址
				skuId:this.$route.query.skuId,
				spuId:this.$route.query.spuId,
				type:this.$route.query.type,
				couponId:0,
				goods:{},
				list:{},
				address:{},
				pointsCash:0,
				cash:0,
				catusecoupons:[]
			}
		}, 
		created(){
			 if(localStorage.getItem("order")==null){
	         	localStorage.setItem("order","false")
	         }
			  if(localStorage.getItem("order")=="false"){
	         	this.show=true,
	         	this.checked=false
	         }
			  if(localStorage.getItem("order")=="true"){
	         	this.show=false,
	         	this.checked=true
	         }
			 if(this.$route.query.couponId){
			 	this.couponId=this.$route.query.couponId
			 }
			console.log(this.$route.query.id)
			this.getData()
			this.getAddress()
			this.getDetails()
			this.getPrice()
		},
		computed:{
			imgStyle(){
				return {
					'background':'url('+this.goods.imagePath+') no-repeat',
					'background-size':'100% 100%',
					
				}
			}
		},
		methods: {
			confirm(){
				if(this.checked){
					localStorage.setItem("order","true")
					
					
				}else{
					localStorage.setItem("order","false")
				}
				
				
			},
			goselectCoupon(){
				if(this.$route.query.id){
					this.$router.push({
			  	name:'SelectCoupon',
			  	query:{
			  		skuId:this.skuId,
			  		spuId:this.spuId,
			  		type:this.type,
			  		id:this.$route.query.id
			  	}
			  })
				}else{
					this.$router.push({
			  	name:'SelectCoupon',
			  	query:{
			  		skuId:this.skuId,
			  		spuId:this.spuId,
			  		type:this.type,
			  		id:0
			  	}
			  })
				}
				
			  
			},
			onClickLeft(data){//头部导航左边点击事件
				this.$router.go(-1)
			},
			onClickRight(){//头部导航右边点击事件
				this.show=true
			},
			getData(){//试算
				
				
				var obj={
					"a":0,
					 "note":"",
					 "addresId":0,
					 "skuId":this.skuId,
					 "spuId":this.spuId,
					 "num":1,
					 "couponid":0
					 
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
				if(this.$route.query.couponId!=0&&this.$route.query.couponId){
					obj.couponid=this.$route.query.couponId
				}
				
				this.$Api.getOrderSubmit(obj).then((res)=>{
					this.list=res.q
					this.catusecoupons=this.list.catusecoupons
					console.log(res)
				})
				
			},
			getDetails(){//获取商品详情
				if(this.$store.state.isLogin){
					var obj = {
						"spuId": this.$route.query.spuId,
						"skuId": this.$route.query.skuId,
						"sessionId":localStorage.getItem("sessionId")
					}
				}else{
					var obj = {
						"spuId": this.$route.query.spuId,
						"skuId": this.$route.query.skuId
					}
				}
				this.$Api.getGoodsDetails(obj).then((res)=>{
					console.log(res)
					this.goods=res.q.goods
					
				})
				
				
			},
			
			getAddress() {//获取地址

				this.$Api.getShippingAddressList().then((res) => {
					console.log(res)
					if(res.q.addresses.length > 0) {
						if(this.$route.query.id!=0){
							for(var i = 0; i < res.q.addresses.length; i++) {
						if(res.q.addresses[i].id == this.$route.query.id) {
							this.havesite=false
							this.address=res.q.addresses[i]
						}

					}
							
							
						}else{
							for(var i = 0; i < res.q.addresses.length; i++) {
						if(res.q.addresses[i].selected == 1) {
							this.havesite=false
							this.address=res.q.addresses[i]
						}

					}
						}
						
					}else{
						this.havesite=true
					}
					
				})

			},
			getPrice(){//获取余额
				this.$Api.getMyAccountList(0).then((res)=>{
					console.log(res)
					for(var i=0;i<res.q.Accounts.length;i++){
						if(res.q.Accounts[i].typeName=="积分"){//积分余额
						this.pointsCash=res.q.Accounts[i].balanceCash
						}else if(res.q.Accounts[i].typeName=="系统内钱包") {//金额余额
							this.cash=res.q.Accounts[i].balanceCash
				
						}
						
						
					}
					
				})
				
				
				
			},
			
			
			
			
			beforeClose(action, done) {//弹框确认按钮执行事件
		      if (action === 'confirm') {
		        setTimeout(done, 500);
		      }else{
		      	done();
		      }
		    },
		    descInput(value){//用户留言字数
		    	this.textareaNum = value.length
		    },
		    onSubmit(){//结算
		    	if(this.havesite){
		    		this.$toast('请先添加收货地址')
		    	}else{
		    		this.sendData()
		    		
		    	}
		    	

		    },
		    sendData(){
		    	var obj={
		    		"a":0,
					 "note":this.textareaText,
					 "skuId":this.skuId,
					 "spuId":this.spuId,
					 "num":1,
					 "addresId":this.address.id,
					 "couponid":0
		    	}
		    if(this.$route.query.type==0){
					obj.a=1
				}else if(this.$route.query.type==2){
					obj.a=2
				}else if(this.$route.query.type==3){
					obj.a=3
				}else if(this.$route.query.type==1){
					obj.a=4
				}
				if(obj.a==3){
					if(this.pointsCash<this.list.integralAmount){
					 Toast({
      message: "您的积分不够，请选择其他商品",
       forbidClick: true,
      position: 'bottom',
      duration: 5000
    });
    return false;
					}
				}
				
			if(this.$route.query.couponId!=0&&this.$route.query.couponId){
				obj.couponid=this.$route.query.couponId
			}else if(this.$route.query.type==0&&this.catusecoupons.length>0){
				obj.couponid=this.catusecoupons[0].id
				console.log(1)
			}
			console.log(obj)
		    this.$Api.getOrderSubmit(obj).then((res)=>{
//					this.list=res.q
				console.log(res)
				var obj={
					action:0,
					amount:res.q.realAmount,
					orderId:res.q.orderId,
					balance:this.cash,
					mpPath: '/pages/goodsDetail/goodsDetail?spuId=' + this.$route.query.spuId + "&skuId=" + this.$route.query.skuId+"&shareBy="+this.goods.shareBy ,
					shareType:2,
					shareTitle:"",
					mpUserName:"gh_0990137c737d",
					shareContent:'',
					buyType:0,
					shareImage:this.goods.imagePath
				}
				
				if(this.$route.query.type==0){
					obj.buyType=0
					obj.shareTitle='我购买了'+this.goods.name
					obj.shareContent='我购买了'+this.goods.name
				}else if(this.$route.query.type==2){
					obj.buyType=1
					obj.shareTitle='我免费试用了'+this.goods.name
					obj.shareContent='我免费试用了'+this.goods.name
				}else if(this.$route.query.type==1){
					obj.buyType=2
					obj.shareTitle='我免费续领了'+this.goods.name
					obj.shareContent='我免费续领了'+this.goods.name
				}
				console.log(obj)
				this.$call.invokeCheckoutCounter(obj)
				
				
				})
		    	
		    },
		    selectAddress(){//选择地址
		    	this.$store.state.orderText=this.textareaText
		    	this.$router.push({name:'Selectaddress'})
		    },
		}
	}
	
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0rem 0;background-color: #f3f3f3;width: 100%;height: 100%;}
	
	/*弹框*/
	.dialog_title{text-align: center;padding: 0.35rem 0;font-size: 0.3rem;font-weight: 550;color: 3333333;}
	.dialog_con{padding: 0 0.4rem 0.2rem;font-size: 0.3rem;color: 3333333;display: flex;}
	.dot{padding-right: 0.2rem;}
	.dialog_checked{padding: 0.1rem 0 0 0.4rem;font-size: 0.25rem;color: #666666;}
	.van-dialog{width: 78%;}
	
	/*添加地址*/
	.add_Region{width: 100%;height: 1.44rem;background-color: #fff;position: relative;margin-bottom: 0.2rem;}
	.Region_div_a{width: 100%;display: flex;height: 1.44rem;padding: 0 0.24rem;}
	.Region_span_a,.Region_span_b{height: 1.44rem; line-height: 1.44rem;width: 7%;}
	.Region_span_b{text-align: right;}
	.Region_span_a>img{width: 0.42rem;height: 0.4rem;}
	.Region_span_b>img{width: 0.13rem;height: 0.23rem;}
	.Region_p{line-height: 1.46rem;width: 86%;padding-left: 0.2rem;font-size: 0.3rem;color: #333333;}
	.Region_ul_a{width: 100%;height: 0.04rem;position: absolute;bottom: 0;display: flex;flex-wrap: nowrap;padding-left: 0.17rem;}
	.Region_li{width: 8.3%;margin-right: 0.17rem;}
	.li_a{background-color: #2f89c9;}
	.li_b{background-color: #f2ca74;}
	.li_c{background-color: #ff4f2c;}
	
	/*已有地址*/
	.add_Regions{width: 100%;height: 1.81rem;background-color: #fff;position: relative;margin-bottom: 0.2rem;}
	.have_top{width: 90%;height: 1.4rem;font-size: 0.3rem;color: #333333;padding: 0.16rem 0.24rem 0.16rem 0.24rem;}
	.have_p_top{position: relative;width: 100%; height: 0.54rem;line-height: 0.54rem;}
	.have_phone{position: absolute;right: 0;}
	.have_p_bottom{width: 100%;display: -webkit-box;-webkit-box-orient: vertical !important;-webkit-line-clamp: 2;overflow: hidden;min-height: 0.9rem;     }
	
	/*商品信息*/
	.merchandise_news{width:100%;background-color: #fff;padding-left: 0.24rem;margin-bottom: 0.2rem;}
	.merchandise_title{width:100%;height: 0.86rem;line-height: 0.86rem;font-size: 0.3rem;}
	.lis{border-top: 0.01rem solid #e5e5e5;padding: 0.2rem 0;display: flex;}
	.merchandise_li_a{width: 100%;height: 2rem;}
	.merchandise_li_div_a{width: 25%; height: 1.6rem;border: 0.01rem solid #dedede;box-sizing: border-box;border-radius: 0.1rem; display: flex; justify-content: center;align-items: center;}
	.merchandise_li_a_img{width: 100%;height: 100%;}
	.merchandise_li_div_b{padding: 0 0.24rem;position: relative;width:75%;box-sizing: border-box;}
	.merchandise_li_p_a{width: 100%; font-size: 0.25rem;color: #333333;}
	.merchandise_li_p_b{width: 90%;height: 0.36rem;line-height: 0.36rem; position: absolute;bottom: 0;}
	.merchandise_span_a{ font-size: 0.25rem;color: #333333;}
	.merchandise_span_b{font-size: 0.23rem;color: #666666;float: right;position: relative;top: 0.02rem;}
	.merchandise_li_b{width: 100%;height: 0.86rem;line-height: 0.46rem;display: flex;justify-content:space-between;padding-right: 0.24rem;position: relative;}
	.merchandise_li_b img{
		position: absolute;
		right: 0.24rem;
		top: 0.32rem;
		width: 0.13rem;
		height: 0.23rem;
	}
	.li_b_span_a,.li_b_span_b{font-size: 0.3rem;color: #333333;}
	
	/*用户留言*/
	.leave_word{width: 100%;height: 2.01rem;background-color: #fff;display: flex;justify-content: center;align-items: center;margin: 0 auto;padding: 0.3rem 0.24rem;}
	.leave_textarea{background-color: #f3f3f3;width: 100%;height: 100%;padding: 0.2rem 0.24rem;font-size: 0.3rem;border: none;color: #666;}
	.warp{position: relative;}
	.numb{position: absolute;bottom: 0.4rem;right: 0.48rem;color: #999999;font-size: 0.3rem;}
	
	/*提交订单栏*/
	
	
</style>





