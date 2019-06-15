<template>
	<div id="cashier">
		<navbarbase :title="title" :left="'back'"   @isLeft="onClickLeft"  ></navbarbase>
		<div class="container">
			<div class="indent">
				<div class="indent_left">订单金额</div>
				<div class="indent_right">￥300.00</div>
			</div>
			
			<div class="payment_method">选择付款方式</div>
			
			<ul class="means">
				<li class="method">
					<div class="method_a"><span class="alipay"></span></div>
					<div class="method_b">
						<p class="payment">支付宝</p>
						<span class="recommend">支付宝支付，安全快速</span>
					</div>
					<div class="method_c "><span class="arrows"></span></div>
				</li>
				<li class="method" @click="popup">
					<div class="method_a"><span class="wechat"></span></div>
					<div class="method_b">
						<p class="payment">微信支付</p>
						<span class="recommend">推荐使用</span>
					</div>
					<div class="method_c "><span class="arrows"></span></div>
				</li>
				<li class="method">
					<div class="method_a"><span class="my_wallet"></span></div>
					<div class="method_b">
						<p class="payment">我的钱包</p>
						<span class="recommend">使用钱余额支付</span>
					</div>
					<div class="method_c "><span class="arrows"></span></div>
				</li>
			</ul>
			
		</div>
		
		<van-popup v-model="show" position="bottom" :overlay="true">
			<div>
				<!-- 密码输入框 -->
			  	<van-password-input
				  :value="value"
				  info="密码为 6 位数字"
				  @focus="showKeyboard = true"
				/>
				
				<!-- 数字键盘 -->
				<van-number-keyboard
				  :show="showKeyboard"
				  @input="onInput"
				  @delete="onDelete"
				  @blur="showKeyboard = true"
				/>
			</div>
			
			
		</van-popup>
		
	</div>
</template>

<script>
import navbarbase from '../../components/Navbarbase/Navbarbase'

	export default {
		data() {
			return {
				title:'收银台',
				show:false,
				value: '',
      			showKeyboard: true
			}
		},
		components: {
			navbarbase
		},
		watch: {},
		created() {},
		methods: {
			onClickLeft(data){
				this.$router.go(-1)
			},
			popup(){
				if(this.show == true){
					this.show = false
				}else{
					this.show = true
				}
			},
			onInput(key) {
		      this.value = (this.value + key).slice(0, 6);
		      if(this.value.length==6){
		      	setTimeout(() => {
	                this.$toast.loading({
					  mask: true,
					  message: '正在支付...'
					});
	            }, 500);
	            setTimeout(() => {
	            	this.show = false
	                this.$toast.success('支付成功');
	            }, 3000);
		      	setTimeout(() => {
	                this.$router.push({name:'Paymentsuccess'})
	            }, 4000);  
		      }
		      	
		    },
		    onDelete() {
		      this.value = this.value.slice(0, this.value.length - 1);
		      console.log(this.value)
		    }
		},
	}
</script>

<style scoped="scoped">
	#cashier{padding:0.92rem 0 0;width: 100%; height: 100%;background-color: #f0f0f0;}
	
	.indent{width: 100%;height: 0.9rem;background-color: #fff;display: flex;justify-content:space-between;padding: 0 0.3rem;line-height: 0.9rem;font-size: 0.3rem;margin-bottom: 0.2rem;}
	.indent_left{color: #333333;}
	.indent_right{color: #fe5043;}
	
	.payment_method{width: 100%;height: 0.8rem;line-height: 0.8rem;padding-left: 0.3rem;color: #333333;font-size: 0.3rem;background-color: #fff;}
	
	.means{width: 100%;height: auto;background-color: #fff;}
	.method{width: 100;height: 1.4rem;border-top: 0.01rem solid #e5e5e5;display: flex;padding: 0 0.3rem;}
	.method_a{width: 0.44rem;height: 1.4rem;display: flex;align-items: center;}
	.wechat{display: inline-block;width: 0.44rem;height: 0.44rem; background-image: url(../../assets/cart/icon_wechat.png);background-size: 100% 100%;}
	.alipay{display: inline-block;width: 0.44rem;height: 0.44rem; background-image: url(../../assets/common/3x/common_icon_alipay@3x.png);background-size: 100% 100%;}
	.my_wallet{display: inline-block;width: 0.44rem;height: 0.44rem; background-image: url(../../assets/cart/ico_wallet.png);background-size: 100% 100%;}
	
	.method_b{width: 6.33rem;height: 1.4rem;padding: 0.23rem 0 0.23rem 0.2rem;}
	.payment{font-size: 0.3rem;color: #333333;height: 0.48rem;line-height: 0.48rem;}
	.recommend{font-size: 0.28rem;color: #9f9f9f;height: 0.46rem;line-height: 0.46rem;}
	
	.method_c{width: 0.13rem;height: 1.4rem;line-height: 1.4rem;}
	.arrows{display: inline-block;width: 0.13rem;height: 0.23rem; background-image: url(../../assets/arrow_gray.png);background-size: 100% 100%;}
	
	.van-popup--bottom{height: 50%;}
	.van-password-input{padding-top: 0.5rem;}
</style>