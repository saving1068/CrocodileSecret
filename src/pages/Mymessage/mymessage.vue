<template>

	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>
		
		<div class="con">
			<div class="con_li" @click="toPage('systematicNotification','系统通知','2')">
				<div class="con_div_a">
					<img class="con_img" src="../../assets/home/@3x/home_icon_notice@3x.png"/>
					<div v-for="advice in advices" v-if="advice.type==2&&advice.num!=0" class="dot">{{advice.num}}</div>
				</div>
				<div class="con_div_b">
					<p class="con_p_a">
						<span class="con_span_a">通知</span>
						<!--<span class="con_span_b">12:41</span>-->
					</p>
					<!--<p class="con_p_b">
						通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容
					</p>-->
				</div>
			</div>
			
			<div class="con_li" @click="go">
				<div class="con_div_a">
					<img class="con_img" src="../../assets/home/@3x/home_icon_service@3x.png"/>
					<!--<div  class="dot">2</div>-->
				</div>
				<div class="con_div_b">
					<p class="con_p_a">
						<span class="con_span_a">客服</span>
						<!--<span class="con_span_b">12:41</span>-->
					</p>
					<!--<p class="con_p_b">
						通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容
					</p>-->
				</div>
			</div>
			
			<div class="con_li" @click="toPage('systematicNotification','交易物流','4')">
				<div class="con_div_a">
					<img class="con_img" src="../../assets/home/@3x/home_icon_logistics@3x.png"/>
					<div v-for="advice in advices" v-if="advice.type==4&&advice.num!=0" class="dot">{{advice.num}}</div>
				</div>
				<div class="con_div_b">
					<p class="con_p_a">
						<span class="con_span_a">物流</span>
						<!--<span class="con_span_b">12:41</span>-->
					</p>
					<!--<p class="con_p_b">
						通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容
					</p>-->
				</div>
			</div>
			
			<div class="con_li" @click="toPage('systematicNotification','收益通知','3')">
				<div class="con_div_a">
					<img class="con_img" src="../../assets/home/@3x/home_icon_profit@3x.png"/>
					<div v-for="advice in advices" v-if="advice.type==3&&advice.num!=0" class="dot">{{advice.num}}</div>
				</div>
				<div class="con_div_b">
					<p class="con_p_a">
						<span class="con_span_a">收益</span>
						<!--<span class="con_span_b">12:41</span>-->
					</p>
					<!--<p class="con_p_b">
						通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容
					</p>-->
				</div>
			</div>
			
			
		</div>
		
		
		
		
	</div>

</template>

<script>
	
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		data(){
			return{
				title:"我的消息",
				advices:[],//消息数组
			}
		},
		created(){
			console.log("my")
			this.QueryAdvices();
		},
		activated(){
			console.log("activated")
		},
		methods:{
			go(){//调用APP 客服
				this.$call.invokeImHelper({})
				
			},
			onClickLeft(data){
				this.$router.go(-1)
			},
			toPage(text,val,a){//跳转消息详情页面
				this.$store.state.informationA = a//设置全局缓存a参数，当进入下一个页面，再进去下一个页面返回时，参数还存在，防止数据接口缺参数
				this.$store.state.informationa = val//设置全局缓存val字段，当进入下一个页面，再进去下一个页面返回时，val字段还存在，title不会为空
				if(text == 'systematicNotification'){
					this.$router.push({name:"Informationpage",})
//					params:{titles:val}
				}
			},
			QueryAdvices(){
				this.$Api.QueryAdvices().then((res)=>{
					if(res.q.s == 0){
						this.advices = res.q.advices
					}
				})
			}
		}
	}
	
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0rem 0;}
	
	.con{padding-left: 0.3rem;}
	.con_li{width: 100%;height: 1.6rem;border-bottom: 0.01rem solid #e5e5e5;display: flex;}
	.con_div_a{width: 20%;height: 1.6rem;line-height: 1.6rem;position: relative;}
	.con_img{width: 1rem;height: 1rem;border-radius: 50%;}
	.dot{width: 0.4rem;height: 0.4rem;text-align: center;line-height: 0.4rem;font-size: 0.25rem; border-radius: 50%;background-color: #fe4436;color: #fff;position: absolute;top: 0.16rem;left: 0.76rem;}
	.con_div_b{width: 80%;height: 1.6rem;padding-right: 0.3rem;}
	.con_p_a{padding-top: 0.4rem;display: flex;}
	.con_span_a{display: inline-block; width: 30%; font-size: 0.32rem;color: #333333;line-height: 0.42rem;}
	.con_span_b{display: inline-block; width: 70%;font-size: 0.25rem;color: #999999;text-align: right;line-height: 0.42rem;}
	.con_p_b{padding-top: 0.05rem; color: #999999;font-size: 0.3rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;line-height: 0.45rem;}
	
</style>