<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>
		<div class="letter_div">
			<div class="content" v-html="content">
				
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
		created(){
			this.$Api.getQuerySetting("致用户的一封信").then((res)=>{
				console.log(res)
				this.value = res.q.settings.value
				
			})
			var that = this
			setTimeout(function(){
				console.log(that.value)
				that.getHtml(that.value)
			},100)
		},
		data(){
			return{
				title:"美丽领吧",
				value:0,
				content:""
			}
		},
		methods:{
			onClickLeft(data){
				this.$router.go(-1)
			},
			getHtml(id){
				this.$Api.getArticleDetailsDate(id).then((res)=>{
					console.log(res)
					this.content = res.q.article.content
				})
			}
		}
	}
	
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0rem 0;}
	.letter_div{width: 100%;}
	.letter_img{width: 100%;height: 59.13rem;}
	
</style>