<template>
  <div id="main">
    <keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import tabbar from '@/components/Tabbarbase/Tabbar.vue'

export default {
	data() {
    return {
  		openId:''
    }
  },
  components: {
    tabbar
  },
  created(){

  },
  methods:{
  	
  }
}
</script>

<style>
  #main{
    height: 100%;
  }
</style>
