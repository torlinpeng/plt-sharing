<!--转租-->
<template>
	<div class="main">
		<Modal v-model="modal1" title="托盘转户业务" width="700">
			<div class="iform">
				<i-form ref="names" :model="retus" :rules="retu" :label-width="110">
					<div class="retudiv">
						<Form-item label="承租单位编码：" prop="retUser" class="rentleft">
							<Input v-model="retus.retUser" :maxlength="6" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入承租人编码" style="width: 185px"></Input>
						</Form-item>
						<Form-item label="承租单位名称：" prop="retUserName" class="rentleft">
							<Input v-model="retus.retUserName" :maxlength="100" placeholder="请输入承租人名称" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="retudiv">
						<Form-item label="资产类型：" prop="assetType" class="rentleft">
							<Select v-model="retus.assetType" style="width:185px">
								<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
							</Select>
						</Form-item>
						<Form-item label="转租数量：" prop="amount" class="rentleft">
							<Input v-model="retus.amount" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入转租数量" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="clear"></div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="enSubmit('names')">提交</Button>
			</template>
		</Modal>
		<Modal v-model="modal3" title="重新转户" width="720">
			<div class="iform">
				<div class="resons">
					<div class="reinfo">
						<span class="reqids">业务编号：<span style="color: #008A00;">{{reTranData.requestId}}</span></span>
					</div>
					<div class="reinfo">
						<span class="reqids">承租人驳回原因：<span style="color:#FF0000;">{{reTranData.taskDesc}}</span></span>
					</div>
				</div>
				<i-form ref="reTranData" :model="reTranData" :rules="retu" :label-width="110">
					<div class="retudiv">
						<Form-item label="承租单位编码：" prop="toParticipantId" class="rentleft">
							<Input v-model="reTranData.toParticipantId" :maxlength="6" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入承租人编码" style="width: 185px"></Input>
						</Form-item>
						<Form-item label="承租单位名称：" prop="toParticipantName" class="rentleft">
							<Input v-model="reTranData.toParticipantName" :maxlength="100" placeholder="请输入承租人名称" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="retudiv">
						<Form-item label="资产类型：" prop="assertId" class="rentleft">
							<Select v-model="reTranData.assertId" style="width:185px">
								<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
							</Select>
						</Form-item>
						<Form-item label="转租数量：" prop="transferNum" class="rentleft">
							<Input v-model="reTranData.transferNum" :maxlength="5" placeholder="请输入转租数量" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="clear"></div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="ReSubmit('reTranData')">提交</Button>
			</template>
		</Modal>
		<div class="btnDiv">
			<Button style="width: 160px;margin-top: 10px;height: 36px;" @click="handleSubmit()" type="warning">我要转户</Button>
		</div>
		<div class="incomeul">
			<ul class="firstul">
				<li>业务编号</li>
				<li>转户单位</li>
				<li>承租单位</li>
				<li>发起日期</li>
				<li>资产类型</li>
				<li>资产数量(片)</li>
				<li>操作</li>
			</ul>
			<ul v-for="(item,index) in acceptData">
				<li>{{item.requestId}}</li>
				<li>{{item.fromParticipantName}}</li>
				<li>{{item.toParticipantName}}</li>
				<li v-if="item.fromRequestTime">{{item.fromRequestTime.substring(0,10)}}</li>
				<li v-else></li>
				<li :title="item.assertName">{{item.assertName}}</li>
				<li>{{item.transferNum}}</li>
				<li v-if="item.taskDefCode=='1702'">
					<span class="agree" @click="Agree(index)">同意</span>
					<span class="reject" @click="Reject(index)">拒绝</span>
				</li>
				<li v-if="item.taskDefCode=='1701'">
					<span class="retrans" @click="Retrans(index)">重新转户</span>
				</li>
			</ul>
		</div>
		<Modal v-model="modal0" class-name="vertical-center-modal" width="720" title="确定同意承租" @on-ok="confirmAgree('retus')">
			<div class="iform">
				<span class="reqids">业务编号：<span style="color: #008A00;">{{retus.requestId}}</span></span>
				<i-form ref="retus" :model="retus" :rules="retu" :label-width="90">
					<div class="retudiv">
						<Form-item label="转户单位：" prop="fromParticipantName" class="rentleft">
							<Input v-model="retus.fromParticipantName" :maxlength="50" disabled style="width: 200px"></Input>
						</Form-item>
						<Form-item label="产品类型：" prop="productCatlogId" class="rentleft">
							<Select v-model="retus.productCatlogId" style="width:200px" @on-change="getAset">
								<Option v-for="item in prod_type" :value="item.itemCode" :key="item.itemText">{{ item.itemText }}</Option>
							</Select>
						</Form-item>
					</div>
					<div class="retudiv">
						<Form-item label="资产类型：" prop="asset" class="rentleft">
							<Input v-model="retus.assertName" disabled style="width: 200px"></Input>
						</Form-item>
						<Form-item label="承租数量：" prop="asset" class="rentleft">
							<Input v-model="retus.num" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" disabled placeholder="请输入正整数天数" style="width: 200px"></Input>
						</Form-item>
					</div>
					<div class="retudiv">
						<Form-item v-if="retus.productCatlogId == '1'||retus.productCatlogId == '4'||retus.productCatlogId == ''" label="租借期限：" class="rentleft" prop="agreedPeriodNum">
							<Input v-model="retus.agreedPeriodNum" :maxlength="5" placeholder="请输入正整数天数" style="width: 200px"></Input>
						</Form-item>
						<Form-item v-if="retus.productCatlogId =='3'" label="租借期限 :" class="rentleft" prop="agreedPeriodNum">
							<Select v-model="retus.agreedPeriodNum" style="width:200px" placeholder="日期范围">
								<Option v-for="item in DateRange" :value="item" :key="item">{{item}}</Option>
							</Select>
						</Form-item>
						<div v-if="retus.productCatlogId == '2'||retus.productCatlogId == '5'" style="padding-left: 18px;" class="rentleft">
							租借期限：
							<Input v-model="retus.agreedPeriodNum" :maxlength="5" disabled placeholder="该产品类型无需选择期限" style="width: 200px;margin-left: 12px;"></Input>
						</div>
					</div>
					<div class="themeclass">
						<Icon type="information-circled"></Icon>
						<span>转户交接地址信息</span>
					</div>
					<div class="retudiv">
						<Form-item label="交接地址：" class="rentleft" prop="adressData">
							<Cascader v-model="retus.adressData" style="width:200px;display: inline-block;" :data="cityData" trigger="hover"></Cascader>
						</Form-item>
						<Form-item label="详细地址：" prop="addressNameFull" class="rentleft" style="margin-bottom: 0px;">
							<Input v-model="retus.addressNameFull" placeholder="请输入详细街道地址" style="width: 200px"></Input>
						</Form-item>
					</div>
					<div class="clear"></div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="confirmAgree('retus')">提交</Button>
			</template>
		</Modal>
		<Modal v-model="modal2" class-name="vertical-center-modal" width="360" title="拒绝同意承租">
			<span></span>拒绝理由：
			<Input v-model="retus.remark" placeholder="请输入拒绝理由" style="width: 260px"></Input>
			<template slot="footer">
				<Button type="primary" @click="confirmReject">提交</Button>
			</template>
		</Modal>
	</div>
