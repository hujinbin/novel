const Router=require('koa-router')
const router = new Router({ prefix: '/api' });
module.exports = (router) => {
    router.get('/', '');
    router.get('/page2', '');
    router.get('/favicon.ico', '');
    router.get('/test', '');
}
import Router from 'koa-router';
import getUserInfo from '../controllers/user.js';



router.get('/user/getUserInfo', getUserInfo);

export default router;