var webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = {
	entry: {
		home: path.join(__dirname, 'src/js/entries/index.js'),
		post: path.join(__dirname, 'src/js/entries/post.js')
	},
	output: {
		path: path.resolve(__dirname, 'assets/js/bundle'),
		filename: '[name].js',
		library: 'betlabs'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				loader: ExtractTextPlugin.extract('style-loader','css-loader')
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules)/,
				loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
			},
			{ 
				test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, 
				loader: 'url-loader?limit=100000' 
			},

		]
	},
	plugins: [
		new ExtractTextPlugin('../../css/bundle/[name].css'),
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery",
		    "window.jQuery": "jquery",
		   	d3: 'd3'
		}),
		new webpack.optimize.UglifyJsPlugin()
	],
	resolve: {
		modulesDirectories: ["web_modules", "node_modules", "bower_components"]
	},
	devtool: 'sourceMap'
}