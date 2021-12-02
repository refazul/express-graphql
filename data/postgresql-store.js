const Pool = require('pg').Pool

const pool = new Pool({
	host: process.env.db_host,
	port: process.env.db_port,
	user: process.env.db_user,
	password: process.env.db_pass,
	database: process.env.db_name
})

pool.query('SELECT NOW()', (err, res) => {
	console.log(err, res)
	pool.end()
})

const Product = {}

module.exports = { Product }