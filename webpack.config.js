const path = require('path');
const clean = require('clean-webpack-plugin')
const html = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: './app.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new clean(['docs']),
        new html({
            title: 'HDWallet',
            hash: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                screw_ie8: true
            },
            sourceMap: true,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            comments: false
        }),
    ],
}