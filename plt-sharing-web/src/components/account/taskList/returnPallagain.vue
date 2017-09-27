<template>
	<div class="main">
		<Modal v-model="modal3" title="托盘归还业务" width="700">
			<div class="hedas">
				<span class="requestId">订单编号：<span>{{requId}}</span></span>
				<span class="requestId">运营驳回原因：<span style="color: #FF0000;">{{retusData.taskDesc}}</span></span>
			</div>
			<div class="iform">
				<i-form ref="retusData" :model="retusData" :rules="retu" :label-width="90">
					<div class="retudiv">
						<Form-item label="归还人名：" prop="requestCfmUser" class="rentleft">
							<Select v-model="retusData.requestCfmUser" style="width:200px">
								<Option v-for="item in getManList" :value="item.userId" :key="item.userNameZh">{{ item.userNameZh }}</Option>
							</Select>
						</Form-item>
						<Form-item label="归还日期：" prop="returnDate" class="rentright">
							<Date-picker type="date" :editable="false" v-model="retusData.returnDate" :options="options3" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
						</Form-item>
					</div>
					<div class="retudiv">
						<Form-item label="交接方式：" class="rentleft" prop="deliverFlag">
							<Select v-model="retusData.deliverFlag" placeholder="平台是否上门取货" style="width:200px">
								<Option v-for="item in returnType" :value="item.itemCode" :key="item.itemCode">{{item.itemText}}</Option>
							</Select>
						</Form-item>
					</div>
					<div v-if="retusData.deliverFlag=='Y'" class="retudiv">
						<Form-item label="归还地址：" class="rentleft" prop="addressData">
							<Cascader v-model="retusData.addressData" style="width:200px;display: inline-block;" :data="cityData" trigger="hover"></Cascader>
						</Form-item>
						<Form-item label="详细地址：" prop="addressNameY" class="rentright">
							<Input v-model="retusData.addressNameY" :maxlength="50" placeholder="请输入详细街道地址" style="width: 200px"></Input>
						</Form-item>
					</div>
					<div v-if="retusData.deliverFlag=='N'" class="retudiv" style="padding-left: 18px;">
						<Form-item label="仓库选择：" class="tylaskleft">
							<Select v-model="retusData.provinceId" style="width:120px" placeholder="省" @on-change="queryCity">
								<Option v-for="item in ProvList" @click.native="clearWare" :value="item.provinceId" :key="item.provinceId">{{ item.proviceName }}</Option>
							</Select>
							<Select v-model="retusData.cityId" style="width:120px;margin-left: 3px;" placeholder="市" @on-change="queryWare">
								<Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
							</Select>
							<Select v-model="retusData.warehouseId" style="width:220px;margin-left: 3px;" placeholder="仓库地址">
								<Option v-for="item in wareList" @click.native="queryFullName(retusData.warehouseId)" :value="item.warehouseId" :key="item.warehouseId">{{item.areaName}}{{item.addressDetailName}}</Option>
							</Select>
						</Form-item>
					</div>
					<div class="clear"></div>
					<div class="tables">
						<div class="addretu" @click="addReturn()">添加归还</div>
						<div class="listreturn">
							<ul>
								<li style="background: #CCC; color:#333;">
									<div class="lis">资产类型</div>
									<div class="lis">资产品质</div>
									<div class="lis">归还数量</div>
									<div class="lis">操作</div>
								</li>
								<li v-if="returnData.length >= 1 && returnData" v-for="(item,index) in returnData">
									<div class="lis">{{item.assertName}}</div>
									<div class="lis">{{item.qaType,"pzlx" | filter}}</div>
									<div class="lis">{{item.reqNum}}</div>
									<div class="lis"><span @click="remove(index)">删除</span></div>
								</li>
								<div style="text-align: center;margin: 20px 0;" v-if="returnData.length < 1||!returnData">
									<span style="color: #FF0000;">请添加归还托盘数据</span>
								</div>
							</ul>
						</div>
					</div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="enSubmit('retusData')">提交</Button>
			</template>
		</Modal>
		<Modal v-model="modal4" width="360" title="添加归还托盘">
			<div class="addAlert">
				<div class="addAlert">
					<i-form ref="ListData" :model="ListData" :rules="retu" :label-width="100">
						<Form-item label="资产类型：" prop="assetType" class="rentright">
							<Select v-model="ListData.assetType" @on-change="getAsset" label-in-value style="width:200px">
								<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
							</Select>
						</Form-item>
						<Form-item label="资产品质：" prop="quaType" class="rentright">
							<Select v-model="ListData.quaType" style="width:200px">
								<Option v-for="item in queTypelist" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
							</Select>
						</Form-item>
						<Form-item label="归还数量：" prop="sl" class="rentright">
							<Input v-model="ListData.sl" :maxlength="5" placeholder="请输入归还数量" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" style="width: 200px"></Input>
						</Form-item>
					</i-form>
				</div>
			</div>
			<template slot="footer">
				<Button type="primary" @click="addSubmit('ListData')">提交</Button>
			</template>
		</Modal>

		<div class="incomeul">
			<ul class="firstul">
				<li>归还编号</li>
				<li>请求日期</li>
				<li>预归还日期</li>
				<li>交接方式</li>
				<li>交接地址</li>
				<li>操作</li>
			</ul>
			<ul v-for="(item,index) in retureTaskData">
				<li>{{item.requestId}}</li>
				<li>{{item.requestTime}}</li>
				<li>{{item.returnDate}}</li>
				<li>{{item.deliverFlag,"jjfs" | filter}}</li>
				<li :title="item.addressNamePcd+item.addressName">{{item.addressNamePcd}}{{item.addressName}}</li>
				<li>
					<span class="dosome" @click="dosome(index)">{{item.taskDefName}}</span>
					<span class="delete" @click="doDelete(index)">撤销</span>
				</li>
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
				modal3: false,
				modal4: false,
				returnList: '',
				retureTaskData: '',
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 86400000;
					}
				},
				initData: '',
				queTypelist: '',
				returnType: '',
				ListData: {
					assetType: '',
					quaType: '',
					sl: '',
					assetName: '',
				},
				requId: '',
				reqNum: '',
				DateList: [],
				ProvList: [],
				cityList: [],
				wareList: [],
				retusData: {
					deliverFlag: '',
					provinceId: '', //省
					cityId: '',
					adressId: '',
					addressDetailName: '',
					warehouseId: '',
					addressNameY: ''
				},
				retu: {
					requestCfmUser: [{
						required: true,
						message: '请选择归还人名',
						trigger: 'change'
					}],
					returnDate: [{
						required: true,
						message: '请选择归日期',
						//						trigger: 'blur'
					}],
					deliverFlag: [{
						required: true,
						message: '请选归还方式',
						trigger: 'change'
					}],
					assetType: [{
						required: true,
						message: '请选择资产类型',
						trigger: 'change'
					}],
					quaType: [{
						required: true,
						message: '请选择资产品质',
						trigger: 'change'
					}],
					sl: [{
						required: true,
						message: '请填写租托数量',
						pattern: /^[1-9]\d*$/,
						trigger: 'blur'
					}],
					addressData: [{
						required: true,
						type: 'array',
						message: '请选择地址',
						trigger: 'change'
					}],
					addressName: [{
						required: true,
						message: '请填写详细地址',
						trigger: 'blur'
					}]
				},
				returnData: [], //展示到页面上的数据
			}
		},
		mounted() {
			this.init()
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
			init() { //任务列表
				var _this = this
				let urls = '/leaseReturn/task/queryParticipantReturnTaskList.do'
				let pas = {
					requestId: '123'
				}
				this.request(urls, pas, function(data) {
					_this.retureTaskData = data
				})
			},
			dosome(index) { //添加归还 最外层按钮
				var _this = this
				this.modal3 = true
				var paramcal = {
					categoryId: '123'
				}
				var postcal = "/lease/base/queryCanDoBizAssertList.do"
				var url_dbc = '/commDict/queryDictListByCodes.do' //字典查询
				var arr_dbc = ['whaleHose_QA_type', 'deliver_flag']
				this.request(postcal, paramcal, function(data) { //资产类型
					_this.initData = data
				})
				_this.request(url_dbc, arr_dbc, function(data) { //类型选泽
					_this.queTypelist = data.whaleHose_QA_type.options.splice(1)
					_this.returnType = data.deliver_flag.options.splice(1)
				})
				var paramcul = {
					orgId: '123'
				}
				var postcul = '/lease/leaseBase/queryLeaseHolderConfirmUserList.do' //查询收货人
				_this.request(postcul, paramcul, function(data) {
					_this.getManList = data
				})
				_this.requId = _this.retureTaskData[index].requestId
				var post_detail = '/leaseReturn/base/queryReturnInfo.do' //查看当前列表详细
				_this.request(post_detail, {
					requestId: _this.requId
				}, function(data) {
					_this.retusData = data
					_this.returnData = _this.retusData.returnList//归还列表
					console.log('当前行数据', _this.retusData)
					if(_this.retusData.deliverFlag == 'Y') {
						_this.retusData.addressNameY = _this.retusData.addressName
						_this.retusData.addressData = [_this.retusData.provinceId, _this.retusData.cityId, _this.retusData.addressId]
					} else if(_this.retusData.provinceId && _this.retusData.deliverFlag == 'N') {
						_this.queryCity(_this.retusData.provinceId)
						_this.queryWare(_this.retusData.cityId)
					}
					_this.queryStore()
				})
			},
			doDelete(its) {
				var _this = this
				let del = '/leaseReturn/task/cancleReturnProcess.do'
				_this.requId = _this.retureTaskData[its].requestId
				this.$Modal.confirm({
					title: '撤回任务',
					content: '确定要撤回此任务？',
					onOk: () => {
						_this.request(del, {
							requestId: _this.requId
						}, function(data) {
							_this.retureTaskData.splice(its, 1);
							_this.$Message.success('撤回成功!')
						})
					}
				})
			},
			queryStore() { //查省
				var _this = this
				let Prov = '/appComm/warehouse/queryWareHouseViewProvinceList.do'
				let ProvId = {
					mobil: '123'
				}
				_this.request(Prov, ProvId, function(data) {
					_this.ProvList = data
				})
			},
			queryCity(ct) { //查市
				var _this = this
				let city = '/appComm/warehouse/queryWareHouseViewCityList.do'
				_this.request(city, {
					provinceId: _this.retusData.provinceId
				}, function(data) {
					_this.cityList = data
					console.log("市", _this.cityList)
				})
			},
			clearWare(){
				var _this = this
				_this.retusData.warehouseId = ''
			},
			queryWare(ware) { //查库
				var _this = this
				let wares = '/appComm/warehouse/queryWareHouseViewInfoList.do'
				if(ware == '') {
					return
				} else {
					_this.request(wares, {
						cityId: ware
					}, function(data) {
						_this.wareList = data
						_this.queryFullName(_this.retusData.warehouseId,_this.wareList)
					})
					
				}
			},
			queryFullName(val, datas) {
				var _this = this
				datas = _this.wareList
				if(datas) {
					for(var i = 0; i < _this.wareList.length; i++) {
						if(_this.wareList[i].warehouseId == val) {
							console.log(_this.wareList[i].warehouseId)
							_this.retusData.adressId = _this.wareList[i].adressId
							_this.retusData.addressDetailName = _this.wareList[i].addressDetailName
						}
					}
				}
			},
			addReturn() {
				var _this = this
				_this.modal4 = true
			},
			getAsset(val) {
				this.ListData.assetName = val.label
			},
			addSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						var _this = this
						let retns = {}
						retns.assertId = _this.ListData.assetType
						retns.assertName = _this.ListData.assetName //资产类型
						retns.qaType = _this.ListData.quaType //资产品质
						retns.reqNum = _this.ListData.sl //资产数量
						for(var i = 0; i < _this.returnData.length; i++) {
							if(_this.returnData[i].assertName == retns.assertName && _this.returnData[i].qaType == retns.qaType) {
								_this.$Message.error('该品质类型已添加！')
								_this.handleReset(name)
								return
							}
						}
						_this.modal4 = false
						_this.returnData.push(retns) //提交后台数据
						_this.handleReset(name)
					} else {
						this.$Message.error({
							content: '请输入正确的归还信息！',
							duration: 3
						})
						_this.handleReset(name)
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			remove(index) {
				this.returnData.splice(index, 1);
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate
				return currentdate;
			},
			enSubmit(name) { //最后提交
				var _this = this
				var setdate = ''
				var addressId = ''
				var addressName = ''
				var times = new Date()
				var url_submit = "/leaseReturn/task/reSubmitReturnInfo.do"
				var dateLen = JSON.stringify(_this.retusData.returnDate).length
				if(dateLen < 26) {
					var dateRan = _this.retusData.returnDate.substring(0, 10) > _this.getNowFormatDate()
					if(!dateRan) {
						this.$Message.error({
							content: '归还日期应大于当前日期+2！',
							duration: 3
						})
						return
					}
				}
				if(dateLen < 26) {
					setdate = _this.retusData.returnDate
				} else {
					var bztimes = new Date(+_this.retusData.returnDate);
					var hour_min_s = times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds()
					setdate = bztimes.Format("yyyy-MM-dd") + ' ' + hour_min_s
				}
				if(_this.retusData.deliverFlag == 'N') { //判断交接方式
					if(!_this.retusData.warehouseId || _this.retusData.warehouseId=='0') {
						this.$Message.error({
							content: '请完善地址信息！',
							duration: 3
						})
						return
					}else{
						addressId = _this.retusData.adressId
					    addressName = _this.retusData.addressDetailName
					    console.log(_this.retusData.adressId,2222)
					}
					
				} else {
					if(_this.retusData.addressData && _this.retusData.addressNameY){
						addressId = _this.retusData.addressData[_this.retusData.addressData.length - 1]
						addressName = _this.retusData.addressNameY
					}else{
						this.$Message.error({
							content: '请完善地址信息！',
							duration: 3
						})
						return
					}
					
				}
				if(_this.returnData.length < 1) {
					_this.$Message.error({
						content: '请完善归还托盘信息！',
						duration: 3
					})
					return
				}
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Modal.confirm({
							title: '请确认',
							content: '确定归还吗？',
							onOk: () => {
								let para = {}
								para.requestId = _this.requId
								para.requestCfmUser = _this.retusData.requestCfmUser //归还人
								para.returnDate = setdate //日期
								para.deliverFlag = _this.retusData.deliverFlag //是否上门
								para.addressId = addressId //地址区id
								para.addressName = addressName //详细地址
								para.warehouseId = _this.retusData.warehouseId
								para.returnList = _this.returnData
								_this.request(url_submit, para, function(data) {
									_this.$Message.success('提交成功')
									_this.modal3 = false
									_this.init()
									_this.handleReset(name)
									_this.returnData = []
								})
							}
						})
					} else {
						this.$Message.error({
							content: '请输入正确的归还信息！',
							duration: 3
						})
					}
				})

			},
		}
	}
