<template>
	<div class="chat-entry-list-item">
		<span>{{ senderUsername }}: {{ chatEntry.message }}</span>
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

	computed: {
		senderUsername() {
			if (this.chatEntry.sender) {
				return this.chatEntry.sender.username
			}
			return ''
		}
	},

	methods: {
	}
}
</script>

<style scoped lang="scss">
	.chat-entry-list-item {
		word-wrap: break-word;
	}
</style>
