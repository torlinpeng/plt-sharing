<template>
	<div class="wrapper">
		<myheader></myheader>
		<div class="binds">
			<bindinfo></bindinfo>
		</div>
		
	</div>

</template>
<script>
	import Myheader from '../common/Myheader'
	import Bindinfo from '../account/queryMyInfo'
	import cityData from '../common/addres.json'
	export default {
		data() {
			return{}
		},
		components: {
			Myheader,
			Bindinfo
		}
		
	}
</script>
<style lang="scss" scoped>
	.wrapper {
		background: #F6FAFB;
		position: relative;
		margin: 0 auto;
		width:100%;
	}
	.binds{
		width: 1200px;
		margin: 0 auto;
	}
</style>