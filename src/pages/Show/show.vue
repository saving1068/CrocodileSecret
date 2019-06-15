<template>
	<div class="container">
		<navbarbase :title="title"  :left="'back'" @isLeft="onClickLeft"></navbarbase>
		<div style="padding-top: 0.9rem;">
			<div class="title">
				<!--<div class="shade">
					<div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;width: 4rem;height: 0.8rem;color: #FFFFFF;text-align: center;margin: auto;">
						<p style="font-size: 0.42rem;">鳄鱼秀场</p>
					<p style="font-size: 0.2rem;">鳄鱼和您一起美颜</p>
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
				<div class="tab_content">
					<div class="list" v-if="tabIndex==0"  v-for="(v,i) in list_1" @click="goDetails(v.id)">
						<div class="list-img">
							<img :src="v.imagePath" />
						</div>
						<div class="list_text">
							<div class="list_tex_val">
								<a>{{v.title}}</a>
								<p class="hoveP">{{v.summery}}</p>
							</div>
							<div class="look">
								<i>
									<img src="../../assets/home/home_icon_eye@2x.png"/>
								</i>
								<p>{{v.praiseNum}}</p>
							</div>
						</div>
					</div>
					<div class="list" v-if="tabIndex==1" v-for="(v,i) in list_1" @click="goDetails(v.id)"> 
						<div class="list-img">
							<img :src="v.imagePath" />
						</div>
						<div class="list_text">
							<div class="list_tex_val">
								<a>{{v.title}}</a>
								<p class="hoveP">{{v.summery}}</p>
							</div>
							<div class="look">
								<i>
									<img src="../../assets/home/home_icon_eye@2x.png"/>
								</i>
								<p>{{v.praiseNum}}</p>
							</div>
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
				title:'美丽秀场',
				tabIndex:0,
				list_1:[],//数据列表
				ifHot:1,
				title_img:""//顶部图片
			}
		},
		methods:{
			goDetails(item){
				this.$router.push({name:"Details",query:{id:item}})
				this.PraiseSwitch(item);
			},
			tab(num){
				this.tabIndex=num;
				if(this.tabIndex==0){
					this.ifHot =1;
					this.getArticleList()
				}else if(this.tabIndex==1){
					this.ifHot =2;
					this.getArticleList()
				}
			},
			onClickLeft(data){
				this.$router.go(-1)
			},
			getArticleList(){
				this.$Api.getArticleListDate(this.ifHot,9,1,20).then((res)=>{
					this.list_1 = res.q.articles
				})
			},
			getAdList(){
				this.$Api.getAdList(12).then((res)=>{
					this.title_img = res.q.ads[0].imagePath
				})
			},
			PraiseSwitch(id){
				this.$Api.PraiseSwitch(1,1,id).then((r)=>{
					if(r.q.s == 0){
						console.log('调用文章已读接口')
					}
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
		width: 0.32rem;
		height: 0.32rem;
		margin-left: 0.24rem;
	}
.title{
		width: 100%;
		height: 3.64rem;
		background: url(../../assets/home/banner_2.png) no-repeat;
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
	.tab{width: 100%;height: 0.88rem;list-style: none;position: relative;border-bottom: 0.01rem solid #d6d6d6;}
	.tab>li{width:50%;font-size: 0.3rem;text-align: center;line-height: 0.88rem;float: left;color: #333333;}
	.tab>.active{color: #e6bf6b;}
	.tab>.bottom{width: 50%;height: 0.04rem;background: #e6bf6b;position: absolute;bottom: 0.01rem;left: 12%;transition: 0.5s;}
	
	.list{
		width: 100%;
		height: 2.43rem;
		margin-bottom: 0.3rem;
		padding-top: 0.3rem;
		padding-left: 0.2rem;
		overflow: hidden;
		border-bottom: 0.02rem solid #F5F5F5;
	}
	.list-img{
		width: 2.64rem;
		height: 1.84rem;
		/*background: cadetblue;*/
		float: left;
	}
	.list_text{
		width: 4.2rem;
		margin-left: 0.2rem;
		float: left;
		font-size: 0.26rem;
		height:1.82rem;
		/*background: seagreen;*/
	}
	.list_tex_val{height: 1.5rem;overflow : hidden;}
	.hoveP{
		width: 100%;
		margin-top: 0.05rem;
		color: #666666;
		font-size: 0.24rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.look{
		/*padding-top: 0.2rem;*/
		height: 0.22rem;
		color: #666666;
	}
	.look i{
		width: 0.4rem;
		height: 0.4rem;
		float: left;
		margin-top: -0.07rem;
	}
	.look p{margin:0 !important;padding-left: 0.1rem;}
</style>