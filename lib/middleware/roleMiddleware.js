// lib/middleware/roleMiddleware.js
let jwt;
try {
  jwt = require('jsonwebtoken');
} catch (error) {
  console.error('jsonwebtoken is not installed. JWT functionality will be disabled.');
}

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    if (!jwt) {
      console.error('JWT functionality is not available.');
      return res.status(500).json({ message: 'JWT functionality is not available.' });
    }

    const userId = req.user.id; 

    try {
      const userRole = await UserRole.findOne({ userId }).populate('roleId');

      if (userRole && userRole.roleId.roleName === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: 'Access forbidden' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = roleMiddleware;
