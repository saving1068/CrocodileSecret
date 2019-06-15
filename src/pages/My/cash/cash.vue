<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title" :right="'content'" :left="'back'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		<ul class="content">
			<li class="content_list" v-for="(v,i) in list" @click="goEach(v.val)">
				<p>
					<img :src="v.img"/>
				</p>
				<div class="content_text">
					<a>
						{{v.val}}
					</a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import navbarbase from '../../../components/Navbarbase/Navbarbase'
	export default{
		components:{
			navbarbase,
		},
		data(){
			return{
				bg:{
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
				},
				titleName:'back',
				title:"申请提现",
				list:[
					{
						img:require("../../../assets/my/3x/my_img_chat_big@3x.png"),
						val:"提现到微信红包",
					},
					{
						img:require("../../../assets/my/3x/my_img_card_big@3x.png"),
						val:"提现到银行卡",
					},
					{
						img:require("../../../assets/my/3x/my_img_alipay_big@3x.png"),
						val:"提现到支付宝",
					},
				]
			}
		},
		methods:{
			goEach(text){
				if(text == "提现到银行卡"){
					this.$router.push({name:'Bank'})
				}else if(text == "提现到支付宝"){
					this.$router.push({name:'Zhifubao'})
				}
			},
			onClickLeft(){
				this.$router.go(-1)
			},
			onClickRight(){
				this.$router.push({name:"Print"})
			}
		}
	}
</script>

<style scoped="scoped">
	.van-nav-bar .van-icon{color: #000000;}
	.top{
		height: 0.9rem;
		border-bottom:0.02rem solid #cdcdcd;
	}
	.content{
		width: 100%;
		background: #FFFFFF;
		
	}
	.content_list{
		padding-left: 0.2rem;
		overflow: hidden;
		padding-top: 0.2rem;
	}
	.content_text{
		width: 6.07rem;
		height: 1.05rem;
		float: left;
		margin-left: 0.34rem;
		border-bottom:0.02rem solid #F5F5F5;
	}
	.content_list p{
		width: 0.86rem;
		height: 0.86rem;
		float: left;
	}
	.content_list a{
		font-size: 0.34rem;
		line-height: 0.86rem;
		letter-spacing: 0.023rem;
		display: block;
		float: left;

	}
</style>	