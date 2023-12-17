# nodejs-role-permissions

Beta and Testing Versions

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
