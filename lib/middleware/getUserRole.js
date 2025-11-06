const UserRole = require("../models/UserRole");

const getUserRole = async (userId) => {
  try {
    if (!userId) {
      return null;
    }

    const userRole = await UserRole.findOne({ userId }).populate('roleId');
    return userRole ? userRole.roleId.roleName : null;
  } catch (error) {
    return null;
  }
};

module.exports = getUserRole;
