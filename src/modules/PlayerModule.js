import axios from 'axios'

export default {
	namespaced: true,

	state: {
		id: '',
		username: ''
	},

	getters: {
		isAuthenticated: (state) => {
			return !!state.id
		}
	},

	actions: {
		register: async({ state, commit }, { username, password }) => {
			const params = {
				username: username,
				password: password
			}
			try {
				const response = await axios.post(process.env.VUE_APP_SERVER_HOST + '/register', params)
				return { response: response.data }
			} catch (err) {
				console.error(err)
				return { error: err.response.data }
			}
		},

		login: async({ state, commit }, { username, password }) => {
			const params = {
				username: username,
				password: password
			}
			try {
				const response = await axios.post(process.env.VUE_APP_SERVER_HOST + '/login', params)
				commit('setId', response.data.id)
				commit('setUsername', response.data.username)
				return response.data
			} catch (err) {
				console.error(err)
				return err.response.data
			}
		}
	},

	mutations: {
		setId(state, id) {
			state.id = id
		},
		setUsername(state, username) {
			state.username = username
		}
	}
}
