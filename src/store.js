import Vue from 'vue'
import Vuex from 'vuex'

import GameModule from '@/modules/GameModule'
import PlayerModule from '@/modules/PlayerModule'
import GameBrowserModule from '@/modules/GameBrowserModule'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		player: PlayerModule,
		currentGame: GameModule,
		gameBrowser: GameBrowserModule
	}
})
