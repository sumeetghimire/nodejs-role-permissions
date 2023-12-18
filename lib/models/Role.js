// lib/models/Role.js
const mongoose = require('mongoose');
const roleConfig = require('../../../roleConfig');

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
}, { collection: roleConfig.roleCollection || 'roles' });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
