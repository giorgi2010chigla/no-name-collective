import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { tanstackStartPlugin } from "@tanstack/react-start/vite-plugin";

export default defineConfig({
  vite: {
    base: "/no-name-collective/", // <-- keep this exact repo name
    plugins: [tanstackStartPlugin()], // <-- required for virtual client entry
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