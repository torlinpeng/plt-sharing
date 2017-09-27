<template>
	<div class="layout">
		<myheader></myheader>
		<div class="contents">
		<Row type="flex">
			<i-col span="4" class="layout-menu-left">
				<ul class="listul" id="listul">
					<li v-for="(item,index) in lidata" @click="todoli(index)" :class="{active:currentIndex==index}">
						{{item.name}}
					</li>
				</ul>
			</i-col>
			<i-col span="20">
				<div class="layout-content">
					<div class="layout-content-main">
						<transition mode="out-in">
							<router-view></router-view>
						</transition>
					</div>
				</div>
			</i-col>
		</Row>
		</div>
		<myfooder></myfooder>
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
				currentIndex:0,
				lidata: [{
						name: '账户管理',
						link:''
					}, {
						name: '我的账户',
						link:'/myaccount/queryIncome'
					}, {
						name: '账单查询',
						link:'/myaccount/queryBill'
					}, {
						name: '我的资产',
						link:'/myaccount/queryAssets'
					}, {
						name: '托盘管理',
						link:''
					},
					{
						name: '托盘业务办理',
						link:'/myaccount/queryTask'
					},
					{
						name: '订单记录',
						link:'/myaccount/queryRecord'
					},
					{
						name: '合约查询',
						link:'/myaccount/queryContract'
					},
					 {
						name: '我的信息',
						link:''
					},{
						name: '信息认证详情',
						link:'/myaccount/queryMyInfo'
					},{
						name: '密码修改',
						link:'/myaccount/changePassword'
					},
				]
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
				this.currentIndex = index;
//				this.$router.push('/myaccount/query'+index);
                var links= this.lidata[index].link
                this.$router.push(links);

			},
			
		}
	}
</script>
<style lang="scss" scoped>
	.layout {
		background: #F6FAFB;
		position: relative;
	}
	.layout-breadcrumb {
		padding: 10px 15px 0;
	}
	.layout-content {
		border: 1px solid #ddd;
		min-height: 600px;
		margin: 10px 0 15px 15px;
		overflow: hidden;
		background: #fff;
		border-radius: 4px;
	}
	.contents{
		width: 1280px;
		margin: 20px auto;
	}
	.layout-menu-left {
		background: #fff;
		margin:10px 0 15px 0;
		border-radius: 3px;
		border: 1px solid #ddd;
		li {
			text-align: left;
			text-indent: 20%;
			width: 100%;
			float: left;
			height: 40px;
			line-height: 40px;
			color: #80848F;
			cursor: pointer;
		}
		li:hover {
			background: #F05700;
			color: #fff;
		}
		li:nth-child(1),
		li:nth-child(5),
		li:nth-child(9) {
			font-size: 14px;
			background: #E6E6E6;
			/*font-weight:bold ;*/
			/*border-bottom: 2px solid #F6FAFB;
			border-top: 2px solid #F6FAFB;*/
			color: #80848F !important;
		}
		li:nth-child(1){
			border-top-right-radius: 3px;
			border-top-left-radius: 3px;
			border-top:none;
		}
		li:nth-child(1):hover,
		li:nth-child(5):hover,
		li:nth-child(9):hover {
			background: #E6E6E6;
			font-size: 14px;
			/*background: #F2F2F2;*/
		}
	}
	.active {
		background: #ffb56c;
		color: #fff !important;
	}
</style>