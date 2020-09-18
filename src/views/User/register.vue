<template>
	<div class="reg">
		<h1>注册</h1>
		用户名：<input type="text" v-model="reg.userid"/><br>
		密码：<input type="password" v-model="reg.userpwd"/><br>
		邮箱：<input type="email" v-model="reg.email"><br> 
		<button @click="register()">注册</button>
		
	</div>
</template>

<script>
	export default {
		methods:{
			register(){
				// 如果去掉空格后是空，那么提示用户名密码为空
				if(!this.reg.userid.trim()||!this.reg.userpwd.trim()||!this.reg.email.trim()){
					this.$notify({ type: 'danger', message: '用户名和密码不能为空' });
					// main.js
					// import Vant,{ Notify } from 'vant'
					// Vue.use(Notify);
					return;
				}
				// 发送ajax post请求 （vue.config.js 代理）
				this.$http.post(
				"/member/reg_new2.php", //请求url 
				`userid=${this.reg.userid}&userpwd=${this.reg.userpwd}&email=${this.reg.email}`,
				//请求的数据
				{headers:{"Content-Type":"application/x-www-form-urlencoded"}}
				//请求配置
				)
				.then(res=>{
					// 如果返回的status 为1 注册并登录成功
					if(res.data.status){
						alert(res.data.msg); //弹出成功信息
						this.$router.push("/user"); //跳转到用户页面
					}else{
						alert(res.data.msg); //弹出失败信息
					}
				})
				.catch(err=>console.log(err))
			}
		},
		data(){
			return{
				reg:{userid:'',
					userpwd:'',
					email:''
				}
			}
		}
	}
</script>

<style>
	.reg input{ border: 1px solid #aaa !important;}
</style>
