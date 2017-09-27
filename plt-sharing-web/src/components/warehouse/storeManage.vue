<template>
	<div class="main">
		<store-header></store-header>
		<div class="contents">
			<!--<img class="bgimg" src="./img/true.jpg" />-->
			<div class="content">
				<ul>
					<li @click="$router.push({path: '/outStore'})">
						<img src="./img/outMana.png" />
						<p><span>出库管理</span></p>
					</li>
					<li>
						<img src="./img/putMana.png" />
						<p><span>入库管理</span></p>
					</li>
					<li>
						<img src="./img/storeLog.png" />
						<p><span>仓库流水</span></p>
					</li>
					<!--<li @click="$router.push({path: '/storeKeeper'})">-->
						<li>
						<img src="./img/oraMan.png" />
						<p><span>仓管人员</span></p>
					</li>
				</ul>
			</div>
		</div>

	</div>

</template>

<script>
	import storeHeader from './storeHeader'
	export default {
		components: {
			storeHeader,
		}
		}
</script>

<style lang="scss" scoped>
	.header {
		height: 65px;
		line-height: 65px;
		font-size: 20px;
		padding: 0 30px;
		width: 100%;
		position: relative;
		box-shadow: 0px -3px 12px #666;
		.lefts {
			float: left;
			img {
				margin: 10px;
				position: absolute;
			}
			span {
				display: inline-block;
				text-indent: 290px;
				letter-spacing: 1px;
			}
		}
		.rights {
			float: right;
			font-size: 13px;
		}
	}
	.contents{
		width: 100%;
		position: relative;
		overflow: hidden;
		background: #0080FF;
	.content {
		margin: 8% auto 0;
		width: 880px;
		text-align: center;
		font-size: 18px;
		li {
			float: left;
			height: 250px;
			width: 50%;
			cursor: pointer;
			color: #fff;
			p {
				margin: 10px 0;
			}
		}
		li img:hover{
			width: 120px;
		}
	}
	}
</style>