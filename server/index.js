const Koa = require('koa')
const app = new Koa();
const router = require('koa-better-router')().loadMethods();
const path = require("path");
const views=require('koa-views')
const render = require('koa-ejs');
// const serve = require('koa-static-server');
const fs = require("fs");
import bodyParser from 'koa-bodyparser'

const React = require("react");
const ReactDOMServer = require("react-dom/server");
let { renderToString } = ReactDOMServer;

const Router=require('./routers/index')

import ServerRoot from '../src/index'

import webpack from 'webpack'
import webpackConfig from './config/webpack.config'
import koaWebpack from 'koa-webpack'

const {
    connect
} = require('./database/init')


// render(app, {
//     root: path.join(__dirname, '/src'),
//     extname: '.html'
// });

// dev 模式热加载
app.use(koaWebpack({
    compiler: webpack(webpackConfig),
    hot: {
      log: () => {}
    },
    dev: {
      noInfo: true,
      serverSideRender: true,
      hot: true,
      logLevel: 'error',
      stats: {
        colors : true
      },
      publicPath: ''
    },
  }))

router.get('/', async (ctx, next) => {
    let url = ctx.request.url.replace('/', '')
    const context = {}
    let str = renderToString(<ServerRoot url={url} context={context} />)
    await ctx.render('index', {
      root: str,
    })
});

// 解析body
app.use(bodyParser())

//router
app.use(Router.middleware());

app.listen(1994)
console.log("demo in run 1994")