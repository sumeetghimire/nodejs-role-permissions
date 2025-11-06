// lib/models/Role.js
const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
  roleName: {
        type: String,
        required: [true, "Please add role name"],
    },
    guard_name: {
        type: String,
        required: [true, "Please add guard name"],
    },
}, { timestamps: true });

const Role = mongoose.model("Role", rolesSchema);


module.exports = Role;
