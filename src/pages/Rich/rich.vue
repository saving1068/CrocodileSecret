<template>
	<div class="container">
		<navbarbase :title="title" :right="'share'" :left="'back'"  @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		
		<div class="content">
			<h3>{{article.title}}</h3>
			<img :src="article.converedImageUrl"/>
			<div v-html="article.content"></div>
			<p>{{article.summery}}</p>
		</div>
	</div>
</template>
<script type="text/javascript">
//	import { Toast } from 'vant';
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		data(){
			return{
				title:'美丽领吧',
				article:{},
				id:this.$route.query.id
			}
		},
		created(){
//			console.log(this.shareImg)
			this.getArticleDetailsDate();
		},
		methods:{
			onClickLeft(data){
				this.$router.go(-1)
			},
			onClickRight(data){
				if(this.$store.state.isLogin){
					var obj={
		  			shareType: 2,
					mpPath: '/pages/ArticleDetails/ArticleDetails?id=' + this.$route.query.id+"&shareBy="+this.article.shareBy,
					shareTitle: this.article.title,
					mpUserName:"gh_0990137c737d",
					shareContent: this.article.title,
					shareImage: this.article.imagePath
		  		}
				console.log(obj)
//				Toast(obj);
		  		this.$call.invokeShare(obj)
				}else{
					this.$call.invokeLogin({})
				}
			},
			getArticleDetailsDate(){
				if(this.$store.state.isLogin){
					this.$Api.getArticleDetailsDate(this.id,localStorage.getItem("sessionId")).then((res)=>{
						this.article = res.q.article
						console.log(res)
					})
				}else{
					this.$Api.getArticleDetailsDate(this.id).then((res)=>{
						this.article = res.q.article
						console.log(res)
					})
				}
			}
		},
	}
</script>
<style type="text/css" scoped="scoped">
	.container{padding:0.92rem 0 0;}

img{
	width: 100%;
	height: 100%;
}
	.top{
		width: 100%;
		height: 0.9rem;
	}
	.top-left{
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin-left: 0.24rem;
	}
	.top-right{
		float: right;
		width: 0.35rem;
		height: 0.32rem;
		margin-right: 0.24rem;
	}
	.content{
		width: 100%;
		padding: 0 0.3rem;
	}
	h3{
		font-size: 0.35rem;
		padding: 0.15rem 0;
		text-align: center;
	}
	img{
		margin: 0.15rem 0;
	}
</style>