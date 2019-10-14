import NetworkingService from '@/services/NetworkingService'

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
			return NetworkingService.post('/register', params)
		},

		login: async({ state, commit }, { username, password }) => {
			const params = {
				username: username,
				password: password
			}
			return NetworkingService.post('/login', params)
		},

		logout: async({ state, commit }) => {
			return NetworkingService.post('/logout')
		},

		fetchProfile: async({ state, commit }) => {
			console.info('Fetching profile info')
			const response = await NetworkingService.get('/profile')
			console.log(response)
			if (response.success) {
				console.log('response.data.username')
				commit('setUsername', response.data.username)
			}
			return response
		}
	},

	mutations: {
		setUsername(state, username) {
			state.username = username
		}
	}
}
