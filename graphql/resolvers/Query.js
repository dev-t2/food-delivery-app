const me = (parent, args, { currentUser }) => currentUser;
const totalUsers = (parent, args, { db }) => db.collection('users').estimatedDocumentCount();
const allUsers = (parent, args, { db }) => db.collection('users').find().toArray();
const totalPhotos = (parent, args, { db }) => db.collection('photos').estimatedDocumentCount();
const allPhotos = (parent, args, { db }) => db.collection('photos').find().toArray();

module.exports = { me, totalUsers, allUsers, totalPhotos, allPhotos };
