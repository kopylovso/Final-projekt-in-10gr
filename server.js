const http = require('http');
const fs = require('fs');
const path = require('path');

// 🔹 читаем JSON ОДИН раз при запуске сервера
const countriesData = JSON.parse(
  fs.readFileSync('./countries.json', 'utf-8')
);

const server = http.createServer((req, res) => {

  const url = req.url.split('?')[0];

  /* =======================
     🔹 API: /countries
     ======================= */
  if (url === '/countries' && req.method === 'GET') {
    const result = countriesData.map(c => ({
      name: c.name.common,
      cca2: c.cca2,
      capital: c.capital,
      region: c.region,
      area: c.area,
      population: c.population
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result));
  }

  /* =======================
     🔹 API: /countries/{code}
     ======================= */
  if (url.startsWith('/countries/') && req.method === 'GET') {
    const code = url.split('/')[2]?.toUpperCase();

    const country = countriesData.find(
      c => c.cca2 === code
    );

    if (!country) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Country not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(country));
  }

  /* =======================
     🔹 СТАТИЧЕСКИЕ ФАЙЛЫ
     ======================= */
  let filePath = url === '/'
    ? './index.html'
    : `.${url}`;

  const ext = path.extname(filePath);

  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }

    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'text/plain'
    });
    res.end(content);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
