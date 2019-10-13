<template>
	<div class="game-list-item">
		<base-button @click="onClick">{{ game.id }}</base-button>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
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
