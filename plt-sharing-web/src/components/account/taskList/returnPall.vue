<template>
	<div class="main">
		<Modal v-model="modal1" title="托盘归还业务" ok-text="提交" @on-cancel="cancelSubmit('retu')" width="720">
			<div class="iform">
				<i-form ref="retu" :model="retus" :rules="retu" :label-width="100">
					<div class="retudiv">
						<Form-item label="联系人名：" prop="requestCfmUser" class="rentleft">
							<Select v-model="retus.requestCfmUser" style="width:200px">
								<Option v-for="item in getManList" :value="item.userId" :key="item.userNameZh">{{ item.userNameZh }}</Option>
							</Select>
						</Form-item>
						<Form-item label="归还日期：" prop="returnDate" class="rentright">
							<Date-picker type="date" :editable="false" v-model="retus.returnDate" :options="options3" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
						</Form-item>
					</div>
					<div class="retudiv">
						<Form-item label="交接方式：" prop="deliverFlag" class="rentleft">
							<Select v-model="retus.deliverFlag" placeholder="平台是否上门取货" style="width:200px" @on-change="changes">
								<Option v-for="item in returnType" :value="item.itemCode" :key="item.itemCode">{{item.itemText}}</Option>
							</Select>
						</Form-item>
					</div>
					<div v-if="retus.deliverFlag=='Y'" class="retudiv">
						<Form-item label="交接地址：" class="rentleft" prop="addressNamePcd">
							<Cascader v-model="retus.addressNamePcd" style="width:200px;display: inline-block;" :data="cityData" trigger="hover"></Cascader>
						</Form-item>
						<Form-item label="详细地址：" prop="aaddressName" class="rentright">
							<Input v-model="retus.aaddressName" :maxlength="50" placeholder="请输入详细街道地址" style="width: 200px"></Input>
						</Form-item>
					</div>
					<div v-if="retus.deliverFlag=='N'" class="retudiv" style="padding-left: 18px;">
						<Form-item label="仓库选择：" class="tylaskleft">
							<Select v-model="retus.provinceId" style="width:120px" placeholder="省" @on-change="queryCity">
								<Option v-for="item in ProvList" :value="item.provinceId" :key="item.provinceId">{{ item.proviceName }}</Option>
							</Select>
							<Select v-model="retus.cityId" style="width:120px;margin-left: 3px;" placeholder="市" @on-change="queryWare">
								<Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
							</Select>
							<Select v-model="retus.warehouseId" style="width:220px;margin-left: 3px;" placeholder="仓库地址" @on-change="queryFullName">
								<Option v-for="item in wareList" :value="item.warehouseId" :key="item.warehouseId">{{item.areaName}}{{item.addressDetailName}}</Option>
							</Select>
						</Form-item>
					</div>
					<div class="clear"></div>
					<div class="tables">
						<div class="addretu" @click="addReturn()">添加归还</div>
						<Table height="200" align="center" style="cursor: pointer;" :columns="columns7" :data="returnData"></Table>
					</div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="enSubmit('retu')">提交</Button>
			</template>
		</Modal>
		<Modal v-model="modal2" :visible.sync="showTaskInfo" width="360" title="添加归还托盘">
			<div class="addAlert">
				<i-form ref="ListData" :model="ListData" :rules="retu" :label-width="100">
					<Form-item label="资产类型：" prop="assetType" class="rentright">
						<Select v-model="ListData.assetType" @on-change="getAsset" label-in-value style="width:200px">
							<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
						</Select>
					</Form-item>
					<Form-item label="资产品质：" prop="quaType" class="rentright">
						<Select v-model="ListData.quaType" @on-change="getQua" label-in-value style="width:200px">
							<Option v-for="item in qaType" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
						</Select>
					</Form-item>
					<Form-item label="归还数量：" prop="amount" class="rentright">
						<Input v-model="ListData.amount" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入正整数" style="width: 200px"></Input>
					</Form-item>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="addSubmit('ListData')">提交</Button>
			</template>
		</Modal>
		<div class="btnDiv">
			<Button style="width: 160px;margin-top: 10px;height: 36px;" @click="handleSubmit()" type="warning">托盘归还</Button>
		</div>
		<again-return></again-return>
	</div>
