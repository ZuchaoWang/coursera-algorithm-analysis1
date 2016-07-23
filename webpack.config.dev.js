var webpack = require('webpack');
var baseConfig = require('./webpack.config.base.js');

var config = Object.create(baseConfig);
config.devtool = 'inline-source-map';
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

module.exports = config;
