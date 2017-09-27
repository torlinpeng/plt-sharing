import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)

const state = {
//picked:Array,
//Id:Number,
//eidtAddress:{},
//params:{}
renttypes:{},
userinfo:{},
rentatm:{},
signit:{},
loadingshow:false
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
