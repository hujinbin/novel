let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'net_spider'
});

// connection.connect();

// exports.initSchemas = () => {
//   console.log(connection.connect())
  // glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
  // connection.query('SELECT * FROM web_page', function (error, results, fields) {
  //   if (error) throw error;
  //   console.log('The solution is: ', results);
  // });
// }

exports.connect = () => {
  connection.connect();
  connection.query('SELECT * FROM web_page', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
  connection.end();
}