<template>
	<div class="wrapper">
		<div class="head"><span class="theme">普拉托专属仓库管理平台</span></div>
		<div class="login">
			<div class="contents">
				<div class="leftlogin">
					<img src="../../../../static/palletimg/slide-3.png" />
					<div class="slide-title">普拉托专属仓库管理平台</div>
					<div class="slide-tip">
						<p>简单上手，一站式收发货，用心服务</p>
						<p>快捷、简单、大数据</p>
					</div>
				</div>
				<div class="loginfrom" @keyup.enter="enterKEY()">
					<i-form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
						<Form-item label="账户名" prop="userName">
							<Input size="large" v-model="formInline.userName" placeholder="请输入账户名" style="width: 220px;"></Input>
						</Form-item>
						<Form-item label="密码" prop="password">
							<Input size="large" v-model="formInline.password" placeholder="请输入密码" style="width: 220px;" type="password"></Input>
						</Form-item>
						<Form-item label="验证码" prop="yzcode">
							<Input size="large" style="width: 117px;" v-model="formInline.yzcode" placeholder="请输入验证码"></Input>
							<img id="imgCode" class="imgsty" alt="验证码" @click="getimg()" :src="intImg" />
							<!--<span @click="reflash()" class="yzcode">{{yzcodes}}</span>
							<img @click="reflash()" class="refsalsh" src="../../../assets/img/reglash.svg" />-->
						</Form-item>
						<div style="margin: 24px 0;">
							<i-button type="warning" style="height: 40px; margin-left: 25px; width: 275px; font-size: 16px;letter-spacing: 10px;" @click.native="handleSubmit('formInline')" long>登录</i-button>
						</div>
						<!--<Form-item>
						<div class="tore">
							<span>还没有账号？</span><span @click="$router.push({path: '/register'})" style="color: #57A3F3;">立即注册</span>
						</div>
					</Form-item>-->
						<div class="domore">
							<div class="pallet">
								<span style="color: #999;" @click="$router.push({path: '/index'})">普托e享</span>
							</div>
							<div class="forget">
								<Poptip title="联系运营找回密码" content="联系方式：0755-89589212" placement="bottom">
									<span style="color: #0080FF;">忘记密码？</span>
								</Poptip>
							</div>
						</div>

					</i-form>
				</div>
			</div>
		</div>
		<footer class="footer">
			<p class="text-muted text-center">版权所有　深圳普拉托科技有限公司　粤ICP备17052486号-2　 地址：深圳市龙岗区龙岗中心城鹏达摩尔城商务中心1303</p>
		</footer>
		<!--<myfooder></myfooder>-->
	</div>
