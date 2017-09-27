<template>
	<div class="income">
		<div class="balance">
			<div class="yue">
				<span class="zhanghu">可用金额：</span><span class="money">{{account.useableAmt}}&nbsp;元</span>
				<span class="todomoney" @click="modal_add = true">充值</span>
				<span class="todomoney" @click="modal_out = true">提现</span>
				<p>
					<span class="zhanghu">冻结金额：</span><span class="moneys">{{account.fetchFrozeAmt}}&nbsp;元</span> &nbsp;
					<span class="zhanghu">已缴押金：</span><span class="moneys">{{account.depositPayedAmt}}&nbsp;元</span> &nbsp;
					<span class="zhanghu">应缴押金：</span><span class="moneys">{{account.depositPayableAmt}}&nbsp;元</span> &nbsp;
					<!--<span class="zhanghu">账户总金额：</span><span class="moneys">{{account.totalAmt}}&nbsp;元</span>-->
				</p>
			</div>
			<div class="more_money">
				<ul>
					<li><span class="zhanghu">单位编码：</span><span class="money">{{account.participantId}}</span</li>
					<li><span class="zhanghu">银行账号：</span><span class="money">{{account.bankCardNo}}</span>&nbsp;<span style="color: #f05700;">[{{account.bankName}}]</span></li>
					<li><span class="zhanghu">账户名称：</span><span class="money">{{account.holderName}}</span></li>
					<li><span class="zhanghu">缴税税号：</span><span class="money">{{account.taxNumber}}</span></li>
					<li><span class="zhanghu">单位名称：</span><span class="money">{{account.participantName}}</span></li>

				</ul>
			</div>
		</div>
		<Tabs type="card" @on-click="queryOut">
			<Tab-pane label="充值明细">
				<div class="selectDiv">
					<div class="search">
						<Input v-model="reqNum" icon="search" placeholder="搜索流水号.." style="width: 200px"></Input>
					</div>
					<div class="seleStau">
						<Select v-model="initsta" @on-change="changeStau" placeholder="状态选泽" style="width:200px;text-align: left;">
							<Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</div>
					<div class="seleTime">
						<Date-picker type="datetimerange" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
					</div>
				</div>
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>流水单号</li>
						<li>申请人</li>
						<li>申请时间</li>
						<li>充值金额(元)</li>
						<li>完成时间</li>
						<li>状态</li>
						<li>操作</li>
					</ul>
					<ul v-for="(item,index) in dataShow">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li>{{item.requestId}}</li>
						<li>{{item.optUserName}}</li>
						<li>{{item.createTime}}</li>
						<li>{{item.amt}}</li>
						<li>{{item.financeConfirmTime}}</li>
						<li>{{item.status,"comm"|filter}}</li>
						
						<!--<li>重新申请</li>-->
						<li v-if="item.status==='01'"></li>
						<li v-else-if="item.status==='02'"><span class="apply_again" @click="doApplyPut(index)">申请复审</span></li>
						<li v-else-if="item.status==='00'"></li>
					</ul>
				</div>
				<Page :total="putrecordata.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChange"></Page>
			</Tab-pane>
			<Tab-pane label="提现明细">
				<div class="selectDiv">
					<div class="search">
						<Input v-model="reqNum" icon="search" placeholder="搜索流水号.." style="width: 200px"></Input>
					</div>
					<div class="seleStau">
						<Select v-model="initsta" @on-change="changeStau" placeholder="状态选泽" style="width:200px;text-align: left;">
							<Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</div>
					<div class="seleTime">
						<Date-picker type="datetimerange" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
					</div>
				</div>
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>流水单号</li>
						<li>申请人</li>
						<li>申请时间</li>
						<li>提现金额(元)</li>
						<li>完成时间</li>
						<li>状态</li>
						<li>操作</li>
					</ul>
					<ul v-for="(item,index) in dataShowOut">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li>{{item.requestId}}</li>
						<li>{{item.optUserName}}</li>
						<li>{{item.requestTime}}</li>
						<li>{{item.amt}}</li>
						<li>{{item.financeConfirmTime}}</li>
						<li v-if="item.status==='01'" style="color: #18B566;">{{item.status,"comm"|filter}}</li>
						<li v-else-if="item.status==='02'" style="color: #ff0000;">{{item.status,"comm"|filter}}</li>
						<li v-else-if="item.status==='00'" style="color: #666;">{{item.status,"comm"|filter}}</li>
						<li v-if="item.status==='01'"></li>
						<li v-else-if="item.status==='02'"><span class="apply_again" @click="doApplyOut(index)">申请复审</span></li>
						<li v-else-if="item.status==='00'"></li>
					</ul>
				</div>
				<Page :total="outrecordata.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeOut"></Page>
			</Tab-pane>
		</Tabs>
		<Modal title="我要充值" v-model="modal_add" width="320" class-name="vertical-center-modal">
			<div class="formdiv">
				<span>可用金额：</span><span style="color: #21b86c;">{{account.useableAmt}}&nbsp;元</span>
			</div>
			<div class="formdiv">
				<span>充值金额：</span>
				<Input v-model="amt_in" :maxlength="9" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入充值金额" style="width: 120px;height: 32px;"></Input>&nbsp;
			</div>
				<div class="formdiv">
				<span>联系电话：</span><span style="color: #21b86c;">0755-89589212</span>
			</div>
			<div class="formdiv">
				<span>收款银行帐号：</span><span style="color: #21b86c;">765368763413</span>
			</div>
			<div class="formdiv">
				<span>收款银行名称：</span><span style="color: #21b86c;">中国银行深圳龙兴支行</span>
			</div>
			<div class="formdiv">
				<span>收款银行账户名：</span><span style="color: #21b86c;">深圳市普拉托科技有限公司</span>
			</div>
			<div class="formdiv" style="margin-bottom: 0;">
				<span style="font-size: 12px; color: #c2bdb9;">温馨提示：充值后请关注账户金额变化，如有疑问，请联系平台运营小哥</span>
			</div>
			<template slot="footer">
				<Button type="primary" @click="inputOK">确定</Button>
			</template>
		</Modal>

		<Modal title="我要提现" v-model="modal_out" width="320" class-name="vertical-center-modal">
			<div class="formdiv">
				<span>可用金额：</span><span style="color: #21b86c;">{{account.useableAmt}}&nbsp;元</span>
			</div>
			<div class="formdiv">
				<span>提现金额：</span>
				<Input v-model="amt_out" :maxlength="9" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入提现金额" style="width: 120px;height: 32px;"></Input>&nbsp;
			</div>
			<div class="formdiv" style="margin-bottom: 0;">
				<span style="font-size: 12px; color: #c2bdb9;;">温馨提示：提现金额不能大于可用金额</span>
			</div>
			<template slot="footer">
				<Button type="primary" @click="getoutOk">确定</Button>
			</template>
		</Modal>
		<Modal title="充值复审提交" v-model="modal_put_again" width="360" class-name="vertical-center-modal">
			<div class="formdiv">
				<span>流水单号：</span><span style="color: #18B566;">{{currentPutData.requestId}}</span>
			</div>
			<div class="formdiv">
				<span>可用金额：</span><span style="color: #18B566;">{{account.useableAmt}}&nbsp;元</span>
			</div>
			<div class="formdiv">
				<span>充值金额：</span>
				<Input v-model="currentPutData.amt" :maxlength="8" placeholder="请输入充值金额" style="width: 100px;height: 32px;"></Input>
			</div>
			<div class="formdiv">
				<span>收款银行账户名：</span><span style="color: #18B566;">深圳市普拉托科技有限公司</span>
			</div>
			<div class="formdiv">
				<span>收款银行帐号：</span><span style="color: #18B566;">765368763413</span>
			</div>
			<div class="formdiv">
				<span>收款银行名称：</span><span style="color: #18B566;">中国银行深圳龙兴支行</span>
			</div>
			<div class="formdiv">
				<span>联系电话：</span><span style="color: #18B566;">0755-89589212</span>
			</div>
			<div class="formdiv">
				<span>驳回原因：</span>
				<span style="color: #18B566;" v-if="currentPutData.taskDesc != null">{{currentPutData.taskDesc}}</span>
				<span style="color: #18B566;" v-else="currentPutData.taskDesc == null">无</span>
			</div>
			<div class="formdiv" style="margin-bottom: 0;">
				<span style="font-size: 12px; color: #c2bdb9;">温馨提示：充值后请关注账户金额变化，如有疑问，请联系平台运营小哥</span>
			</div>
			<template slot="footer">
				<Button type="primary" @click="getRePutOk">确定</Button>
			</template>
		</Modal>
		<Modal title="提现复审提交" v-model="modal_out_again" width="360" class-name="vertical-center-modal">
			<div class="formdiv">
				<span>流水单号：</span><span style="color: #18B566;">{{currentOutData.requestId}}</span>
			</div>
			<div class="formdiv">
				<span>可用金额：</span><span style="color: #18B566;">{{account.useableAmt}}&nbsp;元</span>
			</div>
			<div class="formdiv">
				<span>提现金额：</span>
				<Input v-model="currentOutData.amt" :maxlength="8" placeholder="请输入提现金额" style="width: 100px;height: 32px;"></Input>
			</div>
			<div class="formdiv">
				<span>驳回理由：</span>
				<span style="color: #18B566;" v-if="currentOutData.taskDesc != null">{{currentOutData.taskDesc}}</span>
				<span style="color: #18B566;" v-else="currentOutData.taskDesc == null">无</span>
			</div>
			<div class="formdiv" style="margin-bottom: 0;">
				<span style="font-size: 12px; color: #c2bdb9;">温馨提示：提现金额不能大于可用金额</span>
			</div>
			<template slot="footer">
				<Button type="primary" @click="getReoutOk">确定</Button>
			</template>
		</Modal>
	</div>
