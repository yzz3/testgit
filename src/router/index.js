import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Cate from '../views/Cate/index.vue'
import Ball from '../views/Ball' //导入
// import Product from '../views/Product' //导入
import Admin from '../views/Admin' //导入
import Ucenter from '../views/Admin/Ucenter.vue' //导入
import Activity from '../views/Admin/Activity.vue' //导入
import User from '@/views/User/index.vue'
import Login from '@/views/User/login.vue'
import Register from '@/views/User/register.vue'
import Cart from '@/views/Cart'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
	alias:["/home","/main"],
	// 起别名
    name: 'Home',
    component: Home,
	meta:{keep:true}
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
	// children 指定子路由配置
	children:[
		{path:"ucenter",component:Ucenter},
		{path:"activity",component:Activity},
		{path:"",redirect:'ucenter'},
		// 重定向
	]
  },
  {
    path: '/cate',
    name: 'Cate',
    component: ()=>import( /* webpackChunkName:"category" , webpackPrefetch: true  */  '../views/Cate/index.vue'),
	meta:{keep:true}
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ()=>import(/* webpackChunkName: "product" */ '../views/Product/index.vue')
  },
  {
    path: '/ball', //配置
    name: 'Ball',
    component: Ball,
	beforeEnter(to,from,next){
		/* if(window.sessionStorage.getItem("token")){
			next(true);
		}else{
			next("/login?redirect="+to.fullPath);
			// 
		} */
		next();
		
	}
	
  },
  {
	  path:"/cart",
	  name:'Cart',
	  component:()=>import(/* webpackChunkName: "cart" */ '../views/Cart/index.vue'),
	  meta:{requireAuth:true} //meta 路由元信息 requireAuth 需要权限（自定义）
  },
  {
    path: '/user', //配置
    name: 'User',
    component: User,
	meta:{requireAuth:true,keep:true}
  	
  },
  {
    path: '/login', //配置
    name: 'Login',
    component: Login,
  	
  },
  {
    path: '/register', //配置
    name: 'Register',
    component: Register,
  	
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
	if(to.meta.requireAuth){ //如果需要权限判断页面，进行判断
		if(window.sessionStorage.getItem("token")){ //如果已经登录
			next(true);
		}else{ //跳转到行了页面
			next("/login?redirect="+to.fullPath);
			// 
		}
	}else{
		next(true); //直接跳转到to
	}
})
export default router
