const state = {"name":"mumu木木"};
const mutations = {
	changeName(state){
		// console.log(context);
		state.name = "曾庆林";
	}
};
const actions = {
	// 能够让购物车的第一个项，num+1
	addNum({commit,dispatch,getters,rootGetters,state,rootState}){
		rootState.goods[0].num++;
		commit('changeName');
	 
	}
	
};
const getters = {
	nameLen(state){		 
		return state.name.length;
	}
}
export default {
	state,mutations,actions,getters
}
// namespaced: true 添加命名空间
// 对state 没有 影响的