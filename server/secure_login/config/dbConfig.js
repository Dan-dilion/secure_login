const mysql = require('mysql');
const dbconfig = require('../../dbconfig.json');

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB: node_login');
});

connection.customOptions = { prefix: dbconfig.prefix };

module.exports = connection;
