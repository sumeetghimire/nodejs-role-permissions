const path = require('path');
const mongoose = require('mongoose');
const projectRoot = path.resolve(process.cwd(), '..'); 

const configFileInProject = path.join(projectRoot, 'roleConfig.js');

const roleConfig = require(configFileInProject);
if (mongoose.connection.readyState === 1) {
  const rolesUserSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: roleConfig.userCollection || 'User',      
      required: true
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    }
  });
  module.exports = mongoose.model('RolesUser', rolesUserSchema);
} else {
  console.error('MongoDB connection is not open.');
}
