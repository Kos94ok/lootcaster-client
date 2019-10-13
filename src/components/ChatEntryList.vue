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
import ChatEntryListItem from '@/components/ChatEntryListItem'
export default {
	components: {
		ChatEntryListItem
	},

	props: {
		chatEntries: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped lang="scss">
	.chat-message-list {
		display: flex;
		flex-direction: column;
	}
</style>
