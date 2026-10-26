import http from 'node:http';
import { readFileSync } from 'node:fs';
const page = readFileSync(new URL('./index.html', import.meta.url));
const version = "original";
const server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'");
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, {Allow:'GET, HEAD'}); return res.end(); }
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/health') { res.writeHead(200, {'Content-Type':'application/json'}); return res.end(req.method === 'HEAD' ? undefined : JSON.stringify({ok:true, version})); }
  if (pathname !== '/') { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  res.end(req.method === 'HEAD' ? undefined : page);
});
server.listen(Number(process.env.PORT || 3000), process.env.HOST || '0.0.0.0');
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close());