</template>
<script>
	import filter from '../../filters/filters'
	export default {
		filters: {
			filter,
		},
		data() {
			return {
				account: '',
				modal_add: false,
				modal_out: false,
				modal_out_again: false,
				modal_put_again: false,
				reqNum: '',
				amt_in: '',
				amt_out: '',
				amt_out_again: '',
				putrecordata: '',
				outrecordata: '',
				amt_put_again: '',
				initsta: '',
				currentPutData: '',
				currentOutData: '',
				dataShow: [], // data for showing
				dataShowOut: [], // data for showing
				showNum: 10, // number of item per page
				currentPage: 1,
				status: [{
					value: '',
					label: '全部'
				}, {
					value: '00',
					label: '审核中'
				}, {
					value: '01',
					label: '已完成'
				}, {
					value: '02',
					label: '未通过'
				}]
			}
		},
		mounted() {
			var _this = this
			_this.$http.post('/participant/base/queryParticipantAccountInfo.do', { //查询账户信息
				requestId: 123
			}).then(function(response) {
				_this.account = response.data
				_this.queryOut(0)
			}).catch(function(error) {
				console.log('2', error)
			})
		},
		methods: {
			inputOK() { //资金注入确认提交
				var _this = this
				var amt = (+_this.amt_in)
				var re = 　/^[0-9]+.?[0-9]*$/
				if(!amt || !re.test(amt) || amt <= 0) {
					_this.$Message.error({
						content: '请输入大于0 的金额！',
						duration: 3
					})
				} else {
					this.$Modal.confirm({
						title: '请确认',
						content: '确定充值吗？',
						onOk: () => {
							_this.$http.post('/participant/fund/put.do', {
								requestId: 123,
								amt: amt
							}).then(function(response) {
								if(response) {
									_this.$Message.success({
										content: '提交成功！',
										duration: 3
									})
									_this.queryOut(0)
									_this.modal_add = false
								} else {
									return false;
								}
							}).catch(function(error) {
								console.log('4', error)
							})
						}
					})
				}
			},
			pageChange(page) {
				this.currentPage = page
			    let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				this.dataShow = this.putrecordata.slice(startPage, endPage)
			},
			pageChangeOut(page){
				this.currentPage = page
			    let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				this.dataShowOut = this.outrecordata.slice(startPage, endPage)
			},
			getoutOk() { //提现确认提交
				var _this = this
				var amt = (+_this.amt_out)
				var re = 　/^[0-9]+.?[0-9]*$/
				if(amt > _this.account.useableAmt) {
					_this.$Message.error({
						content: '提现金额不能大于可用金额！',
						duration: 3
					})
					return
				}
				if(!amt || !re.test(amt) || amt <= 0) {
					_this.$Message.error({
						content: '请输入大于0 的金额！',
						duration: 3
					})
					return
				} else {
					this.$Modal.confirm({
						title: '请确认',
						content: '确定提现吗？',
						onOk: () => {
							_this.$http.post('/participant/fund/fundOut.do', {
								requestId: 123,
								amt: amt
							}).then(function(response) {
								if(response) {
									_this.$Message.success({
										content: '提交成功！',
										duration: 3
									})
									_this.queryOut(1)
									_this.modal_out = false
								} else {
									return false;
								}
							}).catch(function(error) {
								console.log('6', error)
							})

						}
					})
				}
			},
			queryOut(name) { //查询提现列表，tabs却换到提现记录项时触发该方法
				var _this = this
				_this.currentPage = 1
				if(name == 1) {
					_this.$http.post('/participant/fund/queryFunOutTaskList.do', {
						requestId: 123
					}).then(function(response) {
						_this.outrecordata = response.data
						_this.dataShowOut= _this.outrecordata.slice(0, _this.showNum)
					}).catch(function(error) {
						console.log('6', error)
					})
				} else if(name == 0) {
					_this.$http.post('/participant/fund/queryFunPutTaskList.do', { //查询充值信息 queryFunPutTaskList
						requestId: 123
					}).then(function(response) {
						console.log(response.data);
						_this.putrecordata = response.data
						_this.dataShow = _this.putrecordata.slice(0, _this.showNum)
						console.log(_this.dataShow)

					}).catch(function(error) {
						console.log('2', error)
					})
				}
			},
			doApplyOut(index) {
				var _this = this
				_this.modal_out_again = true
				let reqids = _this.outrecordata[index].requestId
				_this.$http.post('/participant/fund/queryFundOut.do', {
					requestId: reqids,
				}).then(function(response) {
					_this.currentOutData = response.data
					console.log(_this.currentOutData)
				}).catch(function(error) {
					console.log('3', error)
				})
			},
			doApplyPut(index) {
				var _this = this
				_this.modal_put_again = true
				console.log()
				let reqid = _this.putrecordata[index].requestId
				_this.$http.post('/participant/fund/queryFundPut.do', {
					requestId: reqid,
				}).then(function(response) {
					_this.currentPutData = response.data
					console.log(_this.currentPutData)
				}).catch(function(error) {
					console.log('3', error)
				})

			},
			getReoutOk() {
				var _this = this
				var amt = (+_this.currentOutData.amt)
				var requestId = _this.currentOutData.requestId
				var re = 　/^[0-9]+.?[0-9]*$/
				if(amt > _this.account.useableAmt) {
					_this.$Message.error({
						content: '提现金额不能大于可用金额！',
						duration: 3
					})
					return
				}
				if(!amt || !re.test(amt) || amt <= 0) {
					_this.$Message.error({
						content: '请输入大于0的金额！',
						duration: 3
					})
				} else {
					this.$Modal.confirm({
						title: '请确认',
						content: '确定提现吗？',
						onOk: () => {
							_this.$http.post('/participant/fund/updateFundOut.do', {
								requestId: requestId,
								amt: amt,
							}).then(function(response) {
								if(response) {
									_this.$Message.success({
										content: '提交成功！',
										duration: 3
									})
									_this.queryOut(1)
									_this.modal_out_again = false
								} else {
									return false;
								}
							}).catch(function(error) {
								console.log('6', error)
							})
						}
					})
				}

			},
			getRePutOk() {
				var _this = this
				var amt = (+_this.currentPutData.amt)
				var requestId = _this.currentPutData.requestId
				var re = 　/^[0-9]+.?[0-9]*$/
				if(!amt || !re.test(amt) || amt <= 0) {
					_this.$Message.error({
						content: '请输入大于0的金额！',
						duration: 3
					})
				} else {
					this.$Modal.confirm({
						title: '请确认',
						content: '确定充值吗？',
						onOk: () => {
							_this.$http.post('/participant/fund/updateFundPut.do', {
								requestId: requestId,
								amt: amt,
							}).then(function(response) {
								if(response) {
									_this.$Message.success({
										content: '提交成功！',
										duration: 3
									})
									_this.queryOut(0)
									_this.modal_put_again = false
								} else {
									return false;
								}
							}).catch(function(error) {
								console.log('6', error)
							})
						}
					})
				}
			},
			changeStau(value) {}
		}

	}
