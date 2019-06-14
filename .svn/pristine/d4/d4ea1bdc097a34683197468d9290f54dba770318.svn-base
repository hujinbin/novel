const Koa = require('koa')
const app = new Koa();
const router = require('koa-better-router')().loadMethods();
const path = require("path");
const views=require('koa-views')
const render = require('koa-ejs');
// const serve = require('koa-static-server');
const fs = require("fs");

const React = require("react");
const ReactDOMServer = require("react-dom/server");
let { renderToString } = ReactDOMServer;

const Router=require('./routers/index')

const {
    connect
} = require('./database/init')


render(app, {
    root: path.join(__dirname, '/src'),
    extname: '.html'
});

router.get('/', async (ctx, next) => {

    let index = await (path.resolve(__dirname, __dirname +'/src/index.html'));
    let content = '';
    // try {
    //     content =fs.readFile(index);
    // } catch (e) {
    //     console.error(e);
    //     return false;
    // }
    // if (!$) {
    //     return ctx.body = null;
    // }

    // let IndexBundle = require("./dist_server/index.ssr");

    //fetch接口数据
    // let {
    //     data: initialData
    // } = await axios.get('http://localhost:8088/api/todo_list');

    // let instance = React.createElement();
    // console.log('============================')
    // let str = renderToString(instance);


    // $('#root').html(str);

    // //前后端数据要同步
    // let syncScript = `<script id="server-data">window._SERVER_DATA=${JSON.stringify(initialData)}</script>`;

    // $('head').append(syncScript);

    return ctx.body = index;
});

//router
app.use(router.middleware());

// app.use(Router.routes())
//     .use(Router.allowedMethods())

app.use(function (ctx, next) {

    //如果路由中间件已经有数据了，无需再走静态文件中间件了
    if (ctx.body) {
        return true;
    }

    return next();
});

app.listen(1994)
console.log("demo in run 1994")