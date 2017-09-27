<template>
	<div class="wrapper">
		<div class="register">
			<div class="theme">
				<span>信息认证</span>
			</div>
			<div class="themeclass">
				<Icon type="information-circled"></Icon>
				<span>上传验证资料(营业执照+业务授权书+操作员身份证)</span>
			</div>
			<div v-if="initData.status" class="agumentDiv" style="float: right;margin-right: 20px;">
				<span>审核状态：</span>
				<span v-if="initData.status=='01'" style="color: #00CC66;">已审核通过</span>
				<span v-if="initData.status=='00'" style="color: #0F58F0 ;">审核中..</span>
				<span v-if="initData.status=='02'" style="color: #FF0000;">未审核通过
					<span style="margin-left: 20px;">原因：{{initData.bizDesc}}</span></span>
			</div>
			<div class="updown">
				<Upload title="请将文件压缩后上传,大小不超过2M" ref="upload" v-if="initData.status=='02'||!initData.status" multiple
					 :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-exceeded-size="handleMaxSize" :max-size="2048" :format="['rar','zip','7z']" :on-format-error="handleFormatError" type="drag" :data="updata" :action="urls" style="width: 100px;float: left;">
					<div style="padding: 10px 0">
						<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						<p style="color: #007ACC;">点击上传文件</p>
					</div>
				</Upload>
				<div v-if="initData.status" class="downLoad">
					<a :href="downImg">
						<p>点击下载文件</p>
					</a>
				</div>
			</div>
			<div class="themeclass">
				<Icon type="information-circled"></Icon>
				<span>基本信息</span>
			</div>
			<i-form ref="initData" :model="initData" :rules="ruleInline" :label-width="90">
				<div class="reg-col">
					<Form-item label="单位名称" prop="participantName" style="width: 360px;margin-bottom:20px; float: left;">
						<Input v-model="initData.participantName" :disabled="disa" placeholder="请输入单位名称"></Input>
					</Form-item>
					<Form-item label="单位类型" prop="participantType" style="width: 360px;margin-bottom:20px; float: right;">
						<Select v-model="initData.participantType" :disabled="disa">
							<Option v-for="item in main_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
						</Select>
					</Form-item>
				</div>
				<div class="reg-col">
					<Form-item label="证件类型" prop="identityType" style="width: 360px;margin-bottom:20px; float: left;">
						<Select v-model="initData.identityType" :disabled="disa">
							<Option v-for="item in iden_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
						</Select>
					</Form-item>
					<Form-item label="证件号码" prop="identityNo" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="initData.identityNo" :disabled="disa" placeholder="请输入证件号码" :maxlength="18"></Input>
					</Form-item>
				</div>
				<div class="reg-col">
					<Form-item label="账户名称" prop="holderName" style="width: 360px;margin-bottom:20px; float: left;">
						<Input v-model="initData.holderName" :disabled="disa" placeholder="请输入户名"></Input>
					</Form-item>
					<Form-item label="银行名称" prop="bankName" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="initData.bankName" :disabled="disa" placeholder="请输入银行名称"></Input>
					</Form-item>
				</div>
				<div class="reg-col">
					<Form-item label="银行账号" prop="bankCardNo" style="width: 360px;margin-bottom:20px; float: left;">
						<Input v-model="initData.bankCardNo" :maxlength="24" :disabled="disa" placeholder="请输入银行账号"></Input>
					</Form-item>
					<Form-item label="缴税税号" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="initData.identityNo" disabled placeholder="请输入缴税税号" :maxlength="20"></Input>
					</Form-item>
				</div>
				<div class="reg-col">
					<Form-item label="纳税人类型" prop="taxType" style="width: 360px;margin-bottom:20px; float: left;">
						<Select v-model="initData.taxType" :disabled="disa">
							<Option v-for="item in tax_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
						</Select>
					</Form-item>
					<Form-item label="测试金额" prop="" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="initData.testTransfAmt" disabled placeholder="请输入转账测试金额"></Input>
					</Form-item>
				</div>
				<div class="themeclass">
					<Icon type="person"></Icon>
					<span>联系人信息</span>
				</div>
				<div class="reg-col">
					<Form-item label="用户名称" prop="linkMan" style="width: 360px;margin-bottom:20px; float: left;">
						<Input v-model="linkMan.ccName" placeholder="当前用户名称" disabled></Input>
					</Form-item>
					<Form-item label="移动电话" prop="phoneNum" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="linkMan.mobil" placeholder="当前用户手机号码" disabled></Input>
					</Form-item>
				</div>
				<div class="reg-col">
					<Form-item label="邮箱" prop="email" style="width: 360px;margin-bottom:20px; float: left;">
						<Input v-model="linkMan.email" disabled placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="telphone" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="initData.telphone" :disabled="disa" :maxlength="13" placeholder="固定电话xxxx-xxxxxxxxx"></Input>
					</Form-item>
				</div>
				<div class="reg-col">
					<Form-item label="单位地址" prop="addressData" style="width: 360px;margin-bottom:20px; float: left;">
						<Cascader v-model="initData.addressData" :disabled="disa" :data="adress_data" trigger="hover"></Cascader>
					</Form-item>
					<Form-item label="详细地址" prop="address" style="width: 360px;margin-bottom:20px; float: right;">
						<Input v-model="initData.address" :maxlength="50" :disabled="disa" placeholder="请输入详细地址"></Input>
					</Form-item>
				</div>
				<div class="submitDiv">
					<Form-item>
						<i-button v-if="initData.status=='02'" type="warning" style="height: 38px; width: 360px; font-size: 16px;background:#FF6600;" @click.native="handleSubmit('initData')" long>重新申请认证</i-button>
						<i-button v-if="initData.has=='N'" type="warning" style="height: 38px; width: 360px; font-size: 16px;background:#FF6600;" @click.native="handleSubmit('initData')" long>提交认证</i-button>
					</Form-item>
				</div>
				<div v-if="initData.status !='01'">
					<div class="themeclass" style="margin-bottom: 10px;">
						<Icon type="coffee"></Icon>
						<span>温馨提示</span>
					</div>
					<div class="tips">
						<p style="font-weight: bold;">请将测试金额打款到以下银行账户：</p>
						<p>开户行：中国银行深圳龙兴支行</p>
						<p>银行账户：765368763413</p>
						<p>开户名称：深圳市普拉托科技有限公司</p>
						<p>如有疑问：请联系平台运营，联系方式：0755-89589212</p>
					</div>
				</div>
			</i-form>

			<div class="clear"></div>
		</div>
	</div>

