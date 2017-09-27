<template>
	<div class="echarts">
		<Tabs type="card" @on-click="changes" v-model="tabs">
			<Tab-pane label="租借任务">
				<div class="btnDiv">
					<Button style="width: 160px;margin-top: 10px;height: 36px;" @click="torent" type="warning">立即租托</Button>
				</div>
				<div class="incomeul">
					<ul class="firstul">
						<li>订单编号</li>
						<li>下单日期</li>
						<li>产品类型</li>
						<li>资产型号</li>
						<li>租借数量(片)</li>
						<li>收货人名称</li>
						<li>状态</li>
						<li>业务办理</li>
					</ul>
					<ul v-for="(item,index) in rent_data">
						<li>{{item.requestId}}</li>
						<li v-if="item.requestTime">{{item.requestTime.substring(0,10)}}</li>
						<li v-else></li>
						<li>{{item.productCatlogId,"cplx"|filter}}</li>
						<li :title="item.assertName">{{item.assertName}}</li>
						<li>{{item.leaseNum}}</li>
						<li>{{item.requestCfmUserName}}</li>
						<li>{{item.status,"ztjl"|filter}}</li>
						<li>
						<span v-if="item.taskDefCode=='1405'" class="doSomething" @click="doApplyRes(index)">确认数量</span>
						<span v-if="item.taskDefCode=='1401'" class="doSomething" @click="doApplyRes(index)">重新下单</span>
						</li>
					</ul>
				</div>
			</Tab-pane>
			<Tab-pane name="returns" label="托盘归还">
				<return-pall v-if="repall"></return-pall>
			</Tab-pane>
			<Tab-pane label="托盘报损">
				<damaged-pall v-if="bspall"></damaged-pall>
			</Tab-pane>
			<Tab-pane label="托盘报失">
				<loss-pall></loss-pall>
			</Tab-pane>
			<Tab-pane label="托盘转户">
				<transfer-pall v-if="tranpall"></transfer-pall>
			</Tab-pane>
		</Tabs>
		<Modal title="订单任务" v-model="modal_put_again" width="660" @on-cancel="cancelRe" class-name="vertical-center-modal">
			<div class="formdiv">
				<div class="iform">
					<div class="hedas">
						<span class="requestId">订单编号：<span>{{currentRentData.requestId}}</span></span>
						<span v-if="currentRentData.taskDefCode=='1401'" class="requestId">运营驳回原因：<span style="color: #FF0000;">{{currentRentData.taskDesc}}</span></span>
					</div>
					<i-form ref="currentRentData" :model="currentRentData" :rules="rules" :label-width="80">
						<div class="renInfo">
							<div class="rentleft">
								<Form-item label="产品类型" class="tylaskleft">
									<Select v-model="currentRentData.productCatlogId" :disabled="disabled" style="width:220px" @on-change="changeTpye">
										<Option v-for="item in prod_type" :value="item.itemCode" :key="item.itemText">{{ item.itemText }}</Option>
									</Select>
								</Form-item>
								<Form-item label="租托数量" class="tylaskleft">
									<Input v-model="currentRentData.leaseNum" :maxlength="5" @on-change="counts" :disabled="disabled" placeholder="请输入正整数" style="width: 220px"></Input>
								</Form-item>
								<Form-item label="交接方式" class="tylaskleft">
									<Select v-model="currentRentData.deliverFlag" :disabled="isdo|| disabled || currentRentData.leaseNum<50" style="width:220px">
										<Option v-for="item in sent_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
									</Select>
								</Form-item>
								<Form-item v-if="currentRentData.leaseNum >= 50 && currentRentData.deliverFlag=='Y'" label="交货地址">
									<Cascader v-model="adressData" :disabled="disabled" style="width: 220px;display: inline-block;" :data="cityData" trigger="hover"></Cascader>
								</Form-item>
							</div>
							<div class="rentright">
								<Form-item label="资产类型">
									<Select v-model="currentRentData.assertId" :disabled="disabled" value="currentRentData.assertName" style="width:220px" @on-change="getTime">
										<Option v-for="item in assetList" :value="item.assertId" :key="item.assertName">{{ item.assertName }}</Option>
									</Select>
								</Form-item>
								<Form-item label="预租日期">
									<Date-picker type="date" v-model="currentRentData.preLeaseDate" :disabled="disabled" :editable="false" :options="options3" placeholder="选择日期和时间" style="width: 220px"></Date-picker>
								</Form-item>
								<Form-item v-if="currentRentData.productCatlogId =='1'||currentRentData.productCatlogId =='4'||currentRentData.productCatlogId ==''" label="租借期限">
									<Input v-model="currentRentData.agreedPeriodNum" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" :disabled="disabled" placeholder="请输入正整数天数" style="width: 220px"></Input>
								</Form-item>
								<Form-item v-if="currentRentData.productCatlogId =='3'" label="租借期限">
									<Select v-model="currentRentData.agreedPeriodNum" style="width:220px" placeholder="日期范围" :disabled="disabled">
										<Option v-for="item in DateList" :value="item" :key="item">{{item}}</Option>
									</Select>
								</Form-item>
								<Form-item v-if="currentRentData.productCatlogId =='2'|| currentRentData.productCatlogId =='5'" label="租借期限">
									<Input disabled placeholder="此产品类型无需设置期限" style="width: 220px"></Input>
								</Form-item>
								<Form-item v-if="currentRentData.leaseNum >= 50 && currentRentData.deliverFlag=='Y'" label="详细地址">
									<Input v-model="currentRentData.aaddressName" :maxlength="50" :disabled="disabled" placeholder="请输入详细街道地址" style="width: 220px"></Input>
								</Form-item>
								<Form-item label="确认数量">
									<Input v-model="currentRentData.confirmLeaseNum" :class="{highboder:actives}" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入收货数量" style="width: 220px"></Input>
								</Form-item>
							</div>
						</div>
						<div v-if="currentRentData.leaseNum < 50|| currentRentData.deliverFlag=='N'">
							<Form-item label="仓库选择" class="tylaskleft">
								<Select v-model="currentRentData.provinceId" style="width:107px" :disabled="disabled" placeholder="省" @on-change="queryCity">
									<Option v-for="item in ProvList" :value="item.provinceId" :key="item.provinceId">{{ item.proviceName }}</Option>
								</Select>
								<Select v-model="currentRentData.cityId" :disabled="disabled" style="width:107px;margin-left: 3px;" placeholder="市" @on-change="queryWare">
									<Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
								</Select>
								<Select v-model="currentRentData.warehouseId" :disabled="disabled" style="width:220px;margin-left: 3px;" placeholder="仓库地址" @on-change="queryFullName">
									<Option v-for="item in wareList" :value="item.warehouseId" :key="item.warehouseId">{{item.areaName}}{{item.addressDetailName}}</Option>
								</Select>
							</Form-item>
							<Form-item label="主要地址" style="display: none;">
								<Select v-model="currentRentData.adressId" style="width:220px;margin-left: 3px;" placeholder="仓库地址" @on-change="queryFullName">
									<Option v-for="item in wareList" :value="item.warehouseId" :key="item.warehouseId">{{item.addressFullName}}</Option>
								</Select>
							</Form-item>
						</div>
						<div class="clear"></div>
					</i-form>
				</div>
			</div>
			<template slot="footer">
				<Button type="primary" @click="getReoutOk('currentRentData')">确定</Button>
			</template>
		</Modal>
		<div>

		</div>
	</div>
