const Permission = require('../models/Permission');
const UserPermission = require('../models/UserPermission');
const validateObjectId = require('../utils/validateObjectId');

async function removePermissionFromUser(userId, permissionName) {
  try {
    if (!validateObjectId(userId)) {
      return { success: false, error: 'Invalid user ID' };
    }

    const permission = await Permission.findOne({ permissionName });

    if (!permission) {
      return { success: false, error: `Permission '${permissionName}' not found` };
    }

    const result = await UserPermission.deleteOne({
      userId,
      permissionId: permission._id,
    });

    if (result.deletedCount > 0) {
      return { success: true };
    }

    return { success: false, error: 'User does not have this permission' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = removePermissionFromUser;

