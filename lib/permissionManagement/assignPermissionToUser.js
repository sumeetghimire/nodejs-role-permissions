const Permission = require("node-role-permissions/lib/models/Permission");
const UserPermission = require("node-role-permissions/lib/models/UserPermission");

async function assignPermissionToUser(userId, permissionName, ) {
  try {
    const permissionExists = await Permission.findOne({ name: permissionName });

    if (!permissionExists) {
      console.error(`Permission '${permissionName}' not found.`);
      return false;
    }

      const existingUserPermission = await UserPermission.findOne({
        userId: userId,
        permissionId: permissionExists._id,
      });

      if (existingUserPermission) {
        console.log(`Permission '${permissionName}' already assigned to user with ID ${userId}.`);
        return true;
      }

      await UserPermission.create({ userId: userId, permissionId: permissionExists._id });
      console.log(`Permission '${permissionName}' assigned to user with ID ${userId}.`);

    return true;
  } catch (error) {
    console.error('Error assigning permission:', error.message);
    return false;
  }
}

module.exports = assignPermissionToUser;
