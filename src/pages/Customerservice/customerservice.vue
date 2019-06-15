<template>
	<div class="container">
		<navbarbase :title="title" :left="'back'" @isLeft="onClickLeft"></navbarbase>

	</div>
</template>

<script>
	import navbarbase from '../../components/Navbarbase/Navbarbase'
	export default {
		name: "customerservice",
		components: {
			navbarbase
		},
		data() {
			return {
				title: '美丽领吧',

			};
		},
		computed: {},
		created() {
			console.log("customerservice created");
		},
		mounted() {},
		methods: {
			onClickLeft(data) {
				this.$router.go(-1)
			},
		},
		beforeRouteLeave(to, from, next) {

			let position = window.scrollY //记录离开页面的位置 
			if(position == null) position = 0
			this.$store.dispatch("increment", {
				scrollY: position,
				router: from.name
			}) //离开路由时把位置存起来 
			next()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(vm.$store.getters.recruitScrollY(to.name) == undefined) {
					vm.$store.dispatch("increment", {
						scrollY: 0,
						router: to.name
					})

				}
				let recruitScrollY = vm.$store.getters.recruitScrollY(to.name)
				window.scrollTo(0, recruitScrollY)

			})

		}
	};
</script>

<style scoped="scoped" lang="scss">
	.container {
		padding: 0.92rem 0;
		overflow: hidden;
	}
</style>