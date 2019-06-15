<template>
    <div >
    	<!--头部-->
    	<div style="z-index: 111;position: fixed;top: 0;">
		<navbarbase :title="title"   :right="'message'" :left="'letter'" :num="total" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		
		<div class="container">
			
			<!--头部轮播-->
			<div class="tophead">
				<!--<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(image,index) in images" :key="index" >
				    <img :src="image.imagePath" style="width:100%;height: 4.4rem;" @click="Carousel(image.actionContent,image.skuId,image.actionType)"/>
				  </van-swipe-item>
				</van-swipe>-->
				
				<div class="swiper-container swiper_a" id="swiper_a">
				    <div class="swiper-wrapper">
				        <div class="swiper-slide" v-for="(image,index) in images" >
				        	<img :src="image.imagePath" @click="Carousel(image.actionContent,image.skuId,image.actionType)"/>
				        </div>
				    </div>
				    
				    <div class="swiper-pagination"></div>
				</div>
				
				<!--公告栏1-->
				<div class="notice">
					<div class="horn">
						<img src="../../assets/home/@3x/home_icon_broadcast@3x.png"/>
					</div>
					<ul class="con1" ref="con1" :class="{anim:animate==true}">
					    <li v-for='item in notices'>{{item.name}}</li>
					</ul>

				</div>
			</div>
		
			<!--广告位1-->
			<div class="advertis_a">
				<div class="advertis_a_a" @click="goEach('Rich','','',mid_actionContenta)">
					<img :src="mid_imga"/>
				</div>
				<div class="advertis_a_b" @click="goEach('Rich','','',mid_actionContenta)">
					<img src="../../assets/home/home_btn_go@2x.png"/>
				</div>
				<div class="advertis_con">
					<!--<p class="advertis_con_top">分享美丽  日进万金</p>
					<p class="advertis_con_bottom">成为代言人  开启0元创业之旅</p>-->
				</div>
			</div>
		
			<!--功能区-->
			<div class="function_a">
				<ul class="function_a_ul">
					<li class="function_a_li" @click="goEach(adspage[index])" v-for="(adss,index) in ads" :class="[index==1||index==3||index==5?'li_b':'']">
						<div class="function_a_li_img">
							<img :src="adss.imagePath"/>
						</div>
						<div class="function_a_li_con">
							<h3><b>{{adss.actionName}}</b></h3>
							<p>{{adss.actionContent}}{{adss.actionContent}}{{adss.actionContent}}{{adss.actionContent}}{{adss.actionContent}}</p>
						</div>
					</li>
				</ul>
			</div>
		
			<!--公告栏2-->
			<div class="bulletin_board">
				<div class="notices">
					<div class="horns">
						<p><b>美丽</b></p>
						<p><b>快报</b></p>
					</div>
					<ul class="con1s" ref="con1" :class="{anims:animates==true}">
					    <li v-for='item in noticess'>{{item.name}}</li>
					</ul>
				</div>
			</div>
		
			<!--广告位2-->
			<div class="advertis_b" @click="goEach('Rich','','',mid_actionContentb)">
				<img :src="mid_imgb"/>
				<div class="advertis_b_con">
					<!--<p class="advertis_b_con_p_a">安全有保证</p>
					<p class="advertis_b_con_p_b">放下任性用</p>
					<p class="advertis_b_con_p_c">0添加 0刺激 0过敏</p>-->
				</div>
			</div>
		

			<!--产品区1-->
			<div class="product">
				<ul class="product_ul">
					<div>
						<li class="product_li_a"  v-for="(item,index) in goodses" v-if="index==0||index==1" @click="goEach('GoodsDetail',item.skuId,item.spuId)"> 
							<div class="product_top">
								<div>
									<span class="product_name">{{item.catName}}</span>
								</div>
								<span class="product_price">
									<img src="../../assets/home/@3x/home_bg_star_product@3x.png"/>
								</span>
							</div>
							<div class="product_bottom">
								<div class="product_img">
									<img class="img_a" :src="item.imagePath"/>
								</div>
								<div class="product_con">
									<p class="product_con_p" v-if="item.originalPrice>0">￥{{item.originalPrice}}</p>
									<p class="product_con_p" v-if="item.discountPrice>0">￥{{item.discountPrice}}</p>
									<p class="product_con_p">{{item.name}}</p>
									<p class="product_con_p">{{item.summery}}</p>
									<p v-if="item.discountPrice<=0">
										<span class="product_con_span" v-if="item.isBought!=1&&item.isSampleSack==1">免费试用</span>
										<span class="product_con_span" v-else-if="item.isContinued==1&&item.isBought==1">VIP续领</span>
										<span class="product_con_span" v-else>成为VIP</span>
									</p>
									<p v-if="item.discountPrice>0">
										<span >{{item.discount}}积分</span>
									</p>
								</div>
							</div>
						</li>
					</div>
					<div>
						<li   v-for="(item,index) in goodses" v-if="index==2||index==3"  :class="[index==2||index==3?'product_li_c':'product_li_b']" @click="goEach('GoodsDetail',item.skuId,item.spuId)">
							<div class="product_top">
								<div>
									<span class="product_name">{{item.catName}}</span>
								</div>
								<span class="product_print" v-if="item.originalPrice>0">￥{{item.originalPrice}}</span>
								<span class="product_print" v-if="item.discount>0">{{item.discount}}积分</span>
							</div>
							<div class="product_cons">
								<div class="product_con_product">
									<img class="product_con_imgs" :src="item.imagePath"/>
								</div>
								<p class="product_con_ps">{{item.name}}</p>
	
							</div>
						</li>
					</div>
					<li   v-for="(item,index) in goodses" v-if="index!=0&&index!=1&&index!=2&&index!=3&&index<6"  :class="[index==2||index==3||index==6||index==9||index==11?'product_li_c':'product_li_b']" @click="goEach('GoodsDetail',item.skuId,item.spuId)">
						<div class="product_top">
							<div>
								<span class="product_name">{{item.catName}}</span>
							</div>
							<span class="product_print" v-if="item.originalPrice>0">￥{{item.originalPrice}}</span>
							<span class="product_print" v-if="item.discount">{{item.discount}}积分</span>
						</div>
						<div class="product_cons">
							<div class="product_con_product">
								<img class="product_con_imgs" :src="item.imagePath"/>
							</div>
							<p class="product_con_ps">{{item.name}}</p>

						</div>
					</li>
					
					<li class="product_li_c">
						<div class="product_li_Div" @click="goEach('Allgoods')">
							<p class="product_li_p">MORE</p>
							<p class="product_li_p"><b>......</b></p>
						</div>
					</li>
				</ul>
			</div>
		
			<!--广告位3-->
			<div class="advertis_c" @click="goEach('Rich','','',mid_actionContentc)">
				<img :src="mid_imgc"/>
				<div class="advertis_c_con">
					<!--<p class="advertis_c_con_p_a">一次购买</p>
					<p class="advertis_c_con_p_b">终身免费</p>
					<p class="advertis_c_con_p_c">购买一次 终身免费领取</p>-->
				</div>
			</div>
		
			<!--每日财富新星-->
			<div class="rich_list" >
				<div class="rich_list_name">
					<p class="rich_list_p">
						<img class="rich_list_img" src="../../assets/home/A0001_首页_003.png"/>
						<span class="rich_list_span">&nbsp;美丽每日财富星</span>
					</p>
					<p class="rich_list_p_r" @click="goEach('Ranking')">
						<span class="rich_list_span_r">更多</span>
						<img class="rich_list_img_r" src="../../assets/common/3x/common_btn_arrow_grey@3x.png"/>
					</p>
				</div>
				<ul class="rich_list_ul" @click="goEach('Ranking')">
					<li class="rich_list_li" v-for="(ranking,index) in rankings" :class="[index==0?'center_div':index==1?'left_div':'right_div']">
						<div class="rich_list_li_div">
							<img class="rich_list_img_a" v-if="ranking.imagePath" :src="ranking.imagePath" alt="" />
							<img class="rich_list_img_a" v-else src="../../assets/my/3x/my_img_avatar_big@3x.png" alt="" />
							<img v-if="index==0" class="rich_list_img_b" src="../../assets/home/@3x/home_icon_NO.1@3x.png"/>
							<img v-if="index==1" class="rich_list_img_b" src="../../assets/home/@3x/home_icon_NO.2@3x.png"/>
							<img v-if="index==2" class="rich_list_img_b" src="../../assets/home/@3x/home_icon_NO.3@3x.png"/>
							<p class="star_name">{{ranking.actionName}}</p>
						</div>
					</li>
				</ul>
			</div>
		
			<!--姐言妹语-->
			<div class="rich_list">
				<div class="rich_list_name">
					<p class="rich_list_p">
						<img class="rich_list_img" src="../../assets/home/A0001_首页_004.png"/>
						<span class="rich_list_span">&nbsp;姐言妹语</span>
					</p>
					<p class="rich_list_p_r" @click="goEach('Sister')">
						<span class="rich_list_span_r">更多</span>
						<img class="rich_list_img_r" src="../../assets/common/3x/common_btn_arrow_grey@3x.png"/>
					</p>
				</div>
				<div class="swiper-container swiper_b" id="swiper_b">
			      <div class="swiper-wrapper rich_list_uls" @click="goEach('Sister')">
			            <div class="swiper-slide rich_list_lis" v-for="word in words">
			                <img v-if="word.imagePath" class="rich_list_imgs" :src="word.imagePath" alt="" />
			               <img class="rich_list_imgs" v-else src="../../assets/my/3x/my_img_avatar_big@3x.png" alt="" />
							<p class="star_name_a">{{word.actionName}}</p>
							<span class="star_name_b">{{word.title}}</span>
							<p class="star_name_c">{{word.actionContent}}</p>
			            </div>
			      </div>
			    </div>
				
			</div>
		
			<!--美丽秀场-->
			<div class="elegant" >
				<div class="rich_list_name" @click="goEach('Show')">
					<p class="rich_list_p">
						<img class="rich_list_img" src="../../assets/home/A0001_首页_005.png"/>
						<span class="rich_list_span">&nbsp;美丽秀场</span>
					</p>
				</div>
				<div class="elegant_img" @click="goEach('Show')">
					<img :src="showField.imagePath"/>
					<div class="elegant_con">
						<!--<p class="elegant_con_p_a">有品位的女人 都应该学点护肤术</p>
						<p class="elegant_con_p_b">美丽教你 如何美颜</p>
						<p class="elegant_con_p_c">更多<van-icon class="elegant_con_span" name="arrow" /></p>-->
					</div>
				</div>
				
				<ul class="elegant_ul">
					<li class="elegant_li" @click="advertising(bottomAds.actionContent,bottomAds.actionType)" v-for="(bottomAds,index) in bottomAd" :class="[index==1?'elegant_lis':'']">
						<img class="elegant_li_img" :src="bottomAds.imagePath"/>
					</li>
				</ul>
			</div>
			<div style="height: 0.15rem;"></div>
		</div>
		
    </div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	import Swiper from '../../../static/swiper.min.js'
