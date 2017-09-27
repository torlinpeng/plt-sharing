<template>
	<div class="main">
		<Tabs type="card">
			<Tab-pane label="我的资产包">
				<div class="sharing">
					<ul>
						<li v-for="(item,index) in dataShowOut">
							<div class="sharelsft">
								<div class="leftcon">
									<div class="leftdown">
										<div class="leftone">
											<img :src="imgsrc+item.assertId+'.png'" />
											<p style="text-align: center;"><span style="font-size: 13px;color：#333;">{{item.assertName}}</span></p>
										</div>
										<div class="lefttwo">
											<p><span style="font-size: 13px;color：#333;">每日收益</span></p>
											<p><span style="color: #FF6D00;font-size: 32px;">{{item.fixedInputPrice}}</span>
												<span style="color: #bbb;font-size: 13px;">元&nbsp;/每片</span></p>
											<p><span style="font-size: 13px;color：#333;">年折旧率：{{item.depreYearRate*100}}%</span></p>
											<p><span style="font-size: 13px;color：#333;">还款方式：按月付租</span></p>
										</div>
										<div class="leftthree">
											<div class="threes">
												<div class="jhqx">
													<p><span style="font-size: 13px;color：#333;">计划期限</span></p>
													<p><span style="color:#00CC66; font-size: 32px;">{{item.depreYearLimit*12}}</span>
														<span style="color: #bbb;font-size: 13px;">/个月</span></p>
												</div>
												<div class="jhje">
													<p><span style="font-size: 13px;color：#333;">持有数量</span></p>
													<p><span style="color:#0080FF; font-size: 32px;">{{item.num}}</span>
														<span style="color: #bbb;font-size: 13px;">片</span>
													</p>
												</div>
											</div>
											<p style="margin-top: 0;"><span style="font-size: 13px;">资产原价格：{{item.price}}元</span></p>
											<p><span style="font-size: 13px;">收益保障计划+优先劣后分级</span></p>
										</div>
									</div>
								</div>
							</div>
							<div class="shareright">
								<p style="margin-top: 0px;">资产包名称 ：<span style="color: #FF6D00;">{{item.pkgName}}</span></p>
								<p>预计日收益 ：<span style="color: #FF6D00;">{{item.fixedInputPrice*item.num}}元</span></p>
								<p>认购日期：<span style="color: #FF6D00;">{{item.leaseBeginDate.substring(0,10)}}</span></p>
								<p>资产认购额 ：<span style="color: #FF6D00;">{{item.num}}片</span></p>
							</div>
						</li>
					</ul>
				</div>
					<Page :total="assertData.length" class="pagestyle" :current="currentPage" show-total :page-size="showNum" @on-change="pageChangeOut"></Page>
				
			</Tab-pane>
		</Tabs>
		<div class="nodata" v-if="assertData.length<1">
			<img src="../../assets/img/nodata.svg" />
			<p>对不起，您尚未持有资产，请联系运营哥哥，购买资产！</p>
		</div>
	</div>
</template>
<script>
	//	import VueMarkdown from 'vue-markdown'
	export default {
		data() {
			return {
				datalist: [],
				percent: '',
				assertData: '',
				imgsrc: './static/palletimg/tp',
				dataShowOut: [], // data for showing
				showNum: 3, // number of item per page
				currentPage: 1,
			}
		},
		mounted() {
			var _this = this
			let url_zcb = "/assertPkg/queryMyAssertPkgList.do"
			let paras = {
				pkgId: '123'
			}
			_this.request(url_zcb, paras, function(data) {
				_this.assertData = data
				_this.dataShowOut= _this.assertData.slice(0, _this.showNum)
				console.log(_this.assertData)
			})
		},
		components: {
			//			VueMarkdown
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
			pageChangeOut(page) {
				this.currentPage = page
				let startPage = (this.currentPage - 1) * this.showNum
				let endPage = startPage + this.showNum
				this.dataShowOut = this.assertData.slice(startPage, endPage)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.main {
		background: #fff;
		padding: 20px;
	}
	.nodata {
		text-align: center;
		background: #fff;
		padding-top: 50px;
		p {
			color: #80848F;
			font-size: 16px;
			margin: 20px 0 0;
		}
	}
	.pagestyle {
		text-align: center;
		margin: 20px 0;
	}
	.sharing {
		width: 1200px;
		margin: auto 0;
		background: #fff;
		overflow: hidden;
		margin-top: -16px;
		height: 432px;
		li {
			list-style: none;
			float: left;
			background: #fff;
			padding: 15px 20px 0px 20px;
			border-bottom: 1px solid #f3f3f3;
			.sharelsft {
				width: 760px;
				float: left;
				.leftcon {
					width: 760px;
					margin: 0 auto;
					.leftdown {
						display: flex;
						padding: 0;
						p {
							margin: 2px 0;
						}
						.leftone {
							flex: 1;
							text-align: center;
							img {
								width: 120px;
							}
						}
						.lefttwo {
							flex: 1;
						}
						.leftthree {
							flex: 1.5;
							margin-left: -40px;
							.threes {
								display: flex;
								width: 100%;
								.jhqx {
									flex: 1;
								}
								.jhje {
									flex: 1;
								}
							}
						}
					}
				}
			}
			.shareright {
				width: 340px;
				height: 128px;
				float: left;
				font-size: 14px;
				color: #666;
				p {
					margin: 5px 0;
				}
			}
		}
	}
</style>