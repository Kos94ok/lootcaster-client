<template>
	<div class="chat-message-list">
		<chat-entry-list-item
				:key="chatEntry.id"
				v-for="chatEntry in this.chatEntries"
				:chatEntry="chatEntry"
		/>
	</div>
</template>

<script>
import ChatEntryListItem from '@/components/chat/ChatEntryListItem'
export default {
	components: {
		ChatEntryListItem
	},

	props: {
		chatEntries: {
			type: Array,
			required: true
		}
	},

	mounted() {
		this.$el.scrollTop = this.$el.scrollHeight
	},

	updated() {
		this.$el.scrollTop = this.$el.scrollHeight
	}
}
</script>

<style scoped lang="scss">
	.chat-message-list {
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
	}
</style>
