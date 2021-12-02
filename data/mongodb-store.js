const mongoose = require('mongoose');

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + process.env.db_user_mongodb + ':' + process.env.db_pass_mongodb + '@' + process.env.db_host + ':' + process.env.db_port_mongodb + '/' + process.env.db_name_mongodb + '?authSource=admin&readPreference=primary&directConnection=true&ssl=false', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const ProductSchema = mongoose.model('Product', {
	title: String,
	description: String,
	category: String,
	price: Number
});

const Product = {
	find: (param) => {
		return new Promise((resolve, reject) => {
			ProductSchema.find(param, (err, docs) => {
				if (err) reject(err)
				else resolve(docs)
			});
		});
	},
	findOne: (id) => {
		return new Promise((resolve, reject) => {
			ProductSchema.findById(id, (err, doc) => {
				if (err) reject(err)
				else resolve(doc)
			})
		})
	},
	create: (input) => {
		const newProduct = new ProductSchema({
			title: input.title,
			description: input.description,
			category: input.category,
			price: input.price
		});

		newProduct.id = newProduct._id;

		return new Promise((resolve, object) => {
			newProduct.save((err) => {
				if (err) reject(err)
				else resolve(newProduct)
			})
		})

	},
	update: (input) => {
		return new Promise((resolve, object) => {
			ProductSchema.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, product) => {
				if (err) reject(err)
				else resolve(product)
			})
		})
	},
	remove: (id) => {
		return new Promise((resolve, object) => {
			ProductSchema.remove({ _id: id }, (err) => {
				if (err) reject(err)
				else resolve('Successfully deleted product')
			})
		})
	}
}

module.exports = { Product }