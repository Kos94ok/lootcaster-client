import axios from 'axios'

export default {
	async get(url, params) {
		const serverHost = process.env.VUE_APP_SERVER_HOST
		try {
			const response = await axios.get(serverHost + url, params || {})
			return {
				success: true,
				...response.data
			}
		} catch (err) {
			console.error(`NetworkingService: Unable to GET ${serverHost}${url}`, err)
			return {
				success: false,
				error: err.response.data.error || 'Unknown error'
			}
		}
	},

	async post(url, params) {
		const serverHost = process.env.VUE_APP_SERVER_HOST
		try {
			const response = await axios.post(serverHost + url, params || {})
			return {
				success: true,
				...response.data
			}
		} catch (err) {
			console.error(`NetworkingService: Unable to POST ${serverHost}${url}`, err)
			return {
				success: false,
				error: err.response.data.error || 'Unknown error'
			}
		}
	},

	async put(url, params) {
		const serverHost = process.env.VUE_APP_SERVER_HOST
		try {
			const response = await axios.put(serverHost + url, params || {})
			return {
				success: true,
				...response.data
			}
		} catch (err) {
			console.error(`NetworkingService: Unable to PUT ${serverHost}${url}`, err)
			return {
				success: false,
				error: err.response.data.error || 'Unknown error'
			}
		}
	},

	async delete(url, params) {
		const serverHost = process.env.VUE_APP_SERVER_HOST
		try {
			const response = await axios.delete(serverHost + url, params || {})
			return {
				success: true,
				...response.data
			}
		} catch (err) {
			console.error(`NetworkingService: Unable to DELETE ${serverHost}${url}`, err)
			return {
				success: false,
				error: err.response.data.error || 'Unknown error'
			}
		}
	}
}
