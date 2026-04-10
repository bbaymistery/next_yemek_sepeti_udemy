const fs = require('fs');

const filesToUpdate = [
  'pages/api/users/[id].js',
  'pages/api/users/index.js',
  'pages/api/products/index.js',
  'pages/api/orders/[id].js',
  'pages/api/orders/index.js',
  'pages/api/categories/index.js',
  'pages/api/users/register.js'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace error.errors.map or err.errors.map
    if (content.includes('.errors.map(')) {
      const updatedContent = content
        .replace(/error\.errors\.map\(/g, '(error.issues || error.errors || []).map(')
        .replace(/err\.errors\.map\(/g, '(err.issues || err.errors || []).map(');
      
      fs.writeFileSync(file, updatedContent);
      console.log('Fixed ' + file);
    }
  }
});
