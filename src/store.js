import Vue from 'vue'
import Vuex from 'vuex'

import PlayModule from '@/modules/PlayModule'
import PlayerModule from '@/modules/PlayerModule'
import GameBrowserModule from '@/modules/GameBrowserModule'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		play: PlayModule,
		player: PlayerModule,
		gameBrowser: GameBrowserModule
	}
})
