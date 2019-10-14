<template>
	<div class="player-token-validator">
		<div v-if="isValidating" class="form validating">
			<div>Checking your authentication cookie...</div>
		</div>

		<div v-if="isLoggedIn" class="form logged-in">
			<div>You are logged in as <span class="username">{{ username }}</span></div>
			<base-button @click="onContinueClick">Continue</base-button>
			<base-button @click="onLogoutClick">Logout</base-button>
		</div>

		<div v-if="isLoggedOut" class="form logged-out">
			<div>You are not logged in</div>
			<base-button @click="onLoginClick">Login</base-button>
			<base-button @click="onRegisterClick">Register</base-button>
		</div>

		<div v-if="isLoggingOut" class="form logging-out">
			<div>Logging you out...</div>
		</div>

		<div v-if="isLogoutFailed" class="form logout-failed">
			<div>We were unable to log you out :(</div>
			<base-button @click="onLogoutClick">Try again</base-button>
			<base-button @click="onContinueClick">Continue as <span class="username">{{ username }}</span></base-button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '@/components/base/BaseButton'
export default {
	components: { BaseButton },

	data: () => ({
		state: 'validating'
	}),

	mounted() {
		this.validate()
	},

	computed: {
		...mapState({
			username: state => state.player.username
		}),

		isValidating() { return this.state === 'validating' },
		isLoggedIn() { return this.state === 'loggedIn' },
		isLoggedOut() { return this.state === 'loggedOut' },
		isLoggingOut() { return this.state === 'loggingOut' },
		isLogoutFailed() { return this.state === 'logoutFailed' }
	},

	methods: {
		...mapActions({
			fetchProfile: 'player/fetchProfile',
			logout: 'player/logout'
		}),

		async validate() {
			const response = await this.fetchProfile()
			this.state = response.success ? 'loggedIn' : 'loggedOut'
		},

		onContinueClick() {
			this.$router.push({ name: 'BrowserView' })
		},

		onLoginClick() {
			this.$router.push({ name: 'LoginView' })
		},

		onRegisterClick() {
			this.$router.push({ name: 'RegisterView' })
		},

		async onLogoutClick() {
			const response = await this.logout()
			this.state = response.success ? 'loggedOut' : 'logoutFailed'
		}
	}
}
</script>

<style scoped lang="scss">
	.player-token-validator {
		.form {
			display: flex;
			flex-direction: column;
			min-height: 120px;
		}

		.username {
			font-weight: bold;
		}
	}
</style>
