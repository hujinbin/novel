// import query from '../database/config';
import Mongo from '../database/init';

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
// const findBookList = () => {
//     const _sql = '';
//     return query(_sql, []);
// };


const getUserInfo = async ctx => {
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
    // 1.2. 连接指定数据库(URL只有数据库是变化的)
    
    // 1.3. 获取连接对象
    // const conn = mongoose.connection
    
    // 1.4. 绑定连接完成的监听(用来提示连接成功)
    // const book = mongoose.model('book')
    data = {
        userId: 1002,
        name: 'xwb007',
        gender: '男',
        age: 24
    };
    // await mongoose.connect('mongodb://localhost:27017/novel',{ useNewUrlParser: true },function(err){
    //     if(err){
    //         console.warn('数据库连接失败：'+err);
    //     }else {
    //         console.log('数据库成功连接到');
    //         data.text = 'mongodb启动成功'
    //     }
    // })
    // await conn.on('connected', function () {
    //     data.text = 'mongodb启动成功'
    //     if (conn.readyState !== 0) {
    //         next();
    //         return;
    //     }
    //     console.log('mongodb启动成功')
    // })

    ctx.body = data;
};

export default getUserInfo;
