import axios from 'axios'
import NetworkingService from '@/services/NetworkingService'

export default {
	namespaced: true,

	state: {
		publicGames: []
	},

	actions: {
		createGame: async({ state, commit, dispatch }, { name }) => {
			const params = {
				name: name
			}
			const response = await NetworkingService.post('/games', params)
			if (response.success) {
				commit('addPublicGame', response.data)
			}
			return response
		},

		fetchPublicGames: async({ state, commit }) => {
			const response = await NetworkingService.get('/games')
			commit('setPublicGames', response.data || [])
			return response
		}
	},

	mutations: {
		addPublicGame(state, publicGame) {
			state.publicGames.push(publicGame)
		},

		setPublicGames(state, publicGames) {
			state.publicGames = publicGames
		}
	}
}
