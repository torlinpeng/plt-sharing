const saveScrollPosition = {
	data() {
		return {
			scrollY: 0
		}
	},
	beforeRouteLeave(to, from, next) {
		this.scrollY = window.scrollY
		next()
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			window.scroll(0, vm.scrollY)
		})
	}
}
export {
	saveScrollPosition
}