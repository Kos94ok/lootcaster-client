<template>
	<div class="register-view">
		<combined-login-form type="register" />
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
	.register-view {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
