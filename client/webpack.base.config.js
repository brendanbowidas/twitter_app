/* eslint-disable */
var webpack = require('webpack')
require('babel-polyfill')



module.exports = {
  entry: ['babel-polyfill', './src'],
  plugins: [
    new webpack.ProvidePlugin({
    /*  'store': 'store',
      'utils': 'utils',
      'config': 'config', */
      'R': 'ramda',
    }),
  ],
  resolve: {
    // all these extensions will be resolved without specifying extension in the `require` function
    extensions: ['', '.js'],
    // files in these directory can be required without a relative path
    modulesDirectories: [
      'node_modules',
      'lib',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/,
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif|svg|mp4|webm|ogv)$/,
        loaders: [
          'file?name=client/[name].[ext]?[hash]',
        ]
      },

    ]
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime'],
  }

}
