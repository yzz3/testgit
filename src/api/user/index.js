import request from '@/utils/request.js';
// 导入 request
/**
 * 获取用户信息 api
 * @return {Promise} 返回一个Promise
 * @description  获取用户信息api 成功返回用户信息，失败返回失败结果
*/
export const GetUserInfo = ()=>{
	return new Promise((resolve,reject)=>{
		request.get("/member/ajax_login.php")
		.then(res=>resolve(res))
		.catch(err=>reject(err))
	})
}
/**
 * 退出登录api
 * @return {Promise} 返回一个Promise 成功 {status:1,msg:'成功'} ；失败 {status:0,'退出失败'}
 * */
export const Exit=()=>{
	return new Promise((resolve,reject)=>{
		request.postURL("/member/index_login.php",{dopost:'exit'})
		.then(res=>resolve(res))
		.catch(err=>reject(err))
	})
}