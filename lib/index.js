const Role = require('./models/Role');
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');
const UserPermission = require('./models/UserPermission');
const UserRole = require('./models/UserRole');
const checkUserRole = require('./middleware/roleMiddleware');
const getUserRole = require('./middleware/getUserRole');
const assignRole = require('./roleManagement/assignRole');
const checkPermission = require('./middleware/checkPermission');
const assignPermissionToRole = require('./permissionManagement/assignPermissionToRole');
const assignPermissionToUser = require('./permissionManagement/assignPermissionToUser');

module.exports = {
  Role,
  UserRole,
  checkUserRole,
  getUserRole,
  assignRole,
  checkPermission,
  Permission,
  UserPermission,
  RolePermission,
  assignPermissionToRole,
  assignPermissionToUser
};
