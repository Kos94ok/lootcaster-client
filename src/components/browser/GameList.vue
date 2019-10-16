<template>
	<div class="game-list">
		<div v-if="isEmpty" class="empty-list">No public games found!</div>
		<the-game-list-item
				:key="game.id"
				v-for="game in games"
				:game="game"
				@click="onGameSelected"
		/>
	</div>
</template>

<script>
import TheGameListItem from '@/components/browser/GameListItem'
export default {
	components: {
		TheGameListItem
	},

	props: {
		games: {
			type: Array,
			required: true
		}
	},

	computed: {
		isEmpty() {
			return this.games.length === 0
		}
	},

	methods: {
		onGameSelected(game) {
			this.$emit('gameSelected', game)
		}
	}
}
</script>

<style scoped lang="scss">
	.game-list {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}
</style>
