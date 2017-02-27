const path = require('path')
const webpack = require('webpack')

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
  new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery', jquery: 'jquery'})
]

if (process.argv.indexOf('--minimize') !== -1) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}))
}

module.exports = {
  devtool: '#source-map',
  entry: {
    app: ['babel-polyfill', './resources/assets/js/app.js'],
    vendor: ['babel-polyfill', 'vue', 'vue-router', 'vuex', 'vue-resource', 'jquery',
      'bootstrap-sass', 'bootstrap-datepicker', 'select2']
  },
  output: {
    path: './public/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {enforce: 'pre', test: /\.js$|\.vue$/, loader: 'eslint-loader', exclude: /node_modules/, query: {fix: true}},
      {test: /\.vue$/, loader: 'vue-loader', exclude: /node_modules/, options: {loaders: {js: 'babel-loader'}}},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader', exclude: /node_modules/},
      {test: /\.scss$/, loaders: 'style-loader!css-loader!sass-loader', exclude: /node_modules/},
      {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'},
    ]
  },
  plugins: plugins
}