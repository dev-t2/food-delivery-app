module.exports = `
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

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    githubLogin: ID!
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
    me: User
    totalUsers: Int!
    allUsers: [User!]!
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    githubAuth(code: String!): AuthPayload!
    postPhoto(input: PostPhotoInput!): Photo!
  }
`;
