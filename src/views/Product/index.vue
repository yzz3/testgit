<template> 
	<div class="product">
		<div class="header">
			<van-icon name="arrow-left"  @click="$router.back()"/>
			<van-icon name="ellipsis" />
		</div>
		<div class="content" v-if="goodsData&&goodsData.goods_info&&goodsData.goods_info.length>0">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			  <van-swipe-item v-for="swipe in goodsData.goods_info[selectInd].gallery_v3">
				  <img  v-lazy="swipe.img_url"  width="100%" alt="">
			  </van-swipe-item>			 
			</van-swipe>
			<div class="padding">
				<div class="price">
					<span class="primary"><span class="small">￥</span>{{goodsData.goods_info[selectInd].price}}</span>
					<span class="market"><span>￥</span><del>{{goodsData.goods_info[selectInd].market_price}}</del></span>
				</div>
				<h3 class="name">{{goodsData.goods_info[selectInd].name}}</h3>
				<p class="desc" v-html="goodsData.goods_info[selectInd].product_desc"></p>
			</div>
			
		</div>
		<div class="foot">
		<van-goods-action >
		 <van-goods-action-icon icon="home-o" text="首页" @click="$router.push('/')" />
		  <van-goods-action-icon icon="chat-o" text="客服" @click="" />
		  <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.goodLen"  @click="$router.push('/cart')" />
	
		  <van-goods-action-button
		    type="danger"
		    text="加入购物"
			
		    @click="showSku=true"
			 color="#f70" 
		  />
		</van-goods-action>
		</div>
		 <van-sku
		  v-if="goodsData&&goodsData.goods_info&&goodsData.goods_info.length>0"
		  @buy-clicked="addCart($event)"
		  @sku-selected="skuSelect($event)"
		  v-model="showSku"
		  :hide-stock="true"
		   
		   :sku="sku"  
		   :show-add-cart-btn="false"
		   :buy-text="'加入购物车'"
		  
		   :goods="{'picture':goodsData.goods_info[selectInd].img_url}"
		   :initial-sku="{'s1':goodsData.goods_info[selectInd].prop_list[0].prop_value_id,'s2':goodsData.goods_info[selectInd].prop_list[1].prop_value_id}"
		 />
		 <!-- 
			v-if 当数据有的时候才渲染节点（只要是网络请求的数据，都应这样）
			@buy-clicked 单击购买/加入购物车按钮 触发
			@sku-selectedsku选项发送改变
			v-model 是否显示sku
			:hide-stock 隐藏库存
			:show-add-cart-btn 是否显示购物车按钮 不显示
			
			:sku 数据  tree  list
			buy-text 点击购买按钮文字
			:goods sku的图片 商品信息
			:initial-sku sku初始化选中参数			
			
		  -->
	</div>
</template>


