<template>
	<div>
		<!--不是专属会员-->
		<div class="code_no" v-if="flag==1" >
			<div class="top">
				<navbarbase :title="title"  @isRight="onClickRight" ></navbarbase>
			</div>
			<div class="content" v-html="img">
				<!--<div class="content_text">
					你还不是美丽领吧VIP会员，没有专属推广二维码；只有购买任意商品，成为美丽领吧VIP会员，才能获得专属二维码，分享赚钱！
				</div>
				<img :src="img"/>-->
			</div>
		</div>
		<div class="top" v-if="flag==2">
				<navbarbase :title="title"  :right="'share'"  @isLeft="onClickLeft" @isRight="onClickRight" ></navbarbase>
		</div>
		
		<!--是专属会员-->
		<div class="code_yes" v-if="flag==2"  @click="isIf">
			
			<div class="contents" :style='{height:imgHeight}'>
				<div class="ewm"  :style='{height:imgHeight}'>
					<ul class="ewm_ul" :style="{left:leftUl + '%'}">
						<li v-for="(image,index) in images"  :style='{height:imgHeight}'><img  class="ewm_img_a" :src="image.imagePath"/></li>
					</ul>
					
					<ul class="striping">
						<li v-for="item in 5" @click="slides(item)"></li>
						<div class="slide" :style="{left:activeLeft + '%'}"></div>
					</ul>
					
				</div>
			</div>
			
			<div class="ewm_btn" @click="save" v-if="isShow">
				<span class="ewm_btn_span">保存到相册</span>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		
		name: "qecode",
		components: {
			navbarbase
		},
		data() {
		    return {
		    	title:'我的二维码',
		    	img:'',
		    	flag:1,//1 显示不是会员  2 显示是会员
		    	images:[],//二维码图片
		    	num:1,//获取现在的第几张二维码
		    	activeLeft:0,
		    	leftUl:0,
		    	imgHeight:0,
		    	isShow:false,
		    	again:false,//重新调用mycode接口
			};
		},
		computed: {},
		created() {
		    console.log("qecode created");
//		   	this.MyCode();//调用二维码接口
		},
		mounted() {},
		activated(){
			if(this.$store.state.isLogin){
				if(!this.again){
					 this.MyCode();//调用二维码接口
					 this.again = true;
				}
				
			}else{
				this.$call.invokeLogin({})
			}
			
		},
		methods: {
			isIf(){
				this.isShow=!this.isShow;
				
			},
		  	onClickLeft(){//头部导航左边点击事件
		  		this.$router.go(-1)
		  	},
		  	onClickRight(){//头部导航右边点击事件
		  		
		  		if(localStorage.getItem("sessionId")){
					var obj={
		  			shareType:1,
					shareUrl:'/#/qecode',
		  			shareTitle:'二维码',
		  			shareContent:'图片',
		  			shareImage:this.images[this.num-1].imagePath
		  		}
					console.log(obj)
		  		this.$call.invokeShare(obj)
				}else{
					this.$call.invokeLogin({})
					
				}
		  		
		  	},
		  	slides(val,event){//二维码背景切换
		  		console.log(event)
		  		if(val==1){
//		  			console.log(this.images[val-1])
		  			this.activeLeft = 0
		  			this.leftUl = 0
		  			this.imgHeight = this.images[val-1].high/100+"rem"
//		  			console.log(this.imgHeight)
		  		}else if(val==2){
//		  			console.log(this.images[val-1])
		  			this.activeLeft = 20
		  			this.leftUl = -100
		  			this.imgHeight = this.images[val-1].high/100+"rem"
//		  			console.log(this.imgHeight)
		  		}else if(val==3){
		  			this.activeLeft = 40
		  			this.leftUl = -200
		  			this.imgHeight = this.images[val-1].high/100+"rem"
		  		}else if(val==4){
		  			this.activeLeft = 60
		  			this.leftUl = -300
		  			this.imgHeight = this.images[val-1].high/100+"rem"
		  		}else if(val==5){
		  			this.activeLeft = 80
		  			this.leftUl = -400
		  			this.imgHeight = this.images[val-1].high/100+"rem"
		  		}
		  		this.num = val
		  		console.log(this.num)
		  	},
		  	MyCode(){//二维码接口函数
		  		this.$Api.MyCode().then((res)=>{
		  			console.log(res,"二维码接口")
		  			if(res.q.s == 0){
		  				this.flag = res.q.flag
		  				this.images = res.q.images
		  				this.img = res.q.content
		  				this.imgHeight = res.q.images[0].high/100+"rem"
		  			}
		  		})
		  	},
		  	save(event){
		  		console.log(event)
		  		event.stopPropagation()
		  		var obj= {
		  			imagePath:this.images[this.num-1].imagePath
		  		}
		  		console.log(obj)
		  		this.$call.invokeSavePhoto(obj)
		  	}
		},
		beforeRouteLeave(to, from, next) {
			let position = window.scrollY //记录离开页面的位置 
			if (position == null) position = 0 
			this.$store.dispatch("increment",{scrollY:position,router:from.name}) //离开路由时把位置存起来 
			next() 
		},
 		beforeRouteEnter(to, from, next){
	 		next(vm=>{
		 		 if(vm.$store.getters.recruitScrollY(to.name)==undefined){
		         	vm.$store.dispatch("increment",{scrollY:0,router:to.name})
		         	
		        }
	      		let recruitScrollY =vm.$store.getters.recruitScrollY(to.name)
	        	window.scrollTo(0, recruitScrollY)  
 			})
 		}
};
	
