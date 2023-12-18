const Role = require('./models/Role');
const UserRole = require('./models/UserRole');
const checkUserRole = require('./middleware/roleMiddleware');
const getUserRole = require('./middleware/getUserRole');

module.exports = {
  Role,
  UserRole,
  checkUserRole,
  getUserRole,
};
