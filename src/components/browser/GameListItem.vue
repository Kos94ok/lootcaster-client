<template>
	<div class="game-list-item">
		<base-button @click="onClick">{{ game.name }} | Owner: {{ game.owner }} | Players: {{ game.playerCount }}</base-button>
	</div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton'
export default {
	components: { BaseButton },
	props: {
		game: {
			type: Object,
			required: true
		}
	},

	methods: {
		onClick() {
			this.$emit('click', this.game)
		}
	}
}
</script>

<style scoped lang="scss">
</style>
