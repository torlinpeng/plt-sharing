<template>
	<div class="main">
		<myheader></myheader>
		<div class="siwper" style="position: relative;">
			<img src="../../../static/swiper/share.png" />
			<div class="nodata">
<!--			<img src="../../assets/img/nodata.svg" />-->
			<p>即将上线，敬请期待！</p>
		</div>
			</div>
		<!--<div class="moretodo">
			<div class="wantdo" style="border-right: 1px solid #eee;">
				<img src="../../assets/img/share-zr.svg" />
				<span style="color: #FF4E00;">我要转让</span>
			</div>
			<div class="wantdo">
				<img src="../../assets/img/share-zhcx.svg" />
				<router-link to="/doshare"><span>资产认购</span></router-link>
			</div>
		</div>
		<div class="sharing">
			<div class="leftcon">
				<div class="leftup">
					<div class="lxseleft">
						<div class="lxsele">
							<Row :gutter="20" type="flex" justify="start">
								<Col class="lxcols" span="4">
								<div>资产类型：</div>
								</Col>
								<Col class="lxcols lxcolss lxclick" span="4">
								<div>全部</div>
								</Col>
								<Col class="lxcols lxcolss" span="4">
								<div>九脚托</div>
								</Col>
								<Col class="lxcols lxcolss" span="4">
								<div>川字托</div>
								</Col>
								<Col class="lxcols lxcolss" span="4">
								<div>田字托</div>
								</Col>
							</Row>
						</div>
						<div class="lxsele">
							<Row :gutter="20" type="flex" justify="start">
								<Col class="lxcols lxcolss" span="4">
								<div>排序方式：</div>
								</Col>
								<Col class="lxcols lxcolss lxclick" span="4">
								<div>默认排序</div>
								</Col>
								<Col class="lxcols lxcolss" span="4">
								<div>年化利率</div>
								</Col>
								<Col class="lxcols lxcolss" span="4">
								<div>投资期限</div>
								</Col>
								<Col class="lxcols lxcolss" span="4">
								<div>发布时间</div>
								</Col>
							</Row>
						</div>
					</div>
					<div class="sentright">
						<span @click="modal10 = true">我要转让</span>
					</div>
					<Modal title="我要转让" v-model="modal10" width="420" :loading="loading" @on-ok="asyncOK" class-name="vertical-center-modal">
						<div class="formdiv">
							<span>资产类型：</span>
							<Select v-model="model1" style="width:300px">
								<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
							</Select>
						</div>
						<div class="formdiv">
							<span>转让数量：</span>
							<Input v-model="amount" placeholder="请输入转让数量" style="width: 300px"></Input>
						</div>
						<div class="formdiv">
							<span>新折旧率：</span>
							<Input v-model="depre_rate" placeholder="请输入折旧率" style="width: 300px"></Input>
						</div>
						<div class="formdiv">
							<span>转让时间：</span>
							<Date-picker :value="rentdata" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 300px"></Date-picker>
						</div>
					</Modal>
				</div>
				<div class="leftdown">
					<div class="leftone">
						<img src="../../assets/img/tp5.png" />
						<p style="text-align: center;"><span style="font-size: 12px;color：#333;"></span></p>
					</div>
					<div class="lefttwo">
						<p><span class="zcname">170607九脚托</span></p>
						<p><span>170607九脚托</span></p>
					</div>
					<div class="leftthree">
						<div class="tp-text">
							<div class="tp-nhl" style="padding:0 20px;">
								<span style="color: #FF6D00; font-size: 25px;">12.10</span><span>&nbsp; 利率</span>
							</div>
							<div class="tp-nhl" style="0px 43px 0px 61px;">
								<span style="color: #FF6D00; font-size: 25px;">36</span><span>&nbsp;天/到期本息</span>
							</div>
							<div class="tp-nhl" style="padding:0 0 0 40px;">
								<span style="color: #FF6D00; font-size: 25px;">1400.00</span><span>&nbsp;元/折旧价格</span>
							</div>
						</div>
						<div class="tp-text">
							<div class="tp-nhl">
								<span>&nbsp; 折旧率：12%</span>
							</div>
							<div class="tp-nhl">
								<span>&nbsp; 资产价格：160.00元</span>
							</div>
							<div class="tp-nhl">
								<span>&nbsp; 已售数量：1000份</span>
							</div>
							<div class="tp-nhl">
								<span>&nbsp; 剩余数量：1000份</span>
							</div>
						</div>
					</div>
					<div class="leftfour">
						<span @click="modal_buy = true">我要购买</span>
					</div>
				</div>
				<div class="leftdown">
					<div class="leftone">
						<img src="../../assets/img/tp5.png" />
						<p style="text-align: center;"><span style="font-size: 12px;color：#333;"></span></p>
					</div>
					<div class="lefttwo">
						<p><span class="zcname">170607九脚托</span></p>
						<p><span>170607九脚托</span></p>
					</div>
					<div class="leftthree">
						<div class="tp-text">
							<div class="tp-nhl" style="padding:0 20px;">
								<span style="color: #FF6D00; font-size: 25px;">12.10</span><span>&nbsp; 利率</span>
							</div>
							<div class="tp-nhl" style="0px 43px 0px 61px;">
								<span style="color: #FF6D00; font-size: 25px;">36</span><span>&nbsp;天/到期本息</span>
							</div>
							<div class="tp-nhl" style="padding:0 0 0 40px;">
								<span style="color: #FF6D00; font-size: 25px;">1400.00</span><span>&nbsp;元/折旧价格</span>
							</div>
						</div>
						<div class="tp-text">
							<div class="tp-nhl">
								<span>&nbsp; 折旧率：12%</span>
							</div>
							<div class="tp-nhl">
								<span>&nbsp; 资产价格：160.00元</span>
							</div>
							<div class="tp-nhl">
								<span>&nbsp; 已售数量：1000份</span>
							</div>
							<div class="tp-nhl">
								<span>&nbsp; 剩余数量：1000份</span>
							</div>
						</div>
					</div>
					<div class="leftfour">
						<span @click="modal_buy = true">我要购买</span>
					</div>
				</div>
                <div class="fenye">
                	<Page :total="100" class-name="setpage"></Page>
                </div>
				<Modal title="我要购买" v-model="modal_buy" width="320" @on-ok="asyncOK" class-name="vertical-center-modal">
					<div class="formdiv">
						<span>资产名称：米唐轻型田字托</span>
					</div>
					<div class="formdiv">
						<span>折旧价格：140.00</span>
					</div>
					<div class="formdiv">
						<span>购买数量：</span>
						<Input-number :min="0" v-model="acount" :step="10" size="small"></Input-number>
					</div>
					<div class="formdiv">
						<span>活动优惠：0元</span>
					</div>
					<div class="formdiv">
						<span>总计金额：14000.00元</span>
					</div>
				</Modal>
			</div>
		</div>-->
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
				modal10: false,
				modal_buy: false,
				loading: true,
				acount: 10,
				rentdata: '2018-01-01',
				model1: '',
				amount:'',
				depre_rate:'',
				cityList: [{
						value: 'beijing',
						label: '北京市'
					},
					{
						value: 'shanghai',
						label: '上海市'
					},
					{
						value: 'shenzhen',
						label: '深圳市'
					}
				]
			}
		},
		mounted() {},
		components: {
//			VueMarkdown,
			Myheader,
			Myfooder
		},
		methods: {
			asyncOK() {
				setTimeout(() => {
					this.modal10 = false;
				}, 2000);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.main {
		background: #f6fafb;
	}
	.siwper {
		width: 1200px;
		margin: 20px auto 0;
		img {
			width: 100%;
		}
	.nodata{
		text-align: center;
		background:#fff ;
		padding-top: 70px;
		padding-bottom:70px;
		
		
		p{
			color: #80848F;
			font-size: 20px;
			margin:  20px 0 0;
		}
	}
	}
	.moretodo {
		border:1px solid #CCCCCC;
		width: 1200px;
		margin: 20px auto 0;
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
	
	.formdiv {
		width: 100%;
		margin-bottom: 23px;
		margin-left: 10px;
		font-size: 13px;
	}
	
	.ivu-date-picker {
		width: 300px;
		margin-left: 69px;
		margin-top: -22px;
	}
	.setpage{
       float: right;
	}
	.sharing {
		width: 1200px;
		margin: 0px auto;
		/*background: #f3f3f3;*/
		overflow: hidden;
		.leftcon {
			border:1px solid #CCCCCC;
			width: 100%;
			padding: 20px;
			height: 495px;
			background: #fff;
			margin: 20px auto;
			.leftup {
				width: 100%;
				border-bottom: 1px solid #eee;
				display: flex;
				.lxseleft {
					flex: 1;
					.lxsele {
						width: 100%;
						margin-bottom: 13px;
						.lxcols {
							height: 26px;
							line-height: 26px;
							border-radius: 3px;
							text-align: center;
							margin-right: 10px;
							cursor: pointer;
						}
						.lxclick {
							background: #ff9600;
							color: #fff;
						}
						.lxcolss:hover {
							background: #ff9600;
							color: #fff;
						}
					}
				}
				.sentright {
					flex: 1;
					text-align: center;
					text-align: right;
					padding-right: 39px;
					span {
						width: 120px;
						height: 36px;
						color: #fff;
						display: inline-block;
						background: #ff4e00;
						text-align: center;
						font-size: 15px;
						line-height: 36px;
						border-radius: 3px;
						margin-top: 18px;
						cursor: pointer;
					}
					span:hover {
						background: #FF9600;
					}
				}
				.vertical-center-modal {
					display: flex;
					align-items: center;
					justify-content: center;
					.ivu-modal {
						top: 0;
					}
				}
			}
			.leftdown {
				display: flex;
				padding: 20px 0 5px 0;
				border-bottom: 2px solid #f3f3f3;
				p {
					margin: 10px 0;
				}
				.leftone {
					flex: 0.8;
					img {
						width: 140px;
					}
				}
				.lefttwo {
					flex: 1;
					font-size: 15px;
					color: #6a6a6a;
					padding-top: 10px;
					text-align: center;
					.zcname {
						padding: 2px 8px;
						color: #3f9fd9;
						border: 2px solid #3f9fd9;
						font-size: 15px;
						letter-spacing: 1px;
					}
				}
				.leftthree {
					flex: 3;
					margin-top: 13px;
					.tp-text {
						width: 100%;
						float: left;
						font-size: 13px;
						margin: 1px 0;
						.tp-nhl {
							float: left;
							padding: 0 15px;
						}
					}
				}
				.leftfour {
					flex: 1;
					text-align: center;
					span {
						width: 120px;
						height: 36px;
						color: #fff;
						display: inline-block;
						background: #FF9600;
						text-align: center;
						font-size: 15px;
						line-height: 36px;
						border-radius: 3px;
						margin-top: 24px;
						cursor: pointer;
					}
					span:hover {
						background: #FFAD33;
					}
				}
			}
			.leftdown:last-child {
				border-bottom: none;
			}
			.fenye{
				width: 100%;
				text-align: center;
				padding: 80px 0;
			}
		}
	}
</style>