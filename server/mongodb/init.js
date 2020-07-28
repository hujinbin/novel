
'use strict'

const path = require('path');
const mongoose = require('mongoose');
const logger = require('pomelo-logger').getLogger('mongodb-log');
const glob = require('glob')
const config = require('../../config/config')

const dbURL = "mongodb://" + config.options.db_user + ":" + config.options.db_pwd + "@" + config.options.db_host + ":" + config.options.db_port + "/" + config.options.db_name;
// const dbURL = "mongodb://" + options.db_host + ":" + options.db_port + "/" + options.db_name;
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
mongoose.Promise = global.Promise
// 初始化mongoose model
const schema = Object

/**
 * @param schema[name] 表名称(集合名称)
 */
glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach((file) => {
  const fileStr = file.split('/')
  const nameJs = fileStr[fileStr.length - 1]
  const name = String(nameJs).substr(0, String(nameJs).length - 3)
  schema[name] = require('./schema/'+name+'.js')
})


const Mongo = function () {};

/**
 * 保存数据
 * @param table_name 表名
 * @param fields 表数据
 * @param callback 回调方法
 */
Mongo.prototype.save = function (table_name, fields) {
  return new Promise((resolve, reject) => {
    if (!fields) {
      reject({ msg: 'Field is not allowed for null' });
    }
    let mongooseEntity = new schema[table_name](fields);
    mongooseEntity.save((err, res)=> {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * 更新数据
 * @param table_name 表名
 * @param conditions 更新需要的条件 {_id: id, user_name: name}
 * @param update_fields 要更新的字段 {age: 21, sex: 1}
 * @param callback 回调方法
 */
Mongo.prototype.update = function (table_name, conditions, update_fields) {
  return new Promise((resolve, reject) => {
    if (!update_fields || !conditions) {
      reject({ msg: 'Parameter error' });
    }
    schema[table_name].findOneAndUpdate(conditions, update_fields, { multi: true, upsert: true }, (err, res) => {
      if (err){
        reject(err);
      }else{
        resolve(res);
      }
    });
  });
};

/**
 * 更新数据方法(带操作符的)
 * @param table_name 数据表名
 * @param conditions 更新条件 {_id: id, user_name: name}
 * @param update_fields 更新的操作符 {$set: {id: 123}}
 * @param callback 回调方法
 */
Mongo.prototype.updateData = function (table_name, conditions, update_fields) {
  return new Promise((resolve, reject) => {
    if (!update_fields || !conditions) {
      reject({ msg: 'Parameter error' });
    }
    schema[table_name].findOneAndUpdate(conditions, update_fields, { multi: true, upsert: true }, (err, res) => {
        resolve(err, res)
    });
  });
};

/**
 * 删除数据
 * @param table_name 表名
 * @param conditions 删除需要的条件 {_id: id}
 * @param callback 回调方法
 */
Mongo.prototype.remove = function (table_name, conditions) {
  return new Promise((resolve, reject) => {
    schema[table_name].remove(conditions, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
};

/**
 * 查询数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param fields 待返回字段
 * @param callback 回调方法
 */
Mongo.prototype.find = function (table_name, conditions, fields) {
  return new Promise((resolve, reject) => {
    schema[table_name].find(conditions, fields || null, {}, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
};

/**
 * 查询单条数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
Mongo.prototype.findOne = function (table_name, conditions) {
  return new Promise((resolve, reject) => {
    schema[table_name].findOne(conditions, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
};

/**
 * 根据_id查询指定的数据
 * @param table_name 表名
 * @param _id 可以是字符串或 ObjectId 对象。
 * @param callback 回调方法
 */
Mongo.prototype.findById = function (table_name, _id) {
  return new Promise((resolve, reject) => {
    schema[table_name].findById(_id, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
};

/**
 * 返回符合条件的文档数
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
Mongo.prototype.count = function (table_name, conditions) {
  return new Promise((resolve, reject) => {
    schema[table_name].count(conditions, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
};

/**
 * 查询符合条件的文档并返回根据键分组的结果
 * @param table_name 表名
 * @param field 待返回的键值
 * @param conditions 查询条件
 * @param callback 回调方法
 */
Mongo.prototype.distinct = function (table_name, field, conditions) {
  return new Promise((resolve, reject) => {
    schema[table_name].distinct(field, conditions, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
};

/**
 * 连写查询
 * @param table_name 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10, page:1}
 * @param callback 回调方法
 */
Mongo.prototype.where = function (table_name, conditions, options) {
  let skipnum = 0;
  if(options.limit && options.page){
    skipnum = (Number(options.page) - 1) * Number(options.limit)  //跳过页数
  }
  return new Promise((resolve, reject) => {
    schema[table_name].find(conditions)
      .select(options.fields || '')
      .sort(options.sort || {})
      .skip(skipnum)
      .limit(options.limit || 20)
      .exec((err, res)=>{
        if (err)
          reject(err);
        else
          resolve(res);
      });
  });
};

module.exports = new Mongo();