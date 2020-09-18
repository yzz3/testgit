<template>
	<div>
		<h1>星球</h1>
		<p>{{$store.state.user.name}}</p>
		<p @click="$store.commit('user/changeName')">改名</p>
		 <button @click="$store.dispatch('user/addNum')">actions</button>
		 <br>
		  <button>{{$store.getters["user/nameLen"]}}</button>
		  <p v-if="$store.state.user.userInfo.M_LoginID">
		  {{$store.state.user.userInfo.M_LoginID}},积分:{{$store.state.user.userInfo.M_Scores}} |
		  <a @click.prevent="$store.dispatch('user/exit')">退出</a>
		  </p>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	// 通过令牌获取 笑话信息
	export default {
		created(){
			this.getJoks();
		},
		methods:{
			getJoks(){
			request.get("/mi/list2.php")
				.then(res=>{
					console.log(res.data);
				})
			}
		}
	}
</script>

<style>
</style>