</template>
<script>
	import cityData from '../../common/addres.json'
	export default {
		data() {
			return {
				modal1: false,
				modal0: false,
				modal2: false,
				modal3: false,
				cityData: cityData,
				acceptData: '',
				initData: '',
				reTranData: {},
				currentData: '',
				prod_type: '',
				DateRange: [],
				retus: {
					adressData: [],
					retUser: '',
					assetType: '',
					retuDate: '',
					amount: '',
					retUserName: '',
					remark: '',
					addressNameFull: '',
					agreedPeriodNum: '',
					productCatlogId: '',
					fromParticipantName: '',
					num: '',
				},
				retu: {
					retUser: [{
						required: true,
						message: '请输入正确的承租人账户编码',
						pattern: /^[1-9]\d*$/,
						trigger: 'blur'
					}],
					toParticipantId: [{
						required: true,
						message: '请输入正确的承租人账户编码',
						pattern: /^[1-9]\d*$/,
						trigger: 'blur'
					}],
					toParticipantName: [{
						required: true,
						message: '请输入承租人单位名称',
						trigger: 'blur',
					}],
					retUserName: [{
						required: true,
						message: '请输入承租人单位名称',
						trigger: 'blur',
					}],
					assertId: [{
						required: true,
						message: '请选择资产类型',
						trigger: 'change',
					}],
					assetType: [{
						required: true,
						message: '请选择资产类型',
						trigger: 'change'
					}],
					transferNum: [{
						required: true,
						message: '请输入正整数转租数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}],
					amount: [{
						required: true,
						message: '请输入正整数转租数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}],
					productCatlogId: [{
						required: true,
						message: '请选择产品类型',
						trigger: 'change',
					}],
					agreedPeriodNum: [{
						required: true,
						pattern: /^[1-9]\d*$/,
						message: '请输入/选择租赁期限',
						trigger: 'change',
					}],
					addressNameFull: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur',
					}],
					adressData: [{
						required: true,
						type: 'array',
						message: '请选择交接地址',
						trigger: 'change',
					}],
				},
			}
		},
		mounted() {
			var _this = this
			_this.queryList()
		},
		methods: {
			request(post, param, callback) { //方法封装
				this.$http.post(post, param).then(function(response) {
					if(callback) {
						callback(response.data);
					}
				}).catch(function(error) {
					this.$Message.error('提交异常')
					console.log('3', error)
				})
			},
			queryList() {
				var _this = this
				var url_submit = "/leaseTransfer/task/queryParticipantTransferTaskList.do" //查询承租列表
				let para = {
					requestId: '111'
				}
				_this.request(url_submit, para, function(data) {
					_this.acceptData = data
					console.log("转租列表", _this.acceptData)
				})
			},
			handleSubmit() { //添加归还 最外层按钮
				this.modal1 = true
				this.queryAsset()
			},
			queryAsset() {
				var _this = this
				var paramcal = {
					categoryId: '123'
				}
				var postcal = "/lease/base/queryCanDoBizAssertList.do" //资产类型
				this.request(postcal, paramcal, function(data) { //资产类型
					_this.initData = data
				})
			},
			enSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						var _this = this
						var url_submit = "/leaseTransfer/task/addTransfer.do"
						let para = {}
						para.toParticipantId = _this.retus.retUser //承租人编号
						para.assertId = _this.retus.assetType //资产类型
						para.transferNum = _this.retus.amount //转租数量
						para.toParticipantName = _this.retus.retUserName //承租人名称
						_this.$Modal.confirm({
							title: '请确认',
							content: '确定转户提交吗？',
							onOk: () => {
								_this.request(url_submit, para, function(data) {
									_this.$Message.success('转户成功')
									_this.modal1 = false
									_this.handleReset(name)
								})
							}
						})

					} else {
						this.$Message.error({
							content: '请输入正确转户信息！',
							duration: 3
						})
					}
				})
			},
			Agree(index) {
				this.modal0 = true
				var _this = this
				this.resId = this.acceptData[index].requestId
				let paras = {
					requestId: this.resId
				}
				let urlin_info = "/leaseTransfer/base/queryConfirmTransfeInfo.do" //查询信息
				this.request(urlin_info, paras, function(data) {

					_this.retus.assertName = data.reqLeaseTransferDto.assertName
					_this.retus.fromParticipantName = data.reqLeaseTransferDto.fromParticipantName
					_this.retus.num = data.reqLeaseTransferDto.transferNum
					_this.currentData = data.reqLeaseTransferDto
					_this.retus.requestId = data.reqLeaseTransferDto.requestId
					_this.prod_type = data.productCatlogList
				})
			},
			getAset(ast) { //资产类型 期限设置
				var _this = this
				_this.retus.agreedPeriodNum = ''
				let kyt = "/lease/leaseBase/queryProductOfKytLeaseDateList.do"
				if(ast == '3' && ast !== '') {
					_this.request(kyt, {
						productCatlogId: ast,
						assertId: _this.currentData.assertId
					}, function(data) {
						_this.DateRange = data
						console.log('期限', _this.DateRange)
					})
				} else {
					return
				}
			},
			Reject(index) {
				this.modal2 = true
				this.resId = this.acceptData[index].requestId
			},
			Retrans(its) { //重新转户
				this.queryAsset()
				var _this = this
				let reurl = "/leaseTransfer/base/queryConfirmTransfeInfo.do"
				let reqid = {
					requestId: this.acceptData[its].requestId
				}
				this.request(reurl, reqid, function(data) {
					_this.reTranData = data.reqLeaseTransferDto
					console.log(333, _this.reTranData)
				})
				this.modal3 = true
			},
			ReSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						var _this = this
						let params = {}
						let retr = "/leaseTransfer/task/resubmitTransfer.do"
						params.requestId = this.reTranData.requestId
						params.toParticipantId = this.reTranData.toParticipantId
						params.toParticipantName = this.reTranData.toParticipantName
						params.transferNum = this.reTranData.transferNum
						params.assertId = this.reTranData.assertId
						params.fromParticipantId = this.reTranData.fromParticipantId
						console.log("wqd", params)
						this.$Modal.confirm({
							title: '请确认',
							content: '确定转户提交吗？',
							onOk: () => {
								this.request(retr, params, function(data) {
							_this.$Message.success('提交成功')
							_this.modal3 = false
							_this.queryList()
							_this.handleReset(name)
						})
								
							}})
						
					} else {
						this.$Message.error({
							content: '提交失败！',
							duration: 3
						})
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			confirmAgree(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Modal.confirm({
							title: '请确认',
							content: '确定同意吗？',
							onOk: () => {
								var _this = this
								let paras = {}
								let url_agr = "/leaseTransfer/task/confirmTransfer.do"
								paras.requestId = _this.resId //请求id
								paras.productCatlogId = _this.retus.productCatlogId //产品名称
								paras.assertName = _this.retus.assertName //资产类型
								paras.agreedPeriodNum = _this.retus.agreedPeriodNum //期限
								paras.tsfCfmAddressId = _this.retus.adressData[_this.retus.adressData.length - 1] //地址区id
								paras.addressName = _this.retus.addressNameFull //详细地址
								_this.request(url_agr, paras, function(data) {
									_this.$Message.success('同意成功')
									_this.handleReset(name)
									_this.modal0 = false
									_this.queryList()
								})
							}
						})

					} else {
						this.$Message.error({
							content: '提交失败！',
							duration: 3
						})
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			confirmReject() {
				var _this = this
				_this.modal2 = true
				let url_rj = "/leaseTransfer/task/rejectLeaseNum.do"
				let pars = {
					taskDesc: _this.retus.remark,
					requestId: _this.resId
				}
				if(!_this.retus.remark) {
					_this.$Message.error('拒绝理由不能为空')
					return
				} else {
					_this.$Modal.confirm({
						title: '请确认',
						content: '确定拒绝吗？',
						onOk: () => {
							_this.request(url_rj, pars, function(data) {
								_this.$Message.success('提交成功')
								_this.modal2 = false
								_this.queryList()
							})
						}
					})

				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.main {
		height: 500px;
		.btnDiv {
			width: 100%;
			padding-top: 10px;
			text-align: center;
		}
		.title-theme {
			font-size: 14px;
			font-family: "微软雅黑";
			color: #5d5d5d;
			margin-top: 20px;
			padding-bottom: 10px;
			border-bottom: 1px solid #eee;
		}
	}
	
	.incomeul {
		width: 100%;
		margin-top: 30px;
		ul {
			display: flex;
			width: 100%;
			li {
				flex: 1;
				text-align: center;
				height: 55px;
				line-height: 55px;
				white-space: nowrap;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: pointer;
				.doSomething {
					padding: 8px;
					border-radius: 3px;
					color: #fff;
					background: #FF9900;
				}
			}
		}
		ul:nth-child(odd) {
			background: #FAFAFA;
		}
		ul:hover {
			background: #fff7f2;
		}
		.firstul {
			border: none;
			height: 40px;
			font-size: 13px;
			color: #fff;
			background: #FFAD33 !important;
			li {
				line-height: 42px;
			}
		}
		.agree,
		.reject {
			padding: 7px 10px;
			background: #0080FF;
			border-radius: 2px;
			letter-spacing: 1px;
			color: #fff;
		}
		.agree:hover {
			background: #48A4FF;
		}
		.reject {
			background: #FE0000;
			margin-left: 1px;
		}
		.reject:hover {
			background: #FF3D00;
		}
		.retrans {
			padding: 7px 10px;
			background: #0080FF;
			border-radius: 3px;
			color: #fff;
			border: none;
		}
		.retrans:hover {
			background: #48A4FF;
		}
	}
	
	.reqids {
		text-indent: 35px;
		display: inline-block;
		margin: 0 0 10px 0;
	}
	
	.themeclass {
		border: none;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #9EA7B4;
		width: 100%;
		margin-bottom: 20px;
		font-weight: bold;
		float: left;
	}
	
	.iform {
		margin: 0px auto;
		.retudiv {
			width: 100%;
			height: 50px;
			display: flex;
			padding: 0px 20px;
			.rentleft {
				flex: 1;
			}
		}
		.resons {
			display: flex;
			margin-bottom: 5px;
			.reinfo {
				flex: 1;
			}
		}
		.clear {
			clear: both;
		}
	}
</style>