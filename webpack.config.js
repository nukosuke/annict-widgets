'use strict';
var webpack = require('webpack');

module.exports = {
  entry: {
    'annict-widgets': './client/javascripts/annict-widgets.js',
  },
  output: {
    path: './public/javascripts',
    publicPath: 'public/javascripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/ , loader: 'babel', exclude: /node_modules/ },
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
