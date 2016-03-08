var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entryFile : './app/index.js',
  loaders : [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?presets[]=es2015',
    },
  // image loader - https://www.npmjs.com/package/image-webpack-loader
    {
      test : /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders : [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    },
    // styles
    {
      test : /\.[s]?css$/,
      loader : 'style!css!autoprefixer-loader?browsers=last 2 version!sass',
    },
    // and font files - embed them if possible
    { test : /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader : 'url?limit=10000&minetype=application/font-woff' },
    { test : /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader : 'url?limit=10000&minetype=application/font-woff2' },
    { test : /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader : 'url?limit=10000&minetype=application/octet-stream' },
    { test : /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader : 'file' },
  ],
  // https://www.npmjs.com/package/html-webpack-plugin - generate our html file from a template - makes it easier to include custom stuff
  indexPagePlugin : new HtmlWebpackPlugin({
    inject : true,
    title : 'Snake',
    filename : 'index.html',
    template : './app/index_template.html',
  }),

  fetchShimPlugin: new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),
};
