const fs = require('fs');
const path = require('path');

const setupScriptPath = path.resolve(__dirname, 'scripts', 'setup.js');
// Write to project root (where package is installed), not package root
const configFileInProject = path.resolve(process.cwd(), 'roleConfig.js');

try {
  if (fs.existsSync(setupScriptPath)) {
    const setupScriptContent = fs.readFileSync(setupScriptPath, 'utf-8');
    fs.writeFileSync(configFileInProject, setupScriptContent);
  }
} catch (error) {
  // Silently fail - postinstall should not break installation
}
