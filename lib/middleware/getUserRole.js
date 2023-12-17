let jwt;
try {
  jwt = require('jsonwebtoken');
} catch (error) {
  console.error('jsonwebtoken is not installed. JWT functionality will be disabled.');
}

const getUserRole = async (userId) => {
  if (!jwt) {
    console.error('JWT functionality is not available.');
    return null;
  }

  try {
    const userRole = await UserRole.findOne({ userId }).populate('roleId');
    return userRole ? userRole.roleId.roleName : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getUserRole;