<script>
	import { Sku,GoodsAction, GoodsActionIcon, GoodsActionButton ,Swipe, SwipeItem,Icon } from 'vant';
	import bus from '@/utils/bus.js'
	import request from '@/utils/request.js'
	export default {
		components:{
			[Sku.name]:Sku,
			[GoodsAction.name]:GoodsAction,
			[GoodsActionIcon.name]:GoodsActionIcon,
			[GoodsActionButton.name]:GoodsActionButton,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			[Icon.name]:Icon
		
		},
		// 通过现有数据计算出新的sku数据
		methods:{
			// 当单击加入购物
			addCart($event){
				console.log("addCart",$event)
				var num=$event.selectedNum; //产品的数量
				var select = true;//默认选中
				var id = $event.selectedSkuComb.id;//商品的id
				var buy_limit = this.goodsData.goods_info[this.selectInd].multi_buy_limit.first; // 最大的购买限量
				 this.$store.commit('addCart',{...this.goodsData.goods_info[this.selectInd],select,num,buy_limit})
				 // 执行addCart ，右侧就是一个对象{把id对应的产品解构，添加slect，num，buy_limit 属性}
				this.showSku = false; //隐藏购物车
			},
			// sku发生变化
			skuSelect($event){ // 				
				let  id = $event.selectedSkuComb.id; //当前选中项 对应的商品id
				let goods_info = this.goodsData.goods_info; // 获取所有的商品列表
				for(var i=0;i<this.goodsData.goods_info.length; i++){
					if(this.goodsData.goods_info[i].product_id==id){ // 如果id对应
						 this.selectInd = i // 更新selectInd				  
						 break; //结束循环
					}
				}
			 
			},
			 
			// request.postURL 是子啊utils/request.js中定义的方法
			// this.$router.params.id 是当前路由的参数
			getGoods(){
				request.postURL("/v1/miproduct/view",{client_id:180100031051,channel_id:'',webp:1,"commodity_id":this.$route.params.id,pid:this.$route.params.id,saleMode:''})
				.then(res=>{					 
					this.goodsData = res.data.data; //初始化整个商品页面的数据					 
				})
				.catch(err=>console.log(err))
			}
		},
		computed:{
			// 通过现有的数据，创造sku数据
			// tree 通过 goodsData.buy_option 获取  可以有哪些选项 
			// list 通过 goodsData.goods_info   可以有哪些商品
			sku:function(){
				var that =  this;				 
				var tree = [
					{
					      k: that.goodsData.buy_option[0].name, // skuKeyName：规格类目名称
					      k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id		  
						  v:that.goodsData.buy_option[0].list.map(item=>{
							  return ({
								  id:item.prop_value_id,
								  name:item.name
							  })
						  })					      
					     
					},
					{
					      k: that.goodsData.buy_option[1].name, // skuKeyName：规格类目名称
					      k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id		  
						  v:that.goodsData.buy_option[1].list.map(item=>{
							  return ({
								  id:item.prop_value_id,
								  name:item.name
							  })
						  })					      
					     
					}
				]
				var list = that.goodsData.goods_info.map(item=>{
					return({
						  id: item.product_id, // skuId
						  s1: item.prop_list[0].prop_value_id, // 规格类目 k_s 为 s1 的对应规格值 id
						  s2: item.prop_list[1].prop_value_id, // 规格类目 k_s 为 s2 的对应规格值 id
						  price:item.price*100, // 价格（单位分）
						  stock_num: item.multi_buy_limit.first// 当前 sku 组合对应的库存
					})
				})
				
				return ({
					tree,list
				})
				// 返回 作为sku tree 和list 
				
			}
		},
		data(){
			return {
				// 当前选中的产品
				selectInd:0,//当前选中是第几个产品			 
				goodsData:{},//所有的产品页面数据
				showSku:false,//是否显示sku
				
			}
		},
	    beforeRouteEnter(to,from,next){
			bus.$emit("tabschange",false);
			next();
		},
		beforeRouteUpdate(to,from,next){
			bus.$emit("tabschange",false);
			next();
		},
		// 创建前
		beforeCreate() {
			console.log("send");
			bus.$emit("tabschange",false)
			
			// 发送一个tabschange事件 值为false
		},
		// 创建完毕 获取商品数据
		created(){
			this.getGoods();
			bus.$emit("tabschange",false)
		},
		mounted(){
			bus.$emit("tabschange",false)
		},
		// 销毁后 发送一个tabschange事件 值为true
		beforeDestroy(){
			bus.$emit("tabschange",true)
		},
	
		
	}
</script>
<style>
	.van-goods-action-icon{ min-width: 56px !important;}
</style>
<style scoped>
 
	 
	.header .van-icon-arrow-left::before,
	.header .van-icon-ellipsis::before 
	{
	    
	    height: .6rem;
	    width: .6rem;
	    text-align: center;
	    line-height: .6rem;
		font-size: .4rem;
		color: #fff;
		border-radius: 50%;
		background-color: rgba(0,0,0,.2);
		margin: .30rem;
	}
 
	.product{
		display: flex;
		flex-direction: column;
		flex:1;
		position: relative;
		overflow: hidden;
		/* 弹性布局；垂直； 自适应高； 相对定位；超出隐藏 */
	}
	.product .content{
		flex:1;
		overflow: auto;
		/* 自适应高；超出部分隐藏 */
	}
	.product .foot{
		height:1.12rem ;
		border-top: 1px solid #f0f0f0;
		/* 高；边框行； */
	}
	.product .header{
		position: absolute;
		left:0;
		top:0;
		right: 0;
		height: .88rem;
		/* 固定定位；定位在顶部高44px */
		display: flex;
		justify-content: space-between;
		z-index: 99999;
	}
</style>


