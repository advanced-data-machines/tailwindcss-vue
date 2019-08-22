module.exports = {
	configureWebpack: {
		// using source-map allows VS Code to correctly debug inside vue files but not during production
		devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
		output: {
			libraryExport: 'default'
		}
	},
	devServer: {
		// select different base port apart from default
		port: 8085
	}
};
