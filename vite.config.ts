import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html",
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "@chakra-ui/react",
            "@tanstack/react-router",
            "@tanstack/react-query",
            "axios",
            "zustand",
            "lodash",
            "lodash.mergewith",
          ],
          ui: ["@chakra-ui/icons", "framer-motion"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: [
      "framer-motion",
      "react",
      "react-dom",
      "lodash",
      "lodash.mergewith",
      "@tanstack/react-query",
      "@tanstack/react-router",
      "@chakra-ui/react",
      "@chakra-ui/icons",
    ],
    exclude: [],
  },
  resolve: {
    alias: {
      "lodash.mergewith": "lodash/mergeWith",
    },
  },
});
