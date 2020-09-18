import {GetUserInfo,Exit} from '@/api/user/index.js'
// 导入api 方法
/**
 * state user模块的状态
 * @property {object} userInfo 用户信息 eg:{M_LoginID:'zeng8',M_Scores:100} 积分和用户名
  * */
const state = {"name":"mumu木木",userInfo:{}};

/**
 * mutations 处理数据的方法
 * 
  * */
const mutations = {
	changeName(state){
		// console.log(context);
		state.name = "曾庆林";
	},
	
    // 设置用户信息
	setUserInfo(state,data){
		state.userInfo = data;
	},
};
const actions = {
	// 异步 获取用户信息
	// 成功后 执行 mutations中setUserInfo 方法
	getUserInfo({commit}){
		GetUserInfo()
		.then(res=>{
			commit('setUserInfo',res.data)
		})
		.catch(err=>console.log(err))
	},
	//  异步 退出
	exit({commit}){
		Exit()
		.then(res=>{
			if(res.data.status==1){
				commit('setUserInfo',{});//清空用户
				sessionStorage.removeItem("token");//token删除
			}
			
		})
		.catch(err=>console.log(err))
	},
	// 能够让购物车的第一个项，num+1
	addNum({commit,dispatch,getters,rootGetters,state,rootState}){
		rootState.goods[0].num++;
		commit('changeName');
		// 访问全局的mutation
		var item ={
			buy_limit: 20,
			goods_id: 21727,
			img_url: "//i8.mifile.cn/v1/a1/ef617fac-7489-436d-b74e-c43582f09633.jpg",
			name: "小米电视90A 800英寸",
			num: 1,
			price: 20,
			select: true}
		commit('addCart',item,{root:true})
	 
	}
	
};
const getters = {
	nameLen(state,getters, rootState, rootGetters){		 
		return state.name.length;
	}
}
export default {
	state,mutations,actions,getters,namespaced: true
}
// namespaced: true 添加命名空间
// 对state 没有 影响的