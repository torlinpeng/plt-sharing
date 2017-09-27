<template>
	<div class="mains">
		<div class="neirong">
			<Tabs type="card" @on-click="changeTab">
				<Tab-pane label="入库任务列表">
					<div class="incomeul">
						<ul class="firstul">
							<li>入库编号</li>
							<li>归还单位</li>
							<li>交接方式</li>
							<li>预计归还日期</li>
							<li>交接地址</li>
							<li>入库状态</li>
							<li>任务名称</li>
							<li>操作</li>
						</ul>
						<ul v-for="(item,index) in rent_data" @click="lookmore(index)">
							<li>{{item.requestId}}</li>
							<li>{{item.participantName}}</li>
							<li>{{item.deliverFlag,"jjfs" | filter}}</li>
							<li>{{item.returnDate.substring(0,10)}}</li>
							<li :title="item.addressNamePcd+item.addressName">{{item.addressNamePcd}}{{item.addressName}}</li>
							<li>{{item.status,"ghjl" |filter}}</li>
							<li v-if="item.taskDefCode=='1503'"><span style="color: #FF0000;">{{item.taskDefName}}</span></li>
							<li v-if="item.taskDefCode=='1504'"><span style="color: #0066CC;">{{item.taskDefName}}</span></li>
							<li><span @click.stop="instance('warning',index)" class="queryBtn">确认</span></li>
						</ul>
					</div>
				</Tab-pane>
				<Tab-pane label="入库流水记录">
					<div class="incomeul">
						<ul class="firstul">
							<li>入库流水</li>
							<li>入库开始时间</li>
							<li>资产名称</li>
							<li>资产品质</li>
							<li>预计入库量(片)</li>
							<li>实际入库量(片)</li>
							<li>确认时间</li>
							<li>出库状态</li>
						</ul>
						<ul v-for="(item,index) in putLogData">
							<li>{{item.returnId}}</li>
							<li :title="item.wsBeginTime">{{item.wsBeginTime}}</li>
							<li :title="item.assertName">{{item.assertName}}</li>
							<li>{{item.qaType,"pzlx" | filter}}</li>
							<li>{{item.reqNum}}</li>
							<li>{{item.ConfirmNum}}</li>
							<li :title="item.ConfirmTime">{{item.ConfirmTime}}</li>
							<li>{{item.status,'ghjl'|filter}}</li>
						</ul>
					</div>
					<Page :total="confirmList.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChange"></Page>
				</Tab-pane>
			</Tabs>
			<Modal v-model="modal1" title="确认入库信息" width="450" class-name="vertical-center-modal">
				<div class="incomeul" style="height: auto;">
					<ul class="secondul">
						<li>资产类型</li>
						<li>资产品质</li>
						<li>归还数量</li>
						<li>确认数量</li>
					</ul>
					<ul v-for="(item,index) in returnInfoList">
						<li :title="item.assertName">{{item.assertName}}</li>
						<li>{{item.qaType,"pzlx" | filter}}</li>
						<li>{{item.reqNum}}&nbsp;片</li>
						<li>
							<Input v-model="item.wsConfirmNum" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入确认数量" style="width:100px"></Input>
						</li>
					</ul>
				</div>
				<template slot="footer">
					<Button type="primary" @click="endOk">确定</Button>
				</template>
			</Modal>
			<Modal title="归还详细信息" width="750" v-model="modal2" ok-text="关闭" cancel-text="" class-name="vertical-center-modal">
				<div class="detaildiv">
					<div class="flex1">
						归还编号：<span class="colos" style="color: #008A00;">{{returnDetailData.requestId}}</span>
					</div>
					<div class="flex1">
						下单时间：<span class="colos"> {{returnDetailData.requestTime}}</span>
					</div>
					<div class="flex1">
						预计归还日期：
						<span class="colos" v-if="returnDetailData.returnDate">{{returnDetailData.returnDate.substring(0,10)}}</span>
						<span class="colos" v-else></span>
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						联系人：
						<span class="colos">{{returnDetailData.requestCfmUserName}}</span>
					</div>
					<div class="flex1">
						联系人手机号：<span class="colos">{{returnDetailData.cfmUserMobil}}</span>
					</div>
					<div class="flex1">
						归还单位： <span class="colos">{{returnDetailData.participantName}}</span>
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						交接方式：
						<span class="colos">{{returnDetailData.deliverFlag,"jjfs" | filter}}</span>
					</div>
					<div class="flex1">
						仓库名称：<span class="colos">{{returnDetailData.warehouseName}}</span>
					</div>
					<div class="flex1">
						状态： <span class="colos">{{returnDetailData.status,"ghjl" | filter}}</span>
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						备注意见：<span class="colos">{{returnDetailData.taskDesc}}</span>
					</div>
					<div class="flex1">
						交接地址：<span class="colos">{{returnDetailData.addressNameFull}}</span>
					</div>
					<div class="flex1">
						详细地址：<span class="colos">{{returnDetailData.addressName}}</span>
					</div>
				</div>
				<div class="themeclass">
					<Icon type="social-buffer"></Icon>
					<span>归还列表</span>
				</div>
				<div class="listreturn">
					<ul>
						<li style="background: #CCC; color:#333;">
							<div class="lis">资产类型</div>
							<div class="lis">资产品质</div>
							<div class="lis">归还数量</div>
						</li>
						<li v-for="(item,index) in returnProList">
							<div class="lis">{{item.assertName}}</div>
							<div class="lis">{{item.qaType,"pzlx" | filter}}</div>
							<div class="lis">{{item.reqNum}}</div>
						</li>
					</ul>
				</div>
			</Modal>
		</div>
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
				rent_data: '',
				returnInfo: '',
				returnInfoList: [],
				returnProList: [],
				returnDetailData: '',
				modal1: false,
				modal2: false,
				putStroeLogdata: '',
				showNum: 8, // number of item per page
				currentPage: 1,
				putLogData: [],
				confirmList: {},
			}
		},
		mounted() {
			var _this = this
			_this.readly()
		},
		methods: {
			request(post, param, callback) { //请求方法封装
				this.$http.post(post, param).then(function(response) {
					if(callback) {
						callback(response.data);
					}
				}).catch(function(error) {
					console.log('错误', error)
				})
			},
			readly() {
				var _this = this
				var url_ptl = '/warehousePut/task/queryPutTaskList.do'
				var param_ptl = {
					requestId: "111"
				}
				this.request(url_ptl, param_ptl, function(data) {
					_this.rent_data = data
				})
			},
			changeTab(val) {
				if(val == 1) {
					var _this = this
					var post = '/warehousePut/base/leaseReturn/queryReturnLogList.do'
					var param = {
						requestId: '22'
					}
					this.request(post, param, function(data) {
						_this.putStroeLogdata = data
						for(var i = 0; i < _this.putStroeLogdata.length; i++) {
							if(_this.putStroeLogdata[i].status == '99') {
								if(_this.putStroeLogdata[i].odConfirmTime) {
									_this.putStroeLogdata[i].ConfirmTime = _this.putStroeLogdata[i].odConfirmTime
									_this.putStroeLogdata[i].ConfirmNum = _this.putStroeLogdata[i].odConfirmNum
								} else if(_this.putStroeLogdata[i].wsConfirmTime && !_this.putStroeLogdata[i].odConfirmTime) {
									_this.putStroeLogdata[i].ConfirmTime = _this.putStroeLogdata[i].wsConfirmTime
									_this.putStroeLogdata[i].ConfirmNum = _this.putStroeLogdata[i].wsConfirmNum
								}
							} else {

							}
							_this.confirmList = _this.putStroeLogdata
						}
						_this.putLogData = _this.putStroeLogdata.slice(0, _this.showNum)
					})
				}
			},
			lookmore(val) {
				this.modal2 = true
				var _this = this
				let postInfo = '/warehousePut/base/leaseReturn/queryReturnInfo.do' //入库核实产品信息
				let param = {
					requestId: this.rent_data[val].requestId
				}
				this.request(postInfo, param, function(data) {
					_this.returnDetailData = data
					_this.returnProList = _this.returnDetailData.returnList
				})
			},
			showPage(page) { //分页封装
				this.currentPage = page
				let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				return {
					startPage,
					endPage
				}
			},
			pageChange(page) { //租借分页
				this.showPage(page)
				this.putLogData = this.putStroeLogdata.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
			instance(type, index) {
				var _this = this
				let taskCode = this.rent_data[index].taskDefCode
				let taskName = this.rent_data[index].taskDefName
				let param = {
					requestId: this.rent_data[index].requestId
				}
				let postlc = '/warehousePut/task/leaseReturn/confirmBegin.do' //准备入库
				let postInfo = '/warehousePut/base/leaseReturn/queryReturnInfo.do' //入库核实产品信息
				if(taskCode == '1503') {
					this.$Modal.confirm({
						title: '确认',
						content: '确认执行' + taskName + '操作吗？',
						onOk: () => {
							this.request(postlc, param, function(data) {
								_this.rent_data = data
								_this.$Message.success('确认成功!');
								_this.readly()
							})
						}
					})
				} else if(taskCode == '1504') {
					this.request(postInfo, param, function(data) {
						_this.modal1 = true
						_this.returnInfo = data
						_this.returnInfoList = _this.returnInfo.returnList
						for(var i = 0; i < _this.returnInfoList.length; i++) {
							if(_this.returnInfoList[i].wsConfirmNum == '0') {
								_this.returnInfoList[i].wsConfirmNum = ''
							}
						}
					})
				}
			},
			endOk() {
				var _this = this
				let postld = '/warehousePut/task/leaseReturn/confirmEnd.do' //入库完毕
				var re = 　/^[1-9]\d*$/

				for(var i = 0; i < _this.returnInfoList.length; i++) {
					if(_this.returnInfoList[i].wsConfirmNum == '0') {
					} else {
							
						console.log(_this.returnInfoList[i].wsConfirmNum,_this.returnInfoList[i].reqNum)
						if(!_this.returnInfoList[i].wsConfirmNum || !re.test(_this.returnInfoList[i].wsConfirmNum)) {
							_this.$Message.error({
								content: '请输入整数的确认数量！',
								duration: 3
							})
							return
						}
						else if((+_this.returnInfoList[i].wsConfirmNum) > (+_this.returnInfoList[i].reqNum)) {
							_this.$Message.error({
								content: '确认数量不能大于归还 数量！',
								duration: 3
							})
							return
						}
					}

				}
				let para = {}
				para.requestId = _this.returnInfo.requestId
				para.requestCfmUser = _this.returnInfo.requestCfmUser //归还人
				para.returnDate = _this.returnInfo.returnDate //日期
				para.deliverFlag = _this.returnInfo.deliverFlag //是否上门
				para.addressId = _this.returnInfo.addressId //地址区id
				para.addressNameFull = _this.returnInfo.addressNameFull //详细地址
				para.returnList = _this.returnInfoList //列表
				_this.$Modal.confirm({
					title: '请确认',
					content: '确定提交吗？',
					onOk: () => {
						this.request(postld, para, function(data) {
							_this.readly()
							_this.modal1 = false
							_this.$Message.success('确认成功!');
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.neirong {
		width: 100%;
		padding: 20px 20px 0;
	}
	
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
	}
	
	.pagestyle {
		text-align: center;
		margin: 20px 0;
	}
	
	.detaildiv {
		display: flex;
		border-bottom: 1px solid #F8F8F2;
		height: 40px;
		line-height: 40px;
		.colos {
			color: #9EA7B4;
		}
		.flex1 {
			flex: 1;
			white-space: nowrap;
		}
	}
	
	.detaildiv:last-child {
		border-bottom: none;
	}
	
	.themeclass {
		border: none;
		height: 30px;
		line-height: 30px;
		/*border-bottom: 1px solid #F8F8F2;*/
		margin: 5px 0;
		width: 100%;
		font-weight: bold;
	}
	
	.listreturn {
		width: 100%;
		border: 1px solid #C0C0C0;
		overflow: hidden;
		height: 160px;
		overflow: auto;
		ul li {
			display: flex;
			padding: 8px 0;
			cursor: pointer;
			.lis {
				flex: 1;
				text-align: center;
				span {
					padding: 1px 3px;
					color: #FF0000;
					cursor: pointer;
				}
			}
		}
		ul li:nth-child(odd) {
			background: #F2F2F2;
		}
		ul li:hover {
			background: #D5E8FC;
		}
	}
	
	.incomeul {
		width: 100%;
		height: 450px;
		ul {
			display: flex;
			width: 100%;
			li {
				flex: 1;
				text-align: center;
				height: 50px;
				line-height: 50px;
				white-space: nowrap;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: pointer;
				.queryBtn {
					border: 1px solid #BCBCBC;
					padding: 5px 10px;
					border-radius: 3px;
				}
				.queryBtn:hover {
					border: 1px solid #FF9900;
				}
			}
		}
		ul:nth-child(odd) {
			background: #F8F8F9;
		}
		ul:hover {
			background: #EBF7FF;
		}
		.firstul,
		.secondul {
			border: none;
			color: #fff;
			background: #FFAD33 !important;
			li {
				height: 40px;
				line-height: 40px;
			}
		}
		.secondul {
			background: #FF9600 !important;
		}
	}
</style>