const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	entry: "./client/index.tsx",
	devServer: {
		contentBase: path.join(__dirname, 'client'),
		publicPath: '/build/public',
		contentBasePublicPath: '/',
		liveReload: true,
		port: 8000
	},
	output: {
		path: __dirname + "/build/public",
		publicPath: "/",
		filename: "main.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./client/index.html",
			filename: "../views/index.html"
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	module: {
		rules: [{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.tsx?$/,
				exclude: ["/node_modules/", "/server"],
				loader: "ts-loader",
				options: { configFile: "tsconfig.client.json" }
			}
		]
	}
};
