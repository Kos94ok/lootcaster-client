<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
		color: white;
		background: #111;
	}

	#app {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
