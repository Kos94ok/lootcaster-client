<template>
	<div class='text-input'>
		<label><slot></slot></label>
		<input v-if='!multiline' class='card-title' :type=inputType v-model='text' :placeholder='placeholder' :readonly="readonly" />
		<textarea v-if='multiline' class='card-title' :rows='rows' v-model='text' :placeholder='placeholder' :readonly="readonly"></textarea>
	</div>
</template>

<script>
export default {
	props: {
		rows: Number,
		value: [String, Number],
		readonly: Boolean,
		placeholder: String,
		inputType: {
			type: String,
			default: 'text'
		}
	},
	computed: {
		text: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('input', value)
			}
		},
		multiline() {
			return this.rows !== undefined && this.rows > 1
		}
	}
}
</script>

<style lang="scss" scoped>
	.text-input {
		label {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			margin-left: 3px;
		}

		input, textarea {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			padding: 5px;
			resize: none;
			display: block;
			color: $primary-color;
			border: 1px solid $inactive-color;
			border-radius: 3px;
			outline: none;
			transition: all $transition-duration;
			background-color: $textarea-background-color;

			&:focus {
				border-color: $primary-color;
				background-color: transparent;
			}
		}
	}
</style>
