<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>

		<!--没有地址时候的HTML-->
		<div class="center_div" v-if="!Address">
			<img src="../../assets/items/@3x/items_icon_location_default@3x.png" />
			<p>你还没有添加地址哦！</p>
		</div>
		<div class="btn" @click="address" v-if="!Address">添加地址</div>

		<!--有地址时候的HTML-->
		<div class="warp" v-if="Address">

			<div class="have_address" v-for="(item,index) in list">
				<div class="have_top" @click="change(item.id,index)">
					<p class="have_p_top">
						<span class="have_name">{{item.name}}</span>
						<span class="have_phone">{{item.mobile}}</span>
					</p>
					<p class="have_p_bottom">{{item.regionInfo[0].region.name}}{{item.regionInfo[1].region.name}}{{item.regionInfo[2].region.name}}{{item.street}}</p>
				</div>
				<div class="have_bottom">
					<van-radio-group v-model="radio" @change="changeIndex()">
						<van-radio :name="index">设为默认地址</van-radio>
					</van-radio-group>

					<span class="edit" @click="changeAddress(item)">编辑</span>
					<span class="delete" @click="del(item,index)">删除</span>
				</div>
			</div>
		</div>
        <div style="height: 1.3rem;"></div>
		<div class="btns" @click="address" v-if="Address">添加地址</div>

	</div>
</template>

<script>
	import { Dialog } from 'vant';
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		components: {
			navbarbase,
			Dialog
		},
		data() {
			return {
				title: '选择地址',
				radio: -1,
				Address: false, //1 无地址 2 有地址
				list: [],
				id: 0
			}
		},
		created() {
			if(this.$route.query.from == "my") {
				this.title = "我的收货地址"
			}

			this.getData()
		},
		methods: {
			onClickLeft(data) { //头部导航左边点击事件
				this.$router.go(-1)
			},
			address() { //添加地址
				this.$router.push({
					name: 'Addsite'
				})
			},
			change(id, index) { //改变默认地址

				if(this.$route.query.from == "my") {
					console.log(id)

					var obj = {
						"a": 2,
						"id": id
					}
					this.radio = index
					this.$Api.getShippingAddressSwitch(obj).then((res) => {
						console.log(res)
					})

				} else {

					this.id = id
					this.$router.go(-1)

				}

			},
			changeIndex() {
				var obj = {
					"a": 2,
					"id": this.list[this.radio].id
				}

				this.$Api.getShippingAddressSwitch(obj).then((res) => {
					console.log(res)
				})

			},

			del(data, index) { //删除地址
				Dialog.confirm({
					title: '删除地址',
					message: '确认删除地址？'
				}).then(() => {
					var obj = {
						"a": 1,
						"id": data.id
					}
					this.$Api.getShippingAddressSwitch(obj).then((res) => {
						console.log(res)
						if(res.q.s == 0) {
							this.$toast('删除地址成功');
							this.list.splice(index, 1)
							if(this.list.length > 0) {
								for(var i = 0; i < this.list.length; i++) {
									if(this.list[i].selected == 1) {
										this.radio = i
									}

								}
							} else {
								this.Address = false
							}

						}
					})
				}).catch(() => {
					// on cancel
				});

			},
			changeAddress(data) {
				this.$router.push({
					name: 'Addsite',
					query: {
						data: data
					}
				})
			},
			getData() {

				this.$Api.getShippingAddressList().then((res) => {
					console.log(res)
					if(res.q.addresses.length > 0) {
						this.list = res.q.addresses
						this.Address = true
					}
					for(var i = 0; i < res.q.addresses.length; i++) {
						if(res.q.addresses[i].selected == 1) {
							this.radio = i
						}

					}
				})

			}
		},
		beforeRouteLeave(to, from, next) {
			if(this.$route.query.from != "my") {
				to.query.id = this.id
				console.log(1)
			}
			next()

		}

	}
</script>

<style scoped="scoped">
	.container {
		padding: 0.92rem 0rem 0;
		background-color: #f3f3f3;
		width: 100%;
		min-height: 100%;
		position: relative;
	}
	/*没有地址是时候页面样式*/
	
	.center_div {
		width: 100%;
		height: 2.69rem;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto 0;
		text-align: center;
	}
	
	.center_div>img {
		width: 1.57rem;
		height: 2.04rem;
	}
	
	.center_div>p {
		color: #999999;
		font-size: 0.3rem;
		padding-top: 0.3rem;
	}
	
	.btn {
		width: 7.02rem;
		height: 0.88rem;
		border: 0.01rem solid #e6bf6b;
		box-sizing: border-box;
		border-radius: 0.1rem;
		color: #e6bf6b;
		background: #FFFFFF;
		text-align: center;
		line-height: 0.88rem;
		font-size: 0.3rem;
		position: fixed;
		bottom: 0.3rem;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	.btns {
		width: 7.02rem;
		height: 0.88rem;
		border: 0.01rem solid #e6bf6b;
		box-sizing: border-box;
		border-radius: 0.1rem;
		color: #fff;
		background-color: #e6bf6b;
		text-align: center;
		line-height: 0.88rem;
		font-size: 0.3rem;
		position: fixed;
		bottom: 0.3rem;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	/*有地址是时候页面样式*/
	
	.warp {
		width: 100%;
	}
	
	.have_address {
		width: 100%;
		height: 2.35rem;
		background-color: #fff;
		margin-top: 0.2rem;
		padding-left: 0.24rem;
	}
	
	.have_top {
		width: 100%;
		height: 1.4rem;
		border-bottom: 0.01rem solid #e5e5e5;
		box-sizing: border-box;
		font-size: 0.3rem;
		color: #333333;
		padding: 0.16rem 0.24rem 0.16rem 0;
	}
	
	.have_p_top {
		position: relative;
		width: 100%;
		height: 0.54rem;
		line-height: 0.54rem;
	}
	
	.have_phone {
		position: absolute;
		right: 0;
	}
	
	.have_p_bottom {
		width: 100%;
		height: 0.54rem;
		line-height: 0.54rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.have_bottom {
		width: 100%;
		height: 0.95rem;
		padding: 0.275rem 0.24rem 0 0;
		display: flex;
		justify-content: space-between;
	}
	
	.edit {
		display: inline-block;
		height: 0.4rem;
		line-height: 0.4rem;
		color: #333333;
		padding-left: 0.4rem;
		background: url(../../assets/common/3x/common_btn_edit@3x.png) no-repeat;
		background-size: 0.32rem 0.35rem;
		font-size: 0.3rem;
		margin-left: 2rem;
	}
	
	.delete {
		display: inline-block;
		height: 0.4rem;
		line-height: 0.4rem;
		color: #333333;
		padding-left: 0.42rem;
		background: url(../../assets/common/common_btn_delete@2x.png) no-repeat;
		background-size: 0.34rem 0.34rem;
		font-size: 0.3rem;
	}
</style>