<template>
	<div class="echarts">
		<myheader></myheader>
		<div class="main-content">
			<div class="orderDetail">
				<div class="title-theme">
					<span class="title-text">订单信息</span>
				</div>
				<hr/>
				<div class="orderInfo">
					<div class="orders">
						<span>订单编号：</span><span style="color: #008A00;">{{retu.requestId}}</span></div>
					<div class="orders">
						<span>驳回原因：</span><span style="color: #FF0000;">{{retu.taskDesc}}</span>
					</div>
				</div>
				<div class="title-theme">
					<span class="title-text">租借信息</span>
				</div>
				<hr/>
				<div class="iform">
					<i-form ref="retu" :model="retu" :rules="rules" :label-width="80" style="margin-left: 20px;">
						<div class="renInfo">
							<div class="itemlist">
								<Form-item label="产品类型" prop="productCatlogId" class="tylaskleft">
									<Select v-model="retu.productCatlogId" style="width:200px" @on-change="changeTpye">
										<Option v-for="item in prod_type" @click.native="getType(retu.productCatlogId)" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
									</Select>
								</Form-item>
								<Form-item label="资产类型" prop="assertId" class="tylaskleft">
									<Select v-model="retu.assertId" style="width:200px" @on-change="getAset">
										<Option v-for="item in assetList" :value="item.assertId" :key="item.itemCode">{{ item.assertName }}</Option>
									</Select>
								</Form-item>
								<Form-item label="租托数量" prop="leaseNum" class="tylaskleft">
									<Input v-model="retu.leaseNum" @on-change="leaseNums" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入正整数" style="width:200px"></Input>
								</Form-item>
							</div>
							<div class="itemlist">
								<Form-item label="收货人员" class="tylaskleft">
									<Select v-model="retu.requestCfmUserId" style="width:200px">
										<Option v-for="item in getManList" :value="item.userId" :key="item.itemCode">{{ item.userNameZh }}</Option>
									</Select>
								</Form-item>
								<Form-item label="预租日期" class="tylaskleft" prop="preLeaseDate">
									<Date-picker type="date" :editable="false" v-model="retu.preLeaseDate" :options="options3" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
								</Form-item>
								<Form-item v-if="retu.productCatlogId =='2'||retu.productCatlogId =='5'" label="租借期限" class="tylaskleft">
									<Input v-model="retu.agreedPeriodNum" :maxlength="4" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" disabled placeholder="此产品类型无需输入租赁期限" style="width: 200px"></Input>
								</Form-item>
								<Form-item v-if="retu.productCatlogId =='1'||retu.productCatlogId =='4'||retu.productCatlogId ==''" label="租借期限" class="tylaskleft">
									<Input v-model="retu.agreedPeriodNum" :maxlength="4" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入正整数天数" style="width:200px" :class="{highboder:actives}"></Input>
								</Form-item>
								<Form-item v-if="retu.productCatlogId =='3'" label="租借期限" class="tylaskleft">
									<Select v-model="retu.agreedPeriodNum" style="width:200px" placeholder="日期范围" :class="{highboder:actives}">
										<Option v-for="item in DateList" :value="item" :key="item">{{item}}</Option>
									</Select>
								</Form-item>
							</div>
							<div class="itemlist">
								<Form-item label="交接方式" prop="deliverFlag" class="tylaskleft">
									<Select v-model="retu.deliverFlag" :disabled="isdo || retu.leaseNum<50" style="width:200px">
										<Option v-for="item in sent_type" :value="item.itemCode" @click.native="changeFlagOption" :key="item.itemCode">{{ item.itemText }}</Option>
									</Select>
								</Form-item>
								<Form-item v-if="retu.leaseNum >= 50 && retu.deliverFlag=='Y'" prop="adressData" label="交货地址" class="tylaskleft">
									<Cascader v-model="retu.adressData" style="width: 200px;display: inline-block;" :data="cityData" trigger="hover"></Cascader>
								</Form-item>
								<Form-item v-if="retu.deliverFlag=='Y' && retu.leaseNum>=50" prop="aaddressNameY" label="详细地址" class="tylaskleft">
									<Input v-model="retu.aaddressNameY" :maxlength="50" placeholder="请输入详细街道地址" style="width: 200px"></Input>
								</Form-item>
							</div>
						</div>
						<div class="clear"></div>
					</i-form>
				</div>
				<div v-if="retu.deliverFlag=='N'||  retu.leaseNum<50" v-show="retu.leaseNum" class="title-theme">
					<span class="title-text">选择仓库</span>
					<hr/>
				</div>
				<i-form :model="retu" :rules="rules" :label-width="80" v-show="retu.leaseNum">
					<div v-if="retu.deliverFlag=='N' || (retu.leaseNum<50 && retu.leaseNum)" class="sentadress">
						<Form-item label="仓库选择" class="tylaskleft">
							<Select v-model="retu.provinceId" style="width:120px" placeholder="省" @on-change="queryCity">
								<Option v-for="item in ProvList" @click.native="clearWare" :value="item.provinceId" :key="item.provinceId">{{ item.proviceName }}</Option>
							</Select>
							<Select v-model="retu.cityId" style="width:120px;margin-left: 3px;" placeholder="市" @on-change="queryWare">
								<Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
							</Select>
							<Select v-model="retu.warehouseId" style="width:220px;margin-left: 3px;" placeholder="仓库地址" @on-change="queryFullName">
								<Option v-for="item in wareList" :value="item.warehouseId" :key="item.warehouseId">{{item.areaName}}{{item.addressDetailName}}</Option>
							</Select>
							<span v-if="retu.provinceId=='0'||retu.cityId=='0'||retu.warehouseId=='0'||retu.warehouseId==''" style="color: #FF0000;">（请选择仓库地址！）</span>
						</Form-item>
					</div>
				</i-form>
				<div class="title-theme" v-if="retu.taskDefCode !='1405'&& retu.assertId" style="border-bottom: 1px solid #eee;padding-bottom: 5px;">
					<span class="title-text">预计押金</span>
				</div>
				<div class="feedetail" v-if="retu.taskDefCode !='1405'&& retu.assertId">
					<div class="fees">
						<div class="feetxt">
							<p><span>资产押金比例</span></p>
							<p><span>资产单价</span></p>
							<p><span>预租数量</span></p>
							<p><span>预付押金</span></p>
						</div>
						<div class="moneys">
							<div class="mons">
								<p><span>{{depositMargin*100}}%</span></p>
								<p><span>{{assertValue}}&nbsp;元</span></p>
								<p><span>{{retu.leaseNum}}&nbsp;片</span></p>
								<p><span v-if="(depositMargin*assertValue*retu.leaseNum)">{{(depositMargin*assertValue*retu.leaseNum).toFixed(2)}}&nbsp;元</span>
									<span v-else>0&nbsp;元</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<hr/>
				<div class="invoice">
					<div class="moneyinfo">
						<div class="domoneys">
							<span @click="$router.push({path: '/myaccount/queryTask'})" long class="nosubmit">取消订单</span>
							<span @click="handleSubmit('retu')" long class="submit">提交订单</span>
						</div>
					</div>
				</div>
			</div>
			<div class="rentrules">
				<div class="title-theme">
					<span class="title-text">租借规则</span>
				</div>
				<hr/>
				<div class="rules">
					<p>1.产品类型选择：</p>
					<p>1.产品类型选择：</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;a) 当客户选择快易托且资产类型不为空时，租借期限为选择范围。</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;b) 当客户选择随心托或vip专享时，租赁期限无需填写。</p>
					<p>2.租托数量：</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;a) 当租托数量小于50片时，平台不提供送托上门服务，交接方式为默认的“客户自助处理”。</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;b) 当租托数量大于或等于50片时，可选择“平台上门服务”或“客户自助处理”</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;c) 当客户交接方式为“客户自助处理”时，客户须选择合适的平台仓库。</p>
					<!--<p>3.租托下单：</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;a) 客户下单，则表示同意
						<router-link target='_blank' to="/rentAgree"><span style="color: #0066CC;cursor: pointer;">《普拉托托盘租赁共享平台租托协议》</span></router-link>。</p>-->
				</div>
			</div>
		</div>
		<myfooder></myfooder>
	</div>
