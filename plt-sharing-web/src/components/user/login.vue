<template>
	<div class="wrapper">
		<div class="login-header">
			<div class="header-lfet">
				<router-link to="/index"><img src="../../assets/img/logo3.png" /></router-link>
			</div>
			<div class="header-right">
				<div class="header-regi">
					<span>欢迎登录</span>
				</div>
			</div>
		</div>
		<div class="login" @keyup.enter="enterKEY()">
			<div class="loginfrom">
				<i-form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="90">
					<Form-item label="登录账号" prop="userName">
						<Input size="large" :maxlength="50" v-model="formInline.userName" placeholder="请输入登录账号" style="width: 270px;"></Input>
					</Form-item>
					<Form-item label="登录密码" prop="password">
						<Input size="large" :maxlength="16" v-model="formInline.password" placeholder="请输入登录密码" style="width: 270px;" type="password"></Input>
					</Form-item>
					<Form-item label="验证码" prop="yzcode">
						<Input size="large" :maxlength="6" style="width: 150px;;" v-model="formInline.yzcode" placeholder="请输入验证码"></Input>
						<!--<span @click="reflash()" class="yzcode">{{yzcodes}}</span>-->
						<img id="imgCode" class="imgsty" alt="验证码" @click="getimg()" :src="intImg" />
						<!--<img @click="reflash()" class="refsalsh" src="../../assets/img/reglash.svg" />-->
					</Form-item>
					<Form-item>
						<i-button type="warning" style="height: 40px;margin-left: -65px;width: 335px; font-size: 16px;letter-spacing: 10px;" @click.native="handleSubmit('formInline')" long>登录</i-button>
					</Form-item>
					<Form-item>
						<div class="tore">
							<span>还没有账号？</span><span @click="$router.push({path: '/register'})" style="color: #57A3F3;">立即注册</span>
						</div>
					</Form-item>
					<div class="forget">
						<Poptip title="联系运营找回密码" content="联系方式：0755-89589212" placement="bottom">
							<span style="color: #0080FF;">忘记密码？</span>
						</Poptip>
					</div>
				</i-form>
			</div>
		</div>
		<div class="server">
			<div class="server_cont">
				<ul>
					<li>
						<img src="../../assets/img/sy-city.png" />
						<p>100多城市</p>
					</li>
					<li>
						<img src="../../assets/img/sy-net.png" />
						<p>150多服务网点</p>
					</li>
					<li>
						<img src="../../assets/img/sy-tp.png" />
						<p>三种托盘款式</p>
					</li>
					<li>
						<img src="../../assets/img/sy-time.png" />
						<p>7x24小时服务</p>
					</li>
					<li>
						<img src="../../assets/img/sy-map.png" />
						<p>全国租托</p>
					</li>
				</ul>
			</div>
		</div>
		<myfooder></myfooder>
	</div>
