import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { contactDevApi } from "../backend/devMiddleware.js";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(frontendDir, "..");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, "");
  process.env.RESEND_API_KEY ||= env.RESEND_API_KEY;
  process.env.CONTACT_EMAIL ||= env.CONTACT_EMAIL;
  process.env.FROM_EMAIL ||= env.FROM_EMAIL;

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
