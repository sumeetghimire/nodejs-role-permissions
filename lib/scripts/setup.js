module.exports = {
  userCollection: 'user',
  roleCollection: 'roles',
  userRoleCollection: 'userroles',
  mongoDB: {
    uri: 'mongodb://localhost:27017/yourDatabase',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};


