const { GraphQLScalarType } = require('graphql');
const { ApolloServer } = require('apollo-server');

const typeDefs = `
  scalar DateTime

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  input PostPhotoInput {
    name: String!
    description: String
    category: PhotoCategory = PORTRAIT
  }

  type User {
    id: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }

  type Photo {
    id: ID!
    name: String!
    url: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    taggedUsers: [User!]!
    created: DateTime!
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`;

let _id = 0;

let users = [
  { id: '6dc1e629-c513-4434-8b1c-c3231a7258c3', name: 'Brunei' },
  { id: '70653fa7-17f4-4133-8e85-e0c6ba032b07', name: 'Hawaii' },
  { id: '68bc16dd-8b91-48f6-b757-795023c8a28f', name: 'Roads' },
];

let photos = [
  {
    id: '0',
    userId: '70653fa7-17f4-4133-8e85-e0c6ba032b07',
    name: 'Ergonomic',
    description: 'Washington port synthesize',
    category: 'ACTION',
    created: '2021-02-25',
  },
  {
    id: '1',
    userId: '68bc16dd-8b91-48f6-b757-795023c8a28f',
    name: 'paradigms',
    category: 'SELFIE',
    created: '2021-02-26',
  },
  {
    id: '2',
    userId: '68bc16dd-8b91-48f6-b757-795023c8a28f',
    name: 'archive',
    description: 'SSL bus',
    category: 'LANDSCAPE',
    created: '2021-02-27',
  },
];

let tags = [
  { photoId: '1', userId: '6dc1e629-c513-4434-8b1c-c3231a7258c3' },
  { photoId: '2', userId: '6dc1e629-c513-4434-8b1c-c3231a7258c3' },
  { photoId: '2', userId: '70653fa7-17f4-4133-8e85-e0c6ba032b07' },
  { photoId: '2', userId: '68bc16dd-8b91-48f6-b757-795023c8a28f' },
];

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value',
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),

  User: {
    postedPhotos: (parent) => photos.filter((photo) => photo.userId === parent.id),
    inPhotos: (parent) =>
      tags
        .filter((tag) => tag.userId === parent.id)
        .map((tag) => tag.photoId)
        .map((photoId) => photos.find((photo) => photo.id === photoId)),
  },

  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}`,
    postedBy: (parent) => users.find((user) => user.id === parent.userId),
    taggedUsers: (parent) =>
      tags
        .filter((tag) => tag.photoId === parent.id)
        .map((tag) => tag.userId)
        .map((userId) => users.find((user) => user.id === userId)),
  },

  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },

  Mutation: {
    postPhoto(parent, args) {
      const createPhoto = { id: _id++, ...args.input, created: new Date() };

      photos.push(createPhoto);

      return createPhoto;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`GraphQL Service running on ${url}`));
