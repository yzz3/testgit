import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user.js' //导入user模块
// 01 导入
import { Dialog } from 'vant';//导入对话框
import request from '@/utils/request.js'
Vue.use(Vuex)
import getters from './getters.js'

export default new Vuex.Store({
  state: {
	  goods:[]
  }, 
  // 数据状态存放  相当于vue的 data
  // 组件内访问 $store.state.goods
  getters,
 // 从现有数据计算出新的数据，相当于vue的 compouted
 // $store.getters.goodLen
  mutations: {
	// 添加到购物车
	  addCart(state,item){
		  console.log(item,"addtoCart")
		  
		  var canAdd = true; //是否可以添加
		  state.goods.forEach(it=>{
			  if(it.goods_id==item.goods_id){
				  canAdd = false; //如果有重复的canpush为false
				  it.num+=parseInt(item.num)//如果是重复就加数字
				  if(it.num>it.buy_limit){ //如果num超过了购买限量等于购买限量
					  it.num = it.buy_limit;
					  alert("最多可以购买"+it.buy_limit+"件");
				  }
			  }
		  })
		  if(canAdd){
			 state.goods.unshift(item); 
		  }
		  // 先查找 在goods 里面的数据 和当前item 有没有一样的
		  // 如果没有一样的unshift
		  // 如果有一样的让num加1
		  // 如果超过了 buy_limit 让 num 等于buy_limit 可以提示该用户最多可以购买buy_limit件商品
	  },
	  // 02 定义一个方法
	  delCart(state,item){
		  // 删除前弹出对话框 
		  // 使用前先导入import { Dialog } from 'vant';
		  Dialog.confirm({
		 
		    message: '主人您真的要放弃我吗！',
		  })
		    .then(() => {
		      // on confirm
				var ind = state.goods.indexOf(item); //item在goods下所在的id
				if(ind!=-1){ //只要能查找到
					state.goods.splice(ind,1); //删除
				}
		    })
		    .catch(() => {
		      // on cancel
		    });
	  },
	  initCart(state,goods){
	  		  state.goods = goods;
	  }
  },
  // 方法处理集合   相当于 vue的 methods
  // $store.commit('delCart',item)
  actions: {
	  /**
	   * getCart 获取到购物车数据
	   * */
	  getCart(context){
		  // console.log(context,"context");
		  request.get("/mi/cart.php")
		  .then(res=>{
			  context.commit("initCart",res.data)
			  // 执行mutations中的方法
		  })
		  .catch(err=>console.log(err))
	  }
  },
  // 异步方法的集合   相当于vue的 methods
  modules: {
	  user,
  },
  // 模块（把全局数据进一步分组）
})
