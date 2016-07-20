module.exports = {
  output: {
    libraryTarget: 'umd',
    library: 'aa1'
  },
  module: {
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }]
  }
};
