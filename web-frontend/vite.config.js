// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ERP (Express)
      "/erpapi": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/erpapi/, "/api"),
      },
      // Website API (FastAPI)
      "/siteapi": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        // if your FastAPI endpoints already start with /api, keep it:
        // rewrite: (p) => p.replace(/^\/siteapi/, "/api"),
        // else, if they are root mounted:
        // rewrite: (p) => p.replace(/^\/siteapi/, "/"),
      },
    },
  },
});
