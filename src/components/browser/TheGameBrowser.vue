<template>
	<div class="the-game-browser">
		<game-list :games="this.publicGames" @gameSelected="onGameSelected" />
		<div class="controls">
			<base-textbox placeholder="Game name" :value="enteredName" @input="onEnteredNameChanged" />
			<div class="buttons">
				<base-button @click="onCreate">Create</base-button>
				<base-button @click="onRefresh">Refresh</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GameList from '@/components/browser/GameList'
import BaseButton from '@/components/base/BaseButton'
import BaseTextbox from '@/components/base/BaseTextbox'
export default {
	components: {
		GameList,
		BaseButton,
		BaseTextbox
	},

	data: () => ({
		enteredName: ''
	}),

	mounted() {
		this.fetchPublicGames()
	},

	computed: {
		...mapState({
			publicGames: state => state.gameBrowser.publicGames
		}),

		isEmpty() {
			return this.publicGames.length === 0
		}
	},

	methods: {
		...mapActions({
			joinGame: 'play/joinGame',
			createGame: 'gameBrowser/createGame',
			fetchPublicGames: 'gameBrowser/fetchPublicGames'
		}),

		onEnteredNameChanged(value) {
			this.enteredName = value
		},

		onGameSelected(game) {
			this.joinGame(game)
		},

		async onCreate() {
			this.createGame({ name: this.enteredName })
			this.enteredName = ''
		},

		async onRefresh() {
			this.fetchPublicGames()
		}
	}
}
</script>

<style scoped lang="scss">
	.the-game-browser {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.list {
		}
	}
</style>
