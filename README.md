# node-role-permissions

A Node.js library for role-based access control (RBAC) in Express applications. This package provides a flexible middleware system for managing user roles and permissions, with seamless MongoDB integration.

## Features

- ✅ Role-based access control (RBAC)
- ✅ Permission-based access control
- ✅ Flexible middleware system for Express
- ✅ MongoDB/Mongoose integration
- ✅ Case-insensitive role matching
- ✅ Direct user permissions and role-based permissions
- ✅ Complete CRUD operations for roles and permissions
- ✅ Utility functions for programmatic permission checks
- ✅ Consistent error handling with detailed error messages
- ✅ Input validation and ObjectId validation

## Installation

```bash
npm install node-role-permissions
```

## Prerequisites

- Node.js
- Express.js
- MongoDB with Mongoose
- Your authentication middleware must set `req.userId` on the request object

## Database Collections

The package creates and uses the following MongoDB collections:

- **roles** - Stores available roles in your application
- **userRoles** - Maps users to their assigned roles
- **permissions** - Stores available permissions
- **rolepermissions** - Maps roles to their permissions
- **userpermissions** - Maps users to their direct permissions

## Complete Workflow

### Step 1: Setup MongoDB Connection

First, ensure your MongoDB connection is established using Mongoose:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/your-database');
```

### Step 2: Create Roles and Permissions

Before assigning roles or permissions, you need to create them:

```javascript
const { createRole, createPermission } = require('node-role-permissions');

// Create roles
const adminRole = await createRole('Admin', 'web');
const userRole = await createRole('User', 'web');
const moderatorRole = await createRole('Moderator', 'web');

// Check if creation was successful
if (adminRole.success) {
  console.log('Admin role created successfully');
} else {
  console.error('Error:', adminRole.error);
}

// Create permissions
const editPermission = await createPermission('Edit');
const deletePermission = await createPermission('Delete');
const viewPermission = await createPermission('View');
const createContentPermission = await createPermission('Create');
```

### Step 3: Assign Roles to Users

When a user is created or when you need to assign a role:

```javascript
const { assignRole } = require('node-role-permissions');

// After creating a new user
          const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  password: hashedPassword
});

await newUser.save();

// Assign role to user (replaces existing role if any)
const roleAssigned = await assignRole(newUser._id, 'Admin');

if (roleAssigned.success) {
  console.log(`Role assigned successfully: ${roleAssigned.role}`);
} else {
  console.error('Failed to assign role:', roleAssigned.error);
}
```

**Note:** If a user already has a role, assigning a new role will replace the existing one.

### Step 4: Assign Permissions

You can assign permissions to roles or directly to users:

```javascript
const { assignPermissionToRole, assignPermissionToUser } = require('node-role-permissions');

// Assign permission to a role (all users with this role will get the permission)
await assignPermissionToRole('Admin', 'Edit');
await assignPermissionToRole('Admin', 'Delete');
await assignPermissionToRole('Moderator', 'Edit');

// Assign permission directly to a user (overrides role-based permissions)
await assignPermissionToUser(userId, 'View');
```

**Permission Priority:**
1. Direct user permissions are checked first
2. If no direct permission, role-based permissions are checked
3. Users can have permissions without roles

### Step 5: Setup Authentication Middleware

**IMPORTANT:** Your authentication middleware must set `req.userId` before using role/permission middleware:

```javascript
// Example authentication middleware
const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token (using jsonwebtoken or your method)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set req.userId - THIS IS REQUIRED!
    req.userId = decoded.userId; // or decoded.id, depending on your token structure
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Step 6: Use Role Middleware

Protect routes based on user roles:

```javascript
const express = require('express');
const { checkUserRole } = require('node-role-permissions');
const app = express();

// Protect route with role middleware
app.get('/admin/dashboard', 
  authenticateMiddleware,  // Must come first to set req.userId
  checkUserRole('Admin'),  // Case-insensitive: 'Admin', 'admin', 'ADMIN' all work
  (req, res) => {
  res.send('Welcome to the admin dashboard!');
  }
);

app.get('/moderator/panel',
  authenticateMiddleware,
  checkUserRole('Moderator'),
  (req, res) => {
    res.send('Moderator panel');
  }
);

// Public route
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});
```

### Step 7: Use Permission Middleware

Protect routes based on permissions:

```javascript
const { checkPermission } = require('node-role-permissions');

// Protect route with permission middleware
app.get('/content/edit',
  authenticateMiddleware,  // Must come first
  checkPermission('Edit'), // Checks both direct and role-based permissions
  (req, res) => {
    res.send('Edit content page');
  }
);

app.delete('/content/:id',
  authenticateMiddleware,
  checkPermission('Delete'),
  (req, res) => {
    res.send('Content deleted');
  }
);
```

### Step 8: Get User Role and Permissions

Retrieve a user's role and permissions programmatically:

