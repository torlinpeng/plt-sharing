var arrays = JSON.parse(sessionStorage.dics);
export default function(value, name) {
	if(name === "ztjl") { //租借
		var stutas = arrays.process_req_contract_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "ghjl") { //归还和入库
		var stutas = arrays.req_return_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "dmjl") { //报损
		var stutas = arrays.req_rptdmg_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "zhjl") { //转租
		var stutas = arrays.req_transfer_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "cplx") { //产品类型
		var stutas = arrays.product_catlog_def.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "comm") { //通用
		var stutas = arrays.comm_process_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "ckjl") { //出库
		var stutas = arrays.warehouse_leave_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "pzlx") { //品质类型
		var stutas = arrays.lease_QA_type.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "zdzt") { //账单状态
		var stutas = arrays.bill_status.options
		let texts = ''
		for(var i = 0; i < stutas.length; i++) {
			if(value == stutas[i].itemCode) {
				texts = stutas[i].itemText
			}
		}
		return texts
	}
	if(name === "jjfs") { //配送方式
		switch(value) {
			case 'Y':
				return "平台上门服务";
			case 'N':
				return "用户自助处理";
			default:
				return ''
		}
	}
}