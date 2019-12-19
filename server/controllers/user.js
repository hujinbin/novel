// mysql连接方式
// import query from '../mysql/config';

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
// const getUserInfo = async ctx => {
//     let data = {};
//     await findUserInfo().then(result => {
//         data = result;
//     });
//     ctx.body = data;
// };


// mongodb连接方式
import Mongo from '../mongodb/init';
const getUserInfo = async ctx => {
    let data = {};
    // data = {
    //     userId: 1002,
    //     name: 'xwb007',
    //     gender: '男',
    //     age: 24
    // };
    await Mongo.findOne('book', {} , function (err, res) {
        console.log(err,res)
        if(err === null){
            data = res;
        }  
    });
    ctx.body = data;
};


export default getUserInfo;
