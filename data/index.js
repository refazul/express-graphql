const { PostgresqlProduct } = require('./postgresql-store');
const { MongoProduct } = require('./mongodb-store');
const { MysqlProduct } = require('./mysql-store');

var Product = PostgresqlProduct;
if (process.env.db_engine == 'mongodb') {
    Product = MongoProduct;
} else if (process.env.db_engine == 'mysql') {
    Product = MysqlProduct;
}
module.exports = { Product }