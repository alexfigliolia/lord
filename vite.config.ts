import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

const IS_PRODUCTION = process.env.NODE_ENV !== "development";

export default defineConfig({
  plugins: [sveltekit()],
  base: "/home/",
  build: {
    target: "es2015",
    sourcemap: IS_PRODUCTION,
    minify: IS_PRODUCTION,
    cssMinify: IS_PRODUCTION ? "lightningcss" : false,
  },
  server: {
    proxy: {
      "/graphql": "http://localhost:4000",
    },
  },
});
