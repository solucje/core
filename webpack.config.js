const path = require('path');
const autoprefixer = require('autoprefixer');
const helpers = require('./build/helpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const coreJS = {
	entry: './src/scripts/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist/scripts'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.scss/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: devMode,
							localIdentName: '[name]__[local]__[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: devMode,
							plugins: () => [
								require('autoprefixer')({
									browsers: [
										'ie >= 11',
										'edge >= 12',
										'safari > 9',
										'chrome > 48',
										'firefox > 45'
									]
								})
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: devMode
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

module.exports = [
	coreJS
];
