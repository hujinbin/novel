// import query from '../database/config';
import query from '../database/init';

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
const findBookList = () => {
    const _sql = '';
    return query(_sql, []);
};


const getBookList = async ctx => {
//     const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
    let data = {};

    // await findUserInfo().then(result => {
    //     console.log(result)
    //     data = result;
    // });
    // await findBookList().then(result => {
    //     console.log(result)
    //     data = result;
    // });

    data = [{
        id:1,
        bookname:'斗罗大陆'
    }];

    ctx.body = data;
};

export default getBookList;
