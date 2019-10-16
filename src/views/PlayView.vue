<template>
	<div class="play-view">
		<the-game-renderer />
		<the-chat-window />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheChatWindow from '@/components/chat/TheChatWindow'
import LoginCheckViewMixin from '@/mixins/LoginCheckViewMixin'
import TheGameRenderer from '@/components/renderer/TheGameRenderer'
export default {
	mixins: [ LoginCheckViewMixin ],
	components: {
		TheChatWindow,
		TheGameRenderer
	},

	data: () => ({

	}),

	watch: {

	},

	created() {

	},

	mounted() {
		this.$el.addEventListener('keydown', this.onKeyDown)
	},

	beforeDestroy() {
		this.$el.removeEventListener('keydown', this.onKeyDown)
	},

	computed: {
		...mapGetters({
			isInGame: 'play/isInGame'
		})
	},

	methods: {
		onKeyDown(event) {

		},

		onAuthenticationConfirmed() {
			if (!this.isInGame) {
				this.$router.push({ name: 'BrowserView' })
			}
		}
	}
}
</script>

<style scoped lang="scss">
	.play-view {
		width: 100%;
		height: 100%;
	}
</style>
