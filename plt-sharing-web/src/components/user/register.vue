<template>
	<div class="wrapper">
		<div class="login-header">
			<div class="header-lfet">
				<router-link to="/index"><img src="../../assets/img/logo3.png" /></router-link>
			</div>
			<div class="header-right">
				<div class="header-regi">
					<span>欢迎注册</span>
				</div>
			</div>
		</div>
		<div class="register">
			<div class="reg_left">
				<div class="reg_cont">
					<span class="zhuce">注册新用户</span>
					<i-form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="90">
						<Form-item label="登录账号" prop="user" style="margin-bottom: 20px;">
							<Input  style="width: 280px;" v-model="formInline.user" placeholder="6-20个字符，请使用英文字母、数字或组合" :min="6" :maxlength="20"></Input>
						</Form-item>
						<Form-item label="用户名称" prop="usernameZh" style="margin-bottom: 20px;">
							<Input  style="width: 280px;" placeholder="请输入中文汉字组合" :maxlength="50" v-model="formInline.usernameZh"></Input>
						</Form-item>
						<Form-item label="设置密码" prop="passwd" style="margin-bottom: 20px;">
							<Input  type="password" placeholder="6-18个字符，请使用英文字母、数字或者组合" :maxlength="16"  onpaste="return false" oncontextmenu="return false" style="width: 280px;" v-model="formInline.passwd"></Input>
						</Form-item>
						<Form-item label="确认密码" prop="passwdCheck" style="margin-bottom: 20px;">
							<Input type="password" :maxlength="18" placeholder="6-18个字符，请使用英文字母、数字或者组合" style="width: 280px;" v-model="formInline.passwdCheck"></Input>
						</Form-item>
						<Form-item label="电子邮箱" prop="mail" style="margin-bottom: 20px;">
							<Input type="text" :maxlength="100" placeholder="请输入有效的电子邮箱" style="width: 280px;" v-model="formInline.mail"></Input>
						</Form-item>
						<Form-item label="手机号码" prop="phoneNum" style="margin-bottom: 20px;">
							<Input type="text" v-model="formInline.phoneNum" placeholder="请输入正确的手机号码" style="width: 280px;" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"  :maxlength="11"></Input>
						</Form-item>
						<Form-item label="图片验证码" prop="yzcode" style="margin-bottom: 20px;">
							<Input style="width: 148px;" placeholder="请输入图片验证码" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" v-model="formInline.yzcode"></Input>
							<img id="imgCode" style="vertical-align: middle;width: 130px;height: 33px;border-radius: 3px;" alt="验证码" @click="getimg()" :src="intImg" />
						</Form-item>
						<Form-item label="短信验证码" style="margin-bottom: 20px;" prop="phoneValidKeyCode">
							<Input style="width: 148px;" :maxlength="6" placeholder="请输入短信验证码" v-model="formInline.phoneValidKeyCode" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"></Input>
							<Button type="info" :disabled="cando||!formInline.phoneNum||!formInline.user||!formInline.yzcode||!formInline.mail " style="width: 130px;text-align: center;" @click="getKeyCode">获取验证码（{{num}}s）</Button>
						</Form-item>
						<div class="agumentDiv">
							<Checkbox v-model="single" @on-change="Agree">我已阅读并同意<router-link target = '_blank' to="/registerAgree"><span class="agument">《普拉托托盘共享平台协议》</span></router-link> </Checkbox>
						</div>
						<Form-item>
							<i-button type="warning" :disabled="domit" style="height: 40px; margin-left: -60px;  width: 340px; font-size: 16px;letter-spacing: 10px; margin-top: 20px;" @click.native="handleSubmit('formInline')" long>注册</i-button>
						</Form-item>
					</i-form>
				</div>

			</div>
			<div class="reg_right">
				<div class="reg_info">
					<span style="font-size: 14px;">已有账号？</span>
					<span @click="$router.push({path: '/login'})" class="tologin">立即登录</span>
					<div class="reg_info_step">
						<span class="step_theme">
						如何快速租赁托盘
					</span>
						<div class="steps">
							<img src="../../../static/palletimg/step1.png" />
							<p style="color: #707070;">第一步</p>
							<p style="color: #707070;">注册成为普托e享租赁共享平台尊贵会员。</p>
						</div>
						<div class="steps">
							<img src="../../../static/palletimg/step2.png" />
							<p style="color: #707070;">第二步</p>
							<p style="color: #707070;">登录会员账号，畅游站内丰富托盘信息。</p>
						</div>
						<div class="steps">
							<img src="../../../static/palletimg/step3.png" />
							<p style="color: #707070;">第三步</p>
							<p style="color: #707070;">确认购买托盘前，请花60秒绑定认证信息。</p>
						</div>
						<div class="steps">
							<img src="../../../static/palletimg/step4.png" />
							<p style="color: #707070;">第四步</p>
							<p style="color: #707070;">选择完整租赁下单，运营在线审核，火速出货。</p>
						</div>
					</div>
				</div>
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
			const validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.formInline.passwdCheck !== '') {
						// 对第二个密码框单独验证
						this.$refs.formInline.validateField('passwdCheck');
					}
					callback();
				}
			}
			const validatePassCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.formInline.passwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			}
			return {
				formInline: {
					user: '',
					passwd:'',
					yzcode:'',
					passwdCheck: '',
					phoneValidKeyCode:'',
					phoneNum: '',
					usernameZh: '',
					mail:'',
				},
				single: false,
				domit:true,
				intImg:'',
				cando:false,
				num: 120,
				ruleInline: {
					user: [{
						required: true,
						type: 'string',
						message: '6-20个字符，请使用英文字母、数字或组合',
						min:6,
						trigger: 'blur',
					},{
						pattern: /^[A-Za-z0-9]+$/,
						message: '6-20个字符，请使用英文字母、数字或组合',
						trigger: 'blur'
					}],
					usernameZh: [{
						required: true,
						trigger: 'blur',
						pattern: /^[\u2E80-\u9FFF]+$/,
						message: '请输入纯汉字组合'
					}],
					passwd: [{
						required: true,
						min: 6,
						message: '密码长度不能小于6位',
						trigger: 'blur'
					},{
						validator: validatePass,
						trigger: 'blur'
					}],
					passwdCheck: [{
						required: true,
						min: 6,
						validator: validatePassCheck,
						trigger: 'blur'
					}],
					yzcode: [{
						required: true,
						message: '请输入6位数验证码',
						trigger: 'blur'
					}],
					mail: [{
						required: true,
						min:6,
						message: '请输入正确的邮箱格式',
						trigger: 'blur'
					},{
						type: 'email',
						message: '请输入正确的邮箱格式',
						trigger: 'blur'
					}],
					phoneNum: [{
						required: true,
						trigger: 'blur',
						pattern: /^1(3|4|5|7|8)\d{9}$/,//手机号
						message: '请填写正确的手机号码'
					}],
					phoneValidKeyCode: [{
						required: true,
						trigger: 'blur',
						min:6,
						message: '请输入短信验证码'
					}],
				}
			}
		},
		mounted(){
			this.intImg=this.$url.appUrl+'/sharingCommRequst/getKaptchaImage.do'
		},
		methods: {
			Agree(){
			   if(this.single){
			   	this.domit=false
			   }else{
			   	this.domit=true
			   }
			},
			getKeyCode(){
				let param={}
				param.mobil = this.formInline.phoneNum
				param.userName= this.formInline.user
				param.validKeyCode = this.formInline.yzcode
				param.email = this.formInline.mail
				var _this =this
				console.log(param)
				this.$http.post('/sharingCommRequst/sendSMSRequest.do', param).then(function(response) {
					if(response){
						_this.times()
					}else{
						_this.getimg()
						return;
					}
					
				})
				
			},
			times() {
				var _this = this;
				if(_this.num <= 1) {
					_this.num = 120
					_this.cando = false
					return false
				} else {
					_this.num--
					_this.cando = true
				}
				setTimeout(function() {
					_this.times()
				}, 1000)
				return _this.num
			},
			handleSubmit(name) {
				var _this = this
				var userInfo={}
				userInfo.userName = _this.formInline.user
				userInfo.userNameZh = _this.formInline.usernameZh
				userInfo.password = _this.formInline.passwd
				userInfo.mobil = _this.formInline.phoneNum
				userInfo.phoneValidKeyCode = _this.formInline.phoneValidKeyCode
				userInfo.validKeyCode = _this.formInline.yzcode
				userInfo.email =_this.formInline.mail
				userInfo.register = 'register'
				var reg =/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;  
				if(!reg.test(userInfo.password)){
				   _this.$refs[name].validate((valid) => {
					if(valid) {
						_this.$http.post('/sharingCommRequst/doRegister.do', {
							userName: userInfo.userName,
							userNameZh: userInfo.userNameZh,
							password: userInfo.password,
							mobil: userInfo.mobil,
							email:userInfo.email,
							validKeyCode: userInfo.validKeyCode,
							phoneValidKeyCode:userInfo.phoneValidKeyCode
						}).then(function(response) {
							console.log(response)
							if(response === undefined) {
								_this.$Message.error('输入信息有误');
							}
							if(response.status == 200) {
								_this.$Message.success('恭喜您，注册成功!')
								_this.$router.push('/login')
							} else {
								_this.$Message.error('注册未成功，请检查注册信息！');
							}
						})
					} else {
						_this.$Message.error('请完善正确的注册信息!');
					}
				})
				}else{
					_this.$Message.error('密码请输入英文加字母组合的!')
					return
				}
			},
			getimg() {
				var appRoot=this.$url.appUrl
				document.getElementById("imgCode").src =appRoot+"/sharingCommRequst/getKaptchaImage.do";
			},
		}

	}
