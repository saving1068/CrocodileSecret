<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title" :right="'share'" :left="'back'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		<div class="person_info">
			<p class="position">
				<a><img src="../../../../assets/common/3x/common_icon_location@3x.png" /></a>
			</p>
			<div class="person_info_val">
				<ul>
					<li style="overflow: hidden;">
						<p style="float: left;">收货人：{{list.logistics.name}}</p>
						<p style="float: left;padding-left: 0.2rem;padding-top: 0.05rem;"> {{list.logistics.mobile}}</p>
					</li>

					<li>地址：{{list.logistics.regionInfo[0].region.name}}{{list.logistics.regionInfo[1].region.name}}{{list.logistics.regionInfo[2].region.name}}{{list.logistics.street}}</li>
				</ul>
			</div>
		</div>
		<div class="shop_info">
			<div class="shop_info_top">
				<p class="shop_info_img">
					<img :src="list.order.imagePath" />
				</p>
				<div class="sho_info_text">
					<p style="width: 80%;">{{list.order.name}}</p>
					<font>￥{{list.order.goodsAmount}}
						<span style="float: right;">x1</span>
					</font>
				</div>
			</div>
			<div class="text">
				<span>备注：</span>
				<div>{{list.order.leaveMsg!=""?list.order.leaveMsg:"无"}}</div>
				
			</div>
			
			<ul class="shop_info_middle">
				<li>下单时间：{{list.payment.createTime}}</li>
				<li>支付方式：{{list.payment.payType}}</li>
				<li>支付时间：{{list.payment.payTime}}</li>
				<li>配送方式：{{list.payment.deliveryType}}</li>
			</ul>
			<ul class="shop_info_bottom">
				<li>
					<span>商品总额：</span>
					<a v-if="list.order.integralPrice>0">￥{{list.order.integralPrice}}</a>
					<a v-else>￥{{list.order.goodsAmount}}</a>
					
				</li>
				<li>
					<span>优惠：</span>
					<a>￥{{list.order.reductionAmount}}</a>
				</li>
				<li v-if="list.order.integralAmount>0">
					<span>积分：</span>
					<a>{{list.order.integralAmount}}</a>
				</li>
				<li v-if="list.order.orderType==2||list.order.orderType==4">
					<span>税费：</span>
					<a>￥{{list.order.taxesDues}}</a>
				</li>
				<li>
					<span>运费：</span>
					<a>￥{{list.order.distributionAmount}}</a>
					<hr />
				</li>
				<li>
					<p>￥{{list.order.realAmount}}</p>
				</li>
			</ul>
		</div>
		<ul class="bottom_btn">
			<li v-if="list.order.status==8" @click="deleteOrder">
				删除订单
			</li>
			<li v-if="list.order.status==6" @click="comfirmOrder">
				确认收货
			</li>
			<li v-if="list.order.status==3" @click="remindOrder">
				提醒发货
			</li>
			<li @click="goSn"  v-if="list.order.status==6||list.order.status==8">
				查看物流
			</li>
			<li v-if="list.order.isBought==1&&list.order.isContinued==1" class="activeLi" @click="goshop">
				免费续领
			</li>
			<li v-else class="activeLi" @click="goshop">
				立即购买
			</li>
			
		</ul>
		
		<van-dialog v-model="alertShow" show-cancel-button message='确认删除此订单？' close-on-click-overlay :before-close="beforeClose"></van-dialog>
		<van-dialog v-model="alert" show-cancel-button message='是否确认收货？' close-on-click-overlay :before-close="comfirmGoods"></van-dialog>
		
		
		
		
		
		
	</div>
</template>

