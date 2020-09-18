module.exports = { // 导出模块 
	publicPath:'./',//打包生成用相对目录
  devServer: {  //开发服务器
     proxy: {   //代理
          '/v1': { //代理标识 遇到什么请求开始代理     "localhost:8080/v1/home/category_v2"
            target: 'https://m.mi.com/',     //本地服务就会 请求 https://m.mi.com/v1/home/category_v2   返回给前端 
            changeOrigin: true, //是否跨域，跨域
			onProxyReq(proxyReq, req, res) { //当发送代理请求时候 
				 proxyReq.setHeader('Referer', 'https://m.mi.com/category'); //额外添加请求头
			 }
          },
		  '/member': { //代理标识 遇到什么请求开始代理    
		    target: 'https://www.520mg.com/',     
		  },
		  '/mi': { //代理标识 遇到什么请求开始代理
		    target: 'https://www.520mg.com/',     
		  }
  }
}
}