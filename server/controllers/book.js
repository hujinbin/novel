// mysql连接方式
// import query from '../mysql/config';

// const findBookList = () => {
//     const _sql = 'select * from book';
//     return query(_sql, []);
// };
// const getBookList = async ctx => {
//     let data = {};
//     await findBookList().then(result => {
//         data = result;
//     });
//     ctx.body = data;
// };


// mongodb连接方式
// import Mongo from '../mongodb/init';

const getBookList = async ctx => {
    let data = [];
    data.push({
        name:'惠shop',
        bookId: 1,
        auhtor: '乐天堂游戏',
        headImg: 'http://cdn.leheavengame.com/code.png'
    })
    // await Mongo.find('book', {}).then(result=>{
    //     data = result;
    // })
    ctx.body = data;
};

const Book = {
    getBookList
}

export default Book
