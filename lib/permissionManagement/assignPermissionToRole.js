const Permission = require("../models/Permission");
const Role = require("../models/Role");
const RolePermission = require("../models/RolePermission");

async function assignPermissionToRole(roleName, permissionName) {
  try {
    const role = await Role.findOne({ roleName });

    if (!role) {
      console.error(`Role '${roleName}' not found.`);
      return false;
    }

    const permissionExists = await Permission.findOne({ name: permissionName });

    if (!permissionExists) {
      console.error(`Permission '${permissionName}' not found.`);
      return false;
    }

    const existingRolePermission = await RolePermission.findOne({
      roleId: role._id,
      permissionId: permissionExists._id,
    });

    if (existingRolePermission) {
      console.log(`Permission '${permissionName}' already assigned to role '${roleName}'.`);
      return true;
    }

    await RolePermission.create({ roleId: role._id, permissionId: permissionExists._id });
    console.log(`Permission '${permissionName}' assigned to role '${roleName}'.`);

    return true;
  } catch (error) {
    console.error('Error assigning permission to role:', error.message);
    return false;
  }
}

module.exports = assignPermissionToRole;
