import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const assetsDir = join(clientDir, "assets");

async function findAsset(prefix: string, extension: string) {
  const files = await readdir(assetsDir);
  const match = files.find((file) => file.startsWith(prefix) && file.endsWith(extension));

  if (!match) {
    throw new Error(`Missing ${prefix}*.${extension} in dist/client/assets`);
  }

  return `assets/${match}`;
}

const mainScript = await findAsset("main-", ".js");
const stylesheet = await findAsset("styles-", ".css");

// Create main index.html
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NO NAME — Concept Store</title>
    <meta name="description" content="We don't sell clothes. We sell art. A concept store for those who refuse to be named." />
    <link rel="stylesheet" href="./${stylesheet}" />
    <script type="module" crossorigin src="./${mainScript}"></script>
  </head>
  <body class="grain">
    <div id="root"></div>
  </body>
</html>`;

// Create 404.html
const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 - NO NAME</title>
    <link rel="stylesheet" href="./${stylesheet}" />
    <script type="module" crossorigin src="./${mainScript}"></script>
  </head>
  <body class="grain">
    <div id="root"></div>
  </body>
</html>`;

// Write main files
await writeFile(join(clientDir, "index.html"), indexHtml);
await writeFile(join(clientDir, "404.html"), notFoundHtml);

// Create route-specific HTML files
const routes = ["shop", "cart", "checkout"];
for (const route of routes) {
  const routeDir = join(clientDir, route);
  await mkdir(routeDir, { recursive: true });
  
  const routeHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NO NAME — ${route.charAt(0).toUpperCase() + route.slice(1)}</title>
    <link rel="stylesheet" href="../${stylesheet}" />
    <script type="module" crossorigin src="../${mainScript}"></script>
  </head>
  <body class="grain">
    <div id="root"></div>
  </body>
</html>`;
  
  await writeFile(join(routeDir, "index.html"), routeHtml);
}

console.log("Created GitHub Pages static files.");