</script>
<style lang="scss" scoped>
	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		background: #F6FAFB;
	}
	
	.login-header {
		height: 66px;
		position: relative;
		line-height: 66px;
		background: #fff;
		color: #ff3D00;
		font-size: 15px;
		border-bottom: 3px solid #ff3d00;
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
			.header-regi:hover {
				color: #FF6D00;
			}
		}
	}
	
	.register {
		width: 1200px;
		margin: 30px auto;
		background: #fff;
		display: flex;
		border-radius: 1px;
		padding: 30px 0px;
		.reg_left {
			flex: 3;
			.reg_cont {
				width: 400px;
				margin: 0 auto;
				.zhuce {
					font-size: 18px;
					padding: 0 0 18px;
					display: inline-block;
					.agumentDiv {
						/*text-align: center;*/
						padding: 0px 0 5px 28px;
					}
				}
			}
		}
		.reg_right {
			flex: 2;
			border-left: 1px solid #F2F2F2;
			.reg_info {
				width: 400px;
				margin: 0 auto;
				.tologin {
					font-size: 14px;
					color: #57A3F3;
					cursor: pointer;
				}
				.reg_info_step {
					background: #fef7ef;
					margin: 20px 0;
					padding: 30px 30px 10px;
					.step_theme {
						font-size: 18px;
						color: #fd8e5b;
						text-align: center;
						display: inline-block;
						width: 100%;
						padding: 0 0 15px;
						letter-spacing: 1px;
						border-bottom: 1px solid #fd8e5b;
					}
					.steps {
						margin: 30px 0;
						font-size: 15px;
						color: #888992;
						position: relative;
						img {
							position: absolute;
							width: 50px;
						}
						p {
							margin: 5px 0;
							margin-left: 60px;
						}
					}
				}
			}
		}
	}
	
	.wrapper>h1 {
		text-align: center;
		vertical-align: middle;
		margin-bottom: 20px;
		color: #000;
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