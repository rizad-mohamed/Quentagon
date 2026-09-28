import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzip } from "node:zlib";
import { promisify } from "node:util";
const root = resolve("out");
const args = process.argv.slice(2);
const index = args.indexOf("--port");
const port = Number(index >= 0 ? args[index + 1] : process.env.PORT || 3003);
const compress = promisify(gzip);
const cache = new Map();
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};
createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      res.end();
      return;
    }
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      await stat(file);
    } catch {
      file = resolve(root, "404.html");
      status = 404;
    }
    const extension = extname(file);
    const compressed =
      /gzip/.test(req.headers["accept-encoding"] || "") &&
      [".html", ".js", ".css", ".json", ".txt", ".xml", ".svg"].includes(extension);
    const key = file + compressed;
    let body = cache.get(key);
    if (!body) {
      body = await readFile(file);
      if (compressed) body = await compress(body);
      cache.set(key, body);
    }
    res.writeHead(status, {
      "Content-Type": mime[extension] || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": pathname.startsWith("/_next/static/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      Vary: "Accept-Encoding",
      ...(compressed ? { "Content-Encoding": "gzip" } : {}),
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(500);
    res.end("Unable to serve this page.");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Quentagon static preview: http://127.0.0.1:${port}`),
);
