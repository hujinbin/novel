// const mongoose = require('mongoose')
// var env = process.env.NODE_ENV || 'development'

// var db = 'mongodb://root:root@localhost:27017/novel'

// const glob = require('glob')
// const { resolve } = require('path')

// mongoose.Promise = global.Promise

// exports.initSchemas = () => {
//   glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
// }

const mongoose = require('mongoose');
const path = require('path')
const glob = require('glob')
const schema = Object
glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach((file)=>{
    const fileStr = file.split('/')
    const nameJs = fileStr[fileStr.length-1]
    const name = String(nameJs).substr(0,String(nameJs).length-3)
    schema[name] = require(file)
})
    let dbName,
    url = 'mongodb://localhost:27017/';

mongoose.set('useCreateIndex', true);

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

    static connect() {
        return new Promise((resolve, reject) => {
            let _that = this;
            if (_that.client === '') {
                _that.client = mongoose.connect(url + dbName, {useNewUrlParser: true});
                mongoose.connection.on('connected', () => {
                    console.log(`Mongoose connected on ${url + dbName}`);
                    resolve(_that.client);
                });
                mongoose.connection.on('disconnected', (err) => {
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
    static insert(table, obj, canRepeat) {
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
    static findInTable(table, obj = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    console.log(schema[table])
                    schema[table].find(obj).then((err, doc) => {
                        console.log(err, doc)
                        if (err)
                            reject(err);
                        else
                            resolve({length: doc.length, data: doc});
                    })
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
    static delete(table, obj) {
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
