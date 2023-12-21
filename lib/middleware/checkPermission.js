const UserPermission = require('../models/UserPermission');
const RolePermission = require('../models/RolePermission');
const Permission = require('../models/Permission');
const UserRole = require('../models/UserRole');


const checkPermission = (permissionName) => {
 

  return async (req, res, next) => {
    let jwt;

    try {
      jwt = require('jsonwebtoken');
    } catch (error) {
      console.error('jsonwebtoken is not installed. JWT functionality will be disabled.');
    }
    if (!jwt) {
      console.error('JWT functionality is not available.');
      return res.status(500).json({ message: 'Please user Authticable middleware first' });
    }

    try {
      const userId =  req.userId;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. User not authenticated' });
      }

      const permissionExists = await Permission.findOne({ name: permissionName });

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

      if (!userRole) {
        // Handle the case where the user doesn't have a role
        console.error(`User with ID ${userId} does not have a role assigned.`);
        return res.status(403).json({ message: 'Access forbidden' });
      }

      // Check if the user's role has the permission
      const roleHasPermission = await RolePermission.findOne({
        roleId: userRole.roleId,
        permissionId: permissionExists._id,
      });

      if (roleHasPermission) {
        return next();
      }

      return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
    } catch (error) {
      console.error('Error Please check if your are authenticated or you have pass userId in correct format as per documentation');
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = checkPermission;


