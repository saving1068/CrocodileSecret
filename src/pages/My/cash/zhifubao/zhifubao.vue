<template>
	<div :style="bg">
		<div class="top" >
			<navbarbase :title="title" :right="'content'" :left="'back'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		<ul class="info">
			<li class="info_item">
				<p class="info_item_name">姓名</p>
				<div class="info_item_val">
					<input type="text" placeholder="收款人姓名"/>
				</div>
			</li>
			<li class="info_item">
				<p class="info_item_name">账户</p>
				<div class="info_item_content">
					<div class="info_item_content_inp">
						<input type="text" placeholder="收款人储蓄卡号"/>
					</div>
					<p class="info_item_content_img" @click="choose()">
						<!--<img src="../../../../assets/common/3x/common_btn_arrow@3x.png"/>-->
						<img src="../../../../assets/common/3x/common_btn_arrow_grey@3x.png"/>
					</p>
				</div>
			</li>
		</ul>
		<div class="money">
			<p class="info_item_name">金额</p>
			<div class="money_item">
				<div class="money_inp">
					<input type="text" placeholder="可提现5321.00元"/>
				</div>
				<div class="money_get">
					全部提现
				</div>
			</div>
		</div>
		<div class="text">
			钱将实时提现到账，无法退款！<span>提现记录</span>
		</div>
		<div class="bottom_btn">
			确认提现
		</div>
	</div>
</template>

<script>
	import navbarbase from '../../../../components/Navbarbase/Navbarbase'
	export default{
		components:{
			navbarbase,
		},
		data(){
			return{
				title:"提现到支付宝",
				img:[
					{
						a:require('../../../../assets/common/3x/common_btn_arrow@3x.png'),
					}
				],
				bg:{
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
				},
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			onClickRight(){
				this.$router.push({name:"Print"})
			},
			choose(){
				this.$router.push({name:"ChooseB"})
			}
		}
	}
</script>



<style scoped="scoped">
	.top{height: 0.9rem;border-bottom:0.02rem solid #cdcdcd;}
	.info{padding: 0.2rem 0;}
	.info_item{height: 1.1rem;width: 100%;background: #FFFFFF;}
	.info_item_name{padding-left: 0.27rem;line-height: 1.1rem;font-size: 0.34rem;padding-right: 0.5rem;float: left;}
	.info_item_val{width: 6.05rem;height: 100%;float: left;border-bottom: 0.02rem solid #e5e5e5;}
	.info_item_val input{width: 100%;height: 100%;border: none;font-size: 0.34rem;}
	.info_item_content{width: 6.05rem;height: 100%;float: left;}
	.info_item_content_inp{width:5.5rem;height: 100%;float: left;}
	.info_item_content_inp input{width: 5.5rem;border: none;height: 100%;}
	.info_item_content_img{float: left;width: 0.2rem;padding-top: 0.35rem;}
	input::-webkit-input-placeholder { /* WebKit browsers */ color: #CCCCCC; }
	.money{overflow: hidden;background: #FFFFFF;}
	.money_item{width: 6.05rem;height: 100%;float: left;border-bottom: 0.02rem solid #e5e5e5;}
	.money_inp{width: 4.37rem;height: 1.1rem;float: left;}
	.money_inp input{width: 100%;height: 100%;border: none;}
	.money_get{width: 1.45rem; height: 0.6rem; border: 0.02rem solid #e6bf6b;border-radius:0.1rem;float: left;margin-top: 0.25rem;text-align: center;line-height: 0.6rem;color: #E6BF6B;font-size: 0.24rem}
	.text{padding: 0.22rem 0.22rem;font-size: 0.24rem;background: #FFFFFF;}
	.text span{color: #e6bf6b;}
	.bottom_btn{width: 7rem;height: 0.83rem;background: #E6BF6B;margin: 0.7rem auto;border-radius: 0.1rem;text-align: center;line-height: 0.83rem;color: #FFFFFF;}
</style>