//	import Swiper from 'swiper';
	export default {
		name:'Home',
		components: {
			navbarbase
		},
		data() {
		    return {
		    	title:"美丽领吧",
				router:this.$route.name,
				goodses:[],						//商品列表
				rankings:[],					//每日财富新星
		    	images: [],						//轮播图
		    	ads:[],							//导航广告位
		    	words:[],						//姐言妹语
		    	showField:{},					//美丽秀场
		    	bottomAd:[],					//底部广告
			    animate:false,					//公告1
			    notices:[],						//公告1
			    mid_imga:"",					//广告1图片
			    mid_actionContenta:null,		//广告1actionContenta
			    mid_imgb:"",					//广告2图片
			     mid_actionContentb:null,		//广告1actionContenta
			    mid_imgc:"",					//广告3图片
			     mid_actionContentc:null,		//广告1actionContenta
			    animates:false,					//公告2
			    noticess:[],					//公告2
			    adspage:['Allgoods','Sister','Sharpvip','Show','Spokesperson','Question'],//商品列表跳转页面
			    total:0,//消息总条数
			};
		},//data结束
		computed: {},
		mounted() {
		   
		   
				
	
		  	
		  	
		},//mounted结束
		created() {
			 console.log("Home created");
			this.getAdListA();//1. 系统公告
			 setInterval(this.scroll,2000)//公告1
		  	setInterval(this.scrolls,2000)//公告2
			this.getAdListC();//3. 图片广告位
			this.getAdListD();//4. 导航广告位
			this.getAdListE();//5. 美丽快报
			this.getAdListG();//7. 美丽财富星
			this.getAdListH();//8. 姐言妹语
			this.getAdListI();//9. 美丽秀场
			this.getAdListJ();//10. 底部广告位
				this.getAdListB();//2. 首页轮播图
			this.getData(1);//首页商品列表
			if(this.$store.state.isLogin){
				this.QueryAdvices();//获取消息总条数
			};
			
			
		},//created结束
		mounted(){
		},
//		activated(){
//			this.getAdListA();//1. 系统公告
//			setTimeout(()=>{
//				this.getAdListB();//2. 首页轮播图
//			},200)
//			this.getAdListC();//3. 图片广告位
//			this.getAdListD();//4. 导航广告位
//			this.getAdListE();//5. 美丽快报
//			this.getAdListG();//7. 美丽财富星
//			this.getAdListH();//8. 姐言妹语
//			this.getAdListI();//9. 美丽秀场
//			this.getAdListJ();//10. 底部广告位
//				this.getAdListB();
//			this.getData(1);//首页商品列表
//			
//			
//			setInterval(this.scroll,2000)//公告1
//		  	setInterval(this.scrolls,2000)//公告2
//			
//			console.log(this.$router)
//			if(this.$store.state.isLogin){
//				this.QueryAdvices();//获取消息总条数
//			}
//			
//				this.getAdListB();
//		},
		
		methods: {
			getAdListA(){//1. 系统公告
				this.$Api.getAdList(1).then((res)=>{
					if(res.q.ads.length>0){
						for(var i=0;i<res.q.ads.length;i++){
							var obj={
								name:res.q.ads[i].actionContent
							}
							this.notices.push(obj)
						}
					}
				})
			},
			getAdListB(){//2. 首页轮播图
				
				this.$Api.getAdList(2).then((res)=>{
					if(res.q.ads.length!=0){
						this.images = res.q.ads
						setTimeout(()=>{
				this.lunbo();//轮播
			},1000)
						
					}
				})
			},
			getAdListC(){//3. 图片广告位
				this.$Api.getAdList(3).then((res)=>{
					console.log(res,"图片广告位")
					if(res.q.ads.length>0){
						this.mid_imga=res.q.ads[0].imagePath
						this.mid_actionContenta=res.q.ads[0].actionContent
						
						this.mid_imgb=res.q.ads[1].imagePath
						this.mid_actionContentb=res.q.ads[1].actionContent
						
						this.mid_imgc=res.q.ads[2].imagePath
						this.mid_actionContentc=res.q.ads[2].actionContent
						
					}
				})
			},
			getAdListD(){//4. 导航广告位
				this.$Api.getAdList(4).then((res)=>{
					if(res.q.s==0){
						this.ads = res.q.ads
					}
				})
			},
			getAdListE(){//5. 美丽快报
				this.$Api.getAdList(5).then((res)=>{
					if(res.q.ads.length>0){
						for(var i=0;i<res.q.ads.length;i++){
							var obj={
								name:res.q.ads[i].actionContent
							}
							this.noticess.push(obj)
						}
					}
				})
			},
			
			getAdListG(){//7. 美丽财富星
				this.$Api.getAdList(7).then((res)=>{
					if(res.q.s==0){
						this.rankings = res.q.ads
					}
				})
			},
			getAdListH(){//8. 姐言妹语
				this.$Api.getAdList(8).then((res)=>{
					if(res.q.s==0){
						var that=this
						this.words = res.q.ads
						setTimeout(function(){
							that.initSwiper();
						},300)
					}
				})
			},
			getAdListI(){//9. 美丽秀场
				this.$Api.getAdList(9).then((res)=>{
					if(res.q.s==0){
						if(res.q.ads.length>0){
							this.showField = res.q.ads[0]
						}
					}
				})
			},
			getAdListJ(){//10. 底部广告位
				this.$Api.getAdList(10).then((res)=>{
					if(res.q.s==0){
						this.bottomAd = res.q.ads
					}
				})
			},
			
			
			onClickLeft(data){//头部导航左边点击事件
				this.$router.push({name:"Aletter"})
			},
			onClickRight(data){//头部导航右边点击事件
				if(localStorage.getItem("sessionId")){
					this.$router.push({name:"Mymessage"})
				}else{
					this.$call.invokeLogin({})
				}
				
				
			},
		  	scroll(){//公告1
		       this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
		       setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
		               this.notices.push(this.notices[0]);  // 将数组的第一个元素添加到数组的
		               this.notices.shift();               //删除数组的第一个元素
		               this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
		       },1500)
	    	},
	    	scrolls(){//公告2
		       this.animates=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
		       setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
		               this.noticess.push(this.noticess[0]);  // 将数组的第一个元素添加到数组的
		               this.noticess.push(this.noticess[1]);
		               this.noticess.shift();               //删除数组的第一个元素
		               this.noticess.shift();
		               this.animates=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
		       },1500)
	    	},
	    	initSwiper() {
		      new Swiper(".swiper_b", {
		        direction: "horizontal",
		        slidesPerView: 3.5,
		        autoplayDisableOnInteraction: false,
		        spaceBetween : 5,
		      });
		    },
		    
		    lunbo(){//轮播
		    	new Swiper(".swiper_a", {
		    		autoplay: 3000,
					pagination:  '.swiper-pagination',
					loop : true,
					preventLinksPropagation : true,
			    });
		    },

		    goEach(text,skuId,spuId,id){
		    	if(text == "Allgoods"){						//免费试用
		    		this.$router.push({name:"Allgoods"})
		    	}else if(text== "Sister"){					//姐言妹语
		    		this.$router.push({name:"Sister"})
		    	}else if(text == 'Sharpvip'){				//超值VIP
		    		this.$router.push({name:"Sharpvip"})
		    	}else if(text == 'Show'){					//美丽秀场
		    		this.$router.push({name:"Show"})
		    	}else if(text == 'Spokesperson'){			//代言人
		    		this.$router.push({name:"Spokesperson"})
		    	}else if(text == 'Question'){				//美丽问答
		    		this.$router.push({name:"Question"})
		    	}else if(text == "Rich"){					//创富计划.
		    		console.log(this.mid_actionContentc)
		    		console.log(id)
		    		this.$router.push({name:"Rich",query:{id:id}})
		    	}else if(text == 'Ranking'){				//排行榜
		    		this.$router.push({name:"Ranking"})
		    	}else if(text == 'Details'){				//咨讯详情
		    		this.$router.push({name:"Details"})
		    	}else if(text == 'GoodsDetail'){			//产品详情
		    		this.$router.push({name:"GoodsDetail",query:{skuId:skuId,spuId:spuId}})
		    	}else if(text == 'Safe'){
		    		this.$router.push({name:"Safe",query:{id:id}})
		    	}
		    },
		    
		    advertising(a,b){//首页底部广告位跳转
		    	console.log(a,b)
		    	if(b==4){
		    		this.$router.push({name:'Details',query:{id:a}})
		    	}else if(b==2){
		    		this.$router.push({name:'GoodsDetail',query:{id:a}})
		    	}
		    },
		    
		    getData(num){//首页商品列表
		  		this.$Api.getGoodsList(num).then((res)=>{
		  			console.log(res)
		  			if(res.q.d=='操作成功'){
		  				this.goodses=res.q.goodses
//		  				for(let i=0;i<res.q.goodses.length;i++){
//		  					this.list.push(res.q.goodses[i])
//		  				}
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
			},
			
			Carousel(a,b,c){//点击轮播图跳转
				
				if(c==2){
					this.$router.push({name:'GoodsDetail',query:{spuId:a,skuId:b}})
				}else if(c==4){
					this.$router.push({name:'Details',query:{id:a}})
				}
			}
		    
		},//methods结束
		beforeRouteLeave(to, from, next) {
			let position = window.scrollY //记录离开页面的位置 
			console.log(position)
			if (position == null) position = 0 
			this.$store.dispatch("increment",{scrollY:position,router:from.name}) //离开路由时把位置存起来 
			 next() 
		},//beforeRouteLeave结束
		beforeRouteEnter(to, from, next){
		 	next(vm=>{
		 		if(vm.$store.getters.recruitScrollY(to.name)==undefined){
		         	vm.$store.dispatch("increment",{scrollY:0,router:to.name})
		        }
		       let recruitScrollY =vm.$store.getters.recruitScrollY(to.name)
		       console.log(recruitScrollY)
		    
//		      	  window.scrollTo(0, recruitScrollY) 
		    
		 	})
		}//beforeRouteEnter结束
		
		
	};
</script>

<style scoped="scoped" lang="scss">
@import url("../../plugin/Swiper/swiper.min.css");
.van-nav-bar__title{font-size: 18px !important;}
.container{padding:0.92rem 0 0.96rem;overflow: hidden;}

/*轮播图*/
.tophead{position: relative;height: 4.4rem;}
#swiper_a{width: 100%;height: 100%;}
/*.tophead>.van-swipe{height: 4.4rem;}*/

/*公告栏1*/
.notice{background-color: rgba(250,250,250,0.2);width: 6rem;height: 0.6rem;position: absolute;top: 0.24rem;overflow: hidden;margin-left: 0.25rem;border-radius: 0.06rem;z-index: 10;}
.notice ul{position: absolute;top: -0.6rem;}
.horn{width: 0.28rem;height: 0.29rem;margin: 0.1rem 0 0 0.19rem;}
.horn>img{width: 0.28rem;height: 0.29rem;}
.anim{transition: all 1.5s;margin-top: -0.6rem;}
.con1>li{padding-left: 0.69rem; list-style: none;line-height: 0.6rem;height: 0.6rem;font-size: 0.25rem;color: #fff;}

/*广告位1*/
.advertis_a{width: 100%;height: 2.5rem;padding: 0.24rem 0.25rem;position: relative;}
.advertis_con{position: absolute;left: 2.23rem;top: 0.63rem; text-align: center;}
.advertis_con_top{font-size: 0.3rem;color: #ffe8b8;}
.advertis_con_bottom{font-size: 0.28rem;color: #ffffff;}
.advertis_a_a{width: 6.9rem;height: 2rem;position: absolute;border-radius:0.2rem ;}
.advertis_a_a>img{width: 6.9rem;height: 2rem;border-radius:0.2rem ;}
.advertis_a_b{width: 0.8rem;height: 0.8rem;position: absolute;top: 0;bottom: 0; right: 0.14rem;margin: auto 0;}
.advertis_a_b>img{width: 0.8rem;height: 0.8rem;}

/*功能区1*/
.function_a{width: 100%;height: 3.9rem;padding: 0 0.24rem;}
.function_a_ul{width: 100%;height: auto;display: flex;flex-wrap: wrap;}
.function_a_li{width: 3.5rem;height: 1.12rem;margin-bottom: 0.18rem;display: flex;}
.li_b{padding-left: 0.4rem;}
.function_a_li_img{width: 1rem;height: 1rem;margin-top: 0.06rem;}
.function_a_li_img>img{width: 1rem;height: 1rem;}
.function_a_li_con{padding: 0.15rem 0 0 0.3rem;width: 2.1rem;}
.function_a_li_con>h3{width: 100%; font-size: 0.3rem;color: #333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.function_a_li_con>p{width: 100%; font-size: 0.25rem;color: #666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

/*公告栏2*/
.bulletin_board{width: 100%;height: 0.8rem;position: relative;}
.notices{width: 6rem;height: 0.8rem;position: absolute;overflow: hidden;margin-left: 0.25rem;border-radius: 0.6rem;}
.notices ul{position: absolute;top: -0.4rem;}
.horns{width: 0.88rem;height: 0.8rem;margin: 0.08rem 0 0 0.19rem;}
.horns>p{font-size: 0.25rem;color: #333333;}
.anims{transition: all 1.5s;margin-top: -0.8rem;}
.con1s>li{padding-left: 0.8rem; list-style: none;line-height: 0.4rem;height: 0.4rem;font-size: 0.22rem;color: #333333;}

/*广告位2*/
.advertis_b{width: 100%;height: 3.2rem;margin: 0.3rem 0;position: relative;}
.advertis_b_con{position: absolute;top: 0.8rem;left: 0.9rem;font-size: 0.3rem;text-align: center;}
.advertis_b_con_p_a,.advertis_b_con_p_b{color: #fff;}
.advertis_b_con_p_c{font-size: 0.21rem;border: 0.01rem solid #ffffff;color: #fff;margin-top: 0.2rem;padding: 0.05rem 0.1rem;}
.advertis_b>img{width: 100%;height: 3.2rem;}

/*产品区1*/
.product{width: 100%;height: auto;margin: 0.12rem 0;}
.product_ul{width: 100%;display: flex;flex-wrap: wrap;}
.product_li_a{width: 4.98rem;height: 2.8rem;background-color: #f3f3f3;margin-right: 0.06rem;margin-bottom: 0.06rem;}
.product_li_b{width: 2.46rem;height: 2.8rem;background-color: #f3f3f3;margin-right: 0.06rem;margin-bottom: 0.06rem;}
.product_li_c{width: 2.46rem;height: 2.8rem;background-color: #f3f3f3;margin-bottom: 0.06rem;position: relative;}
.product_top{height: 0.7rem;width: 100%;position: relative;padding: 0.15rem 0 0.15rem 0.15rem;}
.product_name{display: inline-block;border-top: 0.01rem solid #999999;box-sizing: border-box; border-bottom: 0.01rem solid #999999;color: #666666;font-size: 0.23rem;height: 0.34rem;}
.product_price{display: block;position: absolute; width: 0.54rem;height: 0.7rem;right: 0.28rem;top: 0;}
.product_price>img{width: 0.54rem;height: 0.7rem;}
.product_bottom{display: flex;width:100%;height: 2.1rem;}
.product_img{width:50%;}
.img_a{width: 2rem;height: 1.56rem;padding: 0.12rem 0 0 0.46rem;}
.product_con{padding-top: 0.3rem;}
.product_con_p{width: 2.3rem; font-size: 0.25rem;color: #666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.product_con_span{display: inline-block;background-color: #996023;color: #fff;font-size: 0.2rem;padding: 0.02rem 0.05rem;border-radius: 0.05rem;}
.product_print{display: inline-block;position: absolute;right: 0rem;top: 0.15rem; font-size: 0.25rem;color: #666666;width:1.6rem;overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;}
.product_con_product{width: 100%;height: 1.6rem;text-align: center;}
.product_con_imgs{width: 1.6rem;height: 1.45rem;}
.product_con_ps{font-size: 0.25rem;color: #666;text-align: center;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.product_li_Div{position: absolute;left: 0;right: 0; top: 0;bottom: 0;margin: auto;height: 0.72rem;}
.product_li_p{text-align: center;color: #666;font-size: 0.3rem;}

/*广告位3*/
.advertis_c{width: 100%;height: 3.2rem;margin: 0.3rem 0;position: relative;}
.advertis_c_con{position: absolute;top: 0.8rem;left: 0.9rem;font-size: 0.3rem;text-align: center;}
.advertis_c_con_p_a,.advertis_c_con_p_b{color: #fff;}
.advertis_c_con_p_c{font-size: 0.21rem;border: 0.01rem solid #ffffff;color: #fff;margin-top: 0.2rem;padding: 0.05rem 0.1rem;}
.advertis_c>img{width: 100%;height: 3.2rem;}

/*每日财富新星*/
.rich_list{width: 100%;height: 3.82rem;margin-bottom: 0.39rem;}
.rich_list_name{width: 100%;height: 0.62rem;position: relative;}
.rich_list_p{width: 100%;text-align: center;}
.rich_list_p_r{position: absolute;right: 0.24rem;top: 0;height: 0.4rem;display: flex;line-height: 0.4rem;}
.rich_list_span{font-size: 0.3rem;color: #333333;vertical-align: middle;}
.rich_list_span_r{display: inline-block; font-size: 0.25rem;color: #999999;height: 0.4rem;padding-right: 0.1rem;}
.rich_list_img{width: 0.38rem;height: 0.32rem;}
.rich_list_img_r{width: 0.13rem;height: 0.23rem;margin-top: 0.07rem;}
.rich_list_ul{width: 100%;height: 3.2rem;padding: 0.37rem 0;background-color: #f3f3f3;position: relative;}
.rich_list_li{width: 33.3%;position: absolute;}
.center_div{left: 0;right: 0;margin: 0 auto;}
.left_div{left: 0;}
.right_div{right: 0;}
.rich_list_li_div{width: 100%;height: 2.47rem;position: relative;text-align: center;}
.rich_list_img_a{display: inline-block; width: 2rem;height: 2rem;border-radius: 50%;}
.rich_list_img_b{width: 1.88rem;height: 0.4rem; position: absolute;top: 1.67rem;left: 0;right: 0;margin: 0 auto;}
.star_name{font-size: 0.3rem;color: #333333;padding-top: 0.1rem;}

/*姐言妹语*/
#swiper_b{padding: 0.25rem 0;background-color: #f3f3f3;text-align: center;}
.rich_list_lis{background-color: #fff;padding: 0.15rem 0;}
.rich_list_imgs{width: 1.4rem;height: 1.4rem;border-radius: 50%;}
.star_name_a{font-size: 0.25rem;color: #333333;padding-top: 0.1rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.star_name_b{font-size: 0.2rem;color: #666666;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;height: 0.14rem;}
.star_name_c{font-size: 0.2rem;color: #333333;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;padding: 0 0.1rem;}

/*美丽秀场*/
.elegant{width: 100%;height: 5.57rem;}
.elegant_img{width: 100%;height: 3.2rem;position: relative;}
.elegant_con{position: absolute;top: 1.07rem;left: 0.79rem;text-align: center;color: #fff;}
.elegant_con_p_a{font-size: 0.2rem;}
.elegant_con_p_b{font-size: 0.3rem;}
.elegant_con_p_c{width: 32%; font-size: 0.22rem;border: 0.01rem solid #fff;padding: 0.05rem 0.1rem;display: flex;align-items: center;justify-content: center;margin: 0.2rem auto 0;}
.elegant_con_span{color: #fff;}
.elegant_img>img{width: 100%;height: 3.2rem;}
.elegant_ul{display: flex;flex-wrap: nowrap;margin: 0.06rem 0;}
.elegant_lis{margin: 0 0.06rem;}
.elegant_li_img{width: 2.46rem;height: 1.6rem;}

</style>
