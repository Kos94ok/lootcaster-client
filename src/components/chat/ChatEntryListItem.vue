<template>
	<div class="chat-message-list-item">
		<span>{{ chatEntry.sender.username }}: {{ chatEntry.message }}</span>
	</div>
</template>

<script>
export default {
	props: {
		chatEntry: {
			type: Object,
			required: true
		}
	},

	methods: {
	}
}
</script>

<style scoped lang="scss">
</style>
