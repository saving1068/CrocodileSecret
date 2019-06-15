<template>
	<div id="navbarbase">
		<van-nav-bar @click-left="onClickLeft" :title="title"  :left-text="leftText" :right-text="rightText" @click-right="onClickRight" fixed>
			<van-icon :name="left" slot="left" v-if="leftText==''" />
			<van-icon :name="right" slot="right" v-if="rightText==''">

				<div class="badges" v-if="num!=0&&num<99">{{num}}</div>
				<div class="badge" v-if="num>=99">{{num}} <span class="add">+</span> </div>
			</van-icon>
		</van-nav-bar>
	</div>
</template>

<script>
	export default {
		
		props: {
			title: {
				type: String,
				defalut: "",
				required: true
			},
			num:'',
			text: {
				type: Number,
				default: null,

			},

			rightText: {
				type: String,
				default: ""
			},
			leftText: {
				type: String,
				default: ""
			},
			left: {
				type: String,
				default: ""
			},
			right: {
				type: String,
				default: ""
			}
		},

		data() {
			return {
				
				

			}
		},
		created() {


		},
		methods: {
			
			onClickLeft() {
				this.$emit("isLeft",true)
		    },
		    onClickRight(){
		    	this.$emit("isRight",true)
		    }
			
		}
	}
</script>

<style scoped="scoped">
	.van-icon-share:before {
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/common/3x/common_btn_share@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.van-icon-letter:before {
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/common/3x/common_btn_letter@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.van-icon-message:before {
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/common/3x/common_btn_message@3x.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.van-icon-back:before {
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/common/3x/common_btn_arrow@3x.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.van-icon-fuck:before {
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/common/3x/common_btn_notice@3x.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.van-icon-content:before{
		content: "";
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/common/3x/common_btn_notice@3x.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	
	.badges {
		position: absolute;
		top: -0.1rem;
		right: -0.1rem;
		display: inline-block;
		min-width: 0.32rem;
		height: 0.32rem;
		font-size: 0.18rem;
		text-align: center;
		line-height: 0.3rem;
		border-radius: 50%;
		color: #FFFFFF;
		background: #fe4436;
	}
	
	.badge {
		position: absolute;
		top: -0.1rem;
		right: -0.1rem;
		display: inline-block;
		padding: 0rem 0.04rem 0.01rem 0;
		min-width: 0.32rem;
		height: 0.32rem;
		font-size: 0.12rem;
		text-align: center;
		line-height: 0.3rem;
		border-radius: 50%;
		color: #FFFFFF;
		background: #fe4436;
	}
	
	.add{position: absolute;color: #fff;font-size: 0.12rem;top: -0.06rem;right: 0.0001rem;}
</style>
