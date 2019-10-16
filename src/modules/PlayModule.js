import router from '@/router'
import * as PIXI from 'pixi.js'
import handlers from '@/handlers/Handlers'

export default {
	namespaced: true,

	state: {
		id: '',
		players: [],
		entities: [],
		chatHistory: [],
		pixi: undefined,
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
			const keepAliveInterval = setInterval(() => {
				webSocket.send(JSON.stringify({
					type: 'system/keepalive'
				}))
			}, 15000)

			webSocket.onopen = (event) => {
				commit('setWebSocket', webSocket)
				webSocket.send(JSON.stringify({
					type: 'get/chat'
				}))
				webSocket.send(JSON.stringify({
					type: 'get/players'
				}))
				webSocket.send(JSON.stringify({
					type: 'get/entities'
				}))
				router.push({ name: 'PlayView' })
			}

			webSocket.onmessage = (event) => {
				const message = JSON.parse(event.data)
				const type = message.type
				const handler = handlers[type]
				if (!handler) {
					console.warn('No handler for ' + message.type)
					return
				}
				handler({ state, commit, dispatch }, message.data)
			}

			webSocket.onclose = (event) => {
				commit('setWebSocket', undefined)
				clearInterval(keepAliveInterval)
			}
		},

		registerPixi: ({ state, commit, dispatch }, pixi) => {
			commit('setPixi', pixi)
			state.entities.forEach(entity => dispatch('createEntity', entity))
		},

		clearPixi: ({ state, commit, dispatch }) => {
			commit('setEntities', [])
			commit('setPixi', undefined)
		},

		createEntity: ({ state, commit, dispatch }, entity) => {
			commit('addEntity', {
				...entity,
				loading: true
			})

			if (!state.pixi) {
				return
			}

			const stage = state.pixi.stage
			const loader = new PIXI.Loader()
			loader.add('/client/assets/textures/circle-purple.png')

			loader.load((loader, resources) => {
				const entityRenderer = new PIXI.Sprite(resources['/client/assets/textures/circle-purple.png'].texture)
				stage.addChild(entityRenderer)
				entityRenderer.width = 32
				entityRenderer.height = 32

				commit('updateEntity', {
					id: entity.id,
					loading: false,
					renderer: entityRenderer
				})
				dispatch('syncEntityRenderer', entity)
			})
		},

		syncEntity: ({ state, commit, dispatch }, entityData) => {
			const entity = state.entities.find(entity => entity.id === entityData.id)
			if (!entity) {
				return
			}

			commit('updateEntity', entityData)
			dispatch('syncEntityRenderer', entity)
		},

		syncEntityRenderer: ({ state, commit, dispatch }, entityData) => {
			const entity = state.entities.find(entity => entity.id === entityData.id)
			if (!entity) {
				return
			}

			const renderer = entity.renderer
			if (!renderer && !entity.loading) {
				return
			}

			renderer.x = entityData.position.x
			renderer.y = entityData.position.y
		},

		destroyEntity: ({ state, commit, dispatch }, targetEntity) => {
			console.log(targetEntity.id)
			const registeredEntity = state.entities.find(entity => entity.id === targetEntity.id)
			if (registeredEntity && registeredEntity.renderer) {
				state.pixi.stage.removeChild(registeredEntity.renderer)
			}
			commit('removeEntity', targetEntity)
		}
	},

	mutations: {
		setId(state, id) {
			state.id = id
		},

		addPlayer(state, player) {
			state.players.push(player)
		},
		setPlayers(state, players) {
			state.players = players
		},

		addEntity(state, entity) {
			state.entities.push(entity)
		},
		setEntities(state, entities) {
			state.entities = entities
		},
		removeEntity(state, entity) {
			const entityIndex = state.entities.indexOf(entity)
			state.entities.splice(entityIndex, 1)
		},
		updateEntity(state, dataFields) {
			const entity = state.entities.find(entity => entity.id === dataFields.id)
			if (!entity) { return }

			const keys = Object.keys(dataFields)
			keys.forEach(key => {
				entity[key] = dataFields[key]
			})
		},

		addChatEntry(state, entry) {
			state.chatHistory.push(entry)
		},
		setChatHistory(state, chatHistory) {
			state.chatHistory = chatHistory
		},

		setWebSocket(state, webSocket) {
			state.webSocket = webSocket
		},

		setPixi(state, pixi) {
			state.pixi = pixi
		}
	}
}
