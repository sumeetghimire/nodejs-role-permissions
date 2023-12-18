// lib/models/Role.js
const roleConfig = require('../../../roleConfig');
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
Role.create({
    name: "admin",
    guard_name: "api", 
}).then(() => {
    console.log('Default role "admin" created successfully.');
}).catch((error) => {
    console.error('Error creating default role "admin":', error.message);
});

module.exports = Role;
