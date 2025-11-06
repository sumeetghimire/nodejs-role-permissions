// lib/models/Permission.js
const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  permissionName: {
        type: String,
        required: [true, "Please add permission name"],
    },
}, { timestamps: true });

const Permission = mongoose.model("Permission", permissionSchema);


module.exports = Permission;
