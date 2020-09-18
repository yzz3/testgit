<template>
  <div id="app">
	  <!-- 存放页面 -->
		<keep-alive>
			<router-view class="pages" v-if="$route.meta.keep"></router-view>
		</keep-alive>
			<router-view class="pages" v-if="!$route.meta.keep"></router-view>    
		

	<div class="tabs" v-if="showTabs">
		<router-link to="/" class="col thome">
			<span>首页</span>	
		</router-link>
		<router-link   to="/cate" class="col tcat"><span>分类</span>	</router-link>
		<router-link to="/ball" class="col tball"><span>星球</span></router-link>
		<router-link to="/cart" class="col tcart"><span style="position: relative;">购物 <i class="tag">{{$store.getters.goodLen}}</i ></span></router-link>		
		<router-link to="/user" class="col tuser"><span>我的</span></router-link>
	</div>
	<!-- 底部栏导航 -->
  </div>
</template>
<script>
	import bus from '@/utils/bus.js'
	export default{
		data(){return { showTabs:true}},
		created(){
			 
			 
			bus.$on("tabschange",$event=>{this.showTabs =$event;console.log("$event",$event)})
			// 监听tabschange（自定义事件） 设置showTabss值为事件的值
			this.$store.dispatch("getCart");
			this.$store.dispatch('user/getUserInfo');//获取用户信息
		}
	}
</script>
<style >
	.tag{ 
		background-color:orangered; 
		color:#fff; 
		border-radius: 50%; 
		position: absolute; 
		right:0;top:0; 
		padding: 4px; 
		min-width: 20px; 
		min-height: 20px; 
		font-size: .18rem; 
		transform: translate(50%,-50%);
		font-style: normal
		/* 背景; 文字颜色；圆角半径；定位有上角； 内边距；最小宽；最小高；文字大小，再位移50%；文字正常 */
		}
</style>
<style>
/* *{ margin: 0; padding: 0;} */
/* 工作中用reset.css 代替 */
body{ color: #484848;}
a{ color: #333;}
#app{
	display: flex;
	flex-direction: column;
	position: absolute;
	left:0;
	top:0;
	right: 0;
	bottom:0
}
.pages{
	flex:1;
	overflow: auto;
}
/* 导航开始 */
.tabs{ height: .98rem; display: flex; text-align: center;font-size: 0.18rem;}
.col{ flex:1;}
.tabs span:before{
	content:"";
	display:block;
	height:.52rem;
	width: .52rem;
	margin: 0.08rem auto;
	/* background-color:#f0f0f0; */
	background-image: url(assets/home.png);
	background-repeat: no-repeat;
	background-size: cover;
}
.router-link-exact-active{ color: #f70;}
.tcat span:before{
	background-image: url(assets/cat.png);
}
.tball span:before{
	background-image: url(assets/ball.png);
}
.tcart span:before{
	background-image: url(assets/cart.png);
}
.tuser span:before{
	background-image: url(assets/user.png);
}
.thome.router-link-exact-active span:before{
	background-image: url(assets/home-h.png);
}
.tcat.router-link-active span:before{
	background-image: url(assets/cat-h.png);
}
.tball.router-link-active span:before{
	background-image: url(assets/ball-h.png);
}
.tcart.router-link-active span:before{
	background-image: url(assets/cart-h.png);
}
.tuser.router-link-active span:before{
	background-image: url(assets/user-h.png);
}
/* 导航结束 */
</style>
