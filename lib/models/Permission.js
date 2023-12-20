// lib/models/Role.js
const mongoose = require("mongoose");
const path = require('path');

const projectRoot = path.resolve(process.cwd(), '..');

const permissionSchema = mongoose.Schema({
  permissionName: {
        type: String,
        required: [true, "Please add permission name"],
    },
}, { timestamps: true });

const Permission = mongoose.model("Permission", permissionSchema);


module.exports = Permission;
