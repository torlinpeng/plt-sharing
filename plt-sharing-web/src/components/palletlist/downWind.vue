顺风
<template>
	<div class="main">
		<div class="listul">
			<ul>
				<li>托盘图片</li>
				<li>始发终点城市</li>
				<li>始发日期</li>
				<li>托盘数量</li>
				<li>途径城市</li>
				<li>
				</li>
			</ul>
		
				<ul class="palletlist">
				<li>
					<img src="../../../static/palletimg/tp1002.png" />
					<span class="tpname">重型川字托</span>
				</li>
				<li>武汉→深圳</li>
				<li>2017-09-20</li>
				<li>10000份</li>
				<li>武汉-长沙-广州南-深圳</li>
				<li>
					<Button type="warning" @click="goto()" disabled style="height: 36px; width: 100px;">立即预定</Button>
				</li>
			</ul>
<!--			
			<ul class="palletlist">
				<li><img src="../../assets/img/tp2.png" /> <span class="tpname">重型川字托</span></li>
				<li>广州→深圳</li>
				<li>2017-06-26</li>
				<li>10000份</li>
				<li>广州，东莞，深圳</li>
				<li>
					<Button type="warning" @click="goto()" style="height: 36px; width: 100px;">立即预定</Button>
				</li>
			</ul>-->
			<ul class="palletlist">
				<li><img src="../../../static/palletimg/tp1001.png" /> <span class="tpname">重型田字托</span></li>
				<li>厦门→广州</li>
				<li>2017-09-20</li>
				<li>10000份</li>
				<li>厦门-河源-惠州-广州</li>
				<li>
					<Button type="warning" @click="goto()" disabled style="height: 36px; width: 100px;">立即预定</Button>
				</li>
			</ul>
			<ul class="palletlist">
				<li><img src="../../../static/palletimg/tp1000.png" /> <span class="tpname">轻型九脚托</span></li>
				<li>成都→深圳</li>
				<li>2017-09-20</li>
				<li>10000份</li>
				<li>成都-武昌-南昌-河源-深圳</li>
				<li>
					<Button type="warning" @click="goto()"disabled style="height: 36px; width: 100px;">立即预定</Button>
				</li>
			</ul>
			<!--<ul class="palletlist">
				<li><img src="../../assets/img/tp5.png" /> <span class="tpname">轻型九脚托</span></li>
				<li>河源→深圳</li>
				<li>2017-06-26</li>
				<li>10000份</li>
				<li>河源，惠州，深圳</li>
				<li>
					<Button type="warning" @click="goto()" style="height: 36px; width: 100px;">立即预定</Button>
				</li>
			</ul>-->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				datalist: [{}]
			}
		},
		methods: {
			goto() {
				this.$router.push('/rents');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.siwper {
		width: 100%;
		height: 160px;
		img {
			height: 100%;
			width: 100%;
		}
	}
	
	.tabs {
		height: 40px;
		line-height: 40px;
		color: #6D7380;
		background: #F6FAFB;
		cursor: pointer;
		font-size: 14px;
		width: 100%;
		.tplist {
			text-align: center;
			border-left: 1px solid #f3f3f3;
			float: right;
			width: 10%;
		}
	}
	.listul {
		width: 100%;
		background: #fff;
		overflow: hidden;
		padding-right: 10px;
		ul {
			/*overflow: hidden;*/
			display: flex;
			width: 100%;
		}
		li {
			flex: 1;
			height: 40px;
			line-height: 40px;
			text-align: center;
			/*background: #fff;*/
			border-bottom: 1px solid #F2F2F2;
			color: #111;
			font-size: 14px;
		}
		.ul.palletlist{
			background: #fff;
		}
		ul.palletlist:hover{
			background: #FFF7F2;
		}
		ul.palletlist li {
			color: #6D7380;
			height: 120px;
			line-height: 120px;
			border-right: none;
			position: relative;
		.tpname {
				position: absolute;
				display: inline-block;
				margin-left: -117px;
				height: 40px;
				width: 100%;
				font-size: 12px;
				color: #aaa;
				margin-top: 35px
			}
			img {
				height: 55px;
				margin-top: 20px;
			}
		}
	}
</style>
