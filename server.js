const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? './index.html' : `.${req.url}`;
  const ext = path.extname(filePath);

  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }

    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
    res.end(content);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
