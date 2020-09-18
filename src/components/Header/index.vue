<template>
	<div class="header">
		<div class="left">
			<img src="../../assets/logo.png" width="22" alt="">
		</div>
		<input type="text">
		<div class="right">
			<img src="../../assets/user.png" width="22" alt="">
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
.header{
	height: .88rem;
	background-color: #f0f0f0;
	display: flex; 
	/* 开启弹性盒子 */
	align-items: center;
	/* 垂直居中对齐 */
}
.header input{
	flex:1; 
	/* 自适应宽 */
	height: .6rem;
	padding: 0 0.05rem;

}
.header .left,
.header .right{
	padding: 0 .3rem;
}
</style>
