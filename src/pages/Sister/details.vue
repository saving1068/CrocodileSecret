<template>
	<div class="container">
		<navbarbase :title="title"  :right="'share'" :left="'back'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		
		<div class="con">
			<h3 class="titleH">{{res_data.title}}</h3>
			<img class="con_img" :src="res_data.converedImageUrl"/>
			<p class="com_p" v-html="res_data.content"></p>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		created(){
			this.getArticleDetails()
		},
		data(){
			return{
				title:"咨讯详情",
				res_data:"",
				id:this.$route.query.id,//文章ID
				
			}
		},
		methods:{
			onClickLeft(data){
				this.$router.go(-1)
			},
			onClickRight(data){
				if(this.$store.state.isLogin) {
					var obj = {
						shareType: 2,
						mpPath: '/pages/ArticleDetails/ArticleDetails?id=' + this.$route.query.id+"&shareBy="+this.res_data.shareBy,
						shareTitle: this.res_data.title,
						mpUserName:"gh_0990137c737d",
						shareContent: this.res_data.title,
						shareImage: this.res_data.imagePath
					}
					console.log(obj)
					this.$call.invokeShare(obj)
				} else {
					this.$call.invokeLogin({})
				}

			},
			getArticleDetails(){
				console.log(this.$store.state.isLogin)
				if(this.$store.state.isLogin){
					this.$Api.getArticleDetailsDate(this.id,localStorage.getItem("sessionId")).then((res)=>{
						this.res_data = res.q.article
						console.log(res)
					})
				}else{
					this.$Api.getArticleDetailsDate(this.id).then((res)=>{
						this.res_data = res.q.article
						console.log(res)
					})
				}
				
			},
		}
	}
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0.24rem;overflow: hidden;padding-bottom: 0.96rem;}
	
	.titleH{font-size: 0.3rem;font-weight: 550;padding: 0.2rem 0;}
	.com_p{font-size: 0.3rem;color: #333333;padding: 0.2rem 0;}
	.con_img{width: 100%;height: 4rem;}
	
</style>
