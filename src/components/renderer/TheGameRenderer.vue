<template>
	<div class="the-game-renderer">

	</div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	watch: {
		webSocket(newSocket) {
			if (!newSocket) {
				this.$router.push({ name: 'WelcomeView' })
			}
		}
	},

	mounted() {
		const pixi = new PIXI.Application()
		this.$el.appendChild(pixi.view)

		pixi.renderer.view.style.position = 'absolute'
		pixi.renderer.view.style.display = 'block'
		pixi.renderer.resize(window.innerWidth, window.innerHeight)

		this.registerPixi(pixi)
	},

	beforeDestroy() {
		this.clearPixi()
	},

	computed: {
		...mapState({
			webSocket: state => state.play.webSocket
		})
	},

	methods: {
		...mapActions({
			registerPixi: 'play/registerPixi',
			clearPixi: 'play/clearPixi'
		})
	}
}
</script>

<style scoped lang="scss">
	.the-game-renderer {

	}
</style>
