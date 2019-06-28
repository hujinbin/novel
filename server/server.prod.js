import 'babel-polyfill';
import path from 'path';
import serve from 'koa-static';
import views from 'koa-views'
import app from './app.js';
import router from './routes/index';
import clientRoute from './routes/reactRoute';

const port = process.env.port || 3000;

app.use(views(path.resolve(__dirname, '../dist/src'), { map: { html: 'ejs' } }));
app.use(serve(path.resolve(__dirname, '../dist')));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(clientRoute);
app.listen(port, () => {
    console.log(`open up http://localhost:${port}/ in your browser.`);
});
