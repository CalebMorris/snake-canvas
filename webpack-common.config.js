var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var styleFileName = 'style.css';

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
        'file?hash=sha512&digest=hex&name=[name].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    },
    // Styles
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
    {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
    },
    // Embeded
    { test : /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader : 'url?limit=10000&minetype=application/font-woff' },
    { test : /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader : 'url?limit=10000&minetype=application/font-woff2' },
    { test : /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader : 'url?limit=10000&minetype=application/octet-stream' },
    { test : /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader : 'file' },
  ],
  // https://www.npmjs.com/package/html-webpack-plugin - generate our html file from a template - makes it easier to include custom stuff
  indexPagePlugin : new HtmlWebpackPlugin({
    inject : true,
    title : 'Snake',
    favicon : './app/Assets/turtle_icon.png',
    filename : 'index.html',
    styles : styleFileName,
    template : './app/index_template.html',
  }),

  fetchShimPlugin: new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),

  cssPlugin: new ExtractTextPlugin(styleFileName, {
    allChunks: true,
  }),
};
