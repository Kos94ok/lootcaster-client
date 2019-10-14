<template>
	<div class="login-view">
		<combined-login-form type="login" />
	</div>
</template>

<script>
import CombinedLoginForm from '@/components/CombinedLoginForm'
export default {
	components: {
		CombinedLoginForm
	}
}
</script>

<style scoped lang="scss">
	.login-view {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