</template>
<script>
	import cityData from '../../common/addres.json'
	import againReturn from './returnPallagain'
	export default {
		data() {
			return {
				cityData: cityData,
				getManList: '',
				modal1: false,
				modal2: false,
				showTaskInfo: false,
				retuList: '',
				returnList: '',
				returnTaskList: '',
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 86400000;
					}
				},
				initData: '',
				dicData: '',
				qaType: '',
				returnType: [],
				ListData: {
					quaType: '',
					amount: '',
					assetType: '',
				},
				assetName: '',
				quaName: '',
				addressName: '', //详细地址
				DateList: [],
				ProvList: [],
				cityList: [],
				wareList: [],
				retus: {
					provinceId: '', //省
					deliverFlag: '',
					cityId: '',
					adressId: '',
					aaddressName: '',
					NoaddressName: '', //仓库详细地址
					warehouseId: '',
					returnDate: []
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
					amount: [{
						required: true,
						message: '请填写租托数量',
						pattern: /^[1-9]\d*$/,
						trigger: 'blur'
					}],
					addressNamePcd: [{
						required: true,
						type: 'array',
						message: '请选择地址',
						trigger: 'change'
					}],
					aaddressName: [{
						required: true,
						message: '请填写详细地址',
						trigger: 'blur'
					}]
				},
				columns7: [{
						title: '资产类型',
						key: 'assetType',
						render: (h, params) => {
							return h('div', [
								h('strong', params.row.assetType)
							]);
						}
					},
					{
						title: '资产品质',
						key: 'quaType'
					},
					{
						title: '资产数量',
						key: 'amount'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								}, '删除')
							]);
						}
					}
				],
				returnData: [],
				returnDatas: []
			}
		},
		components: {
			againReturn
		},
		mounted() {
			let firstData = this.$store.getters.getRentAtm //vuex 传
			if(firstData.retuDate) {
				this.retus.retuDate = firstData.retuDate
				this.retus.adressData = firstData.adress
			} else {}
			var _this = this
			var url_dbc = '/commDict/queryDictListByCodes.do' //字典查询
			var arr_dbc = ['whaleHose_QA_type', 'deliver_flag']
			_this.request(url_dbc, arr_dbc, function(data) { //类型选泽
				_this.qaType = data.whaleHose_QA_type.options.splice(1)
				_this.returnType = data.deliver_flag.options.splice(1)
			})
			_this.queryStore()
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
			changes() {
				this.retus.aaddressName = ''
				this.retus.addressNamePcd = []
			},
			handleSubmit() { //添加归还 最外层按钮
				var _this = this
				this.modal1 = true
				var paramcal = {
					categoryId: '123'
				}
				var postcal = "/lease/base/queryCanDoBizAssertList.do"
				this.request(postcal, paramcal, function(data) { //资产类型
					_this.initData = data
				})
				var paramcul = {
					orgId: '123'
				}
				var postcul = '/lease/leaseBase/queryLeaseHolderConfirmUserList.do' //查询收货人
				_this.request(postcul, paramcul, function(data) {
					_this.getManList = data
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
					console.log('省', _this.ProvList)
				})
			},
			queryCity(ct) { //查市
				var _this = this
				_this.retus.cityId = ''
				_this.retus.adressId = ''
				_this.retus.NoaddressName = ''
				_this.wareList = []
				let city = '/appComm/warehouse/queryWareHouseViewCityList.do'
				_this.request(city, {
					provinceId: ct
				}, function(data) {
					_this.cityList = data
					console.log('市', _this.cityList)
				})
			},
			queryWare(ware) { //查库
				var _this = this
				let wares = '/appComm/warehouse/queryWareHouseViewInfoList.do'
				console.log(ware)
				if(ware == '') {
					return
				} else {
					_this.request(wares, {
						cityId: ware
					}, function(data) {
						_this.wareList = data
						console.log('区', _this.wareList)
					})
				}
			},
			queryFullName(val) {
				var _this = this
				for(var i = 0; i < _this.wareList.length; i++) {
					if(_this.wareList[i].warehouseId == val) {
						_this.retus.adressId = _this.wareList[i].adressId
						_this.retus.NoaddressName = _this.wareList[i].addressDetailName
					} else {}
				}
			},
			addReturn() {
				var _this = this
				_this.modal2 = true
			},
			getAsset(val) {
				this.assetName = val.label
			},
			getQua(key) {
				this.quaName = key.label
			},
			addSubmit(name) {
				var _this = this
				this.$refs[name].validate((valid) => {
					if(valid) {
						let items = {}
						let retns = {}
						items.assetType = _this.assetName
						items.quaType = _this.quaName
						items.amount = _this.ListData.amount
						retns.assertId = _this.ListData.assetType //资产类型
						retns.qaType = _this.ListData.quaType //资产品质
						retns.reqNum = _this.ListData.amount //资产数量
						for(var i = 0; i < _this.returnDatas.length; i++) {
							if(_this.returnDatas[i].qaType == retns.qaType && _this.returnDatas[i].assertId == retns.assertId) {
								_this.$Message.error('该品质类型已添加！')
								_this.handleReset(name)
								return
							}
						}
						_this.modal2 = false;
						_this.returnDatas.push(retns) //提交后台的数据
						_this.returnData.push(items) //展示到页面上的数据
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
				this.returnDatas.splice(index, 1);
			},
			enSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						var _this = this
						var url_submit = "/leaseReturn/task/addReturnInfo.do"
						var addressId = ''
						var addressDeName = ''
						var times = new Date()
						var bztimes = new Date(+_this.retus.returnDate);
						var hour_min_s = times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds()
						var setdate = bztimes.Format("yyyy-MM-dd") + ' ' + hour_min_s
						if(_this.retus.deliverFlag == 'Y') {
							addressId = _this.retus.addressNamePcd[_this.retus.addressNamePcd.length - 1]
							if(!addressId) {
								this.$Message.error({
									content: '请完善地址信息！',
									duration: 3
								})
								return
							} else {
								addressDeName = _this.retus.aaddressName
							}
							
						} else {
							if(!_this.retus.warehouseId||_this.retus.warehouseId=='0') {
								this.$Message.error({
									content: '请完善仓库地址信息！',
									duration: 3
								})
								return
							} else {
								addressId = _this.retus.adressId
								addressDeName = _this.retus.NoaddressName
							}

						}
						if(!addressDeName) {
							this.$Message.error({
								content: '请输入详细地址信息！',
								duration: 3
							})
							return
						}
						
						let para = {}
						para.requestCfmUser = _this.retus.requestCfmUser //归还人
						para.returnDate = setdate //日期
						// para.returnDate='2017-8-7 11:2:31'
						para.warehouseId = _this.retus.warehouseId
						para.deliverFlag = _this.retus.deliverFlag //是否上门
						para.addressId = addressId //地址区id
						para.addressName = addressDeName //详细地址
						para.returnList = _this.returnDatas
						
						if(!para.returnList.length || para.returnList.length < 0) {
							this.$Message.error('请填写归还托盘信息!');
							_this.returnData = []
							_this.returnDatas = []
							//							_this.handleReset(name)
							return
						}
						
						this.$Modal.confirm({
							title: '请确认',
							content: '确定归还吗？',
							onOk: () => {
								_this.request(url_submit, para, function(data) {
									_this.$Message.success('提交成功')
									_this.modal1 = false
									_this.handleReset(name)
									_this.returnData = []
									_this.returnDatas = []
								})
							}
						})
					}
				})
			},
         cancelSubmit(name){
         	var _this = this
         	_this.returnData = []
			_this.returnDatas = []
			_this.retus.provinceId =''
			_this.retus.cityId =''
			_this.retus.warehouseId=''
         	_this.handleReset(name)
         }
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
		}
	}
	
	.addAlert {
		padding: 5px 10px 0;
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
				color: #008A00;
				padding: 5px 10px;
				border-radius: 3px;
				border: 1px solid #008A00;
			}
			.dosome:hover {
				color: #FFF;
				background: #008A00;
			}
			.delete {
				color: #ff0000;
				border: 1px solid #ff0000;
			}
			.delete:hover {
				color: #FFF;
				background: #FF0000;
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