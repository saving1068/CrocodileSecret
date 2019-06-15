<template>
	
	
	<div >
<!--		<navbarbase :title="title"  ></navbarbase>-->
		
<div :style="backgroundStyle">
		<div class="content" v-html="content">
			<!--<div class="content_top">
				<p class="title">亲爱的美丽领吧用户，我们目前支持3种提现方式：</p>
				<ul class="mode">
					<li>1.提现至微信钱包</li>
					<li>2.提现至银行卡</li>
					<li>3.提现至支付宝账户余额</li>
				</ul>
			</div>
			<div class="content_middle">
				<div class="content_middle_val">
					<p class="title">请的提现之前了解规则：</p>
					<ul class="mode">
						<li>1.提现至微信钱包</li>
					</ul>
				</div>
			</div>
			<div class="content_bottom">
				<p>
					您的美丽领吧账号需要与您的微信绑定，一个账号仅可对应一个微信账号。
				</p>
				<li class="content_bottom_item">
					<p>1</p>
					<a>请确保微信已开通钱包功能。您可以登录微信-【我】-【钱包】后按照微信的提示进行操作即可。</a>
				</li>
				<li class="content_bottom_item">
					<p>2</p>
					<a>请确保微信用户是实名用户，美丽领吧不支持给微信非实名用户打款。（如何成为微信实名用户？如果您还不是实名用户，微信会实时提醒您进行实名制认证，请根据微信提示进行操作即可）</a>
				</li>
			</div>-->
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
			
				
				titleName:'back',
				title:"提现细则",
				content:"",
				textTitle:""
			}
		},
		created(){
			this.getData()
		},
		computed:{
			backgroundStyle(){
				return {
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
//					"padding-top":"0.92rem",
//					"box-sizing":"border-box"
				}
			}
			
			
		},
		methods:{
		getData(){
				this.$Api.getQuerySetting(this.title).then((res)=>{
					console.log(res)
					if(res.q.s==0){
						
						this.$Api.getArticleDetailsDate(res.q.settings.value).then((res)=>{
							console.log(res)
							if(res.q.s==0){
								this.content=res.q.article.content
this.textTitle=res.q.article.title
								
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
li{
	list-style: none;
}
.top{height: 0.9rem;border-bottom:0.02rem solid #cdcdcd;}
.content_top{overflow: hidden;background: #FFFFFF;padding: 0.2rem 0.41rem;}
.title{font-size: 0.32rem;letter-spacing: 0.02rem;}
.mode{margin: 0.28rem auto;font-size: 0.26rem;color:#E6BF6B;}
.mode li{margin-bottom: 0.28rem;letter-spacing: 0.01rem;}
.content_middle{margin-top: 0.22rem;overflow: hidden;background: #FFFFFF;padding: 0.2rem 0rem 0 0.41rem;}
.content_middle_val{border-bottom: 0.01rem solid #E5E5E5}
.content_bottom{padding-top: 0.28rem;font-size: 0.26rem;color: #666666;line-height: 0.4rem;overflow: hidden;background: #FFFFFF;padding: 0.2rem 0.41rem;}
.content_bottom_item{margin-top: 0.3rem;margin-bottom: 0.3rem;overflow: hidden;}
.content_bottom_item p{width: 0.28rem;height: 0.28rem;border-radius: 50%;background: #E6BF6B;text-align: center;line-height: 0.28rem;font-size: 0.22rem;color: #FFFFFF;float: left;}
.content_bottom_item a{display: block;float: left;width: 6.14rem;font-size: 0.25rem;margin-top: -0.05rem;padding-left: 0.1rem; color: #000000;}
</style>