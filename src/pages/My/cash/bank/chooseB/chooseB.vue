<template>
	<div :style="bg">
		<div class="top">
			<navbarbase :title="title"  :left="'back'" @isLeft="onClickLeft" ></navbarbase>
		</div>
		<div class="content">
			<ul>
				<li class="content_item">
					<p>
						<img src="../../../../../assets/common_img_icbc@2x.png"/>
					</p>
					<a>工商银行</a>
				</li>
				<li class="content_item">
					<p><img src="../../../../../assets/my/3x/my_img_bank1@3x.png"/></p>
					<a>农业银行</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import navbarbase from '../../../../../components/Navbarbase/Navbarbase'
	export default{
		components:{
			navbarbase,
		},
		created() {
		    console.log("chooseB");
//		    this.$Api.setSessionId("a65bn7Z7IjHRe29Wdb685e69o9h2733V")
		    console.log(localStorage.getItem('sessionId'))
		    this.getCardList()
		},
		data(){
			return{
				bg:{
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
				},
				title:"选择开户银行"
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			getCardList(){
				this.$Api.getCardList().then((res)=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.top{height: 0.9rem;border-bottom:0.02rem solid #cdcdcd;}
	.content_item{height: 1.02rem;background: #FFFFFF;padding-left: 0.24rem;padding-top: 0.28rem;border-bottom: 0.02rem solid #e5e5e5; font-size: 0.26rem;}
	.content_item p{width: 0.47rem;height: 0.47rem;float: left;}
	.content_item a{padding-left: 0.2rem;line-height: 0.48rem;}
</style>