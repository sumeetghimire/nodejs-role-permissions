const Role = require('../models/Role');

async function getAllRoles() {
  try {
    const roles = await Role.find({}).select('roleName guard_name createdAt updatedAt');
    return { success: true, roles };
  } catch (error) {
    return { success: false, error: error.message, roles: [] };
  }
}

module.exports = getAllRoles;

