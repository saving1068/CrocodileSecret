<template>
	<div>
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>
		<div class="conter">
 
			<van-cell-group>

				<!--头像-->
				<van-cell is-link class="danger_top" @click="headportrait">
					<template value="conters">
						<span class="van-cell-text"><img class="danger_img" :src="user.imagePath"/></span>
					</template>
					<template slot="title">
						<span class="van-cell-text">头像</span>
					</template>
				</van-cell>

				<!--姓名-->
				<van-cell @click="nickname" title="姓名" :value="users.name" is-link/>

				<!--性别-->
				<van-cell @click="sexclick" title="性别" :value="sex" is-link/>

				<!--手机号码-->
				<van-cell title="手机号码" :value="user.mobile" />

				<!--是否会员-->
				<van-cell>
					<template value="conters">
						<i class="vip" v-if="user.lv==2"></i>
						<i class="no_vip" v-if="user.lv==1"></i>
						<span class="van-cell-text">{{member}}</span>
					</template>
					<template slot="title">
						<span class="van-cell-text" v-if="user.lv==2||user.lv==1">会员</span>
					</template>
				</van-cell>

			</van-cell-group>

			<div class="btn_s" @click="lgout">退出登录</div>

		</div>

		<!--头像蒙板-->
		<van-actionsheet v-model="headportraits" :actions="allheadportrait" cancel-text="取消" />

		<!--修改昵称-->
		<van-dialog v-model="names" show-cancel-button @confirm="affirm" title="昵称">
			<van-field v-model="user.name" type="texts" />
		</van-dialog>

		<!--头像蒙板-->
		<van-actionsheet v-model="allsex" :actions="allsexs" cancel-text="取消" />

	</div>

</template>

