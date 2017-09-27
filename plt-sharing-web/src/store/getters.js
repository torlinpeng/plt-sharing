export default {

getRentType:state => {
    return state.renttypes
},
getUserInfo:state=>{
	return state.userinfo
},
getRentAtm:state => {
    return state.rentatm
},
getSignIt:state => {
    return state.signit
},
getLoadingShow:state=>{
	return state.loadingshow
}
}