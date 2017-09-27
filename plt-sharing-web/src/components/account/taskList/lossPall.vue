<!--报损-->
<template>
	<div class="main">
		<Modal v-model="modal1" title="托盘报失业务" width="350">
			<div class="iform">
				<i-form ref="retus" :model="retus" :rules="retu" :label-width="90">
					<div class="retudiv">
						<Form-item label="资产类型：" prop="assetType" class="rentleft">
							<Select v-model="retus.assetType" style="width:185px">
								<Option v-for="item in initData" :value="item.assertId" :key="item.assertName">{{item.assertName}}</Option>
							</Select>
						</Form-item>
						<Form-item label="报失数量：" prop="amount" class="rentleft">
							<Input v-model="retus.amount" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入报失数量" style="width: 185px"></Input>
						</Form-item>
					</div>
					<div class="clear"></div>
				</i-form>
			</div>
			<template slot="footer">
				<Button type="primary" @click="enSubmit('retus')">提交</Button>
			</template>
		</Modal>
		<div class="btnDiv">
			<Button style="width: 160px;margin-top: 25px;height: 36px;" @click="handleSubmit()" type="warning">托盘报失</Button>
		</div>
	</div>

</template>
<script>
	import cityData from '../../common/addres.json'
	export default {
		data() {
			return {
				cityData: cityData,
				getManList: '',
				modal1: false,
				retuList: '',
				initData: '',
				retus: {
					assetType: '',
					retUser: '',
					retuDate: '',
					amount: '',
				},
				retu: {
					assetType: [{
						required: true,
						message: '请选择产品类型',
						trigger: 'change'
					}],
					amount: [{
						required: true,
						message: '请输入报失数量',
						trigger: 'blur',
						pattern: /^[1-9]\d*$/,
					}]
				},
			}
		},
		mounted() {},
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
			handleSubmit() { //添加归还 最外层按钮
				var _this = this
				this.modal1 = true
				var paramcal = {
					categoryId: '123'
				}
				var postcal = "/lease/base/queryCanDoBizAssertList.do" //资产类型
				var url_dbc = '/commDict/queryDictListByCodes.do' //字典查询
				this.request(postcal, paramcal, function(data) { //资产类型
					_this.initData = data
				})
			},
			enSubmit(name) {
				var _this = this
				var url_submit = "/leaseReportLose/reportLoseNum.do"
				let para = {}
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Modal.confirm({
						title: '请确认',
						content: '确定报失吗？',
						onOk: () => {
							para.assertId = _this.retus.assetType
						para.reqNum = _this.retus.amount
						_this.request(url_submit, para, function(data) {
							_this.$Message.success('报失成功')
							_this.modal1 = false
							_this.handleReset(name)
						})
						}})
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