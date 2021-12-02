const mysql = require('mysql');

if (process.env.db_engine == 'mysql') {
	global.mysql = mysql.createConnection({
		host: process.env.db_host,
		port: process.env.db_port_mysql,
		user: process.env.db_user_mysql,
		password: process.env.db_pass_mysql,
		database: process.env.db_name_mysql
	});
}
const db = global.mysql;

const Product = {
	find: (param) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT * FROM products', [], function (err, results) {
				db.end();
				if (err) reject(err)
				resolve(results);
			});
		});
	},
	findOne: (id) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
				db.end();
				if (err) reject(err)
				resolve(result);
			});
		})
	},
	create: (input) => {
		return new Promise((resolve, reject) => {
			db.query('INSERT INTO products SET ?', input, function (err, result) {
				db.end();
				if (err) reject(err)
				resolve(input);
			});
		})

	},
	update: (input) => {
		return new Promise((resolve, reject) => {
			var fields = [];
			var sets = [];
			var values = [];
			for (var i in input) {
				if (i == 'id') continue;
				fields.push(i);
				sets.push(i + ' = ?');
				values.push(input[i]);
			}
			db.query('UPDATE products SET ' + sets.join(', ') + ' WHERE id = ?', [].concat(values).concat(input.id), function (err, result) {
				db.end();
				if (err) reject(err)
				resolve(input);
			});
		})
	},
	remove: (id) => {
		return new Promise((resolve, reject) => {
			db.query('DELETE FROM products WHERE id = ?', [id], function (err, result) {
				db.end();
				if (err) reject(err)
				resolve(id);
			});
		})
	}
}

module.exports = { MysqlProduct: Product }