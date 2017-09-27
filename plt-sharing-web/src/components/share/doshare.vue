<template>
	<div class="main">
		<myheader></myheader>
		<div class="siwper" style="position: relative;">
			<img src="../../../static/swiper/share.png" />
		</div>
		<div class="moretodo">
			<div class="wantdo" style="border-right: 1px solid #eee;">
				<img src="../../assets/img/share-zr.svg" />
				<router-link to="/dotransfer"><span>我要转让</span></router-link>
			</div>
			<div class="wantdo">
				<img src="../../assets/img/share-zhcx.svg" />
				<span style="color: #FF4400">资产认购</span>
			</div>
		</div>
		<div class="sharing">
			<ul>
				<li v-for="(items,index) in datalist">
					<div class="sharelsft">
						<div class="leftcon">
							<div class="leftup">
								<span class="title">{{items.assertName}}</span>
								<span class="ganen">感恩回馈加息0.8%</span>
								<span class="timeout">九个月后可退出</span>
								<span class="timeout">逐月增息</span>
							</div>
							<div class="leftdown">
								<div class="leftone">
									<img src="../../../static/palletimg/tp1002.png" />
									<p style="text-align: center;"><span style="font-size: 12px;color：#333;">{{items.pkgName}}</span></p>
								</div>
								<div class="lefttwo">
									<p><span style="font-size: 14px;color：#333;">预期年化利率</span></p>
									<p><span style="color: #FF6D00;font-size: 36px;">12.6</span>
										<span style="color: #FF6D00;font-size: 13px;">+0.8%</span></p>
									<p><span style="font-size: 14px;color：#333;">产品价格：{{items.price}}元</span></p>
									<p><span style="font-size: 14px;color：#333;">还款方式：按月付租</span></p>
								</div>
								<div class="leftthree">
									<div class="threes">
										<div class="jhqx">
											<p><span style="font-size: 14px;color：#333;">折旧期限</span></p>
											<p><span style="color:#666; font-size: 36px;">{{items.depreYearLimit}}</span>
												<span style="color: #bbb;font-size: 13px;">/年</span></p>
										</div>
										<div class="jhje">
											<p><span style="font-size: 14px;color：#333;">计划金额</span></p>
											<p><span style="color: #bbb;font-size: 13px;">￥</span>
												<span style="color:#666; font-size: 36px;">{{items.num*items.price}}</span></p>
										</div>
									</div>
									<div style="margin: 0;">
										<span style="font-size: 14px;display: inline-block;float: left;">剩余份数：{{items.num-items.subscribeNum}}&nbsp;</span>
										<div class="wids"><span class="percents" :style="{ width: (items.num-items.subscribeNum)/items.num*100 + 'px' }"></span></div>
										<span style="color：#333;font-size: 13px;">&nbsp;{{(items.num-items.subscribeNum)/items.num*100}}%</span>
									</div>
									<p><span style="font-size: 14px;">保障方式：安全保障计划+第三份担保机构</span></p>
								</div>
							</div>
							<div class="down">
								<ul>
									<li>
										<div class="dwmnimg"><img src="../../../static/palletimg/share2.png" /></div>
										<div class="dwmntxt">
											<p><span style="color: #FF6D00;">467</span><span>人</span></p>
											<p><span>已加入人次</span></p>
										</div>
									</li>
									<li>
										<div class="dwmnimg"><img src="../../../static/palletimg/share1.png" /></div>
										<div class="dwmntxt">
											<p><span style="color: #FF6D00;">9</span><span>次</span></p>
											<p><span>已优先投标次数</span></p>
										</div>
									</li>
									<li>
										<div class="dwmnimg"><img src="../../../static/palletimg/share3.png" /></div>
										<div class="dwmntxt">
											<p><span style="color: #FF6D00;">0.00%</span></p>
											<p><span>投标完成率</span></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="shareright">
						<p>可用余额：登录后可见<span style="padding: 3px 10px; border: 1px solid #ccc; border-radius: 5px;margin-left: 15px;">立即登录</span></p>
						<p>资产价格：<span style="color: #FF6D00;">{{items.price}} 元</span></p>
						<p>年折旧率：<span style="color: #FF6D00;">{{items.depreYearRate}}</span></p>
						<p>发行截止日期：<span style="color: #FF6D00;">{{new Date(items.issuanceEndDate).toLocaleString().substring(0,9)}}</span></p>
						<p><span>购买份数：</span>
							<Input-number :step="10" style="width: 200px;" v-model="items.minSubNum"></Input-number>
						</p>
						<p>资产认购额：<span style="color: #FF6D00;">{{items.price*items.minSubNum}}</span></p>
						<p>预期收益：<span style="color: #FF6D00;">10.00元</span></p>
						<P>
							<Button type="warning" @click="dobuy(index)" style="width: 300px;height: 32px; margin-top: 8px;">确认购买</Button>
						</P>
					</div>
				</li>
			</ul>
			<div class="nodata" v-if="datalist.length==0">
				<img src="../../assets/img/nodata.svg" />
				<p>数据哥哥好像迷路了....</p>
			</div>
		</div>
		<div class="share-tabs">
			<Tabs value="name1">
				<Tab-pane label="计划详情" name="name1">我是计划详情的内容</Tab-pane>
				<Tab-pane label="常见问题" name="name2">我是常见的内容</Tab-pane>
			</Tabs>
		</div>
		<myfooder></myfooder>
	</div>
