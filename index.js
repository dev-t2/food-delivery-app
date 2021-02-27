const { ApolloServer } = require('apollo-server');

const typeDefs = `
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
    name: String!
    avatar: String
    postedPhotos: [Photo!]!
  }

  type Photo {
    id: ID!
    name: String!
    url: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`;

const users = [
  { id: '6dc1e629-c513-4434-8b1c-c3231a7258c3', name: 'Brunei' },
  { id: '70653fa7-17f4-4133-8e85-e0c6ba032b07', name: 'Hawaii' },
  { id: '68bc16dd-8b91-48f6-b757-795023c8a28f', name: 'Roads' },
];

const photos = [
  {
    id: '0',
    user: '70653fa7-17f4-4133-8e85-e0c6ba032b07',
    name: 'Ergonomic',
    description: 'Washington port synthesize',
    category: 'ACTION',
  },
  {
    id: '1',
    user: '68bc16dd-8b91-48f6-b757-795023c8a28f',
    name: 'paradigms',
    category: 'SELFIE',
  },
  {
    id: '2',
    user: '68bc16dd-8b91-48f6-b757-795023c8a28f',
    name: 'archive',
    description: 'SSL bus',
    category: 'LANDSCAPE',
  },
];

let _id = 0;

const resolvers = {
  User: {
    postedPhotos: (parent) => photos.filter((photo) => photo.user === parent.id),
  },

  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}`,
    postedBy: (parent) => users.find((user) => user.id === parent.user),
  },

  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },

  Mutation: {
    postPhoto(parent, args) {
      const createPhoto = { id: _id++, ...args.input };

      photos.push(createPhoto);

      return createPhoto;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`GraphQL Service running on ${url}`));