<script>
	import navbarbase from '../../../../components/Navbarbase/Navbarbase'
	import { Toast } from 'vant';
	export default {
		components: {
			navbarbase,
			Toast
		},
		data() {
			return {
				title: "订单详情",
				bg: {
					'background': "#f5f5f5",
					'min-height': document.body.clientHeight / 50 + "rem",
				},
				id: this.$route.query.id,
				sn:"",
				alertShow: false,
				alert: false,

				list: {}
			}
		},
		created() {
			//			alert(this.$route.query.id)
			this.getData()
		},
		methods: {
			goshop(){
				
				this.$router.push({
					name:"GoodsDetail",
					query:{
						skuId:this.list.order.skuId,
						spuId:this.list.order.spuId,
						type:0
					}
				})
			},
			onClickLeft() {
				if(this.$route.query.mobile == 1) {
					this.$call.backward({
						last: true
					})
				} else {
					this.$router.back(-1)
				}
			},
			getData() {

				this.$Api.getOrderDetails(this.id).then((res) => {
					if(res.q.s == 0){
						this.list = res.q
						console.log(res,"dadas")
						this.sn = res.q.logistics.sn
					}
				})

			},
			goSn() {
				console.log(this.sn,"订单号")
				this.$router.push({
					name: "Logistics",
					query: {
						id: this.id,
						sn: this.sn
					}
				})

			},

			deleteOrder() { //删除订单
				this.alertShow = true
			},
			comfirmOrder() { //确认收货
				this.alert = true

			},
			remindOrder() {
				this.$Api.getOrderUpdate(5, this.id).then((res) => {
					console.log(res)

					if(res.q.s == 0) {

						Toast.success('提醒成功');

					}

				})

			},

			beforeClose(action, done) {
				console.log(action)
				if(action == "confirm") {
					setTimeout(done, 1000);
					this.$Api.getOrderUpdate(2, this.id).then((res) => {
						if(res.q.s == 0) {

							Toast.success('成功删除');
							this.$router.go(-1)
						} else {

							Toast.fail(res.q.d);
						}

					})

				}else{
					done()
				}

			},
			comfirmGoods(action, done) {
				if(action === 'confirm') {
					setTimeout(done, 1000);
					this.$Api.getOrderUpdate(4, this.id).then((res) => {
						console.log(res)
						if(res.q.s == 0) {

							Toast.success('收货成功');
							this.$router.go(-1)
						} else {

							Toast.fail(res.q.d);
						}

					})

				} else {

					done()

				}

			},

			onClickRight() {
				if(this.$store.state.isLogin) {
					var obj = {
						shareType: 2,
						mpPath: '/pages/goodsDetail/goodsDetail?spuId=' + this.list.order.spuId + "&skuId=" + this.list.order.skuId+"&shareBy="+ this.list.order.shareBy,
						shareTitle: this.list.order.name,
						mpUserName:"gh_0990137c737d",
						shareContent: '',
						shareImage: this.list.order.imagePath
					}
					console.log(obj)
					this.$call.invokeShare(obj)
				} else {
					this.$call.invokeLogin({})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	img {
		width: 100%;
	}
	
	.top {
		height: 0.9rem;
		
	}
	
	.person_info {
		height: 1.9rem;
		background: #FFFFFF;
		margin: 0.2rem 0;
		padding-top: 0.4rem;
	}
	
	.position {
		width: 0.8rem;
		height: 100%;
		padding: 0.22rem 0.22rem;
		float: left;
	}
	
	.position a {
		width: 0.5rem;
		height: 0.4rem;
		display: block;
	}
	
	.person_info_val {
		width: 6.7rem;
	}
	
	.person_info_val ul {
		overflow: hidden;
	}
	
	.person_info_val li:nth-of-type(2) {
		padding-top: 0.08rem;
	}
	
	.person_info_val li:nth-of-type(3) {
		padding-top: 0.3rem;
	}
	
	.shop_info {
		background: #FFFFFF;
	}
	
	.shop_info_top {
		height: 2.25rem;
		padding-top: 0.2rem;
		padding-left: 0.22rem;
		border-bottom: 0.02rem solid #e5e5e5;
	}
	
	.shop_info_img {
		width: 1.6rem;
		height: 1.6rem;
		float: left;
	}
	.shop_info_img img{
		width: 100%;
		height: 100%;
	}
	.sho_info_text {
		float: left;
		width: 5.4rem;
		height: 1.6rem;
		padding-top: 0.2rem;
		padding-left: 0.3rem;
		font-size: 0.28rem;
	}
	
	.sho_info_text font {
		color: #666666;
		margin-top: 0.35rem;
		display: block;
	}
	
	.shop_info_middle {
		height: 2.6rem;
		border-bottom: 0.02rem solid #e5e5e5;
		padding: 0 0.25rem;
		color: #999999;
		font-size: 0.28rem;
	}
	
	.shop_info_middle li {
		margin-top: 0.3rem;
	}
	
	.shop_info_bottom {
		
		padding-top: 0.3rem;
		padding-left: 0.25rem;
		font-size: 0.28rem;
		color: #999999;
	}
	
	.shop_info_bottom li {
		height: 0.67rem;
		width: 7.02rem;
	}
	
	.shop_info_bottom li>a {
		float: right;
		color: #E6BF6B;
	}
	
	.shop_info_bottom li>hr {
		width: 1.62rem;
		margin-left: 5.4rem;
		border: 0.01rem solid #CCCCCC;
	}
	
	.shop_info_bottom p {
		float: right;
		color: #FF4A4A;
	}
	
	.bottom_btn {
		height: 1rem;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		 justify-content:flex-end;
		padding-top: 0.23rem;
		padding-right: 1.7rem;
		font-size: 0.28rem;
		padding-right: 0.3rem;
	}
	
	.bottom_btn li {
		width: 1.52rem;
		height: 0.58rem;
		border: 0.02rem solid #CCCCCC;
		border-radius: 0.28rem;
		
		margin-left: 0.3rem;
		text-align: center;
		line-height: 0.58rem;
	}
	
	.bottom_btn .activeLi{
		border: 0.02rem solid #E6BF6B;
		color: #E6BF6B;
	}
	.text{
		    padding-top: 0.2rem;
		      padding-bottom: 0.2rem;
    padding-left: 0.22rem;
        border-bottom: 0.02rem solid #e5e5e5;
        display: flex;
        color: #999999;
    font-size: 0.28rem;
	}
</style>