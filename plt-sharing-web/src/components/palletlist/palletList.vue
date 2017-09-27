<template>
	<div class="main">
		<myheader></myheader>
		<div class="siwper" style="position: relative;">
			<img src="../../assets/img/banner1.png" />
		</div>
		<div class="contents">
			<div class="contents-left">
				<div class="neirong">
					<div class="tp_img" v-if="toss=='kyt'">
						<span class="theme">快易托主要规则</span>
						<p><span class="theme_key">租赁类型：</span><span>套餐服务</span></p>
						<p><span class="theme_key">租赁价格：</span><span>根据套餐所含服务内容，实行打包价</span></p>
						<p><span class="theme_key">适用客户：</span><span>远程单向一次性带托运输客户</span></p>
						<p><span class="theme_key">适用场景：</span><span>点对点异地带托运输</span></p>
						<p><span class="theme_key">租赁数量：</span><span>租赁数量不限，100片以内需客户到服务点自提托盘</span></p>
						<p style="text-align: center;"><span class="more_rule" @click="modal1=true">更多详细规则</span></p>
					</div>
					<Modal title="快易托规则" width="700" v-model="modal1" class-name="vertical-center-modal">
						<div class="guize">
							<p>租赁类型：<span>套餐服务</span></p>
							<p>租赁价格：<span>根据套餐所含服务内容，实行打包价</span></p>
							<p>适用客户： <span>远程单向一次性带托运输客户</span></p>
							<p>适用场景： <span>点对点异地带托运输</span></p>
							<p>租赁数量： <span>租赁数量不限，100片以内需客户到服务点自提托盘</span></p>
							<p>租赁期限： <span>锁定期限：30+5个自然日内</span></p>
							<p>押金比例： <span> 10%-100% </span></p>
							<p>配送服务： <span>普拉托科技提供指定地点的租赁设备上门交付服务</span></p>
							<p>退还服务： <span>普拉托科技提供指定地点的租赁设备上门退租服务，超出配送回收服务范围，需由客户负责将租赁设备交还至服务点范围内</span></p>
						    <p>期限中途调整： <span>提前归还：租费数额不变，免费变更收发站点城市。延期归还：逐日追加每日租费，减免违约金</span></p>
							<p>租费清算： <span>按天计费，按月清算</span></p>
							<p>材料要求： <span>1）客户基本信息资料（企业全称、地址、联系人全名、联系电话、邮箱等），2）租赁协议（普拉托提供）一式四份，签字盖章</span></p>
						</div>
					</Modal>
					<div class="tp_img" v-if="toss=='sft'">
						<span class="theme">顺风托主要规则</span>
						<p><span class="theme_key">租赁类型：</span><span>固定期限，固定收发站点</span></p>
						<p><span class="theme_key">租赁价格：</span><span>租费免费或特价收取、一口价到站、特价款产品，</span></p>
						<p><span class="theme_key">适用客户：</span><span>所有需要异地单程带板运输客户</span></p>
						<p><span class="theme_key">适用场景：</span><span>适用于异地单程带板运输，收发站点城市不可选</span></p>
						<p><span class="theme_key">租赁数量：</span><span>数量不限，100片以内需客户到服务点自提托盘</span></p>
						<p style="text-align: center;"><span class="more_rule" @click="modal2=true">更多详细规则</span></p>
					</div>
					<Modal title="顺风托规则" width="700" v-model="modal2" class-name="vertical-center-modal">
						<div class="guize">
							<p>租赁类型：<span>固定期限，固定收发站点</span></p>
							<p>租赁价格：<span>租费免费或特价收取，一口价到站，特价款产品，更少价钱到站</span></p>
							<p>适用客户： <span>所有需要异地单程带板运输客户</span></p>
							<p>适用场景： <span>适用于异地单程带板运输，收发站点城市不可选</span></p>
							<p>租赁数量： <span>数量不限，100片以内需客户到服务点自提托盘</span></p>
							<p>租赁期限： <span>30个自然日内</span></p>
							<p>押金比例： <span> 10%-100% </span></p>
							<p>配送服务： <span>普拉托科技提供指定地点的租赁设备上门交付服务</span></p>
							<p>退还服务： <span>普拉托科技提供指定地点的租赁设备上门退租服务，超出配送回收服务范围，需由客户负责将租赁设备交还至服务点范围内</span></p>
						    <p>期限中途调整： <span>提前归还，租费数额不变。延期归还、延期部分日期按对应的定价瀑布执行。省内城市变更归还不另收费，对变更城市多出的运费按原约定城市至变更后归还城市距离实际物流费用收取</span></p>
							<p>租费清算： <span>按天计费，按月清算</span></p>
							<p>材料要求： <span>1）客户基本信息资料（企业全称、地址、联系人全名、联系电话、邮箱等），2）租赁协议（普拉托提供）一式四份，签字盖章</span></p>
								        </span></p>
						</div>
					</Modal>
					<div class="tp_img" v-if="toss=='sxt'">
						<span class="theme">随心托主要规则</span>
						<p><span class="theme_key">租赁类型：</span><span>租赁期限不约定，可以随借随还</span></p>
						<p><span class="theme_key">租赁价格：</span><span>价格不固定，按租赁期限对应的定价瀑布价格执行</span></p>
						<p><span class="theme_key">适用客户：</span><span>针对业务周期性波动大</span></p>
						<p><span class="theme_key">适用场景：</span><span>厂区内、仓库堆垛、等业务场景下的静态租赁</span></p>
						<p><span class="theme_key">租赁数量：</span><span>数量不限，100片以内需客户到服务点自提托盘</span></p>
						<p style="text-align: center;"><span class="more_rule" @click="modal3=true">更多详细规则</span></p>
					</div>
					<Modal title="随心托规则" width="700" v-model="modal3" class-name="vertical-center-modal">
						<div class="guize">
							<p>租赁类型：<span>租赁期限不约定，可以随借随还</span></p>
							<p>租赁价格：<span>价格不固定，按实际租赁期限对应的定价瀑布价格执行</span></p>
							<p>适用客户： <span>针对业务周期性波动大、租赁期限随业务需要变动的托盘使用企业</span></p>
							<p>适用场景： <span>厂区内、仓库堆垛、上货架、上立架等业务场景下的静态租赁。交换模式、流转模式的普通带托运输</span></p>
							<p>租赁数量： <span>数量不限，100片以内需客户到服务点自提托盘</span></p>
							<p>租赁期限： <span>租赁期限不约定，可随借随还，1天以上（含）即可起租</span></p>
							<p>押金比例： <span>10%-100%</span></p>
							<p>配送服务： <span>普拉托科技提供指定地点的租赁设备上门交付服务</span></p>
							<p>退还服务： <span>普拉托科技提供指定地点的租赁设备上门退租服务，超出配送回收服务范围，需由客户负责将租赁设备交还至服务点范围内</span></p>
						    <p>期限中途调整： <span>无</span></p>
							<p>租费清算： <span>按天计费，按月清算</span></p>
							<p>材料要求： <span>1）客户基本信息资料（企业全称、地址、联系人全名、联系电话、邮箱等），2）租赁协议（普拉托提供）一式四份，签字盖章</span></p>
							</span></p>
						</div>
					</Modal>
					<div class="tp_img" v-if="toss=='pht'">
						<span class="theme">普惠托主要规则</span>
						<p><span class="theme_key">租赁类型：</span><span>长、短租，固定期限</span></p>
						<p><span class="theme_key">租赁价格：</span><span>价格固定，按租赁期限对应的价格执行</span></p>
						<p><span class="theme_key">适用客户：</span><span>针对主营业务稳定，租赁期限可预测的托盘使用企业</span></p>
						<p><span class="theme_key">适用场景：</span><span>业务波峰期厂区、仓库等场景的静态租赁</span></p>
						<p><span class="theme_key">租赁数量：</span><span>数量不限，100片以内需客户到服务点自提托盘</span></p>
						<p style="text-align: center;"><span class="more_rule" @click="modal4=true">更多详细规则</span></p>
					</div>
					<Modal title="普惠托规则" width="700" v-model="modal4" class-name="vertical-center-modal">
						<div class="guize">
							<p>租赁类型：<span>长、短租，固定期限</span></p>
							<p>租赁价格：<span>价格固定，按租赁期限对应的价格执行</span></p>
							<p>适用客户： <span>针对主营业务稳定，租赁期限可预测的托盘使用企业</span></p>
							<p>适用场景： <span>业务波峰期厂区、仓库等场景的静态租赁、交换模式、流转模式、异地归还模式的带板运输</span></p>
							<p>租赁数量： <span>数量不限，100片以内需客户到服务点自提托盘</span></p>
							<p>租赁期限： <span>合同约定具体租赁期限，1天以上（含）即可起租</span></p>
							<p>押金比例： <span>10%-100%</span></p>
							<p>配送服务： <span>普拉托科技提供指定地点的租赁设备上门交付服务</span></p>
							<p>退还服务： <span>普拉托科技提供指定地点的租赁设备上门退租服务，超出配送回收服务范围，需由客户负责将租赁设备交还至服务点范围内</span></p>
						    <p>期限中途调整： <span>提前归还：提前归还部分设备按未约定期限瀑布定价，差额补足。延期归还：租费价格不作调整</span></p>
							<p>租费清算： <span>按天计费，按月清算</span></p>
							<p>材料要求： <span>1）客户基本信息资料（企业全称、地址、联系人全名、联系电话、邮箱等），2）租赁协议（普拉托提供）一式四份，签字盖章</span></p>
							</span></p>
						</div>
					</Modal>

					<div class="tp_img static">
						<span class="theme">托盘介绍</span>
						<p>重型川字型 </p>
						<div class="nows">
							<div class="nowss">
								<p><span style="color:#4679BA">重量：</span>30±0.5kg</p>
								<p><span style="color:#4679BA">静载：</span>6000kg</p>
							</div>
							<div class="nowss">
								<p><span style="color:#4679BA">动载：</span>2000kg</p>
								<p><span style="color:#4679BA">货架：</span>1500kg</p>
							</div>
						</div>
						<p>重型田字型 </p>
						<div class="nows">
							<div class="nowss">
								<p><span style="color:#4679BA">重量：</span>30±0.5kg</p>
							<p><span style="color:#4679BA">静载：</span>6000kg</p>
							</div>
							<div class="nowss">
								<p><span style="color:#4679BA">动载：</span>2000kg</p>
							<p><span style="color:#4679BA">货架：</span>1500kg</p>
							</div>
						</div>
						<p>轻型九脚型 </p>
						<div class="nows">
							<div class="nowss">
								<p><span style="color:#4679BA">重量：</span>10±0.5kg</p>
							<p><span style="color:#4679BA">静载：</span>3000kg</p>
							</div>
							<div class="nowss">
								<p><span style="color:#4679BA">动载：</span>1500kg</p>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="contents-text">
			
				<Tabs v-model="toss">
					<Tab-pane name='sxt' label="随心托">
						<arbitrary></arbitrary>
					</Tab-pane>
					<Tab-pane name='pht' label="普惠托">
						<ordinary></ordinary>
					</Tab-pane>
					<Tab-pane name="kyt" label="快易托">
						<fast-easy></fast-easy>
					</Tab-pane>
					<Tab-pane name='sft' label="顺风托">
						<down-wind></down-wind>
					</Tab-pane>
				</Tabs>
			</div>
		</div>
		<myfooder></myfooder>
	</div>
