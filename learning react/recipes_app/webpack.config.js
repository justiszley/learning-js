module.exports = {
	entry: './src/index.js',
	output: {
		path: 'dist/assets',
		filename: 'bundler.js',
		sourceMapFilename: 'bundle.map'
	},
	devtool: '#source-map',
	module: [
		rules: [
			{
				test: /\.js$/,
				exclude: /(node-modules)/,
				loader: ['babel-loader'],
				query: {
					presets: ['env', 'stage-0', 'react']
				}
			}
		]
	]
}