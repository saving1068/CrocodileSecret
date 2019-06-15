<template>
	<div>
	
		<div class="content">
			<p class="title">{{textTitle}}</p>
			<!--<div class="privacy_val">
				美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策
			</div>
			<div class="list">
				<p class="list_title">
					1.适用范围
				</p>
				<div class="list_val">
					美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策
					美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策
					美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策美丽领吧隐私政策
				</div>
			</div>
		</div>-->
		<div v-html="content"></div>
		</div>
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		created(){
			this.getData()
		},
		data(){
			return{
				title:'用户隐私',
				content:"",
				textTitle:""
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
	.top{height: 0.9rem;}
	.content{padding: 0.27rem 0.24rem;}
	.title{width: 7.02rem;height: 0.5rem;border-bottom: 0.01rem solid #000000;font-size: 0.36rem;}
	.privacy_val{width: 6.85rem;padding: 0.29rem 0;color: #333333;font-size: 0.26rem;line-height: 0.5rem;}
	.list_val{padding-top: 0.29rem;width: 6.9rem;color: #333333;font-size: 0.26rem;line-height: 0.5rem;}
</style>