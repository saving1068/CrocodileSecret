<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft" ></navbarbase>
		
		<van-address-edit
		  :area-list="areaList"
		  show-postal
		  
		  show-set-default
		  show-search-result
		 :is-saving="load"
		  @save="onSave"
		  @delete="onDelete"
		 :address-info="info"
		/>
		
		
		
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		components: {
			navbarbase,
			Toast
		},
		data() {
			return {
				title:'添加新地址',
				areaList: this.$cityData,
				info:{},
				id:0,
				load:false
				
			}
		},
       created(){
       	  	
     
       	if(this.$route.query.data){
       		var obj={
       			name:this.$route.query.data.name,
       			tel:this.$route.query.data.mobile,
       			area_code:this.$route.query.data.regionId.toString(),
       			postal_code:this.$route.query.data.zipcode,
       			address_detail:this.$route.query.data.street,
       			is_default:false
       		}
       		if(this.$route.query.data.selected==0){
       			obj.is_default=false
       		}else{
       			obj.is_default=true
       		}
       			this.info=obj
       			this.id=this.$route.query.data.id
       			this.title="修改地址"
       	}
       
       	
       },
      
       
       mounted(){
       	document.getElementsByClassName("van-cell__title")[1].childNodes[0].innerText='手机号码'
       	  	document.getElementsByClassName("van-cell__title")[2].childNodes[0].innerText='选择地区'
       	console.log(	document.getElementsByClassName("van-cell__title")[1].childNodes[0])
       	
       	document.getElementsByClassName("van-field__control")[2].onfocus=()=>{
       		
       		window.scrollTo(0, 0)
       	}
       		document.getElementsByClassName("van-field__control")[3].setAttribute("type","number")
       	document.getElementsByClassName("van-field__control")[3].onfocus=()=>{
       		
       		window.scrollTo(0, -20)
       	}
       },
		methods: {
			onSave(data) {
		var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    
    
			console.log(data)
			if(regEn.test(data.name) || regCn.test(data.name)){
				Toast('姓名不能为特殊字符')
			}else{
					this.load=true
								this.sendData(data)
//				Toast('save');
			}
			

			},
			onDelete() {
				Toast('delete');
			},
			getData(){
				
			},
			sendData(data){
				var that=this
				if(data.postal_code==""){
					data.postal_code=null
				}
				
				var obj={
				"address":{
					"id":this.id,
					 "name":data.name,
					 "email":"",
					 "mobile":data.tel,
					 "regionId":Number(data.area_code),
					 "zipcode":data.postal_code,
					 "street":data.address_detail,
					 "selected":0
				}
				}
				
				if(data.is_default){
					obj.address.selected=1
				}else{
					obj.address.selected=0
				}
				this.$Api.getShippingAddressSubmit(obj).then((res)=>{
					console.log(res)
					if(res.q.s==0){
						Toast.success({
							message:'提交成功',
							duration:800
						});
						setTimeout(()=>{
							that.$router.go(-1)
							
							
						},800)
					}
				})
				
			},
		
			onClickLeft(data){//头部导航左边点击事件
				this.$router.go(-1)
			},
			
		}
	}
</script>

<style scoped="scoped">
	.container{padding:0.92rem 0rem 0;}
	
	
</style>