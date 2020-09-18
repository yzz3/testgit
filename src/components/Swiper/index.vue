<template>
	<div class="swiper-container" ref="swiper">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide" v-for="item in gallery" :key="item.img_url">
				<img :src="item.img_url" alt="" :style="{width:item.w/100+'rem',height:item.h/100+'rem'}">
			</div>
	      
	    </div>
	    <!-- 如果需要分页器 -->
	    <div class="swiper-pagination"></div>
	   
	</div>
</template>

<script>
	import Swiper from  'swiper/swiper-bundle.min.js'
	import 'swiper/swiper-bundle.min.css'
	export default {
		props:{"gallery":{type:Array,default:[]}},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				 new Swiper (this.$refs.swiper, {				 
				    loop: true, // 循环模式选项				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				    },
				    
				    
				    
				   
				  })        
			}
		}
	}
</script>

<style>
	.swiper-pagination-bullet-active{ background-color: #fff !important;}
</style>
