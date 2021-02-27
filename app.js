const dotenv = require('dotenv');
const express = require('express');
const { MongoClient } = require('mongodb');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const { typeDefs, resolvers } = require('./graphql');

dotenv.config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

const start = async () => {
  const app = express();
  const client = await MongoClient.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const context = { db };
  const server = new ApolloServer({ typeDefs, resolvers, context });

  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('Welcome to the PhotoShare API by T2'));
  app.get('/playground', expressPlayground({ endpoint: 'graphql' }));

  app.listen({ port: PORT }, () =>
    console.log(`GraphQL Server running @ http://localhost:${PORT}`)
  );
};

start();
