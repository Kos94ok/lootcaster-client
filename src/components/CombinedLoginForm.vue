<template>
	<div class="combined-login-form">
		<h1 v-if="isLoginForm">Login</h1>
		<h1 v-if="isRegisterForm">Register</h1>
		<base-textbox :value="enteredUsername" @input="onUsernameEntered" placeholder="Username"></base-textbox>
		<base-textbox :value="enteredPassword" @input="onPasswordEntered" placeholder="Password" input-type="password"></base-textbox>
		<div class="response-status">
			<div class="success" v-if="isRequestSuccessful">{{ serverResponse.message }}</div>
			<div class="error" v-if="isRequestFailed">{{ serverResponse.message }}</div>
		</div>
		<base-button class="button" v-if="isLoginForm" @click="onLoginClick">Login</base-button>
		<base-button class="button" v-if="isRegisterForm" @click="onRegisterClick">Register</base-button>
		<link-button class="button" v-if="isRegisterForm" @click="onToLoginClick">To login</link-button>
		<link-button class="button" v-if="isLoginForm" @click="onToRegistrationClick">To registration</link-button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseButton from '@/components/base/BaseButton'
import BaseTextbox from '@/components/base/BaseTextbox'
import RequiredProps from '@/props/RequiredProps'
import LinkButton from '@/components/base/LinkButton'
export default {
	components: {
		LinkButton,
		BaseTextbox,
		BaseButton
	},

	props: {
		type: RequiredProps.LoginFormType
	},

	data: () => ({
		enteredUsername: '',
		enteredPassword: '',
		serverResponse: {}
	}),

	computed: {
		isRequestSuccessful() { return this.serverResponse.success },
		isRequestFailed() { return !this.serverResponse.success },

		isLoginForm() { return this.type === 'login' },
		isRegisterForm() { return this.type === 'register' }
	},

	methods: {
		...mapActions({
			registerPlayer: 'player/register',
			loginPlayer: 'player/login'
		}),

		onUsernameEntered(value) {
			this.enteredUsername = value
		},
		onPasswordEntered(value) {
			this.enteredPassword = value
		},

		async onLoginClick() {
			const response = await this.loginPlayer({
				username: this.enteredUsername,
				password: this.enteredPassword
			})
			if (response.success) {
				return this.$router.push({ name: 'BrowserView' })
			}
			this.serverResponse = {
				success: response.success,
				message: response.error
			}
		},
		async onRegisterClick() {
			const response = await this.registerPlayer({
				username: this.enteredUsername,
				password: this.enteredPassword
			})
			this.serverResponse = {
				success: response.success,
				message: response.error || 'Your account has been created!'
			}
			this.onLoginClick()
		},

		onToLoginClick() {
			this.$router.push({ name: 'LoginView' })
		},
		onToRegistrationClick() {
			this.$router.push({ name: 'RegisterView' })
		}
	}
}
</script>

<style scoped lang="scss">
	.combined-login-form {

		h1 {
			text-align: center;
		}

		.button {
			width: 100%;
		}

		.response-status {
			margin: 4px 0 4px 0;
			.success {
				color: green;
			}

			.error {
				color: red;
			}
		}

	}
</style>
