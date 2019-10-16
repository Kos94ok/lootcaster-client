export default {
	'gameState/chat': ({ state, commit }, data) => {
		commit('setChatHistory', data)
	},
	'gameState/players': ({ state, commit, dispatch }, data) => {
		commit('setPlayers', data)
	},
	'gameState/entities': ({ state, commit, dispatch }, data) => {
		const currentEntities = state.entities
		console.log('Entities pulled')
		data.forEach(entity => {
			if (currentEntities.includes(entity)) {
				dispatch('syncEntity', entity)
			} else {
				dispatch('createEntity', entity)
			}
		})
	},

	'chat/message': ({ state, commit }, data) => {
		commit('addChatEntry', data)
	},

	'update/entityCreated': ({ state, commit, dispatch }, data) => {
		dispatch('createEntity', data)
		console.log('Entity created')
	},
	'update/entityOrder': ({ state, commit }, data) => {
		// TODO: Something
	},
	'update/entityDestroyed': ({ state, commit, dispatch }, data) => {
		dispatch('destroyEntity', data)
	},

	'update/playerConnected': ({ state, commit }, data) => {
		commit('addPlayer', data)
		commit('addChatEntry', {
			message: `Player ${data.username} has joined the game`
		})
	},
	'update/playerDisconnected': ({ state, commit }, data) => {
		const playerToRemove = state.players.find(player => player.id === data.id)
		if (!playerToRemove) { return }

		const players = state.players.splice(state.players.indexOf(playerToRemove), 1)
		commit('setPlayers', players)

		commit('addChatEntry', {
			message: `Player ${data.username} has left the game`
		})
	},

	'command/disconnect': ({ state, commit }, data) => {
		console.info(`Disconnected. Reason: ${data.reason}`)
	},
	'error/generic': ({ state, commit }, data) => {
		console.error(`Server responded with generic error: ${data}`)
	}
}
