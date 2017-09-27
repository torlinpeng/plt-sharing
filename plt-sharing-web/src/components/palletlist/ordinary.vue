<!--普惠托-->
<template>
	<div class="listul">
		<ul>
			<li v-for="(keys,index) in kytdata">
				<div class="palletimg">
					<img :src="keys.tpimg" />
				</div>
				<div class="palletinfo">
					<div class="texts">
						<p><span class="tp_name">{{keys.name}}</span></p>
						<p><span style="font-size: 15px;">{{keys.about}}</span></p>
						<p style="margin-top: 0px;">采用<span style="color: #4679BA;">{{keys.material}}</span>
						</p>
					</div>
				</div>
				<div class="palletinfo">
					<div class="text">
						<span class="hui">惠</span>
						<span class="price">￥{{keys.price}}</span><span>/天起</span>
					</div>
				</div>
				<div class="palletinfo">
					<div class="text">
						<Button type="warning" @click="$router.push({path: 'rents'})" style="height: 40px; width: 120px;">立即租托</Button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import Myheader from '../common/Myheader'
	import Myfooder from '../common/Myfooder'
	export default {
		components: {
			Myheader,
			Myfooder
		},
		data() {
			return {
				kytdata:[{
					tpname: '轻型九脚型托盘',
					tpimg: './static/palletimg/tp1000.png',
					about: '静载3.0T|动载1.5T',
					material: '高密度抗冲击全新HDPE中空材料和表面经电游处理的钢管',
					price: '0.10'
				}, {
					tpname: '重型田字型托盘',
					tpimg: './static/palletimg/tp1001.png',
					about: '静载6.0T|动载2.0T|上货架1.5T',
					material: '高密度抗冲击全新HDPE中空材料和表面经电游处理的钢管',
					price: '0.23'
				}, {
					tpname: '重型川字型托盘',
					tpimg: './static/palletimg/tp1002.png',
					about: '静载6.0T|动载2.0T|上货架1.5T',
					material: '高密度抗冲击全新HDPE中空材料和表面经电游处理的钢管',
					price: '0.23'
				}] ,
			}
		},

		computed: {
			user() {
				let user = sessionStorage.arrays
				return user
			},
			setActive() {
				return this.$route.path.replace('/', '');
			}
		},
		methods: {
			todoli(index) {
				console.log(this.currentIndex)
				this.currentIndex = index;
				this.$router.push('/myaccount/query'+index);
			},
			
		}
	}
</script>
</script>
<style lang="scss" scoped>
	.listul {
		/*width: 100%;*/
		margin: 0 auto;
		overflow: hidden;
		li {
			float: left;
			width: 100%;
			display: flex;
			padding: 15px;
			border-bottom: 1px solid #f3f3f3;
		}
		li:hover {
			background: #fff7f2;
		}
		.palletimg {
			flex: 1;
			text-align: center;
			img {
				width: 100px;
				margin-top: 5px;
			}
		}
		.palletinfo {
			flex: 1.5;
			text-align: center;
			padding-left: 51px;
			.hui {
				display: inline-block;
				border: 2px solid #e13b07;
				padding: 2px 5px;
				border-radius: 4px;
				color: #e13b07;
				font-size: 16px;
			}
			.price {
				color: #ff6d00;
				font-size: 26px;
			}
			.texts {
				padding: 20px 0;
				text-align: left;
				font-size: 12px;
				.tp_name {
					color: #666;
					font-size: 18px;
				}
			}
			.text {
				padding-top: 21px;
			}
		}
	}
</style>