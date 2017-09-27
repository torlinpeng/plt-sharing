<template>
	<div class="">
		<myheader></myheader>
		<div class="siwper" style="position: relative;">
			<div class="tabs">
					<div>
						<ul>
							<li @click="doSome(1)" id="rent" v-bind:class="{active: !isActive}">快速租托盘</li>
							<!--<li @click="doSome(2)" id="repay" v-bind:class="{active:isActive}" style="border-top-right-radius: 3px;">还托盘</li>-->
						</ul>
					</div>
					<div class="tab-one">
						<div class="tab-input">
							产品类型：
						     <Select v-model="rparam.prodtype" style="width:250px">
								<Option v-for="item in prod_type" :value="item.itemCode" :key="item.itemCode">{{ item.itemText }}</Option>
							</Select>
						</div>
						<div class="tab-input" v-if="isActive">
							租托数量：
							<Input v-model="rparam.amount" :maxlength="5" onKeyPress="if (event.keyCode!=46 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false" placeholder="请输入数量" style="width: 250px;"></Input>
						</div>
						<div class="tab-input">
							预租时间：
							<Date-picker type="date" :editable="false" v-model="rparam.retuDate" :options="options3" placeholder="选择日期和时间" style="width: 250px"></Date-picker>
						</div>

						<div class="tab-input">
							<Button @click="submit()" type="warning" style="width: 315px;height: 38px; font-size: 16px;background:#FF6600;">{{doSthing}}</Button>
						</div>
					</div>
				</div>
			<Carousel autoplay :autoplay-speed="4000" v-model="swaper1">
				<Carousel-item v-for="item in swpierimg" :key="item.text">
					<div class="demo-carousel">
						<img :src=item.imgsrc alt="item.text">
					</div>
				</Carousel-item>
			</Carousel>
			<!--<div class="fastdo">-->
				
			<!--</div>-->
		</div>
		<div class="product">
			<div class="product-right">
				<div class="hotcar-libox">
					<div class="hotcar-classify clear_float" id="hotCartype">
						<div class="product-left" @click="$router.push({path: '/rents'})">
							<!--<h2>热租托型</h2>-->
							<div class="proleft_texts">
								<img :src="pro_left" />
								<div class="proleft_txt">
									<p class="p1">轻型九脚型托盘</p>
									<p class="p2">静载3.0T|动载1.5T|￥0.10/天起</p>
								</div>
							</div>
						</div>
						<div class="ones" @click="$router.push({path: '/rents'})">
							<div class="onescon">
								<img class="hots" src="../../../static/palletimg/hot.png">
								<div class="proleft_txt">
									<p class="p1">重型川字型托盘</p>
									<p class="p2">静载6.0T|动载2.0T|￥0.23/天起</p>
								</div>
								<img src="../../../static/palletimg/tp1002.png">
							</div>
						</div>
						<div class="twos" @click="$router.push({path: '/rents'})">
							<div class="onescon">
								<img class="hots" src="../../../static/palletimg/hot.png">
								<div class="proleft_txt">
									<p class="p1">重型田字型托盘</p>
									<p class="p2">静载6.0T|动载2.0T|￥0.23/天起</p>
								</div>
								<img src="../../../static/palletimg/tp1001.png">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="itemlist">
			<div class="servers">
				<ul>
					<li>
						<img src="../../assets/img/sy-city.png" />
						<p>100多个城市</p>
					</li>
					<li>
						<img src="../../assets/img/sy-net.png" />
						<p>150多服务网点</p>
					</li>
					<li>
						<img src="../../assets/img/sy-tp.png" />
						<p>三种托盘款式</p>
					</li>
					<li>
						<img src="../../assets/img/sy-time.png" />
						<p>7x24小时服务</p>
					</li>
					<li>
						<img src="../../assets/img/sy-map.png" />
						<p>全国租托</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="typeSelect z-graybg">
			<div class="zc_main">
				<ul>
					<li v-for="(item,index) in products">
						<h2>{{item.name}}</h2>
						<img :src="item.url" @mouseenter="enter(index)" @mouseleave="leave(index)" />
						<p>{{item.txt}}</p>
						<Button :disabled='disa' @click="torent(index+1)">我要租托</Button>
					</li>
				</ul>
			</div>
		</div>
		<div class="news">
			<div class="new-titles">
				<p><span class="new-themes">资讯中心</span></p>
				<p><span class="new-jianjie">最新的行业资讯，高态度的深度解读</span></p>
			</div>
			<div class="picture">
				<div class=
					"pics">
					<div class="picture-img">
						<a target="_blank" href="https://mp.weixin.qq.com/s/FvWNFVyUm9rBXZgIKfLmbw">
							<img src="../../../static/swiper/sy-new1.png" /></a>
					</div>
					<div class="pic-theme">
						<span>普拉托科技与城市之星达成战略合作</span>
					</div>
				</div>
				<div class="pics">
					<div class="picture-img">
						<a target="_blank" href="https://mp.weixin.qq.com/s/Ol7aJlPlw4NR9QuyPv_XRA">
							<img src="../../../static/swiper/sy-new2.png" /></a>
					</div>
					<div class="pic-theme">
						<span>普拉托携手广东省物流行业协会，提供托盘共享解决方案</span>
					</div>
				</div>
				<div class="pics">
					<div class="picture-img">
						<a target="_blank" href="https://mp.weixin.qq.com/s/wSbXRqDPomMrLYwBE1_HlA">
							<img src="../../../static/swiper/sy-new3.png" /></a>
					</div>
					<div class="pic-theme">
						<span>传统企业如何降低20%的物流成本？</span>
					</div>
				</div>
			</div>
		</div>
		<myfooder></myfooder>
	</div>

