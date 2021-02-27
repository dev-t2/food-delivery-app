const axios = require('axios');

const requestToken = async (credentials) => {
  const result = await axios.post('https://github.com/login/oauth/access_token', credentials, {
    headers: {
      accept: 'application/json',
    },
  });

  return result.data.access_token;
};

const requestUser = async (token) => {
  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    return data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

module.exports = async (credentials) => {
  try {
    const access_token = await requestToken(credentials);
    const user = await requestUser(token);

    return { access_token, ...user };
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};
