const path = require('path')

module.exports = {
	entry: './src/index.ts',
	devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
			{ test: /\.tsx?$/, use: 'ts-loader' ,exclude: /node_modules/},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
