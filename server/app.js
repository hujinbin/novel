import Koa from 'koa';
import json from 'koa-json';
import body from 'koa-body';
import logger from 'koa-logger';
import session from 'koa-session';
import compress from 'koa-compress';
import convert from 'koa-convert';
import cors from 'koa2-cors';

const app = new Koa();
app.use(convert(session(app)));
app.use(compress());
app.use(body({
    multipart: true,
    formidable: {
        maxFileSize: 800*1024*1024    // 设置上传文件大小最大限制，默认8M
    }
}));
app.use(cors());
app.use(json());
app.use(logger());

export default app;
