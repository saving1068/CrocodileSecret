<template>
	<div class="container" :style="bg">
		<navbarbase :title="title"  :left="'back'"  @isLeft="onClickLeft" ></navbarbase>
		<div>
			<div class="title">
				<!--<div class="shade">
					<div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;width: 2rem;height: 0.8rem;color: #FFFFFF;text-align: center;margin: auto;">
						<p style="font-size: 0.42rem;">姐言妹语</p>
					<p style="font-size: 0.2rem;">看姐妹怎么说</p>
					</div>
				</div>-->
				<img :src="title_img"/>
			</div>
			<div class="content">
				<div class="tab">
					<li :class="[tabIndex==0?'active':'']" @click="tab(0)">热门</li>
					<li :class="[tabIndex==1?'active':'']" @click="tab(1)">最新</li>
					<div class="bottom"  :style="bottomStyle"></div>
				</div>
				<div class="tab-content" v-if="tabIndex==0" v-for="(v,i) in talkList">
					<div class="tab-content-val" @click="goDetails('Details',v.id)">
						<div class="tab-content-val-top" >
							<div class="tab-content-val-top-1">
								<img :src="v.authorImgPath"/>
							</div>
							<p class="tab-content-val-top-2">
								{{v.author}}
							</p>
						</div>
						<div class="tab-content-val-middle">
							<a>{{v.title}}</a>
							<p>{{v.summery}}</p>
						</div>
						<div class="tab-content-val-img">
							<img :src="v.imagePath"/>
						</div>
					</div>
				</div>
				<div class="tab-content" v-if="tabIndex==1" v-for="(v,i) in talkList">
					<div class="tab-content-val" @click="goDetails('Details',v.id)">
						<div class="tab-content-val-top">
							<div class="tab-content-val-top-1">
								<img :src="v.authorImgPath"/>
							</div>
							<p class="tab-content-val-top-2">
								{{v.author}}
							</p>
						</div>
						<div class="tab-content-val-middle">
							<a>{{v.title}}</a>
							<p>{{v.summery}}</p>
						</div>
						<div class="tab-content-val-img">
							<img :src="v.imagePath"/>
						</div>
					</div>
				</div>
			</div>
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
			window.scrollTo(0, 0)
			this.getAdList()
			this.getArticleList()
		},
		data(){
			return{
				bg:{
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
				},
				title:'姐言妹语',
				tabIndex:0,
				talkList:[
					{
						person_img:require("../../assets/service/3x/service_img_ai@3x.png"),
						name:"美大星",
						title:"成为鳄鱼代言人，开启了自给自足的大学生活",
						talk_text:"成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活",
						img:require('../../assets/home/首页_banner_3.png')
					},
					{
						person_img:require("../../assets/service/3x/service_img_ai@3x.png"),
						name:"派大星",
						title:"成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活",
						talk_text:"成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活成为鳄鱼代言人，开启了自给自足的大学生活",
						img:require('../../assets/home/首页_banner_5.png')
					}
				],
				ifHot:1,
				title_img:""
			}
		},
		methods:{
			goDetails(text,item){
				if(text == "Details"){
					this.$router.push({name:"Details",query:{id:item}})
				}
			},
			tab(num){
				this.tabIndex=num;
				if(this.tabIndex==0){
					console.log(1)
					this.ifHot =1;
					this.getArticleList()
				}else if(this.tabIndex==1){
					console.log(2)
					this.ifHot =2;
					this.getArticleList()
				}
			},
			onClickLeft(data){
				this.$router.go(-1)
			},
			getArticleList(){
				this.$Api.getArticleListDate(this.ifHot,8,1,20).then((res)=>{
					console.log(res)
					this.talkList = res.q.articles
					for(var i=0;i<this.talkList.length;i++){
						if(this.talkList[i].authorImgPath==""){
							this.talkList[i].authorImgPath=require("../../assets/placeholder_100x100.png")
						}
					}
					
				})
			},
			getAdList(){
				this.$Api.getAdList(11).then((res)=>{
					console.log(res)
					this.title_img = res.q.ads[0].imagePath
				})
			}
		},
		computed:{
			bottomStyle(){
				if(this.tabIndex==0){
					return {
						"left":"0%"
					}
				}else if(this.tabIndex==1){
					return {
						"left":"50%"
					}
				}
			},
		},
	}
</script>
<style type="text/css" scoped="scoped">
	.container{padding:0.92rem 0 0;}
	img{
		width: 100%;
		height: 100%;
	}
	.top-left{
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin-left: 0.24rem;
	}
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
	.tab{width: 100%;height: 0.88rem;list-style: none;position: relative;border-bottom: 0.01rem solid #d6d6d6;background: #FFFFFF;}
	.tab>li{width:50%;font-size: 0.3rem;text-align: center;line-height: 0.88rem;float: left;color: #333333;}
	.tab>.active{color: #e6bf6b;}
	.tab>.bottom{width: 50%;height: 0.04rem;background: #e6bf6b;position: absolute;bottom: -0.015rem;left: 12%;transition: 0.5s;}

	.tab-content{
		/*height: 6.5rem;*/
		background: #FFFFFF;
		padding:0.35rem 0.25rem;
		margin-bottom: 0.25rem;		
	}
	.tab-content-val{
		width: 100%;
		/*height: 6.5rem;*/
		/*padding-top: 0.35rem;*/
		/*background: skyblue;*/
	}
	.tab-content-val-top{
		width: 100%;
		height:0.84rem;
	}
	.tab-content-val-top-1{
		width: 0.84rem;
		height: 100%;
		/*background: springgreen;*/
		float: left;
		border-radius:50%;
		overflow: hidden;
	}
	.tab-content-val-top-2{
		float: left;
		font-size: 0.28rem;
		line-height: 0.8rem;
		margin-left: 0.3rem;
	}
	.tab-content-val-middle{
		font-size: 0.3rem;
		margin-top: 0.3rem;
	}
	.tab-content-val-middle a{
		font-weight: 550;
	}
	.tab-content-val-middle p{
		font-size: 0.28rem;
		color: #666666;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.tab-content-val-img{
		margin-top: 0.3rem;
		width: 100%;
		height: 3.24rem;
		/*background: coral;*/
	}
</style>