```javascript
const { getUserRole, getUserPermissions, hasPermission } = require('node-role-permissions');

// Get user's role
const userRole = await getUserRole(userId);

if (userRole) {
  console.log(`User has role: ${userRole}`);
} else {
  console.log('User has no role assigned');
}

// Get all user permissions (direct + role-based)
const result = await getUserPermissions(userId);
if (result.success) {
  console.log('User permissions:', result.permissions);
  // Output: [{ name: 'Edit', source: 'direct' }, { name: 'View', source: 'role', role: 'Admin' }]
}

// Check if user has specific permission
const permissionCheck = await hasPermission(userId, 'Edit');
if (permissionCheck.hasPermission) {
  console.log(`User has permission from: ${permissionCheck.source}`);
}
```

### Step 9: Remove Roles and Permissions

Remove roles and permissions when needed:

```javascript
const { removeRole, removePermissionFromUser, removePermissionFromRole } = require('node-role-permissions');

// Remove role from user
const result = await removeRole(userId);
if (result.success) {
  console.log('Role removed successfully');
} else {
  console.error('Error:', result.error);
}

// Remove permission from user
await removePermissionFromUser(userId, 'Edit');

// Remove permission from role
await removePermissionFromRole('Admin', 'Delete');
```

### Step 10: List All Roles and Permissions

Get lists of all roles and permissions:

```javascript
const { getAllRoles, getAllPermissions, getRolePermissions } = require('node-role-permissions');

// Get all roles
const rolesResult = await getAllRoles();
if (rolesResult.success) {
  console.log('All roles:', rolesResult.roles);
}

// Get all permissions
const permissionsResult = await getAllPermissions();
if (permissionsResult.success) {
  console.log('All permissions:', permissionsResult.permissions);
}

// Get permissions for a specific role
const rolePerms = await getRolePermissions('Admin');
if (rolePerms.success) {
  console.log('Admin permissions:', rolePerms.permissions);
}
```

## Complete Example

Here's a complete example showing the full workflow:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const { 
  createRole, 
  createPermission, 
  assignRole, 
  assignPermissionToRole,
  checkUserRole, 
  checkPermission,
  getUserRole 
} = require('node-role-permissions');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

// Authentication middleware
const authenticateMiddleware = async (req, res, next) => {
  // Your authentication logic here
  // MUST set req.userId
  req.userId = 'user-id-from-token'; // Replace with actual user ID
  next();
};

// Setup: Create roles and permissions (run once)
async function setupRolesAndPermissions() {
  await createRole('Admin', 'web');
  await createRole('User', 'web');
  
  await createPermission('Edit');
  await createPermission('Delete');
  await createPermission('View');
  
  // Assign permissions to roles
  await assignPermissionToRole('Admin', 'Edit');
  await assignPermissionToRole('Admin', 'Delete');
  await assignPermissionToRole('Admin', 'View');
  await assignPermissionToRole('User', 'View');
}

// Routes
app.get('/admin/dashboard',
  authenticateMiddleware,
  checkUserRole('Admin'),
  (req, res) => {
    res.json({ message: 'Admin dashboard' });
  }
);

app.get('/content/:id',
  authenticateMiddleware,
  checkPermission('View'),
  (req, res) => {
    res.json({ message: 'View content' });
  }
);

app.put('/content/:id',
  authenticateMiddleware,
  checkPermission('Edit'),
  (req, res) => {
    res.json({ message: 'Edit content' });
  }
);

app.delete('/content/:id',
  authenticateMiddleware,
  checkPermission('Delete'),
  (req, res) => {
    res.json({ message: 'Delete content' });
  }
);

// Get current user's role
app.get('/profile',
  authenticateMiddleware,
  async (req, res) => {
    const role = await getUserRole(req.userId);
    res.json({ userId: req.userId, role });
  }
);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## API Reference

### Functions

#### `createRole(roleName, guardName = 'web')`
Creates a new role.
- **Parameters:**
  - `roleName` (string, required): Name of the role
  - `guardName` (string, optional): Guard name, defaults to 'web'
- **Returns:** `{ success: boolean, role?: object, error?: string }`

#### `createPermission(permissionName)`
Creates a new permission.
- **Parameters:**
  - `permissionName` (string, required): Name of the permission
- **Returns:** `{ success: boolean, permission?: object, error?: string }`

#### `assignRole(userId, roleName)`
Assigns a role to a user. Replaces existing role if user already has one.
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
  - `roleName` (string, required): Role name to assign (case-insensitive)
- **Returns:** `{ success: boolean, role?: string, error?: string }`

```javascript
const result = await assignRole(userId, 'Admin');
if (result.success) {
  console.log(`Role assigned: ${result.role}`);
} else {
  console.error(result.error);
}
```

#### `removeRole(userId)`
Removes a role from a user.
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
- **Returns:** `{ success: boolean, error?: string }`

#### `assignPermissionToRole(roleName, permissionName)`
Assigns a permission to a role. All users with this role will have the permission.
- **Parameters:**
  - `roleName` (string, required): Role name (case-insensitive)
  - `permissionName` (string, required): Permission name
