const Role = require('./models/Role');
const UserRole = require('./models/UserRole');
const checkUserRole = require('./middleware/roleMiddleware');
const getUserRole = require('./middleware/getUserRole');
const assignRole = require('./roleManagement/assignRole');

module.exports = {
  Role,
  UserRole,
  checkUserRole,
  getUserRole,
  assignRole,
};
