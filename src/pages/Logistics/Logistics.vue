<template>
	<div>
		<navbarbase :title="title"  :left="'back'"  @isLeft="onClickLeft" ></navbarbase>
		<div class="bg">
			<div class="top">
				<div class="top_val">
					<div class="top_val_img">
						<img :src="order.imagePath"/>
					</div>
					<div class="top_val_font">
						<p>物流公司:{{logistics.expressName}}</p>
						<p>物流单号：{{logistics.sn}}</p>
						<p>物流电话：{{logistics.expressTel}}</p>
					</div>
				</div>
			</div>
			<div class="title">
				物流状态
			</div>
			<div class="detail">
				<div class="detail_item" v-for="(v,i) in arr" :class="{'boder_none':i==arr.length-1}">
					<p>{{v.context}}</p>
					<p>{{v.time}}</p>
					<div class="detail_num" v-if="i==0">
						<div class="detail_num_bg">
							
						</div>
					</div>
					<div class="detail_num_bg_one" v-else>
						
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components:{
			navbarbase,
		},
		data(){
			return {
				title:"物流详情",
				arr:[1,23,3],
				logistics:"",
				order:"",
				payment:"",
			}
			
		},
		created(){
			console.log(this.$route.query.sn)
			this.LogisticsTicketInfo(this.$route.query.sn,this.$route.query.id)
			this.getOrderDetails(this.$route.query.id)
		},
		
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			LogisticsTicketInfo(id){
				this.$Api.LogisticsTicketInfo(id).then((res)=>{
					console.log(res)
					this.arr = res.q.data
				})
			},
			getOrderDetails(id){
				this.$Api.getOrderDetails(id).then((res)=>{
					console.log(res)
					this.logistics = res.q.logistics;
					this.order = res.q.order;
					this.payment = res.q.payment
				})
			}
		}
		
	}
</script>

<style scoped="scoped">
	.bg{background: #F3F3F3;padding-top: 0.9rem;}
	.top{padding: 0.2rem 0;}
	.top_val{padding: 0.25rem 0.25rem 0.45rem 0.25rem;overflow: hidden;background: #FFFFFF;}
	.top_val_img{float: left;width: 1.6rem;height: 1.6rem;border-radius: 0.05rem;overflow: hidden;}
	.top_val_font{float: left;padding-left: 0.45rem;}
	.top_val_font p{padding-top: 0.1rem;}
	.title{line-height: 0.8rem;background: #FFFFFF;border-bottom: #e5e5e5 0.01rem solid;padding-left: 0.25rem;color: #404040;}
	.detail{padding: 0.25rem 0.25rem 0 0.45rem;background: #FFFFFF;}
	.detail_item:nth-of-type(1){color: #E6BF6B;}
	
	.detail_item{padding-left: 1rem;font-size: 0.26rem;padding-bottom: 0.6rem;border-left: 0.01rem solid #CCCCCC;position: relative;color: #cccccc;}
	.detail_item p:nth-of-type(2){font-size: 0.22rem;padding-top: 0.15rem;}
	.detail_num{width: 0.46rem;height: 0.46rem;background: #f7ecd2;position: absolute;left: -0.25rem;top:0;border-radius: 50%;}
	.detail_num_bg{width: 0.36rem;height: 0.36rem;background: #e6bf6b;position: absolute;left: 0.06rem;top:0.03rem;border-radius: 50%;}
	.detail_num_bg_one{width: 0.36rem;height: 0.36rem;background: #CCCCCC;position: absolute;left: -0.18rem;top:0.03rem;border-radius: 50%;}
	.boder_none{border: transparent;}
</style>