<script>
	import navbarbase from '../../../components/Navbarbase/Navbarbase'
		import { Toast } from 'vant';
	export default {
		components: {
			navbarbase
		},

		data() {
			return {
				title: "我的资料",
				user: {
					age:'',
					imagePath:''
					
				}, //个人信息
				avatar: this.$avatar,
				member: '', //会员等级
				sex: 0, //性别
				headportraits: false, //头像蒙板
				allheadportrait: [{ //头像切换选择
						name: '从相册选择',
						callback: this.photograph
					},
					{
						name: '拍照',
						callback: this.photoalbum
					}
				],
				names: false, //昵称
				texts: '',
				allsex: false, //性别
				allsexs: [{ //性别切换选择
						name: '男',
						callback: this.man
					},
					{
						name: '女',
						callback: this.woman
					}
				],
				users: { //个人信息修改
					'name': '',
					'sex': 0,
				},
			}
		},
		created() {
			this.UserDetails();
		},
		computed: {
			getAvatar() {

				return this.$store.state.avatar

			}
		},
		watch: {
			getAvatar: function(a, b) {
                 
                 
				if(a != "") {
					
					this.user.imagePath = a

				}

			}

		},
		methods: {
			onClickLeft(data) {
				this.$router.go(-1)
			},
			onRead(file) {
				console.log(file)
			},
			lgout() {

				this.removeSessionId().then(() => {
					var obj = {}
					this.$call.invokeLogout(obj)

				})
				

			},
			removeSessionId: async function() {
				await this.remove()

			},
			remove() {
				return new Promise((resolve, reject) => {
					var timer = setInterval(removeSession, 50);

					function removeSession() {
						localStorage.removeItem("sessionId")
						if(!localStorage.getItem('sessionId')) {

							clearInterval(timer);
							resolve()
						}
					}
				})

			},

			UserDetails() { //查询个人信息
				this.$Api.UserDetails(0).then((res) => {
					if(res.q.s == 0) {
						this.user.age = res.q.user.age
						this.user.imagePath = res.q.user.imagePath
						this.user.birthday = res.q.user.birthday
						this.user.lv = res.q.user.lv
						this.user.mobile = res.q.user.mobile
						this.user.name = res.q.user.name
						this.users.name=res.q.user.name
						this.user.sex = res.q.user.sex
						this.user.status = res.q.user.status
						console.log(this.user.imagePath)
                        if(this.user.imagePath==undefined||this.user.imagePath==""){
                        	
                        	this.user.imagePath=require("../../../assets/my/3x/my_img_avatar_big@3x.png")
                        }
						if(this.user.lv == 1) { //设置普通用户或者VIP用户
							this.member = '普通用户'
						} else if(this.user.lv == 2) {
							this.member = 'VIP用户'
						}else if(this.user.lv == 0) {
							this.member = '游客'
						}

						if(this.user.sex == 0) { //性别
							this.sex = '未知'
						} else if(this.user.sex == 1) {
							this.sex = '男'
						} else if(this.user.sex == 2) {
							this.sex = '女'
						}

					}
				})
			},
			headportrait() { //点击头像时触发头像设置蒙板
				//			this.headportraits = true;
				var obj = {
					type: 0,
					edit: true
				}

				this.$call.invokeTakePhoto(obj)
			},
			photograph() { //点击    “从相册选择”   调用函数
				console.log('从相册选择')
			},
			photoalbum() { //点击   “拍照”   调用函数
				console.log('拍照')
			},
			nickname() { //修改昵称
				this.names = true;
			},
			affirm() { //昵称修改确认按钮调用事件
				var tiem =  this.user.name.replace(/\s+/g,""); 
				
				var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    	regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				if( regEn.test(tiem) || regCn.test(tiem)||tiem.length == 0){
					Toast('姓名不能为特殊字符');
					return;
				}else{
					this.users = {
					'name': tiem,
					'sex': this.user.sex,
				}
					
					this.$Api.UserUpdate(this.users).then((res) => {
					if(res.q.s == 0) {
						this.UserDetails();
					}
				})
				}
				
				
				console.log('昵称', this.texts)
			},
			sexclick() { //性别修改调用函数
				this.allsex = true;
			},
			man() { //性别选择  “男”  执行函数
				this.user = {
					'name': this.user.name,
					'sex': 1,
				}
				this.$Api.UserUpdate(this.user).then((res) => {
					if(res.q.s == 0) {
						setTimeout(() => {
							this.allsex = false;
						}, 100)
						this.UserDetails();
					}
				})
				console.log('男')
			},
			woman() { //性别选择  “女”  执行函数
				this.user = {
					'name': this.user.name,
					'sex': 2,
				}
				this.$Api.UserUpdate(this.user).then((res) => {
					if(res.q.s == 0) {
						setTimeout(() => {
							this.allsex = false;
						}, 100)
						this.UserDetails();
					}
				})
				console.log('女')
			},
		}

	}
</script>

<style scoped="scoped">
	.conter {
		padding: 0.82rem 0 0.78rem;
	}
	
	.danger_top {
		line-height: 1.21rem;
	}
	
	.danger_img {
		width: 1.21rem;
		height: 1.21rem;
		border-radius: 50%;
	}
	
	.vip {
		display: inline-block;
		width: 0.28rem;
		height: 0.28rem;
		background-image: url(../../../assets/common/common_btn_qr_code_pressed@2x.png);
		background-size: 100% 100%;
		vertical-align: middle;
	}
	
	.no_vip {
		display: inline-block;
		width: 0.28rem;
		height: 0.28rem;
		background-image: url(../../../assets/common/common_btn_qr_code_normal@2x.png);
		background-size: 100% 100%;
		vertical-align: middle;
	}
	
	.btn_s {
		width: 6.95rem;
		height: 0.78rem;
		background-color: #212121;
		color: #fff;
		text-align: center;
		line-height: 0.78rem;
		position: fixed;
		bottom: 0.76rem;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	.van-actionsheet {
		background-color: #d2d2d3;
	}
</style>