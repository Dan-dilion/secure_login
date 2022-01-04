const mysql = require('mysql');
const dbconfig = require('../../dbconfig.json');

const connectionPool = mysql.createPool({
  connectionLimit: 5,
  acquireTimeout: 10000,
  waitForConnections: true,
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database
});

connectionPool.customOptions = { prefix: dbconfig.prefix };

// console.log('The pool: ', connectionPool);

module.exports = connectionPool;
