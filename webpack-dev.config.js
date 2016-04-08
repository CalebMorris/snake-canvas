var commonConfig = require('./webpack-common.config.js');

var devLoaders = [];

module.exports = {
  entry : [
    // setup the hot mobule loading
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    // our entry file
    commonConfig.entryFile,
  ],
  output : {
    path : './build',
    filename : 'bundle.[hash].js',
  },
  devtool : 'eval',
  devServer : {
    // proxy calls to api to our own node server backend
    proxy : {
      '/api/*' : 'http://localhost:8000/',
    },
  },
  module : { loaders : commonConfig.loaders.concat(devLoaders) },
  plugins : [
    commonConfig.cssPlugin,
    commonConfig.indexPagePlugin,
  ],
};
