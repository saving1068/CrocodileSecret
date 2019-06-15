<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title" :right="'message'" :left="'back'" :num="total" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		<div class="tab">
			<li :class="[tabIndex==0?'active':'']" @click="tab(0)">全部订单</li>
			<li :class="[tabIndex==1?'active':'']" @click="tab(1)">待发货</li>
			<li :class="[tabIndex==2?'active':'']" @click="tab(2)">待收货</li>
			<div class="bottom" :style="bottomStyle"></div>
		</div>
		<div class="content" style="padding-top: 0.88rem;">

			<div class="content_warp" v-if="tabIndex==0" v-for="(item,index) in list ">
				<div class="content_ui" @click="goDetails(item.id)">
					<li class="content_item">
						<div class="content_item_val">
							<div class="content_item_val_img">
								<img :src="item.imagePath"/>
							</div>
							<p>
								{{item.name}}
							</p>
							<font>
								实付金额：￥{{item.realAmount}}
							</font>
						</div>
					</li>
				</div>
				<div class="conten_btn">
					<p v-if="item.status==8">已完成</p>
					<p v-if="item.status==3">待发货</p>
					<p v-if="item.status==6">待收货</p>
					<ul class="btn_item">
						<li v-if="item.status==8" @click="delect(item.id)">删除订单</li>
						<li v-if="item.status==6" @click="confrim(item.id)">确认收货</li>
						<li v-if="item.status==3" @click="remind(item.id)">提醒发货</li>
						<li v-if="item.status==6||item.status==8" @click="goSn(item.logisticsTicketCode,item.id)">查看物流</li>
						
						<li class="activeLi" v-if="item.isContinued==1&&item.isBought==1" @click="goGoodsDetail(item.spuId,item.skuId)">免费续领</li>
						<li class="activeLi" v-else  @click="goGoodsDetail(item.spuId,item.skuId)">立即购买</li>
					</ul>
				</div>
			</div>
			<div class="content_warp" v-if="tabIndex==1" v-for="item in list ">
				<div class="content_ui" @click="goDetails(item.id)">
					<li class="content_item">
						<div class="content_item_val">
							<div class="content_item_val_img">
								<img :src="item.imagePath"/>
							</div>
							<p>
								{{item.name}}
							</p>
							<font>
								实付金额：￥{{item.realAmount}}
							</font>
						</div>
					</li>
				</div>
				<div class="conten_btn">
					<p>待发货</p>
					<ul class="btn_item">
						<li @click="remind(item.id)">提醒发货</li>
					<!--	<li @click="goSn(item.logisticsTicketCode)">查看物流</li>-->
					<li class="activeLi" v-if="item.isContinued==1&&item.isBought==1" @click="goGoodsDetail(item.spuId,item.skuId)">免费续领</li>
						<li class="activeLi" v-else @click="goGoodsDetail(item.spuId,item.skuId)">立即购买</li>
						
					</ul>
				</div>
			</div>
			<div class="content_warp" v-if="tabIndex==2" v-for="item in list ">
				<div class="content_ui" @click="goDetails(item.id)">
					<li class="content_item">
						<div class="content_item_val">
							<div class="content_item_val_img">
								<img :src="item.imagePath"/>
							</div>
							<p>
								{{item.name}}
							</p>
							<font>
								实付金额：￥{{item.realAmount}}
							</font>
						</div>
					</li>
				</div>
				<div class="conten_btn">
					<p>待收货</p>
					<ul class="btn_item">
						<li @click="confrim(item.id)">确认收货</li>
						<li @click="goSn(item.logisticsTicketCode)">查看物流</li>
						<li class="activeLi" v-if="item.isContinued==1&&item.isBought==1" @click="goGoodsDetail(item.spuId,item.skuId)">免费续领</li>
						<li class="activeLi" v-else @click="goGoodsDetail(item.spuId,item.skuId)">立即购买</li>
					</ul>
				</div>

			</div>
			<div v-if="list.length<=0" >
				<div class="no_img">
					<div class="no_img_val">
						<img src="../../../assets/my/my_bg_query_null@2x.png" />
					</div>
				</div>
				<div class="no_text">
					<p>您还没有相关的订单</p>
				</div>
				<div class="no_btn" @click="goGoods">
					<p>戳我一下</p>
				</div>
			</div>

		</div>

		<van-dialog v-model="alertShow" show-cancel-button message='确认删除此订单？' close-on-click-overlay :before-close="beforeClose"></van-dialog>
		<van-dialog v-model="alert" show-cancel-button message='是否确认收货？' close-on-click-overlay :before-close="comfirmGoods"></van-dialog>
	</div>
