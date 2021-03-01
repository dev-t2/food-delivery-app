const { default: axios } = require('axios');
const dotenv = require('dotenv');

const authorizeWithGithub = require('../../github');

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const addFakerUsers = async (parent, args, { db }) => {
  const randomUserApi = `https://randomuser.me/api/?results=1`;
  const { data } = await axios.get(randomUserApi);

  const users = data.results.map((result) => ({
    githubLogin: result.login.username,
    name: `${result.name.first} ${result.name.last}`,
    avatar: result.picture.thumbnail,
    githubToken: result.login.sha1,
  }));

  await db.collection('users').insert(users);

  return users;
};

const fakeUserAuth = async (parent, { githubLogin }, { db }) => {
  const user = await db.collection('users').findOne({ githubLogin });

  if (!user) throw new Error(`Cannot find user with githubLogin ${githubLogin}`);

  return { token: user.githubToken, user };
};

const githubAuth = async (parent, { code }, { db }) => {
  const { message, name, login, access_token, avatar_url } = await authorizeWithGithub({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  });

  if (message) throw new Error(message);

  const userInfo = {
    name,
    githubLogin: login,
    githubToken: access_token,
    avatar: avatar_url,
  };

  const {
    ops: [user],
  } = await db.collection('users').replaceOne({ githubLogin: login }, userInfo, { upsert: true });

  return { user, token: access_token };
};

const postPhoto = async (parent, args, { db, currentUser }) => {
  if (!currentUser) throw new Error('Only an authorized user can post a photo');

  const createPhoto = { ...args.input, userId: currentUser.githubLogin, created: new Date() };

  const { insertedIds } = await db.collection('photos').insert(createPhoto);

  createPhoto.id = insertedIds[0];

  return createPhoto;
};

module.exports = { addFakerUsers, fakeUserAuth, githubAuth, postPhoto };
