import axios from 'axios'

export default {
	namespaced: true,

	state: {
		publicGames: []
	},

	actions: {
		createGame: async({ state, commit, dispatch }) => {
			try {
				await axios.put(process.env.VUE_APP_SERVER_HOST + '/games')
				dispatch('fetchPublicGames')
			} catch (err) {
				console.error(err)
			}
		},

		fetchPublicGames: async({ state, commit }) => {
			try {
				const response = await axios.get(process.env.VUE_APP_SERVER_HOST + '/games')
				commit('setPublicGames', response.data.data)
			} catch (err) {
				console.error(err)
				commit('setPublicGames', [])
			}
		}
	},

	mutations: {
		setPublicGames(state, publicGames) {
			state.publicGames = publicGames
		}
	}
}