</script>
<style lang="scss" scoped>
	.main {
		height: 500px;
		.btnDiv {
			width: 100%;
			margin-top: 15px;
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
	
	.hedas {
		width: 100%;
		display: flex;
		.requestId {
			flex: 1;
			margin: 5px 0 15px 40px;
			span {
				color: #18B566;
			}
		}
	}
	
	.iform {
		margin: 0px auto;
		.retudiv {
			width: 100%;
			height: 50px;
			float: left;
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
		.tables {
			width: 100%;
			padding: 5px 20px;
			.addretu {
				color: #fff;
				font-weight: bold;
				width: 100px;
				height: 30px;
				line-height: 30px;
				font-size: 13px;
				cursor: pointer;
				text-align: center;
				background: #2D8CF0;
				border-bottom: none;
			}
			.listreturn {
				width: 100%;
				border: 1px solid #C0C0C0;
				overflow: hidden;
				height: 180px;
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
		}
	}
	
	.addAlert {
		padding: 5px 5px 0 0;
		p {
			margin: 0 0 20px;
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
			.dosome,
			.delete {
				color: #fff;
				padding: 7px 10px;
				border-radius: 3px;
				letter-spacing: 1px;
				border: none;
				background: #0080FF;
			}
			.dosome:hover {
				background: #48A4FF;
			}
			.delete {
				background: #FF0000;
			}
			.delete:hover {
				background: #FF3D00;
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
</style>