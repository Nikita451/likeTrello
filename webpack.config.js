var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
module.exports = {
	entry: "./bin/www.js",
    target: 'node', // pass fs, os and etc... (standart modules)
    externals: [nodeExternals()], //pass all modules in node_modules
    node: {
      __dirname: true
    },
	output: {
		path: __dirname + "/bin/",
		//publicPath: "build/",
		filename: "backend.js",
	},
	module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: [/node_modules/, /react/],
                query: {
				  presets: ['es2015', 'stage-0']
				}
            },
            {
                test: /\.json$/,
                exclude: [/node_modules/, /react/],
                loader: "json-loader"
            }
            /*  {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },*/
            /*{
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },*/
       ]
  }
};
