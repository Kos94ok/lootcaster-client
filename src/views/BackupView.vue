<template>
	<div class="welcome-view">
		<combined-login-form />
		<h1>Game browser</h1>
		<the-game-browser v-if="this.isAuthenticated" />
		<h1>Chat window</h1>
		<the-chat-window v-if="this.isInGame" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CombinedLoginForm from '@/components/CombinedLoginForm'
import TheGameBrowser from '@/components/browser/TheGameBrowser'
import TheChatWindow from '@/components/chat/TheChatWindow'
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

	mounted() {
		this.fetchProfile()
	},

	computed: {
		...mapGetters({
			isInGame: 'play/isInGame',
			isAuthenticated: 'player/isAuthenticated'
		})
	},

	methods: {
		...mapActions({
			fetchProfile: 'player/fetchProfile'
		})
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
