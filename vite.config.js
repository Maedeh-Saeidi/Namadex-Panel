import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginPrettier from "vite-plugin-prettier";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [react(), vitePluginPrettier({})],
});
