module.exports = {
	lintOnSave: true,
	// publicPath: '/client',

	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/styles/variables.scss";`
			}
		}
	}
}
