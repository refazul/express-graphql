const mysql = require('mysql');

const con = mysql.createConnection({
	host: process.env.db_host,
	port: process.env.db_port,
	user: process.env.db_user,
	password: process.env.db_pass,
	database: process.env.db_name
});

const Product = {
	find: (param) => {
		return new Promise((resolve, reject) => {
			con.query('SELECT * FROM products', [], function (err, results) {
				con.end();
				if (err) reject(err)
				resolve(results);
			});
		});
	},
	findOne: (id) => {
		return new Promise((resolve, reject) => {
			con.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
				con.end();
				if (err) reject(err)
				resolve(results);
			});
		})
	},
	create: (input) => {
		return new Promise((resolve, reject) => {
			con.query('INSERT INTO products SET ?', input, function (err, result) {
				con.end();
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
			con.query('UPDATE products SET ' + sets.join(', ') + ' WHERE id = ?', [].concat(values).concat(input.id), function (err, result) {
				con.end();
				if (err) reject(err)
				resolve(input);
			});
		})
	},
	remove: (id) => {
		return new Promise((resolve, reject) => {
			con.query('DELETE FROM products WHERE id = ?', [id], function (err, result) {
				con.end();
				if (err) reject(err)
				resolve(id);
			});
		})
	}
}

module.exports = { Product }