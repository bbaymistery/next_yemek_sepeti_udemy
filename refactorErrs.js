const fs = require('fs');

const filesToUpdate = [
  'pages/api/users/[id].js',
  'pages/api/users/index.js',
  'pages/api/products/index.js',
  'pages/api/orders/[id].js',
  'pages/api/orders/index.js',
  'pages/api/categories/index.js'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace old simple message with dynamic formatting pointing to errorHandler
    if (content.includes('res.status(400).json({ message: "Validation error"')) {
      const updatedContent = content.replace(
        /res\.status\(400\)\.json\(\{\s*message:\s*"Validation error",\s*errors:\s*error\.errors\s*\}\);\s*return;/g,
        'error.statusCode = 400;\n      error.message = error.errors.map(e => e.message).join(" | ");\n      return errorHandler(res, error);'
      );
      fs.writeFileSync(file, updatedContent);
      console.log('Updated ' + file);
    }
  }
});
