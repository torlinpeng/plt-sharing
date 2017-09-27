<template>
	<div class="main">
		<myheader></myheader>
		<div class="moretodo">
			<Row>
				<Col span="8">
				<img src="../../assets/img/share-zr.svg" />
				<router-link to="/dotransfer"><span>我要转让</span></router-link>
				</Col>
				<Col span="8" class="cols" style="border-left: 1px solid #eee; border-right: 1px solid #eee ;">
				<img src="../../assets/img/share-sycx.svg" />
					<router-link to="/doshare"><span>资产认购</span></router-link>
				</Col>
				<Col span="8">
				<img src="../../assets/img/share-zhcx.svg" />
				<router-link to="/myproperty"><span style="color:#FF4E00;">我的资产</span></router-link>
				</Col>
			</Row>
		</div>
		<div class="sharing">
			<ul>
				<li v-for="items in datalist">
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
									<p style="margin: 0;"><span style="font-size: 14px;">剩余份数：{{items.num-items.subscribeNum}}</span>
										<span style="display: inline-block; background:#ffc72c;height: 5px;width: 100px;border-radius: 5px;"></span>
										<span style="color：#333;font-size: 13px;"></span>
									</p>
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
						<p>资产价格：<span style="color: #FF6D00;">160.00元</span></p>
						<p>年折旧率：<span style="color: #FF6D00;">12%</span></p>
						<p>认购截止时间：<span style="color: #FF6D00;">2017-09-08</span></p>
						<p><span>购买份数：</span>
							<Input-number :step="10" style="width: 200px;" v-model="value4"></Input-number>
						</p>
						<p>资产认购额：<span style="color: #FF6D00;">320.00元</span></p>
						<p>预期收益：<span style="color: #FF6D00;">10.00元</span></p>
						<P>
							<Button type="warning" @click="dobuy()" style="width: 300px;height: 32px; margin-top: 8px;">确认购买</Button>
						</P>
					</div>
				</li>
				<li>
					<div class="sharelsft">
						<div class="leftcon">
							<div class="leftup">
								<span class="title">重型田字型托盘</span>
							</div>
							<div class="leftdown">
								<div class="leftone">
									<img src="../../../static/palletimg/tp1001.png" />
									<p style="text-align: center;"><span style="font-size: 12px;color：#333;">重型田字型托盘</span></p>
								</div>
								<div class="lefttwo">
									<p><span style="font-size: 14px;color：#333;">预期年化利率</span></p>
									<p><span style="color: #FF6D00;font-size: 36px;">12.6</span>
										<span style="color: #FF6D00;font-size: 13px;">+0.8%</span></p>
									<p><span style="font-size: 14px;color：#333;">年折旧率：12%</span></p>
									<p><span style="font-size: 14px;color：#333;">还款方式：按月付租</span></p>
								</div>
								<div class="leftthree">
									<div class="threes">
										<div class="jhqx">
											<p><span style="font-size: 14px;color：#333;">计划期限</span></p>
											<p><span style="color:#666; font-size: 36px;">12.6</span>
												<span style="color: #bbb;font-size: 13px;">/个月</span></p>
										</div>
										<div class="jhje">
											<p><span style="font-size: 14px;color：#333;">持有数量</span></p>
											<p><span style="color:#666; font-size: 36px;">5,000.00</span>
												<span style="color: #bbb;font-size: 13px;">份</span>
											</p>
										</div>
									</div>
									<p style="margin-top: 0;"><span style="font-size: 14px;">资产原价格：160.00元</span></p>
									<p><span style="font-size: 14px;">保障方式：安全保障计划+第三份担保机构</span></p>
								</div>
							</div>
						</div>
					</div>
					<div class="shareright">
						<p>预期收益 ：<span style="color: #FF6D00;">160.00元</span></p>
						<p>认购时间 ：<span style="color: #FF6D00;">2017-09-08</span></p>
						<p>资产认购额 ：<span style="color: #FF6D00;">5000</span></p>
						<p>截止日期：<span style="color: #FF6D00;">2017-09-08</span></p>
					</div>
				</li>
			</ul>
		</div>
		<div class="share-tabs">
			<div class="senttxt">
				<span>发布记录</span>
			</div>
			<div class="record">
				<ul>
					<li>序号</li>
					<li>产品图片</li>
					<li>资产名称</li>
					<li>发布数量(份)</li>
					<li>发布时间</li>
					<li>折旧率</li>
					<li>折旧单价(元)</li>
					<li>交易数量(份)</li>
					<li>状态</li>
				</ul>
				<ul>
					<li>1</li>
					<li>图片</li>
					<li>轻型田字型托盘</li>
					<li>2000</li>
					<li>2017-06-15</li>
					<li>12%</li>
					<li>160.00</li>
					<li>1000</li>
					<li class="senting">发布中</li>
				</ul>
				<ul>
					<li>2</li>
					<li>图片</li>
					<li>轻型田字型托盘</li>
					<li>2000</li>
					<li>2017-06-15</li>
					<li>12%</li>
					<li>160.00</li>
					<li>1000</li>
					<li class="senting">发布中</li>
				</ul>
			</div>
		</div>
		<myfooder></myfooder>
	</div>
</template>
<script>
//	import VueMarkdown from 'vue-markdown'
	import Myheader from '../common/Myheader'
	import Myfooder from '../common/Myfooder'
	export default {
		data() {
			return {
				datalist: [],
				percent: ''
			}
		},
		mounted() {},
		components: {
//			VueMarkdown,
			Myheader,
			Myfooder
		},
		methods: {}
	}
</script>
<style lang="scss" scoped>
	.main {
		background: #f3f3f3;
	}
	.moretodo {
		width: 1200px;
		margin: 0 auto;
		height: 60px;
		line-height: 60px;
		background: #fff;
		text-align: center;
		font-size: 15px;
		cursor: pointer;
		img {
			width: 32px;
			vertical-align: middle;
		}
		a{
		color: #6d6d6d;
		}
		span:hover {
			color: #0066CC;
		}
	}
	.sharing {
		width: 1200px;
		margin: 20px auto 0;
		background: #f3f3f3;
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
						}
					}
				}
			}
			.shareright {
				width: 340px;
				height: 255px;
				float: left;
				padding: 25px 15px 15px 30px;
				font-size: 15px;
				color: #666;
				border-left: 5px solid #F3F3F3;
				p {
					margin: 20px 0;
				}
			}
		}
	}
	.share-tabs {
		width: 1200px;
		background: #fff;
		margin: 10px auto 20px;
		font-size: 14px;
	 .senttxt{
	 	text-indent: 20px;
	 	height: 36px;
	 	line-height: 36px;
	 	width: 1150px;
	 	margin: 0 auto;
	 	border-bottom: 1px solid #eee;
	 }	
	 .record{
	 	 overflow: hidden;
	 	ul{
	 	 	height: 36px;
	 	 	width: 100%;
	 	 }
	 	
	 	 ul:nth-child(even){
	 	 	background: #eff8fd;	 	
	 	 }
	 	  
	 	li{
	 		float: left;
	 		width: 11%;
	 		height: 36px;
	 		line-height: 36px;
	 		text-align: center;
	 		color: #888;
	 	}
	 	li:nth-child(1),li:nth-child(9){
	 		width: 9%;
	 	}
	 	li:nth-child(3),li:nth-child(5){
	 		width: 13%;
	 	}
	 	ul:nth-child(1){
	 	 	background: #fff;
	 	 	li{
	 	 		color: #666;
	 	 	}
	 	 }
	 	.senting{
	 		color: #18B566;
	 		font-weight: bold;
	 	}
	 }
	}
</style>