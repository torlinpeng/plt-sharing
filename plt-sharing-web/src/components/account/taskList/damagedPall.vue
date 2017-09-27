<!--报损-->
<template>
	<div class="main">
		<Modal v-model="modal1" title="托盘报损业务" width="350">
			<div class="iform">
				<i-form ref="retus" :model="retus" :rules="retu" :label-width="90">
					<div class="retudiv">
						<Form-item label="资产类型：" prop="assetType" class="rentleft">
							<Select v-model="retus.assetType" style="width:185px">
								<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
							</Select>
						</Form-item>
						<Form-item label="报损数量：" prop="amount" class="rentleft">
							<Input v-model="retus.amount" :maxlength="5" placeholder="请输入报损数量" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="clear"></div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="enSubmit('retus')">提交</Button>
			</template>
		</Modal>
		<Modal v-model="modal2" title="重新报损业务" width="350">
			<div class="iform">
				<p><span class="reqids">审核驳回原因：<span style="color:#FF0000;">{{redata.remark}}</span></span>
				</p>
				<p><span class="reqids">业务编号：<span style="color: #008A00;">{{reqId}}</span></span>
				</p>
				<i-form ref="names" :model="redata" :rules="retu" :label-width="90">
					<div class="retudiv">
						<Form-item label="资产类型：" prop="reassetType" class="rentleft">
							<Select v-model="redata.reassetType" style="width:185px">
								<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
							</Select>
						</Form-item>
						<Form-item label="报损数量：" prop="damount" class="rentleft">
							<Input v-model="redata.damount" :maxlength="5" placeholder="请输入报损数量" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="clear"></div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="reSubmit('names')">提交</Button>
			</template>
		</Modal>
		<div class="btnDiv">
			<Button style="width: 160px;margin-top: 10px;height: 36px;" @click="handleSubmit()" type="warning">托盘报损</Button>
		</div>
		<div class="incomeul">
			<ul class="firstul">
				<li>业务编号</li>
				<li>报损日期</li>
				<li>资产类型</li>
				<li>报损数量</li>
				<li>报损状态</li>
				<li>操作</li>
			</ul>
			<ul v-for="(item,index) in damredata">
				<li>{{item.requestId}}</li>
				<li v-if="item.requestTime">{{item.requestTime.substring(0,10)}}</li>
				<li v-else></li>
				<li>{{item.assertName}}</li>
				<li>{{item.reportNum}}</li>
				<li>{{item.status,"dmjl" | filter}}</li>
				<li v-if="item.status!='00'"></li>
				<li v-if="item.status=='00'"><span class="dosome" @click="dosome(index)">重新{{item.taskDefName}}</span></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import cityData from '../../common/addres.json'
	import filter from '../../../filters/filters'
	export default {
		filters: {
			filter,
		},
		data() {
			return {
				cityData: cityData,
				getManList: '',
				modal1: false,
				modal2: false,
				initData: '',
				damredata: '',
				reqId: '',
				redata: {
					reassetType: '',
					damount: '',
					remark: ''
				},
				retus: {
					retUser: '',
					adressData: [],
					retuDate: '',
					amount: '',
					assetType: ''
				},
				retu: {
					assetType: [{
						required: true,
						message: '请选择产品类型',
						trigger: 'change'
					}],
					amount: [{
						required: true,
						message: '请输入报损数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}],
					reassetType: [{
						required: true,
						message: '请选择产品类型',
						trigger: 'change'
					}],
					damount: [{
						required: true,
						message: '请输入报损数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}]
				},
			}
		},
		mounted() {
			this.queList()
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
			queList() {
				this.getType()
				var _this = this
				let posts = '/leaseReportDmg/task/queryReportDmgTaskList.do'
				let para = {
					requestId: '123'
				}
				_this.request(posts, para, function(data) {
					_this.damredata = data
					console.log("报损任务", _this.damredata)
				})
			},
			handleSubmit() { //添加归还 最外层按钮
				this.modal1 = true
				this.getType()
			},
			getType() {
				var _this = this
				var paramcal = {
					categoryId: '123'
				}
				var postcal = "/lease/base/queryCanDoBizAssertList.do" //资产类型
				var url_dbc = '/commDict/queryDictListByCodes.do' //字典查询
				this.request(postcal, paramcal, function(data) { //资产类型
					_this.initData = data
				})
			},
			dosome(its) {
				var _this = this
				this.modal2 = true
				this.reqId = _this.damredata[its].requestId
				this.redata.reassetType = _this.damredata[its].assertId
				this.redata.damount = _this.damredata[its].reportNum
				this.redata.remark = _this.damredata[its].taskDesc
			},
			enSubmit(name) {
				var url_submit = "/leaseReportDmg/task/reportDmg.do"
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Modal.confirm({
							title: '请确认',
							content: '确定报损吗？',
							onOk: () => {
								var _this = this
								let para = {}
								para.assertId = _this.retus.assetType
								para.reportNum = _this.retus.amount
								_this.request(url_submit, para, function(data) {
									_this.$Message.success('报损成功')
									_this.modal1 = false
									_this.handleReset(name)
								})
							}
						})

					} else {
						this.$Message.error({
							content: '请输入正确的报损信息！',
							duration: 3
						})
					}
				})
			},
			reSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Modal.confirm({
							title: '请确认',
							content: '确定报损吗？',
							onOk: () => {
								var _this = this
								var url_resb = "/leaseReportDmg/task/resubmitReportDmg.do"
								let paras = {}
								paras.requestId = _this.reqId
								paras.assertId = _this.redata.reassetType
								paras.reportNum = _this.redata.damount
								_this.request(url_resb, paras, function(data) {
									_this.$Message.success('重新报损成功')
									_this.modal2 = false
									_this.handleReset(name)
									_this.queList()
								})
							}
						})

					} else {
						this.$Message.error({
							content: '请输入正确的报损信息！',
							duration: 3
						})
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
		}

	}
</script>
<style lang="scss" scoped>
	.main {
		height: 500px;
		.btnDiv {
			width: 100%;
			padding-top: 15px;
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
				float: left;
				width: 16.65%;
				text-align: center;
				height: 50px;
				line-height: 50px;
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
			.dosome {
				color: #fff;
				padding: 7px 10px;
				border-radius: 3px;
				background: #0080FF;
			}
			.dosome:hover {
				background: #48A4FF;
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
	}
	
	.reqids {
		text-indent: 35px;
		display: inline-block;
		margin: 0 0 10px 0;
	}
	
	.iform {
		margin: 0px auto;
		.retudiv {
			width: 100%;
			height: 50px;
			padding: 0px 20px;
			.rentleft {
				float: left;
			}
			.rentright {
				float: right;
			}
		}
		.clear {
			clear: both;
		}
	}
</style>