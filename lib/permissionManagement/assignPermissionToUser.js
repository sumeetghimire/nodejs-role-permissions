const Permission = require("../models/Permission");
const UserPermission = require("../models/UserPermission");
const validateObjectId = require("../utils/validateObjectId");

async function assignPermissionToUser(userId, permissionName) {
  try {
    if (!validateObjectId(userId)) {
      return { success: false, error: 'Invalid user ID' };
    }

    if (!permissionName || typeof permissionName !== 'string') {
      return { success: false, error: 'Permission name is required' };
    }

    const permission = await Permission.findOne({ permissionName });

    if (!permission) {
      return { success: false, error: `Permission '${permissionName}' not found` };
    }

    const existingUserPermission = await UserPermission.findOne({
      userId: userId,
      permissionId: permission._id,
    });

    if (existingUserPermission) {
      return { success: true, message: 'Permission already assigned to user' };
    }

    await UserPermission.create({ userId: userId, permissionId: permission._id });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = assignPermissionToUser;