</template>
<script>
	import cityData from '../common/addres.json'
	export default {
		data() {
			return {
				defaultList: [],
				urls: '',
				imgName: '',
				visible: false,
				uploadList: [], //图片集合
				lookimg: '',
				adress_data: cityData,
				initData: {
					addressData: [],
				},
				linkMan: {},
				downImg: '',
				disa: false,
				imgbig: false,
				imgId: '',
				lookme: false,
				single: true,
				updata: {
					fileTypeDef: '1'
				},
				iden_type: [],
				main_type: [],
				tax_type: [],
				ruleInline: {
					participantName: [{
						required: true,
						message: '请填写单位名称',
						trigger: 'blur',
					}],
					participantType: [{
						required: true,
						message: '请选择单位类型',
						trigger: 'change',
					}],
					identityType: [{
						required: true,
						message: '请选择证件类型',
						trigger: 'change'
					}],
					identityNo: [{
						required: true,
						message: '请填写正确格式的证件号码',
						pattern: /^[A-Za-z0-9]+$/,
						trigger: 'blur'
					}],
					holderName: [{
						required: true,
						message: '请填写银行开户名称',
						trigger: 'blur',
					}],
					bankName: [{
						required: true,
						message: '请填写开户银行名称',
						trigger: 'blur',
					}],
					taxType: [{
						required: true,
						message: '请选择缴税类型',
						trigger: 'change',
					}],
					bankCardNo: [{
						required: true,
						min: 8,
						pattern: /^[1-9]\d*$/,
						message: '请填写正确的银行账号(数字)',
						trigger: 'blur',
					}],
					telphone: [{
						required: true,
						trigger: 'blur',
						pattern: /^0\d{2,3}-?\d{7,8}$/,
						message: '请填写正确的电话格式'
					}],
					addressData: [{
						required: true,
						type: 'array',
						message: '请选择地址',
						trigger: 'blur',
					}],
					address: [{
						required: true,
						message: '请填写详细地址(最长50位)',
						trigger: 'blur',
					}],
				}
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
			var userName = {
				userName: sessionStorage.username
			}
			var _this = this

			_this.urls = this.$url.appUrl + '/commFile/fileUpLoad.do'
			let arrays = ['identity_type', 'main_type', 'tax_type']
			let url_dbc = '/commDict/queryDictListByCodes.do' //数据字典
			this.request(url_dbc, arrays, function(data) { //资产类型
				_this.main_type = data.main_type.options.splice(1, 1)
				_this.iden_type = data.identity_type.options.splice(1, 1)
				_this.tax_type = data.tax_type.options.splice(1, 2)
			})
			_this.init()
		},
		methods: {
			request(post, param, callback) { //方法封装
				this.$http.post(post, param).then(function(response) {
					if(callback) {
						callback(response.data);
					}
				}).catch(function(error) {
					console.log('异常', error)
				})
			},
			init() {
				var _this = this
				let url_int;
				let userType = sessionStorage.userType;
				if(userType && userType == '01') {
					url_int = "/register/queryRegParticipantBindInfo.do"
				} else if(userType && userType == '02') {
					url_int = "/participant/queryParticipantBindInfo.do"
				} else {}
				let params = {
					optUserId: '123'
				}
				this.request(url_int, params, function(data) { //初始数据
					_this.initData = data.regInfo
					console.log(data.regInfo)
					_this.linkMan = data.regInfo.commContactWary
					_this.initData.testTransfAmt = data.regInfo.testTransfAmt
					_this.initData.has = data.has
					_this.initData.telphone = _this.linkMan.telphone
					_this.initData.address = _this.linkMan.address
					_this.initData.addressData = [_this.linkMan.provinceId, _this.linkMan.cityId, _this.linkMan.areaId] //地址
					if(_this.initData.status == "00" || _this.initData.status == "01") {
						_this.disa = true
					}
					_this.downImg = _this.$url.appUrl + '/commFile/fileDownLoad.do?fileId=' + _this.initData.authImgId
				})
			},

			handleSuccess(res, file) {
				var _this = this
				_this.initData.authImgId = res.fileId
			},
			handleMaxSize(file) {
				this.$Message.error({
					content: '文件 ' + file.name + ' 太大，不能超过 2M',
					duration: 3
				});
			},
			 handleFormatError (file) {
                this.$Message.error({
					content: '文件 ' + file.name + ' 格式不正确，请上传rar或zip或7z 格式的压缩文件。',
					duration: 4
				});
                
            },
			handleBeforeUpload() {
				const check = this.uploadList.length < 1;
				if(!check) {
					this.$Message.error({
						content: '最多只能上传 1个文件！',
						duration: 3
					});
				}
				return check;
			},
			handleSubmit(name) {
				var _this = this
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(_this.imgId) {
							_this.$Message.error('请上传验证资料文件!');
							return
						} else {
							if(!_this.initData.addressData[2]) {
								_this.$Message.error('请选择单位地址!');
								return
							} else {
								this.$Modal.confirm({
									title: '提交确认',
									content: '确定信息填写无误',
									onOk: () => {
										var params = {}
										let url_rpp = '/register/regParticipant.do'
										var commContactWary = {}
										commContactWary.provinceId = _this.initData.addressData[0] //省
										commContactWary.cityId = _this.initData.addressData[1] //市
										commContactWary.areaId = _this.initData.addressData[2] //区
										commContactWary.address = _this.initData.address //详细地址
										commContactWary.telphone = _this.initData.telphone //电话号码
										params.participantName = _this.initData.participantName
										params.participantType = _this.initData.participantType //主体类型
										params.identityType = _this.initData.identityType //证件类型
										params.identityNo = _this.initData.identityNo
										params.holderName = _this.initData.holderName
										params.bankCardNo = _this.initData.bankCardNo
										params.bankName = _this.initData.bankName
										params.taxType = _this.initData.taxType
										params.taxNumber = _this.initData.identityNo //税号就是证件号
										params.testTransfAmt = _this.initData.testTransfAmt
										params.authImgId = _this.initData.authImgId //图片id
										params.ccwId = _this.initData.ccwId
										params.commContactWary = commContactWary
										params.requestId = _this.initData.requestId
										this.request(url_rpp, params, function(data) { //初始数据
											_this.$Message.success({
												content: '提交成功,请等待审核,审核通过后请重新登录',
												duration: 5
											});
											_this.init()
										})
									}
								})
							}
						}
					} else {
						this.$Message.error({
							content: '提交失败',
							duration: 3
						});
					}

				})

			},
		}
	}
