<template>
	<div class="layout">
		<store-header></store-header>
		<div class="contents">
		<Row type="flex">
			<i-col span="4" class="layout-menu-left">
				<ul class="listul" id="listul">
					<li>出库任务</li>
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
	</div>
</template>
<script>
	import storeHeader from './storeHeader'
	export default {
		components: {
			storeHeader,
		},
		data() {
			return {
				currentIndex:0,
				lidata: [
				     {
						name: '出库管理',
						link:'/outStore'
					}, {
						name: '入库管理',
						link:'/putStore'
					},
					{
						name: '库存查询',
						link:'/queryStock'
					},{
						name:'账单查询',
						link:'queryStoreBill'
					},
					{
						name: '密码修改',
						link:'/storeKeeper'
					}
				]
			}
		},
		methods: {
			todoli(index) {
				this.currentIndex = index;
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
		height: 100%;
	}
	.layout-breadcrumb {
		padding: 10px 15px 0;
	}
	.layout-content {
		min-height: 600px;
		margin: 10px 15px 15px;
		overflow: hidden;
		background: #fff;
		border-radius: 4px;
	}
	.contents{
		width: 1280px;
		margin: 20px auto;
		background: #F6FAFB;
	}
	.layout-menu-left {
		background: #fff;
		margin: 8px 0 15px 0;
		border-radius: 3px;
		li {
			text-align: center;
			width: 100%;
			float: left;
			height: 50px;
			line-height: 50px;
			color: #80848F;
			font-size: 14px;
			cursor: pointer;
			border-bottom: 2px solid #F6FAFB;
		}
		li:hover {
			background: #FFAE77;
			color: #fff;
		}
		li:nth-child(1){
			background: #CCC;
			color: #fff;
		}

	}
	.active {
		background: #FFAE77;
		color: #fff !important;
	}
</style>