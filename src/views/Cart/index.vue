
<template>
	<div class="cart">
		<div class="header">
			<van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="$router.back()">
			  <template #right>
			    <van-icon name="search" size="20" />
			  </template>
			</van-nav-bar>
		</div>
		<div class="content" v-if="goods.length>0">
	 
			 
				 <div class="item" v-for="item in goods" :key="item.goods_id">
					 <div class="col-10" style="display: flex; align-items: center; justify-content: center;">
						  <van-checkbox v-model="item.select" checked-color="#f70"></van-checkbox>
						  <!-- 03 radio 改成 checkbox -->
					 </div>
					 <div class="col-25">
						 <img :src="item.img_url" width="85%" alt="">
					 </div>
					 <div class="col-55">
						 <p>{{item.name}}</p>
						 <p>售价：{{item.price}}</p>
						 <p><van-stepper v-model="item.num" min="1" :max="item.buy_limit" /></p>
					 </div>
					 <!-- 04 @click="$store.commit('delCart',item)" -->
					 <!-- @click="$store.commit('delCart',item)" -->
					 <div 
					 @click="delCart(item)"
					 class="col-10"  
					 style="display: flex; align-items: center; justify-content: center;">
						 <van-icon name="delete" />
					 </div>
				 </div>
					 
			 
		</div>
		<div class="foot">总价{{totalPrice}} 、/总{{goodLen}}件商品</div>
	</div>
</template>

<script>
	// 导入映射方法
	import {mapState,mapGetters,mapMutations,mapActions,} from 'vuex';
	// 获取购物车数据
	import { Icon,Checkbox, CheckboxGroup,Stepper,NavBar } from 'vant';
	import bus from '@/utils/bus.js'
	import request from '@/utils/request.js'
	export default{
		computed:{
			...mapGetters(["totalPrice","goodLen"]),
			...mapState(["goods"])
			// 把vuex中的state 映射为组件中 computed里面的属性
		},
		methods:{
		   ...mapMutations(["delCart"])
		   // 把vuex中的mutation方法 映射为 组件中methods方法
		   
		},
		components:{
			[Icon.name]:Icon,
			[Checkbox.name]:Checkbox,
			[CheckboxGroup.name]:CheckboxGroup,
			[Stepper.name]:Stepper,
			[NavBar.name]:NavBar,
			
			
		},
		beforeRouteEnter(to,from,next) {
			// to 要进入的路由，
			// from 从哪个路由过来
			// next 下一步 （必须要执行）
			// 这么没有this
	/* 		console.log(to,"to");
			console.log(from,"from");
			// alert("进入购物车前");
			if(window.sessionStorage.getItem("token")){
				alert("用户已经登录，允许进入")
				next(true);
			}else{
				alert("用户没有登录，请先登录")
				next("/login?redirect="+to.fullPath);
			} */
			// next(true); //允许进入  next("/user")// 跳转到user页面 next(false) 不允许进入
		   next();
		},
		beforeRouteLeave(to,from,next){
			console.log("beforeRouterLeave")
			next();
		},
		beforeRouteUpdate(to,from,next){
			console.log("beforeRouterUpdate")
			next();
		},
		beforeCreate(){
			bus.$emit("tabschange",false)
		},
		beforeDestroy(){
			bus.$emit("tabschange",true)
		},
		// destroyed(){
			
		// },
		created(){
			// this.getCart()
		},
		data(){
			return {}
		},
		mounted(){
			bus.$emit("tabschange",false)
		},
		
	}
</script>

<style scoped="scoped">
	.item{ display: flex;}
	.col-10{flex-basis: 10%; max-width: 10%;}
	.col-25{flex-basis: 25%; max-width: 25%;}
	.col-55{flex-basis: 55%; max-width: 55%;}
	 
	.cart{
		display: flex;
		flex-direction: column;
	}
	.content{
		flex:1;
		overflow: auto;
	}
	.foot{
		height: 1.2rem;
		
	}
</style>
