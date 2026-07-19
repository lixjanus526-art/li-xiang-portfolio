import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  plugins: [react(), cloudflare()],
});
