<template>
	<div class="echarts">
		<myheader></myheader>
		<div class="main-content">
			<div class="orderDetail">
				<div class="title-theme">
					<span class="title-text">租借信息</span>
				</div>
				<hr/>
				<div class="iform">
					<i-form ref="retu" :model="retu" :rules="rules" :label-width="80" style="margin-left: 20px;">
						<div class="renInfo">
							<div class="itemlist">
								<Form-item label="产品类型" prop="prodtype" class="tylaskleft">
									<Select v-model="retu.prodtype" style="width:200px" @on-change="changeTpye">
										<Option v-for="item in prod_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
									</Select>
								</Form-item>
								<Form-item label="资产类型" prop="asset" class="tylaskleft">
									<Select v-model="retu.asset" style="width:200px" @on-change="getAset">
										<Option v-for="item in assetList" :value="item.assertId" :key="item.itemCode">{{ item.assertName }}</Option>
									</Select>
								</Form-item>
								<Form-item label="租托数量" prop="count" class="tylaskleft">
									<Input v-model="retu.count" @on-change="counts" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入正整数" style="width:200px"></Input>
								</Form-item>
							</div>
							<div class="itemlist">
								<Form-item label="收货人员" prop="receiverMan" class="tylaskleft">
									<Select v-model="retu.receiverMan" style="width:200px">
										<Option v-for="item in getManList" :value="item.userId" :key="item.itemCode">{{ item.userNameZh }}</Option>
									</Select>
								</Form-item>
								<Form-item label="预租日期" class="tylaskleft" prop="rentdate" >
									<Date-picker type="date" :editable="false" v-model="retu.rentdate" :options="options3" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
								</Form-item>
								<Form-item v-if="retu.prodtype =='2'||retu.prodtype =='5'" label="租借期限" class="tylaskleft">
									<Input v-model="retu.dateCount" :maxlength="4" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" disabled placeholder="此产品类型无需输入租赁期限" style="width: 200px"></Input>
								</Form-item>
								<Form-item v-if="retu.prodtype =='1'||retu.prodtype =='4'||retu.prodtype ==''" label="租借期限" class="tylaskleft">
									<Input v-model="retu.dateCount" :maxlength="4" :class="{highboder:actives}" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入正整数天数" style="width: 200px"></Input>
								</Form-item>
								<Form-item v-if="retu.prodtype =='3'" label="租借期限" style="margin-left:-9px" class="tylaskleft">
									<Select v-model="retu.dateCount" :disabled="cando" style="width:200px" :class="{highboder:actives}" placeholder="日期范围">
										<Option v-for="item in DateList" :value="item" :key="item">{{item}}</Option>
									</Select>
								</Form-item>
							</div>
							<div class="itemlist">
								<Form-item label="交接方式" prop="getways" class="tylaskleft">
									<Select v-model="retu.getways" :disabled="isdo" style="width:200px" placeholder="平台是否送托上门">
										<Option v-for="item in sent_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
									</Select>
								</Form-item>
								<Form-item v-if="retu.getways=='Y' && retu.count>=50" prop="adressData" label="交货地址" class="tylaskleft">
									<Cascader v-model="retu.adressData" style="width: 200px;display: inline-block;" :data="cityData" trigger="hover"></Cascader>
								</Form-item>
								<Form-item v-if="retu.getways=='Y' && retu.count>=50" prop="aaddressNameY" label="详细地址" class="tylaskleft">
									<Input v-model="retu.aaddressNameY" placeholder="请输入详细街道地址" style="width: 200px"></Input>
								</Form-item>
							</div>
						</div>
						<div class="clear"></div>
					</i-form>
				</div>
				<div v-if="retu.getways=='N' || (retu.count<50 && retu.count)" v-show="retu.count" class="title-theme">
					<span class="title-text">选择仓库</span>
					<hr/>
				</div>
				<i-form :model="retu" :rules="rules" :label-width="80">
					<div v-if="retu.getways=='N' || (retu.count<50 && retu.count)" v-show="retu.count" class="sentadress">
						<Form-item label="仓库选择" class="tylaskleft">
							<Select v-model="retu.provinceId" style="width:120px" placeholder="省" @on-change="queryCity">
								<Option v-for="item in ProvList" :value="item.provinceId" :key="item.provinceId">{{ item.proviceName }}</Option>
							</Select>
							<Select v-model="retu.cityId" style="width:120px;margin-left: 3px;" placeholder="市" @on-change="queryWare">
								<Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
							</Select>
							<Select v-model="retu.warehouseId" style="width:220px;margin-left: 3px;" placeholder="仓库地址" @on-change="queryFullName">
								<Option v-for="item in wareList" :value="item.warehouseId" :key="item.warehouseId">{{item.areaName}}{{item.addressDetailName}}</Option>
							</Select>
						</Form-item>
					</div>
				</i-form>
				
				<div class="title-theme" v-if="retu.asset" style="border-bottom: 1px solid #eee;padding-bottom: 5px;">
					<span class="title-text">预计押金</span>
				</div>
				<div class="feedetail" v-if="retu.asset">
					<div class="fees">
						<div class="feetxt">
							<p><span>资产押金比例</span></p>
							<p><span>资产单价</span></p>
							<p><span>租托数量</span></p>
							<p><span>预计押金</span></p>
						</div>
						<div class="moneys">
							<div class="mons">
								<p><span>{{depositMargin*100}}%</span></p>
								<p><span>{{assertValue}}&nbsp;元</span></p>
								<p><span>{{retu.count}}&nbsp;片</span></p>
								<p><span v-if="(depositMargin*assertValue*retu.count)">{{(depositMargin*assertValue*retu.count).toFixed(2)}}&nbsp;元</span>
									<span v-else>0&nbsp;元</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<hr/>
				<div class="invoice">
					<div class="moneyinfo">
						<div class="allpay">
						</div>
						<div class="domoneys">
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
					<p>&nbsp;&nbsp;&nbsp;&nbsp;a) 当客户选择快易托且资产类型不为空时，租借期限为选择范围。</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;b) 当客户选择随心托或vip专享时，租赁期限无需填写。</p>
					<p>2.租托数量：</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;a) 当租托数量小于50片时，平台不提供送托上门服务，交接方式为默认的“客户自助处理”。</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;b) 当租托数量大于或等于50片时，可选择“平台上门服务”或“客户自助处理”</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;c) 当客户交接方式为“客户自助处理”时，客户须选择合适的平台仓库。</p>
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
	import {saveScrollPosition} from '../../filters/mixins.js'
	export default {
		components: {
			Myheader,
			Myfooder,
		},
		mixins:[saveScrollPosition],
		data() {
			return {
				modal10: false,
				modal1: false,
				cando: true,
				isdo:false,
				actives:false,
				prod_type: '',
				assetList: '',
				getManList: '',
				sent_type: '',
				cityData: cityData,
				DateList: [],
				ProvList: [],
				cityList: [],
				wareList: [],
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 86400000;
					}
				},
				assertValue:'',
				depositMargin:'',//押金比例
				retu: {
					count: '', //数量
					dates: '',
					getways: '',
					receiverMan: '',
					rentdate: '',
					prodtype: '',
					asset: '',
					dateCount: '',
					aaddressNameY: '',
					provinceId: '', //省
					cityId: '',
					adressId: '',
					warehouseId: '',
					adressData: [],
				},
				rules: {
					prodtype: [{
						required: true,
						message: '请选择租借类型',
						trigger: 'change'
					}],
					count: [{
						required: true,
						message: '请填写正整数数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}],
					adressData:[{
						required: true,
						message: '请选择交接地址',
						trigger: 'change',
						type:'array'
					}],
					getways: [{
						required: true,
						message: '请选择交接方式',
						trigger: 'change'
					}],
					dateCount:[{
						required: true,
						message: '请输入租赁期限',
						trigger: 'change',
						pattern: /^[1-9]\d*$/,
					}],
					asset: [{
						required: true,
						message: '请选择资产类型',
						trigger: 'change'
					}],
					rentdate: [{
						required: true,
						type:'date',
						message: '请选择租赁时间',
						trigger: 'blur'
					}],
					receiverMan: [{
						required: true,
						message: '请选择收货人',
						trigger: 'blur'
					}],
					aaddressNameY:[{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			var _this = this
			var firstData = this.$store.getters.getRentAtm
			if(firstData.amount) {
				this.retu.count = firstData.amount
				this.retu.rentdate = firstData.retuDate
				this.retu.prodtype = firstData.prodtype
			} else {}
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
				console.log("收货人", response.data)
			}).catch(function(error) {
				console.log('2', error)
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
			changeTpye(val) {
				var _this = this
				_this.retu.asset = '',
					_this.retu.dateCount = '',
					_this.$http.post('/lease/leaseBase/queryLeaseAbleProductAssertList.do', { //资产类型
						productCatlogId: val
					}).then(function(response) {
						_this.assetList = response.data
						console.log(response.data)
					}).catch(function(error) {
						console.log('2', error)
					})
			},
			getAset(ast) {
				var _this = this
				if(_this.retu.asset) {
					_this.cando = false
				} else {
					_this.cando = true
				}
				let kyt = "/lease/leaseBase/queryProductOfKytLeaseDateList.do"
				let money="/lease/leaseBase/leaseBaseSettingInfo.do"
				if(ast){
					_this.request(money, {
						assertId: ast
					}, function(data) {
						_this.assertValue = data.assertValue
						_this.depositMargin=data.depositMargin
					})
				}
				if(_this.retu.prodtype == 3 && ast !== '') {
					_this.request(kyt, {
						productCatlogId: _this.retu.prodtype,
						assertId: ast
					}, function(data) {
						_this.DateList = data
						console.log('期限', _this.DateList)
					})
				} else {

				}
				
			},
			counts(){
				var _this = this
				if(_this.retu.count&&_this.retu.count>=50){
					_this.isdo=false
//					_this.retu.getways=''
				}else{
					_this.isdo=true
					_this.retu.getways='N'
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
			queryCity(ct) { //查市
				var _this = this
				_this.retu.cityId = ''
				_this.retu.adressId = ''
				_this.retu.warehouseId = ''
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
						_this.retu.adressId = _this.wareList[i].adressId
						_this.retu.addressNameN = _this.wareList[i].addressDetailName
					} else {}
				}
			},
			handleSubmit(name) {
				var _this = this
				var adressId = ''
				var addressName =''
				if(_this.retu.getways == 'N') {
					adressId = _this.retu.adressId
					addressName=_this.retu.addressNameN
				} else {
					adressId = _this.retu.adressData[_this.retu.adressData.length-1]
					for(var i=0;i<_this.retu.adressData.length;i++){
							if(_this.retu.adressData[i] == '' || _this.retu.adressData[i] == '0') {
							this.$Message.error({
									content: '请完善地址信息！',
									duration: 3
							})
							return
							}
						}
					addressName =_this.retu.aaddressNameY
				}
				if(!_this.retu.warehouseId && _this.retu.getways=='N'){
					_this.$Message.error({
							content: '请完善地址信息！',
							duration: 3
						})
					return
				}
				if(_this.retu.prodtype != '2' && _this.retu.prodtype != '5') {
					if(!_this.retu.dateCount || (+_this.retu.dateCount) < 1) {
						_this.actives=true
						this.$Message.error({
							content: '请输入租赁期限！',
							duration: 3
						})
						return
					}else{
						_this.actives=false
					}
				}
				var times = new Date()
				var bztimes = new Date(+_this.retu.rentdate);
				var hour_min_s = times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds()
				var setdate = bztimes.Format("yyyy-MM-dd") + ' ' + hour_min_s
				this.$refs[name].validate((valid) => {
					if(valid) {
					this.$Modal.confirm({
					title: '请确认',
					content: '确定提交吗？',
					onOk: () => {
				_this.$http.post('/lease/task/addLease.do', { //查询账户信息
							productCatlogId: _this.retu.prodtype, //产品类型id
							assertId: _this.retu.asset, //资产id
							leaseNum: _this.retu.count, //租借数量
							agreedPeriodNum: _this.retu.dateCount, //租借期限
							preLeaseDate: setdate, //下单日期
							requestCfmUserId: _this.retu.receiverMan, //收货人Id
							deliverFlag: _this.retu.getways, //是否配送上门
							addressId: adressId, //区Id
							aaddressName: addressName, //地址名称
							warehouseId: _this.retu.warehouseId
						}).then(function(response) {
							if(response == undefined) {
								_this.$Message.error('提交失败!')
							} else {
								_this.$Message.success('下单成功!')
								_this.$router.push('/myaccount/queryRecord');
							}
						}).catch(function(error) {
							console.log('2', error)
						})
					}
				})
					} else {
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
	.highboder{
		border:1px solid #FF0000;
		border-radius:5px ;
	}
	.pallets {
		display: flex;
		text-align: center;
		margin: 15px auto;
		background: #fff;
		padding: 20px 60px;
		.pall_img {
			flex: 1;
			text-align: left;
			cursor: pointer;
			img {
				width: 175px;
			}
		}
		.pall_img:hover {
			text-align: center;
		}
		.pall_info {
			flex: 1;
			text-align: center;
			.info_txt {
				padding-top: 20px;
				font-size: 14px;
				text-align: left;
				width: 80%;
				p {
					margin-top: 3px;
				}
			}
		}
		
		.pall_btn {
			flex: 1;
			text-align: right;
			font-size: 14px;
			padding-top: 40px;
			.moreinfo {
				display: inline-block;
				height: 40px;
				width: 120px;
				line-height: 40px;
				text-align: center;
				color: #fff;
				background: #d2d2d2;
				border-radius: 3px;
				margin-right: 30px;
				cursor: pointer;
			}
			.moreinfo:hover {
				color: #FFF;
				background: #FF9600;
				border: none;
			}
			.morepall {
				display: inline-block;
				height: 40px;
				width: 120px;
				text-align: center;
				background: #FF6D00;
				color: #fff;
				line-height: 40px;
				border-radius: 3px;
				cursor: pointer;
			}
			.morepall:hover {
				background: #FF9600;
			}
		}
	}
	
	.title-text {
		color: #2D99FA;
		font-size: 15px;
	}
	
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
	}
	
	.palletDetail {
		ul {
			overflow: hidden;
		}
		li {
			float: left;
			width: 50%;
			text-align: left;
			height: 30px;
			line-height: 30px;
			color: #939A9F;
			.keys {
				font-size: 13px;
				color: #454C5B;
			}
		}
		li:nth-child(even) {
			padding-left: 30px;
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
	
	.rentBtn {
		text-align: center;
		margin-bottom: 30px;
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
				color:#666 ;
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
			.submit {
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