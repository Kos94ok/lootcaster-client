<template>
	<div class="the-game-browser">
		<chat-entry-list :chatEntries="this.chatHistory" />
		<base-textbox :value="enteredMessage" @input="onMessageInput" placeholder="Your chat message" />
		<base-button @click="onSend">Send</base-button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '@/components/BaseButton'
import BaseTextbox from '@/components/BaseTextbox'
import ChatEntryList from '@/components/ChatEntryList'
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
			webSocket: state => state.currentGame.webSocket,
			chatHistory: state => state.currentGame.chatHistory
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

</style>
