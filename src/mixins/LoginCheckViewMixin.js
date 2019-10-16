import { mapGetters, mapActions } from 'vuex'

export default {
	created() {
		if (!this.isAuthenticated) {
			this.checkAuthentication()
		}
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'player/isAuthenticated'
		})
	},

	methods: {
		...mapActions({
			fetchProfile: 'player/fetchProfile'
		}),

		onAuthenticationConfirmed() { return true },
		onAuthenticationFailed() {},

		async checkAuthentication() {
			const response = await this.fetchProfile()
			if (response.success) {
				this.onAuthenticationConfirmed()
				return
			}

			const shouldRedirectToWelcomeScreen = this.onAuthenticationFailed()
			if (shouldRedirectToWelcomeScreen) {
				return this.$router.push({ name: 'WelcomeView' })
			}
		}
	}
}
