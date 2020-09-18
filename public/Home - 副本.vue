<template>
	<div>
		<mheader></mheader>
		<subheader :tabs="tabs"></subheader>
		<swiper :gallery="gallery"></swiper>
		<page></page>
		<div v-for="item in users" :key="item.id">
			<p>{{item.name}} 年龄:{{item.age}} 
				<span v-if="item.gender==1">男</span>
				<span v-else-if="item.gender==2">女</span>
				<span v-else>保密</span>
			</p>
			<p>薪资：{{item.salary}}</p>
			<p>电话：{{item.tel}}</p>
			<p>邮箱：{{item.email}}</p>
			<p>地址： {{item.address}}</p>
			<p>个性签名：{{item.motto}}</p>
			<p>qq：{{item.qq}}</p>
			<p><img :src="item.pic" alt=""></p>
			<hr/>
		</div>
		 
	</div>	
</template>
<script>
 
	 import jsonp from 'jsonp'
	 import mheader from '@/components/Header/index.vue'
	 import subheader  from "@/components/SubHeader/index.vue"
	 import page  from "@/components/Page/index.vue"
	 import swiper from "@/components/Swiper"
 
 
	 
	 // 导入jsonp
	export default {
		components:{mheader,subheader,page,swiper},
		created(){
			this.getLocation();//获取地址
			this.getList();
			this.getMock();
			this.getMock2()
			this.echo();
			this.echo2();
			this.getUsers();//获取用户列表
			
		},
		methods:{
			getUsers(){
				this.$http.get("http://www.mi.com/api/category")
				.then(res=>console.log(res.data));
				this.$http.get("http://www.mi.com/api/users")
				.then(res=>{
					console.log(res.data.list);
					this.users=res.data.list})
				.catch(err=>console.log(err))
			},
			getMock2(){
				this.$http({
					url:"http://www.mi.com/api/list",
					params:{name:"曾庆林",age:25},
					method:"get"
				})
				.then(res=>{
					// console.log(res.data,"$http,get")
				})
				.catch(err=>console.log(err))
			},
			echo2(){
				this.$http({
					url:"http://www.mi.com/api/echo",
					method:"post",
					data:{name:"木木老师",age:18},//post/put
					headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}
				})
				.then(res=>{
					// console.log(res.data,"$http")
				})
				
			},
			// Content-Type: application/x-www-form-urlencoded;charset=utf-8 
			// Content-Type:multipart/form-data;
			// Content-Type:application/json 
			echo(){
				this.$http.post(
				"http://www.mi.com/api/echo",
				{name:"木木老师",age:18},
				// "name=木木老师&age=18",
				// {headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}
				)
				.then(res=>{
					// console.log(res.data);
				})
				.catch(err=>console.log(err))
			},
			getMock(){
				// this.$http.get("http://www.mi.com/list/?page=10")
				this.$http.get("http://www.mi.com/list/",{params:{page:10}})
				.then(res=>{
					// console.log("mock",res)
				})
			},
			getList(){
				// 02使用get方法
				this.$http.get("https://www.520mg.com/mi/list")
				.then(res=>{
					// console.log(res.data,"axios");
				})
				.catch(err=>console.log(err))
			},
			getLocation(){
				let url = "https://apis.map.qq.com/ws/location/v1/ip?key=CAABZ-AVSAQ-RDR5L-GTBDJ-HLA4O-A5FDB&output=jsonp&_=1599182575668";
				// 使用jsonp方法
				// url 请求的地址，{}参数，（）=?{} 回调函数
				// err错误信息，data返回的数据
				jsonp(url,{},(err,data)=>{
					// console.log(data);
					this.ad_info = data.result.ad_info;
				})
			}
		},
		 
		data(){
			return {
				users:[],
				ad_info:{},				  
				tabs:[
					{name:"推荐"},
					{name:"手机"},
					{name:"智能"},
					{name:"电视"},
					{name:"笔记本"},
					{name:"家电"},
					{name:"生活周边"},
					],
				gallery:[
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ee5cdc2ea0617bfca37fb478112e620a.jpg?thumb=1&w=720&h=360",
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/222a7c88144d66f53a62a988aada9d37.jpg?thumb=1&w=720&h=360",
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/386fc144cb48e644e8f59af7a35810b2.jpg?thumb=1&w=720&h=360",
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/03ff022009a635262d53451d532518ed.jpg?thumb=1&w=720&h=360"
				]
			}
		},
		 
	}

</script>
<style>
</style>
 