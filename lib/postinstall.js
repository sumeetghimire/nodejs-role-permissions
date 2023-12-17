const fs = require('fs');
const path = require('path');

const setupScriptPath = path.resolve(__dirname, 'scripts', 'setup.js');
const configFileInProject = path.join(__dirname, '../..', 'roleConfig.js');

try {
  const setupScriptContent = fs.readFileSync(setupScriptPath, 'utf-8');
  fs.writeFileSync(configFileInProject, setupScriptContent);
  console.log('roleConfig.js file created successfully.');
  console.log(`
Thank you for using our package!

🌟 If you find it helpful, please consider giving it a star on GitHub: https://github.com/sumeetghimire/nodejs-role-permissions

Your support means a lot to us! Feel free to reach out if you have any questions or feedback.

Happy coding! 🚀
`);
} catch (error) {
  console.error('Error creating roleConfig.js:', error.message);
}
