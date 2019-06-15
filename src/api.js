import axios from 'axios'
import Vue from 'vue'
import router from './router'
import md5 from '../static/js/md5.js'
import call from '@/callApp.js'
import { Toast } from 'vant';
import store from '@/store/store.js'
import 'vant/lib/vant-css/index.css'

var appType = {
  type: function () {
    var u = navigator.userAgent;
    return { //移动终端浏览器版本信息
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      androidToJs: u.indexOf('androidToJs') > -1 || u.indexOf('Linux') > -1, //androidToJs终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mapi/ads/StarRankingac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1,
      wechat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
      //是否web应该程序，没有头部与底部
    };
  }()
}






const key = '';
let devUrl = "/api/";
//Vue.prototype.$imgUrl = 'https://java1.d.aiitec.org';  
//Vue.prototype.$imgUrl = 'https://java1.t.aiitec.org';
if(window.location.host=="h5.crocodilesecret.d.aiitec.org") {
//	let url = 'http://' + window.location.host;
Vue.prototype.$shareUrl = 'https://h5.crocodilesecret.d.aiitec.org';
	devUrl = "https://java1.d.aiitec.org/CrocodileSecret/api/";
//Vue.prototype.$imgUrl = url;
}else if(window.location.host=="h5.crocodilesecret.t.aiitec.org") {
	console.log(1)
	devUrl = "https://java1.t.aiitec.org/CrocodileSecret/api/";
	Vue.prototype.$shareUrl = 'https://h5.crocodilesecret.t.aiitec.org';
}else if(window.location.host=="meililingba-h5.b.aiitec.net"){
	Vue.prototype.$shareUrl="https://meililingba-h5.b.aiitec.net"
	devUrl ="https://api.meililingba.com/CrocodileSecret/api/"
}else if(window.location.host=="api.meililingba.com"){
	Vue.prototype.$shareUrl="https://api.meililingba.com"
	devUrl ="https://api.meililingba.com/CrocodileSecret/api/"
	
	
	
}


var SESSION = process.env.NODE_ENV=='development'?(localStorage.getItem('sessionId')?localStorage.getItem('sessionId'): null):(localStorage.getItem('sessionId')?localStorage.getItem('sessionId'): null)
	
function getSession() {

	let result = localStorage.getItem('sessionId');
//  result = "7c0U81jd8n66ZKyR035LP425oMzy1e5Q"
	console.log(result)
	

	if(result) {
		SESSION = result;
	
		return result;
	}
}









// axios.interceptors.request.use(function (config) {
//   return config
// }, function (error) {
//   return Promise.reject(error);
// });

//axios响应拦截
axios.interceptors.response.use(function (response) {
  if (response.data.q.s != '0') {
    if (response.data.q.s == '1002' || response.data.q.s == '1012' || response.data.q.s == '1100' || response.data.q.s == '1105' || response.data.q.s == '1106' || response.data.q.s == '1107' || response.data.q.s == '1110') {
         if(store.state.isLogin){
         	var obj={
         		
         	}
         Toast({
      message: "您的账号在别处登录，请重新登录",
       forbidClick: true,
      position: 'bottom',
      duration: 1000
    })
         	
         	store.dispatch('changeLogin', false)
         	call.invokeLogin(obj)
         	
         	
         }



//    localStorage.removeItem("sessionId");
//    next(false);
      console.log('jump to reg page')
    } else {
//    errorMsg(response.data.q.d);
    }
  }

  return response;
}, function (error) {
  console.log("response error")
  console.log(error)
  // console.log(error.config);
  // console.log(error.status)
  console.log(error.request.status)
  console.log('Errorfff', error.message);
  console.log('sssaaa',error.response);
  let error_message = '请求失败，请稍后重试！';
  if (error.response) {
    
    switch (error.response.status) {
      case 404:
       Toast({
      message: "请求失败，请稍后重试！",
       forbidClick: true,
      position: 'bottom',
      duration: 5000
    });
        break;
      case 401:
        Toast({
      message: "请求失败，请稍后重试！",
       forbidClick: true,
      position: 'bottom',
      duration: 5000
    });
        break;
      case 500:
        Toast({
      message: "请求失败，请稍后重试！",
       forbidClick: true,
      position: 'bottom',
      duration: 5000
    });
        break;
      default:
        Toast({
      message: "请求失败，请稍后重试！",
       forbidClick: true,
      position: 'bottom',
      duration: 5000
    });
        break;
    }
  } 
  return Promise.reject(error);
});

