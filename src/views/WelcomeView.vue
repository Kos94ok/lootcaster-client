<template>
	<div class="welcome-view">
		<h1>Welcome to Lootcaster client beta!</h1>
		<player-token-validator />
	</div>
</template>

<script>
import PlayerTokenValidator from '@/components/PlayerTokenValidator'
export default {
	components: {
		PlayerTokenValidator
	}
}
</script>

<style scoped lang="scss">
	.welcome-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
