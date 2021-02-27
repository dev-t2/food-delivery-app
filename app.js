const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const { typeDefs, resolvers } = require('./graphql');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get('/', (req, res) => res.end('Welcome to the PhotoShare API by T2'));
app.get('/playground', expressPlayground({ endpoint: 'graphql' }));

app.listen({ port: 4000 }, () => console.log('GraphQL Server running @ http://localhost:4000'));
