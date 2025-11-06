const Permission = require('../models/Permission');

async function getAllPermissions() {
  try {
    const permissions = await Permission.find({}).select('permissionName createdAt updatedAt');
    return { success: true, permissions };
  } catch (error) {
    return { success: false, error: error.message, permissions: [] };
  }
}

module.exports = getAllPermissions;

