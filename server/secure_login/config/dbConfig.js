const mysql = require('mysql');
const dbconfig = require('../../dbconfig.json');

const connectionPool = mysql.createPool({
  connectionLimit: 1,
  acquireTimeout: 10000,
  waitForConnections: false,
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database
});


// connection.connect(err => {
//   if (err) throw err;
//   console.log(`Connected to database: ${dbconfig.database} as ${dbconfig.user}`);
// });

connectionPool.customOptions = { prefix: dbconfig.prefix };

console.log('The pool: ', connectionPool);

module.exports = connectionPool;