</script>

<style scoped="scoped">
	img{width: 100%;height: 100%;}
	.top{height: 0.9rem;}
	.content_text{position: absolute;background: url(../../assets/common/3x/common_bg_qr_code@3x.png) 100% no-repeat;width: 100%;height: 1rem;padding: 0.15rem 0.2rem;font-size: 0.24rem;color: #333333;}
	
	.code_yes{}
	.contents{width: 100%;height: auto;display: flex;justify-content: center;}
	.ewm{width: 6.96rem;margin-top: 0.2rem;position: relative;overflow: hidden;}
	.ewm_ul{width: 500%;position: absolute;top: 0; display: flex;transition: 0.5s;}
	.ewm_ul>li{width: 20%;padding-bottom: 1.9rem;}
	.ewm_img_a{width: 6.96rem;}
	.ewm_btn{width: 6.96rem;height: 0.9rem;background-color: #e6bf6b;margin: 0.87rem auto 0;border-radius: 0.1rem;text-align: center;line-height: 0.9rem;color: #fff;position: fixed;bottom: 1rem;left: 0.27rem;z-index: 55;}
	.ewm_btn_span{display: inline-block;padding-left: 0.4rem;background-image: url(../../assets/home/ewm_02.png);background-repeat: no-repeat;background-size: 0.36rem 0.37rem;background-position: 0 0.245rem;font-size: 0.31rem;}
	
	.striping{width: 6.12rem;height: 0.07rem;position: absolute;bottom: 2.5rem;left: 0; right: 0;margin: 0 auto;display: flex;}
	.striping>li{width: 20%;height: 0.07rem;background-color: #776238;color: #fff;}
	.slide{width: 20%;height: 0.07rem;background-color: #e6bf6b;position: absolute;top: 0;transition: 0.5s;}
	
	.ewm_img_b{width: 1.44rem;height: 1.43rem; background-image: url(../../assets/common/3x/common_bg_frame@3x.png);background-size: 100% 100%;position: absolute;bottom: 1.32rem;right: 0.46rem;padding: 0.08rem 0 0 0.07rem;}
	.ewm_img_c{width: 1.14rem;height: 1.14rem;}
	
</style>