import axios from 'axios'

export default {
	namespaced: true,

	state: {
		username: ''
	},

	getters: {
		isAuthenticated: (state) => {
			return !!state.username
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
				commit('setUsername', response.data.data.username)
				return response.data
			} catch (err) {
				console.error(err)
				return err.response.data
			}
		},

		logout: async({ state, commit }) => {
			try {
				await axios.post(process.env.VUE_APP_SERVER_HOST + '/logout')
				commit('setUsername', '')
			} catch (err) {
				console.error(err)
			}
		},

		fetchProfile: async({ state, commit }) => {
			console.info('Fetching profile info')
			try {
				const response = await axios.get(process.env.VUE_APP_SERVER_HOST + '/profile')
				commit('setUsername', response.data.data.username)
				console.log(response.data.data)
			} catch (err) {
				console.info('No authentication token present')
			}
		}
	},

	mutations: {
		setUsername(state, username) {
			state.username = username
		}
	}
}