</template>
<script>
	import cityData from '../common/addres.json'
	import returnPall from './taskList/returnPall'
	import damagedPall from './taskList/damagedPall'
	import transferPall from './taskList/transferPall'
	import lossPall from './taskList/lossPall'
	import filter from '../../filters/filters'
	export default {
		filters: {
			filter,
		},
		data() {
			return {
				rent_data: '',
				modal_put_again: false,
				currentRentData: {
					agreedPeriodNum: '',
					provinceId: '',
					cityId: '',
					addressId: '',
					aaddressName: '', //配送上门
					addressNames: '', //仓库选择
					leaseNum: '',
					warehouseId: '',
					confirmLeaseNum: '',
				},
				actives:false,
				cityData: cityData,
				assetList: '',
				prod_type: '',
				adressData: [],
				DateList: [],
				ProvList: [],
				cityList: [],
				wareList: [],
				sent_type: '',
				isdo: false,
				czpall: false,
				bspall: false,
				repall: false,
				tranpall: false,
				disabled: false,
				tabs: '',
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 86400000;
					}
				},
				rules: {}
			}
		},
		components: {
			returnPall,
			damagedPall,
			transferPall,
			lossPall,
		},
		mounted() {
			var _this = this
			var postlbc = '/commDict/queryDictListByCodes.do' //类型查询
			var paramcul = {
				orgId: '123'
			}
			var arrays = ['product_catlog_def', 'deliver_flag']
			_this.readly()
			_this.request(postlbc, arrays, function(data) {
				_this.prod_type = data.product_catlog_def.options.splice(1)
				_this.sent_type = data.deliver_flag.options.splice(1)
			})
		},
		methods: {
			readly() {
				var _this = this
				let postLTk = '/lease/task/queryLeaseTaskList.do' //租借任务查询
				let paramLTk = {
					assertName: "111"
				}
				_this.request(postLTk, paramLTk, function(data) {
					_this.rent_data = data
				})
			},
			counts() {
				var _this = this
				if(_this.currentRentData.leaseNum && _this.currentRentData.leaseNum >= 50) {
					_this.isdo = false
					_this.currentRentData.deliverFlag = ''
				} else {
					_this.isdo = true
					_this.currentRentData.deliverFlag = 'N'
				}
			},
			torent() {
				this.$Modal.confirm({
					title: '请确认',
					content: '是否立即租托？',
					okText: '是的',
					onOk: () => {
						this.$router.push({
							path: '/rents'
						})
					}
				})
			},
			doApplyRes(index) {
				var _this = this
				var urls = '/lease/leaseBase/queryLeaseInfo.do'
				let reqid = _this.rent_data[index].requestId
				_this.currentRentData.confirmLeaseNum =='1'
				_this.request(urls, {
					requestId: reqid
				}, function(data) {
					_this.currentRentData = data
					if(_this.currentRentData.provinceId) {
						var taskCode = _this.currentRentData.taskDefCode
						if(taskCode == "1405") {
							_this.disabled = true
							_this.modal_put_again = true
							_this.queryStore()
							if(_this.currentRentData.deliverFlag=='N'){
								_this.queryCity(_this.currentRentData.provinceId)
							    _this.queryWare(_this.currentRentData.cityId)
							    _this.queryFullName(_this.currentRentData.addressId)
							}else{
								return
							}
							
						_this.adressData = [_this.currentRentData.provinceId, _this.currentRentData.cityId, _this.currentRentData.addressId]
						} else {
							_this.$router.push('/rentAgain')
							sessionStorage.reqid = reqid
						}
					} else {

					}
				});

			},
			request(post, param, callback) { //方法封装
				this.$http.post(post, param).then(function(response) {
					if(callback) {
						callback(response.data);
					}
				}).catch(function(error) {
					console.log('3', error)
				})
			},
			changeTpye(val) { //资产类型
				var _this = this
				var postapl = '/lease/leaseBase/queryLeaseAbleProductAssertList.do'
				let kyt = "/lease/leaseBase/queryProductOfKytLeaseDateList.do"
				var paramapl = {
					productCatlogId: val
				}
				_this.request(postapl, paramapl, function(data) {
					_this.assetList = data
				})
				setTimeout(function() {
					if(val == '3' && _this.currentRentData.assertId != '') {
						_this.request(kyt, {
							productCatlogId: val,
							assertId: _this.currentRentData.assertId
						}, function(data) {
							_this.DateList = data
						})
					} else {}
				}, 100)
			},
			getTime(keys) {
				var _this = this
				let kyt = "/lease/leaseBase/queryProductOfKytLeaseDateList.do"
				if(_this.currentRentData.productCatlogId == '3' && keys !== '') {
					_this.request(kyt, {
						productCatlogId: _this.currentRentData.productCatlogId,
						assertId: keys
					}, function(data) {
						_this.DateList = data
					})
				} 
			},
			changes(its) {
				switch(its) {
					case 'returns':
						this.repall = true
						break
					case 2:
						this.bspall = true
						break
					case 4:
						this.tranpall = true
						break
					case 5:
						this.czpall = true
						break
				}
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
			queryCity(cts) { //查市
				var _this = this
				let city = '/appComm/warehouse/queryWareHouseViewCityList.do'
				_this.request(city, {
					provinceId: cts
				}, function(data) {
					_this.cityList = data
					console.log('市', _this.cityList, cts)
				})
			},
			queryWare(ware) { //查库
				var _this = this
				let wares = '/appComm/warehouse/queryWareHouseViewInfoList.do'
				_this.currentRentData.addressNames = ''
				if(ware == '') {
					return
				} else {
					_this.request(wares, {
						cityId: ware
					}, function(data) {
						_this.wareList = data
						_this.queryFullName(_this.currentRentData.warehouseId)
						console.log('区', _this.wareList)
					})
				}
			},
			queryFullName(val) {
				var _this = this
				for(var i = 0; i < _this.wareList.length; i++) {
					if(_this.wareList[i].warehouseId == val) {
						_this.currentRentData.addressId = _this.wareList[i].adressId
						_this.currentRentData.addressNames = _this.wareList[i].addressDetailName
					} else {}
				}
			},
			cancelRe() {
				var _this = this
				_this.currentRentData.confirmLeaseNum == ''
			},
			getReoutOk(name) { //提交
				var _this = this
				var addressId = ''
				var postcln = "/lease/task/confirmLeaseNum.do"
				var num = {
					leaseConfirmNum: _this.currentRentData.confirmLeaseNum,
					requestId: _this.currentRentData.requestId
				}
				if(_this.currentRentData.taskDefCode == "1405") {　
					var re = /^[1-9]\d*$/
					if((+_this.currentRentData.confirmLeaseNum) > (+_this.currentRentData.leaseNum)) {
						this.$Message.error({
							content: '确认数量不能大于租托数量！',
							duration: 3
						})
						_this.actives=true
						return;
				   }else if(!re.test(_this.currentRentData.confirmLeaseNum)){
						this.$Message.error({
							content: '请输入正整数的确认数量！',
							duration: 3
						})
						_this.actives=true
						return
					} else if(!_this.currentRentData.confirmLeaseNum || (+_this.currentRentData.confirmLeaseNum) <= 0 ) {
						this.$Message.error({
							content: '请输入大于0 的确认数量！',
							duration: 3
						})
						_this.actives=true
						return
					}else{
						_this.actives=false
					}
					if(num != '') {
						_this.$Modal.confirm({
							title: '请确认',
							content: '确定提交吗？',
							onOk: () => {
								_this.request(postcln, num, function(data) {
									_this.$Message.success({
										content: '提交成功！',
										duration: 3
									})
									_this.modal_put_again = false
									_this.readly()
								})
							}
						})
					} else if(num == "") {
						return
					}
				}
			},
		}

	}
