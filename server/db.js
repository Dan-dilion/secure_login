const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'testing',
  password: 'testing',
  database: 'node_login'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB: node_login');
});

module.exports = connection;
