<template>
	<div>
		<h2>个人中心</h2>
		<!-- 如果用用户信息，显示用户信息 -->
		<p v-if="$store.state.user.userInfo.M_LoginID">
		{{$store.state.user.userInfo.M_LoginID}},积分:{{$store.state.user.userInfo.M_Scores}} |
		<a @click.prevent="$store.dispatch('user/exit')">退出</a>
		</p>
		<!-- 否则显示登录 注册 -->
		<p v-else><router-link to="/login">登录</router-link> | <router-link to="/register">注册</router-link></p>
		
	</div>
</template>

<script>
	import { GetUserInfo,Exit} from '@/api/user/index.js'
	// 目标 获取用户名和积分
	export default {
		data(){
			return {
				userInfo:{},//用户信息
				}
		},
		created(){
			// this.getUserInfo();
			// 组件创建完毕 去获取用户信息
			this.$store.dispatch('user/getUserInfo')
		},
		methods:{
			exit(){
				// 退出
				Exit()
				.then(res=>{
					if(res.data.status){ //如果status为1
					sessionStorage.removeItem("token") //删除token
						this.userInfo = {}; //清空用户信息
						this.$notify({ type: 'success', message: '退出成功' });
						// 提示用户退出成功
					}
				})
				.catch(err=>console.log(err))
			},
			getUserInfo(){
				// 通过get 去获取用户信息
				GetUserInfo()			 
				.then(res=>{
					if(res.data){
						this.userInfo = res.data;
						// 获取到的用户信息赋值给 userInfo
					}
				})
			}
		}
	}
</script>

<style>
</style>
