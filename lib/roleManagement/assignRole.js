const Role = require("../models/Role");
const UserRole = require("../models/UserRole");

async function assignRole(userId, roleName) {
  try {
    const role = await Role.findOne({ roleName });

    if (!role) {
      console.error(`Role '${roleName}' not found.`);
      return false;
    }

    const existingUserRole = await UserRole.findOne({ userId });

    if (existingUserRole) {
      await UserRole.deleteOne({ userId });
      console.log(`Existing role for user with ID ${userId} removed.`);
    }

    await UserRole.create({ userId, roleId: role._id });
    console.log(`Role '${roleName}' assigned to user with ID ${userId}.`);

    return true;
  } catch (error) {
    console.error('Error assigning role:', error.message);
    return false;
  }
}

module.exports = assignRole;
