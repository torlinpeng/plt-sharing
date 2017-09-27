<template>
	<div class="income">
		<Tabs type="card" @on-click="change">
			<Tab-pane label="资产账单列表">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>资产编号</li>
						<li>账单日期</li>
						<li>持有数量</li>
						<li>租金</li>
						<li>租金分派日</li>
						<li>账单状态</li>
					</ul>
					<ul v-for="(item,index) in accoutData">
						<li>{{index+1}}</li>
						<li>{{item.pkgId}}</li>
						<li v-if="item.billDate">{{item.billDate.substring(0,10)}}</li>
						<li v-else></li>
						<li>{{item.billDate}}</li>
						<li>{{item.holdNum}}</li>
						<li>{{item.profit}}</li>
						<li>{{item.profitDate}}</li>
						<li>{{item.billStatus}}</li>
					</ul>
				</div>
			</Tab-pane>
			<Tab-pane label="租赁账单列表">
				<div class="incomeul">
					<ul class="firstul">
						<li>序号</li>
						<li>账单编号</li>
						<li>账单日期</li>
						<li>还款日期</li>
						<li>滞纳金率</li>
						<li>账单状态</li>
						<li>操作</li>
					</ul>
					<ul v-for="(item,index) in rentListData">
						<li>{{index+1}}</li>
						<li>{{item.billId}}</li>
						<li v-if="item.billDate">{{item.billDate.substring(0,10)}}</li>
						<li v-else></li>
						<li v-if="item.repaymentDate">{{item.repaymentDate.substring(0,10)}}</li>
						<li v-else></li>
						<li>{{item.lateFeeRate}}</li>
						<li>{{item.status,"zdzt" | filter}}</li>
						<li><span style="color: #0080FF;" @click="lookDetail(index)">查看详细</span></li>
					</ul>
				</div>
			</Tab-pane>
			<Modal title="租赁账单详细" width="900" v-model="modal10" ok-text="关闭" cancel-text="" class-name="vertical-center-modal">
				<div class="detaildiv">
					<div class="flex1">
						账单编号：{{currentData.billId}}
					</div>
					<div class="flex1">
						单位编码：<span>{{currentData.participantId}}</span>
					</div>
					<div class="flex1">
						账单日期： <span v-if="currentData.billDate">{{currentData.billDate.substring(0,10)}}</span>
						<span v-else></span>
					</div>
					<div class="flex1">
						还款日期：<span v-if="currentData.repaymentDate">{{currentData.repaymentDate.substring(0,10)}}</span>
						<span v-else></span>
					</div>
					<div class="flex1">
						账单状态：<span>{{currentData.status,"zdzt" | filter}}</span>
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						本期应还租金：{{currentData.accruedRentalFee}}
					</div>
					<div class="flex1">
						本期应还平台服务费：{{currentData.accruedServiceFee}}
					</div>
					<div class="flex1">
						本期应还赔偿金：{{currentData.accruedDamagesFee}}
					</div>
					<div class="flex1">
						本期应付清洗费：{{currentData.accruedCleanFee}}
					</div>
					<div class="flex1">
						本期应付转户费：{{currentData.accruedTransferFee}}
					</div>
				</div>
				
				<div class="detaildiv">
					<div class="flex1">
						前期未还租金：{{currentData.preUnyetRentalFee}}
					</div>
					<div class="flex1">
						前期未还平台服务费：{{currentData.preUnyetServiceFee}}
					</div>
					<div class="flex1">
						前期未还赔偿金：{{currentData.preUnyetDamagesFee}}
					</div>
					<div class="flex1">
						前期应付清洗费：{{currentData.preCleanFee}}
					</div>
					<div class="flex1">
						前期应付转户费：{{currentData.preTransferFee}}
					</div>
					
					
				</div>
				<div class="detaildiv">
					<div class="flex1">
						已还租金：{{currentData.yetRentalFee}}
					</div>
					<div class="flex1">
						已还平台服务费：{{currentData.yetServiceFee}}
					</div>
					<div class="flex1">
						已还赔偿金：{{currentData.yetDamagesFee}}
					</div>
					<div class="flex1">
						已还清洗费：{{currentData.yetCleanFee}}
					</div>
					<div class="flex1">
						已还转户费：{{currentData.yetTransferFee}}
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						滞纳金率：{{currentData.lateFeeRate}}
					</div>
					<div class="flex1">
						应还滞纳金： {{currentData.accruedLateFee}}
					</div>
					<div class="flex1">
						已还滞纳金：{{currentData.yetLateFee}}
					</div>
					<div class="flex1">
						调整费用  ：{{currentData.resetFee}}
					</div>
					<div class="flex1">
						调整说明 ：{{currentData.resetRemark}}
					</div>
				</div>
			</Modal>
		</Tabs>
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
				accoutData: '',
				rentListData: '',
				modal10:false,
				currentData:''
			}
		},
		mounted() {
			var _this = this
			let urlint = "/participantBill/queryHoldBillList.do"
			let params = {
				pkgId: '123'
			}
			this.request(urlint, params, function(data) {
				_this.accoutData = data
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
			change(val) {
				var _this = this
				let urlzj = "/participantBill/quryLeaseBillList.do"
				let param = {
					participantId: '123'
				}
				switch(val) {
					case 1:
						this.request(urlzj, param, function(data) {
							_this.rentListData = data
							console.log(_this.rentListData)
						})
				}
			},
		lookDetail(index){
			this.modal10 = true
			this.currentData=this.rentListData[index]
		}
		}
	}
</script>
<style lang="scss" scoped>
	.ivu-tabs-bar {
		margin-bottom: 0px;
	}
	.income {
		padding: 20px;
	}
	
	.incomeul {
		width: 100%;
		ul {
			display: flex;
			width: 100%;
			li {
				flex: 1;
				text-align: center;
				height: 45px;
				line-height: 45px;
				cursor: pointer;
			}
		}
		ul:nth-child(odd) {
			background: #FAFAFA;
		}
		ul:hover {
			background: #EBF7FF;
			/*color: #fff;*/
		}
		.firstul {
			border: none;
			color: #fff;
			background: #FFA800 !important;
		}
	}
	.detaildiv{
		display: flex;
		border-bottom: 1px solid #F8F8F2;
		height: 40px;
		line-height: 40px;
		text-align: left;
		.flex1{
			flex: 1;
		}
	}
	.detaildiv:last-child{
		border-bottom: none;
	}
	.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>