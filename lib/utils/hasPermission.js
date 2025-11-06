const UserPermission = require('../models/UserPermission');
const RolePermission = require('../models/RolePermission');
const Permission = require('../models/Permission');
const UserRole = require('../models/UserRole');
const validateObjectId = require('./validateObjectId');

async function hasPermission(userId, permissionName) {
  try {
    if (!validateObjectId(userId)) {
      return { hasPermission: false, error: 'Invalid user ID' };
    }

    const permission = await Permission.findOne({ permissionName });

    if (!permission) {
      return { hasPermission: false, error: `Permission '${permissionName}' not found` };
    }

    // Check if user has permission directly
    const userHasPermission = await UserPermission.findOne({
      userId,
      permissionId: permission._id,
    });

    if (userHasPermission) {
      return { hasPermission: true, source: 'direct' };
    }

    // Check if user's role has the permission
    const userRole = await UserRole.findOne({ userId }).populate('roleId');

    if (userRole) {
      const roleHasPermission = await RolePermission.findOne({
        roleId: userRole.roleId._id,
        permissionId: permission._id,
      });

      if (roleHasPermission) {
        return { hasPermission: true, source: 'role', role: userRole.roleId.roleName };
      }
    }

    return { hasPermission: false };
  } catch (error) {
    return { hasPermission: false, error: error.message };
  }
}

module.exports = hasPermission;

