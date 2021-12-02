const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_user,
  password: process.env.db_pass,
  database: process.env.db_name
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.end();
});

const Product = {}

module.exports = { Product }