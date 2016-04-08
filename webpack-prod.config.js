var webpack = require('webpack');

var commonConfig = require('./webpack-common.config.js');

var prodLoaders = [];

module.exports = {
  entry : [ commonConfig.entryFile ],
  output : {
    path : './build',
    filename : 'bundle.[hash].js',
  },
  devtool : 'source-map',
  devServer : {
    // proxy calls to api to our own node server backend
    proxy : {
      '/api/*' : 'http://localhost:8000/',
    },
  },
  module : {
    loaders : commonConfig.loaders.concat(prodLoaders),
  },
  plugins : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize : true,
      exclude : /\.s?css$/,
    }),
    commonConfig.cssPlugin,
    commonConfig.indexPagePlugin,
  ],
};
