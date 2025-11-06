const UserRole = require('../models/UserRole');
const validateObjectId = require('../utils/validateObjectId');

async function removeRole(userId) {
  try {
    if (!validateObjectId(userId)) {
      return { success: false, error: 'Invalid user ID' };
    }

    const result = await UserRole.deleteOne({ userId });

    if (result.deletedCount > 0) {
      return { success: true };
    }

    return { success: false, error: 'User does not have a role assigned' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = removeRole;

