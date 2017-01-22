const path = require('path')
const webpack = require('webpack')

let plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
  new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery', jquery: 'jquery'})
]

if (process.argv.indexOf('--minimize') !== -1) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}))
}

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './resources/assets/js/app.js',
    vendor: ['babel-polyfill', 'es6-promise', 'vue', 'vue-router', 'vuex', 'vue-resource', 'jquery',
      'bootstrap-sass', 'bootstrap-datepicker', 'select2']
  },
  output: {
    path: './public/js',
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/},
    ],
    loaders: [
      {test: /\.vue$/, loaders: ['vue-loader', 'eslint-loader']},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css!autoprefixer', exclude: /node_modules/},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'},
    ],
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
  },
  plugins: plugins,
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  eslint: {
    fix: true
  }
}