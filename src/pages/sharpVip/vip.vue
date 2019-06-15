<template>
	<div class="container">
		<div class="top">
			<navbarbase :title="title"  :left="'back'" @isLeft="onClickLeft"></navbarbase>
		</div>
		
		<div class="title">
				<img :src="title_head_Img"/>
		</div>
		<div class="title_val">
			<p class="title_font">
				{{titleSummery}}
			</p>
			<div class="know" @click="kNow(textId)">
				点击了解更多VIP详情
			</div>
		</div>
		<ul class="list">
			<li v-for="(v,i) in list" @click="toDetails(v.spuId,v.skuId,v.type)">
				<div class="list_val">
					<div class="list_val_img">
						<img :src="v.imagePath"/>
					</div>
					<div class="list_val_text">
						<p class="text_p_t">{{v.name}}</p>
						<a class="text_a_b">{{v.summery}}</a>
					</div>
					<div class="list_val_success">
						<a v-if="v.isContinued==1">已开通VIP</a>
						<a class="list_val_success_active" v-if="v.isContinued==0">成为VIP</a>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default{
		components: {
			navbarbase
		},
		created(){
			
			window.scroll(0,0)
			this.getArticleList()
			this.getArticleDetails()
			this.getGoodsList()
		},
		data(){
			return{
				titleName:'back',
				title:"超值VIP",
				list:[
					{
						img:require('../../assets/home/A0001_首页_001.png'),
						name:"醒肤净颜洁面乳",
						series:"精华肌底眼部凝霜——鳄鱼系列精华肌底眼部凝霜——鳄鱼系列",
						ifSuccess:"已开通VIP"
					},
					{
						img:require('../../assets/home/A0001_首页_001.png'),
						name:"醒肤净颜洁面乳",
						series:"精华肌底眼部凝霜——鳄鱼系列精华肌底眼部凝霜——鳄鱼系列",
						ifSuccess:"已开通VIP"
					},
					{
						img:require('../../assets/home/A0001_首页_001.png'),
						name:"醒肤净颜洁面乳",
						series:"精华肌底眼部凝霜——鳄鱼系列精华肌底眼部凝霜——鳄鱼系列",
						ifSuccess:"已开通VIP"
					},
				],
				title_head_Img:"",
				titleSummery:"",
				textId:0,
			}
		},
		methods:{
			onClickLeft(data){
				this.$router.go(-1)
			},
			getArticleList(){
				this.$Api.getArticleListDate(1,15,1,20).then((res)=>{
					if(res.q.s==0){
						let data = res.q.articles[0]
						this.title_head_Img= data.imagePath;
						this.titleSummery = data.summery;
						this.textId = data.id;
					}
				})
			},
			getArticleDetails(){
				this.$Api.getArticleDetailsDate(834).then((res)=>{
					console.log(res)
				})
			},
			getGoodsList(){
				this.$Api.getGoodsList(0).then((res)=>{
					console.log(res)
					this.list = res.q.goodses
				})
			},
			kNow(item){
				this.$router.push({name:"Details",query:{id:item}})
			},
			toDetails(spuId,skuId,num){
				this.$router.push({name:"GoodsDetail",query:{spuId:spuId,skuId:skuId,type:num}})
			}
		},
		computed:{
			titleImg(){
				return {"background":"url("+this.title_head_Img+")"}
			},
		},
	}
</script>

<style scoped="scoped">
	.top{height: 0.92rem;}
	img{width: 100%;height: 100%;}
.container{overflow: hidden;padding-bottom: 0.96rem;background: #F3F3F3;}
.title{
		width: 100%;
		height: 3.64rem;
		background: url(../../assets/home/banner_1.jpg) no-repeat;
		background-size:100% 100% ;
		position: relative;
	}
	.title .shade{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.5);
	}
.title_val{background: #FFFFFF; overflow: hidden;padding-bottom: 0.36rem;}
.title_font{width: 6.84rem;margin: 0.36rem auto;color: #333333;font-size: 0.28rem;}
.know{width: 7.06rem;height: 0.92rem;margin: 0 auto;border: 0.02rem solid #E6BF6B;border-radius: 0.1rem;color: #E6BF6B;font-size: 0.28rem;text-align: center;line-height:0.92rem;}
.list{margin-top: 0.36rem;overflow: hidden;}
.list li{width: 6.84rem;background: #FFFFFF;height:1.84rem;margin: 0 auto 0.28rem;display: flex;justify-content: center;align-items: center;border-radius: 0.1rem;}
.list_val{width: 6.6rem;height: 1.24rem;background: #FFFFFF;}
.list_val_img{width: 1.24rem;height: 1.24rem; float: left;}
.list_val_text{width: 3.84rem;padding-left: 0.2rem;padding-top:0.1rem;float: left;}
.text_p_t{overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;}
.text_a_b{overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;}
.list_val_text p{font-size: 0.3rem;}
.list_val_text a{padding-top: 0.25rem;font-size: 0.24rem;display: block;color: #666666;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
.list_val_success{width:1.52rem;height:100%;float: left;font-size: 0.24rem;text-align: center;display: flex;justify-content: center;align-items: center;}
.list_val_success a{border: 0.02rem solid #E6BF6B;height: 0.44rem;line-height: 0.44rem;color: #E6BF6B;border-radius: 0.04rem;padding: 0.02rem 0.06rem 0.02rem 0.06rem;}
.list_val_success_active{background: #E6BF6B;height: 0.44rem;line-height: 0.38rem !important;color: #FFFFFF !important; }
</style>
