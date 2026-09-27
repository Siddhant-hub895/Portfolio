import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { contactDevApi } from "../backend/devMiddleware.js";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(frontendDir, "..");

export default defineConfig(() => {
  return {
    root: frontendDir,
    envDir: repoRoot,
    build: {
      outDir: path.resolve(repoRoot, "dist"),
      emptyOutDir: true,
    },
    plugins: [react(), tailwindcss(), contactDevApi()],
  };
});
