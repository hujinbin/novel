
// const router = new Router({ prefix: '/api' });

// import Router from 'koa-router';
const Router=require('koa-router')
let router = new Router({ prefix: '/api' });
const getUserInfo=require('../controllers/user.js')

router.get('/user/getUserInfo', getUserInfo);


module.exports = router