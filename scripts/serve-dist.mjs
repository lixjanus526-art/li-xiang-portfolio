import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { preview } from "vite";

const outDir = ["dist", "dist/client"].find((dir) =>
  existsSync(resolve(dir, "index.html")),
);
if (!outDir) {
  throw new Error("No portfolio build found. Run the production build first.");
}

const server = await preview({
  build: { outDir },
  preview: {
    host: process.env.HOST ?? "127.0.0.1",
    port: Number(process.env.PORT ?? 4173),
    strictPort: true,
  },
});
server.printUrls();
