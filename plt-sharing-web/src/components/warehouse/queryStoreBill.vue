<template>
	<div class="mains">
		<div class="neirong">
			<Tabs type="card">
				<Tab-pane label="账单列表">
					<div class="incomeul">
						<ul class="firstul">
							<li>序号</li>
							<li>账单编号</li>
							<li>账单日期</li>
							<li>收入(元)</li>
							<li>支付日</li>
							<li>账单状态</li>
						</ul>
						<ul v-for="(item,index) in billListData" @click="queryMore(index)">
							<li>{{index+1}}</li>
							<li>{{item.billId}}</li>
							<li v-if="item.billDate">{{item.billDate.substring(0,10)}}</li>
							<li v-else></li>
							<li>{{item.income}}</li>
							<li v-if="item.paymentDate">{{item.paymentDate.substring(0,10)}}</li>
							<li v-else></li>
							<li>{{item.status,"zdzt" | filter}}</li>
						</ul>
					</div>
				</Tab-pane>
			</Tabs>
		</div>
		<Modal v-model="modal" title="账单详情" cancel-text="" @on-ok="asyncOK" :width='850'>
			<div class="incomeul">
				<ul class="firstul">
					<li>资产编号</li>
					<li>资产名称</li>
					<li>正常数量</li>
					<li>损坏数量</li>
					<li>收入</li>
					<li>统计日期</li>
				</ul>
				<ul v-for="item in detailBill">
					<li>{{item.assertId}}</li>
					<li :title="item.assertName">{{item.assertName}}</li>
					<li>{{item.normalStockNum}}</li>
					<li>{{item.damageStockNum}}</li>
					<li>{{item.income}}</li>
					<li v-if="item.statisticsDate">{{item.statisticsDate.substring(0,10)}}</li>
					<li v-else></li>
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
				billListData: '',
				detailBill: '',
				modal:false
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
					console.log('3', error)
				})
			},
			readly() {
				var _this = this
				var url_qltk = '/warehousePut/base/queryWhareHouseBillList.do' //账单列表
				var param_qltk = {
					warehouseId: 22
				}
				_this.request(url_qltk, param_qltk, function(data) {
					_this.billListData = data
					console.log('账单列表', _this.billListData)
				})
			},
			queryMore(index) {
				var _this = this
				let urls = '/warehousePut/base/queryBizWarehouseProfitList.do'
				_this.request(urls, _this.billListData[index], function(data) {
					_this.detailBill = data
					console.log('账单详细', _this.detailBill)
				})
				_this.modal=true
			},
			asyncOK(){
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.neirong {
		width: 100%;
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
		.firstul {
			border: none;
			color: #fff;
			background: #FFAD33 !important;
			li {
				height: 40px;
				line-height: 40px;
			}
		}
	}
	
	.detaildiv {
		display: flex;
		border-bottom: 1px solid #F8F8F2;
		height: 40px;
		line-height: 40px;
		.flex1 {
			flex: 1;
		}
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
	.listdetail ul{
		width: 100%;
		display: flex;
		li{
			list-style: none;
			flex: 1;
			text-align: center;
		}
		
	}
</style>