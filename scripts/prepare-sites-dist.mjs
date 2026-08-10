import { access, copyFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const candidates = [
  resolve(root, "dist", "worker", "index.js"),
  resolve(root, "dist", "worker", "index.mjs"),
  resolve(root, "dist", "li_xiang_moving_image_archive", "index.js"),
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const workerEntry = (await Promise.all(candidates.map(async (path) => ({
  path,
  exists: await exists(path),
})))).find((candidate) => candidate.exists)?.path;

if (!workerEntry) {
  throw new Error("Cloudflare Worker build output was not found.");
}

const serverDirectory = resolve(root, "dist", "server");
const hostingDirectory = resolve(root, "dist", ".openai");

await mkdir(serverDirectory, { recursive: true });
await mkdir(hostingDirectory, { recursive: true });
await copyFile(workerEntry, resolve(serverDirectory, "index.js"));
await copyFile(
  resolve(root, ".openai", "hosting.json"),
  resolve(hostingDirectory, "hosting.json"),
);

const unusedHostedMedia = [
  "rain-beast-fight.jpg",
  "rain-beast-fight.mp4",
  "social-ai-craft.mp4",
  "social-city-stories.mp4",
  "social-field-notes.mp4",
];

await Promise.all(
  unusedHostedMedia.map((file) => rm(resolve(root, "dist", "client", "media", file), { force: true })),
);
