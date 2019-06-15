/**
 * Created by Cris on 2018/1/25.
 */
import Api from '@/api'
import store from '@/store/store.js'

var app = {

	type: function() {
		var u = navigator.userAgent;
		return { //移动终端浏览器版本信息
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			androidToJs: u.indexOf('androidToJs') > -1 || u.indexOf('Linux') > -1, //androidToJs终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1,
			wechat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
			//是否web应该程序，没有头部与底部
		};
	}()
}

let callApp = {
	CallApp: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.CallApp.postMessage(param);
		} else if(app.type.androidToJs) {
			window.androidToJs.CallApp(param);
			console.log(param);
		}
	},
	testType() {
		//  console.log(app.type)
		return app.type
	},
	getSession: function(session) {
		//       alert(session)
		//           localStorage.removeItem('sessionId');

		return new Promise((resolve, reject) => {
			var timer = setInterval(getSessionId, 50);

			function getSessionId() {
				localStorage.setItem('sessionId', session);
				Api.setSessionId(session)
				if(localStorage.getItem('sessionId') && localStorage.getItem('sessionId') != null) {

					Api.UserDetails(0).then((res) => {

						if(res.q.s != 0) {

							store.dispatch('changeLogin', false)
						} else {
							store.dispatch('changeLogin', true)
						}

					})
					clearInterval(timer);
					resolve()
				}
			}
		})

	},
	getAvatarPath: function(url) {
        
		store.dispatch("Avatar", url)

	},

	gobackward() {

	},

	checkOutCounter: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.checkOutCounter.postMessage(param);
		} else {
			window.androidToJs.checkOutCounter();
		}
	},
	invokeLogout: function(param) {

		if(app.type.ios) {
			window.webkit.messageHandlers.invokeLogout.postMessage(param);
		} else {
			window.androidToJs.invokeLogout();
		}

	},
	invokeWithdraw: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeWithdraw.postMessage(param);
		} else {
			window.androidToJs.invokeWithdraw(JSON.stringify(param));
		}

	},
	invokeImHelper: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeImHelper.postMessage(param);
		} else {
			window.androidToJs.invokeImHelper();
		}

	},
	//清除缓存

	invokeClearCache: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeClearCache.postMessage(param);
		} else {
			window.androidToJs.invokeClearCache();
		}

	},
	//提交订单
	invokeCheckoutCounter: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeCheckoutCounter.postMessage(param);
		} else {
			window.androidToJs.invokeCheckoutCounter(JSON.stringify(param));
		}

	},
	//App登录
	invokeLogin: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeLogin.postMessage(param);
		} else {
			window.androidToJs.invokeLogin();
		}

	},

	//调用APP 保存图片到本地
	invokeSavePhoto: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeSavePhoto.postMessage(param);
		} else {
			window.androidToJs.invokeSavePhoto(JSON.stringify(param));
		}

	},
	//调用APP 选取本地图片
	invokeTakePhoto: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeTakePhoto.postMessage(param);
		} else {
			window.androidToJs.invokeTakePhoto(JSON.stringify(param));
		}

	},

	//改变APP顶部背景
	invokeSwithStatusBar: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeSwithStatusBar.postMessage(param);
		} else {
			window.androidToJs.invokeSwithStatusBar(JSON.stringify(param));
		}

	},

	//分享
	invokeShare: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeShare.postMessage(param);
		} else {
			window.androidToJs.invokeShare(JSON.stringify(param));
		}
	},
	invokeShowLoginDialog: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeShowLoginDialog.postMessage(param);
		} else {
			window.androidToJs.invokeShowLoginDialog(JSON.stringify(param));
		}
	},
	//打开小程序
	invokeJumpToMini: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeJumpToMini.postMessage(param);
		} else {
			window.androidToJs.invokeJumpToMini(JSON.stringify(param));
		}
	},
	//联系客服
	invokeImWithHelper: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeImWithHelper.postMessage(param);
		} else {
			window.androidToJs.invokeImWithHelper(JSON.stringify(param));
		}
	},
	CashierDesk: function(param) {
		param.from = 'chxgo';
		if(app.type.ios) {
			window.webkit.messageHandlers.CashierDesk.postMessage(param);
		} else {
			window.androidToJs.CashierDesk(JSON.stringify(param));
		}
	},
	CallPage: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.CallPage.postMessage(param);
		} else {
			window.androidToJs.CallPage(JSON.stringify(param));
		}
	},
	backward: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.backward.postMessage(param);
		} else {
			window.androidToJs.backward(JSON.stringify(param));
		}
	},
	forward: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.forward.postMessage(param);
		} else {
			window.androidToJs.forward(JSON.stringify(param));
		}
	},
	//发起订单提交的界面
	invokeOrderSubmit(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeOrderSubmit.postMessage(param);
		} else {
			window.androidToJs.invokeOrderSubmit(JSON.stringify(param));
		}
	},
	ShowTab: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.ShowTab.postMessage(param);
		} else {
			window.androidToJs.ShowTab(JSON.stringify(param));
		}
	},
	invokeCashApply: function(param) {
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeCashApply.postMessage(param);
		} else {
			window.androidToJs.invokeCashApply(JSON.stringify(param));
		}
	},

	invokeChooseContact: function(param) { //调用选择好友方法
		if(app.type.ios) {
			window.webkit.messageHandlers.invokeChooseContact.postMessage(param);
		} else {
			window.androidToJs.invokeChooseContact(JSON.stringify(param));
		}
	},
	// 送給好友
	sendGift: function(param) { //送給好友
		if(app.type.ios) {
			window.webkit.messageHandlers.sendGift.postMessage(param);
		} else {
			window.androidToJs.sendGift(JSON.stringify(param));
		}
	},
	chooseContactResult: function(param) { //选择好友结果
		console.log(param);
		// alert(param);
		//  localStorage.removeItem('session')
		localStorage.setItem('param', param);
	},
}

window.CallApp = callApp.CallApp;
window.invokeShare = callApp.invokeShare;
window.CashierDesk = callApp.CashierDesk;
window.CallPage = callApp.CallPage;
window.backward = callApp.backward;
window.forward = callApp.forward;

window.invokeOrderSubmit = callApp.invokeOrderSubmit;
window.invokeImWithHelper = callApp.invokeImWithHelper;
window.invokeCashApply = callApp.invokeCashApply;

window.ShowTab = callApp.ShowTab;
//爱心充值
window.checkOutCounter = callApp.checkOutCounter;
window.invokeChooseContact = callApp.invokeChooseContact;
window.sendGift = callApp.sendGift;

//清除缓存
window.invokeClearCache = callApp.invokeClearCache;

//改变App顶部
window.invokeSwithStatusBar = callApp.invokeSwithStatusBar;

//登出
window.invokeLogout = callApp.invokeLogout;
//测试
window.invokeShowLoginDialog = callApp.invokeShowLoginDialog;
//打开小程序
window.invokeJumpToMini = callApp.invokeJumpToMini;
//登录
window.invokeLogin = callApp.invokeLogin;

//App提现页面
window.invokeWithdraw = callApp.invokeWithdraw;

//App保存图片
window.invokeSavePhoto = callApp.invokeSavePhoto;

//App客服页面
window.invokeImHelper = callApp.invokeImHelper;

//接收参数
window.chooseContactResult = callApp.chooseContactResult;
//获取session
window.getSession = callApp.getSession;

//App 选区本地图片
window.invokeTakePhoto = callApp.invokeTakePhoto;

//App 获取头像

window.getAvatarPath = callApp.getAvatarPath;

export default callApp;