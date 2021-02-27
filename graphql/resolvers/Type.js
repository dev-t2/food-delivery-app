const { GraphQLScalarType } = require('graphql');

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value',
  parseValue: (value) => new Date(value),
  serialize: (value) => new Date(value).toISOString(),
  parseLiteral: (ast) => ast.value,
});

const User = {
  postedPhotos: (parent) => photos.filter((photo) => photo.userId === parent.id),
  inPhotos: (parent) =>
    tags
      .filter((tag) => tag.userId === parent.id)
      .map((tag) => tag.photoId)
      .map((photoId) => photos.find((photo) => photo.id === photoId)),
};

const Photo = {
  url: (parent) => `http://yoursite.com/img/${parent.id}`,
  postedBy: (parent) => users.find((user) => user.id === parent.userId),
  taggedUsers: (parent) =>
    tags
      .filter((tag) => tag.photoId === parent.id)
      .map((tag) => tag.userId)
      .map((userId) => users.find((user) => user.id === userId)),
};

module.exports = { DateTime, User, Photo };
