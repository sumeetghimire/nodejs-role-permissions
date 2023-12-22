// models/UserPermission.js
const mongoose = require('mongoose');
const path = require('path');
const projectRoot = path.resolve(process.cwd(), '..');
const configFileInProject = path.join(projectRoot, 'roleConfig.js');
const roleConfig = require(configFileInProject);

const userPermissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: roleConfig.userCollection || 'User', // Use dynamic reference
    required: true,
  },
  permissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
    required: true,
  },
});

const UserPermission = module.exports = mongoose.model('UserPermission', userPermissionSchema);

module.exports = UserPermission;
