// lib/models/Role.js
const mongoose = require("mongoose");
const path = require('path');

const projectRoot = path.resolve(process.cwd(), '..');

const configFileInProject = path.join(projectRoot, 'roleConfig.js');

// Now, require roleConfig.js
const roleConfig = require(configFileInProject);

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
