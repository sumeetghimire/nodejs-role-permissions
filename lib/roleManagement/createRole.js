const Role = require("../models/Role");

async function createRole(roleName, guardName = 'web') {
  try {
    if (!roleName || typeof roleName !== 'string') {
      return { success: false, error: 'Role name is required and must be a string' };
    }

    if (!guardName || typeof guardName !== 'string') {
      return { success: false, error: 'Guard name must be a string' };
    }

    // Check if role already exists (case-insensitive)
    const existingRole = await Role.findOne({
      roleName: { $regex: `^${roleName}$`, $options: 'i' }
    });

    if (existingRole) {
      return { success: false, error: `Role '${roleName}' already exists` };
    }

    const role = await Role.create({
      roleName,
      guard_name: guardName
    });

    return { success: true, role };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = createRole;

