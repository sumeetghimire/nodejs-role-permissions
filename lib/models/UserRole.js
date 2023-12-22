// lib/models/UserRole.js
const mongoose = require('mongoose');
const path = require('path');
const projectRoot = path.resolve(process.cwd(), '..');
const configFileInProject = path.join(projectRoot, 'roleConfig.js');
const roleConfig = require(configFileInProject);

const rolesUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: roleConfig.userCollection || 'User', // Use dynamic reference
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', // Use dynamic reference
    required: true,
  },
});

const UserRole = mongoose.model('UserRole', rolesUserSchema);

module.exports = UserRole;
