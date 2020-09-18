<template>
	<div>
		<h4 ref="c4">counter计数器</h4>
		<p class="myred">我是组件内部的myred</p>
		<button @click="num++">{{num}}</button>
		
		
	</div>
</template>

<script>
	export default {
		props:{"val":{type:Number,default:1}},
	
		data(){
			return {
				num:null,//按钮的值
				interId:null, //定时器的id
				}
		},
		methods:{
			getNode(){
				// var h4 = document.querySelector("h4");
				// alert(h4.innerHTML);
				var c4 = this.$refs.c4;//通过ref的方式获取dom节点
				// alert(c4.innerHTML);
			},
			auto(){
				this.interId = setInterval(()=>{
					this.num++;
				},2000)
			}
		},
		beforeCreate(){
			console.log("beforeCreate","创建前");
		},
		created(){
			console.log("created","创建完成");
			this.num = this.val;	
			this.auto();//开启定时器
		},
		beforeMount() {
			console.log("beforeMount","挂载前");
		},
		mounted(){
			console.log("mounted","挂载完成")
			this.getNode();//获取dom节点
		},
		beforeUpdate(){
			console.log("beforeUpdate","更新前")
		},
		updated(){
			console.log("updated","更新完成")
		},
		beforeDestroy(){
			console.log("beforeDestroy","销毁前")
			clearInterval(this.interId);
		},
		destroyed(){
			console.log("destroyed","销毁完毕")
		}
	}
	 // 组件的生命周期钩子函数
	 /**
	  * 一个vue组件从创建到销毁会经历一系列的特殊过程，把这个过程叫做组件的生命周期
	  * 每个生命周期都会执行特殊的回调函数，把这些回调函数称为生命钩子函数
	  * 
	  * vue 生命周期4组8个常用 创建前后 ，挂载前后  更新前后，销毁前后
	  * 最常用的
	  * created 创建完成  可以获取到this ajax加载 ，开启定时器
	  * mounted 挂载完成(内容以及渲染完毕)  可以获取dom节点
	  * beforeDestroy 销毁前  清除定时器，移除事件监听器
	  * */
</script>

<style scoped="scoped">
	
	 .myred{ color:red; font-weight: 900;}
</style>
