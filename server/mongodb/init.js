

// var db = 'mongodb://root:root@localhost:27017/novel'

// const mongoose = require('mongoose');
// const path = require('path')
// const glob = require('glob')
// const schema = Object
// mongoose.Promise = global.Promise
// glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach((file)=>{
//     const fileStr = file.split('/')
//     const nameJs = fileStr[fileStr.length-1]
//     const name = String(nameJs).substr(0,String(nameJs).length-3)
//     schema[name] = require(file)
// })
//     let dbName,
//     url = 'mongodb://localhost:27017/';

// mongoose.set('useCreateIndex', true);

// class Mongo {
//     static getInstance(db) {
//         dbName = db || 'novel';
//         if (!this.instance) {
//             this.instance = new Mongo();
//         }
//         return this.instance;
//     }

//     constructor() {
//         if (!this.client)
//             this.client = '';
//         this.connect();
//     }

//     static connect() {
//         return new Promise((resolve, reject) => {
//             let _that = this;
//             if (_that.client === '') {
//                 _that.client = mongoose.connect(url + dbName, {useNewUrlParser: true});
//                 mongoose.connection.on('connected', () => {
//                     console.log(`Mongoose connected on ${url + dbName}`);
//                     resolve(_that.client);
//                 });
//                 mongoose.connection.on('disconnected', (err) => {
//                     reject(err);
//                 });
//             } else {
//                 resolve(_that.client);
//             }
//         });
//     }

//     /**
//      * 插入
//      * @param table : String
//      * @param obj : Object
//      * @param canRepeat: Boolean
//      * @return await : {status: 0}数据已经存在,无法插入
//      * @return await : {status: 1}数据插入成功
//      */
//     static insert(table, obj, canRepeat) {
//         return new Promise((resolve, reject) => {
//             try {
//                 //默认允许插入重复数据
//                 const flag = canRepeat === undefined ? true : canRepeat;
//                 this.connect().then(() => {
//                     flag ?
//                         new schema[table](obj).save(err => {
//                             if (err)
//                                 reject(err);
//                             else
//                                 resolve({status: 1});
//                         }) :
//                         this.findInTable(table, obj).then(res => {

//                             if (res.length > 0) {
//                                 resolve({status: 0})
//                             }
//                             new schema[table](obj).save(err => {
//                                 if (err)
//                                     reject(err);
//                                 else
//                                     resolve({status: 1});
//                             })
//                         })
//                 });
//             } catch (e) {
//                 reject(e);
//             }
//         });
//     }

//     /**
//      *
//      * @param table : String
//      * @param obj : Object
//      * @returns await : {length: 长度, data: 数据}
//      */
//     static findInTable(table, obj = {}) {
//         return new Promise((resolve, reject) => {
//             try {
//                 this.connect().then(() => {
//                     schema[table].find(obj, (err, doc) => {
//                         console.log(err, doc)
//                         if (err)
//                             reject(err);
//                         else
//                             resolve({length: doc.length, data: doc});
//                     });
//                 });
//             } catch (e) {
//                 throw new Error(e);
//             }
//         });
//     }


//     static async findTab(table, obj){
//         console.log(schema[table])
//         const doc = await schema[table].find(obj)
//         console.log(doc)
//         return doc
//     }
//     /**
//      *
//      * @param table : String
//      * @param obj : Object
//      * @returns {Promise<any>}
//      */
//     static delete(table, obj) {
//         return new Promise((resolve, reject) => {
//             try {
//                 this.connect().then(() => {
//                     schema[table].deleteMany(obj, err => {
//                         if (err)
//                             reject(err);
//                         else
//                             resolve({status: 1});
//                     })
//                 });
//             } catch (e) {
//                 throw new Error(e);
//             }
//         })
//     }

//     /**
//      *
//      * @param table : String
//      * @param old : Object
//      * @param now : Object
//      * @returns {Promise<any>}
//      */
//     updateData(table, old, now) {
//         return new Promise((resolve, reject) => {
//             try {
//                 this.connect().then(() => {
//                     schema[table].updateMany(old, {$set: now}, err => {
//                         if (err)
//                             reject(err);
//                         else
//                             resolve({status: 1});
//                     })
//                 });
//             } catch (e) {
//                 throw new Error(e);
//             }
//         })
//     }
// }
// // module.exports = Mongo;
// export default Mongo;



/**
 * mongoose操作类(封装mongodb)
 */
 
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('pomelo-logger').getLogger('mongodb-log');
 
var options = {
  db_user: "game",
  db_pwd: "12345678",
  db_host: "localhost",
  db_port: 27017,
  db_name: "novel"
};
 
// var dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
var dbURL = "mongodb://" + options.db_host + ":" + options.db_port + "/" + options.db_name;
mongoose.connect(dbURL);
 
mongoose.connection.on('connected', function (err) {
  if (err) logger.error('Database connection failure');
});
 
mongoose.connection.on('error', function (err) {
  logger.error('Mongoose connected error ' + err);
});
 
mongoose.connection.on('disconnected', function () {
  logger.error('Mongoose disconnected');
});
 
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
 

// const path = require('path')
const glob = require('glob')
// const schema = Object
mongoose.Promise = global.Promise


