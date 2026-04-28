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

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NO NAME — Concept Store</title>
    <meta name="description" content="We don't sell clothes. We sell art. A concept store for those who refuse to be named." />
    <link rel="stylesheet" href="./${stylesheet}" />
    <script>
      window.$_TSR = {
        c: () => {},
        h: () => {},
        initialized: true,
        buffer: [],
        router: {
          manifest: { routes: {}, clientEntry: "./${mainScript}" },
          dehydratedData: undefined,
          matches: []
        }
      };
    </script>
    <script type="module" crossorigin src="./${mainScript}"></script>
  </head>
  <body class="grain"></body>
</html>
`;

async function createRouteHtml(routePath: string, isRoot = false) {
  const relativeAssets = isRoot ? "./assets/" : "../assets/";
  const scriptPath = isRoot ? `./${mainScript}` : `../${mainScript}`;
  const stylePath = isRoot ? `./${stylesheet}` : `../${stylesheet}`;
  
  return indexHtml
    .replace(`./${stylesheet}`, stylePath)
    .replace(`./${mainScript}`, scriptPath)
    .replace(`./assets/`, relativeAssets);
}

// Create main index.html
await writeFile(join(clientDir, "index.html"), indexHtml);

// Create 404.html with redirect logic
const fallbackHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NO NAME — Concept Store</title>
    <meta name="description" content="We don't sell clothes. We sell art. A concept store for those who refuse to be named." />
    <link rel="stylesheet" href="./${stylesheet}" />
    <script>
      window.$_TSR = {
        c: () => {},
        h: () => {},
        initialized: true,
        buffer: [],
        router: {
          manifest: { routes: {}, clientEntry: "./${mainScript}" },
          dehydratedData: undefined,
          matches: []
        }
      };
    </script>
    <script type="module" crossorigin src="./${mainScript}"></script>
    <script>
      var segments = window.location.pathname.split("/").filter(Boolean);
      var repo = segments.shift() || "";
      var page = segments.join("/");
      if (page) {
        window.history.replaceState(null, "", "/" + repo + "/#/" + page + window.location.search + window.location.hash);
      }
    </script>
  </head>
  <body class="grain"></body>
</html>`;

await writeFile(join(clientDir, "404.html"), fallbackHtml);

// Create route-specific HTML files for GitHub Pages
const routes = ["shop", "cart", "checkout"];
for (const route of routes) {
  const routeDir = join(clientDir, route);
  await mkdir(routeDir, { recursive: true });
  
  const routeHtml = await createRouteHtml(route, false);
  await writeFile(join(routeDir, "index.html"), routeHtml);
}

console.log("Created GitHub Pages index.html and route fallbacks.");