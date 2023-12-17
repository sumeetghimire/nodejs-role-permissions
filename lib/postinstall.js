const fs = require('fs');
const path = require('path');

const setupScriptPath = path.resolve(__dirname, 'scripts', 'setup.js');
const configFileInProject = path.resolve(__dirname, '../../..', 'roleConfig.js');

try {
  if (fs.existsSync(setupScriptPath)) {
    const setupScriptContent = fs.readFileSync(setupScriptPath, 'utf-8');
    fs.writeFileSync(configFileInProject, setupScriptContent);
    console.log('roleConfig.js file created successfully.');
    console.log(`
Thank you for using our package! (Beta Version)

🌟 If you find it helpful, please consider giving it a star on GitHub: https://github.com/sumeetghimire/nodejs-role-permissions

Your support means a lot to us! Feel free to reach out if you have any questions or feedback.

Happy coding! 🚀
`);
  } else {
    console.error('Error: setup script not found.');
  }
} catch (error) {
  console.error('Error creating roleConfig.js:', error.message);
}
