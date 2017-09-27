<template>
	<div class="mains">
		<div class="neirong">
			<Tabs type="card" @on-click="changeTab">
				<Tab-pane label="出库任务列表">
					<div class="incomeul">
						<ul class="firstul">
							<li>任务创建时间</li>
							<li>收货单位</li>
							<li>资产名称</li>
							<li>资产数量</li>
							<li>预租借日期</li>
							<li>交接地址</li>
							<li>出库状态</li>
							<li>操作</li>
						</ul>
						<ul v-for="(item,index) in outStroedata" @click="lookdetail(index)">
							<li :title="item.createTime">{{item.createTime}}</li>
							<li :title="item.participantName">{{item.participantName}}</li>
							<li :title="item.assertName">{{item.assertName}}</li>
							<li>{{item.leaseNum}}</li>
							<li :title="item.preLeaseDate">{{item.preLeaseDate.substring(0,10)}}</li>
							<li :title="item.aaddressName">{{item.addressNamePcd}}{{item.aaddressName}}</li>
							<li v-if="item.taskDefCode=='1403'"><span style="color: #FF0000;">{{item.taskDefName}}</span></li>
							<li v-if="item.taskDefCode=='1404'"><span style="color: #0066CC;">{{item.taskDefName}}</span></li>
							<li><span @click.stop="instance('warning',index)" class="queryBtn">确认</span></li>
						</ul>
					</div>
				</Tab-pane>
				<Tab-pane label="出库流水记录">
					<div class="incomeul">
						<ul class="firstul">
							<li>出库流水号</li>
							<li>资产名称</li>
							<li>资产数量</li>
							<li>出库开始时间</li>
							<li>交接方式</li>
							<li>交接地址</li>
							<li>出库完成时间</li>
							<li>出库状态</li>
						</ul>
						<ul v-for="(item,index) in outLogData">
							<li>{{item.leaveId}}</li>
							<li :title="item.assertName">{{item.assertName}}</li>
							<li>{{item.assertNum}}</li>
							<li>{{item.createTime}}</li>
						    <li>{{item.deliverFlag,"jjfs" | filter}}</li>
							<li>{{item.addressName}}</li>
							<li>{{item.leaveTime}}</li>
							<li>{{item.leaveStatus,'ckjl'|filter}}</li>
						</ul>
					</div>
				<Page :total="outStroeLogdata.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChange"></Page>
					
				</Tab-pane>
			</Tabs>
			<Modal title="出库详情" width="700" v-model="modal10" cancel-text="" ok-text="关闭" class-name="vertical-center-modal">
				<div class="detaildiv">
					<div class="flex1">
						出库流水号：<span class="colos" style="color: #008A00;">{{detaildata.leaveId}}</span>
					</div>
					<div class="flex1">
						目标单位： <span class="colos">{{detaildata.participantName}}</span>
					</div>
					<div class="flex1">
						预租借日期： <span class="colos" v-if="detaildata.preLeaseDate">{{detaildata.preLeaseDate.substring(0,10)}}</span>
						           <span v-else></span>
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						联系人名称：<span class="colos">{{detaildata.requestCfmUserName}}</span>
					</div>
					<div class="flex1">
						联系人电话：<span class="colos">{{detaildata.mobil}}</span>
					</div>
					<div class="flex1">
						资产类型： <span class="colos">{{detaildata.assertName}}</span>
					</div>
				
				</div>
				<div class="detaildiv">
					<div class="flex1">
						资产数量： <span class="colos">{{detaildata.leaseNum}}</span>
					</div>
					<div class="flex1">
						资产单价： <span class="colos">{{detaildata.assertPrice}}</span>
					</div>
					<div class="flex1">
						交接方式： 
						<span class="colos">{{detaildata.deliverFlag,"jjfs" | filter}}</span>
					</div>
				</div>
				<div class="detaildiv">
					<div class="flex1">
						交接地址：<span class="colos">{{detaildata.addressNamePcd}}</span>
					</div>
					<div class="flex1">
						详细地址： <span class="colos">{{detaildata.aaddressName}}</span>
					</div>
					<div class="flex1">
						留言： <span class="colos">{{detaildata.taskDesc}}</span>
					</div>
				</div>
			</Modal>
			
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
				outStroeLogdata: '',
				modal10:false,
				detaildata:'',
				showNum: 8, // number of item per page
				currentPage: 1,
				outLogData:[],
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
					this.$Message.error('提交异常')
					console.log('3', error)
				})
			},
			readly(){
				var _this = this
				var url_qltk='/warehouseLeave/task/queryLeaveTaskList.do'//出库
				var param_qltk={leaveId: 22}
				this.request(url_qltk, param_qltk, function(data) {
					_this.outStroedata = data
				})
			},
			showPage(page){//分页封装
				this.currentPage = page
			    let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				return {startPage,endPage}
			},
			pageChange(page){//租借分页
				this.showPage(page)
				this.outLogData = this.outStroeLogdata.slice(this.showPage(page).startPage, this.showPage(page).endPage)
				console.log("xxxx",this.outLogData)
			},
			changeTab(val) {
				if(val == 1) {
					var _this = this
					var post = '/warehouseLeave/base/queryLeaveLogList.do'
					var param = {leaveId: '22'}
					this.request(post, param, function(data) {
						_this.outStroeLogdata = data
						_this.outLogData= _this.outStroeLogdata.slice(0, _this.showNum)
						console.log("流水记录",_this.outLogData)
					})
				}
			},
			instance(type, index) {
				var _this =this
				let taskCode = this.outStroedata[index].taskDefCode
				let taskName = this.outStroedata[index].taskDefName
				let param = {requestId: this.outStroedata[index].requestId}
				let postlc = '/warehouseLeave/task/lease/finishLeaveConfirm.do'//开始出去收货库
				let postld = '/warehouseLeave/task/lease/finishLeaveDeliver.do'//
				this.$Modal.confirm({
					title: '确认',
					content: '确认执行' + taskName + '操作吗？',
					onOk: () => {
						if(taskCode == '1403') {
							this.request(postlc, param, function(data) {
								_this.outStroedata = data
								_this.$Message.success('确认成功!');
								_this.readly()
							})
						} else if(taskCode == '1404') {
							this.request(postld, param, function(data) {
								_this.outStroedata = data
								_this.$Message.success('确认成功!');
								_this.readly()
							})
						}
					}
				})
			},
			lookdetail(index){
				var _this =this
				_this.modal10=true
				_this.detaildata=_this.outStroedata[index]
				console.log(_this.detaildata)
			},
		}
	}
</script>
<style lang="scss" scoped>
	.neirong {
		width: 100%;
		padding: 20px 20px 0;
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
	.pagestyle {
		text-align: center;
		margin: 20px 0;
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