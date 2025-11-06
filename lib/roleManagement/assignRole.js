const Role = require("../models/Role");
const UserRole = require("../models/UserRole");
const validateObjectId = require("../utils/validateObjectId");

async function assignRole(userId, roleName) {
  try {
    if (!validateObjectId(userId)) {
      return { success: false, error: 'Invalid user ID' };
    }

    if (!roleName || typeof roleName !== 'string') {
      return { success: false, error: 'Role name is required' };
    }

    // Find role (case-insensitive)
    const role = await Role.findOne({
      roleName: { $regex: `^${roleName}$`, $options: 'i' }
    });

    if (!role) {
      return { success: false, error: `Role '${roleName}' not found` };
    }

    const existingUserRole = await UserRole.findOne({ userId });

    if (existingUserRole) {
      await UserRole.deleteOne({ userId });
    }

    await UserRole.create({ userId, roleId: role._id });

    return { success: true, role: role.roleName };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = assignRole;
