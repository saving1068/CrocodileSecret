<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'"  @isLeft="onClickLeft"></navbarbase>
	     <div class="con" v-if="this.total!=0">
	     	
	     	<div class="list" v-for="msg in msgs" @click="indentClick(msg.actionContent,msg.id,msg.type)">
	     		<div class="list_li_a">
	     			<p class="list_p_a">{{msg.title}}</p>
	     			<p class="list_p_b">{{msg.summery}}</p>
	     		</div>
	     		<div class="list_li_b">
	     			
	     			<!--非收益通知显示-->
	     			<img v-if="a!=3" class="list_img" :src="msg.imagePath"/>
	     			
	     			<!--收益通知显示-->
	     			<img v-if="a==3&&msg.title=='签到奖励'" class="list_img" src="../../../assets/home/@3x/home_icon_point@3x.png"/>
	     			<img v-if="a==3&&msg.title=='奖励金'" class="list_img" src="../../../assets/home/@3x/home_icon_reward@3x.png"/>
	     			
	     			<div class="dot" v-if="msg.status==0"></div>
	     		</div>
	     	</div>
	     	
	     </div>
	     
	     <div class="information_con" v-if="this.total==0">
	     	<div class="information_img"></div>
	     	<p>暂时没有内容哦！</p>
	     </div>
	     
	</div>
</template>

<script>
	
	import navbarbase from '../../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		data(){
			return{
				title:this.$store.state.informationa,//标题
				information:2,//1 有消息 2无消息
				a:this.$store.state.informationA,//2 系统通知 3 收益通知，4 订单消息(物流通知)
				total:0,//消息总数
				msgs:[],//消息列表
				id:null,//已读接口传的ID
			}
		},
		created() {
			this.MsgList()//调用消息列表接口
			
			if(this.a == 3){//当a==3是，收益消息未读消息变已读
				this.id = null
				this.PraiseSwitch();
			}
		},
		mouted(){
			
			
		},
		methods:{
			onClickLeft(data){
				this.$router.go(-1)
			},
			MsgList(){//消息列表
				this.$Api.MsgList(this.a).then((res)=>{
					if(res.q.s == 0){
						this.total = res.q.total;
						this.msgs = res.q.msgs;
					}
				})
			},
			PraiseSwitch(){//消息已读  a 1 文章 2系统通知 3收益通知，4物流通知, open  1.已读, id对象 ID（文章 id，评论 ID、公告 ID 等）a==3时，ID不传
				this.$Api.PraiseSwitch(this.a,1,this.id).then((res)=>{
					if(res.q.s==0){
						
					}
				})
			},
			indentClick(a,b,c){
				if(this.a == 4){//1 文章 2系统通知3收益通知，4订单消息(物流通知)
					this.id = b;
					this.PraiseSwitch();//点击物流的时候未读状态变已读
					this.$router.push({name:'Odetails',query:{id:a}})
				}else if(this.a == 2){
					
					if(c == 1){
						this.id = b;
						this.PraiseSwitch();//点击系统消息的时候未读状态变已读
						this.$router.push({name:'GoodsDetail',query:{skuId:b,spuId:a,type:0}})
					}else if(c == 2){
						this.id = b;
						this.PraiseSwitch();//点击系统消息的时候未读状态变已读
						this.$router.push({name:'Details',query:{id:a}})
					}
					
				}
				
			}
		},
		
	}
	
</script>

<style scoped="scoped">
	
	.container{padding:0.92rem 0rem 0;width: 100%;min-height: 100%; background-color: #f3f3f3;position: relative;}
	
	.con{padding: 0.3rem 0.24rem;}
	.list{width: 100%;height: auto;display: flex;background-color: #fff;border-radius: 0.1rem;margin-bottom: 0.3rem;}
	.list_li_a{width:5.24rem;height: 1.8rem;padding: 0.25rem 0 0 0.2rem;}
	.list_p_a{font-size: 0.3rem;color: #333333;}
	.list_p_b{font-size: 0.25rem;color: #666666;padding-top: 0.2rem;}
	.list_li_b{width:1.6rem;height: 1.8rem;text-align: center;line-height: 1.8rem;position: relative;}
	.dot{width: 0.2rem;height: 0.2rem;background-color: #ff0000;border-radius: 50%; position: absolute; top: 0.45rem;right: 0.3rem;}
	.list_img{width: 0.8rem;height: 0.8rem;}
	
	.information_con{width: 100%rem;height: 2.69rem; position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;text-align: center;}
	.information_con>p{font-size: 0.3rem;color: #999999;padding-top: 0.2rem;}
	.information_img{width: 1.6rem;height: 2.04rem;background-image: url(../../../assets/home/@3x/home_icon_message_default@3x.png);background-size: 100% 100%;margin: 0 auto;}
</style>