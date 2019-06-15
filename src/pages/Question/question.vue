<template>
	<div :style="bg" class="container">
		<div class="top">
			<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>
		</div>
		<div>
			<div class="title">
				<!--<div class="shade">
					<div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;width: 4rem;height: 0.8rem;color: #FFFFFF;text-align: center;margin: auto;">
						<p style="font-size: 0.42rem;">鳄鱼问答</p>
					<p style="font-size: 0.2rem;">常见问题汇总,更多问题请咨询客服</p>
					</div>
				</div>-->
				<img :src="title_img"/>
			</div>
			<div class="content">
				<div class="tab">
					<li :class="[tabIndex==12?'active':'']" @click="tab(12)">使用指南</li>
					<li :class="[tabIndex==13?'active':'']" @click="tab(13)">代言福利</li>
					<li :class="[tabIndex==14?'active':'']" @click="tab(14)">产品说明</li>
					<div class="bottom"  :style="bottomStyle"></div>
				</div>
				<div class="tab-content" v-for="(v,i) in list_1" v-if="tabIndex==12" @click="goDetails('Details',v.id)">
					<div class="list">
						<div class="list-head">
							<div class="num">
								{{i+1}}
							</div>
							<div class="list_title">
								{{v.title}}
							</div>
						</div>
						<div class="list_content">
							{{v.summery}}
						</div>
					</div>
				</div>
				<div class="tab-content" v-for="(v,i) in list_1" v-if="tabIndex==13" @click="goDetails('Details',v.id)">
					<div class="list">
						<div class="list-head">
							<div class="num">
								{{i+1}}
							</div>
							<div class="list_title">
								{{v.title}}
							</div>
						</div>
						<div class="list_content">
							{{v.summery}}
						</div>
					</div>
				</div>
				<div class="tab-content" v-for="(v,i) in list_1" v-if="tabIndex==14" @click="goDetails('Details',v.id)">
					<div class="list">
						<div class="list-head">
							<div class="num">
								{{i+1}}
							</div>
							<div class="list_title">
								{{v.title}}
							</div>
						</div>
						<div class="list_content">
							{{v.summery}}
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
			this.getArticleList()
			this.getAdList()
		},
		data(){
			return{
				title:'美丽问答',
				tabIndex:12,
				list_1:[
					{
						title:"美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？",
						value:"美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？"
					},
					{
						title:"美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？",
						value:"美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？美丽领吧APP是用什么做的？"
					}
				],
				bg:{
					'background':"#f5f5f5",
					'min-height': document.body.clientHeight/50 +"rem",
				},
				title_img:"",
			}
		},
		methods:{
			goDetails(text,item){
				if(text == "Details"){
					this.$router.push({name:"Details",query:{id:item}})
				}
			},
			tab(num){
				this.tabIndex=num
				if(this.tabIndex==12){
					console.log(1)
					this.getArticleList()
				}else if(this.tabIndex==13){
					console.log(2)
					this.getArticleList()
				}else if(this.tabIndex==14){
					console.log(3)
					this.getArticleList()
				}
			},
			onClickLeft(data){
				this.$router.go(-1)
			},
			getArticleList(){
				console.log(this.tabIndex)
				this.$Api.getArticleListDate(2,this.tabIndex,1,20).then((res)=>{
					if(res.q.s==0){
						this.list_1 = res.q.articles
						
					}
//					console.log(res)
				})
			},
			getAdList(){
				this.$Api.getAdList(13).then((res)=>{
//					console.log(res)
					this.title_img = res.q.ads[0].imagePath
				})
			}
		},
		computed:{
			bottomStyle(){
				if(this.tabIndex==12){
					return {
						"left":"0%"
					}
				}else if(this.tabIndex==13){
					return {
						"left":"33%"
					}
				}else if(this.tabIndex==14){
					return {
						"left":"67%"
					}
				}
			},
		},
	}
</script>
<style type="text/css" scoped="scoped">
	img{
		width: 100%;
		height: 100%;
	}
	.top{
		width: 100%;
		height: 0.92rem;
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
	
	.tab{width: 100%;height: 0.88rem;list-style: none;position: relative;border-bottom: 0.01rem solid #d6d6d6;margin-top: 0.2rem;background: #FFFFFF;}
	.tab>li{width:33.33%;font-size: 0.3rem;text-align: center;line-height: 0.88rem;float: left;color: #333333;}
	.tab>.active{color: #e6bf6b;}
	.tab>.bottom{width: 33%;height: 0.04rem;background: #e6bf6b;position: absolute;bottom: 0.01rem;left: 12%;transition: 0.5s;}
	
	.tab-content{
		/*width: 7.2rem;*/
		/*margin: 0.28rem auto;*/
		padding-top: 0.28rem;
		padding-left: 0.28rem;
		overflow: hidden;
		background: #FFFFFF;
		margin-bottom: 0.28rem;
	}
	.num{
		width: 0.44rem;
		height: 0.44rem;
		border-radius: 50%;
		background: #e6bf6b;
		float: left;
		text-align: center;
		line-height: 0.44rem;
		color: #FFFFFF;
	}
	.list_title{
		width: 6.1rem;
		float: left;
		margin-left: 0.2rem;
		font-size: 0.3rem;
	}
	.list-head{
		overflow: hidden;
	}
	.list_content{
		width: 5.88rem;
		margin-left: 0.65rem;
		margin-top: 0.32rem;
		color: #666666;
		font-size: 0.28rem;
	}
</style>