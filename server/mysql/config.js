import mysql from 'mysql';
const config = require('../../config/config')


const pool = mysql.createPool(config.mysql);

/**
 *
 * @param sql 接收的sql语句
 * @param values 接受的参数： 为数组
 */
const query = function(sql, values) {
    return new Promise((resolve, reject) => {
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
