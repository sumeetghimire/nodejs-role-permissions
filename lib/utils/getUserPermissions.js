const UserPermission = require('../models/UserPermission');
const RolePermission = require('../models/RolePermission');
const UserRole = require('../models/UserRole');
const validateObjectId = require('./validateObjectId');

async function getUserPermissions(userId) {
  try {
    if (!validateObjectId(userId)) {
      return { success: false, error: 'Invalid user ID', permissions: [] };
    }

    const permissions = [];

    // Get direct user permissions
    const userPermissions = await UserPermission.find({ userId })
      .populate('permissionId', 'permissionName');

    userPermissions.forEach(up => {
      if (up.permissionId) {
        permissions.push({
          name: up.permissionId.permissionName,
          source: 'direct'
        });
      }
    });

    // Get role-based permissions
    const userRole = await UserRole.findOne({ userId }).populate('roleId');

    if (userRole && userRole.roleId) {
      const rolePermissions = await RolePermission.find({ roleId: userRole.roleId._id })
        .populate('permissionId', 'permissionName');

      rolePermissions.forEach(rp => {
        if (rp.permissionId) {
          // Only add if not already in direct permissions
          const exists = permissions.some(p => p.name === rp.permissionId.permissionName);
          if (!exists) {
            permissions.push({
              name: rp.permissionId.permissionName,
              source: 'role',
              role: userRole.roleId.roleName
            });
          }
        }
      });
    }

    return { success: true, permissions };
  } catch (error) {
    return { success: false, error: error.message, permissions: [] };
  }
}

module.exports = getUserPermissions;

