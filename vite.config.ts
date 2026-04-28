import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/no-name-collective/", // Matches your repo name exactly
    build: {
      outDir: "dist", // Output directly to dist (not dist/client)
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});