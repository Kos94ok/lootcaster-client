<template>
	<div class="welcome-view">
		<combined-login-form />
		<h1>Game browser</h1>
		<the-game-browser v-if="this.isAuthenticated" />
		<h1>Chat</h1>
		<the-chat-window v-if="this.isInGame" />
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CombinedLoginForm from '@/components/CombinedLoginForm'
import TheGameBrowser from '@/components/TheGameBrowser'
import TheChatWindow from '@/components/TheChatWindow'
export default {
	components: {
		TheChatWindow,
		TheGameBrowser,
		CombinedLoginForm
	},

	data: () => ({
		enteredUsername: '',
		enteredPassword: '',
		serverResponse: undefined
	}),

	computed: {
		...mapGetters({
			isAuthenticated: 'player/isAuthenticated',
			isInGame: 'currentGame/isInGame'
		})
	},

	methods: {

	}
}
</script>

<style scoped lang="scss">
	.welcome-view {
		width: 100%;
		height: 100%;

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
