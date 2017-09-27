<template>
	<div class="mains">
		<div class="neirong">
			<Tabs type="card">
				<Tab-pane label="合约列表">
					<div class="incomeul">
						<ul class="firstul">
							<li>序号</li>
							<li>合约编号</li>
							<li>起租日期</li>
							<li>产品类型</li>
							<li>资产名称</li>
							<li>租借数量</li>
							<li>资产价格(元)</li>
							<li>日租金(元)</li>
							<li>日服务费(元)</li>
							<li title="归还数量(已清算)">归还数量(已清算)</li>
							<li>更新日期</li>
							<li>结束日期</li>
						</ul>
						<ul v-for="(item,index) in contShowData">
							<li>{{(currentPage-1)*10+(index+1)}}</li>
							<li>{{item.contractId}}</li>
							<li>{{item.openTime.substring(0,10)}}</li>
							<li>{{item.productCatlogId,"cplx" | filter}}</li>
							<li :title="item.assertName">{{item.assertName}}</li>
							<li>{{item.openNum}}</li>
							<li>{{item.assertPrice}}</li>
							<li>{{item.leaseDayPrice}}</li>
							<li>{{item.serviceDayPrice}}</li>
							<li>{{item.returnedNum}}</li>
							<li>{{item.updateTime.substring(0,10)}}</li>
							<li v-if="item.closeTime">{{item.closeTime.substring(0,10)}}</li>
							<li v-else></li>
						</ul>
					</div>
				<Page :total="contractData.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeRent"></Page>
				</Tab-pane>
			</Tabs>
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
				contractData: '',
				showNum: 10, // number of item per page
				currentPage: 1,
				contShowData:[],
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
			readly(){
				var _this = this
				var url_qltk='/lease/base/queryLeaseContractList.do'//出库
				var param_qltk={contractId: 22}
				_this.request(url_qltk, param_qltk, function(data) {
					_this.contractData = data
					_this.contShowData= _this.contractData.slice(0, _this.showNum)
					console.log(_this.contractData)
				})
			},
			showPage(page){//分页封装
				this.currentPage = page
			    let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				return {startPage,endPage}
			},
			pageChangeRent(page){//租借分页
				this.showPage(page)
				this.contShowData = this.contractData.slice(this.showPage(page).startPage, this.showPage(page).endPage)
			},
		}
	}
</script>
<style lang="scss" scoped>
	.neirong {
		width: 100%;
		padding: 15px 30px;
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
			background: #FFA800 !important;
			li {
				height: 40px;
				line-height: 40px;
			}
		}
	}
	.pagestyle {
		text-align: center;
		margin: 20px 0;
	}
	.detaildiv{
		display: flex;
		border-bottom: 1px solid #F8F8F2;
		height: 40px;
		line-height: 40px;
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