</template>
<script>
	import Myheader from '../common/Myheader'
	import Myfooder from '../common/Myfooder'
	export default {
		data() {
			return {
				datalist: []
			}
		},
		components: {
//			VueMarkdown,
			Myheader,
			Myfooder
		},
		mounted() {
			var _this = this
			this.$http.post('/assertPkg/querySubscribeAssertPkgList.do').then(function(response) {
				_this.datalist = response.data
			})
		},
		computed: {},
		methods: {
			dobuy(index) {
				var _this = this
				var pkgId = this.datalist[index].pkgId
				var amount = _this.datalist[index].minSubNum
				_this.$http.post('/assertPkg/subscribeAssertPkg.do', {
					pkgId: pkgId,
					requstNum: amount
				}).then(function(response) {
					console.log(response)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.main {
		background: #f3f3f3;
	}
	.siwper {
		width: 1200px;
		margin: 20px auto 0;
		img {
			width: 100%;
		}
	}
	.moretodo {
		width: 1200px;
		margin: 20px auto;
		height: 60px;
		line-height: 60px;
		background: #fff;
		text-align: center;
		font-size: 15px;
		cursor: pointer;
		display: flex;
		padding: 10px 0;
		img {
			width: 32px;
			vertical-align: middle;
		}
		a {
			color: #6d6d6d;
		}
		.wantdo {
			line-height: 40px;
			flex: 1;
		}
		span:hover {
			color: #0066CC;
			font-size: 16px;
		}
	}
	
	.nodata {
		text-align: center;
		font-size: 22px;
		margin: 20px 0;
		padding: 30px 0;
		p {
			color: #d6d4d4;
		}
		img{
			width: 240px;
		}
	}
	
	.sharing {
		width: 1200px;
		margin: 20px auto 0;
		background: #fff;
		overflow: hidden;
		li {
			list-style: none;
			float: left;
			background: #fff;
			padding: 0px 20px;
			margin-bottom: 10px;
			.sharelsft {
				width: 820px;
				float: left;
				.leftcon {
					width: 800px;
					margin: 10px 0 auto;
					.leftup {
						height: 40px;
						width: 100%;
						border-bottom: 1px solid #eee;
						.title {
							font-size: 18px;
						}
						.ganen {
							display: inline-block;
							background: #fe0000;
							color: #fff;
							padding: 1px 5px;
							border-radius: 4px;
							margin: 0 15px 0 12px;
						}
						.timeout {
							background: #fffbf0;
							color: #ffae77;
							display: inline-block;
							padding: 1px 12px;
							border: 1px solid #fff1e0;
							border-radius: 5px;
							margin: 0 5px;
						}
					}
					.leftdown {
						display: flex;
						padding: 20px 0 5px 0;
						border-bottom: 1px solid #eee;
						p {
							margin: 10px 0;
						}
						.leftone {
							flex: 1;
							padding-top: 20px;
							img {
								width: 160px;
							}
						}
						.lefttwo {
							flex: 1;
							padding-left: 25px;
						}
						.leftthree {
							flex: 2;
							padding-left: 25px;
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
							.wids {
								width: 100px;
								border: 1px solid #e5e5e5;
								background: #fff;
								height: 7px;
								position: relative;
								float: left;
								margin-top: 7px;
								border-radius: 1px;
								.percents {
									display: inline-block;
									background: #fff131;
									height: 5px;
									position: absolute;
									border-radius: 1px;
								}
							}
						}
					}
					.down {
						display: flex;
						ul {
							width: 100%;
							display: flex;
						}
						li {
							float: left;
							flex: 1;
							padding: 10px 0 0 100px;
							p {
								margin: 5px;
							}
							.dwmnimg {
								float: left;
								margin: 6px 5px 0 0;
							}
							.dwmntxt {
								float: left;
							}
						}
					}
				}
			}
			.shareright {
				width: 340px;
				height: 314px;
				float: left;
				padding: 8px 15px 15px 20px;
				font-size: 15px;
				color: #666;
				border-left: 5px solid #F3F3F3;
				p {
					margin: 10px 0;
				}
			}
			.count span {
				width: 27px;
				height: 27px;
				display: inline-block;
				border: 1px solid #C8C7CD;
				text-align: center;
				line-height: 27px;
				float: left;
				cursor: pointer;
			}
			.count input {
				width: 27px;
				height: 27px;
				border: 1px solid #C8C7CD;
				float: left;
				text-align: center;
			}
		}
	}
	
	.share-tabs {
		width: 1200px;
		background: #fff;
		margin: 10px auto 20px;
	}
</style>