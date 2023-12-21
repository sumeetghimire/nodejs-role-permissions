// models/UserPermission.js
const mongoose = require('mongoose');
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
