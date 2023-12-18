// lib/middleware/roleMiddleware.js
const checkUserRole = (requiredRole) => {
  let jwt;
  try {
    jwt = require('jsonwebtoken');
  } catch (error) {
    console.error('jsonwebtoken is not installed. JWT functionality will be disabled.');
  }
    return async (req, res, next) => {
      if (!jwt) {
        console.error('JWT functionality is not available.');
        return res.status(500).json({ message: 'JWT functionality is not available.' });
      }
  
      const userId = req.user.id;
  
      try {
        // Check if the required role exists in the 'roles' collection
        const roleExists = await Role.findOne({ roleName: requiredRole });
  
        if (!roleExists) {
          // If the required role doesn't exist, return an error message
          return res.status(404).json({ message: `Role '${requiredRole}' does not exist. Please create it.` });
        }
  
        // Check the user's role
        const userRole = await UserRole.findOne({ userId }).populate('roleId');
  
        if (userRole && userRole.roleId.roleName === requiredRole) {
          // User has the required role, proceed to the next middleware or route handler
          next();
        } else {
          // User does not have the required role, send a 403 Forbidden response
          res.status(403).json({ message: 'Access forbidden' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  };
  
  
  module.exports = checkUserRole;
  