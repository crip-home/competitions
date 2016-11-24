const path = require('path');
const webpack = require('webpack');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery', jquery: 'jquery'})
];

if (process.argv.indexOf('--minimize') !== -1) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './resources/assets/js/app.js',
        vendor: ['babel-polyfill', 'es6-promise', 'vue', 'vue-router', 'vuex', 'vue-resource', 'jquery', 'bootstrap-sass']
    },
    output: {
        path: './public/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ],
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
    },
    plugins: plugins,
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};