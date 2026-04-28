import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/no-name-collective/",
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});