</template>
<script>
	import Myheader from '../common/Myheader'
	import Myfooder from '../common/Myfooder'
	import downWind from './downWind'
	import fastEasy from './fastEasy'
	import arbitrary from './arbitrary' //随心托
	import ordinary from './ordinary' //普惠托
	import {saveScrollPosition} from '../../filters/mixins.js'
	export default {
		data() {
			return {
				toss: 'sxt',
				modal1: false,
				modal2: false,
				modal3: false,
				modal4: false,
			}
		},
		mixins:[saveScrollPosition],
		mounted() {
			let lxser = this.$store.getters.getRentType
			if(lxser == 'kyt' || lxser == 'sft' || lxser == 'sxt' || lxser == 'pht') {
				this.toss = this.$store.getters.getRentType //使用vuex里的id
			} else {
				this.toss = 'sxt'
			}
		},
		components: {
			Myheader,
			Myfooder,
			downWind,
			fastEasy,
			arbitrary,
			ordinary
		},
		methods: {}
	}
</script>
<style lang="scss" scoped>
	.main {
		background: #F6FAFB;
	}
	
	.siwper {
		margin: 0 auto;
		width: 1200px;
		height: 120px;
		img {
			height: 100%;
			width: 100%;
		}
	}
	
	.contents {
		width: 1200px;
		margin: 0 auto;
		padding: 20px 0;
		display: -webkit-box;
		background: #F6FAFB;
	}
	
	.contents-left {
		flex: 1;
		-webkit-box-flex: 1;
		padding: 0 10px 0px 0px;
		background: #F6FAFB;
		font-size: 12px;
		.neirong {
			width: 100%;
			background: #fff;
			padding-bottom: 20px;
			height: 100%;
			border: 1px solid #ccc;
			.tp_img {
				background: #FFF;
				width: 100%;
				overflow: hidden;
				.theme {
					display: inline-block;
					font-size: 15px;
					color: #666;
					margin: 16px 10px 5px 12px
				}
				p {
					margin: 10px 10px 0px 12px
				}
				.theme_key {
					color: #4679BA;
				}
				.more_rule {
					color: #afb0bb;
					cursor: pointer;
					/*text-decoration: underline;*/
					border: 1px solid #dddee1;
					border-raidus: 3px;
					display: inline-block;
					padding: 2px 5px;
				}
				.more_rule:hover {
					color: #60606c;
					border: 1px solid #60606c;
				}
			}
			.static {
				.nows {
					text-align: left;
					padding: 0 20px;
					display: flex;
					p {
						margin: 3px 0;
					}
				.nowss{
					flex: 1;
				}
				}
			}
		}
	}
	
	.guize {
		p {
			margin: 5px;
		}
	}
	
	.contents-text {
		flex: 4;
		border:1px solid #cccccc;
		-webkit-box-flex: 7;
		background: #fff;
		padding: 10px 0 0 0px;
	}
</style>