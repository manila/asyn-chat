const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	watch: true,
	entry: "./client/index.ts",
	output: {
		path: __dirname + "/build/public",
		publicPath: "./",
		filename: "main.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./client/index.html",
			filename: "../views/index.html"
		})
	],
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: ["/node_modules/", "/server"],
				loader: "ts-loader",
				options: { configFile: "tsconfig.client.json" }
			}
		]
	}
};
