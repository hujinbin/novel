import Router from 'koa-router';
import Book from '../controllers/book.js';

const router = new Router({ prefix: '/api' });

router.get('/book/getBookList', Book.getBookList);

export default router;
