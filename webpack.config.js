var webpack = require('webpack');
var path = require('path');

var config = {
	context: path.join(__dirname, 'client'),
	entry: [
		'webpack/hot/only-dev-server',
		'./main.js'
	],

	output: {
		path: 'client',
		publicPath: 'client/assets',
		filename: 'bundle.js'
	},

	cache: true,
	debug: true,
	devtool: 'source-map',

	stats: {
		colors: true,
		reasons: true
	},

	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: ['node_modules', 'client']
	},

	module: {
		loaders: [
			{ test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.less$/, loader: 'style!css!less' },
			{ test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
			{ test: /\.(ttf|eot|svg)/, loader: 'file' },
			{ test: /\.woff(2)?/, loader: 'url?limit=10000&minetype=application/font-woff' }
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]

};

module.exports = config;
