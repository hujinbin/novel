const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webapck.base.config')

module.exports = merge(baseWebpackConfig, {
    entry: './src',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[chunkhash:8].bundle.js',
        chunkFilename: 'chunk.[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(css|less|sass)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                    { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                    { loader: 'sass-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                ]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin({ summary: true }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'none',
        port: 8080,
        historyApiFallback: true
    }
})
