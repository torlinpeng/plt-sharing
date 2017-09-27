import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'hash',
//	mode: 'history', //切换路径模式，变成history模式 hash
	scrollBehavior: () => ({
		y: 0
	}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置

	routes: [{
			path: '/',
			redirect: '/index'
		},
		{
			path: '/myaccount',
			name: '/我的账户',
			component: resolve => require(['../components/account/myaccount.vue'], resolve),
			children: [{
					name: '/账户管理',
					path: '/myaccount/accountManage',
					component: resolve => require(['../components/account/accountManage.vue'], resolve),
					beforeEnter: (to, from, next) => {
						let userType = sessionStorage.userType
						let logined = sessionStorage.logined
						if(logined == '' || !logined) {
							next({
								path: '/login'
							})
						} else if(userType != '02') {
							next({
								path: '/legalize',
							})
						} else {
							next()
						}
					}
				},
				{
					name: '/收益查询',
					path: '/myaccount/queryIncome',
					component: resolve => require(['../components/account/queryIncome.vue'], resolve)
				},
				{
					name: '/资金注入',
					path: '/myaccount/queryBill',
					component: resolve => require(['../components/account/queryBill.vue'], resolve)
				},
				{
					name: '/我的资产包',
					path: '/myaccount/queryAssets',
					component: resolve => require(['../components/account/queryAssets.vue'], resolve)
				},
				{
					name: '/任务列表',
					path: '/myaccount/queryTask',
					component: resolve => require(['../components/account/queryTask.vue'], resolve),
					beforeEnter: (to, from, next) => {
						let userType = sessionStorage.userType
						let logined = sessionStorage.logined
						if(logined == '' || !logined) {
							next({
								path: '/login'
							})
						} else if(userType != '02') {
							next({
								path: '/legalize',
							})
						} else {
							next()
						}
					}
				},
				{
					name: '/租借记录',
					path: '/myaccount/queryRecord',
					component: resolve => require(['../components/account/queryRecord.vue'], resolve)
				},
				{
					name: '/合约查询',
					path: '/myaccount/queryContract',
					component: resolve => require(['../components/account/queryContract.vue'], resolve)
				},
				{
					name: '/账单管理',
					path: '/myaccount/queryMyInfo',
					component: resolve => require(['../components/account/queryMyInfo.vue'], resolve)
				},
				{
					name: '/密码修改',
					path: '/myaccount/changePassword',
					component: resolve => require(['../components/account/changePassword.vue'], resolve)
				}
				

			]
		},
		{
			path: '/rents',
			name: '租借订单',
			component: resolve => require(['../components/leases/rents.vue'], resolve),
			//			meta: { requiresAuth: true },
			beforeEnter: (to, from, next) => {
				let logined = sessionStorage.logined
				let userType = sessionStorage.userType
				if(logined == '' || !logined) {
					next({
						path: '/login'
					})
				} else if(logined && userType != '02') {
					next({
						path: '/legalize',
					})
				} else {
					next()
				}
			}
		},
		{
			path: '/rentAgain',
			name: '租借驳回下单',
			component: resolve => require(['../components/leases/rentAgain.vue'], resolve),
		},
		{
			path: '/login',
			name: '登录',
			component: resolve => require(['../components/user/login.vue'], resolve)
		},
		{
			path: '/register',
			name: '注册',
			component: resolve => require(['../components/user/register.vue'], resolve)
		},
		{
			name: '/注册合约',
			path: '/registerAgree',
			component: resolve => require(['../components/common/agreement/registerAgree.vue'], resolve)
		},
		{
			name: '/租赁合约',
			path: '/rentAgree',
			component: resolve => require(['../components/common/agreement/rentAgree.vue'], resolve)
		},
		{
			path: '/legalize',
			name: '身份认证',
			component: resolve => require(['../components/user/legalize.vue'], resolve)
		},
		{
			path: '/changePwd',
			name: '修改密码',
			component: resolve => require(['../components/user/changePwd.vue'], resolve)
		},
		{
			path: '/index',
			name: '首页',
			component: resolve => require(['../components/common/index.vue'], resolve)
		},
		{
			path: '/palletList',
			name: 'palletList',
			component: resolve => require(['../components/palletlist/palletList.vue'], resolve)
		},
		{
			path: '/downWind',
			name: 'downWind',
			component: resolve => require(['../components/palletlist/downWind.vue'], resolve)
		},
		{
			path: '/doshare',
			name: 'doshare',
			component: resolve => require(['../components/share/doshare.vue'], resolve)
		},
		{
			path: '/myproperty',
			name: 'myproperty',
			component: resolve => require(['../components/share/myproperty.vue'], resolve)
		},
		{
			path: '/dotransfer',
			name: 'dotransfer',
			component: resolve => require(['../components/share/dotransfer.vue'], resolve)
		},
		{
			path: '/storeManage',
			name: '仓库管理2',
			component: resolve => require(['../components/warehouse/storeManage.vue'], resolve)
		},
		{
			path: '/storeLogin',
			name: '仓库管理员登录',
			component: resolve => require(['../components/warehouse/storeuser/storeLogin.vue'], resolve)
		},
		{
			path: '/wareRoom',
			name: '仓库管理1',
			component: resolve => require(['../components/warehouse/wareRoom.vue'], resolve),
			children: [{
					path: '/outStore',
					name: '出库管理',
					component: resolve => require(['../components/warehouse/outStore.vue'], resolve)
				},
				{
					path: '/putStore',
					name: '入库管理',
					component: resolve => require(['../components/warehouse/putStore.vue'], resolve)
				},
				{
					path: '/queryStock',
					name: '仓库流水',
					component: resolve => require(['../components/warehouse/queryStock.vue'], resolve)
				},
				{
					path: '/storeKeeper',
					name: '管理员设置',
					component: resolve => require(['../components/warehouse/storeKeeper.vue'], resolve)
				},
				{
					path: '/queryStoreBill',
					name: '仓库账单',
					component: resolve => require(['../components/warehouse/queryStoreBill.vue'], resolve)
				},
				
			]
		}

	]
})