- **Returns:** `{ success: boolean, message?: string, error?: string }`

#### `assignPermissionToUser(userId, permissionName)`
Assigns a permission directly to a user.
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
  - `permissionName` (string, required): Permission name
- **Returns:** `{ success: boolean, message?: string, error?: string }`

#### `removePermissionFromUser(userId, permissionName)`
Removes a permission from a user.
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
  - `permissionName` (string, required): Permission name
- **Returns:** `{ success: boolean, error?: string }`

#### `removePermissionFromRole(roleName, permissionName)`
Removes a permission from a role.
- **Parameters:**
  - `roleName` (string, required): Role name (case-insensitive)
  - `permissionName` (string, required): Permission name
- **Returns:** `{ success: boolean, error?: string }`

#### `getUserRole(userId)`
Gets the role assigned to a user.
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
- **Returns:** `string | null` - Role name or null if no role assigned

#### `getUserPermissions(userId)`
Gets all permissions for a user (direct + role-based).
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
- **Returns:** `{ success: boolean, permissions: Array<{name: string, source: 'direct'|'role', role?: string}>, error?: string }`

```javascript
const result = await getUserPermissions(userId);
if (result.success) {
  result.permissions.forEach(perm => {
    console.log(`${perm.name} - ${perm.source}`);
  });
}
```

#### `getRolePermissions(roleName)`
Gets all permissions assigned to a role.
- **Parameters:**
  - `roleName` (string, required): Role name (case-insensitive)
- **Returns:** `{ success: boolean, permissions: string[], error?: string }`

#### `getAllRoles()`
Gets all roles in the system.
- **Returns:** `{ success: boolean, roles: Array, error?: string }`

#### `getAllPermissions()`
Gets all permissions in the system.
- **Returns:** `{ success: boolean, permissions: Array, error?: string }`

#### `hasPermission(userId, permissionName)`
Programmatically check if a user has a specific permission.
- **Parameters:**
  - `userId` (string/ObjectId, required): User ID
  - `permissionName` (string, required): Permission name to check
- **Returns:** `{ hasPermission: boolean, source?: 'direct'|'role', role?: string, error?: string }`

```javascript
const check = await hasPermission(userId, 'Edit');
if (check.hasPermission) {
  console.log(`User has permission from: ${check.source}`);
  if (check.role) {
    console.log(`Through role: ${check.role}`);
  }
}
```

### Middleware

#### `checkUserRole(requiredRole)`
Express middleware to check if user has the required role.
- **Parameters:**
  - `requiredRole` (string, required): Role name to check (case-insensitive)
- **Returns:** Express middleware function
- **Requires:** `req.userId` to be set by authentication middleware

#### `checkPermission(permissionName)`
Express middleware to check if user has the required permission (direct or through role).
- **Parameters:**
  - `permissionName` (string, required): Permission name to check
- **Returns:** Express middleware function
- **Requires:** `req.userId` to be set by authentication middleware

### Models

The package exports the following Mongoose models for direct use if needed:

- `Role`
- `Permission`
- `UserRole`
- `RolePermission`
- `UserPermission`

## Important Notes

1. **Authentication Required:** All middleware functions require `req.userId` to be set by your authentication middleware.

2. **Case-Insensitive Roles:** Role matching is case-insensitive. 'Admin', 'admin', and 'ADMIN' are treated as the same.

3. **Permission Priority:** Direct user permissions take precedence over role-based permissions. If a user has a direct permission, it will be used regardless of their role.

4. **Single Role per User:** A user can only have one role at a time. Assigning a new role replaces the existing one.

5. **Error Handling:** All functions return objects with `success` and optional `error` properties. Always check `result.success` before proceeding.

6. **Input Validation:** All functions validate inputs and ObjectIds. Invalid inputs return error objects with descriptive messages.

7. **Return Types:** 
   - Management functions return `{ success: boolean, error?: string, ... }`
   - Query functions return `{ success: boolean, data?: any, error?: string }`
   - `getUserRole()` returns `string | null` for backward compatibility

## Configuration

After installation, a `roleConfig.js` file is created in your project root. You can customize the user collection name:

```javascript
module.exports = {
  userCollection: 'User',  // Make sure this matches your User model name
};
```

## Troubleshooting

### "Unauthorized. User not authenticated"
- Ensure your authentication middleware sets `req.userId` before the role/permission middleware runs.

### "Role 'X' does not exist"
- Create the role using `createRole()` before assigning it to users.

### "Permission 'X' not found"
- Create the permission using `createPermission()` before using it.

### Middleware not working
- Ensure authentication middleware runs before role/permission middleware.
- Check that `req.userId` is set correctly.
- Verify MongoDB connection is established.

## License

MIT

## Author

Sumeet Ghimire

## Support

For issues and feature requests, please visit: https://github.com/sumeetghimire/nodejs-role-permissions/issues
