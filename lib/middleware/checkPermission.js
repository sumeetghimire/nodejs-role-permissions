const UserPermission = require('../models/UserPermission');
const RolePermission = require('../models/RolePermission');
const Permission = require('../models/Permission');
const UserRole = require('../models/UserRole');


const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. User not authenticated. Please ensure req.userId is set by your authentication middleware.' });
      }

      const permissionExists = await Permission.findOne({ permissionName });

      if (!permissionExists) {
        return res.status(404).json({ message: `Permission '${permissionName}' not found.` });
      }

      // Check if the user has the permission directly
      const userHasPermission = await UserPermission.findOne({
        userId,
        permissionId: permissionExists._id,
      });

      if (userHasPermission) {
        return next();
      }

      // Get the user's role from the UserRole model
      const userRole = await UserRole.findOne({ userId });

      // If user has a role, check if the role has the permission
      if (userRole) {
        const roleHasPermission = await RolePermission.findOne({
          roleId: userRole.roleId,
          permissionId: permissionExists._id,
        });

        if (roleHasPermission) {
          return next();
        }
      }

      // User doesn't have the permission directly or through role
      return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = checkPermission;


