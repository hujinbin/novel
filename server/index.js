// const Koa = require('koa')
// const app = new Koa();
// const router = require('koa-better-router')().loadMethods();
// const path = require("path");
// const views=require('koa-views')
// const render = require('koa-ejs');
// // const serve = require('koa-static-server');
// const fs = require("fs");
// import bodyParser from 'koa-bodyparser'

// const config = require('../build/webpack.dev.config');
// const compiler = webpack(config);
// const devMiddleware = require('koa-webpack-dev-middleware');
// const hotMiddleware = require('koa-webpack-hot-middleware');

// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// let { renderToString } = ReactDOMServer;

// const Router=require('./routers/index')

// import webpack from 'webpack'
// import webpackConfig from './config/webpack.config'
// import koaWebpack from 'koa-webpack'

// const {
//     connect
// } = require('./database/init')

// compiler.plugin('emit', (compilation, callback) => {
//     const assets = compilation.assets;
//     let file, data;
//     Object.keys(assets).forEach(key => {
//         if (key.match(/\.html$/)) {
//             file = path.resolve(__dirname, key);
//             data = assets[key].source();
//             fs.writeFileSync(file, data);
//         }
//     });
//     callback();
// });
// // render(app, {
// //     root: path.join(__dirname, '/src'),
// //     extname: '.html'
// // });

// // dev 模式热加载
// app.use(koaWebpack({
//     compiler: webpack(webpackConfig),
//     hot: {
//       log: () => {}
//     },
//     dev: {
//       noInfo: true,
//       serverSideRender: true,
//       hot: true,
//       logLevel: 'error',
//       stats: {
//         colors : true
//       },
//       publicPath: ''
//     },
//   }))

// // router.get('/', async (ctx, next) => {
// //     let url = ctx.request.url.replace('/', '')
// //     const context = {}
// //     let str = renderToString(<ServerRoot url={url} context={context} />)
// //     await ctx.render('index', {
// //       root: str,
// //     })
// // });

// // 解析body
// app.use(bodyParser())

// //router
// app.use(Router.middleware());

// app.listen(1994)
// console.log("demo in run 1994")


require('babel-polyfill');
require('source-map-support').install();
require('css-modules-require-hook')({
    extensions: ['.sass'],
    processorOpts: { parser: require('postcss-sass').parse },
    camelCase: true,
    generateScopedName: '[local]_[hash:base64:10]'
});
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8192
});

const fs = require('fs');
const path = require('path');
const views = require('koa-views');
const convert = require('koa-convert');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config');
const compiler = webpack(config);
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const app = require('./app.js').default;
const router = require('./routes').default;
const clientRoute = require('./middlewares/clientRoute').default;
const port = process.env.port || 3000;

compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key);
            data = assets[key].source();
            fs.writeFileSync(file, data);
        }
    });
    callback();
});

app.use(views(path.resolve(__dirname, '../src'), { map: { html: 'ejs' } }));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(clientRoute);

app.use(convert(devMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath })));
app.use(convert(hotMiddleware(compiler)));

app.listen(port, () => {
    console.log(`\n==> open up http://localhost:${port}/ in your browser.\n`);
});

module.exports = app;
