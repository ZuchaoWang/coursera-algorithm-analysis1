var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  externals: {
    'babel-polyfill': 'babel-polyfill'
  },
  output: {
    libraryTarget: 'umd',
    library: 'aa1',
    filename: './dist/aa1.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
