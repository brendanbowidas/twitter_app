/* eslint-disable */
var path = require('path')
var webpack = require('webpack')
module.exports = {
  output: {
    path: path.resolve(__dirname, '/dist' ),
    publicPath: '/dist/',
    filename: 'src.bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new wepack.DefinePlugin({
      ENV: JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass',
      },
    ]
  },
  vue: {
    loaders: {
      sass: 'style!css!sass',
      html: 'vue-html-loader?attrs[]=source:src&attrs[]=img:src',
      autoprefixer: {
        browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
      },
    },
  },
  devtool: '#source-map'
}