</template>
<script>
	import Myfooder from '../common/Myfooder'
	export default {
		components: {
			Myfooder
		},
		data() {
			return {
				formInline: {
					userName: '',
					//					userName: 'cpp',
					//                  userName: 'tyl1',
					password: '',
					yzcode: ''
				},
				dics: {},
				yzcodes: '',
				loginimg: './static/palletimg/loginimg.png',
				intImg: '',
				ruleInline: {
					userName: [{
						required: true,
						message: '请填写用户名',
						trigger: 'blur',
						//						min:6
					}],
					password: [{
						required: true,
						message: '请填写密码',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 6,
						message: '密码长度不能小于6位',
						trigger: 'blur'
					}],
					yzcode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur',
						min: 4
					}]
				}
			}
		},
		mounted() {
			this.intImg = this.$url.appUrl + '/sharingCommRequst/getLoginKaptchaImage.do'
		},
		methods: {
			request(post, param, callback) { //方法封装
				this.$http.post(post, param).then(function(response) {
					if(callback) {
						callback(response.data);
					}
				}).catch(function(error) {
					console.log('3', error)
				})
			},
			getDic() {
				var _this = this
				var arrays = ['req_return_status', 'process_req_contract_status', 'req_rptdmg_status', 'req_transfer_status', 'product_catlog_def', 'comm_process_status', 'warehouse_leave_status', 'warehouse_put_status', 'lease_QA_type', 'bill_status']
				var url_dic = '/commDict/queryDictListByCodes.do'
				_this.request(url_dic, arrays, function(data) {
					_this.dics = data
					sessionStorage.dics = JSON.stringify(_this.dics);
				})
			},
			enterKEY() {
				this.handleSubmit('formInline')
			},
			getimg() {
				var imgCode = document.getElementById("imgCode");
				imgCode.src = imgCode.src ;
			},
			handleSubmit(name) {
				var _this = this
				var userName = _this.formInline.userName
				var password = _this.formInline.password
				var validKeyCode = _this.formInline.yzcode
				_this.$refs[name].validate((valid) => {
					if(valid) {
						_this.$http.post('/login', _this.$qs.stringify({ //参数序列号
							username: userName,
							password: password,
							validateCode:validKeyCode
						})).then(function(response) {
							if(response) {
								console.log(response.data)
								if(response.data.userType == '03') {
									_this.$Message.error({
										content: '用户名或密码错误！',
										duration: 3
									});
									return
								} else {
									_this.getDic()
									_this.$Message.success('登录成功!')
									_this.$router.push("/index")
									sessionStorage.arrays = response.data.userNameZH //设置用户名
									sessionStorage.username = response.data.userName
									sessionStorage.userType = response.data.userType //保存验证
									sessionStorage.index='0'
									localStorage.dics = _this.dics //存字典
									sessionStorage.logined = true
								}
							} else {
								_this.getimg()
								return false;
							}

						})
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.registerDiv {
		margin-top: 10px;
		margin-bottom: 10%;
		text-align: right;
		color: #00cc66;
		font-size: 14px;
		padding-right: 15px;
		cursor: pointer;
	}
	
	.login-header {
		height: 66px;
		position: relative;
		line-height: 66px;
		background: #fff;
		color: #ff3D00;
		font-size: 15px;
		/*border-bottom: 3px solid #ff3d00;*/
		display: flex;
		.header-lfet {
			flex: 3;
			margin-top: 11.6px;
			text-align: center;
		}
		.header-right {
			flex: 7;
			text-align: center;
			width: 100%;
			.header-regi {
				width: 100px;
				height: 20px;
				margin-top: 22px;
				margin-right: 10%;
				color: #444;
				letter-spacing: 1px;
				line-height: 20px;
				border-left: 1px solid #333;
				float: right;
				cursor: pointer;
			}
		}
	}
	
	.yzcode {
		display: inline-block;
		background: #D7D7D7;
		width: 100px;
		height: 36px;
		float: right;
		line-height: 40px;
		font-size: 24px;
		border-radius: 3px;
		position: relative;
		text-indent: 10px;
		cursor: pointer;
		font-family: 'STHupo'
	}
	
	.refsalsh {
		position: absolute;
		margin: 6px 0px 0px 76px;
		cursor: pointer;
		transition: All 1s ease-in-out;
		-webkit-transition: All 1s ease-in-out;
		-moz-transition: All 1s ease-in-out;
		-o-transition: All 1s ease-in-out;
	}
	
	.refsalsh:hover {
		transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
	}
	
	.login {
		padding: 200px auto;
		width: 100%;
		height: 549px;
		position: relative;
		background: url(../../../static/palletimg/loginimg.png) no-repeat 100%;
		background-size: 100%;
		.loginfrom {
			margin-top: 82px;
			margin-right: 6%;
			float: right;
			background: #fff;
			z-index: 999;
			width: 410px;
			padding: 40px 40px 28px 10px;
			border-radius: 7px;
		}
	}
	
	.login:after {
		clear: both;
	}
	
	.forget {
		float: right;
		font-size: 13px;
		cursor: pointer;
		margin-top: -10px;
	}
	
	.tore {
		height: 40px;
		line-height: 40px;
		width: 335px;
		font-size: 13px;
		background: #f1f1f1;
		border-radius: 3px;
		text-align: center;
		cursor: pointer;
		margin-left: -65px;
	}
	
	.imgsty {
		vertical-align: middle;
		width: 110px;
		height: 36px;
		margin-left: 10px;
		border-radius: 3px;
		position: absolute;
	}
	
	.server {
		width: 100%;
		height: 100px;
		background: #f2f2f2;
		.server_cont {
			width: 1200px;
			margin: 0 auto;
			height: 100%;
			background: #F2F2F2;
			li {
				float: left;
				width: 20%;
				height: 100px;
				padding: 20px 0;
				line-height: 24px;
				text-align: center;
				img {
					height: 35px;
				}
			}
		}
	}
</style>