const Mongo = function () {
  this.mongoClient = {};
//   var filename = path.join(path.dirname(__dirname).replace('app', ''), 'config/table.json');
  glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach((file)=>{
    const fileStr = file.split('/')
    const nameJs = fileStr[fileStr.length-1]
    const name = String(nameJs).substr(0,String(nameJs).length-3)
    this.tabConf[name] = require(file)
  })
//   this.tabConf = JSON.parse(fs.readFileSync(path.normalize(filename)));
};
 
/**
 * 初始化mongoose model
 * @param table_name 表名称(集合名称)
 */
Mongo.prototype.getConnection = function (table_name) {
  if (!table_name) return;
  if (!this.tabConf[table_name]) {
    logger.error('No table structure');
    return false;
  }
 
  var client = this.mongoClient[table_name];
  if (!client) {
    //构建用户信息表结构
    var nodeSchema = new mongoose.Schema(this.tabConf[table_name]);
 
    //构建model
    client = mongoose.model(table_name, nodeSchema, table_name);
 
    this.mongoClient[table_name] = client;
  }
  return client;
};
 
/**
 * 保存数据
 * @param table_name 表名
 * @param fields 表数据
 * @param callback 回调方法
 */
Mongo.prototype.save = function (table_name, fields, callback) {
  if (!fields) {
    if (callback) callback({msg: 'Field is not allowed for null'});
    return false;
  }
 
  var err_num = 0;
  for (var i in fields) {
    if (!this.tabConf[table_name][i]) err_num ++;
  }
  if (err_num > 0) {
    if (callback) callback({msg: 'Wrong field name'});
    return false;
  }
 
  var node_model = this.getConnection(table_name);
  var mongooseEntity = new node_model(fields);
  mongooseEntity.save(function (err, res) {
    if (err) {
      if (callback) callback(err);
    } else {
      if (callback) callback(null, res);
    }
  });
};
 
/**
 * 更新数据
 * @param table_name 表名
 * @param conditions 更新需要的条件 {_id: id, user_name: name}
 * @param update_fields 要更新的字段 {age: 21, sex: 1}
 * @param callback 回调方法
 */
Mongo.prototype.update = function (table_name, conditions, update_fields, callback) {
  if (!update_fields || !conditions) {
    if (callback) callback({msg: 'Parameter error'});
    return;
  }
  var node_model = this.getConnection(table_name);
  node_model.update(conditions, {$set: update_fields}, {multi: true, upsert: true}, function (err, res) {
    if (err) {
      if (callback) callback(err);
    } else {
      if (callback) callback(null, res);
    }
  });
};
 
/**
 * 更新数据方法(带操作符的)
 * @param table_name 数据表名
 * @param conditions 更新条件 {_id: id, user_name: name}
 * @param update_fields 更新的操作符 {$set: {id: 123}}
 * @param callback 回调方法
 */
Mongo.prototype.updateData = function (table_name, conditions, update_fields, callback) {
  if (!update_fields || !conditions) {
    if (callback) callback({msg: 'Parameter error'});
    return;
  }
  var node_model = this.getConnection(table_name);
  node_model.findOneAndUpdate(conditions, update_fields, {multi: true, upsert: true}, function (err, data) {
    if (callback) callback(err, data);
  });
};
 
/**
 * 删除数据
 * @param table_name 表名
 * @param conditions 删除需要的条件 {_id: id}
 * @param callback 回调方法
 */
Mongo.prototype.remove = function (table_name, conditions, callback) {
  var node_model = this.getConnection(table_name);
  node_model.remove(conditions, function (err, res) {
    if (err) {
      if (callback) callback(err);
    } else {
      if (callback) callback(null, res);
    }
  });
};
 
/**
 * 查询数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param fields 待返回字段
 * @param callback 回调方法
 */
Mongo.prototype.find = function (table_name, conditions, fields, callback) {
  var node_model = this.getConnection(table_name);
  node_model.find(conditions, fields || null, {}, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
 
/**
 * 查询单条数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
Mongo.prototype.findOne = function (table_name, conditions, callback) {
  var node_model = this.getConnection(table_name);
  node_model.findOne(conditions, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
 
/**
 * 根据_id查询指定的数据
 * @param table_name 表名
 * @param _id 可以是字符串或 ObjectId 对象。
 * @param callback 回调方法
 */
Mongo.prototype.findById = function (table_name, _id, callback) {
  var node_model = this.getConnection(table_name);
  node_model.findById(_id, function (err, res){
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
 
/**
 * 返回符合条件的文档数
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
Mongo.prototype.count = function (table_name, conditions, callback) {
  var node_model = this.getConnection(table_name);
  node_model.count(conditions, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
 
/**
 * 查询符合条件的文档并返回根据键分组的结果
 * @param table_name 表名
 * @param field 待返回的键值
 * @param conditions 查询条件
 * @param callback 回调方法
 */
Mongo.prototype.distinct = function (table_name, field, conditions, callback) {
  var node_model = this.getConnection(table_name);
  node_model.distinct(field, conditions, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
 
/**
 * 连写查询
 * @param table_name 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
 * @param callback 回调方法
 */
Mongo.prototype.where = function (table_name, conditions, options, callback) {
  var node_model = this.getConnection(table_name);
  node_model.find(conditions)
    .select(options.fields || '')
    .sort(options.sort || {})
    .limit(options.limit || {})
    .exec(function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
};
 
module.exports = new Mongo();