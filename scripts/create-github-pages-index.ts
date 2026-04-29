import { mkdirSync, copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const clientDir = "dist/client";
const indexPath = join(clientDir, "index.html");

if (!existsSync(indexPath)) {
  const assetsDir = join(clientDir, "assets");
  const assets = readdirSync(assetsDir);
  const mainScript = assets.find((file) => file.startsWith("main-") && file.endsWith(".js"));
  const stylesheet = assets.find((file) => file.startsWith("styles-") && file.endsWith(".css"));

  if (!mainScript || !stylesheet) {
    throw new Error("GitHub Pages build did not create the expected app assets");
  }

  writeFileSync(
    indexPath,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NO NAME — Concept Store</title>
    <meta name="description" content="A concept store for those who refuse to be named." />
    <link rel="stylesheet" crossorigin href="/no-name-collective/assets/${stylesheet}" />
    <script type="module" crossorigin src="/no-name-collective/assets/${mainScript}"></script>
  </head>
  <body class="grain"></body>
</html>
`,
  );
}

copyFileSync(indexPath, join(clientDir, "404.html"));

for (const route of ["shop", "cart", "checkout"]) {
  const routeDir = join(clientDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexPath, join(routeDir, "index.html"));
}
