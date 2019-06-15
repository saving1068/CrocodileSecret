<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>
		
		<div class="tabs_top">
			<van-tabs type="card" @click="vanTabs">
			  <van-tab v-for="items in spokesperson" :key="items.value" :title="items.name" >
			  	<div class="tab">
					<li :class="[tabIndex==0?'active':'']" @click="tab(0)">全部</li>
					<li :class="[tabIndex==1?'active':'']" @click="tab(1)">VIP代言人</li>
					<li :class="[tabIndex==2?'active':'']" @click="tab(2)">普通代言人</li>
					<div class="bottom"  :style="bottomStyle"></div>
				</div>
			  </van-tab>
			</van-tabs>
		</div>
		
		<div v-if="tabIndex==0" class="row_con">
			
			<van-row v-for="(item,index) in memberList" :key="item.name">
			  <van-col span="3" class="vanCol_a">{{index+1}}</van-col>
			  <van-col span="3" class="vanCol_b">
			  	<img v-if="item.img" class="vanColimg" :src="item.img"/>
			  	<img v-else src="../../assets/my/3x/my_img_avatar_big@3x.png"/>
			  </van-col>
			  <van-col span="18" class="vanCol_c">
			  	<p class="vanColp_a"><span class="vanColp_span_a">{{item.name}}</span><span class="vanColp_span_a">({{item.weight==1?'一级':'二级'}})</span><span class="vanColp_span_b" v-if='item.grade==1?false:true'>VIP</span></p>
			  	<span class="vanColspan">昨天可提现奖励：{{item.money}}元</span>
			  </van-col>
			</van-row>
			<div class="groupsize">团队人数：{{memberList.length}}人</div>
			
		</div>
		
		
		<div v-if="tabIndex==1" class="row_con">
			
			<van-row v-for="(item,index) in memberList" :key="item.name">
			  <van-col span="3" class="vanCol_a">{{index+1}}</van-col>
			  <van-col span="3" class="vanCol_b">
			  	<img v-if="item.img" class="vanColimg" :src="item.img"/>
			  	<img v-else src="../../assets/my/3x/my_img_avatar_big@3x.png"/>
			  </van-col>
			  <van-col span="18" class="vanCol_c">
			  	<p class="vanColp_a"><span class="vanColp_span_a">{{item.name}}</span><span class="vanColp_span_a">({{item.weight==1?'一级':'二级'}})</span><span class="vanColp_span_b" v-if='item.grade==1?false:true'>VIP</span></p>
			  	<span class="vanColspan">昨天可提现奖励：{{item.money}}元</span>
			  </van-col>
			</van-row>
			<div class="groupsize">团队人数：{{memberList.length}}人</div>
			
		</div>
		
		
		<div v-if="tabIndex==2" class="row_con">
			
			<van-row v-for="(item,index) in memberList" :key="item.name">
			  <van-col span="3" class="vanCol_a">{{index+1}}</van-col>
			  <van-col span="3" class="vanCol_b">
			  	<img v-if="item.img" class="vanColimg" :src="item.imgUrl"/>
			  	<img v-else src="../../assets/my/3x/my_img_avatar_big@3x.png"/>
			  </van-col>
			  <van-col span="18" class="vanCol_c">
			  	<p class="vanColp_a"><span class="vanColp_span_a">{{item.name}}</span><span class="vanColp_span_a">({{item.weight==1?'一级':'二级'}})</span><span class="vanColp_span_b" v-if='item.grade==1?false:true'>VIP</span></p>
			  	<span class="vanColspan">昨天可提现奖励：{{item.money}}元</span>
			  </van-col>
			</van-row>
			<div class="groupsize">团队人数：{{memberList.length}}人</div>
			
		</div>
		
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		
		name: "spokesperson",
		components: {
			navbarbase
		},
		data() {
		    return {
		    	title:"我的代言人",
		    	tabIndex:0,
		    	a:0,//0.我的代言人 1.一级 2.二级
		    	type:0,//0 代言人 1.vip 代言人 2.普通代言人
		    	memberList:[],//代言人列表
		    	spokesperson:[
		    		{name:"全部代言人",value:0},
		    		{name:"一级代言人",value:1},
	    			{name:"二级代言人",value:2},
		    	],
		    	spokespersons:[
		    		'全部',
		    		'VIP代言人',
		    		'普通代言人'
		    	],
//		    	spokespersoncon:[
//		    		{
//		    			img:require('../../assets/home/newstar001.jpg'),
//		    			name:'唐马儒',
//		    			rank:'一级',
//		    			whether:1,
//		    			bounty:8798
//		    		},
//		    		{
//		    			img:require('../../assets/home/newstar002.jpg'),
//		    			name:'李马儒',
//		    			rank:'三级',
//		    			whether:2,
//		    			bounty:10718
//		    		},
//		    		{
//		    			img:require('../../assets/home/newstar003.jpg'),
//		    			name:'王马儒',
//		    			rank:'五级',
//		    			whether:1,
//		    			bounty:659
//		    		},
//		    		{
//		    			img:require('../../assets/home/newstar003.jpg'),
//		    			name:'何马儒',
//		    			rank:'五级',
//		    			whether:2,
//		    			bounty:659
//		    		}
//		    	]
			};
		},
		computed:{
			bottomStyle(){
				if(this.tabIndex==0){
					return {
						"left":"10%"
					}
				}else if(this.tabIndex==1){
					return {
						"left":"43%"
					}
				}else if(this.tabIndex==2){
					return {
						"left":"76%"
					}
				}
			},
		},
		created() {
		    console.log("my created");
		    this.MarketingMemberList();
		},
		mounted() {},
		methods: {
			vanTabs(val){//一级Tab切换
				this.tabIndex = 0;
				this.a = val;
				this.type = 0;
				this.MarketingMemberList();
			},
		  	tab(num){//二级Tab切换
				this.tabIndex=num
				if(this.tabIndex==0){
					this.type = 0;
					this.MarketingMemberList();
				}else if(this.tabIndex==1){
					this.type = 2;
					this.MarketingMemberList();
				}else if(this.tabIndex==2){
					this.type = 1;
					this.MarketingMemberList();
				}
			},
			onClickLeft(data){//头部导航返回
				this.$router.go(-1)
			},
			MarketingMemberList(){
				this.$Api.getMarketingMemberList(this.a,this.type).then((res)=>{
					if(res.q.s == 0){
						this.memberList = res.q.memberList;
					}
				})
			}
		}
	};
	
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0;overflow: hidden;padding-bottom: 0.96rem;}
	
	
	.tabs_top{margin-top: 0.3rem;}
	
	.tab{width: 100%;height: 0.88rem;list-style: none;position: relative;border-bottom: 0.01rem solid #d6d6d6;margin-top: 0.2rem;}
	.tab>li{width:33.33%;font-size: 0.3rem;text-align: center;line-height: 0.88rem;float: left;color: #999999;}
	.tab>.active{color: #e6bf6b;}
	.tab>.bottom{width: 1rem;height: 0.04rem;background: #e6bf6b;position: absolute;bottom: 0.01rem;left: 12%;transition: 0.5s;}
	
	.row_con{padding: 0 0.3rem;}
	.van-row{height: 1.2rem;border-bottom: 0.01rem solid #eeeeee;}
	.van-col{height: 1.2rem;padding-left: 0.2rem;}
	.vanCol_a,.vanCol_b{text-align: center;line-height: 1.2rem;}
	.vanColimg{width: 0.7rem;height: 0.7rem;border-radius: 50%;}
	.vanColp_a{padding-top: 0.3rem;}
	.vanColp_span_a{color: #666666;font-size: 0.25rem;padding-right: 0.2rem;}
	.vanColp_span_b{display: inline-block; color: #f39800;border: 0.01rem solid #f39800;font-size: 0.2rem;padding: 0.02rem 0.13rem;}
	.vanColspan{font-size: 0.25rem;color: #999999;}
	
	.groupsize{text-align: center;color: #333333;padding-top: 0.3rem;}
	
</style>
