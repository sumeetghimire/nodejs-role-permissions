const Permission = require('../models/Permission');
const Role = require('../models/Role');
const RolePermission = require('../models/RolePermission');

async function removePermissionFromRole(roleName, permissionName) {
  try {
    if (!roleName || typeof roleName !== 'string') {
      return { success: false, error: 'Role name is required' };
    }

    if (!permissionName || typeof permissionName !== 'string') {
      return { success: false, error: 'Permission name is required' };
    }

    // Find role (case-insensitive)
    const role = await Role.findOne({
      roleName: { $regex: `^${roleName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
    });

    if (!role) {
      return { success: false, error: `Role '${roleName}' not found` };
    }

    const permission = await Permission.findOne({ permissionName });

    if (!permission) {
      return { success: false, error: `Permission '${permissionName}' not found` };
    }

    const result = await RolePermission.deleteOne({
      roleId: role._id,
      permissionId: permission._id,
    });

    if (result.deletedCount > 0) {
      return { success: true };
    }

    return { success: false, error: 'Role does not have this permission' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = removePermissionFromRole;