</script>
<style lang="scss" scoped>
	.ivu-tabs-bar {
		margin-bottom: 0px;
	}
	
	.income {
		padding: 20px 20px 0;
	}
	
	.selectDiv {
		padding: 5px 0px 20px;
		width: 100%;
		display: none;
		.search {
			flex: 1;
			text-align: left;
		}
		.seleTime {
			flex: 1;
			white-space: nowrap;
			text-align: right;
		}
		.seleStau {
			white-space: nowrap;
			flex: 1;
			text-align: center;
		}
	}
	.pagestyle {
		text-align: center;
		margin: 20px 0;
	}
	.incomeul {
		width: 100%;
		height: 450px;
		ul {
			display: flex;
			width: 100%;
			cursor: pointer;
			li {
				flex: 1;
				text-align: center;
				height: 40px;
				line-height: 40px;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				img {
					width: 40px;
					background: transparent;
					margin-top: 6px;
				}
			}
		}
		ul:nth-child(odd) {
			background: #FAFAFA;
		}
		ul:hover {
			background: #EBF7FF;
		}
		.firstul {
			border: none;
			color: #fff;
			background: #FFA800 !important;
		}
		.apply_again {
			border: 1px solid #E9E9E9;
			padding: 5px;
			color: #0080FF;
			border-radius: 2px;
		}
	}
	
	.formdiv {
		width: 100%;
		margin-bottom: 14px;
		padding: 0 10px;
		font-size: 13px;
	}
	
	.balance {
		width: 100%;
		padding: 20px 0;
		margin-bottom: 5px;
		display: flex;
		.yue {
			flex: 2;
			.zhanghu {
				font-size: 13px;
			}
			p {
				margin: 10px 0;
			}
			.money {
				color: #f05700;
				font-size: 20px;
			}
			.moneys {
				font-size: 13px;
			}
			.todomoney {
				display: inline-block;
				border: 1px solid #4679BA;
				cursor: pointer;
				color: #4679BA;
				font-size: 14px;
				padding: 1px 12px;
				margin-left: 20px;
				border-radius: 2px;
				margin-bottom: 1px;
				text-align: center;
			}
			.todomoney:hover {
				border: 1px solid #5d9cec;
				color: #5d9cec;
			}
		}
		.more_money {
			flex: 3;
			li {
				width: 50%;
				font-size: 13px;
				padding: 0 0 10px 0px;
				float: left;
				white-space: nowrap;
			}
		}
	}
</style>