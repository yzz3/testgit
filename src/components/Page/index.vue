<template>
	<div class="page">
		<div v-for="(section,index) in sections" :key="index">
			<div v-if="section.view_type=='gallery'">
				 
				<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(image, index) in section.body.items" :key="index">
				    <img v-lazy="image.img_url" :style="{width:image.w/100+'rem',height:image.h/100+'rem'}"/>
				  </van-swipe-item>
				</van-swipe>
			</div>
			<div v-if="section.view_type=='cells_auto_fill'" class="cells_auto_fill">
				 <div v-for="(item,ind) in section.body.items">
					 <img v-lazy="item.img_url" alt="" :style="{width:item.w/100+'rem',height:item.h/100+'rem',left:item.x/100+'rem',top:item.y/100+'rem'}" :class="{'abs':item.x||item.y}">
				 </div>
			</div>
			<div v-if="section.view_type=='divider_line'" class="divider_line" :style="{backgroundColor:section.body.line_color,height:section.body.line_height/100+'rem'}">
			</div>
		</div>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'vant';
	// import swiper from '@/components/Swiper/index.vue'
	// 请求page对应的页面
	export default {
		components:{
			 [Swipe.name]: Swipe,
			 [SwipeItem.name]: SwipeItem,
			 
		},
		data(){return{ sections:[]}}, //sections每一节的数据
		props:{tab:{type:Object,default:{}}},
		created(){this.getPage()},
		methods:{
			getPage(){
				this.$http.get(`https://www.520mg.com/mi/page.php?page_id=${this.tab.page_id}&page_type=${this.tab.page_type}`)
				.then(res=>this.sections = res.data.data.data.sections)
				.catch(err=>console.log(err))
			}
		}
	}
</script>

<style>
	.cells_auto_fill{ position: relative; display: flex;}
	.abs{ position: absolute;}
</style>
