<template>
	<div class="from">
		<Tabs type="card">
			<Tab-pane label="密码修改">
				<div class="changepw">
					<i-form ref="pwd" :model="pwd" :rules="pwdrule" :label-width="90">
						<Form-item label="旧密码：" prop="oldpw" style="margin-bottom: 20px;">
							<Input type="password" style="width: 280px;" v-model="pwd.oldpw"></Input>
						</Form-item>

						<Form-item label="新密码：" prop="newpw" style="margin-bottom: 20px;">
							<Input type="password" style="width: 280px;" v-model="pwd.newpw"></Input>
						</Form-item>
						<Form-item label="确认密码：" prop="renewpw" style="margin-bottom: 20px;">
							<Input type="password" style="width: 280px;" v-model="pwd.renewpw"></Input>
						</Form-item>
						<Form-item>
							<i-button type="warning" style="height: 40px;width: 280px; font-size: 16px; margin-top: 20px;" @click.native="handleSubmit('pwd')" long>确定修改</i-button>
						</Form-item>
					</i-form>
				</div>
			</Tab-pane>
		</Tabs>
	</div>
</template>

<script>
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.pwd.renewpw !== '') {
						// 对第二个密码框单独验证
						this.$refs.pwd.validateField('renewpw');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.pwd.newpw) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				pwd: {
					oldpw: '',
					newpw: '',
					renewpw: ''
				},
				pwdrule: {
					oldpw: [{
						required: true,
						min: 6,
						message: '密码长度不能小于6位',
						trigger: 'blur'
					}],
					newpw: [{
						validator: validatePass,
						required: true,
						min: 6,
						message: '新密码长度不能小于6位',
						trigger: 'blur'
					}],
					renewpw: [{
						required: true,
						validator: validatePassCheck,
						min: 6,
						//						message: '新密码长度不能小于6位',
						trigger: 'blur'
					}],
				}
			}
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
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						let pwurl = 'updatePassword.do'
						let param = {
							newPwd: this.pwd.newpw,
							oldPwd: this.pwd.oldpw
						}
						var _this = this
						this.$Modal.confirm({
							title: '提交确认',
							content: '确定修改密码？',
							onOk: () => {
								this.request(pwurl, param, function(data) {
									if(data.responseCode == '1001') {
										_this.$Message.error({
											content: data.responseMsg,
											duration: 3
										});
										return
									} else if(data.responseCode == '0') {
										_this.$Message.success({
											content: '密码修改成功！',
											duration: 3
										});
									} else {
										_this.$Message.error('密码修改失败!');
									}
								})
								_this.handleReset(name)
							}
						})
					} else {
						_this.$Message.error('密码修改失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
		}
	}
</script>

<style scoped lang="scss">
	.from {
		padding: 20px 30px 0;
		.changepw {
			width: 400px;
			margin: 20px auto;
		}
	}
</style>