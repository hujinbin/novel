// var path = require('path')
// var fs = require('fs')
// const nodeExternals = require('webpack-node-externals');
// const ManifestPlugin = require('webpack-manifest-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin')

// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

// const rules = [
//   {
//     test: /\.(js|mjs|jsx|ts|tsx)$/,
//     include: [resolve('src'), resolve('test')],
//     use: [
//       'babel-loader'
//     ]
//   },
//   {
//     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//     loader: 'url-loader',
//     options: {
//       limit: 10000,
//       name: utils.assetsPath('img/[name].[ext]')
//     }
//   },
//   {
//     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
//     loader: 'url-loader',
//     options: {
//       limit: 10000,
//       name: utils.assetsPath('media/[name].[ext]')
//     }
//   },
//   {
//     test: /\.(css|less)$/,
//     use: [
//       {
//         loader: 'css-loader',
//         options: {
//           importLoaders: 1
//         }
//       },
//       {
//         loader: 'less-loader',
//       }
//     ]
//   },
//   {
//     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//     loader: 'url-loader',
//     options: {
//       limit: 10000,
//       name: utils.assetsPath('fonts/[name].[ext]')
//     }
//   }
// ]

// const serverConfig = {
//   target: 'node',
//   entry: [
//     // 'react-hot-loader/patch',
//     'webpack/hot/only-dev-server', //HRM更新时刷新整个页面，如果是only-dev-server是手动刷新
//     `${__dirname}/server/index.js`
//   ],
//   // entry: {
//   //   page: './server/index.js',
//   // },
//   externals: [nodeExternals()],
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, './server/build'),
//     libraryTarget: 'commonjs'
//   }
// }
// const appConfig = {
//   // entry: {
//   //   page: resolve('./src/index.js')
//   // },
//   entry: [
//     // 'react-hot-loader/patch',
//     'webpack/hot/only-dev-server', //HRM更新时刷新整个页面，如果是only-dev-server是手动刷新
//     `${__dirname}/src/index.js`
//   ],
//   output: {
//     path: path.join(__dirname, '../public/'),
//     filename: '[name].js',
//     assetsSubDirectory:'',
//     publicPath: '/',
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.json'],
//     alias: {
//       '@': resolve('src')
//     },
//     symlinks: false,
//     aliasFields: ['weapp', 'browser'],
//     mainFields: ['browser', 'module', 'main']
//   },
//   module: {
//     rules: rules
//   },
//   plugins: [
//     // 提取样式，生成单独文件
//     new MiniCssExtractPlugin({
//       filename: `[name].css`,
//       chunkFilename: `[name].chunk.css`
//     }),
//     new ManifestPlugin(),
//     new CopyWebpackPlugin([
//       {
//         from: path.resolve(__dirname, '../static'),
//         to: path.resolve(config.build.assetsRoot, './static'),
//         ignore: ['.*']
//       }
//     ])
//   ]
// }

// module.exports = [serverConfig, appConfig]


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
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
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                    { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } }
                ]
            },
            { test: /\.(png|jpg|gif|webp)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
    plugins: [
        new ProgressBarPlugin({ summary: true }),
        new HtmlWebpackPlugin({
            filename: '../src/index.html',
            template: '../src/index.html'
        })
    ]
};

