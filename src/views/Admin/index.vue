<template>
	<div class="admin">
		<div class="left">
			<router-link to="/admin/ucenter">用户中心</router-link><br>
			<router-link to="/admin/activity">活动</router-link>
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.admin{
		display: flex;
	}
	.admin>.left{
		width: 30%;
		background-color: #f0f0f0;
	}
</style>