</template>
<script>
	import Myfooder from '../../common/Myfooder'
	import { saveScrollPosition } from '../../../filters/mixins.js'
	export default {
		components: {
			Myfooder
		},
		mixins: [saveScrollPosition],
		data() {
			return {
				formInline: {
					userName: '',
					password: '',
					yzcode: '',
				},
				dics: {},
				yzcodes: '',
				intImg: '',
				ruleInline: {
					userName: [{
						required: true,
						message: '请填写用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请填写密码',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 5,
						message: '密码长度不能小于5位',
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
			enterKEY() {
				this.handleSubmit('formInline')
			},
			getDic() {
				var _this = this
				var arrays = ['req_return_status', 'process_req_contract_status', 'req_rptdmg_status', 'req_transfer_status', 'product_catlog_def', 'comm_process_status', 'warehouse_leave_status', 'warehouse_put_status', 'lease_QA_type', 'bill_status']
				var url_dic = '/commDict/queryDictListByCodes.do'
				_this.request(url_dic, arrays, function(data) {
					_this.dics = data
					sessionStorage.dics = JSON.stringify(_this.dics);
					console.log(222, _this.dics)
				})
			},
			getimg() {
				var imgCode = document.getElementById("imgCode") ;
				imgCode.src = imgCode.src ;
			},
			handleSubmit(name) {
				var _this = this
				var userName = _this.formInline.userName
				var password = _this.formInline.password
				var validateCode = _this.formInline.yzcode
				_this.$refs[name].validate((valid) => {
					if(valid) {
						//					if(valid) {
						_this.$http.post('/login', _this.$qs.stringify({ //参数序列号
							username: userName,
							password: password,
							validateCode:validateCode
						})).then(function(response) {
							if(response) {
								if(response.data.userType != '03') {
									_this.$Message.error({
										content: '用户名或密码错误',
										duration: 3
									});
									return
								} else {
									_this.getDic()
									_this.$router.push("/outStore")
									_this.$Message.success('登录成功!')
									sessionStorage.wareNameZH = response.data.userNameZH //设置用户名
									sessionStorage.warename = response.data.userName
									sessionStorage.userType = response.data.userType //保存验证
									sessionStorage.logined = true
								}

							} else {
							   _this.getimg()
								return false
							}

						})
					}else {
						_this.$Message.error('登录失败!')
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
	
	.head {
		height: 90px;
		text-align: center;
		font-size: 26px;
		line-height: 90px;
		letter-spacing: 1px;
	}
	
	.login {
		padding: 200px auto;
		width: 100%;
		margin: 0 auto;
		height: 480px;
		text-align: center;
		position: relative;
		background: #457ff4;
		/*background: #138cfc;*/
		/*background: #0c6bea;*/
		background: #0c69e2;
		.theme {
			display: inline-block;
			margin-top: 40px;
			font-size: 45px;
			letter-spacing: 2px;
			color: #fff;
			font-family: STKaiti;
		}
	}
	.imgsty {
		vertical-align: middle;
		width: 100px;
		height: 36px;
		/*margin-left: 10px;*/
		border-radius: 3px;
	}
	.contents {
		width: 1200px;
		margin: 0 auto;
		.leftlogin {
			margin: 35px 10px 0 0;
			float: left;
			position: relative;
			.slide-title {
				width: 100%;
				position: absolute;
				top: 120px;
				color: #f7f033;
				font-size: 40px;
				text-align: center;
			}
			.slide-tip {
				width: 100%;
				position: absolute;
				top: 220px;
				font-size: 24px;
				color: #fff;
				text-align: center;
				line-height: 150%;
				-moz-text-shadow: 4px 5px 10px #2a3877;
				text-shadow: 4px 5px 10px #2a3877;
				filter: shadow(Color=#2a3877, Direction=135, Strength=10);
			}
		}
		.loginfrom {
			margin: 77px 0 0 120px;
			float: left;
			background: #fff;
			z-index: 999;
			/*width: 320px;*/
			padding: 45px 40px 28px 10px;
			border-radius: 7px;
			.yzcode {
				display: inline-block;
				background: #D7D7D7;
				width: 90px;
				height: 36px;
				float: right;
				line-height: 40px;
				font-size: 23px;
				text-align: left;
				border-radius: 3px;
				position: relative;
				text-indent: 6px;
				cursor: pointer;
				font-family: 'STHupo'
			}
			.refsalsh {
				position: absolute;
				margin: 6px 0px 0 62px;
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
		}
	}
	
	.contents:after {
		clear: both;
	}
	
	.domore {
		width: 100%;
		cursor: pointer;
		.forget {
			float: right;
			font-size: 13px;
			cursor: pointer;
			margin-top: -10px;
		}
		.pallet {
			float: left;
			font-size: 13px;
			cursor: pointer;
			margin: -10px 0 0 30px;
		}
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
		margin-left: -55px;
	}
	
	.footer {
		width: 100%;
		height: 60px;
		background-color: #fff;
		.text-muted {
			color: #777;
		}
		.text-center {
			text-align: center;
		}
	}
	
	.footer p {
		top: 60%;
		font-size: 15px;
		position: relative;
		margin: 0px;
	}
</style>