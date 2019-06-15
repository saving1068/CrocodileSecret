<template>
	<div class="containers">
		<navbarbase :title="title" :right="'share'" :left="'back'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>

		<div class="">
			<div class="swiper_box">
				<van-swipe :autoplay="3000">
					<van-swipe-item v-for="(image, index) in images" :key="index">
						<img :src="image" style="width:100%;height: 7.5rem;" />
					</van-swipe-item>
				</van-swipe>

			</div>
			<div class="detail_box">
				<p class="detail_box_p">{{name}}</p>
				<p class="price_p" v-if="type==0"><span class="price_span_a">￥{{parseFloat(goods.originalPrice)}}</span><span class="price_span_b">{{mailing}}</span></p>
				<p class="price_p" v-if="type==3"><span class="price_span_a">￥{{parseFloat(goods.discountPrice)}} + {{goods.discount}}积分</span><span class="price_span_b">{{mailing}}</span></p>
			</div>
			<div class="base" v-html="content"></div>
		</div>

		<div class="bottom" v-if="JSON.stringify(goods)!='{}'">
			<div class="serve" @click="cust">
				<i></i>
				<p>客服</p>
			</div>

			<div class="free" v-if="goods.isSampleSack==1&&type!=3&&goods.isBought!=1" @click="freeGo">免费试用</div>
			<div class="free" @click="go_address(goods.isPassMuster,1)" v-else-if="goods.isContinued==1&&type!=3&&goods.isBought==1">免费续领</div>

			<div class="notFree" v-else-if="goods.isSampleSack==0&&type!=3">免费试用未开通</div>

			<div class="buy" @click="go_address(goods.isPassMuster,0)" :style="[{'width':type==3?'5.5rem':'2.75rem'}]">立即购买</div>

		</div>

		<!--弹框-->
		<van-dialog v-model="show" showConfirmButton confirmButtonText="知道了" :before-close="beforeClose" @confirm="confirm">
			<p class="dialog_title">温馨提示</p>
			<p class="dialog_con">● 购买一次可免费终身续领</p>
			<van-checkbox class="dialog_checked" v-model="checked"><span>不再提醒</span>
			</van-checkbox>
		</van-dialog>

		<!--弹框-->
		<van-dialog v-model="show1" showConfirmButton confirmButtonText="知道了" :before-close="beforeClose">
			<p class="dialog_title">温馨提示</p>
			<p class="dialog_con">● 每个商品每天仅可续领一次</p>

			</van-checkbox>
		</van-dialog>

		<!--弹框-->
		<van-dialog v-model="show2" showConfirmButton confirmButtonText="知道了" :before-close="beforeClose">
			<p class="dialog_title">温馨提示</p>
			<p class="dialog_con">● 您已试用过这个商品了，立即购买后即可无限免费续领</p>

			</van-checkbox>
		</van-dialog>

	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase';
	import { Toast } from 'vant';
	export default {
		components: {
			navbarbase,
			Toast
		},

		data() {
			return {
				title: "商品详情",
				router: this.$route.name,
				articleId: null, //商品详情获取ID
				checked: false,
				show: false,
				name: "",
				mailing: "",
				free: true,
				images: [],
				goods: {},
				skuList: [],
				price: this.$route.query.price,
				type: 0,
				show1: false,
				show2: false,
				discount: 0,
				bought: false,
				content: '', //商品content信息
				lv: 1
			}
		},

		created() {
			if(localStorage.getItem("GoodsDetail") == null) {
				localStorage.setItem("GoodsDetail", "false")
			}

			window.scrollTo(0, 0)
			this.data()

			this.$store.state.orderText = ""

		},

		methods: {
			async data() {

				await this.getData();

			},
			getUerDetails() {
				this.$Api.UserDetails(0).then((res) => {
					console.log(res)
					this.lv = res.q.user.lv
				})

			},
			cust() {
				if(this.$store.state.isLogin) {
					this.$call.invokeImHelper({})
				} else {
					this.$call.invokeLogin({})
				}

			},
			onClickLeft(data) { //头部导航左边点击事件
				this.$router.go(-1)
			},
			onClickRight(data) { //头部导航右边点击事件

				if(this.$store.state.isLogin) {
					var obj = {
						shareType: 2,
						mpPath: '/pages/goodsDetail/goodsDetail?spuId=' + this.$route.query.spuId + "&skuId=" + this.$route.query.skuId + "&shareBy=" + this.goods.shareBy,
						shareTitle: this.goods.name,
						mpUserName: "gh_0990137c737d",
						shareContent: '',
						shareImage: this.goods.imagePath
					}
					console.log(obj)
					this.$call.invokeShare(obj)

				} else {
					this.$call.invokeLogin({})
				}

			},
			confirm() {
				if(this.checked) {
					localStorage.setItem("GoodsDetail", "true")

				} else {
					localStorage.setItem("GoodsDetail", "false")
				}

				console.log(1)

			},
			go_address(isPassMuster, type) {
				var nowType = 0;
				if(this.type == 3) {
					nowType = 3
				} else {
					nowType = type
				}

				if(nowType == 1) {
					if(isPassMuster == 0) {
						this.show1 = true
						return;
					}
				}

				if(!this.$store.state.isLogin) {

					this.$call.invokeLogin({})

				} else {
					this.$router.push({
						name: "Ordersettlement",
						query: {
							spuId: this.$route.query.spuId,
							skuId: this.$route.query.skuId,
							type: nowType,
							score: this.$store.state.score,
							id: 0
						}
					})
				}

			},
			freeGo() {

				if(!this.$store.state.isLogin) {

					this.$call.invokeLogin({})

				} else {

					if(this.goods.canSampleSack == 0) {
						this.$router.push({
							name: "Ordersettlement",
							query: {
								spuId: this.$route.query.spuId,
								skuId: this.$route.query.skuId,
								type: 2,
								id: 0
							}
						})
					} else {
						this.show2 = true

					}

				}

			},

			dialog() { //显示弹框
				this.show = true;
			},
			getData() {
				if(this.$store.state.isLogin) {
					var obj = {
						"spuId": this.$route.query.spuId,
						"skuId": this.$route.query.skuId,
						"sessionId": localStorage.getItem("sessionId")
					}
				} else {
					var obj = {
						"spuId": this.$route.query.spuId,
						"skuId": this.$route.query.skuId
					}
				}

				this.$Api.getGoodsDetails(obj).then((res) => {
					console.log(res)
					this.goods = res.q.goods
					if(this.goods.discountPrice == 0) {
						this.type = 0
					} else {
						this.type = 3
					}

					if(this.type == 0) {
						this.free = true
						console.log(localStorage.getItem("GoodsDetail"))
						if(this.goods.isBought != 1) {
							if(localStorage.getItem("GoodsDetail") == "true") {
								this.show = false
								this.checked = true
							} else {

								this.show = true
								this.checked = false
							}
						}

					} else {
						this.free = false
					}
					if(res.q.goods.isContinued == 0 && !this.$store.state.isLogin) {
						this.bought = false

					} else if(this.$store.state.isLogin && res.q.goods.isContinued == 1) {
						this.bought = true
					}

					this.skuList = res.q.skuList

					for(var i = 0; i < res.q.goods.images.length; i++) {
						this.images.push(res.q.goods.images[i].imagePath)
					}
					this.name = res.q.goods.name
					this.mailing = res.q.goods.mailing
					this.articleId = res.q.goods.articleId
					this.getArticleDetailsDate()
				})
			},

			beforeClose(action, done) { //弹框确认按钮执行事件
				if(action === 'confirm') {
					setTimeout(done, 1000);
				} else {
					done();
				}
			},
			getArticleDetailsDate() { //商品详情获取接口
				this.$Api.getArticleDetailsDate(this.articleId).then((res) => {
					if(res.q.s == 0) {
						this.content = res.q.article.content
					}
				})
			},
		}

	}
