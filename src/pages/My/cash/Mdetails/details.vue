<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title" :right="'content'" :left="'back'" @isLeft="onClickLeft" ></navbarbase>
		</div>
		<div v-if="!ifDate">
			<p class="title">
				累计提现：￥48650.00
			</p>
			<div class="title_two">
				<span>提现到</span>
				<a>申请时间</a>
				<font>提现金额</font> 
			</div>
			<ul class="content" >
				<li class="content_item">
					<p><img src="../../../../assets/my/3x/my_img_alipay_small@3x.png"/></p>
					<span>2018/04/09 &nbsp;15:32</span>
					<font>￥1685.00</font> 
				</li>
				<li class="content_item_a">
					<p><img src="../../../../assets/my/3x/my_img_alipay_small@3x.png"/></p>
					<span>2018/04/09 &nbsp;15:32</span>
					<font>￥1685.00</font> 
				</li>
			</ul>
		</div>
		<div class="no" v-if="ifDate">
			<div class="no_get">
				<p><img src="../../../../assets/my/3x/my_bg_record_null@3x.png"/></p>
			</div>
			<div class="no_text">
				<p>亲，还没有体现记录哦！</p>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarbase from '../../../../components/Navbarbase/Navbarbase'
	export default{
		components:{
			navbarbase,
		},
		created(){
			this.getAccountDetailList()
		},
		data(){
			return{
				title:"提现明细",
				bg:{
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
				},
				ifDate:true
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			getAccountDetailList(){
				this.$Api.getAccountDetailList(1).then((res)=>{
					if(res.q.accountLogs.length != 0){
						this.ifDate = false
					}
					
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	img{width: 100%;height: 100%;}
	.top{height: 0.9rem;border-bottom:0.02rem solid #cdcdcd;}
	.title{text-align: center;line-height: 1.02rem;background: #FFFFFF;}
	.title_two{height: 0.85rem;background: #FFFFFF;margin-top: 0.2rem;font-size: 0.24rem;padding-top: 0.3rem;border-bottom: 0.02rem solid #c9c9c9;}
	.title_two span{padding-left: 0.92rem;}.title_two a{padding-left: 1.68rem}.title_two font{padding-left: 1.57rem;}
	.content{background: #FFFFFF;}
	.content_item{height: 1.18rem;padding-top: 0.35rem; border-bottom: 0.02rem solid #c9c9c9;padding-left: 0.94rem;font-size: 0.28rem;color: #666666;}
	.content_item p{float: left;width: 0.66rem;height: 0.66rem;}
	.content_item span{padding-left: 1.07rem; line-height: 0.58rem;}
	.content_item font{padding-left: 0.81rem;}
	.content_item_a{height: 1rem;padding-top: 0.18rem; border-bottom: 0.02rem solid #c9c9c9;padding-left: 0.94rem;font-size: 0.28rem;color: #666666;}
	.content_item_a p{float: left;width: 0.66rem;height: 0.66rem;}
	.content_item_a span{padding-left: 1.07rem; line-height: 0.58rem;}
	.content_item_a font{padding-left: 0.81rem;}
	.no_get{padding: 3.52rem 0 0.4rem 2.95rem;}
	.no_get p{width: 1.7rem;height: 2.55rem}
	.no_text{padding-left: 2.35rem;color: #666666;font-size: 0.26rem;}
</style>