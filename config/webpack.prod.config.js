'use strict'
const path = require('path');
const fs = require('fs');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webapck.base.config')

module.exports = [
    merge(baseWebpackConfig, {
        stats: 'none',
        entry: {
            bundle: './src'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'js/[chunkhash:8].[name].js',
            chunkFilename: 'js/chunk.[chunkhash:8].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                        { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } }
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
            new MiniCssExtractPlugin({
                filename: 'css/[contenthash:8].[name].css'
            }),
            new HtmlWebpackPlugin({
                filename: './src/index.html',
                template: './src/template.html',
                chunksSortMode: 'none'
            })
        ]
    }),
    merge(baseWebpackConfig, {
        stats: 'none',
        entry: {
            server: './server/server.prod.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist/server'),
            filename: '[name].js',
            chunkFilename: 'chunk.[name].js'
        },
        target: 'node',
        node: {
            __filename: true,
            __dirname: true
        },
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'isomorphic-style-loader' },
                        { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                        { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } }
                    ]
                },
                {
                    test: [/\.svg$/, /\.webp$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                      limit: 1024,
                      name: '../img/[name].[hash:8].[ext]',
                    },
                },
                // { test: /\.(png|jpg|jpeg|gif|webp|svg)$/, use: [{ loader: 'url-loader', options: { limit: 1024 } }] },
            ]
        },
        externals: fs
            .readdirSync(path.resolve(__dirname, '../node_modules'))
            .filter(filename => !filename.includes('.bin'))
            .reduce((externals, filename) => {
                externals[filename] = `commonjs ${filename}`;
                return externals;
            }, {}),

        plugins: [new ProgressBarPlugin({ summary: true })]
    })
];
