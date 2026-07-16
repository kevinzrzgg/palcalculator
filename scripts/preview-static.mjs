#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const i = args.indexOf(name);
  if (i >= 0 && args[i + 1]) return args[i + 1];
  const eq = args.find((a) => a.startsWith(`${name}=`));
  return eq ? eq.slice(name.length + 1) : fallback;
}
const host = argValue('--host', '0.0.0.0');
const port = Number(argValue('--port', process.env.PORT || '4173'));
const root = path.resolve('dist');
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'], ['.xml', 'application/xml; charset=utf-8'], ['.txt', 'text/plain; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.png', 'image/png'], ['.ico', 'image/x-icon'],
]);
function safeJoin(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^([.][.][/\\])+/, '');
  return path.join(root, normalized);
}
function send(res, status, filePath) {
  const ext = path.extname(filePath);
  res.writeHead(status, { 'content-type': mime.get(ext) || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}
const server = http.createServer((req, res) => {
  if (!req.url) return res.end();
  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;
  let filePath = safeJoin(pathname);
  if (pathname.endsWith('/')) filePath = path.join(filePath, 'index.html');
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return send(res, 200, filePath);
  const notFound = path.join(root, '404.html');
  if (fs.existsSync(notFound)) return send(res, 404, notFound);
  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});
server.listen(port, host, () => console.log(`Static preview: http://${host}:${port}/`));
