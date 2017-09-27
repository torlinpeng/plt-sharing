<template>
	<div class="main">
		<div class="header">
			<div class="lefts">
				<img src="./img/logo3.png" />
				<span>普拉托仓库管理系统</span>
			</div>
			<div class="rights">
			<span>管理员：{{username}}</span>
				<!--<Badge count="1" overflow-count="99">-->
						<!--<Dropdown-menu slot="list">-->
							<!--<span class="dodo" @click="tologin">下单平台</span>-->
							<span class="dodo" @click="confirm">退出登录</span>
							<!--<span class="dodo" @click="$router.push({path: '/changePwd'})">修改密码</span>-->
						<!--</Dropdown-menu>-->
					
				<!--</Badge>-->
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
			}
		},
		mounted() {
			if(sessionStorage.logined) {
				this.username = sessionStorage.wareNameZH
			} else {
				this.username = ''
			}
		},
		methods: {
			confirm() {
				this.$Modal.confirm({
					content: '<p>确定退出吗?</p>',
					onOk: () => {
						sessionStorage.wareNameZH = ""
						sessionStorage.logined = ""
						this.$router.push('/storeLogin')
					},
					onCancel: () => {
						//this.$Message.info('点击了取消');
					}
				})
			},
			tologin() {
				var warehouse = 'warehouse'
				this.$router.push({
					path: '/login',
					query: {
						from: warehouse
					}
				}) //路由传id
			}
		}
	}
</script>
<style lang="scss">
	.header {
		height: 65px;
		line-height: 65px;
		font-size: 20px;
		padding: 0 30px;
		width: 100%;
		background: #fff;
		position: relative;
		box-shadow: 0px -3px 12px #666;
		.lefts {
			float: left;
			img {
				margin: 10px;
				position: absolute;
			}
			span {
				display: inline-block;
				text-indent: 290px;
				letter-spacing: 1px;
			}
		}
		.rights {
			float: right;
			font-size: 13px;
			span{
				margin-right: 20px;
				cursor: pointer;
			}
			span.dodo{
				color: #00CC66;
			}
			span.dodo:hover{
				color: #FF4E00;
				
			}
		}
	}
</style>