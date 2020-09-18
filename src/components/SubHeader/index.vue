<template>
	<div class="tabs-wrap">
		<div class="tab">
			<div class="tab-con">
				<span class="tab-item" :class="{'active':selectIndex==index}" @click="itemHd(index,item)" v-for="(item,index) in tabs" :key="item.name">{{item.name}}</span>
			</div>
			<div class="toggle" :class="{'up':showExpend}" @click="showExpend=!showExpend"><img src="../../assets/arrow.png"  width="29" alt=""></div>
			
		</div>
		<div class="expend" v-if="showExpend">
			<div class="title">全部</div>
			<div class="expend-con">
				<span v-for="(item,index) in tabs"  :class="{'active':selectIndex==index}"    @click="itemHd(index,item);showExpend=false;" :key="item.name" class="btn">{{item.name}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods:{
			itemHd(index,item){				
				this.selectIndex = index;
				// 拿到当前dom节点，拿到tab-con 元素
				var itemDom = document.querySelectorAll(".tab-item")[this.selectIndex];
				var tabCon = document.querySelector(".tab-con");
				tabCon.scrollLeft = itemDom.offsetLeft-tabCon.offsetWidth/2+itemDom.offsetWidth/2-22;
				this.$emit("itemchange",item);//发送数据个父组件
			}
		},
		props:{"tabs":{type:Array,default:[]}},
		data(){ return {
			showExpend:false,
			selectIndex:0,
		}}
	}
</script>
<style scoped>
	.tabs-wrap{
		position: relative;
		z-index: 9999;
	}
	.tab-item.active{
		color:#f70;
	}
	.expend-con .btn.active{
		color: #f70;
		border-color: #f70;
		background-color: rgba(255, 119,0,.1);
	}
	.up{ transform: rotate(-180deg);}
	.tabs-wrap{ height: .88rem; position: relative;}
	/* 总组件，高度固定，相对定位（子元素可以绝对定位） */
	.expend{
		position: absolute;
		left:0;
		top:.88rem;
		width: 100%;
	}
	/* 绝对定位（不会撑大父组件，不占父元素高度） */
	/* top：0.88让出toggle点击区域 */
	.expend .title{
		height: .88rem;
		line-height: .88rem;
		margin-right: .88rem;
		/* 让出 toggle显示区域 */
		padding-left: .3rem;
		background-color: #f0f0f0;
		margin-top: -0.88rem;
		/* 把整体expend包括 expend-con向上移动.88 */
		/* 覆盖tab的显示区域 */
		
	}
	.expend-con{
		padding: .3rem;
		padding-top:0;
		padding-left: 0.1rem;
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		background-color: #f0f0f0;
	}
	.expend-con .btn{
		height:.6rem;
		width: 1.5rem;
		box-sizing: border-box;
		border-radius: 0.08rem;
		border:1px solid #eee;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		text-align: center;
		line-height: .6rem;
		background-color: #fff;
		font-size: 0.24rem;
		/* 总宽度0.72rem 左右间距0.6 中间3*0.2 剩下 /4 */
		
	}
	
	
	.tab{ 
		height: .88rem;
		background-color: #f0f0f0;
		display: flex;	
		align-items: center;
		}
	.tab-con{
		overflow-x: auto;
		white-space: nowrap;
		flex:1;
		scroll-behavior: smooth;
		/* 平滑滚动 */
		height: .88rem;
		line-height: .88rem;
		
	}
	.tab-con::-webkit-scrollbar{ display:none;}
	/* 选中滚动条 ，隐藏 */
	.toggle{
		 height: 0.88rem;
		 width: 0.88rem;
		 line-height: 0.88rem;
		 text-align: center;
	}
	.toggle img{ vertical-align: middle;}
	.tab-item{ padding-left: .3rem; padding-right: .3rem; font-size: .28rem;}
</style>



