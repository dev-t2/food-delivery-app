const Type = require('./Type');
const Query = require('./Query');
const Mutation = require('./Mutation');

const resolvers = {
  ...Type,
  Query,
  Mutation,
};

module.exports = resolvers;
