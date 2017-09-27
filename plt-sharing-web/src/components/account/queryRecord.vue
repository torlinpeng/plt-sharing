<template>
	<div class="income">
		<Tabs type="card" @on-click="queryRecord">
			<Tab-pane label="租借记录">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>业务编号</li>
						<li>下单日期</li>
						<li>产品类型</li>
						<li>资产型号</li>
						<li>租借数量</li>
						<li>交货方式</li>
						<li>交接地址</li>
						<li>状态</li>
					</ul>
					<ul v-for="(item,index) in rentShowData" @click="rentDetail((currentPage-1)*10+(index))">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li :title="item.requestId">{{item.requestId}}</li>
						<li v-if="item.requestTime">{{item.requestTime.substring(0,10)}}</li>
						<li v-else></li>
						<li>{{item.productCatlogId,"cplx"|filter}}</li>
						<li :title="item.assertName">{{item.assertName}}</li>
						<li>{{item.leaseNum}}</li>
						<li>{{item.deliverFlag,"jjfs" | filter}}</li>
						<li :title="item.addressNamePcd+item.aaddressName">{{item.addressNamePcd}}{{item.aaddressName}}</li>
						<li>{{item.status,"ztjl" | filter}}</li>
					</ul>
				</div>
				<Page :total="rent_data.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeRent"></Page>
				
			</Tab-pane>
			<Tab-pane label="归还记录">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>业务编号</li>
						<li>归还日期</li>
						<li>交接地址</li>
						<li>交接方式</li>
						<li>操作员</li>
						<li>清算时间</li>
						<li>状态</li>
					</ul>
					<ul v-for="(item,index) in returnShowData"  @click="returnDetail((currentPage-1)*10+(index))">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li>{{item.requestId}}</li>
						<li v-if="item.requestTime">{{item.requestTime.substring(0,10)}}</li>
						<li v-else></li>
						<li>{{item.addressNamePcd}}</li>
						<li>{{item.deliverFlag,"jjfs" | filter}}</li>
						<li>{{item.requestCfmUserName}}</li>
						<li v-if="item.updateTime">{{item.updateTime.substring(0,10)}}</li>
						<li v-else></li>
						<li>{{item.status,"ghjl" | filter}}</li>
					</ul>
				</div>
				<Page :total="retu_data.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeReturn"></Page>
				
			</Tab-pane>
			<Tab-pane label="报损记录">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>业务编号</li>
						<li>报损日期</li>
						<li>资产类型</li>
						<li>报损数量(片)</li>
						<li>核实数量(片)</li>
						<li>操作员</li>
						<li>状态</li>
					</ul>
					<ul v-for="(item,index) in damShowData">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li>{{item.requestId}}</li>
						<li v-if="item.requestTime">{{item.requestTime.substring(0,10)}}</li>
						<li v-else></li>
						<li :title="item.assertName">{{item.assertName}}</li>
						<li>{{item.reportNum}}</li>
						<li v-if="item.status !='99'"></li>
						<li v-if="item.status =='99'">{{item.confirmNum}}</li>
						<li>{{item.participantName}}</li>
						<li>{{item.status,"dmjl" | filter}}</li>
					</ul>
				</div>
				<Page :total="dam_data.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeDam"></Page>
				
			</Tab-pane>
			<Tab-pane label="报失记录">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>业务编号</li>
						<li>报失日期</li>
						<li>资产类型</li>
						<li>报失数量(片)</li>
						<li>操作员</li>
					</ul>
					<ul v-for="(item,index) in losShowData">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li>{{item.requestId}}</li>
						<li v-if="item.requestTime">{{item.requestTime.substring(0,10)}}</li>
						<li v-else></li>
						<li :title="item.assertName">{{item.assertName}}</li>
						<li>{{item.loseNum}}</li>
						<li>{{item.requestUserName}}</li>
					</ul>
				</div>
				<Page :total="los_data.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeLos"></Page>
				
			</Tab-pane>
			<Tab-pane label="转户记录">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>业务编号</li>
						<li>转租日期</li>
						<li>资产类型</li>
						<li>转租数量</li>
						<li>转户单位</li>
						<li>接收单位</li>
						<li>状态</li>
					</ul>
					<ul v-for="(item,index) in transShowData">
						<li>{{(currentPage-1)*10+(index+1)}}</li>
						<li>{{item.requestId}}</li>
						<li v-if="item.createTime">{{item.createTime.substring(0,10)}}</li>
						<li v-else></li>
						<li :title="item.assertName">{{item.assertName}}</li>
						<li>{{item.transferNum}}</li>
						<li>{{item.fromParticipantName}}</li>
						<li>{{item.toParticipantName}}</li>
						<li>{{item.status,"zhjl" | filter}}</li>
					</ul>
				</div>
				<Page :total="trans_data.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeTrans"></Page>
			</Tab-pane>
		</Tabs>
		<Modal title="租借详细信息" width="780" v-model="modal09" ok-text="关闭" cancel-text="" class-name="vertical-center-modal">
			<div class="detaildiv">
				<div class="flex1">
					租借单号：<span class="colos" style="color: #008A00;">{{rentDetailData.requestId}}</span>
				</div>
				<div class="flex1">
					预租日期：<span class="colos" v-if="rentDetailData.preLeaseDate">{{rentDetailData.preLeaseDate.substring(0,10)}}</span>
					         <span v-else></span>
				</div>
				<div class="flex1">
					租借数量：<span class="colos">{{rentDetailData.leaseNum}}</span>

				</div>
			</div>
			<div class="detaildiv">
				<div class="flex1">
					资产类型：<span class="colos">{{rentDetailData.assertName}}</span>
				</div>
				<div class="flex1">
					产品类型： <span class="colos">{{rentDetailData.productCatlogId,"cplx"|filter}}</span>
				</div>
				<div class="flex1">
					核实数量：
					<span class="colos" v-if="rentDetailData.status != 99"></span>
					<span class="colos" v-if="rentDetailData.status == 99">{{rentDetailData.leaseConfirmNum}}</span>
				</div>
			</div>
			<div class="detaildiv">
				<div class="flex1">
					交货方式：
					<span class="colos">{{rentDetailData.deliverFlag,"jjfs" | filter}}</span>
				</div>
				<div class="flex1">
					交接地址：<span class="colos">{{rentDetailData.addressNamePcd}}</span>
				</div>
				<div class="flex1">
					详细地址：<span class="colos">{{rentDetailData.aaddressName}}</span>
				</div>
			</div>

			<div class="detaildiv">
				<div class="flex1">
					租借期限：<span class="colos">{{rentDetailData.agreedPeriodNum}}</span>
				</div>
				<div class="flex1">
					租赁状态：<span class="colos">{{rentDetailData.status,"ztjl" | filter}}</span>
				</div>
				<div class="flex1">
					收货人：<span class="colos">{{rentDetailData.requestCfmUserName}}</span>
				</div>
			</div>

		</Modal>

		<Modal title="归还详细信息" width="780" v-model="modal10" ok-text="关闭" cancel-text="" class-name="vertical-center-modal">
			<div class="detaildiv">
				<div class="flex1">
					归还编号：<span class="colos" style="color: #008A00;">{{returnDetailData.requestId}}</span>
				</div>
				<div class="flex1">
					下单日期：<span class="colos" v-if="returnDetailData.requestTime"> {{returnDetailData.requestTime.substring(0,10)}}</span>
					         <span class="colos" v-else></span>
				</div>
				<div class="flex1">
					预还日期：<span class="colos" v-if="returnDetailData.returnDate">{{returnDetailData.returnDate.substring(0,10)}}</span>
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
					<span>{{returnDetailData.deliverFlag,"jjfs" | filter}}</span>
				</div>
				<div class="flex1">
					仓库名称：<span class="colos">{{returnDetailData.warehouseName}}</span>
				</div>
				<div class="flex1">
					交接地址：<span class="colos">{{returnDetailData.addressNameFull}}</span>
				</div>
			</div>
			<div class="detaildiv">
				<div class="flex1">
					备注意见：<span class="colos">{{returnDetailData.remark}}</span>
				</div>
				<div class="flex1">
					状态： <span class="colos">{{returnDetailData.status,"ghjl" | filter}}</span>
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
						<div class="lis">核实数量</div>
					</li>
					<li v-for="(item,index) in confirmList">
						<div class="lis">{{item.assertName}}</div>
						<div class="lis">{{item.qaType,"pzlx" | filter}}</div>
						<div class="lis">{{item.reqNum}}</div>
						<div class="lis">{{item.ConfirmNum}}</div>
					</li>
				</ul>
			</div>
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
				rent_data: '',
				retu_data: '',
				dam_data: '',
				los_data: '',
				trans_data: '',
				rentDetailData: '',
				returnDetailData: '',
				modal10: false,
				modal09: false,
				confirmList: {},
				showNum: 10, // number of item per page
				currentPage: 1,
				rentShowData:[],
				returnShowData:[],
				damShowData:[],
				losShowData:[],
				transShowData:[]
			}
		},
		mounted() {
			var _this = this
			var urls='/lease/base/queryParticipantLeaseLogList.do'
			var params={assertName: "111"}
			_this.request(urls,params, function(data){
				_this.rent_data = data
				_this.rentShowData= _this.rent_data.slice(0, _this.showNum)
			})	
		},
		methods: {
			request(post, param, callback) { //方法封装
				this.$http.post(post, param).then(function(response) {
					if(callback) {
						callback(response.data);
					}
				}).catch(function(error) {
					console.log("错误", error)
				})
			},
			queryRecord(key) {
				var _this = this
				var url_retuRec = "/leaseReturn/base/queryParticipantReturnLogList.do" //归还记录
				var url_damRec = "/leaseReportDmg/task/queryParticipantReportDmgLogList.do" //报损记录
				var url_losRec = "/leaseReportLose/queryReportLoseNumHistoryList.do" //报失记录
				var url_transRec = '/leaseTransfer/task/queryParticipantTransferLogList.do'
				var parss = {
					requestId: '123'
				}
				switch(key) {
					case 0:
						break
					case 1:
						_this.request(url_retuRec, parss, function(data) {
							_this.retu_data = data
							_this.currentPage=1
							_this.returnShowData= _this.retu_data.slice(0, _this.showNum)
						})
						break
					case 2:
						_this.request(url_damRec, parss, function(data) {
							_this.dam_data = data
							_this.currentPage=1
							_this.damShowData= _this.dam_data.slice(0, _this.showNum)
						})
						break
					case 3:
						_this.request(url_losRec, parss, function(data) {
							_this.los_data = data
							_this.currentPage=1
							_this.losShowData= _this.los_data.slice(0, _this.showNum)
						})
						break
					case 4:
						_this.request(url_transRec, parss, function(data) {
							_this.trans_data = data
							_this.currentPage=1
							_this.transShowData= _this.trans_data.slice(0, _this.showNum)
						})
				}
			},
			showPage(page){//分页封装
				this.currentPage = page
			    let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				return {startPage,endPage}
			},
			pageChangeRent(page){//租借分页
				this.showPage(page)
				this.rentShowData = this.rent_data.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
			pageChangeReturn(page){//归还分页
				this.showPage(page)
				this.returnShowData = this.retu_data.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
			pageChangeDam(page){//报损分页
				this.showPage(page)
				this.damShowData = this.dam_data.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
			pageChangeLos(page){//报失分页
				this.showPage(page)
				this.losShowData = this.los_data.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
			pageChangeTrans(page){//转户分页
				this.showPage(page)
				this.transShowData = this.trans_data.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
			rentDetail(keys) { //归还详细
				this.modal09 = true
				var _this = this
				_this.rentDetailData = _this.rent_data[keys]

			},
			returnDetail(index) {
				this.modal10 = true
				var _this = this
				let post = '/leaseReturn/base/queryReturnInfo.do'
				let reqid = {
					requestId: _this.retu_data[index].requestId
				}
				_this.request(post, reqid, function(data) {
					_this.returnDetailData = data
					if(_this.returnDetailData.status == '99') {
						if(_this.returnDetailData.odConfirmTime) {
							for(var i = 0; i < _this.returnDetailData.returnList.length; i++) {
								_this.returnDetailData.returnList[i].ConfirmNum = _this.returnDetailData.returnList[i].odConfirmNum
							}
						} else if(_this.returnDetailData.wsConfirmTime && !_this.returnDetailData.odConfirmTime) {
							for(var i = 0; i < _this.returnDetailData.returnList.length; i++) {
								_this.returnDetailData.returnList[i].ConfirmNum = _this.returnDetailData.returnList[i].wsConfirmNum
							}
						}
						_this.confirmList = _this.returnDetailData.returnList
					} else {
						for(var i = 0; i < _this.returnDetailData.returnList.length; i++) {
							_this.returnDetailData.returnList[i].ConfirmNum = ''
						}
						_this.confirmList = _this.returnDetailData.returnList
					}
				})

			}
		},

	}
</script>

<style lang="scss" scoped>
	.ivu-tabs-bar {
		margin-bottom: 0px;
	}
	
	.income {
		padding: 20px 20px 0;
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
				height: 40px;
				line-height: 40px;
				white-space: nowrap;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: pointer;
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
	}
	
	.themeclass {
		border: none;
		height: 30px;
		line-height: 30px;
		/*border-bottom: 1px solid #F8F8F2;*/
		margin-bottom: 5px;
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
	.pagestyle {
		text-align: center;
		margin: 20px 0;
	}
	.detaildiv:last-child {
		border-bottom: none;
	}
	
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
	}
</style>