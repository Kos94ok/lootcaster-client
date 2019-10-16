<template>
	<div class="the-chat-window">
		<chat-entry-list :chatEntries="this.chatHistory" />
		<div class="controls">
			<base-textbox :value="enteredMessage" @input="onMessageInput" placeholder="Your chat message" />
			<base-button @click="onSend">Send</base-button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '@/components/base/BaseButton'
import BaseTextbox from '@/components/base/BaseTextbox'
import ChatEntryList from '@/components/chat/ChatEntryList'
export default {
	components: {
		BaseButton,
		BaseTextbox,
		ChatEntryList
	},

	data: () => ({
		enteredMessage: ''
	}),

	mounted() {
	},

	computed: {
		...mapState({
			webSocket: state => state.play.webSocket,
			chatHistory: state => state.play.chatHistory
		})
	},

	methods: {
		...mapActions({
			// refreshList: 'gameBrowser/fetchPublicGames'
		}),

		onMessageInput(value) {
			this.enteredMessage = value
		},

		onSend() {
			this.webSocket.send(JSON.stringify({
				type: 'post/chat',
				data: this.enteredMessage
			}))
			this.enteredMessage = ''
		}
	}
}
</script>

<style scoped lang="scss">
	.the-chat-window {
		display: flex;
		flex-direction: column;
		position: fixed;
		max-width: 30%;
		max-height: 30%;
		left: 0;
		bottom: 0;
	}
</style>
