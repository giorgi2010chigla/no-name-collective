import { mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const clientDir = "dist/client";
const indexPath = join(clientDir, "index.html");

if (!existsSync(indexPath)) {
  throw new Error("GitHub Pages build did not create dist/client/index.html");
}

copyFileSync(indexPath, join(clientDir, "404.html"));

for (const route of ["shop", "cart", "checkout"]) {
  const routeDir = join(clientDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexPath, join(routeDir, "index.html"));
}
