const Role = require('../models/Role');
const RolePermission = require('../models/RolePermission');

async function getRolePermissions(roleName) {
  try {
    if (!roleName || typeof roleName !== 'string') {
      return { success: false, error: 'Role name is required', permissions: [] };
    }

    // Find role (case-insensitive)
    const role = await Role.findOne({
      roleName: { $regex: `^${roleName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
    });

    if (!role) {
      return { success: false, error: `Role '${roleName}' not found`, permissions: [] };
    }

    const rolePermissions = await RolePermission.find({ roleId: role._id })
      .populate('permissionId', 'permissionName');

    const permissions = rolePermissions
      .filter(rp => rp.permissionId)
      .map(rp => rp.permissionId.permissionName);

    return { success: true, permissions };
  } catch (error) {
    return { success: false, error: error.message, permissions: [] };
  }
}

module.exports = getRolePermissions;

