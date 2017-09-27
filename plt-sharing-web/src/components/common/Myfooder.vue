<template>
	<div class="website-guide clear_float">
		<div class="foodter">
			<!--<dl>
					<dt class="wguide-tit">事务处理</dt>
					<dd>
						<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">保险责任</a>
					</dd>
					<dd>
						<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">理赔说明</a>
					</dd>
					<dd>
						<router-link to="/login">事故处理</router-link>
					</dd>
				</dl>-->
			<!--<dl>
					<dt class="wguide-tit">安全保障</dt>
					<dd>
						<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">服务责任</a>
					</dd>
					<dd>
						<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">安全保障</a>
					</dd>
					<dd>
						<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">合作机构</a>
					</dd>
				</dl>-->
			<dl>
				<dt class="wguide-tit">资讯中心</dt>
				<dd>
					<a href="https://mp.weixin.qq.com/s/yi-2744zeH09wuwr4uoMFw" target="_blank" rel="nofollow">产品介绍</a>
				</dd>
				<dd>
					<a href="https://mp.weixin.qq.com/s/GIYENooh0sE98x8urHz3wA" target="_blank" rel="nofollow">普惠托介绍</a>
				</dd>
				<dd>
					<a href="http://mp.weixin.qq.com/s/bGha9OLogBhVcVVZ_tqILQ" target="_blank" rel="nofollow">随心托介绍</a>
				</dd>
			</dl>
			<dl>
				<dt class="wguide-tit">友情链接</dt>
				<dd>
					<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">普拉托官网</a>
				</dd>
				<dd>
					<a @click="$router.push({path: '/storeLogin'})">普托仓库</a>
				</dd>
				<dd>
					<a href="http://www.akei.com.hk/about1.asp" target="_blank" rel="nofollow">雅琪集团</a>
				</dd>
			</dl>
			<dl>
				<dt class="wguide-tit">帮助中心</dt>
				<dd>
					<!--	<a href="http://www.palletsharing.com/" target="_blank" rel="nofollow">新手入门</a>-->
				</dd>
				<dd>
					<a href="http://mp.weixin.qq.com/s/XcJSJ8OoGf3GlKa9g45L_g" target="_blank" rel="nofollow">联系我们</a>
				</dd>
				<!--<dd>
					<a href="http://mp.weixin.qq.com/s/_SCULkYXn5j5hB-TSB8llw" target="_blank" rel="nofollow">招聘信息</a>
				</dd>-->
			</dl>
			<dl class="wguide-appcode">
				<dt class="wguide-tit">微信公众号</dt>
				<dd>
					<img src="../../assets/img/wxgzh.png" style="width: 80px;margin-top: 1px;">
				</dd>
			</dl>
			<dl class="wguide-wxcode">
				<dt class="wguide-tit">官网二维码</dt>
				<dd>
					<img src="../../assets/img/gwewm.png" style="width: 80px;margin-top: 1px;">
				</dd>
			</dl>
		</div>
		<div class="beian">
			<p class="text-muted text-center">版权所有　深圳普拉托科技有限公司　粤ICP备17052486号-2　 地址：深圳市龙岗区龙岗中心城鹏达摩尔城商务中心1303</p>
		</div>

	</div>
</template>

<script>
</script>

<style>
	.website-guide {
		background: #101010;
		overflow: hidden;
		padding: 55px 0 0px;
		/*border-top: 10px solid #FF3D00;*/
	}
	
	.foodter {
		width: 1180px;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.website-guide dl {
		float: left;
		width: 14.25%;
		/*padding-right: 20px;*/
	}
	
	.website-guide dl dt {
		font-size: 16px;
		padding-bottom: 5px;
		color: #ccc;
	}
	
	.website-guide dl.wguide-appcode,
	.website-guide dl.wguide-wxcode {
		text-align: right;
		padding-right: 0;
	}
	
	.website-guide dl dd a {
		font-size: 13px;
		color: #ccc;
		text-decoration: none;
		padding: 5px 0;
		display: inline-block;
		letter-spacing: 1px;
	}
	
	.website-guide dl dd a:hover {
		color: #fff;
		font-weight: bold;
	}
	
	.wguide-tit {
		margin-bottom: 15px;
	}
	
	a {
		outline: none;
	}
	
	.beian {
		text-align: center;
		width: 100%;
		height: 55px;
	}
	.beian p{
		
			margin-top: 25px;
			display: inline-block;
			font-size: 13px;
			color: #ccc;
		}
</style>