import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const Fontsize = document.documentElement.clientWidth / 375
let nowYear = new Date().getFullYear()
let nowMonth = new Date().getMonth() + 1
var newArr = []
var arr = ["汉族", "蒙古族", "满族", "朝鲜族", "赫哲族", "达斡尔族", "鄂温克族", "鄂伦春族", "回族", "东乡族", "土族", "撒拉族", "保安族", "裕固族", "维吾尔族", "哈萨克族", "柯尔克孜族", "锡伯族", "塔吉克族", "乌孜别克族", "俄罗斯族", "塔塔尔族", "藏族", "门巴族", "珞巴族",
	"羌族", "彝族", "白族", "哈尼族", "傣族", "僳僳族", "佤族", "拉祜族", "纳西族", "景颇族",
	"布朗族", "阿昌族", "普米族", "怒族", "德昂族", "独龙族", "基诺族", "苗族", "布依族", "侗族", "水族", "仡佬族", "壮族", "瑶族", "仫佬族", "毛南族", "京族", "土家族", "黎族", "畲族", "高山族"
]
for(var i = 0; i < arr.length; i++) {
	var obj = {
		value: i + 1,
		text: arr[i]
	}
	newArr.push(obj)

}

const store = new Vuex.Store({
	state: {
		sessionId: "",
		font: Fontsize,
		nowYear: nowYear,
		nowMonth: nowMonth,
		isLogin:false,
		isVip:false,
		nation: newArr,
		pointsTotal:0,
		orderText:"",
		cashTotal:0,
		avatar:'',
		recruitScrollY: {
			//			"Home":
		},
		todos: [{
				id: 1,
				text: '...',
				done: true
			},
			{
				id: 2,
				text: '...',
				done: false
			}
		],
		informationA:'',//消息页面a参数
		informationa:'',//消息页面title
	},
	getters: {
		recruitScrollY: state => (router) => {
			console.log(router,"getters,router")
			return state.recruitScrollY[router]
		},
		doneTodos: state => {
			return state.todos.filter(item => item.done)
		},
		getAvatar:state=>{
			return state.avatar
		},
		

	},
	mutations: {
		changeRecruitScrollY(state, {
			scrollY,
			router
		}) {
			state.recruitScrollY[router] = scrollY
			console.log(scrollY, router)
		},
		
		changeAvatar(state,url){
			
			state.avatar=url
			
		},
		changeState(state,flag){
			
			state.isLogin=flag
			
		}
		
	},
	actions: {
		increment({
			commit
		}, {
			scrollY,
			router
		}) {
			commit('changeRecruitScrollY', {
				scrollY: scrollY,
				router: router
			})
		},
		Avatar({
			commit
		},url){
			commit('changeAvatar',url)
		},
		changeLogin({
			commit
		},flag){
			commit('changeState',flag)
		}
		
		
	},
	modules: {}

})
export default store