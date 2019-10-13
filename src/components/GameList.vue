<template>
	<div class="game-list">
		<the-game-list-item
				:key="game.id"
				v-for="game in games"
				:game="game"
				@click="onGameSelected"
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TheGameListItem from '@/components/GameListItem'
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

	data: () => ({
	}),

	computed: {

	},

	methods: {
		...mapActions({

		}),

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
	}
</style>
