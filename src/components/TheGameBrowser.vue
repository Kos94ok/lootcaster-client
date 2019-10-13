<template>
	<div class="the-game-browser">
		<game-list :games="this.publicGames" @gameSelected="onGameSelected" />
		<div v-if="this.publicGames.length === 0" class="empty-list">No public games found</div>
		<base-button @click="onCreate">Create</base-button>
		<base-button @click="onRefresh">Refresh</base-button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GameList from '@/components/GameList'
import BaseButton from '@/components/BaseButton'
import BaseTextbox from '@/components/BaseTextbox'
export default {
	components: {
		GameList,
		BaseTextbox,
		BaseButton
	},

	data: () => ({
		enteredUsername: '',
		enteredPassword: '',
		serverResponse: undefined
	}),

	mounted() {
		this.refreshList()
	},

	computed: {
		...mapState({
			publicGames: state => state.gameBrowser.publicGames
		})
	},

	methods: {
		...mapActions({
			joinGame: 'currentGame/joinGame',
			createGame: 'gameBrowser/createGame',
			refreshList: 'gameBrowser/fetchPublicGames'
		}),

		onGameSelected(game) {
			this.joinGame(game)
		},

		async onCreate() {
			this.createGame()
		},

		async onRefresh() {
			this.refreshList()
		}
	}
}
</script>

<style scoped lang="scss">

</style>