</template>
<script>
	import Myheader from '../common/Myheader'
	import Myfooder from '../common/Myfooder'
	import cityData from '../common/addres.json'
	import { saveScrollPosition } from '../../filters/mixins.js'
	export default {
		components: {
			Myheader,
			Myfooder,
		},
		mixins: [saveScrollPosition],
		data() {
			return {
				modal10: false,
				modal1: false,
				isdo: false,
				prod_type: '',
				assetList: '',
				getManList: '',
				sent_type: '',
				cityData: cityData,
				DateList: [],
				ProvList: [],
				cityList: [],
				wareList: [],
				actives: false,
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 86400000;
					}
				},
				assertValue: '',
				depositMargin: '', //押金比例
				retu: {
					aaddressNameY:''
				},
				rules: {
					productCatlogId: [{
						required: true,
						message: '请选择租借类型',
						trigger: 'change'
					}],
					leaseNum: [{
						required: true,
						message: '请填写正整数数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}],
					adressData: [{
						required: true,
						message: '请选择交接地址',
						trigger: 'change',
						type: 'array'
					}],
					deliverFlag: [{
						required: true,
						message: '请选择交接方式',
						trigger: 'change'
					}],
					agreedPeriodNum: [{
						required: true,
						message: '请录入租赁期限',
						trigger: 'change',
						pattern: /^[1-9]\d*$/,
					}],
					assertId: [{
						required: true,
						message: '请选择资产类型',
						trigger: 'change'
					}],
					preLeaseDate: [{
						required: true,
						message: '请选择预租日期',
					}],
					receiverMan: [{
						required: true,
						message: '请选择收货人',
						trigger: 'blur'
					}],
					aaddressNameY: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			var _this = this
			var requestId = sessionStorage.reqid
			_this.init(requestId)
			var arrays = ['product_catlog_def', 'deliver_flag']
			_this.$http.post('/commDict/queryDictListByCodes.do',
				arrays).then(function(response) {
				_this.prod_type = response.data.product_catlog_def.options.splice(1)
				_this.sent_type = response.data.deliver_flag.options.splice(1)
			}).catch(function(error) {
				console.log('3', error)
			})
			_this.$http.post('/lease/leaseBase/queryLeaseHolderConfirmUserList.do', { //查询收货人
				orgId: '123'
			}).then(function(response) {
				_this.getManList = response.data
			}).catch(function(error) {
				console.log('2', error)
			})
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
			init(id) {
				var _this = this
				let urls = '/lease/leaseBase/queryLeaseInfo.do'
				let money = "/lease/leaseBase/leaseBaseSettingInfo.do"
				_this.request(urls, {
					requestId: id
				}, function(data) {
					_this.retu = data
					if(_this.retu.deliverFlag == 'Y'){
						_this.retu.aaddressNameY=_this.retu.aaddressName
						_this.retu.adressData = [_this.retu.provinceId, _this.retu.cityId, _this.retu.addressId]
					}
					_this.queryStore()
					if(_this.retu.deliverFlag == 'N') {
						_this.queryCity(_this.retu.provinceId)
						_this.queryWare(_this.retu.cityId)
					} else {
						return
					}
				})

			},
			changeTpye(val) {
				var _this = this
				_this.$http.post('/lease/leaseBase/queryLeaseAbleProductAssertList.do', { //资产类型
					productCatlogId: val
				}).then(function(response) {
					_this.assetList = response.data
				}).catch(function(error) {
					console.log('2', error)
				})
			},
			getType(its) {
				var _this = this
				_this.retu.agreedPeriodNum = ''
				_this.retu.assertId = ''
				_this.DateList = ''
			},
			getAset(ast) {
				var _this = this
				let kyt = "/lease/leaseBase/queryProductOfKytLeaseDateList.do"
				let money = "/lease/leaseBase/leaseBaseSettingInfo.do"
				if(ast) {
					_this.request(money, {
						assertId: ast
					}, function(data) {
						_this.assertValue = data.assertValue
						_this.depositMargin = data.depositMargin
					})
				}
				if(_this.retu.productCatlogId == '3' && ast != '') {
					_this.request(kyt, {
						productCatlogId: _this.retu.productCatlogId,
						assertId: ast
					}, function(data) {
						_this.DateList = data
					})
				} else {

				}
			},
			leaseNums() {
				var _this = this
				if(_this.retu.leaseNum && _this.retu.leaseNum >= 50) {
					_this.isdo = false
					//					_this.retu.deliverFlag = ''
				} else {
					_this.isdo = true
					_this.retu.deliverFlag = 'N'
				}
			},
			changeFlagOption() {
				var _this = this
				if(_this.retu.aaddressNameY && _this.retu.adressData){
				}else{
					 _this.retu.aaddressNameY =''
				    _this.retu.adressData = []
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
				})
			},
			queryCity(ct) { //查市
				var _this = this
				let city = '/appComm/warehouse/queryWareHouseViewCityList.do'
				_this.request(city, {
					provinceId: ct
				}, function(data) {
					_this.cityList = data
				})
			},
			clearWare() {
				this.retu.warehouseId = ''
			},
			queryWare(ware) { //查库
				var _this = this
				let wares = '/appComm/warehouse/queryWareHouseViewInfoList.do'
				if(!ware) {
					return
				} else {
					_this.request(wares, {
						cityId: ware
					}, function(data) {
						_this.wareList = data
						_this.queryFullName(_this.retu.warehouseId, _this.wareList)
					})
				}
			},
			queryFullName(val, datas) {
				var _this = this
				datas = _this.wareList
				if(datas) {
					for(var i = 0; i < datas.length; i++) {
						if(_this.retu.warehouseId == _this.wareList[i].warehouseId) {
							_this.retu.adressId = datas[i].adressId
							_this.retu.aaddressName = datas[i].addressDetailName
						}
					}
				} 
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
			handleSubmit(name) { //提交
				var _this = this
				var setdate = ''
				var addressId = ''
				var addressName = ''
				var dateLen = JSON.stringify(_this.retu.preLeaseDate).length
				var postcln = "/lease/task/confirmLeaseNum.do"
				var num = {
					leaseConfirmNum: _this.retu.confirmLeaseNum,
					requestId: _this.retu.requestId
				}
				var times = new Date()
				if(dateLen < 26) {
					var dateRan = _this.retu.preLeaseDate.substring(0, 10) > _this.getNowFormatDate()
					if(!dateRan) {
						this.$Message.error({
							content: '预租日期应大于当前日期+1！',
							duration: 3
						})
						return
					}
				}
				if(dateLen < 26) {
					setdate = _this.retu.preLeaseDate
				} else {
					var bztimes = new Date(+_this.retu.preLeaseDate);
					var hour_min_s = times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds()
					setdate = bztimes.Format("yyyy-MM-dd") + ' ' + hour_min_s
				}
				if(_this.retu.deliverFlag && _this.retu.deliverFlag == "N") {
					if(!_this.retu.warehouseId || _this.retu.warehouseId=='0') {
						this.$Message.error({
							content: '请完善地址信息！',
							duration: 3
						})
						return
					}else{
						addressId = _this.retu.adressId
					    addressName = _this.retu.aaddressName
					}
				} else {
						addressId = _this.retu.adressData[_this.retu.adressData.length - 1]
						for(var i=0;i<_this.retu.adressData.length;i++){
							if(_this.retu.adressData[i] == '' || _this.retu.adressData[i] == '0') {
							this.$Message.error({
									content: '请完善地址信息！',
									duration: 3
							})
							return
							}
						}
					    addressName = _this.retu.aaddressNameY //地区地址
				}
				if(_this.retu.productCatlogId != '2' && _this.retu.productCatlogId != '5') {
					if(!_this.retu.agreedPeriodNum || (+_this.retu.agreedPeriodNum) < 1) {
						_this.actives = true
						this.$Message.error({
							content: '请输入租赁期限！',
							duration: 3
						})
						return
					} else {
						_this.actives = false
					}
				}
				this.$refs[name].validate((valid) => {
					if(valid) {
						_this.$Modal.confirm({
							title: '请确认',
							content: '确定提交吗？',
							onOk: () => {
								_this.$http.post('/lease/task/updateLease.do', { //查询账户信息
									requestId: _this.retu.requestId,
									productCatlogId: _this.retu.productCatlogId, //产品类型id
									assertId: _this.retu.assertId, //资产id
									leaseNum: _this.retu.leaseNum, //租借数量
									agreedPeriodNum: _this.retu.agreedPeriodNum, //租借期限
									preLeaseDate: setdate, //下单日期
									requestCfmUserId: _this.retu.requestCfmUserId, //收货人Id
									deliverFlag: _this.retu.deliverFlag, //是否配送上门
									addressId: addressId, //区Id
									warehouseId: _this.retu.warehouseId,
									aaddressName: addressName, //地址名称
								}).then(function(response) {
									if(response) {
										_this.$Message.success({
											content: '提交成功！',
											duration: 3
										})
										_this.$router.push('/myaccount/queryRecord');
									} else {
										return
									}
								}).catch(function(error) {
									console.log('2', error)
								})
							}
						})
					}
				})

			},
		}
	}
</script>
<style lang="scss" scoped>
	.echarts {
		background: #F6FaFb;
	}
	
	.main-content {
		width: 1080px;
		margin: 20px auto;
	}
	
	.highboder {
		border: 1px solid #FF0000;
		border-radius: 5px;
	}
	
	.title-text {
		color: #2D99FA;
		font-size: 15px;
	}
	
	.orderInfo {
		display: flex;
		.orders {
			flex: 1;
			padding: 10px 40px;
		}
	}
	
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
	}
	
	.iform {
		margin: 0 auto;
		.renInfo {
			margin-top: 20px;
			.itemlist {
				width: 100%;
				display: flex;
				.tylaskleft {
					flex: 1;
				}
			}
		}
	}
	
	.sentadress {
		margin-top: 24px;
	}
	
	.title-theme {
		font-size: 14px;
		font-family: "微软雅黑";
		color: #5d5d5d;
		margin-top: 5px;
	}
	
	hr {
		height: 1px;
		border: none;
		border-top: 1px solid #eee;
		margin-top: 5px;
	}
	
	.orderDetail {
		width: 100%;
		background: #fff;
		padding: 20px 60px;
	}
	
	.ivu-input {
		width: 200px !important;
	}
	
	.clear {
		clear: both;
	}
	
	.feedetail {
		margin: 0 auto;
		.fees {
			display: flex;
			font-size: 12px;
			margin: 15px auto 0;
			p {
				margin-bottom: 4px;
			}
			.feetxt {
				padding-left: 24px;
				flex: 1;
				color: #666;
				.querymed {
					color: #C0C0C0;
					font-size: 12px;
					display: inline-block;
					margin-left: 40px;
					cursor: pointer;
				}
			}
			.moneys {
				flex: 1;
				padding-right: 34px;
				color: #FF3D00;
				font-weight: bold;
				text-align: right;
			}
		}
	}
	
	.invoice {
		margin: 30px auto 10px;
		.moneyinfo {
			display: flex;
			font-size: 14px;
			.allpay {
				flex: 1;
				padding-left: 21px;
				.allmoney {
					color: #FF4400;
					font-size: 22px;
					font-weight: 600;
				}
			}
		}
		.domoneys {
			flex: 1;
			text-align: right;
			font-size: 14px;
			.submit,
			.nosubmit {
				display: inline-block;
				width: 160px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: #2C99FF;
				color: #fff;
				border-radius: 3px;
				cursor: pointer;
				margin-right: 34px;
			}
			.submit:hover {
				background: #0080FF;
			}
			.nosubmit {
				background: #ccc;
				color: #fff;
			}
			.dopay {
				display: inline-block;
				width: 120px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: #FE6E00;
				color: #fff;
				border-radius: 3px;
				cursor: pointer;
			}
			.dopay:hover {
				background: #FF9600;
			}
		}
	}
	
	.rentrules {
		background: #fff;
		padding: 20px 60px;
		margin: 20px auto 30px;
		.rules {
			margin: 15px auto 0;
			padding-left: 21px;
		}
		p {
			margin-top: 5px;
		}
	}
</style>