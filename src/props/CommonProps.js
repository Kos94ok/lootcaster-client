export default {
	LoginFormType: {
		type: String,
		validator(value) {
			return ['register', 'login'].includes(value)
		}
	}
}
