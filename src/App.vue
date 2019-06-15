<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			//    this.init();
			//this.$call.getSession()
		
			if(this.$store.getters.recruitScrollY("Home") == undefined) {
				this.$store.dispatch("increment", {
					scrollY: 0,
					router: "Index"
				})
			}
//			this.$call.getSession("EkvQak7e50jj1l1mRlZ2q3Xa728A45X8")

		},

		methods: {
			//获取userDetails
			getUserDetails() {
				this.$Api.UserDetails(0).then((res) => {
					console.log(res)
//				if(res.q.s!=0){
//							
//							this.$store.dispatch('changeLogin',false)
//						}else{
//								this.$store.dispatch('changeLogin',true)
//						}
				})
			},
			getAccount() {
				this.$Api.getMyAccountList(0).then((res) => {
					console.log(res)
					for(var i = 0; i < res.q.Accounts.length; i++) {
						if(res.q.Accounts[i].typeName == "积分") { //积分余额
							this.$store.state.pointsTotal = res.q.Accounts[i].balanceCash
						} else if(res.q.Accounts[i].typeName == "系统内钱包") { //金额余额
							this.$store.state.cashTotal = res.q.Accounts[i].balanceCash
						}
					}
				})
			}
		},
		
	}

</script>
<style>
	html,body{height: 100%;}
	
	#app {height: 100%;}
	.van-nav-bar__title{font-size: 0.34rem;letter-spacing: 0.02rem;}
	.swiper-pagination-bullet{background-color: #fff !important;}
	.swiper-pagination-bullet-active{background-color: #e6bf6b !important;}
	.van-nav-bar__text{color: #000000 !important;}
	.van-tabbar--fixed{z-index: 999 !important;}
	.van-checkbox--checked{background-color: #e6bf6b !important;border-color: #e6bf6b !important;}
	.van-dialog__confirm, .van-dialog__confirm:active{color: #e6bf6b !important;}
	.van-button--danger{background-color: #e6bf6b !important;border: 0.01rem solid #e6bf6b !important;}
	.van-submit-bar__bar{border-top: 0.01rem solid #E5E5E5 !important;}
/*	.van-nav-bar__left{left: 5px;}*/
	.van-tabs__nav--card{border-color: #e6bf6b !important;}
	.van-tabs__nav--card .van-tab.van-tab--active{background-color: #e6bf6b !important;color:#FFFFFF !important;}
	.van-tabs__nav--card .van-tab{border-right: 0 !important;color: #e6bf6b !important;}
	
	.van-tabs--card .van-tabs__wrap{height: 0.88rem !important;}
	.van-tab--active{color: #e6bf6b !important;}
	.van-tabs__line{background-color: #e6bf6b !important;}
	.van-radio .van-icon-checked{color: #e6bf6b !important;}
	.van-radio__label{font-size: 0.3rem !important;color: #333333 !important;}
	.van-dialog__message{text-align: center !important; }

	.danger_top>.van-cell__right-icon{line-height: 1.21rem !important;}
	
	.van-checkbox {padding-bottom: 0.3rem !important;}
.van-switch--on{
	background-color:#e6bf6b !important;}
	.van-button--primary {
		background-color:#e6bf6b !important;
		border:none !important;
	}
	.van-address-edit{
		width: 100%;
	
		
	}
	.van-nav-bar__title{
		font-size: 18px !important;
	}
		.van-tabbar-item__icon{
			font-size: 22px !important;
		}
	.van-tabbar-item__icon img{
height: 22px !important;
	}
	.van-tabbar--fixed{
		z-index: 999 !important;
		
	}
</style>