</script>
<style lang="scss" scoped>
	.demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}
	
	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	
	.wrapper {
		background: #fff;
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.lookImage {
		cursor: pointer;
	}
	
	.imgcss {
		width: 50px;
	}
	
	.active {
		width: 300px;
	}
	
	.submitDiv {
		overflow: hidden;
		text-align: center;
		padding-top: 25px;
		width: 100%;
	}
	
	.agumentDiv {
		font-size: 13px;
		text-indent: 20px;
	}
	
	.register {
		margin: 30px auto;
		padding: 30px 60px 0px;
		width: 100%;
		background: #fff;
		.themeclass {
			border: none;
			height: 30px;
			line-height: 30px;
			border-bottom: 1px solid #9EA7B4;
			width: 100%;
			margin-bottom: 25px;
			font-weight: bold;
			float: left;
		}
		.downLoad {
			width: 100px;
			padding: 40px 0;
			text-align: center;
			margin-left: 10px;
			cursor: pointer;
			border-radius: 5px;
			float: left;
		}
		.tips {
			color: #0080ff;
			p {
				margin: 3px;
			}
		}
		.theme {
			width: 100%;
			text-align: center;
			font-size: 16px;
			color: #666;
			letter-spacing: 1px;
		}
		.reg-col {
			width: 100%;
			float: left;
			padding: 0 20px 0 0;
		}
		.clear {
			clear: both;
		}
	}
	
	.agument {
		margin-bottom: 30px;
		display: inline-block;
	}
</style>