</script>

<style scoped="scoped">
	.containers {
		padding: 0.92rem 0 1.3rem;
	}
	
	.bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 0.98rem;
		background: #FFFFFF;
		display: flex;
		color: #FFFFFF;
	}
	
	.bottom div {
		height: 1rem;
		line-height: 1rem;
	}
	
	.bottom .serve {
		width: 2rem;
		border-top: 0.02rem solid #CCCCCC;
		height: 0.96rem;
	}
	
	.bottom .serve i {
		margin-left: 0.75rem;
		margin-top: 0.1rem;
		width: 0.5rem;
		height: 0.5rem;
		float: left;
		background: url(../../assets/common/3x/common_icon_service@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.bottom .serve p {
		width: 100%;
		float: left;
		height: 0.3rem;
		color: #666666;
		text-align: center;
		line-height: 0.4rem;
		font-size: 0.26rem;
	}
	
	.bottom .buy {
		width: 2.75rem;
		background: #e6bf6b;
		font-size: 0.3rem;
		text-align: center;
	}
	
	.bottom .free {
		width: 2.75rem;
		background: #333333;
		font-size: 0.3rem;
		text-align: center;
	}
	
	.bottom .notFree {
		width: 2.75rem;
		background: #cccccc;
		font-size: 0.3rem;
		text-align: center;
	}
	
	.swiper_box {
		width: 100%;
		height: 7.5rem;
	}
	
	.detail_box {
		height: 1.8rem;
		width: 100%;
		padding: 0.24rem;
	}
	
	.detail_box_p {
		font-weight: 550;
		font-size: 0.28rem;
		color: #1a1a1a;
	}
	
	.price_p {
		padding-top: 0.2rem;
		height: 0.38rem;
		line-height: 0.38rem;
	}
	
	.price_span_a {
		display: inline-block;
		width: 50%;
		color: #fe4436;
		font-size: 0.28rem;
		font-weight: 550;
	}
	
	.price_span_b {
		display: inline-block;
		width: 50%;
		color: #666666;
		font-size: 0.28rem;
		text-align: right;
	}
	
	.base {
		width: 100%;
		height: 20.19rem;
		padding-bottom: 1rem;
	}
	
	.base_img {
		width: 100%;
		height: 20.19rem;
	}
	
	.dialog_title {
		text-align: center;
		padding: 0.35rem 0;
		font-size: 0.3rem;
		font-weight: 550;
		color: 3333333;
	}
	
	.dialog_con {
		padding: 0 0.4rem 0.2rem;
		font-size: 0.3rem;
		color: 3333333;
	}
	
	.dialog_checked {
		padding: 0.1rem 0 0 0.4rem;
		font-size: 0.25rem;
		color: #666666;
	}
	
	.van-dialog {
		width: 75%;
	}
</style>