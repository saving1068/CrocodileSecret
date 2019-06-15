<template>
	<div id="tabbar">
		<van-tabbar v-model="active">
			<van-tabbar-item icon="shop" :to="{ name : 'Index'}" replace>
				<span :class="[ active==0?'tabText':'']">首页</span>
				<template slot="icon" slot-scope="props">
		      <img :src="props.active ? icons[0].active : icons[0].normal" />
		    </template>
			</van-tabbar-item>
			<van-tabbar-item icon="chat" :to="{ name : 'Allgoods'}" replace>
				<span :class="[ active==1?'tabText':'']">全部商品</span>
				<template slot="icon" slot-scope="props">
		      <img :src="props.active ? icons[1].active : icons[1].normal" />
		    </template>
			</van-tabbar-item>
			<van-tabbar-item icon="records" :to="{ name : 'Qecode'}" replace>
				<span :class="[ active==2?'tabText':'']">我的二维码</span>
				<template slot="icon" slot-scope="props">
		      <img :src="props.active ? icons[2].active : icons[2].normal" />
		    </template>
			</van-tabbar-item>
			<van-tabbar-item icon="gold-coin" @click="go">
				<span :class="[ active==3?'tabText':'']">客服</span>
				<template slot="icon" slot-scope="props">
		      <img :src="props.active ? icons[3].active : icons[3].normal" />
		    </template>
			</van-tabbar-item>
			<van-tabbar-item icon="gold-coin" :to="{ name : 'My'}" replace>
				<span :class="[ active==4?'tabText':'']">我的</span>
				<template slot="icon" slot-scope="props">
		      <img :src="props.active ? icons[4].active : icons[4].normal" />
		    </template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default { 
		name: 'tabbar',
		watch:{
			'$route' (to,from){
				this.tabInit()
			},
			'active'(){
				 if(this.active==2){
					if(!this.$store.state.isLogin){
					  
						this.$call.invokeLogin({})
						
					}
					
				}
				
				
				
				
				if(this.active!=3){
					this.aa = this.active
				}
			}
		},
		data() {
			return {
				aa:0,
				active: 0,
				icons: [
				{
	        normal: require('../../assets/common/3x/common_btn_home_normal@3x.png'),
	        active: require('../../assets/common/3x/common_btn_home_pressed@3x.png')
	     	},
				{
	        normal: require('../../assets/common/3x/common_btn_items_normal@3x.png'),
	        active: require('../../assets/common/3x/common_btn_items_pressed@3x.png')
	     	},
				{
	        normal: require('../../assets/common/3x/common_btn_qr_code_normal@3x.png'),
	        active: require('../../assets/common/3x/common_btn_qr_code_pressed@3x.png')
	     	},
				{
	        normal: require('../../assets/common/3x/common_btn_service_normal@3x.png'),
	        active: require('../../assets/common/3x/common_btn_service_pressed@3x.png')
	     	},
	     		{
	        normal: require('../../assets/common/3x/common_btn_my_normal@3x.png'),
	        active: require('../../assets/common/3x/common_btn_my_pressed@3x.png')
	     	},
				]
			}
		},
		created(){
			this.tabInit()
		},
		methods:{
			tabInit(){
				let routerName = this.$route.name
				switch (routerName){
					case 'Index':
						this.active = 0
						break;
					case 'Allgoods':
						this.active = 1
						break;
					case 'Qecode':
						this.active = 2
						break;
				
					case 'My':
						this.active = 4
						break;
					default:
						break;
				}
			},
			go(){
				this.active=this.aa
				
				if(this.$store.state.isLogin){
					this.$call.invokeImHelper({})
				}else{
					this.$call.invokeLogin({})
				}
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	.van-tabbar-item{
		color: #ccc;
	}
	.tabText{
		color: #e6bf6b;
	}
</style>