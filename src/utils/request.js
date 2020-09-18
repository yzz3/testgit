import axios from 'axios'
// 导入axios
import { Toast } from 'vant';
// 设置基础URL
import qs from 'qs';
// qs把对象转换为url编码形式
const BASEURL = process.env.NODE_ENV==='production'?'https://www.520mg.com/':'http://localhost:8080';
// process.env.NODE_ENV 当前的运行环境是production
// process 处理 env环境 node NodeJS  env 环境
// 当前的运行环境如果是线上 就业采用域名 https://www.520mg.com 作为所有请求的默认域名，如果开发环境则设置另外一个  

// 创建一个axios实例

let request = axios.create({
	baseURL:BASEURL, //基础url
	timeout:5000,//请求超时
})

// 请求 拦截请求 添加token ，添加加载提示
// interceptors 拦截器
//  request 拦截请求 use 使用
//  config 请求配置 headers 请求头 
//  sessionStorage.getItem  本地会话存储
request.interceptors.request.use(
	config=>{		
			 Toast.loading({
			   message: '加载中...',
			   forbidClick: true,
			   loadingType: 'spinner',
			 });
			config.headers.Token = sessionStorage.getItem("token");	
			return config
			}
)
// 思考：指定加载提示，才提示，指定提示文本

// 响应拦截
request.interceptors.response.use(
	res=>{		
		    Toast.clear();
			return  res;
			}
)
 // 定义一个post方法 url 地址 data 数据
 // 自动把对象转换为 url编码
 //  添加了headers 头信息
request.postURL=function(url,data){
	return new Promise((resolve,reject)=>{
		request({
			url:url,
			data:qs.stringify(data),
			method:"post",
			headers:{"Content-Type":"application/x-www-form-urlencoded"}
		})
		.then(res=>resolve(res))
		.catch(err=>reject(err))
	})
}

export default request;
// 导出request 
// 为什么需要二次封装 axios
// 1. 请求与响应拦截  请求前添加 loading，请求完毕移除loading
// 每个请求都要添加 token auth等权限凭据
// 2. 统一配置   ：基本域名
// 3. 二次封装一些方法，jsonp postURL