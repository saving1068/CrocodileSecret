<template>
	<div>
		<div class="top">
			<navbarbase :title="title" :left="'back'" :right="'share'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>
		<div class="content">
			<p class="title">{{article.title}}</p>
			<div v-html="article.content"></div>
			<img :src="article.converedImageUrl"/>
			<p>{{article.summery}}</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		data(){
			return{
				title:"美丽领吧",
				article:{},
				id:this.$route.query.id
			}
		},
		created(){
			console.log("safe")
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
				this.$Api.getArticleDetailsDate(this.id).then((r)=>{
					if(r.q.s == 0){
						this.article = r.q.article
						
					}
				})
			}
		}
	}
</script>
<style type="text/css" scoped="scoped">
img{
	width: 100%;
	height: 100%;
}
	.top{
		width: 100%;
		height: 0.9rem;
		background: white;
		text-align: center;
		line-height: 0.9rem;
		border-bottom: 0.01rem solid #CCCCCB;
		position: fixed;
		top: 0;
	}
	.top-left{
		float: left;
		width: 0.18rem;
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
		padding: 0.9rem 0.3rem;
	}
	
	p{
		font-size: 0.35rem;
		padding: 0.15rem 0;
	}
	.title{
		text-align: center;
		padding-top: 0.15rem;
	}
	img{
		margin: 0.15rem 0;
	}
</style>