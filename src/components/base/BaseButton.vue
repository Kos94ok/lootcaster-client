<template>
	<button class="base-button" v-on:click='onClick'><i :class='iconClass'></i><slot></slot></button>
</template>

<script>
export default {
	props: {
		icon: String
	},

	computed: {
		iconClass() {
			if (this.icon) {
				return 'fas ' + this.icon
			}
			return 'hidden'
		}
	},
	methods: {
		onClick: function(args) {
			this.$emit('click', args)
		}
	}
}
</script>

<style lang='scss' scoped>
	.base-button {
		margin: 8px 0 8px 0;
		display: inline-block;
		padding: 0.35em 1.2em;
		border: 1px solid $inactive-color;
		border-radius: 0.12em;
		box-sizing: border-box;
		text-decoration: none;
		font-family: 'Roboto', sans-serif;
		font-weight: 300;
		color: $inactive-color;
		background-color: transparent;
		text-align: center;
		transition: all $transition-duration;
		cursor: pointer;
		outline: none;

		&:focus, &:hover {
			color: $primary-color;
			border: 1px solid $primary-color;
			background-color: $button-background-color;
			transition: all 0s;
		}

		&:active {
			color: $accent-color;
			border: 1px solid $accent-color;
			background-color: $button-background-color;
			transition: all 0s;
		}

		i {
			margin-right: 4px;
			&.hidden {
				display: none;
			}
		}
	}
</style>
