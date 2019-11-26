// import query from '../database/config';
import Mongo from '../database/init';

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
const findBookList = () => {
    const _sql = '';
    return query(_sql, []);
};


const getUserInfo = async ctx => {
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

    data = {
        userId: 1002,
        name: 'xwb007',
        gender: '男',
        age: 24
    };

    ctx.body = data;
};

export default getUserInfo;
