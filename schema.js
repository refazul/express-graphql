const { makeExecutableSchema } = require('@graphql-tools/schema');
const { Product } = require('./data');

const resolvers = {
	Query: {
		getProduct: (root, { id }) => Product.findOne(id),
		getProducts: (root, param) => Product.find(param)
	},
	Mutation: {
		createProduct: (root, { input }) => Product.create(input),
		updateProduct: (root, { input }) => Product.update(input),
		removeProduct: (root, { id }) => Product.remove(id)
	},
};

const typeDefs = `
    type Product {
        id: ID,
        title: String,
        description: String,
        category: String,
        price: Float
    }
    input ProductInput {
        id: ID,
        title: String,
        description: String,
        category: String,
        price: Float
    }
    type Query {
        getProduct (id: ID): Product
        getProducts: [Product]
    }
    type Mutation {
        createProduct (input: ProductInput): Product
        updateProduct (input: ProductInput): Product
        removeProduct (id: ID!): String
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };

/*
mutation {
	createProduct(input: {
		title: "RTX 3070"
		description: "LHR"
		category: "GPU"
		price: 1000
	}) {
		title
		description
	}
}
query {
	getProducts {
		title
		description
	}
}
*/