</template>

<script>
	import Myheader from './Myheader'
	import Myfooder from './Myfooder'
	import cityData from './addres.json'
	export default {
		data() {
			return {
				swaper1: 0,
				doSthing: '立即租托',
				isActive: true,
				pro_left: './static/swiper/pro-left.png',
				obj: {},
				value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
				data: cityData,
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 86400000;
					}
				},
				disa: false,
				prod_type:[{
					itemCode:'1',
					itemText:'普惠托'
				  },{
					itemCode:'2',
					itemText:'随心托'
				   },{
					itemCode:'3',
					itemText:'快易托'
				   },{
					itemCode:'4',
					itemText:'顺风托'
				   },{
					itemCode:'5',
					itemText:'vip专享'
				   },
				],
				rparam: {
					adress: [],
					amount: '',
					dateNum: '',
					tab: 'returns',
					retuDate: '',
					prodtype:''
				},
				swpierimg: [{
						text: '首页海报',
						imgsrc: './static/swiper/swaper3.png'
					},
					{
						text: '首页海报',
						imgsrc: './static/swiper/swaper4.png'
					}, {
						text: '首页海报',
						imgsrc: './static/swiper/swaper5.png'
					}
				],
				products: [{
						name: '随心托',
						txt: ' 随时随地随心租托',
						url: './static/palletimg/c000.png'
					},
					{
						name: '普惠托',
						txt: '标准实惠租赁服务',
						url: './static/palletimg/c001.png'
					},
					{
						name: '快易托',
						txt: '带托运输标准套餐',
						url: './static/palletimg/c002.png'
					},
					{
						name: '顺风托',
						txt: '带托运输特价套餐',
						url: './static/palletimg/c003.png'
					}
				]
			}
		},
		mounted() {
		},
		components: {
			Myheader,
			Myfooder,
		},
		methods: {
			goto() {
				if(sessionStorage.logined) {
					this.$router.push('/rent');
				} else {
					this.$router.push('/login');
				}
			},
			torent(it) {
				var rentType = {}
				if(it == 1) {
					rentType.name = 'sxt'
					this.$router.push('/palletList');
				}
				if(it == 2) {
					rentType.name = 'pht'
					this.$router.push('/palletList');
				}
				if(it == 3) {
					rentType.name = 'kyt'
					this.$router.push('/palletList');
				}
				if(it == 4) {
					rentType.name = 'sft'
				}
				this.$store.commit('rentType', rentType.name)

			},

			enter(key) {
				this.products[key].url = './static/palletimg/c0' + key + '.png'
			},
			leave(key) {
				this.products[key].url = './static/palletimg/c00' + key + '.png'
			},
			doSome(key) {
				if(key == 1) {
					this.isActive = true
					this.doSthing = "立即租托"
				} else {
					this.isActive = false
					this.doSthing = "我要还托"
				}
			},
			submit() {
				if(this.isActive == true) {
					this.$store.commit('rentATM', this.rparam)
					this.$router.push('/rents');
				} else {
					this.$store.commit('rentATM', this.rparam)
					this.$router.push('/myaccount/queryTask');
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.address-picker select {
		height: 28px !important;
	}
	
	.demo-carousel {
		width: 100%;
		img {
			width: 100%;
			min-width: 1180px;
		}
	}
	
	.active {
		color: #60606C;
		background: #f0f1f3;
		border-bottom: none;
	}
	
	.typeSelect {
		min-width: 1180px;
		width: 100%;
		padding: 50px 0;
	}
	
	.z-graybg {
		background-color: #fff;
	}
	
	.zc_main {
		width: 1180px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		text-align: center;
		li {
			width: 279px;
			height: 350px;
			float: left;
			background-color: #fff;
			border: 1px solid #ddd;
			margin-left: 20px;
			h2 {
				font-size: 20px;
				color: #2f2f39;
				text-align: center;
				font-weight: 400;
				line-height: 75px;
				padding-top: 6px;
			}
			img {
				width: 120px;
				height: 120px;
				cursor: pointer;
			}
			p {
				color: #939a9f;
				font-size: 14px;
				text-align: center;
				line-height: 42px;
				padding-bottom: 18px;
			}
			Button {
				display: inline-block;
				width: 160px;
				height: 40px;
				font-size: 14px;
				margin: 0 auto;
				text-align: center;
				color: #939a9f;
				border-radius: 3px;
				border: 1px solid #939a9f;
				cursor: pointer;
			}
			Button:hover {
				background-color: #FF9600;
				color: #fff;
				border: none;
			}
		}
		li:nth-child(1) {
			margin-left: 0px;
		}
	}
	
	/*.fastdo {
		width: 1180px;
		margin: 0 auto;*/
		.tabs {
			width: 390px;
			height: 355px;
			position: absolute;
			z-index: 900;
			margin: 68.5px;
			background: #fff;
			border-radius: 3px;
			-webkit-box-shadow: #666 0px 0px 10px;
			-moz-box-shadow: #666 0px 0px 10px;
			.ztp {
				border-right: 1px solid #E4E6E9;
				border-top-left-radius: 3px;
				border-bottom: none;
				background: #FFF;
			}
			li {
				list-style: none;
				float: left;
				height: 50px;
				/*width: 50%;*/
				width: 100%;
				border-bottom: 1px solid #f2f3f9;
				line-height: 50px;
				text-align: center;
				font-size: 16px;
				cursor: pointer;
			}
			.tab-one {
				width: 320px;
				margin: 0 auto;
				margin-top: 90px;
				.tab-input {
					width: 100%;
					margin-top: 30px;
				}
			}
		}
	/*}*/
	
	.product {
		display: flex;
		width: 1180px;
		margin: 0 auto;
		padding: 25px 0;
		overflow: hidden;
		.product-right {
			width: 100%;
			.hotcar-libox {
				padding-top: 34px;
				.clear_float {
					zoom: 1;
				}
				.hotcar-classify {
					display: flex;
					.ones,
					.twos {
						flex: 1;
						text-align: center;
						cursor: pointer;
						.onescon {
							margin: 0 10px;
							height: 394.3px;
							position: relative;
							border: 1px solid #ddd;
							.proleft_txt {
								color: #fff;
								text-align: center;
								padding: 35px 0;
								width: 100%;
								letter-spacing: 2px;
								background: #ffb56c none repeat scroll !important;
								/*实现FF背景透明，文字不透明*/
								filter: Alpha(opacity=20);
								/*实现IE背景透明*/
								.p1 {
									font-size: 24px;
									position: relative;
								}
								.p2 {
									font-size: 16px;
									position: relative;
								}
							}
							.hots {
								margin: 0;
								position: absolute;
								left: -7px;
                                top: -3px;
								z-index: 990;
							}
							img {
								margin-top: 18px;
							}
						}
					}
					.product-left {
						flex: 1;
						cursor: pointer;
						h2 {
							padding: 4px 0;
							font-weight: 400;
						}
						.proleft_texts {
							background-size: 100%;
							margin: 0 10px;
							color: #fff;
							position: relative;
							img {
								width: 100%;
								height: 392.5px;
								position: absolute;
							}
							.proleft_txt {
								position: absolute;
								color: #fff;
								text-align: center;
								padding: 35px 0;
								width: 100%;
								letter-spacing: 2px;
								background: rgba(0, 0, 0, 0.4) none repeat scroll !important;
								/*实现FF背景透明，文字不透明*/
								background: #000;
								filter: Alpha(opacity=20);
								/*实现IE背景透明*/
								.p1 {
									font-size: 24px;
									position: relative;
								}
								.p2 {
									font-size: 16px;
									position: relative;
								}
							}
						}
					}
					.twos {
						border-left: none;
					}
				}
			}
		}
	}
	
	.itemlist {
		width: 100%;
		height: 100px;
		background: #f2f2f2;
		padding: 22px 0;
		overflow: hidden;
		.servers {
			width: 1180px;
			margin: 0 auto;
			overflow: hidden;
			li {
				width: 20%;
				list-style: none;
				float: left;
				text-align: center;
				img {
					height: 35px;
				}
			}
		}
	}
	
	.news {
		width: 100%;
		cursor: pointer;
		margin-bottom: 55px;
		overflow: hidden;
		.new-titles {
			text-align: center;
			margin-bottom: 30px;
			.new-themes {
				font-size: 22px;
			}
			.new-jianjie {
				font-size: 15px;
			}
		}
		.picture {
			width: 1180px;
			margin: 0 auto;
			.pics {
				width: 380px;
				float: left;
				position: relative;
				img {
					width: 100%;
				}
			}
			.pics:nth-child(2) {
				margin: 0 20px;
			}
			.pic-theme {
				position: absolute;
				width: 100%;
				background: #666;
				margin-top: -35px;
				height: 30px;
				line-height: 30px;
				opacity: 0.7;
				font-size: 14px;
				color: #fff;
				z-index: 999;
				text-indent: 10px;
			}
		}
	}
</style>