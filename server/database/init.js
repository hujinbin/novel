const mongoose = require('mongoose')
var env = process.env.NODE_ENV || 'development'

var db = 'mongodb://localhost/story-bookShelf'

const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', false)
    }

    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.on('error', err => {
      console.log(err)
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected successfully!')
    })
  })
}
const query = function(sql, values) {
  return new Promise((resolve, reject) => {
     mongoose.connect(db)
     mongoose.connection.on('disconnected', () => {
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.on('error', err => {
      console.log(err)
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected successfully!')
    })
      pool.getConnection(function(err, connection) {
          if (err) {
              resolve(err);
          } else {
              connection.query(sql, values, (err, rows) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(rows);
                  }
                  connection.release();
              });
          }
      });
  });
};

export default query;
