'use strict'

module.exports = {
    backendUrl:'http://127.0.0.1:3000',  //后台接口地址
    options: {  // mongodb数据库
        db_user: "admin",
        db_pwd: "123456",
        db_host: "localhost",
        db_port: 27017,
        db_name: "novel"
    },
    mysql:{ // mysql数据库配置
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'test'
    }
}