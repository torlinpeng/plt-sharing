<template>
	<div class="main">
		<div class="theme">模块功能说明</div>
		<div class="lists">
			<div class="left">
				<div class="leftcon" @click="$router.push({path: '/myaccount/queryIncome'})">
					<p class="legtcol">我的账户</p>
					<p class="detail">查询资产包收益信息，获取收益明细列表。</p>
				</div>
			</div>
			<div class="left">
				<div class="leftcon" @click="$router.push({path: '/myaccount/queryBill'})">
					<p class="legtcol" style="color: #00cbc9;">账单查询</p>
					<p class="detail">查询资产包收益信息，获取收益明细列表。</p>
				</div>
			</div>
			<div class="left" @click="$router.push({path: '/myaccount/queryAssets'})">
				<div class="leftcon">
					<p class="legtcol" style="color: #4F9D00;">我的资产</p>
					<p class="detail">查询资产包收益信息，获取收益明细列表。</p>
				</div>
			</div>
		</div>
		<div class="lists">
			<div class="left">
				<div class="leftcon" @click="$router.push({path: '/myaccount/queryTask'})">
					<p class="colo" style="color:#FA9E05;">托盘业务办理</p>
					<p class="detail">办理归还，报失，报损，托盘转让，承租他人托盘等业务。</p>
				</div>
			</div>
			<div class="left" @click="$router.push({path: '/myaccount/queryRecord'})">
				<div class="leftcon">
					<p class="colo" style="color: #FF0080;">订单记录</p>
					<p class="detail">查询归还，报失，报损，托盘转让，承租他人托盘等业务的记录</p>
				</div>
			</div>
			<div class="left" @click="$router.push({path: '/myaccount/queryBill'})">
				<div class="leftcon">
					<p class="colos" style="color: #BF00BF;">合约查询</p>
					<p class="detail">查询每笔租赁业务结束所生成的订单合约对应的信息。</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.main {
		padding: 20px;
		width: 100%;
		.theme{
			border-bottom: 1px solid #F8F8F2;
			width: 860px;
			margin: 0 auto;
			font-size: 16px;
			padding: 3px 25px 10px 10px;
		}
		.lists {
			width: 860px;
			margin: 0 auto;
			display: flex;
			letter-spacing: 1px;
			.left {
				flex: 1;
				background: #fff;
				height: 220px;
				padding: 20px;
				.leftcon {
					background: #F8F8F9;
					padding: 30px 30px 0;
					height: 180px;
					border-radius: 3px;
					cursor: pointer;
					.legtcol,.colo,.colos{
						color: #FF4E00;
						font-size: 18px;
						margin-bottom: 10px;
					}
				}
				.leftcon:hover{
					border: 5px solid #FFAD33;
					
				}
			}
		}
		.detail {
			color: #888992;
			font-size: 16px;
		}
	}
</style>