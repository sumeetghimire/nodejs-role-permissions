const Role = require('./models/Role');
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');
const UserPermission = require('./models/UserPermission');
const UserRole = require('./models/UserRole');
const checkUserRole = require('./middleware/roleMiddleware');
const getUserRole = require('./middleware/getUserRole');
const assignRole = require('./roleManagement/assignRole');
const createRole = require('./roleManagement/createRole');
const removeRole = require('./roleManagement/removeRole');
const checkPermission = require('./middleware/checkPermission');
const assignPermissionToRole = require('./permissionManagement/assignPermissionToRole');
const assignPermissionToUser = require('./permissionManagement/assignPermissionToUser');
const removePermissionFromRole = require('./permissionManagement/removePermissionFromRole');
const removePermissionFromUser = require('./permissionManagement/removePermissionFromUser');
const createPermission = require('./permissionManagement/createPermission');
const hasPermission = require('./utils/hasPermission');
const getUserPermissions = require('./utils/getUserPermissions');
const getRolePermissions = require('./utils/getRolePermissions');
const getAllRoles = require('./utils/getAllRoles');
const getAllPermissions = require('./utils/getAllPermissions');

module.exports = {
  // Models
  Role,
  Permission,
  UserRole,
  UserPermission,
  RolePermission,
  // Middleware
  checkUserRole,
  checkPermission,
  // Role Management
  createRole,
  assignRole,
  removeRole,
  getUserRole,
  getAllRoles,
  // Permission Management
  createPermission,
  assignPermissionToRole,
  assignPermissionToUser,
  removePermissionFromRole,
  removePermissionFromUser,
  getAllPermissions,
  // Utility Functions
  hasPermission,
  getUserPermissions,
  getRolePermissions
};
