<template>
	<div>
		<h1>爱笑话</h1>
		<div class="item" 
		v-for="item in joks" 
		:key="item.docid">	
		{{item.summary}}			
		</div>
		<button :disabled="!can" @click="getJoks()">加载更多</button>
		<!-- disabled 是否不可yong getJok获取新的笑话 -->
	</div>
</template>

<script>
	export default{
		data(){
			return {
				joks:[],//笑话数据
				page:1,//笑话第几页
				can:true,//是否按钮可以点击
				}
		},
		created(){
			this.getJoks();
			//获取笑话数据
		},
		methods:{
			getJoks(){
				this.can = false;//已经点击过，不让点击
				fetch("https://www.520mg.com/mi/list.php?page="+this.page)
				.then(res=>res.json())//数据流转换json
				.then(res=>{ //res 是fetch获取的数据
					console.log(res);
					this.joks = this.joks.concat(res.result); //将原来的笑话数据和新加载的数据结合
					this.page++; //更新page值
					this.can = true; //可以点击
				})
				.catch(err=>{console.log(err);this.can = true})
				// 失败的情况
			}
		}
	}
</script>

<style>
	.item{
		padding: 15px;
		border-bottom: 1px solid #eee;
		text-align: justify;
	}
</style>
