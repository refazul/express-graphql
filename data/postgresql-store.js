const Pool = require('pg').Pool

if (process.env.db_engine == 'postgresql') {
	global.postgresql = new Pool({
		host: process.env.db_host,
		port: process.env.db_port_postgresql,
		user: process.env.db_user_postgresql,
		password: process.env.db_pass_postgresql,
		database: process.env.db_name_postgresql
	});
}
const db = global.postgresql;

const Product = {
	find: (param) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT * FROM products', [], function (err, results) {
				if (err) reject(err)
				resolve(results.rows);
			});
		});
	},
	findOne: (id) => {
		return new Promise((resolve, reject) => {
			db.query('SELECT * FROM products WHERE id = $1', [id], function (err, result) {
				if (err) reject(err);
				resolve(result.rows[0]);
			});
		})
	},
	create: (input) => {
		return new Promise((resolve, reject) => {
			db.query('INSERT INTO products(title, description, category, price) VALUES($1, $2, $3, $4)', [input.title, input.description, input.category, input.price], function (err, result) {
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
			var counter = 1;
			for (var i in input) {
				if (i == 'id') continue;
				fields.push(i);
				sets.push(i + ' = $' + counter++);
				values.push(input[i]);
			}
			console.log('UPDATE products SET ' + sets.join(', ') + ' WHERE id = $' + counter);
			db.query('UPDATE products SET ' + sets.join(', ') + ' WHERE id = $' + counter, [].concat(values).concat(input.id), function (err, result) {
				if (err) reject(err)
				resolve(input);
			});
		})
	},
	remove: (id) => {
		return new Promise((resolve, reject) => {
			db.query('DELETE FROM products WHERE id = $1', [id], function (err, result) {
				if (err) reject(err)
				resolve(id);
			});
		})
	}
}

module.exports = { PostgresqlProduct: Product }