function axiosApi(url, option, method = 'post', stopLogin = false) {
  let promise;

  promise = new Promise((resolve, reject) => {
    if (method == 'post') {
      option.headers = {
        'Content-Type': 'multipart/form-data'
      }
//    option.params.m = '123' //m值
     var key="cssH5-8149537095"

        			console.log(JSON.stringify(option.params));
   
            
        			option.params.m = md5(key+md5(JSON.stringify(option.params)));
        			
      let formdata = new FormData();
      formdata.append('json', JSON.stringify(option.params));
      option.data = formdata;
      option.params = null;
    }

    axios(Object.assign({
      method,
      url
    }, option)).then((response) => {
      if (response.data.q) {
        if (response.data.q.s !== '0') {
          let error = checkErr(response.data.q.s)
          if (response.data.q.s == '1115' && router.app._route.fullPath != 'index') {
            sessionStorage.setItem('path', router.app._route.fullPath)
            router.push({
              name: 'ImprovePhone'
            })
          }
          if (response.data.q.s == '1012' || response.data.q.s == '1002' && router.app._route.fullPath != '/promote/PromotePhone') {
            sessionStorage.setItem('path', router.app._route.fullPath)
            //							Vue.$router.replace({path:sessionStorage.getItem('path')})
            //						let oldUrl = encodeURIComponent(window.location.href) 
            //						if(process.env.NODE_ENV=='development'){
            ////							let newUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ccfeeb07d15cf04&redirect_uri="+oldUrl+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            ////							window.location.href = newUrl
            //							return
            //						}else{
            //							let newUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ccfeeb07d15cf04&redirect_uri="+oldUrl+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            //							window.location.href = newUrl
            //						}
          }
          if (!stopLogin) {
            if (response.data.q.s == '1100' || response.data.q.s == '1012') {
              sessionStorage.setItem('path', router.app._route.fullPath)
            }
          }
        }
      }
      resolve(response.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
  return promise;
}

let Api = {
  setSessionId(sessionId) {
  	
    SESSION = sessionId;
  },
  untilSessionId: () => {
    return new Promise((resolve, reject) => {
      var timer = setInterval(getSessionId, 50);

      function getSessionId() {
        if (localStorage.getItem('sessionId')) {
          clearInterval(timer);
          resolve()
        }
      }
    })
  },
  //
  // ────────────────────────────────────────────── I ──────────
  //   :::::: Base 客户信息系统
  // ────────────────────────────────────────────────────────────
  //
/**
   * 财富之星排行榜 StarRanking  （鳄鱼密码）
   *
   */
   StarRanking: () => {
    return axiosApi(devUrl + 'ads/StarRanking', {

    }, 'get')
  },
  // getSession: (deviceToken, md) => {
  //   return axiosApi(devUrl + 'base/Session', {
  //     params: {
  //       'n': 'Session',
  
  //       'q': {
  //         deviceToken,
  //         deviceType: 16,
  //       }
  //     }
  //   })
  // },

/**
   * 5.	签到领积分SignAndGetIntegral
   *
   */
 SignAndGetIntegral:({a,date})=>{
 	return axiosApi(devUrl + 'fina/SignAndGetIntegral', {
			 params: {
           'n': 'SignAndGetIntegral',
            's': SESSION ? SESSION : getSession(),
           'q': {
            a,
            date
           }
         }
    })
 	
 	
 },

  /**
   * 3.	查询公开参数QueryPublicSettings
   *
   */
  getQueryPublicSettings: () => {
    return axiosApi(devUrl + 'base/QueryPublicSettings', {

    }, 'get')
  },

  /**
   * 4.查询系统设置QuerySetting
   *
   */
  getQuerySetting: (key) => {
    return axiosApi(devUrl + 'base/QuerySetting', {
      params: {
        'n': 'QuerySetting',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
          key,
        }
      }
    })
  },
  /**
   * 5.	参照项列表ReferenceItemList
   *
   *
   *
   */
  getReferenceItemList: (key) => {
    return axiosApi(devUrl + 'base/ReferenceItemList', {
      params: {
        key
      }
    }, 'get')
  },

  /**
   * 9.	设置图片SetImage
   *
   *
   *
   */
  SetImage: (a, id, idOld) => {
    return axiosApi(devUrl + 'base/SetImage', {
      params: {
        'n': 'SetImage',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          id,
          idOld
        }
      }
    })
  },

  /**
   * 10.自动登录AutoLogin
   *
   *
   *
   */

  /**
   * 11.	获取外部存储路径GetExternalUploadObject
   * @param action 1.公开存储对象（有CDN的存储桶，允许公开下载）2.非公开存储对象（没有CDN，不允许公开下载）
   * @param type   类型，1图片（默认）；2视频；3其它；
   * @param filename
   */
  getExternalUploadObject: (params) => {
    return axiosApi(devUrl + 'base/GetExternalUploadObject', {
      params: {
        'n': 'GetExternalUploadObject',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: params.a,
          type: params.type,
          filename: params.filename,
        }
      }
    })
  },
  /**
   * 12.	提交外部文件ExternalFilesSubmit
   * @param action 0.任何文件连接 1.公开存储对象（有CDN的存储桶，允许公开下载）2.非公开存储对象（没有CDN，不允许公开下载）
   * @param type   类型，1图片（默认）；2视频；3其它；
   * @param fileInfos 
   * 				|--sourceUrl	String		是	源地址
						|--accessUrl	String		是	访问地址，通常是CDN
   */
  getExternalFilesSubmit: (a, type, fileInfos) => {
    return axiosApi(devUrl + 'base/ExternalFilesSubmit', {
      params: {
        'n': 'ExternalFilesSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          type,
          fileInfos,
        }
      }
    })
  },

  //
  // ────────────────────────────────────────────── II ──────────
  //   :::::: Ads 客户信息系统
  // ────────────────────────────────────────────────────────────
  //
  /*
   * 1	公共，广告列表AdList
   * @param a （对应action）：
   1.	系统公告
2.	首页轮播图
3.	图片广告位
4.	导航广告位
5.	鳄鱼快报
6.	商品列表
7.	鳄鱼财富星
8.	姐言妹语
9.	鳄鱼秀场
10.	底部广告位

   */
  getAdList: (a) => {
    return axiosApi(devUrl + 'ads/AdList', {
      params: !a ? {} : {
        a: a
      }
    }, 'get')
  },


//get的方法 获取
//type=0系统文章（注册协议、XX协议、关于我们、版本说明，规则说明等）
//type=1公告栏（系统消息）
//type=2 智能问答
//type=3 会员特权
//type=4 广告文章
//type =8 姐言妹语
//type=9 鳄鱼秀场
//type=10 护肤小秘招(首页底部栏)
//type=11 商品（评论、图文介绍）

	getArticleListDate: (a,type,pa,li) => {
    return axiosApi(devUrl + 'cms/ArticleList', {
			params: {
//				'q':{
					"a":a,
					"type":type,
					"pa":pa,
					"li":li
//				}
				
			}
    }, 'get')
  },
  
  getArticleDetailsDate:(id,loginId) => {
    return axiosApi(devUrl + 'cms/article', {
			params: {
					"id":id,
					"sessionId":loginId
			}
    }, 'get')
  },
  //
  // ────────────────────────────────────────────── III ──────────
  //   :::::: CIS客户信息系统
  // ────────────────────────────────────────────────────────────
  //
  /**
   * 1.我的二维码 MyCode(鳄鱼密码)
   * 
   * 
   */
  MyCode: () => {
    return axiosApi(devUrl + 'cis/MyCode', {
      params: {
        'n': 'MyCode',
        's': SESSION ? SESSION : getSession(),
        'q': {
        	
        }
      }
    })
  },
  
  /**
   * 1.给读者的一封信 LetterToUse(鳄鱼密码)
   * 
   * 
   */
  LetterToUse: () => {
    return axiosApi(devUrl + 'cms/LetterToUse', {
      params: {
        'n': 'LetterToUse',
        's': SESSION ? SESSION : getSession(),
        'q': {
        	
        }
      }
    })
  },
  /**
   * 1.短信验证码 SMSCode
   * @param action       a，1：获取验证码；2：进行验证；
   * @param type         1注册（需验证手机号是否存在）；
   *                     2忘记密码/重置密码；
   *                     3重新绑定手机验证新手机
   *                     4邮箱验证
   *                     5重新绑定手机时验证旧手机
   *                     6验证码直接登陆（维意项目）
   * @param mobile
   * @param checkKey     图形验证码验证唯一key
   * @param code         验证码
   *
   */
  SMSCode: ({
    a,
    type,
    mobile,
    checkKey,
    code
  }) => {
    return axiosApi(devUrl + 'cis/SMSCode', {
      params: {
        'n': 'SMSCode',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          type,
          mobile,
          checkKey,
          w: {
            code
          }
        }
      }
    })
  },
  /**
   * 2.	登录UserLogin
   * 
   * @param {action}         1用户登录
   * @param {name}           手机号码/邮箱号码
   * @param {password}       密码，MD5加密：md5(key+md5(psw))
   * @param {checkKey}       图形验证码验证唯一key。
   * @returns 
   */
  UserLogin: ({
    a,
    name,
    password,
    checkKey
  }) => {
    return axiosApi(devUrl + 'cis/UserLogin', {
      params: {
        'n': 'UserLogin',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          name,
          password,
          checkKey,
        }
      }
    })
  },
  /**
   * 3.	登出UserLogout
   * 
   * @returns 
   */
  UserLogout: () => {
    return axiosApi(devUrl + 'cis/UserLogout', {
      params: {
        'n': 'UserLogin',
        's': SESSION ? SESSION : getSession(),
      }
    })
  },
  /**
   * 4.	用户忘记密码UserResetPassword
   * @param {user}            
   * @param |--{name}         手机号码/邮箱号码
   * @param |--{password}     密码，MD5加密：md5(key+md5(psw))
   * @param {checkKey}        短信验证唯一key
   * @returns 
   */
  UserResetPassword: (user, checkKey) => {
    return axiosApi(devUrl + 'cis/UserResetPassword', {
      params: {
        'n': 'UserResetPassword',
        's': SESSION ? SESSION : getSession(),
        'q': {
          user,
          checkKey,
        },
      }
    })
  },
  /**
   * 5.	用户注册UserRegisterSubmit
   * 
   * @param {user}         1更新详细信息；
   * @param {name}         昵称
   * @param {password}     密码，MD5加密：md5(key+md5(psw))
   * @param {sex}          0未知1男 2 女
   * @returns 
   */
  UserRegisterSubmit: (user) => {
    return axiosApi(devUrl + 'cis/UserRegisterSubmit', {
      params: {
        'n': 'UserRegisterSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          user,
        }
      }
    })
  },

  /**
   * 6.	用户更新UserUpdate(鳄鱼密码)
   * 
   * @param {a}            1更新详细信息；
   * @param {name}         昵称
   * @param {sex}          0未知1男 2 女
   * @returns 
   */
  UserUpdate: (user) => {
    return axiosApi(devUrl + 'cis/UserUpdate', {
      params: {
        'n': 'UserUpdate',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
          user,
        }
      }
    })
  },
  /**
   * 7.	更新密码UserUpdatePassword
   * 
   * @param {a}            1更改登录密码； 2更新支付密码
   * @param {checkKey}     短信验证唯一key。
   * @param {password}     密码:算法md5(key+md5($password))
   * @param {newPassword}  新密码:算法md5(key+md5($password))
   * @returns 
   */
  UserUpdatePassword: ({
    a,
    checkKey,
    password,
    newPassword
  }) => {
    return axiosApi(devUrl + 'cis/UserUpdatePassword', {
      params: {
        'n': 'UserUpdatePassword',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          checkKey,
          password,
          newPassword
        }
      }
    })
  },

  /**
   * 8.	修改手机号码MobileUpdate
   * 
   * @param {mobileNew}  新手机号码
   * @param {checkKey}   短信验证唯一key。
   * @param {loginType}   验证类型 例如 mobile/email
   * @returns 
   */
  MobileUpdate: (mobileNew, checkKey) => {
    return axiosApi(devUrl + 'cis/MobileUpdate', {
      params: {
        'n': 'MobileUpdate',
        's': SESSION ? SESSION : getSession(),
        'q': {
          mobileNew,
          checkKey,
          loginType: 'mobile'
        }
      }
    })
  },

  /**
   * 10.查询个人信息UserDetails
   *  @param id [0表示查自己]
   *  @param sku 关键词
   */
  UserDetails: (id) => {
    return axiosApi(devUrl + 'cis/UserDetails', {
      params: {
        'n': 'UserDetails',
        's': SESSION ? SESSION : getSession(),
        'q': {
          'id': id,
        
        }
      }
    }, 'post')

  },

  /**
   * 11.收货地址列表 ShoppingAddressList
   *
   */
  getShippingAddressList: () => {
    return axiosApi(devUrl + 'cis/ShippingAddressList', {
      params: {
        'n': 'ShippingAddressList',
        's': SESSION ? SESSION : getSession(),
        'q': {}
      }
    }, 'post')
  },
  /**
   * 12.添加/修改收货地址ShoppingAddressSubmit
   *
   */
  //http://192.168.1.67:8081/gift-fly-1.0.0-SNAPSHOT/api/cis/ShoppingAddressSubmit
  getShippingAddressSubmit: ({address}) => {
    return axiosApi(devUrl + 'cis/ShippingAddressSubmit', {
      params: {
        'n': 'ShippingAddressSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          address
        }
      }
    }, 'post')
  },

  /**
   * 13.	用户绑定第三方 UserBindingSubmit
   *
   */
  getUserBindingSubmit: (mobile, checkKey, partner) => {
    return axiosApi(devUrl + 'cis/UserBindingSubmit', {
      params: {
        'n': 'UserBindingSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          mobile,
          checkKey,
          partner,
          a: 2
        }
      }
    })
  },
  /**
   * 14.	第三方登录UserPartnerLogin
   *
   */
  getUserPartnerLogin: (partner, openId) => {
    return axiosApi(devUrl + 'cis/UserPartnerLogin', {
      params: {
        'n': 'UserPartnerLogin',
        's': '',
        'q': {
          partner,
          openId
        }
      }
    })
  },
  /**
   * 15.	收货地址开关ShippingAddressSwitch
   *
   */
  getShippingAddressSwitch: ({a, id}) => {
    return axiosApi(devUrl + 'cis/ShippingAddressSwitch', {
      params: {
        'n': 'ShippingAddressSwitch',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          id
        }
      }
    })
  },

  /**
   * 16.	微信JS接口注入权限验证配置信息WxConfig
   *
   */
  getWxConfig: (partner, url) => {
    return axiosApi(devUrl + 'cis/WxConfig', {
      params: {
        'n': 'WxConfig',
        's': SESSION ? SESSION : getSession(),
        'q': {
          partner,
          url
        }
      }
    })
  },


  //
  // ────────────────────────────────────────────── IV ──────────
  //   :::::: 	Cms内容系统
  // ────────────────────────────────────────────────────────────
  //
  /*
   * 1.	文章列表ArticleList
   */
  getArticleList: (a, ta) => {
    return axiosApi(devUrl + 'cms/ArticleList', {
      params: {
        'n': 'ArticleList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          ta,
        }
      }
    })
  },
  /*
   * 2.	文章详情ArticleDetails
   */
  getArticleDetails: (id) => {
    return axiosApi(devUrl + 'cms/ArticleDetails', {
      params: {
        'n': 'ArticleDetails',
        's': SESSION ? SESSION : getSession(),
        'q': {
          id,

        }
      }
    })
  },
  /*
   * 2.	 查询消息 QueryAdvices(鳄鱼密码)
   */
  QueryAdvices: () => {
    return axiosApi(devUrl + 'cms/QueryAdvices', {
      params: {
        'n': 'QueryAdvices',
        's': SESSION ? SESSION : getSession(),
        'q': {
          'a':1,
        }
      }
    })
  },
  /*
   * 3.	  消息 列表 MsgList
   * 
   * action 2 系统通知 3 收益通知，4 订单消息(物流通知)
   * 
   */
  MsgList: (a) => {
    return axiosApi(devUrl + 'cms/MsgList', {
      params: {
        'n': 'MsgList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          'a':a,
          'table ':{
          	'pa':1,
          	'li':20,
          	'O':0
          }
        }
      }
    })
  },
  /*
   * 3.	意见反馈FeedbackSubmit
   * 
   * @param action    1意见反馈
   * @param typeId    反馈类型ID请参考参照项列表ReferenceItemList?key=反馈类型
   * @param content   内容
   * @param images    
   *  			|--image  (最多三张)
  				    |--id    图片id
  				    |--imagePath   图片路径
   * 
   */
  getFeedbackSubmit: (content, images, typeId) => {
    return axiosApi(devUrl + 'cms/FeedbackSubmit', {
      params: {
        'n': 'FeedbackSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
          content,
          image,
          typeId
        }
      }
    })
  },

  /*
   *  4.评论列表CommentList
   * 	@param id 对象ID
   * 	@param userId 如果包含指定用户时输入
   */

  getCommentList: (id, starTypem, imageType, table, userId) => {
    return axiosApi(devUrl + 'cms/CommentList', {
      params: {
        'n': 'CommentList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
          id,
          starTypem,
          imageType,
          'ta': {
            pa: table.pa,
            li: table.li,
            ob: table.ob,
            ot: table.ot
          },
          userId,
        }
      }
    })
  },
  /*
   *  5.	评论提交CommentSubmit
   * 	@param action     type=0系统文章（注册协议、XX协议、关于我们、版本说明，规则说明等）
  									    type=1公告栏
  										  type=11 商品（评论、图文介绍）

   * 	@param id 
   * 	@param comments 
   * 	          |--comment
  								|--userId        评论人id（如果无指向评论人或者未知填0）
  								|--starNum       评分（星星数）
  								|--content       评论内容
  								|--imageIds			  图像数组

   *  
   */

  CommentSubmit: (a, id, comments) => {
    return axiosApi(devUrl + 'cms/CommentSubmit', {
      params: {
        'n': 'CommentSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          id,
          comments,
        }
      }
    })
  },
  /*
   * 6.PraiseSwitch（鳄鱼密码）
   *  @param action       1 文章 2系统通知 3收益通知，4物流通知
   *  @param open         1.已读
   *  @param id       		对象 ID（文章 id，评论 ID、公告 ID 等）a=3时不用传
   *
   */
  PraiseSwitch: (a, open, id) => {
    return axiosApi(devUrl + 'cms/PraiseSwitch', {
      params: {
        'n': 'PraiseSwitch',
        's': SESSION ? SESSION : getSession(),
        'q': {
          'a':a,
          'open':open,
          'id':id,
        }
      }
    })
  },

  /*
   *  8.	评论统计CommentStatInfo
   * 	@param action 0 查询评论统计信息
   * 	@param id 对象ID
   * 
   */

  getCommentStatInfo: (a, id) => {
    return axiosApi(devUrl + 'cms/CommentStatInfo', {
      params: {
        'n': 'CommentStatInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          id,
        }
      }
    })
  },





  //
  // ────────────────────────────────────────────── V ──────────
  //   :::::: 	FINA财务系统 
  // ────────────────────────────────────────────────────────────
  //

  /**
   * 1.	添加修改个人银行卡AddCard
   * 
   * @param {id} 修改的旧银行卡卡ID，新增时填0
   * @param {accountIdCode} 银行账户
   * @param {accountName} 账户姓名
   * @param {accountBankId} 银行ID
   * @param {accountBranchId} 银行网点ID
   * @param {verifyCode} 验证码，银行卡背后的认证安全码，一般是3位~6位数字，如果其他地方需要额外的认证信息，就填
   * 
   * @returns 
   */
  AddCard: ({
    id,
    accountIdCode,
    accountName,
    accountBankId,
    accountBranchId,
    verifyCode
  }) => {
    return axiosApi(devUrl + 'fina/AddCard', {
      params: {
        'n': 'AddCard',
        's': SESSION ? SESSION : getSession(),
        'q': {
          id,
          accountIdCode,
          accountName,
          accountBankId,
          accountBranchId,
          verifyCode
        }
      }
    })
  },

  /**
   * 2.	银行卡列表CardList
   * 
   * @param {a}  1全部
   * @returns 
   */
  getCardList: (a) => {
    return axiosApi(devUrl + 'fina/CardList', {
      params: {
        'n': 'CardList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1
        }
      }
    })
  },

  /**
   * 3.	个人余额列表MyAccountList
   * 
   * @param {a}  1，	系统内钱包 2，	线下银行卡虚拟账户 3，	线下对公虚拟账户 4，支付宝 5，微信 11，积分 12鸟蛋 13爱心；
   * @returns 
   */
  getMyAccountList: (a) => {
  	console.log(getSession())
    return axiosApi(devUrl + 'fina/MyAccountList', {
      params: {
        'n': 'MyAccountList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a
        }
      }
    }, 'post')
  },

  /**
   * 4.	账号明细列表AccountDetailList
   * 
   * @param {a}  1，	系统内钱包 2，	线下银行卡虚拟账户 3，	线下对公虚拟账户 4，支付宝 5，微信 11，积分 12鸟蛋 13爱心；
   * @returns 
   */
  getAccountDetailList: (a) => {
    return axiosApi(devUrl + 'fina/AccountDetailList', {
      params: {
        'n': 'AccountDetailList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a
        }
      }
    })
  },

  /**
   * 5.	支付提交PaySubmit
   * 
   * @param {a}         0支付订单，1.充值钱包，2充值爱心
   * @param {payment}   1微信；2支付宝3我的钱包；0网页版（例如paymax）收银台；4爱心，5鸟蛋
   * @param {amount}    充值金额，充值钱包或者爱心时必须
   * @param {orderId}   订单ID，支付订单时必须
   * @param {psw}       支付密码。需要支付密码时必须
   * @returns 
   */
  PaySubmit: ({
    a,
    payment,
    amount,
    orderId,
    psw
  }) => {
    return axiosApi(devUrl + 'fina/PaySubmit', {
      params: {
        'n': 'PaySubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          payment,
          amount,
          orderId,
          psw
        }
      }
    })
  },





  /**
   * 7.	提现请求提交CashApplySubmit
   * 
   * @param {a}           1 提现到银行卡,
   * @param {amount}      提现金额
   * @param {bankId}      提现银行id
   * @param {bankNode}    提现银行网点名称
   * @param {account}     账号
   * @param {accountName} 账户姓名
   * @param {password}    密码md5加密
   * @returns 
   */
  CashApplySubmit: ({
    amount,
    bankId,
    account,
    accountName,
    password,
    bankNode
  }) => {
    return axiosApi(devUrl + 'fina/CashApplySubmit', {
      params: {
        'n': 'CashApplySubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
          amount,
          bankId,
          account,
          accountName,
          password,
          bankNode,
        }
      }
    })
  },

  /**
   * 8.	查询银行列表BankList
   * 
   * @param {a} 1平台自己的虚拟银行账户2.互联网支付机构；3银行机构；
   * @returns 
   */
  getBankList: (a) => {
    return axiosApi(devUrl + 'fina/BankList', {
      params: {
        'n': 'BankList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a
        }
      }
    })
  },


  /**
   * 9.	删除个人银行卡DelCard
   * 
   * @param {id} 删除的旧银行卡卡ID；
   * @returns 
   */
  getDelCard: (id) => {
    return axiosApi(devUrl + 'fina/DelCard', {
      params: {
        'n': 'DelCard',
        's': SESSION ? SESSION : getSession(),
        'q': {
          id
        }
      }
    })
  },






  //
  // ──────────────────────────────────────────────  ─────────
  //   :::::: birdegg 鸟蛋
  // ────────────────────────────────────────────────────────────
  //
  /*
   * 	8.	鸟蛋列表EggList
   * 	@param action     1查询可偷的鸟蛋
   *	@param userIds    用户ID列表
   */
  getEggList: (a, userIds) => {
    return axiosApi(devUrl + 'birdegg/EggList', {
      params: {
        'n': 'EggList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          userIds
        }
      }
    })
  },
  /*
   * 	9.	我的鸟蛋MyEggInfo
   * 	@param action     1
   */
  getMyEggInfo: (a) => {
    return axiosApi(devUrl + 'birdegg/MyEggInfo', {
      params: {
        'n': 'MyEggInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
        }
      }
    })
  },
  /*
   * 	10.掏鸟蛋GetEggSubmit
   * 	@param action     
   * 	@param id    
   */
  GetEggSubmit: (userId) => {
    return axiosApi(devUrl + 'birdegg/GetEggSubmit', {
      params: {
        'n': 'GetEggSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 0,
          userId
        }
      }
    })
  },

  /*
   * 	12.	兑换鸟蛋—>PaySubmit
   * 	@param action     1，兑换鸟蛋，2试算
   * 	@param num     		鸟蛋数量
   */
  getExchangeEggSubmit: (a, num) => {
    return axiosApi(devUrl + 'birdegg/ExchangeEggSubmit', {
      params: {
        'n': 'ExchangeEggSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          num
        }
      }
    })
  },
  /*
   * 	13.	排行榜RankingList
   * 	@param action     1人气排行，2土豪排行
   * 	@param table     	
   */
  getRankingList: (a, table) => {
    return axiosApi(devUrl + 'birdegg/RankingList', {
      params: {
        'n': 'RankingList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          table
        }
      }
    })
  },


  ActivityInfo: () => {//1.	活动信息
    return axiosApi(devUrl + 'activity/ActivityInfo', {
      params: {
        'n': 'ActivityInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a:0,
        }
      }
    })
  },


	  BeganToDraw: (id) => {//2.	开始抽奖
    return axiosApi(devUrl + 'activity/BeganToDraw', {
      params: {
        'n': 'BeganToDraw',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a:0,
          id,
        }
      }
    })
  },

	DrawDetail:(code)=>{//3.	中奖详情
		return axiosApi(devUrl + 'activity/DrawDetail',{
			params:{
				'n':'DrawDetail',
				's': SESSION ? SESSION : getSession(),
				'q':{
					a:0,
					code,
				}
			}
		})
	},

	ClaimPrize:(code)=>{//	4.	立即兑奖
		return axiosApi(devUrl + 'activity/ClaimPrize',{
			params:{
				'n':'ClaimPrize',
				's': SESSION ? SESSION : getSession(),
				'q':{
					a:0,
					code,
				}
			}
		})
	},


  //
  // ────────────────────────────────────────────── VIII ──────────
  //   :::::: MALL 商城
  // ────────────────────────────────────────────────────────────
  //
  /*
   * 1	分类列表CategoryList
   * 	@param action 1商品分类,2定制主题
   *
   */
  getCategoryList: (a) => {
    return axiosApi(devUrl + 'mall/CategoryList', {
      params: {
        // 'n': 'CategoryList',
        //				's': SESSION?SESSION:getSession(),
        //				'q':{
        //					a
        //				}
        a

      }
    }, 'get')
  },

  /*
   * 2	商品列表 GoodsList
   * 	@param action 0 全部(不包括积分商品)，1 首页商品, 2 免费试用商品, 3 积分商品
   *	@param type 1普通商品，2定制商品
   *
   */
  getGoodsList: (arg) => {
    return axiosApi(devUrl + 'mall/GoodsList', {
        			params: {
        			'a':arg,
        			'sessionId': SESSION ? SESSION : getSession()
        			}
//    params: arg
    }, 'get')
  },

  /*
   * 3	商品详情 GoodsDetails
   * 	@param spuId 产品id
   * 	@param skuId 商品id
   *	@param promId 推广活动ID，从推广活动进入时输入
   *
   */
  getGoodsDetails: ({
    spuId,
    skuId,
 		sessionId,
  }) => {
    return axiosApi(devUrl + 'mall/GoodsDetails', {
      params: {
        spuId,
        skuId,
        sessionId
    
        //				'n': 'GoodsDetails',
        //				'q':{
        //					skuId,
        //					promId,
        //				}
      }
    }, 'get')
  },

  /*
   * 4	商品即时数据 GoodsImmediatelyDetails
   * 	@param skuId 商品id
   *	@param promId 推广活动ID，从推广活动进入时输入
   *
   */
  getGoodsImmediatelyDetails: (skuId) => {
    return axiosApi(devUrl + 'mall/GoodsImmediatelyDetails', {
      params: {
        'n': 'GoodsImmediatelyDetails',
        's': SESSION ? SESSION : getSession(),
        'q': {
          skuId,
        }
      }
    })
  },

  /*
   * 5	商店列表ShopList
   * 	@param action 0：不限类型的搜索，1.分类搜索，2.推广活动搜索，3根据主题搜索
   *	@param type 1普通商品，2定制商品（仅a=3）
   *  @paramta categoryId 分类ID（定制商品为主题ID）
   *  @parampa orgId  商店ID（查询单独的店面信息时使用）
   *  @param	searchKey  Sk  关键字搜索。服务器留意同义词的需求，部分关键词会有等同关系
   *  @param1	lastId  最后的商品ID（翻页的时候必传）
   *
   */
  getShopList: ({
    a,
    type,
    pa,
    li,
    ob,
    categoryId,
    orgId,
    lastId,
    searchKey
  }) => {
    return axiosApi(devUrl + 'mall/ShopList', {
      params: {
        's': SESSION ? SESSION : getSession(),
        a,
        type,
        pa,
        li,
        ob,
        categoryId,
        orgId,
        lastId,
        searchKey,
        //				'n': 'ShopList',
        //				's': SESSION?SESSION:getSession(),
        //				'q':{
        //					a,
        //					type,
        //					pa,
        //					li,
        //					ob,
        //					categoryId,
        //					orgId,
        //					lastId,
        //					searchKey,
        //				}
      }
    }, 'get')
  },


  /*
   * 6.推广活动信息 PromInfo
   * 	@param id 活动ID（由AdList设置的广告引入）活动ID（由AdList设置的广告引入）
   *
   */
  getPromInfo: (id) => {
    return axiosApi(devUrl + 'mall/PromInfo', {
      params: {
        //				'n': 'PromInfo',
        //				's': SESSION?SESSION:getSession(),
        //				'q':{
        //					id
        //				}
        id
      }
    }, 'get')
  },
  //定制选项列表
  getCustomizedList: (skuId) => {
    return axiosApi(devUrl + 'custom/OptionList', {
      params: {
        skuId
      }
    }, 'get')
  },
  //定制信息
  getDesignInfo: (id, a) => {
    return axiosApi(devUrl + 'custom/DesignInfo', {
      params: {
        "n": "DesignInfo ",
        "q": {
          "a": a,
          "id": id
        },
        "s": SESSION ? SESSION : getSession(),
        "m": "123"
      }
    }, 'post')
  },
  //定制设计提交
  SubmitCustomized: (obj) => {
    return axiosApi(devUrl + 'custom/DesignSubmit', {
      params: {
        'n': 'DesignSubmit',
        's': SESSION ? SESSION : getSession(),
        "m": "123",
        'q': obj
        // 'q': {
        // 	"a": 1,
        // 	"id": 2,
        // 	"skuId": 1,
        // 	"spuId": 6,
        // 	"worksImageIds": "1",
        // 	"attrs": [
        // 		{		
        // 				"imageId": "1",
        // 				"placeId": "1",
        // 				"area": {
        // 						"heigth": "1",
        // 						"width": "1",
        // 						"x": "1",
        // 						"y": "1"
        // 				},
        // 				"craftId": "1",
        // 		}
        //    ],
        // },
      }
    }, 'post')
  },

  //
  // ────────────────────────────────────────────── IX ──────────
  //   :::::: Custom定制
  // ────────────────────────────────────────────────────────────
  //



  //
  // ────────────────────────────────────────────── X ──────────
  //   :::::: Order订单
  // ────────────────────────────────────────────────────────────
  //

  /*
   *  1	购物车提交CartUpdate
   * 	@param action   1添加商品，2删除商品
   *	@param skuId    商品id
   *	@param spuId    产品id
   *	@param num      商品数量
   *	@param promId   活动ID,默认0
   */
  getCartUpdate: (a, goodsList) => {
    return axiosApi(devUrl + 'order/CartUpdate', {
      params: {
        'n': 'CartUpdate',
        's': SESSION ? SESSION : getSession(),
        "m": "123",
        'q': {
          a,
          goodsList: goodsList,
        }
      }
    })
  },


  /*
   *  2	购物车详情CartDetails
   * 	@param action 1一般实物商品（要发货的）5定制商品
   *
   */
  getCartDetails: (a) => {
    return axiosApi(devUrl + 'order/CartDetails', {
      params: {
        'n': 'CartDetails',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
        }
      }
    })
  },

  /*
	 *  3	提交订单OrderSubmit
	 * 	@param  action          1从购物车提交订单
										          2从购物车试算

   *  @param  type            1一般实物商品（要发货的）
													    5定制商品
													    21虚拟商品（不用发货）

   *  @param  sendType        0实物发货，
   * 											    1存入礼物包,
   * 											    2礼物包发货
   *  @param  addresId        送货地址，0表示存入礼物包
   *
   *  @param  shops           商店数组
   * 					  orgId         机构ID
   * 						note          其他要求
   *            coupons       优惠券ID数组，逗号分割
   * 						goods         商品对象
   * 						  skuId       商品id
   * 							spuId       产品id
   * 							num         商品数量
   * 							promId      活动ID,默认0
   * 							customId    定制ID，如果是定制商品必须，默认0
   * 	            storeId     库存ID，如果是从礼物包里面抽出来发货的，需要填入，方便定位数据
	 *
	 */
  getOrderSubmit: ({a,note,skuId,spuId,num,addresId,couponid}) => {
    return axiosApi(devUrl + 'order/OrderSubmit', {
      params: {
        'n': 'OrderSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
        a,note,skuId,spuId,num,addresId,couponid
        }
      }
    })
  },
  getOrderSubmit1: (params) => {
    return axiosApi(devUrl + 'order/OrderSubmit', {
      params: {
        'n': 'OrderSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': params
      }
    })
  },


  /*
   *  4	订单列表OrderList
   * 	@param action 1一般实物商品（要发货的）5定制商品
   *	@param status
   */
  getOrderList: (a, status) => {
    return axiosApi(devUrl + 'order/OrderList', {
      params: {
        'n': 'OrderList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          status
        }
      }
    })
  },

  /*
   *  5	订单详情OrderDetails
   * 	@param orderId 订单ID
   *
   */
  getOrderDetails: (orderId) => {
    return axiosApi(devUrl + 'order/OrderDetails', {
      params: {
        'n': 'OrderDetails',
        's': SESSION ? SESSION : getSession(),
        'q': {
          "orderId":orderId
        }
      }
    })
  },
  //物流信息
    LogisticsTicketInfo: (sn) => {
    return axiosApi(devUrl + 'order/LogisticsTicketInfo', {
      params: {
        'n': 'LogisticsTicketInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
        	"a":1,
          "sn":sn
        }
      }
    })
  },
  
  
  
  /*
   *  6	订单更新OrderUpdate
   * 	@param action  1取消订单（未支付）
   *                 2删除订单（已完成和已取消）
   *                 3.子订单更新为独立订单（在我的订单里面点‘立即支付’）
   *                 4.确认收货
   *
   *	@param subOrderId 子订单ID
   */
  getOrderUpdate: (a, orderId) => {
    return axiosApi(devUrl + 'order/OrderUpdate', {
      params: {
        'n': 'OrderUpdate',
        's': SESSION ? SESSION : getSession(),
        'q': {
          "a":a,
          "orderId":orderId
        }
      }
    })
  },

  /*
   *  7	购物车商品数量CartGoodsCount
   * 	@param action  1一般实物商品（要发货的）5定制商品
   *
   */
  getCartGoodsCount: (a) => {
    return axiosApi(devUrl + 'order/CartGoodsCount', {
      params: {
        'n': 'CartGoodsCount',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
        }
      }
    }, 'post', true)
  },










  //
  // ────────────────────────────────────────────── XI ──────────
  //   :::::: Coupon优惠券
  // ────────────────────────────────────────────────────────────
  //
  /*
   * 1.优惠券列表 CouponList
   *  @param a 1 我的优惠券
   *
   */
  getCouponList: ({
    pa,
    li,
    ob,
    ot,
    status,
    couponId
  }) => {
    return axiosApi(devUrl + 'coupon/CouponList', {
      params: {
        'n': 'CouponList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
          'ta': {
            pa,
            li,
            ob,
            ot,
            'w': {
              status,
              couponId,
            }
          }
        }
      }
    })
  },

  /*
   * 2.添加优惠券 CouponSubmit
   *  @param couponCardNum 优惠券卡号
   *
   */
  getCouponSubmit: (couponCardNum) => {
    return axiosApi(devUrl + 'coupon/CouponSubmit', {
      params: {
        'n': 'CouponSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          couponCardNum
        }
      }
    })
  },


  //
  // ────────────────────────────────────────────── XII ──────────
  //   :::::: Gift礼物系统
  // ────────────────────────────────────────────────────────────
  //
  /*
	 * 1.	赠送礼品GiftSubmit
	 *  @param aciton 			4.分享到外部
	 *  @param packageId 		转赠的时候输入
	 *  @param targetId 		派发对象ID：
													a=1:用户ID
													a=2:群ID
													a=3:微博ID
													a=4:0
	
	 *  @param content      祝福语文本内容
	 *  @param regionId     位置ID
	 *  @param regionName   位置信息
	 *  @param imageIds     图像数组，逗号分割
	 *  @param videoId   		视频ID
	 *  @param gifts   
	 *  @param |--storeId   存货ID
						 |--num       存货数量
  
	 * 	
	 *
	 */
  getGiftSubmit: (arg) => {
    return axiosApi(devUrl + 'gift/GiftSubmit', {
      params: {
        'n': 'GiftSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': arg
      }
    })
  },

  /*
   * 2.	礼物详情GiftDetails
   *  @param action        1.查看，2查看并接受礼物
   *  @param issueType        
   *  @param packageId        
   *
   */
  getGiftDetails: (a, packageId, issueType) => {
    return axiosApi(devUrl + 'gift/GiftDetails', {
      params: {
        'n': 'GiftDetails',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          packageId,
          issueType: 4
        }
      }
    })
  },

  /*
   * 3	礼物记录列表GiftLogList
   *  @param action       1.微博礼物列表  2.我的礼物记录
   *  @param id           a=1:微博ID
   *  @param table        
   *
   */
  getGiftLogList: (a, table) => {
    return axiosApi(devUrl + 'gift/GiftLogList', {
      params: {
        'n': 'GiftLogList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          ta: {
            pa: table.pa,
            li: table.li,
            ob: table.ob,
            ot: table.ot,
          }
        }
      }
    })
  },

  /*
   * 4	回收礼品GiftRecycleSubmit
   *  @param action       1回收礼物，2回收试算
   *  @param goods        商品对象   
   *  @param skuId        商品id
   *  @param spuId        产品id
   *  @param type        	1一般实物商品（要发货的） 5.定制商品 11到店服务 12上门服务  21虚拟商品（不用发货）
   *  @param num        	商品数量
   *  @param storeId      库存ID  
   *
   */
  getGiftRecycleSubmit: (a, goods) => {
    return axiosApi(devUrl + 'gift/GiftRecycleSubmit', {
      params: {
        'n': 'GiftRecycleSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          goods
        }
      }
    })
  },

  /*
   * 5	礼物商品列表GiftGoodsList
   *  @param action       3我的礼物包
   *  @param type        	1普通商品   5.定制商品   21虚拟商品（不用发货）
   *  @param table        商品对象   
   *  @param page         
   *  @param limit        
   *  @param orderBy      
   *  @param lastId       最后的商品ID（翻页的时候必传）
   *
   */
  getGiftGoodsList: (type, table) => {
    return axiosApi(devUrl + 'gift/GiftGoodsList', {
      params: {
        'n': 'GiftGoodsList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 4,
          type,
          ta: table
        }
      }
    })
  },









  //
  // ────────────────────────────────────────────── XIII ──────────
  //   :::::: CS客户服务
  // ────────────────────────────────────────────────────────────
  //
  //
  // ────────────────────────────────────────────── XIV ──────────
  //   :::::: 创业活动报名Activity
  // ────────────────────────────────────────────────────────────
  //

  /*
   * 1.学校列表SchoolList
   *  @param action       1.全部
   *
   */
  getSchoolList: () => {
    return axiosApi(devUrl + 'activity/SchoolList', {
      params: {
        'n': 'SchoolList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a: 1,
        }
      }
    })
  },

  /*
   * 2.报名列表ApplyList
   *  @param action    1.全部
   *  @param id        学校id
   *
   */
  getApplyList: (a, id) => {
    return axiosApi(devUrl + 'activity/ApplyList', {
      params: {
        'n': 'ApplyList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          id
        }
      }
    })
  },
  /*
   * 3报名详情ApplyInfo
   *  @param action       1.全部 2.我的
   *
   */
  getApplyInfo: (a, id, shareUserId) => {
    return axiosApi(devUrl + 'activity/ApplyInfo', {
      params: {
        'n': 'ApplyInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          id,
          shareUserId,
        }
      }
    })
  },
  /*
	 * 4.参与活动报名申请JoinApplySubmit
	 *  action	Number		是	1退货
			activityId	int		否	活动id
			submiterName	String		否	提交的姓名
			memberNames	String		是	队员姓名列表字符串，不做校验。 
			activityOrgName	String		是	外部活动机构名称(后台要检查重复)
			applyDesc	String		是	创业说明
			tel1	String		是	联系电话1
			imageIds	String			图片ID列表
			idCardImageIds	String			身份证图片ID列表
			schoolCardImageIds	String			学生证图片ID列表
	 *
	 */
  JoinApplySubmit: (params) => {
    return axiosApi(devUrl + 'activity/JoinApplySubmit', {
      params: {
        'n': 'JoinApplySubmit',
        's': SESSION ? SESSION : getSession(),
        'q': params
      }
    })
  },
  // ────────────────────────────────────────────── XV ──────────
  //   :::::: Mkt市场营销
  // ────────────────────────────────────────────────────────────
  //
  /*
   * 1.我的推广信息MyMarketingInfo
   *  @param action       1.我的推广成果页
   *
   */
  getMyMarketingInfo: (a) => {
    return axiosApi(devUrl + 'mkt/MyMarketingInfo', {
      params: {
        'n': 'MyMarketingInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
        }
      }
    })
  },
  /*
   * 2.2.我的代言人MarketingMemberList（鳄鱼密码）
   *  action     	0.我的代言人 1.一级 2.二级
   *	type				0 代言人 1.vip 代言人 2.普通代言人
   */
  getMarketingMemberList: (a, type) => {
    return axiosApi(devUrl + 'mkt/MarketingMemberList', {
      params: {
        'n': 'MarketingMemberList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          'a':a,
          'type':type
        }
      }
    })
  },
  /*
   * 3.推广收入列表MarketingIncomeList
   *  @param action       1.我的推广成果页
   *
   */
  getMarketingIncomeList: (a, table) => {
    return axiosApi(devUrl + 'mkt/MarketingIncomeList', {
      params: {
        'n': 'MarketingIncomeList',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          table
        }
      }
    })
  },
  /*
   * 4.加入推广员申请MarketerApplySubmit
   *  @param action       1.我的推广成果页
   *
   */
  getMarketerApplySubmit: (a, checkKey, MarketerApplyInfo) => {
    return axiosApi(devUrl + 'mkt/MarketerApplySubmit', {
      params: {
        'n': 'MarketerApplySubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          checkKey,
          MarketerApplyInfo
        }
      }
    })
  },
  /*
   * 5.邀请加入页InviteJoinPage
   *  @param action       1.我的推广成果页
   *
   */
  getMarketerApplySubmit: (a, checkKey, MarketerApplyInfo) => {
    return axiosApi(devUrl + 'mkt/MarketerApplySubmit', {
      params: {
        'n': 'MarketerApplySubmit',
        's': SESSION ? SESSION : getSession(),
        'q': {
          a,
          checkKey,
          MarketerApplyInfo
        }
      }
    })
  },
  /*
   * 6.邀请加入信息InviteJoinInfo
   *  @param shareBy       1.分享人ID
   *
   */
  getInviteJoinInfo: (shareBy) => {
    return axiosApi(devUrl + 'mkt/InviteJoinInfo', {
      params: {
        'n': 'InviteJoinInfo',
        's': SESSION ? SESSION : getSession(),
        'q': {
          shareBy
        }
      }
    })
  },
  /*
   * 7.接受邀请页AcceptInvitePage
   *
   */
  getAcceptInvitePage: (params) => {
    return axiosApi(devUrl + 'mkt/AcceptInvitePage', {
      params: {
        'n': 'AcceptInvitePage',
        's': SESSION ? SESSION : getSession(),
        'q': params
      }
    })
  },
  /*
   * 7.AcceptInviteSubmit
   *
   */
  AcceptInviteSubmit: (params) => {
    return axiosApi(devUrl + 'mkt/AcceptInviteSubmit', {
      params: {
        'n': 'AcceptInviteSubmit',
        's': SESSION ? SESSION : getSession(),
        'q': params
      }
    })
  },
}








