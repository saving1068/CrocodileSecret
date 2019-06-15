import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
   
	base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: {
        name: 'Index'
      },
      component: resolve => require(['@/pages/Main'], resolve),
      children: [

				{
					path: '/Home',
					name: 'Index',
					component: resolve => require(['@/pages/Home/Home'], resolve),
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/my',
					name: 'My',
					component: resolve => require(['@/pages/My/my'], resolve),
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/allgoods',
					name: 'Allgoods',
					component: resolve => require(['@/pages/Allgoods/allgoods'], resolve),
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/qecode',
					name: 'Qecode',
					component: resolve => require(['@/pages/Qecode/qecode'], resolve),
					meta: {
						keepAlive: true
					}
				},
			]
		},
		{
			path: '/customerservice',
			name: 'Customerservice',
			component: resolve => require(['@/pages/Customerservice/customerservice'], resolve),
		},
		{
			path: '/GoodsDetail',
			name: 'GoodsDetail',

			component: resolve => require(['@/pages/GoodsDetail/GoodsDetail'], resolve),
		},
		{
			path: "/coupon",
			name: "Coupon",
			meta: {
				title: "优惠卷"
			},
			component: resolve => require(["@/pages/Coupon/Coupon"], resolve),
		},
		{
			path: "/sister",
			name: "Sister",
			meta: {
				title: "姐言妹语"
			},
			component: resolve => require(["@/pages/Sister/sister"], resolve),
		},
		{
			path: "/rich",
			name: "Rich",
			meta: {
				title: "创富"
			},
			component: resolve => require(["@/pages/Rich/rich"], resolve),
		},
		{
			path: '/sharpVip',
			name: 'Sharpvip',
			meta: {
				title: "超级VIP"
			},
			component: resolve => require(['@/pages/sharpVip/vip'], resolve)
		},
		{
			path: "/show",
			name: "Show",
			meta: {
				title: "鳄鱼秀场"
			},
			component: resolve => require(["@/pages/Show/show"], resolve),
		},
		{
			path: "/question",
			name: "Question",
			meta: {
				title: "鳄鱼问答"
			},
			component: resolve => require(["@/pages/Question/question"], resolve),
		},
		{
			path: "/ranking",
			name: "Ranking",
			meta: {
				title: "排行榜"
			},
			component: resolve => require(["@/pages/Ranking/ranking"], resolve),
		},
		{
			path: "/spokesperson",
			name: "Spokesperson",
			meta: {
				title: "代言人"
			},
			component: resolve => require(["@/pages/Spokesperson/spokesperson"], resolve),
		},
		{
			path: '/details',
			name: 'Details',
			meta: {
				title: "咨讯详情"
			},
			component: resolve => require(['@/pages/Sister/details'], resolve),
		},
		{
			path: '/information',
			name: 'Information',
			meta: {
				title: "我的资料"
			},
			component: resolve => require(['@/pages/My/information/information'], resolve)
		},
		{
			path: "/cash",
			name: "Cash",
			meta: {
				title: "提现",
			},
			component: resolve => require(['@/pages/My/cash/cash'], resolve)
		},
		{
			path: "/Print",
			name: "Print",
			meta: {
				title: "提现细则"
			},
			component: resolve => require(['@/pages/Print/Print'], resolve)
		},
		{
			path: "/MDetails",
			name: "MDetails",
			meta: {
				title: "提现明细"
			},
			component: resolve => require(['@/pages/My/cash/Mdetails/details'], resolve)
		},
		{
			path: "/aletter",
			name: "Aletter",
			meta: {
				title: "给用户的一封信"
			},
			component: resolve => require(['@/pages/Aletter/aletter'], resolve)
		},
		{
			path: "/mymessage",
			name: "Mymessage",
			meta: {
				title: "我的消息"
			},
			component: resolve => require(['@/pages/Mymessage/mymessage'], resolve)
		},
		{
			path: "/safe",
			name: "Safe",
			meta: {
				title: "鳄鱼"
			},
			component: resolve => require(['@/pages/Safe/safe'], resolve)
		},
		{
			path: "/informationpage",
			name: "Informationpage",
			meta: {
				title: "各类通知页面"
			},
			component: resolve => require(['@/pages/Mymessage/Informationpage/informationpage'], resolve)
		},
		{
    	path:'/Bank',
    	name:'Bank',
    	meta:{
    		title:'提现到银行卡'
    	},
    	component: resolve => require(['@/pages/My/cash/bank/bank'], resolve)
    	},
    	{
	    	path:'/addsite',
	    	name:'Addsite',
	    	meta:{
	    		title:'添加地址'
	    	},
	    	component: resolve => require(['@/pages/Addsite/addsite'], resolve)
    	},
    	{
    		path:'/Bank/choose',
    		name:'ChooseB',
    		meta:{
    			title:"选择开户银行",
    		},
    		component: resolve => require(['@/pages/My/cash/bank/chooseB/chooseB'], resolve)
    	},
    	{
	    	path:'/Zhifubao',
	    	name:'Zhifubao',
	    	meta:{
	    		title:'提现到支付宝'
	    	},
	    	component: resolve => require(['@/pages/My/cash/zhifubao/zhifubao'], resolve)
	    	},
    	{
    		path:'/Orders',
	    	name:'Orders',
	    	meta:{
	    		title:'订单记录'
	    	},
	    	component: resolve => require(['@/pages/My/orders/orders'], resolve)
    	},
    	{
    		path:'/ordersettlement',
	    	name:'Ordersettlement',
	    	meta:{
	    		title:'订单结算'
	    	},
	    	component: resolve => require(['@/pages/Ordersettlement/ordersettlement'], resolve)
	    },
    	{
    		path:'/Odetails',
	    	name:'Odetails',
	    	meta:{
	    		title:'订单详情'
	    	},
	    	component: resolve => require(['@/pages/My/orders/Odetails/odetails'], resolve)
    	},
    	{
    		path:'/getDate',
    		name:'Date',
    		meta:{
    			title:"签到中心"
    		},
    		component: resolve => require(['@/pages/Date/date'], resolve)
    	},
    	{
    		path:'/selectaddress',
    		name:'Selectaddress',
    		meta:{
    			title:"选择地址"
    		},
    		component: resolve => require(['@/pages/Selectaddress/selectaddress'], resolve)
    	},
    	{
    		path:'/Cashier',
    		name:'Cashier',
    		meta:{
    			title:"支付方式"
    		},
    		component: resolve => require(['@/pages/Cashier/Cashier'], resolve)
    	},
    	{
    		path:'/paymentsuccess',
    		name:'Paymentsuccess',
    		meta:{
    			title:"支付成功"
    		},
    		component: resolve => require(['@/pages/Paymentsuccess/paymentsuccess'], resolve)
    	},
    	{
    		path:'/Privacy',
    		name:'Privacy',
    		meta:{
    			title:'用户私隐'
    		},
    		component: resolve => require(['@/pages/Privacy/Privacy'], resolve)
    	},
    	{
    		path:'/Agreement',
    		name:'Agreement',
    		meta:{
    			title:'用户注册协议'
    		},
    		component: resolve => require(['@/pages/Agreement/Agreement'], resolve)
    	},
    	{
    		path:'/Logistics',
    		name:'Logistics',
    		meta:{
    			title:'物流详情'
    		},
    		component: resolve => require(['@/pages/Logistics/Logistics'], resolve)
    	},
    	{
    		path:'/SelectCoupon',
    		name:'SelectCoupon',
    		meta:{
    			title:'选择优惠券'
    		},
    		component: resolve => require(['@/pages/SelectCoupon/SelectCoupon'], resolve)
    	},
    	{
    		path:'/Game',
    		name:'Game',
    		meta:{
    			title:'小活动'
    		},
    		component: resolve => require(['@/pages/Game/Game'], resolve)
    	},
    	{
    		path:'/PrizeDetile',
    		name:'PrizeDetile',
    		meta:{
    			title:'中奖详情'
    		},
    		component: resolve => require(['@/pages/prizeDetile/prizeDetile'], resolve)
    	},
    	{
    		path:'/PrizeWin',
    		name:'PrizeWin',
    		meta:{
    			title:'中奖详情'
    		},
    		component: resolve => require(['@/pages/prizeWin/prizeWin'], resolve)
    	},
		{
			path: '*',
			name: '404',
			meta: {
				title: '404 功能建设中',
			},
			component: resolve => require(['@/pages/building'], resolve),
		},
	]
})
