<template>
	<div class="home">
		<mheader></mheader>
		<subheader :tabs="tabs" @itemchange="activeTab=$event">			
		</subheader>
		<keep-alive>
		 <page class="page" :tab="activeTab" 
		 v-for="(item,index) in tabs"
		 :key="item.page_id"
		 v-if="item==activeTab"
		  ></page>
		</keep-alive>
	</div>	
</template>
<script> 	 
	 import mheader from '@/components/Header/index.vue'
	 import subheader  from "@/components/SubHeader/index.vue"
	 import page  from "@/components/Page"
	 // 目标：拿到分类信息

	export default {
		components:{mheader,subheader,page},
		created() {
			this.getTab();//执行gettab 方法
		},		 
		methods:{
			getTab(){
				 
				this.$http.get("http://www.520mg.com/mi/page.php?page_id=8235&page_type=activity")
				.then(res=>{
					this.tabs = res.data.data.tabs;
					this.activeTab = this.tabs[0];
					
				})
			}
		},		 
		data(){
			return {	 
				tabs:[],// 二级分类信息
				activeTab:null,//当前选中分类信息
				
			}
		},
		 
	}

</script>
<style>
	.home{ display: flex; flex-direction: column; flex:1;}
	.page{ flex:1; overflow: auto;}
	
</style>
 