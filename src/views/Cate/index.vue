<template>
	<div class="category">
		<!-- transition 添加动画效果    v-if 触发动画 -->
		<transition name="van-slide-down">
			<van-nav-bar v-if="category.length>0" class="navbar" title="分类" left-text="" left-arrow @click-left="$router.back()">
			  <template #right>
				<van-icon name="search" size="18" />
			  </template>
			</van-nav-bar>
		</transition>
		<!-- v-if 当ajax 获取了数据，才显示内容 -->
		<!-- :class ="{'current':selectInd ==index}" 根据selectInd动态添加class -->
		<!-- v-for="(item,index) in category"  遍历category分类信息 -->
		<!-- :key="item.category_id" 绑定唯一key 优化渲染 -->
		<!-- {{item.category_name}} 显示大的分类值 -->
		<!--  -->
		<div class="wrap" v-if="category.length>0">
			<div class="left">
				<div class="citem" 
				:class ="{'current':selectInd ==index}"
				@click="selectInd = index"
				v-for="(item,index) in category" 
				:key="item.category_id">
					{{item.category_name}}
				</div>
			</div>
			<div class="right">
				<!-- v-for="(item,index) in category[selectInd].category_list"  遍历大分类底下的 category_list -->
				<div v-for="(item,index) in category[selectInd].category_list" :key="index">
					<!-- 如果是大图 -->
					<div v-if="item.view_type=='cells_auto_fill'" class="cells_auto_fill">
						<img v-lazy="item.body.items[0].img_url" alt="" :style="{minHeight:item.body.items[0].h/100+'rem',width:'100%'}">
					</div>
					<!-- 如果是标题 -->
					<div v-if="item.view_type=='category_title'" class="category_title">{{item.body.category_name}}</div>
					<!-- 如果是分组 -->
					<!-- v-for="product in item.body.items" 遍历商品分组 -->
					<div v-if="item.view_type=='category_group'" class="category_group">
						<!-- :to="'/product/'+product.action.path" -->
						<router-link :to="{ name: 'Product', params: { id:product.action.path }}" class="product" v-for="product in item.body.items">
							<img v-lazy="product.img_url" alt="">
							<p class="category_name van-ellipsis">{{product.category_name}}</p>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.category_group{ display: flex; flex-wrap: wrap;}
	/* 分组 弹性布局  ;允许换行 */
	.product{ flex-basis: 33.33%; min-width: 33.33%; max-width: 33.33%; margin-bottom: .3rem; text-align: center;}
	/* 产品宽固定33.33 */
	.product img{ min-height: .8rem; width: 70%;}
	/* 图片最小高.8rem  宽70% */
	.product .category_name{ font-size: .18rem; line-height: .3rem; color: #777; }
	/* 图片下的文字 小点； 行高.3  ；文字颜色灰色 */
	.category_title{ line-height: .88rem; text-align: center; margin-top: .3rem;}
	/* 大标题 行高.88  ；水平居中； 上边距.3 */
	.current{
		color: #f70;
		font-weight: 800;
	}
	.citem{ 
		height: .88rem; 
		line-height: .88rem; 
		text-align: center;
		border-bottom: 1px solid #f0f0f0;
		font-size: 0.24rem;
		/* 高，行高，文字居中，下边框 */
		}
		
	.category{ display: flex; flex-direction: column;}
	/* 开启弹性布局，垂直方向 */
	.wrap{
		flex:1; 
		/* 高度自适应 */
		display: flex;
		overflow: hidden;
		/* 弹性布局，超出部分隐藏 */
	}
	.left{
		width: 25%;
		flex-basis: 25%;
		max-width: 25%;
		overflow: auto;
		/* 宽，弹性前的宽，最大宽，超出部分滚动条 */
		
	}
	.right{
		flex:1;
		overflow: auto;
			/*自适应宽，超出部分 自动 */
	}
</style>

<script>
	import { Icon,NavBar } from 'vant';
	
	// 把分类数据渲染出来
	export default {
		components:{
		 
			[Icon.name]:Icon,
			[NavBar.name]:NavBar
		},
		data(){
			return {
				category:[],//分类数据
				selectInd:0,//当前选中
				}
		},
		created(){
			this.getCategory();
		},
		methods:{
			getCategory(){
				// post请求获取数据（用了proxy代理）  urlencoded post是数据应该是字符串
				this.$http.post("/v1/home/category_v2",
				'client_id=180100031051&channel_id=&webp=1',
				{headers:{"Content-Type":"application/x-www-form-urlencoded"}}
				).then(res=>{
					console.log(res.data,"category")
					this.category = res.data.data;
				})
				.catch(err=>console.log(err))
			}
		}
	}
</script>
<style >
	
	.navbar .van-icon {
	    color: #b3b3b3 !important;
	    font-size: 20px;
	}
</style>

 
