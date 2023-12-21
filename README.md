# nodejs-role-permissions

Beta and Testing Versions


**nodejs-role-permissions**, is a Node.js library created to simplify role-based access control (RBAC) in Express applications. It offers a flexible middleware system for managing user roles, and securing routes based on assigned roles.




<h3>Creating New Collections</h3>
<p>The package creates five collections in your MongoDB database: roles, userRoles, permissions, role-permission and user-permission  These collections are used to store role information, user-role mappings, and permissions.</p>

<h3>Roles Collection</h3>
The roles collection stores the available roles in your application. You can add roles manually using a MongoDB client or your application logic.

<h3>User-Roles Mapping Collection</h3>
The userRoles collection stores the mapping between users and their assigned roles. When a new user is created or when roles are updated for a user, entries are added or modified in this collection.

<h3>Permission  Collection</h3>
The Permission collection is a crucial component of the role-based access control (RBAC) system. It serves as a repository for defining and managing various permissions that can be assigned to roles or directly to users.


<h3>Role-Permission Mapping Collection</h3>
The RolePermission collection is responsible for managing the relationship between roles and the permissions associated with each role. In the context of role-based access control (RBAC), this collection facilitates the assignment and removal of permissions for specific roles.


<h3>User-Permission Mapping Collection</h3>
The UserPermission collection serves as a mapping between users and the permissions assigned to them. In the context of role-based access control, this collection helps manage the direct assignment of specific permissions to individual users.


<h2>Customizing Collection Names</h2>
<h4>Edit the Configuration File</h4>

Open roleConfig.js in your preferred text editor and modify the settings according to your requirements.


<pre class="notranslate"><code>
module.exports = {
userCollection: 'User',  //Make sure this is user model for authentication 
};</code></pre>



<h2>How to assign a role to user</h2>


<pre class="notranslate"><code>
const userId = '4d539894a4761d3c05e3'; // Replace with the actual user ID
const roleName = 'Admin'; //Assuming you have this role
<span style="color:#79c0ff"> <b>assignRole(userId, roleName);</b> </span>
</code></pre>

<h4>If user already has one role it will be removed and add new role</h4>



<h3>A Basic example how to add role just after creating user
<pre class="notranslate"><code>
  <b>const { assignRole} = require("node-role-permissions");</b>
        const hash = await bcrypt.hash(password, 10)
          const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            address:address,
            password:hash,
            verify:0
          });
      newUser.save();
     <b> assignRole(newUser.id,'Admin'); </b>    

</code></pre>


<h2>How to use Role as a middleware</h2>

<h2>Important! </h2>
<pre class="notranslate"><code>
const userId = <b>req.userId</b>; // Make sure to pass your userId in this format from your authMiddleware while using role middleware;
</code></pre>

<pre class="notranslate"><code>
// app.js or your main server file
const express = require('express');
const app = express();

const { checkUserRole } = require('node-role-permissions');

app.get('/admin/dashboard', authenticateMiddleware <b>checkUserRole('admin')</b>, (req, res) => {
  // This route requires the 'admin' role
  res.send('Welcome to the admin dashboard!');
});

// Another route without middleware
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});
</code></pre>

Note: Ensure that the user ID is sent to the middleware through the authentication process.



<h2>How to get user Role</h2>

<pre class="notranslate">
<code>
const userId = 'yourUserIdObjID'; // Replace with the actual user ID

(async () => {
  const userRole = await <b>getUserRole(userId);</b>
  console.log(userRole);
})();
</code>
</pre>

<h2>How to assign/give permission to a role</h2>

<h4>Note: All users with this role will have access to the given permission</h4>

<pre class="notranslate"><code>
  <b>const {assignPermissionToRole } = require("node-role-permissions");</b>
 <b>assignPermissionToRole('Admin', 'Edit');</b> //Assuming  'Admin' role and 'Edit' permissions already exist 
</code></pre>



<h2>How to assign/give permission to a user</h2>

<pre class="notranslate"><code>
  <b>const {assignPermissionToUser } = require("node-role-permissions");</b>
const userId = '4d539894a4761d3c05e3'; // Replace with the actual user ID
<b>assignPermissionToUser(userId, 'Edit');</b> //Assuming  'Edit' Permission already exist
</code></pre>



<h2>How to use Permission as a middleware</h2>

<h2>Important! </h2>

<pre class="notranslate"><code>
const userId = <b>req.userId</b>; // Make sure to pass your userId in this format from your authMiddleware while using permission middleware;
</code></pre>


<pre class="notranslate"><code>
// app.js or your main server file
const express = require('express');
const app = express();
<b>const { checkPermission } = require('node-role-permissions');</b>

app.get('/admin/dashboard', authenticateMiddleware, <b>checkPermission('Edit')</b>, (req, res) => {
  // This route requires the 'edit' Permission
  res.send('You can edit this route content.');
});

app.get('/public', (req, res) => {
  res.send('This is a public route.');
});
</code></pre>

Note: Ensure that the user ID is sent to the middleware through the authentication process.



<h1>Upcoming Features</h1>
<p>In the next update, we're excited to introduce a comprehensive permission management feature to complement our existing roles functionality. This enhancement will empower you with more fine-grained control over user access, allowing you to tailor permissions to meet the specific needs of your application. Get ready for a more versatile and powerful user access management system!</p>
