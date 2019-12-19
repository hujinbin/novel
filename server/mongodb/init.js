
 
const path = require('path');
const mongoose = require('mongoose');
const logger = require('pomelo-logger').getLogger('mongodb-log');
const glob = require('glob')
 
const options = {
  db_user: "game",
  db_pwd: "12345678",
  db_host: "localhost",
  db_port: 27017,
  db_name: "novel"
};
 
// const dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
const dbURL = "mongodb://" + options.db_host + ":" + options.db_port + "/" + options.db_name;
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

glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach((file)=>{
    const fileStr = file.split('/')
    const nameJs = fileStr[fileStr.length-1]
    const name = String(nameJs).substr(0,String(nameJs).length-3)
    schema[name] = require(file)
})


const Mongo = function () {
   this.tabConf = schema
};
 
/**
 * 
 * @param table_name 表名称(集合名称)
 */

 
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
 
  let err_num = 0;
  for (let i in fields) {
    if (!this.tabConf[table_name][i]) err_num ++;
  }
  if (err_num > 0) {
    if (callback) callback({msg: 'Wrong field name'});
    return false;
  }
  schema[table_name].save(function (err, res) {
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
  schema[table_name].update(conditions, {$set: update_fields}, {multi: true, upsert: true}, function (err, res) {
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
  schema[table_name].findOneAndUpdate(conditions, update_fields, {multi: true, upsert: true}, function (err, data) {
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
  schema[table_name].remove(conditions, function (err, res) {
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
  schema[table_name].find(conditions, fields || null, {}, function (err, res) {
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
  schema[table_name].findOne(conditions, function (err, res) {
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
  schema[table_name].findById(_id, function (err, res){
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
  schema[table_name].count(conditions, function (err, res) {
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
  schema[table_name].distinct(field, conditions, function (err, res) {
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
  schema[table_name].find(conditions)
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