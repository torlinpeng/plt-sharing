<template>
	<div class="content">
		<div class="logo">
			<img src="../../assets/img/logo3.png">
		</div>
		<div class="nav">
			<ul>
				<li ref='li' v-for="(keys,index) in lists"  @click="togo(index)">
					<span>{{keys.text}}</span>
				</li>
				<li @click="$router.push('/storeLogin')"><span>仓库系统</span></li>
			</ul>
		</div>
		<div class="myuser">
			<div class="haslogin" v-show="showMy">
				<div class="myname"><span>你好：{{username}}</span></div>
				<div class="myname" style="color: #0080FF;"><span @click="confirm">退出登录</span></div>
			</div>
			<div class="nologin" v-show="logreg">
				<span class="logreg" @click="$router.push({path: '/login'})">登录</span>
				<span class="logreg" style="border-left: 1px solid #ccc;" @click="$router.push({path: '/register'})">注册</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				showMy: false,
				logreg: true,
				username: '',
				Active: false,
				currentIndex: '',
				lists: [{
						text: '首页',
						link: "/index"
					}, {
						text: '我要租赁',
						link: "/palletList"
					},
					{
						text: '用户中心',
						link: '/myaccount/accountManage'
					},
					{
						text: '我要共享',
						link: "/dotransfer"
					}
				],

			}
		},
		mounted() {
			let signs = this.$store.getters.getSignIt
			var indexs = sessionStorage.index
			if(indexs){
				this.$refs.li[indexs].style.color="#FF6D00"
			}
			this.currentIndex = signs;
			if(sessionStorage.logined) {
				this.showMy = true
				this.logreg = false
				this.username = sessionStorage.arrays
			} else {
				this.showMy = false
				this.logreg = true
				this.username = ''
			}
		},
		methods: {
			confirm() {
				this.$Modal.confirm({
					content: '<p>确定退出吗?</p>',
					onOk: () => {
						sessionStorage.arrays = ""
						sessionStorage.logined = ""
						sessionStorage.userType = ""
						sessionStorage.index = ""
						this.$router.push('/login')
					},
					onCancel: () => {
					}
				})
			},
			togo(val){
				this.$router.push(this.lists[val].link)
				 this.$refs.li[val].style.color="#FF6D00"
				sessionStorage.index = val
			}
		},
	}
</script>
<style lang="scss" scoped>
	.content {
		width: 100%;
		border: none;
		height: 66PX;
		background: #fff;
		display: flex;
		box-shadow: 0px -3px 12px #666;
		.logo {
			flex: 2;
			text-align: right;
			padding: 9px 0 0 0px;
			img {
				height: 41px;
				margin-left: 55px;
				margin-top: 5px;
			}
		}
		.nav {
			flex: 7;
			li {
				list-style: none;
				padding-left: 30px;
				float: left;
				height: 62px;
				display: inline-block;
				vertical-align: middle;
				width: 15%;
				text-align: center;
				font-size: 15px;
				margin-top: 4px;
				letter-spacing: 1px;
				color: #222;
				cursor: pointer;
			}
			
			span {
				display: inline-block;
				padding: 20px 0 18px 0;
			}
			li:hover {
				color: #FF6D00;
				span {
					border-bottom: 2px solid #FF6D00;
				}
			}
			
		}
		.myuser {
			-webkit-box-flex: 2;
			flex: 2;
			text-align: center;
			margin: 23px 40px 0 0;
			cursor: pointer;
			font-size: 14px;
			margin-top: 23px;
			margin-Right: 30px;
			.haslogin {
				display: flex;
				width: 100%;
				
				.myname {
					flex: 1;
					-webkit-box-flex: 1;
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #C0C0C0;
				}
			}
			.nologin {
				.logreg {
					width: 60px;
					letter-spacing: 1px;
					display: inline-block;
					text-align: center;
				}
				.logreg:hover {
					color: #FF9600;
				}
			}
		}
	}
</style>