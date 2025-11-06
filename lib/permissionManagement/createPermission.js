const Permission = require("../models/Permission");

async function createPermission(permissionName) {
  try {
    if (!permissionName || typeof permissionName !== 'string') {
      return { success: false, error: 'Permission name is required and must be a string' };
    }

    // Check if permission already exists
    const existingPermission = await Permission.findOne({ permissionName });

    if (existingPermission) {
      return { success: false, error: `Permission '${permissionName}' already exists` };
    }

    const permission = await Permission.create({
      permissionName
    });

    return { success: true, permission };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = createPermission;

