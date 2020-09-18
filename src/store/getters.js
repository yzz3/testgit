export default {
	  goodLen:function(state){
		  var num = 0;
		  state.goods.forEach(item=>{
			  if(item.select){//如果是选中的
				   num +=parseInt(item.num);
				   // 追加到num变量
			  }
			 
		  })
		  return num; //返回到最终的值
	  },
	  totalPrice:function(state){
		  var num = 0;
		  state.goods.forEach(item=>{
			  if(item.select){//如果是选中的
				   num +=parseInt(item.num)*parseFloat(item.price);
				   // 追加到num变量
			  }
			 
		  })
		  return num; //返回到最终的值
	  }
  }