function checkErr(status) {
  let err;
  switch (status) {
    case '1000':
      err = '未知错误'
      break;
    case '1001':
      err = '协议版本过低，服务器已经不支持（APP 版本过低）'
      break;
    case '1002':
      err = 'session id 为空或不存在'
      break;
    case '1003':
      err = '验证码错误'
      break;
    case '1004':
      err = '请求参数不完整'
      break;
    case '1010':
      err = '请求超时'
      break;
    case '1011':
      err = '请求超时'
      break;
    case '1012':
      err = 'session id 会话过期'
      break;
    case '1012':
      err = 'session id 会话过期'
      break;
    case '1013':
      err = '未更新任何数据'
      break;
    case '1014':
      err = '已经提交，不需要重复提交'
      break;
    case '1015':
      err = '短信发送失败'
      break;
    case '1016':
      err = '参数不符合条件'
      break;
    case '1020':
      err = '缓存数据可用'
      break;
    case '1100':
      err = '（用户）未登录'
      break;
    case '1101':
      err = '用户名和密码错误'
      break;
    case '1102':
      err = '（用户）标识非法'
      break;
    case '1103':
      err = '（用户）不存在'
      break;
    case '1104':
      err = '（用户）已存在'
      break;
    case '1105':
      err = '（用户）已注销'
      break;
    case '1106':
      err = '（用户）被锁定'
      break;
    case '1107':
      err = '（用户）在别处登录'
      break;
    case '1109':
      err = '用户类型错误'
      break;
    case '1110':
      err = '（用户）推荐码不存在'
      break;
    case '1113':
      err = '手机号码已经存在'
      break;
    case '1114':
      err = '（用户）电话号码已被使用'
      break;
    case '1115':
      err = '（用户）未绑定手机号码'
      break;
    case '1200':
      err = '文件大小超过限制'
      break;
    case '1201':
      err = '文件类型非法'
      break;
    case '1401':
      err = '库存不足'
      break;
    case '1406':
      err = '非法操作'
      break;
    case '9000':
      err = '没有返回状态码'
      break;
    case '9001':
      err = '请求参数格式不正确（json 格式不正确）'
      break;
    case '9002':
      err = '协议不存在'
      break;
    default:
      err = '未知错误'
      break;
  }
  return err;
}

function errorMsg(message = '请求超时，请稍后重试', isDefault = true, callback) {
  if (isDefault) {
    Toast({
      message: message,
       forbidClick: true,
      position: 'bottom',
      duration: 5000
    });
  } else {
    callback()
  }
}

export default Api;
