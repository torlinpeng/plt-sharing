import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
//import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'
import store from './store/index'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload';
//import IEcharts from 'vue-echarts-v3';
Vue.use(iView)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
	preLoad: 1.3,
	loading: '../static/loadings.gif',
	attempt: 1
});
axios.interceptors.request.use(function(config) { //发送请求成功的回调
	store.state.loadingshow = true
	return config;
}, function(err) {
	store.state.loadingshow = false
	//	console.log('错误1',err)
})
axios.interceptors.response.use(function(config) { //响应事件拦截器 //请求响应成功的回调
	store.state.loadingshow = false
	return config;
}, function(err) {
	store.state.loadingshow = false
	if(err && err.response) {
		if(err.response.status == '403') {
			var msg403="";
			if(err.response.data && err.response.data.Msg){
				msg403 = err.response.data.Msg;
			}else{
				msg403 = '您暂无权限，不能进行操作，请返回登录！';
			}
			if(sessionStorage.userType == "03"){
				iView.Modal.warning({
				title: '提示',
				cancelText: ' ',
				content: msg403,
				onOk: () => {
					router.push("/storeLogin")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				},
				onCancel:()=>{
					router.push("/storeLogin")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				}
			});
			}else{
				iView.Modal.warning({
				title: '提示',
				cancelText: ' ',
				content: msg403,
				onOk: () => {
					router.push("/login")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				},
				onCancel:()=>{
					router.push("/login")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				}
			});
			}
			return;
			
			
			
		}else if(err.response.status == '404') {
			iView.Message.error({
				content: '请求的资源不存在！',
				duration: 5
			})
			return;
		}
		else if(err.response.status == '503') {
			iView.Message.error({
				content: '服务不可用！',
				duration: 5
			})
			return false;
		}
		else if(err.response.status == '504') {
			iView.Message.error({
				content: '服务暂停，请稍候...',
				duration: 5
			})
			return;
		}
		else if(err.response.data.MsgId == '-101') {
			iView.Message.error({
				content: err.response.data.Msg,
				duration: 5
			})
			return;
		} else if(err.response.data.MsgId == '-102') {
			if(sessionStorage.userType == "03"){
				iView.Modal.warning({
				title: '提示',
				cancelText: ' ',
				content: err.response.data.Msg,
				onOk: () => {
					router.push("/storeLogin")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				},
				onCancel:()=>{
					router.push("/storeLogin")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				}
			});
			}else{
				iView.Modal.warning({
				title: '提示',
				cancelText: ' ',
				content: err.response.data.Msg,
				onOk: () => {
					router.push("/login")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				},
				onCancel:()=>{
					router.push("/login")
					sessionStorage.arrays = ""
					sessionStorage.logined = ""
					sessionStorage.userType = ""
				}
			});
			}
			
			return;
		}else{
			iView.Message.error({
				content: err.response.data.Msg,
				duration: 5
			})
			return;
		}
	}
	console.log("错误编码：", err.response, "错误原因：", err.response.data.Msg)

});
//将axios挂载到全局
//axios.defaults.baseURL = 'http://192.168.1.151:8080/plt-sharing-app'	
//axios.defaults.baseURL = 'http://127.0.0.1:8080/plt-sharing-app'
axios.defaults.baseURL = '/plt-sharing-app' //axios请求
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios
//Vue.prototype.$url= {'appUrl':'http://192.168.1.151:8080/plt-sharing-app'}//图片和上传图片的
Vue.prototype.$url = {
	'appUrl': '/plt-sharing-app'
} //图片和上传图片的
//将序列化挂载到全局
Vue.prototype.$qs = require('qs')

Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})