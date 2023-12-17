// lib/models/UserRole.js
const mongoose = require('mongoose');
const roleConfig = require('../../roleConfig');

const userRoleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
}, { collection: roleConfig.userRoleCollection || 'userroles' });

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;
