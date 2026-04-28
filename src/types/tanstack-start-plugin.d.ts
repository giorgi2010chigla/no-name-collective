declare module "@tanstack/react-start/vite-plugin" {
  import type { Plugin } from "vite";
  /** Returns the TanStack Start Vite plugin */
  export function tanstackStartPlugin(): Plugin;
}