</script>
<style lang="scss" scoped>
	.echarts {
		padding: 20px;
	}
	
	.btnDiv {
		width: 100%;
		margin: 15px 0 35px 0;
		text-align: center;
	}
	.highboder{
		border: 1px solid #FF0000;
		border-radius: 5px;
	}
	.incomeul {
		width: 100%;
		ul {
			display: flex;
			width: 100%;
			li {
				float: left;
				width: 14.2%;
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
					background: #0080FF;
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
			height: 40px;
			font-size: 13px;
			color: #fff;
			background: #FFA800 !important;
			li {
				line-height: 42px;
			}
		}
	}
	
	.iform {
		margin: 0 auto;
		.hedas {
			width: 100%;
			display: flex;
		}
		.requestId {
			flex: 1;
			margin-left: 20px;
			span {
				color: #18B566;
			}
		}
		.renInfo {
			display: flex;
			margin-top: 20px;
			.rentleft {
				flex: 1;
			}
			.rentright {
				flex: 1;
				right: 0px;
				.tylask {
					float: right;
				}
				.tylaskleft {
					float: left;
				}
			}
		}
	}
	
	.deposit {
		width: 100%;
		border-top: 1px solid #C0C0C0;
		display: flex;
		padding: 10px 0 10px 20px;
		margin-top: 10px;
		.depos {
			flex: 1;
			.moneycol {
				color: #FF0000;
				font-weight: bold;
			}
		}
	}
</style>