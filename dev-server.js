const http = require('http');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8000;
const WS_PORT = process.env.WS_PORT || 8001;
const ROOT = process.cwd();

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  const map = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return map[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index-FIXED.html';
  const filePath = path.join(ROOT, decodeURIComponent(reqPath));
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    if (stats.isDirectory()) {
      res.writeHead(302, { Location: reqPath + '/index-FIXED.html' });
      res.end();
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(500); res.end('Error'); return; }
      res.writeHead(200, { 'Content-Type': contentType(filePath) });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});

// WebSocket server for live reload
const wss = new WebSocket.Server({ port: WS_PORT });
wss.on('connection', (ws) => {
  console.log('Live-reload client connected');
});
console.log(`WebSocket live-reload server running at ws://localhost:${WS_PORT}`);

// Watch files and notify clients
const watcher = chokidar.watch(ROOT, {
  ignored: /node_modules|\.git|\.DS_Store|dev-server\.js/,
  ignoreInitial: true,
});

watcher.on('all', (ev, file) => {
  console.log(`${ev}: ${file}`);
  const msg = JSON.stringify({ type: 'reload', file });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
});
