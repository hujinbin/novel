// const mongoose = require('mongoose')
// var env = process.env.NODE_ENV || 'development'

// var db = 'mongodb://localhost:27017'

// const glob = require('glob')
// const { resolve } = require('path')

// mongoose.Promise = global.Promise

// exports.initSchemas = () => {
//   glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
// }

// exports.connect = () => {
//   let maxConnectTimes = 0

//   return new Promise((resolve, reject) => {
//     if (process.env.NODE_ENV !== 'production') {
//       mongoose.set('debug', false)
//     }

//     mongoose.connect(db)

//     mongoose.connection.on('disconnected', () => {
//       maxConnectTimes++

//       if (maxConnectTimes < 5) {
//         mongoose.connect(db)
//       } else {
//         throw new Error('数据库挂了吧，快去修吧少年')
//       }
//     })

//     mongoose.connection.on('error', err => {
//       console.log(err)
//       maxConnectTimes++

//       if (maxConnectTimes < 5) {
//         mongoose.connect(db)
//       } else {
//         throw new Error('数据库挂了吧，快去修吧少年')
//       }
//     })

//     mongoose.connection.once('open', () => {
//       resolve()
//       console.log('MongoDB Connected successfully!')
//     })
//   })
// }
// const query = function(sql, values) {
//   let maxConnectTimes = 0
//   return new Promise((resolve, reject) => {
//     mongoose.connect(db ,(err, db)=>{
//       if (err) throw err;
//       var dbo = db.db("novel");
//       dbo.collection(sql). find(values).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//         db.close();
//       });
//     })
//      mongoose.connection.on('disconnected', () => {
//       maxConnectTimes++

//       if (maxConnectTimes < 5) {
//         mongoose.connect(db)
//       } else {
//         throw new Error('数据库挂了吧，快去修吧少年')
//       }
//     })

//     mongoose.connection.on('error', err => {
//       console.log(err)
//       maxConnectTimes++
//       if (maxConnectTimes < 5) {
//         mongoose.connect(db)
//       } else {
//         throw new Error('数据库挂了吧，快去修吧少年')
//       }
//     })

//     mongoose.connection.once('open', () => {
//       resolve()
//       console.log('MongoDB Connected successfully!')
//     })
    
//   });
// };

// export default query;


const mongo = require('mongoose'),
    path = require('path');
    // const schema = require(path.join(__dirname, '/schema'));
    // console.log('schema====================')
    // console.log(schema)
    // const book = schema.book;
    // console.log(schema)
    // console.log(book)

    let dbName,
    url = 'mongodb://localhost:27017/';

mongo.set('useCreateIndex', true);

class Mongo {
    static getInstance(db) {
        dbName = db || 'novel';
        if (!this.instance) {
            this.instance = new Mongo();
        }
        return this.instance;
    }

    constructor() {
        if (!this.client)
            this.client = '';
        this.connect();
    }

    connect() {
        return new Promise((resolve, reject) => {
            let _that = this;
            if (_that.client === '') {
                _that.client = mongo.connect(url + dbName, {useNewUrlParser: true});
                mongo.connection.on('connected', () => {
                    console.log(`Mongoose connected on ${url + dbName}`);
                    resolve(_that.client);
                });
                mongo.connection.on('disconnected', (err) => {
                    reject(err);
                });
            } else {
                resolve(_that.client);
            }
        });
    }

    /**
     *
     * @param table : String
     * @param obj : Object
     * @param canRepeat: Boolean
     * @return await : {status: 0}数据已经存在,无法插入
     * @return await : {status: 1}数据插入成功
     */
    insert(table, obj, canRepeat) {
        return new Promise((resolve, reject) => {
            try {
                //默认允许插入重复数据
                const flag = canRepeat === undefined ? true : canRepeat;
                this.connect().then(() => {
                    flag ?
                        new schema[table](obj).save(err => {
                            if (err)
                                reject(err);
                            else
                                resolve({status: 1});
                        }) :
                        this.findInTable(table, obj).then(res => {

                            if (res.length > 0) {
                                resolve({status: 0})
                            }
                            new schema[table](obj).save(err => {
                                if (err)
                                    reject(err);
                                else
                                    resolve({status: 1});
                            })
                        })
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     *
     * @param table : String
     * @param obj : Object
     * @returns await : {length: 长度, data: 数据}
     */
    findInTable(table, obj = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    schema[table].find(obj, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve({length: doc.length, data: doc});
                    });
                });
            } catch (e) {
                throw new Error(e);
            }
        });
    }

    /**
     *
     * @param table : String
     * @param obj : Object
     * @returns {Promise<any>}
     */
    delete(table, obj) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    schema[table].deleteMany(obj, err => {
                        if (err)
                            reject(err);
                        else
                            resolve({status: 1});
                    })
                });
            } catch (e) {
                throw new Error(e);
            }
        })
    }

    /**
     *
     * @param table : String
     * @param old : Object
     * @param now : Object
     * @returns {Promise<any>}
     */
    updateData(table, old, now) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    schema[table].updateMany(old, {$set: now}, err => {
                        if (err)
                            reject(err);
                        else
                            resolve({status: 1});
                    })
                });
            } catch (e) {
                throw new Error(e);
            }
        })
    }
}
// module.exports = Mongo;
export default Mongo;

const mongoose = require('mongoose');
