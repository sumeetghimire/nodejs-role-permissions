module.exports = {
  userCollection: 'User', //your collection model you want to use 
  roleCollection: 'Role',
  userRoleCollection: 'UserRole', //Don't change this 
  mongoDB: {
    uri: 'mongodb://localhost:27017/yourDatabase',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};


