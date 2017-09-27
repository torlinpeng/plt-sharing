<template>
	<div class="mains">
		<div class="neirong">
			<change-pwd></change-pwd>
		</div>
	</div>
</template>
<script>
	import changePwd from '../user/changePwd'
	export default {
			components: {
			changePwd
		}
	}
</script>
<style lang="scss" scoped>
	 .neirong{
	 	margin: 20px;
	 }
</style>