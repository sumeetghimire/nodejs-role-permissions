const Role = require('../models/Role');
const UserRole = require('../models/UserRole');

const checkUserRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. User not authenticated. Please ensure req.userId is set by your authentication middleware.' });
      }

      // Check if the required role exists in the 'roles' collection (case-insensitive)
      // Escape special regex characters
      const escapedRole = requiredRole.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const roleExists = await Role.findOne({
        roleName: { $regex: `^${escapedRole}$`, $options: 'i' }
      });

      if (!roleExists) {
        return res.status(404).json({ message: `Role '${requiredRole}' does not exist. Please create it.` });
      }

      // Check the user's role (case-insensitive comparison)
      const userRole = await UserRole.findOne({ userId }).populate('roleId');

      if (userRole && userRole.roleId && userRole.roleId.roleName.toLowerCase() === requiredRole.toLowerCase()) {
        next();
      } else {
        res.status(403).json({ message: 'Access forbidden' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = checkUserRole;
  