</template>

<script>
	import navbarbase from '../../../components/Navbarbase/Navbarbase'
	import { Toast } from 'vant';
	export default {
		components: {
			navbarbase,
			Toast
		},
		created() {
			window.scrollTo(0, 0)
			console.log("OrderList");
			//		    this.$Api.setSessionId("a65bn7Z7IjHRe29Wdb685e69o9h2733V")
			this.QueryAdvices(); //获取消息总条数
			console.log(localStorage.getItem('sessionId'))
			this.getOrderList(99)
		},
		data() {
			return {
				tabIndex: 0,
				title: "订单记录",
				bg: {
					'background': "#f5f5f5",
					'min-height': document.body.clientHeight / 50 + "rem",
				},
				list: [],
				alertShow: false,
				alert: false,
				listId: 0,
				total: 0, //消息总条数
			}
		},
		
		methods: {
			tab(num) { //切换tab
				this.tabIndex = num;
				this.list = [];
				if(this.tabIndex == 0) {
					
					this.getOrderList(99)
				} else if(this.tabIndex == 1) {
					this.getOrderList(3)
				} else if(this.tabIndex == 2) {
					this.getOrderList(6)
				}
			},
			beforeClose(action, done) { //删除订单弹框
				var that = this
				if(action === 'confirm') {
					
					this.$Api.getOrderUpdate(2, this.listId).then((res) => {
						if(res.q.s == 0) {
                         this.list = [];
							Toast.success('成功删除');
							this.getOrderList(99)
						} else {

							Toast.fail(res.q.d);
						}

					})
                     setTimeout(done, 1000);
					console.log(1)
				} else {
					done();
				}
			},
			delect(id) { //删除订单
				this.alertShow = true
				this.listId = id

			},
			onClickLeft() { //goBack
				this.$router.go(-1)
			},
			onClickRight() { //跳转信息页面
				this.$router.push({
					name: "Mymessage"
				})

			},
			goDetails(id) { //跳转详情页面
				this.$router.push({
					name: "Odetails",
					query: {
						id: id
					}
				})
			},
			goSn(sn,id) { //跳转物流页面
				//				window.location.href = "https://m.kuaidi100.com/result.jsp?nu=" + id
				this.$router.push({
					name: "Logistics",
					query: {
						sn,
						id: id
					}
				})
			},

			getOrderList(num) { //获取数据
				Toast.loading({
  mask: true,
  message: '加载中...'
});
				this.$Api.getOrderList(1, num).then((res) => {
					
					for(var i = 0; i < res.q.orders.length; i++) {
						if(res.q.orders[i].status == 3 || res.q.orders[i].status == 6 || res.q.orders[i].status == 8) {

							this.list.push(res.q.orders[i])
						}

					}
                     setTimeout(()=>{
                     	Toast.clear()
                     },500)
					console.log(res)
				})
			},
			remind(id) { //提醒发货
				this.$Api.getOrderUpdate(5, id).then((res) => {
					console.log(res)

					if(res.q.s == 0) {

						Toast.success('提醒成功');

					}

				})
			},
			confrim(id) { //确认收货
				this.alert = true
				this.listId = id

			},
			comfirmGoods(action, done) {
				if(action === 'confirm') {
					setTimeout(done, 1000);
					this.$Api.getOrderUpdate(4, this.listId).then((res) => {
						console.log(res)
						if(res.q.s == 0) {
                            this.list = [];
							Toast.success('收货成功');
							if(this.tabIndex==0){
								this.getOrderList(99)
							}else{
								this.getOrderList(6)
							}
						} else {

							Toast.fail(res.q.d);
						}

					})

				} else {

					done()

				}

			},

			goGoods() { //无订单时跳转商品列表页
				this.$router.push({
					name: "Allgoods"
				})

			},
			goGoodsDetail(spuId, skuId) { //跳转商品详情页
				this.$router.push({
					name: "GoodsDetail",
					query: {
						spuId: spuId,
						skuId: skuId,
						type: 0
					}

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
						"left": "42%"
					}
				} else if(this.tabIndex == 2) {
					return {
						"left": "75.5%"
					}
				}
			},
		},
	}
