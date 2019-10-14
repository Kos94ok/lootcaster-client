<template>
	<base-button class="link-button" :icon="icon" @click="onClick"><slot></slot></base-button>
</template>

<script>
import BaseButton from '@/components/base/BaseButton'
export default {
	components: { BaseButton },
	props: {
		icon: String
	},

	methods: {
		onClick: function(args) {
			this.$emit('click', args)
		}
	}
}
</script>

<style lang='scss' scoped>
	.link-button {
		border: none;
		background-color: transparent;

		&:focus, &:hover, &:active {
			border: none;
			background-color: transparent;
		}
	}
</style>
