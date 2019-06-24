'use strict'
const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            { test: /\.(png|jpg|gif|webp)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
}
