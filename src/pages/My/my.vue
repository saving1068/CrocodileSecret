<template>
	<div style="background: #F3F3F3;padding-bottom: 0.9rem;">
		<div class="top">
			<div class="top_val">
				<div class="top_val_img">
					<img :src="user.imagePath" />
				</div>
				<div class="top_val_text" @click="login">
					<!--<p>点击登录/注册</p>-->
					<p>{{user.name}}</p>
					<a>
						<span v-if="user.lv==1"><i><img src="../../assets/my/my_icon_vip_gray@2x.png"/></i><span>{{member}}</span></span>
						<span v-if="user.lv==0"><span>游客</span></span>
						<span v-if="user.lv==2"><i><img src="../../assets/my/3x/my_icon_vip_gold@3x.png"/></i><span class="yellow">{{member}}</span></span>
					</a>
				</div>
				<div class="top_val_icon">
					<div class="top_val_icon_box">
						<p class="left" @click="goMessage">
							<img src="../../assets/my/my_btn_message@3x.png" />
						</p>
						<p class="right" @click="goEach('我的资料')">
							<img src="../../assets/my/my_btn_set@3x.png" />
						</p>
						<div class="dot" v-if="total!=0&&total<99">{{total}}</div>
						<div class="dots" v-if="total>=99">{{total}} <span class="add">+</span> </div>
					</div>
				</div>
			</div>
		</div>

		<div class="privilege_bg">
			<ul class="privilege">
				<li class="privilege_item_title"  @click="goRich">
					会员特权
				</li>
				<div style="width: 75%;display: flex;flex-wrap: wrap;">
					<li class="privilege_item" v-for="(v,i) in goodses" v-if="i<6">
						<div class="privilege_item_val" v-if="v.catName!='More'" @click="goDetail(v.skuId,v.spuId)">
							<p>
								<!--<img src="../../assets/my/3x/my_icon_facialMask@3x.png" v-if="v.catName=='面膜'" />
								<img src="../../assets/my/3x/my_icon_faceCream@3x.png" v-if="v.catName=='面霜'" />
								<img src="../../assets/my/3x/my_icon_eyeCream@3x.png" v-if="v.catName=='眼霜'" />
								<img src="../../assets/my/3x/my_icon_emulsion@3x.png" v-if="v.catName=='乳液'" />
								<img src="../../assets/my/3x/my_icon_wash@3x.png" v-if="v.catName=='洁面乳'" />
								<img src="../../assets/my/3x/my_icon_essential@3x.png" v-if="v.catName=='精华'" />
								<img src="../../assets/my/3x/my_icon_toner@3x.png" v-if="v.catName=='爽肤水'" />-->
								<img :src="v.catImgPath" />
	
							</p>
							<span>{{v.catName}}</span>
						</div>
						<div style="height: 100%;line-height: 1.22rem;" v-if="v.catName=='More'">
	
							<span>{{v.catName}}</span>
						</div>
	
					</li>
				</div>
			</ul>
		</div>
		<div class="money">
			<div class="money_val">
				<div class="money_val_title">
					<img src="../../assets/my/3x/my_icon_money@3x.png" />
				</div>
				<div class="money_val_reward">
					<p>可提现奖金</p> 
					<a>￥{{cash}}</a>
				</div>
				<div class="money_val_integral">
					<p>积分</p>
					<a>{{points}}</a>
				</div>
				<div class="get_integral" @click="goDate()">
					签到领积分
				</div>
			</div>
		</div>
		<!--	<van-dialog v-model="alertShow" show-cancel-button message='确定清楚缓存' close-on-click-overlay ></van-dialog>-->
		<ul class="list">
			<li class="list_item">
				<div class="list_item_val" @click="ifSpokesperson()">
					<p>我的代言人</p>
					<span>{{memberCount}}人</span>
				</div>
			</li>
			<li class="list_item" @click="IfShow()">
				<div class="list_item_val">
					<p>我的奖励</p>
					<a :class='{down_img:show}'>
						<img v-if="!show" src="../../assets/common/3x/common_btn_arrow_grey@3x.png" />
						<img v-if="show" src="../../assets/common_btn_down@3x.png" />
					</a>
				</div>
			</li>
			<li class="small" v-for="(v,i) in cashList" v-if="show">
				<div class="list_item_small">
					<p>{{v.name}}</p>
					<a>¥{{v.money}}</a>
				</div>
			</li>
			<li class="list_item" v-for="(v,i) in list" @click="goEach(list[i])">
				<div class="list_item_val">
					<p>{{v}}</p>
					<a><img src="../../assets/common/3x/common_btn_arrow_grey@3x.png" /></a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {

		name: "My",
		components: {

		},
		data() {
			return {
				user: {}, //个人信息
				member: '', //会员等级
				total:0,//消息总条数
				alertShow: false,
				show: false,
				points: 0,
				cash: 0,
				list: [
					"申请提现", "小活动", "我的优惠券", "订单记录", "排行榜", "收货地址", "清除缓存"
				],
				cashList: [{
						name: "累计奖励",
						money: 0
					},
					{
						name: "待审核奖励",
						money: 0
					},
					{
						name: "已提现奖励",
						money: 0
					},
					{
						name: "可提现奖励",
						money: 0,
					
					}
				],
				goodses: [],
				memberCount: 0
			}
		},
		computed: {},
		created() {
			//				this.$call.invokeSwithStatusBar({switchIndex:1})
			this.getData(1)

//			alert(localStorage.getItem("sessionId"))

			
			

		},
		mounted() {

		},
		activated(){
				
			if(this.$store.state.isLogin) {
			
				this.getUser() //余额
				this.UserDetails(); //查询个人信息
				this.getMember() //获取代言人
                this.QueryAdvices();//获取消息总条数
			} else {
				this.user.imagePath=require("../../assets/my/3x/my_img_avatar_big@3x.png")
				this.user.name="点击登录/注册"
				this.user.lv=0
				this.remove()
			}
		},
		
		methods: {
			goRich(){
				this.$router.push({
						name: "Rich"
					})
				
			},
			remove() {
				return new Promise((resolve, reject) => {
					var timer = setInterval(removeSession, 50);

					function removeSession() {
						localStorage.removeItem("sessionId")
						if(!localStorage.getItem('sessionId')) {

							clearInterval(timer);
							resolve()
						}
					}
				})

			},
			getMember() {

				this.$Api.getMarketingMemberList(0, 0).then((res) => {

					console.log(res)
					this.memberCount = res.q.total
				})

			},
            login(){//点击登录
            	
            	if(this.$store.state.isLogin){
            		this.$router.push({
						name: "Information"
					})
            		
            	}else{
            		this.$call.invokeLogin({})
            	}
            	
            },
			goDetail(skuId, spuId) {
				this.$router.push({
					name: "GoodsDetail",
					query: {
						skuId: skuId,
						spuId: spuId
					
					}
				})
			},
			goMessage() {
				if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
					this.$router.push({
						name: "Mymessage"
					})
				} else {
					this.$call.invokeLogin({})
				}
			},
			getUser() {
				this.$Api.getMyAccountList(0).then((res) => {
					console.log(res)
					if(res.q.s == 0){
						for(var i = 0; i < res.q.Accounts.length; i++) {
							if(res.q.Accounts[i].typeName == "积分") {
								this.points = res.q.Accounts[i].balanceCash
							} else if(res.q.Accounts[i].typeName == "系统内钱包") {
								this.cash = res.q.Accounts[i].balanceCash
								this.cashList[0].money = res.q.Accounts[i].balanceTotal
								this.cashList[1].money = res.q.Accounts[i].balanceFronzen
								this.cashList[2].money = res.q.Accounts[i].canWithdraw
								this.cashList[3].money = res.q.Accounts[i].balanceCash
							}
						}
					}else if(res.q.s != 0){
						this.user.imagePath=require("../../assets/my/3x/my_img_avatar_big@3x.png");
						this.user.name = "用户未登录"
					}
					
				})
			},
			getData(num) { //首页商品列表
				this.goodses=[]
				this.$Api.getGoodsList(num).then((res) => {
					if(res.q.d == '操作成功') {
						
						for(var i=0;i<res.q.goodses.length;i++){
							this.goodses.push(res.q.goodses[i])
						}
						
//						if(this.goodses.length < 7) {
//							var obj = {
//								catName: "More"
//							}
//							this.goodses.push(obj)
//						}
					}
				})
			},
			goEach(text) {
				if(text == "我的资料") {
					if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
						
						this.$router.push({
							name: "Information"
						})
					} else {
						this.$call.invokeLogin({})
					}

				} else if(text == "申请提现") {
					
					if(this.$store.state.isLogin){
						var obj = {
						balance: parseFloat(this.cashList[3].money)
					}
					this.$call.invokeWithdraw(obj)
						
						
					}else{
						this.$call.invokeLogin({})
					}
					
					
					
					
					
					
				} else if(text == "我的优惠券") {
					if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
						this.$router.push({
							name: "Coupon"
						})
					} else {
						this.$call.invokeLogin({})
					}

				} else if(text == "订单记录") {
					if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
						this.$router.push({
							name: "Orders"
						})
					} else {
						this.$call.invokeLogin({})
					}

				} else if(text == "排行榜") {

					this.$router.push({
						name: "Ranking"
					})
				} else if(text == "收货地址") {
					if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
						this.$router.push({
							name: "Selectaddress",
							query: {
								from: "my"
							}
						})
					} else {
						this.$call.invokeLogin({})
					}

				} else if(text == "清除缓存") {
					//		  			this.alertShow=true
					this.$call.invokeClearCache({})
				}else if(text == "小活动"){
					if(this.$store.state.isLogin) {
						this.$router.push({
							name: "Game",
							query: {
								from: "my"
							}
						})
					} else {
//						this.$dialog.alert({
//					      message: '未登陆'
//					    });
//						this.$call.invokeShowLoginDialog({})
						
						this.$call.invokeLogin({})
					}
				}
				
			},
			IfShow() {
				this.show = !this.show;
			},
			ifSpokesperson() {

				if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
					this.$router.push({
						name: "Spokesperson"
					})
				} else {
					this.$call.invokeLogin({})
				}

			},
			goDate() {
				if(this.$store.state.isLogin) { //判断是否有sessionId，有跳转，没有跳登录页
					this.$router.push({
						name: "Date"
					})
				} else {
					this.$call.invokeLogin({})
				}

			},
			UserDetails() { //查询个人信息
				
				this.$Api.UserDetails(0).then((res) => {
					
					if(res.q.s == 0) {
						this.user = res.q.user

						if(this.user.lv == 1) { //设置普通用户或者VIP用户
							this.member = '普通用户'
						} else if(this.user.lv == 2) {
							this.member = 'VIP用户'
						}
                        if(this.user.imagePath==""||this.user.imagePath==undefined||this.user.imagePath==null){
                        	this.user.imagePath=require("../../assets/my/3x/my_img_avatar_big@3x.png");
                        }
					}
				})
			},
			QueryAdvices(){//获取消息总数
				this.$Api.QueryAdvices().then((res)=>{
					if(res.q.s == 0){
						if(res.q.total<99){
							this.total = res.q.total
						}else{
							this.total = 99
						}
					}
				})
			}
		},
		beforeRouteLeave(to, from, next) {

			let position = window.scrollY //记录离开页面的位置 
			if(position == null) position = 0
			this.$store.dispatch("increment", {
				scrollY: position,
				router: from.name
			}) //离开路由时把位置存起来 

			next()
		},
		deactivated() {

			this.$call.invokeSwithStatusBar({
				switchIndex: 0
			})

		},

		beforeRouteEnter(to, from, next) {

			next(vm => {
				vm.$call.invokeSwithStatusBar({
					switchIndex: 1
				})
				if(vm.$store.getters.recruitScrollY(to.name) == undefined) {
					vm.$store.dispatch("increment", {
						scrollY: 0,
						router: to.name
					})

				}
				let recruitScrollY = vm.$store.getters.recruitScrollY(to.name)
//				window.scrollTo(0, recruitScrollY)
               
			})
		}
	};
