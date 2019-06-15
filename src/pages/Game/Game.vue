<template>
	<div class="roudabout">
		<div style="height: .9rem;">
			<navbarbase :title="title" :left="'back'" :right="'share'" @isLeft="onClickLeft" @isRight="onClickRight"></navbarbase>
		</div>

		<div class="top_miuse" @click="ifMiuse">
			<img src="../../assets/game/home_btn_music@2x.png" :style="{'transform': `rotate(${miuseReg}deg)`}" />
			<audio v-show="miuseIcon" loop autoplay="autoplay" :src="musicPath" id="bgMusic"></audio>
			<p v-if="miuseStop"></p>
		</div>
		<div class="top_box" @click="coverShow">
			<img src="../../assets/game/home_btn_silkbag@2x.png" />
		</div>
		<div class="roudaBg">
		</div>
		<!--<img style="position: absolute;top: 5px;left: 0;width: 1.62rem; z-index: 100;" src="@/assets/select_img_logo@2x.png" alt="">-->
		<div class="container">
			<div class="round_box">
				<div class="round" :style="{'transform': `rotate(${rotateReg}deg)`}">
					<img class="bg" src="@/assets/game/home_turntable_middle@3x.png" />
					<div class="reward reward1">
						<img src="@/assets/game/home_img_Smiling@2x.png" />
						<p>谢谢参与</p>
					</div>
					<div class="reward reward3">
						<img src="@/assets/game/home_img_Smiling@2x.png" />
						<p>谢谢参与</p>
					</div>
					<div class="reward reward5">
						<img src="@/assets/game/home_img_Smiling@2x.png" />
						<p>谢谢参与</p>
					</div>
					<div class="reward reward2">
						<img src="@/assets/game/home_img_gift1@2x.png" />
						<p>二等奖</p>
					</div>
					<div class="reward reward4">
						<img src="@/assets/game/home_img_gift2@3x.png" />
						<p>三等奖</p>
					</div>
					<div class="reward reward6">
						<img src="@/assets/game/home_img_gift2@3x.png" />
						<p>一等奖</p>
					</div>
				</div>
				<img class="start" src="@/assets/game/home_turntable_top@2x.png" @click="start" />
			</div>
			<div class="a_info">
				<p>已有&nbsp;<span style="color: #FFBE04;">{{joinNum}}</span>&nbsp;人参与</p>
				<p>您今天还有&nbsp;<span style="color: #FFBE04;">{{num1}}</span>&nbsp;次抽奖机会</p>
			</div>
			<!-- <p class="change"><span>分享可获得1次额外抽奖机会</span></p>
        <div class="tips">
          <h4>活动须知</h4>
          <p>活动时间：2018年7月25日-8月31日</p>
          <p>派奖时间：2018年9月1日起15个工作日内</p>
          <p>本次活动最终解释权归好爸爸品牌官方所有</p>
        </div> -->
			<!-- <div style="height: 1rem;"></div> -->
		</div>
		<div class="popup-cover" v-show="popupShow" @click="popup">
			<div class="container_loser">
				<img src="../../assets/game/nowinning_img@2x.png" />
			</div>
			<div class="again_btn" @click="again">
				再来一次
			</div>
		</div>
		<div class="popup-cover1" v-show="winShow" @click="win">
			<div class="container_win_bg">
				<img src="../../assets/game/winning_bg_light@2x.png" />
			</div>
			<div class="container_win_Prize">
				<img src="../../assets/game/winning_img_gift@2x.png" />
			</div>
			<div class="prize_info">
				<p style="color: #FFEE20;">{{award.gradeName}}</p>
				<p>{{award.name}}</p>
			</div>
			<div class="prize_detile" @click="goToPdetile()">
				查看奖品详情
			</div>
		</div>
		<div class="popup_cover2" v-show="cover">
			<div class="popup_cover2_top">
				<div class="popup_cover2_top_left" @click="tab(0)">
					活动说明
				</div>
				<div class="popup_cover2_top_right" @click="tab(1)">
					我的奖品
				</div>
				<div class="shu"></div>
				<div class="dot" v-show="myAwards.length!=0"></div>
				<div class="bottom_line">
					<div class="bottom_line_active" :style="bottomStyle">
						<img src="../../assets/game/common_icon_select@2x.png" />
					</div>
				</div>
				<div class="popup_cover2_close" @click="cover2">
					<img src="../../assets/game/common_btn_close@2x.png" />
				</div>
			</div>
			<div class="popup_cover2_left" v-if="tabNum == 0">
				<div class="popup_cover2_left_list">
					活动奖品
				</div>
				<p class="popup_cover2_left_item" v-for="(v,i) in awards">{{v}}</p>
				<div class="popup_cover2_left_list">
					活动时间
				</div>
				<p class="popup_cover2_left_item">{{startDate}}-{{endDate}}</p>
				<div class="popup_cover2_left_list">
					主办方单位
				</div>
				<p class="popup_cover2_left_item">本次活动主办方为：</p>
				<div class="popup_cover2_left_list">
					技术支持
				</div>
				<p class="popup_cover2_left_item">页面技术由<span @click="goToAt" style="color: #FFEE20;">爱特互动（点击了解）</span>提供，技术支持方仅提供页面技术，不承担由活动引起的相关法律责任。</p>
				<div class="popup_cover2_left_list">
					活动说明
				</div>
				<p class="popup_cover2_left_item">每人每次天{{times}}次机会。点“开始”最终指针指向的即为您所中的奖品。</p>
			</div>
			<div class="popup_cover2_rigth" v-else>
				<div class="popup_cover2_rigth_item" v-for="(v,i) in myAwards" @click="goPdetile(v.code,v.status)">
					<p>{{v.awardName}}</p>
					<p>兑奖期限：{{v.deadline}}</p>
					<div class="rigt_icon">
						<img src="../../assets/game/my_btn_enter_white@2x.png" />
					</div>
					<div class="icon_2">
						<img src="../../assets/game/my_icon_exchange@2x.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		name: 'roundabout',
		components: {
			navbarbase,

		},
		data() {
			return {
				title: '参与活动赢大奖',
				tabNum: 0,
				cover: false,
				n: 100,
				timer: null,
				timer1: null,
				rotateReg: 0,
				canClick: true,
				miuseReg: 0,
				regGroup: {
					reward1: { //一等奖
						regs: 60,
						message: 1
					},
					thank1: { //第一个谢谢参与
						regs: 120,
						message: 1

					},
					reward3: { //三等奖
						regs: 180,
						message: 2
					},
					thank2: { //第二个谢谢参与
						regs: 240,
						message: 2

					},
					reward2: { //二等奖
						regs: 300,
						message: 0
					},
					thank3: { //第三个谢谢参与
						regs: 360,
						message: 3
					},
					//=0 未中 >0 中 1:珍贵奖 2:爸气奖
				},
				popupShow: false,
				isPlaying: true,
				RollingData: {},
				musicPath: "",
				award: {},
				num1: null,
				joinNum: null,
				isWin: false,
				winShow: false,
				timer3: null,
				miuseIcon: false,
				miuseStop: false,
				awards: [],
				startDate: null,
				endDate: null,
				myAwards: [],
				perReg: 0, //上一次转的度数
				totalNum: 0,
				times:0,
			}
		},
		created() {
			this.getData()
			this.timer3 = setInterval(() => {
				this.miuseReg += 360
			}, 1000)

		},
		mounted() {

		},
		computed: {
			nums() {
				return this.RollingData.surplusNum || 0
			},
			bottomStyle() {
				if(this.tabNum == 0) {
					return {
						"left": "11%"
					}
				} else {
					return {
						"left": "62%"
					}
				}
			}
		},
		beforeDestroy() {
			clearInterval(this.timer)
			clearTimeout(this.timer1)
		},
		methods: {
			goToAt(){
				console.log(111)
				window.location.href="http://m.aiitec.com";
			},
			coverShow() {
				console.log()
				this.cover = true
			},
			cover2() {
				this.cover = false
				console.log(this.cover)
			},
			onClickLeft(data) {
				this.$router.push({
					name: "My"
				})
			},
			onClickRight(data) {
				if(this.$store.state.isLogin) {
					var obj = {
						shareType: 2,
						mpPath: '/pages/test/test?shareBy=' + this.RollingData.shareBy,
						shareTitle: this.RollingData.name,
						mpUserName: "gh_0990137c737d",
						shareContent: this.RollingData.name,
						shareImage: this.RollingData.imagePath
					}
					console.log(obj)
					this.$call.invokeShare(obj)
				} else {
					this.$call.invokeLogin({})
				}
			},
			tab(num) {
				if(num == 0) {
					this.tabNum = 0
				} else {
					this.tabNum = 1
				}
			},
			ifMiuse() {
				var audio = document.getElementById('bgMusic');

				if(this.isPlaying) {
					audio.pause();
					this.isPlaying = false;
					clearInterval(this.timer3)
					this.miuseStop = true
				} else {
					audio.play();
					this.isPlaying = true
					this.timer3 = setInterval(() => {
						this.miuseReg += 360
					}, 1000)
					this.miuseStop = false
				}

			},
			popup() {
				this.popupShow = false;
			},
			win() {
				this.winShow = false;
			},
			goPdetile(code,status){
				if(status == 0){
					this.$router.push({
						name: "PrizeDetile",
						query: {
							code
						}
					})
				}else{
					Toast('该奖品已兑换');
				}
			},
			goToPdetile(e) {
				console.log(e)
				this.$router.push({
					name: "PrizeDetile",
					query: {
						code: this.award.code
					}
				})
			},
			again() {
				this.popupShow = false;

				if(this.num1 <= 0) {
					this.num1 = 0
					console.log("没有抽奖机会")
					Toast('没有抽奖机会');
				} else {
					this.start() //抽奖
				}

			},
			getData() { //活动信息
				//				console.log('获取活动信息')
				this.$Api.ActivityInfo().then(res => {
					if(res.q.s == 0) {
						this.RollingData = { ...res.q.info
						}
						this.num1 = this.RollingData.surplusNum || 0 //剩余次数
						this.joinNum = this.RollingData.joinNum || 0 //参加人数
						this.musicPath = this.RollingData.musicPath //音乐地址
						this.awards = this.RollingData.awards //活动奖品
						this.startDate = this.RollingData.startDate //活动开始时间
						this.endDate = this.RollingData.endDate //活动结束时间
						this.myAwards = this.RollingData.myAwards //该活动中自己的奖品
						this.times = res.q.times//每日抽奖次数
						console.log('获取活动信息', this.RollingData)
					}else{
						Toast(res.q.d);
					}
				})
			},
			start() { //抽奖
				//						console.log(this.num1,"剩余次数")
				if(this.num1 <= 0) {
					this.num1 = 0;
					Toast('没有抽奖机会');
				} else {
					if(this.canClick) {
						this.num1--
						this.canClick = false
						console.log('开始旋转', this.num1)
						this.$Api.BeganToDraw(this.RollingData.id).then(res => {
							if(res.q.s == 0) {
								if(res.q.isWin == 1) {
									this.isWin = true
									this.award = { ...res.q.award
									}
									console.log('fdgdsg', this.award)
								} else if(res.q.isWin == 0) {
									this.isWin = false
								}

								let mubiao
								if(this.isWin) {
									//珍贵 1 爸气 2 
									if(this.award.gradeName == '一等奖') {
										console.log("一等奖")

										mubiao = this.regGroup['reward1']['regs'] + this.rotateReg + (360 - this.perReg + 360 * 5)
										this.perReg = this.regGroup['reward1']['regs']
									} else if(this.award.gradeName == '二等奖') {
										console.log("二等奖")

										mubiao = this.regGroup['reward2']['regs'] + this.rotateReg + (360 - this.perReg + 360 * 5)
										this.perReg = this.regGroup['reward2']['regs']
									} else if(this.award.gradeName == '三等奖') {
										console.log("三等奖")

										mubiao = this.regGroup['reward3']['regs'] + this.rotateReg + (360 - this.perReg + 360 * 5)
										this.perReg = this.regGroup['reward3']['regs']
									}
								} else {
									console.log("谢谢参与")
									let random = Math.floor(Math.random() * 3) //0~2随机数
									if(random == 0) {
										mubiao = this.regGroup['thank1']['regs'] + this.rotateReg + (360 - this.perReg + 360 * 5) //谢谢参与
										this.perReg = this.regGroup['thank1']['regs']
									} else if(random == 1) {
										mubiao = this.regGroup['thank2']['regs'] + this.rotateReg + (360 - this.perReg + 360 * 5) //谢谢参与
										this.perReg = this.regGroup['thank2']['regs']
									} else if(random == 2) {
										mubiao = this.regGroup['thank3']['regs'] + this.rotateReg + (360 - this.perReg + 360 * 5) //谢谢参与
										this.perReg = this.regGroup['thank3']['regs']
									}

								}
								this.timer = setInterval(() => {
									if(mubiao) {
										this.rotateReg += 60
										console.log(this.rotateReg)
										if(this.rotateReg >= mubiao) {

											console.log(this.rotateReg)
											clearInterval(this.timer)
											
											this.timer = null
											let id
											if(this.isWin) {
												this.timer1 = setTimeout(() => {
													console.log('中奖')
													this.winShow = true
													this.canClick = true;
												}, 2500);
											} else {
												this.timer1 = setTimeout(() => {
													console.log('谢谢参与')
													this.popupShow = true
													this.canClick = true;
												}, 2500);
											}
										}
									}
								}, 50)
							}
						})

					}else{
						Toast('正在抽奖');
					}

				}

				

			},

		}
	};
