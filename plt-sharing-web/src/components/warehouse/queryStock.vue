<template>
	<div class="mains">
		<div class="neirong">
			<Tabs type="card">
				<Tab-pane label="库存列表">
					<div class="incomeul">
						<ul class="firstul">
							<li>序号</li>
							<li>资产编号</li>
							<li>资产名称</li>
							<li>资产类型</li>
							<li>资产可用数量</li>
							<li>资产冻结数量</li>
						</ul>
						<ul v-for="(item,index) in outStroedata">
							<li>{{index+1}}</li>
							<li>{{item.assertId}}</li>
							<li>{{item.assertName}}</li>
							<li>{{item.type,"pzlx" | filter}}</li>
							<li>{{item.num}}</li>
							<li>{{item.frozenNum}}</li>
						</ul>
					</div>
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
				outStroedata: '',
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
				var url_qltk='/warehousePut/base/queryStockInfoList.do'//出库
				var param_qltk={warehouseId: 22}
				_this.request(url_qltk, param_qltk, function(data) {
					_this.outStroedata = data
					console.log(_this.outStroedata)
				})
			},
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