<template>
	<div class="combined-login-form">
		<base-textbox :value="enteredUsername" @input="onUsernameEntered" placeholder="Username"></base-textbox>
		<base-textbox :value="enteredPassword" @input="onPasswordEntered" placeholder="Password" input-type="password"></base-textbox>
		<base-button @click="onRegister">Register</base-button>
		<base-button @click="onLogin">Login</base-button>
		<div class="response-status">
			<div class="success">{{ successMessage }}</div>
			<div class="error">{{ errorMessage }}</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '@/components/BaseButton'
import BaseTextbox from '@/components/BaseTextbox'
export default {
	components: {
		BaseTextbox,
		BaseButton
	},

	data: () => ({
		enteredUsername: '',
		enteredPassword: '',
		serverResponse: undefined
	}),

	computed: {
		successMessage() {
			if (!this.serverResponse || this.serverResponse.error) { return undefined }
			return this.serverResponse
		},

		errorMessage() {
			if (!this.serverResponse || !this.serverResponse.error) { return undefined }
			return this.serverResponse.error
		}
	},

	methods: {
		...mapActions({
			register: 'player/register',
			login: 'player/login'
		}),

		onUsernameEntered(value) {
			this.enteredUsername = value
		},
		onPasswordEntered(value) {
			this.enteredPassword = value
		},

		async onRegister() {
			this.serverResponse = await this.register({
				username: this.enteredUsername,
				password: this.enteredPassword
			})
		},
		async onLogin() {
			this.serverResponse = await this.login({
				username: this.enteredUsername,
				password: this.enteredPassword
			})
		}
	}
}
</script>

<style scoped lang="scss">
	.welcome-view {
		width: 100%;
		height: 100%;
		background: black;

		.response-status {
			margin: 4px;
			.success {
				color: green;
			}

			.error {
				color: red;
			}
		}

	}
</style>
