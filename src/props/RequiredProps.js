import CommonProps from '@/props/CommonProps'

export default {
	Boolean: {
		type: Boolean,
		required: true
	},

	String: {
		type: String,
		required: true
	},

	Number: {
		type: Number,
		required: true
	},

	LoginFormType: {
		...CommonProps.LoginFormType,
		required: true
	}
}
