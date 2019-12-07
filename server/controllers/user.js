// import query from '../database/config';
// import Mongo from '../database/init';

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
// const findBookList = () => {
//     const _sql = '';
//     return query(_sql, []);
// };

const getUserInfo = ctx => {
// const getUserInfo = async ctx => {
    //     const findUserInfo = () => {
    //     const _sql = 'select * from user';
    //     return query(_sql, []);
    // };
    let data = {};

    // console.log(Mongo)
    // Mongo.findInTable('book').then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // await findUserInfo().then(result => {
    //     console.log(result)
    //     data = result;
    // });
    // await findBookList().then(result => {
    //     console.log(result)
    //     data = result;
    // });
    // const mongoose = require('mongoose')
    
    data = {
        userId: 1002,
        name: 'xwb007',
        gender: '男',
        age: 24
    };
    // await mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true },function(err){
    //     if(err){
    //         console.warn('数据库连接失败：'+err);
    //     }else {
    //         console.log('数据库成功连接到');
    //         data.text = 'mongodb启动成功'
    //     }
    // })

    ctx.body = data;
};

export default getUserInfo;
