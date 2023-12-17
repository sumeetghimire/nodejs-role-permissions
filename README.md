# nodejs-role-permissions

Beta and Testing Versions




<h2>Creating New Collections</h2>
<p>The package creates two collections in your MongoDB database: roles and userRoles. These collections are used to store role information and user-role mappings.</p>

<h2>Roles Collection</h2>
The roles collection stores the available roles in your application. You can add roles manually using a MongoDB client or your application logic.

<h2>User-Roles Mapping Collection</h2>
The userRoles collection stores the mapping between users and their assigned roles. When a new user is created or when roles are updated for a user, entries are added or modified in this collection.



<h1>Customizing Collection Names</h1>
<h3>>Edit the Configuration File</h3>

Open roleConfig.js in your preferred text editor and modify the settings according to your requirements.


<pre class="notranslate"><code>
module.exports = {
userCollection: 'user',
roleCollection: 'roles',
userRoleCollection: 'userroles',
};</code></pre>


<h1>How to use as a middleware</h1>
<pre class="notranslate"><code>
// app.js or your main server file
<p style="color🧑‍🦰">const express = require('express');</p>
const app = express();

// Import the middleware function from your custom package
const { checkUserRole } = require('node-role-permissions'); // Update this import based on your package

// Example route with middleware
app.get('/admin/dashboard', checkUserRole('admin'), (req, res) => {
  // This route requires the 'admin' role
  res.send('Welcome to the admin dashboard!');
});

// Another route without middleware
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


</code></pre>
