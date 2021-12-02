var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand(myEnv)

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema');

const app = express();

app.use('/', graphqlHTTP({
	schema: schema,
	graphiql: true,
}));

app.listen(8080, () => console.log('Running on server port localhost:8080/graphql'));