</script>
<style lang="css" scoped>
	.top_miuse {
		width: .9rem;
		height: .9rem;
		position: absolute;
		top: 1.2rem;
		left: .3rem;
		z-index: 1;
		border-radius: 50%;
	}
	
	.top_miuse img {
		transition: all 1s linear;
	}
	
	.top_miuse p {
		width: 0.1rem;
		height: 0.9rem;
		background: #FFFFFF;
		position: absolute;
		top: 0;
		left: 42%;
		transform: rotate(50deg);
	}
	
	.top_box {
		width: 1.4rem;
		height: 1.4rem;
		position: absolute;
		top: 1rem;
		right: .3rem;
		z-index: 1;
	}
	
	.a_info {
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 0.36rem;
	}
	
	.a_info p:nth-of-type(1) {
		padding: 1.2rem 0 0.28rem 0;
	}
	
	.container_win_Prize {
		position: absolute;
		top: 2.5rem;
		width: 3.4rem;
		height: 3.4rem;
		left: 2.15rem;
	}
	
	.prize_info {
		position: absolute;
		bottom: 3.2rem;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 0.36rem;
	}
	
	.prize_detile {
		width: 5.2rem;
		height: 0.95rem;
		background: #41BD43;
		border-radius: 0.1rem;
		position: absolute;
		left: 1.2rem;
		bottom: 1.5rem;
		text-align: center;
		line-height: 0.95rem;
		font-size: 0.36rem;
		color: #FFFFFF;
	}
	
	.container_loser {
		position: absolute;
		top: 1rem;
		left: 1.2rem;
		width: 5.1rem;
		height: 5.4rem;
	}
	
	.again_btn {
		width: 4.5rem;
		height: 0.95rem;
		text-align: center;
		line-height: 0.95rem;
		color: #FFFFFF;
		font-size: 0.36rem;
		border-radius: 0.1rem;
		position: absolute;
		left: 1.5rem;
		top: 7.25rem;
		background: #41BD43;
	}
	
	.popup_cover2_top {
		padding: 0 .30rem;
		overflow: hidden;
		font-size: .36rem;
		color: #FFFFFF;
		text-align: center;
		position: relative;
	}
	
	.popup_cover2_top_left {
		float: left;
		width: 50%;
		line-height: 0.9rem;
	}
	
	.popup_cover2_top_right {
		float: left;
		width: 50%;
		line-height: 0.9rem;
	}
	
	.shu {
		width: 0.02rem;
		height: 0.3rem;
		background: #FFFEFE;
		position: absolute;
		top: 0.25rem;
		left: 3.73rem;
	}
	
	.dot {
		width: 0.16rem;
		height: 0.16rem;
		border-radius: 50%;
		background: #FF0404;
		position: absolute;
		top: 0.15rem;
		right: 1.1rem;
	}
	
	.bottom_line {
		width: 6.9rem;
		height: 0.02rem;
		position: absolute;
		bottom: 0;
		background: #999999;
	}
	
	.bottom_line_active {
		width: 1.8rem;
		position: absolute;
		bottom: -0.1rem;
		left: 0.9rem;
		transition: 1s;
	}
	
	.popup_cover2_close {
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 0.2rem;
		right: 0.3rem;
	}
	
	.popup_cover2_left {
		padding: 0 .3rem;
	}
	
	.popup_cover2_left_list {
		width: 2.4rem;
		height: .55rem;
		background: #FFFEFE;
		font-size: .32rem;
		border-radius: 0.06rem;
		text-align: center;
		line-height: .55rem;
		margin-top: .45rem;
	}
	
	.popup_cover2_left_item {
		padding-top: .2rem;
		color: #FFFFFF;
		font-size: 0.28rem;
	}
	
	.popup_cover2_rigth {
		padding: 0.6rem .3rem;
	}
	
	.popup_cover2_rigth_item {
		width: 6.56rem;
		height: 2rem;
		border: 0.02rem solid #FFFEFE;
		border-radius: 0.1rem;
		padding: .3rem;
		color: #FFFFFF;
		font-size: .28rem;
		position: relative;
		margin-bottom: .3rem;
	}
	
	.popup_cover2_rigth_item p:nth-of-type(2) {
		padding-top: .3rem;
	}
	
	.rigt_icon {
		position: absolute;
		width: 0.27rem;
		height: 0.05rem;
		right: .3rem;
		top: .75rem;
	}
	
	.icon_2 {
		width: .7rem;
		height: .7rem;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.roudabout {
		width: 100%;
		background: rgba(0, 0, 0, .8);
		overflow-x: hidden;
	}
	
	.roudaBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-image: url('../../assets/game/zhuanpan.jpg');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.container {
		padding-top: 2rem;
		width: 100%;
		transform-origin: 50% 50%;
		transform: rotate(0deg);
		position: relative;
	}
	
	.round {
		position: absolute;
		width: 100%;
		height: 6.4rem;
		z-index: -1;
		transform-origin: 50% 50%;
		transition: all 1.5s ease-out;
	}
	
	.round_box {
		position: relative;
		width: 100%;
		height: 6.4rem;
	}
	
	.bg {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 6.4rem;
		height: 6.4rem;
		border-radius: 50%;
	}
	
	.start {
		position: absolute;
		left: 0;
		top: -0.7rem;
		right: 0;
		bottom: 0;
		margin: auto;
		/* transform: translate(-50%,-50%);*/
		width: 2.76rem;
		height: 3.66rem;
	}
	
	.reward {
		display: inline-block;
		width: 1.5rem;
		height: 2.5rem;
		text-align: center;
		position: absolute;
		top: .7rem;
		left: 50%;
		transform-origin: 50% 100%;
	}
	
	.reward>img {
		width: .8rem;
		padding-bottom: .1rem;
	}
	
	.reward>p {
		font-size: 13px;
	}
	
	.reward1 {
		top: .7rem;
		transform: translateX(-50%) rotate(0);
	}
	
	.reward2 {
		transform: translateX(-50%) rotate(60deg)
	}
	
	.reward3 {
		transform: translateX(-50%) rotate(120deg)
	}
	
	.reward4 {
		transform: translateX(-50%) rotate(180deg)
	}
	
	.reward5 {
		transform: translateX(-50%) rotate(240deg)
	}
	
	.reward6 {
		transform: translateX(-50%) rotate(300deg)
	}
	
	.change {
		padding-top: 10px;
		font-size: 14px;
		text-align: center;
	}
	
	.change>span {
		display: inline-block;
		padding: 5px 20px;
		background: #e8e8e8;
		border-radius: 5px;
	}
	
	.tips {
		position: relative;
		width: 100%;
		text-align: center;
		margin-top: 5px;
		color: #fff;
		text-align: center;
		font-size: .32rem;
	}
	
	h4 {
		font-size: 14px;
		padding-bottom: 5px;
	}
	
	.tips>p {
		font-size: 12px;
	}
	
	.popup-cover,
	.popup-cover1 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0.8rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .8);
		z-index: 2;
	}
	
	.popup_cover2 {
		width: 100%;
		top: 0.8rem;
		overflow: scroll;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .8);
		z-index: 2;
	}
	
	.popup-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		/* height: 10rem; */
	}
	
	.cross {
		display: inline-block;
		position: absolute;
		top: .4rem;
		right: .45rem;
		width: .4rem;
		height: .4rem;
		/*background-image: url('./../assets/communal_btn_fork@2x.png');*/
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.content {
		padding: 1rem .5rem;
		text-align: center;
	}
	
	.content>h1 {
		font-size: .4rem;
		text-align: center;
	}
	
	.content>p {
		line-height: .5rem;
	}
	
	.img {
		margin: .5rem auto;
		width: 3.59rem;
		height: 2.17rem;
		/*background-image: url('./../assets/communal_img_lose@2x.png');*/
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.popup-btn {
		margin-top: .5rem;
		width: 100%;
		height: .95rem;
		line-height: .95rem;
		/*background-image: url('./../assets/btn.png');*/
		background-repeat: no-repeat;
		background-size: 100% 100%;
		color: #fff;
		border-radius: 25px;
	}
	
	.popup-cover1 p {
		padding-top: .2rem;
	}
</style>