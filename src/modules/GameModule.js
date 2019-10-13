const handlers = {
	'update/playerConnected': ({ state, commit }, data) => {
		const players = state.players.slice()
		players.push(data)
		commit('setPlayers', players)
	},

	'update/playerDisconnected': ({ state, commit }, data) => {
		const playerToRemove = state.players.find(player => player.id === data.id)
		if (!playerToRemove) { return }

		const players = state.players.splice(state.players.indexOf(playerToRemove), 1)
		commit('setPlayers', players)
	},

	'chat/message': ({ state, commit }, data) => {
		const chatHistory = state.chatHistory.slice()
		chatHistory.push(data)
		commit('setChatHistory', chatHistory)
	},

	'gameState/chat': ({ state, commit }, data) => {
		commit('setChatHistory', data)
	},

	'gameState/players': ({ state, commit, dispatch }, data) => {
		commit('setPlayers', data)
	}
}

export default {
	namespaced: true,

	state: {
		id: '',
		players: [],
		chatHistory: [],
		webSocket: undefined
	},

	getters: {
		isInGame: (state) => {
			return !!state.webSocket
		}
	},

	actions: {
		joinGame: async({ state, commit, dispatch }, game) => {
			commit('setId', game.id)
			const webSocket = new WebSocket(process.env.VUE_APP_SERVER_WEBSOCKET + '/play/' + game.id)

			webSocket.onopen = (event) => {
				commit('setWebSocket', webSocket)
				webSocket.send(JSON.stringify({
					type: 'get/chat'
				}))
				webSocket.send(JSON.stringify({
					type: 'get/players'
				}))
			}

			webSocket.onmessage = (event) => {
				const message = JSON.parse(event.data)
				const type = message.type
				console.log(message)
				const handler = handlers[type]
				if (!handler) {
					console.warn('No handler for ' + message.type)
					return
				}
				handler({ state, commit, dispatch }, message.data)
			}

			webSocket.onclose = (event) => {
				commit('setWebSocket', undefined)
			}
		}
	},

	mutations: {
		setId(state, id) {
			state.id = id
		},

		setPlayers(state, players) {
			state.players = players
		},

		setChatHistory(state, chatHistory) {
			state.chatHistory = chatHistory
		},

		setWebSocket(state, webSocket) {
			state.webSocket = webSocket
		}
	}
}