</script>

<style scoped="scoped">
	img {
		width: 100%;
	}
	
	.top {
		width: 100%;
		height: 2.5rem;
		background: #262626;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.top_val {
		width: 7.05rem;
		overflow: hidden;
	}
	
	.small {
		padding-left: 0.58rem;
		width: 100%;
		line-height: 0.9rem;
		overflow: hidden;
		font-size: 0.3rem;
		color: #333333;
		background: #FFFFFF;
		font-weight: 550;
		border-bottom: 0.01rem solid #E5E5E5;
	}
	
	.list_item_small {
		width: 6.68rem;
		height: 0.9rem;
		font-size: 0.28rem;
		font-weight: 500 !important;
	}
	
	.list_item_small p {
		float: left;
		font-size: 0.28rem !important;
	}
	
	.list_item_small a {
		width: auto !important;
		color: #E6BF6B;
		float: right;
	}
	
	.top_val_img {
		width: 1.22rem;
		height: 1.22rem;
		border-radius: 50%;
		float: left;
	}
	
	.top_val_img img{
		width: 100%;
		height: auto;
		border-radius:50% ;
	}
	
	.top_val_text {
		margin-left: 0.3rem;
		height: 100%;
		float: left;
	}
	
	.top_val_text p {
		height: 0.34rem;
		margin-top: 0.1rem;
		font-size: 0.3rem;
		color: #FFFFFF;
	}
	
	.top_val_text a {
		width: 1.52rem;
		height: 0.42rem;
		border-radius: 0.2rem;
		margin-top: 0.18rem;
		display: block;
		color: #FFFFFF;
		background: #313131;
		font-size: 0.24rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.top_val_text i {
		width: 0.28rem;
		display: inline-block;
	}
	
	.yellow {
		color: #e6bf6b;
	}
	
	.top_val_icon {
		width: 1.1rem;
		height: 1.2rem;
		float: right;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.top_val_icon_box {
		width: 100%;
		height: 0.44rem;
		position: relative;
	}
	.dot {
		position: absolute;
		width: 0.33rem;
		height: 0.33rem;
		border-radius: 50%;
		background-color: #ff0000;
		left: 0.21rem;
		top: -0.15rem;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.33rem;
		color: #fff;
	}
	
	.dots {
		position: absolute;
		left: 0.21rem;
		top: -0.15rem;
		display: inline-block;
		padding: 0rem 0.04rem 0rem 0rem;
		min-width: 0.33rem;
		height: 0.33rem;
		font-size: 0.15rem;
		text-align: center;
		line-height: 0.33rem;
		border-radius: 50%;
		color: #FFFFFF;
		background: #fe4436;
	}
	
	.add{position: absolute;color: #fff;font-size: 0.12rem;top: -0.05rem;right: 0.03rem;}
	
	.top_val_icon_box p {
		width: 0.38rem;
		height: 0.38rem;
	}
	
	.left {
		float: left;
	}
	
	
	.right {
		float: right;
	}
	
	.privilege_bg {
		height: auto;
		background: #FFFFFF;
		overflow: hidden;
	}
	
	.privilege {
		padding: 0.2rem;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	
	.privilege_item_title {
		width: 1.72rem;
		height: 2.55rem;
		font-size: 0.3rem;
		text-align: center;
		line-height: 2.55rem;
		background: #F5F5F5;
		margin-bottom: 0.1rem;
	}
	
	.privilege_item {
		width: 1.72rem;
		height: 1.22rem;
		background: #F5F5F5;
		font-size: 0.3rem;
		text-align: center;
		margin-bottom: 0.1rem;
		margin-left: 0.05rem;
	}
	
	
	
	.privilege_item_val {
		height: 0.9rem;
		font-size: 0.24rem;
	}
	
	.privilege_item_val p {
		width: 0.5rem;
		height: 0.58rem;
		margin: 0.15rem auto 0;
	}
	
	.money {
		width: 100%;
		height: 1.66rem;
		background: #FFFFFF;
		position: relative;
		margin: 0.2rem auto;
	}
	
	.money_val {
		width: 7.05rem;
		height: 1.04rem;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		overflow: hidden;
	}
	
	.money_val_title {
		width: 1.04rem;
		height: 1.04rem;
	}
	
	.money_val_reward {
		margin-left: 0.42rem;
		font-size: 0.3rem;
		text-align: center;
		color: #333333;
	}
	.money_val_reward p{
		font-size:0.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
	}
	.money_val_reward a,
	.money_val_integral a {
		margin-top: 0.2rem;
		display: block;
		color: #DE596A;
	}
	
	.money_val_integral {
		font-size: 0.3rem;
		text-align: center;
		color: #333333;
		margin-left: 0.6rem;
	}
	
	.get_integral {
		margin-left: 0.72rem;
		float: left;
		width: 1.54rem;
		height: 0.72rem;
		background: #1A1A1A;
		margin-top: 0.15rem;
		border-radius: 0.1rem;
		text-align: center;
		line-height: 0.72rem;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	
	.list_item {
		width: 100%;
		line-height: 0.9rem;
		overflow: hidden;
		font-size: 0.29rem;
		color: #333333;
		background: #FFFFFF;
		border-bottom: 0.01rem solid #E5E5E5;
	}
	
	.list_item p {
		float: left;
	}
	
	.list_item span {
		float: right;
	}
	
	.list_item a {
		width: 0.13rem;
		height: 0.23rem;
		float: right;
		display: block;
	}
	
	.down_img {
		width: 0.25rem !important;
	}
	
	.list_item_val {
		width: 7.05rem;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.list_item_val_active {
		border: none !important;
		width: 100%;
		line-height: 0.9rem;
		overflow: hidden;
		font-size: 0.3rem;
		color: #333333;
		background: #FFFFFF;
		font-weight: 550;
	}
</style>