// lib/scripts/setup.js
const fs = require('fs');
const path = require('path');

const defaultConfig = `
module.exports = {
  userCollection: 'user',
  roleCollection: 'roles',
  userRoleCollection: 'userroles',
  mongoDB: {
    uri: 'mongodb://localhost:27017/yourDatabase',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
`;

const configFile = path.resolve(process.cwd(), 'roleConfig.js');

if (!fs.existsSync(configFile)) {
  fs.writeFileSync(configFile, defaultConfig);
  console.log('roleConfig.js created successfully.');
} else {
  console.log('roleConfig.js already exists. Skipping creation.');
}