</script>

<style scoped="scoped">
	img {
		width: 100%;
	}
	
	li {
		list-style: none;
	}
	
	.top {
		height: 0.9rem;
		border-bottom: 0.02rem solid #cdcdcd;
	}
	
	.tab {
		width: 100%;
		height: 0.88rem;
		position: fixed;
		top: 46px;
		left: 0;
		list-style: none;
		border-bottom: 0.01rem solid #d6d6d6;
		background: #FFFFFF;
	}
	
	.tab>li {
		width: 33%;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.88rem;
		float: left;
		color: #333333;
	}
	
	.tab>.active {
		color: #e6bf6b;
	}
	
	.tab>.bottom {
		width: 15%;
		height: 0.04rem;
		background: #e6bf6b;
		position: absolute;
		bottom: 0.01rem;
		left: 12%;
		transition: 0.5s;
	}
	.content{background: #f3f3f3;}
	.content_item {
		margin-top: 0.2rem;
	}
	
	.content_item_val {
		height: 2.03rem;
		border-bottom: 0.01rem solid #d6d6d6;
		background: #FFFFFF;
		padding-top: 0.23rem;
		font-size: 0.28rem;
		overflow: hidden;
		padding-left: 0.24rem;
	}
	
	.content_item_val_img {
		height: 1.61rem;
		width: 1.61rem;
		
		float: left;
	}
	.content_item_val_img img{
		width: 100%;
		height: 100%;
	}
	.content_item_val p {
	
		overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
		padding-left: 0.3rem;
		float: left;
		color: #151515;
	}
	
	.content_item_val font {
		padding-top: 0.5rem;
		padding-left: 3rem;
		display: block;
		color: red;
		float: left;
	}
	
	.conten_btn {
		height: 1.2rem;
		background: #FFFFFF;
		padding-left: 0.24rem;
	}
	
	.conten_btn p {
		width: 1.9rem;
		line-height: 1.2rem;
		font-size: 0.35rem;
		color: #e6bf6b;
		float: left;
	}
	
	.btn_item {
		width: 5.36rem;
		height: 1.2rem;
		
		display: flex;
		 justify-content:flex-end;
		padding-top: 0.32rem;
		padding-right: 0.1rem;
		font-size: 0.26rem;
	}
	
	.btn_item li {
		float: left;
		border: 0.02rem solid #dedede;
		border-radius: 0.5rem;
		width: 1.52rem;
		height: 0.57rem;
		line-height: 0.57rem;
		text-align: center;
	}
	
	.btn_item li:nth-of-type(2),
	.btn_item li:nth-of-type(3) {
		margin-left: 0.26rem;
	}
	
	.btn_item .activeLi{
		border: #e6bf6b solid 0.02rem;
		color: #e6bf6b;
	}
	
	.no_img {
		padding: 2rem 0 0.8rem 2.95rem;
	}
	
	.no_img_val {
		width: 1.7rem;
		height: 2.06rem;
	}
	
	.no_text {
		padding-left: 2.5rem;
		color: #666666;
		font-size: 0.28rem;
	}
	
	.no_btn {
		padding-left: 2.64rem;
		padding-top: 0.4rem;
	}
	
	.no_btn p {
		width: 2.25rem;
		height: 0.8rem;
		background: #E6BF6B;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.8rem;
		border-radius: 0.1rem;
	}
</style>