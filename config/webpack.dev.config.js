'use strict'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webapck.base.config')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './src'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[chunkhash:8].bundle.js',
        chunkFilename: 'chunk.[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                    { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                ]
            },
            {
                test: [/\.svg$/, /\.webp$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 1024,
                  name: 'img/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
        new ProgressBarPlugin({ summary: true }),
        new HtmlWebpackPlugin({
            filename: '../src/index.html',
            template: './src/template.html'
        })
    ]
});
