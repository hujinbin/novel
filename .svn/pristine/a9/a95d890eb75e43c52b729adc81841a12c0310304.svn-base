var path = require('path')
var fs = require('fs')
const nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('webpack-manifest-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const rules = [
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [resolve('src'), resolve('test')],
    use: [
      'babel-loader'
    ]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[ext]')
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('media/[name].[ext]')
    }
  },
  {
    test: /\.(css|less)$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'less-loader',
      }
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[ext]')
    }
  }
]

const serverConfig = {
  target: 'node',
  entry: {
    page: './server/index.js',
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './server/build'),
    libraryTarget: 'commonjs'
  }
}
const appConfig = {
  entry: {
    page: resolve('./src/index.js')
  },
  output: {
    path: path.join(__dirname, '../public/'),
    filename: '[name].js',
    assetsSubDirectory:'',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    },
    symlinks: false,
    aliasFields: ['weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: rules
  },
  plugins: [
    // 提取样式，生成单独文件
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].chunk.css`
    }),
    new ManifestPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(config.build.assetsRoot, './static'),
        ignore: ['.*']
      }
    ])
  ]
}

module.exports = [serverConfig, appConfig]

