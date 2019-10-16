<template>
	<div class="browser-view">
		<the-game-browser />
	</div>
</template>

<script>
import TheGameBrowser from '@/components/browser/TheGameBrowser'
import LoginCheckViewMixin from '@/mixins/LoginCheckViewMixin'
export default {
	mixins: [ LoginCheckViewMixin ],
	components: {
		TheGameBrowser
	}
}
</script>

<style scoped lang="scss">
	.browser-view {
		width: 100%;
		height: 100%;
	}
</style>
