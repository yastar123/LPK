import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { initPostgres } from "./src/server/db";
import { apiRouter } from "./src/server/routes";

const PORT = 3000;
const HOST = "0.0.0.0";

async function startServer() {
  const app = express();

  // Basic security and parsing middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security: Block access to hidden system files (.env, .git)
  app.use((req, res, next) => {
    if (req.path.startsWith("/.") || req.path.includes("/.")) {
      return res.status(403).send("Forbidden");
    }
    next();
  });

  // Initialize PostgreSQL database connection and auto-create schema
  await initPostgres();

  // Mount API endpoints
  app.use("/api", apiRouter);

  // If a static index.html build exists, serve it statically.
  // Otherwise, use Vite middleware (for TanStack Start SSR & dev serving)
  const outputPublicPath = path.join(process.cwd(), ".output", "public");
  const distPath = path.join(process.cwd(), "dist");
  const hasStaticIndex =
    fs.existsSync(path.join(outputPublicPath, "index.html")) ||
    fs.existsSync(path.join(distPath, "index.html"));

  if (hasStaticIndex) {
    const staticDir = fs.existsSync(outputPublicPath) ? outputPublicPath : distPath;
    app.use(express.static(staticDir));
    app.get("*", (_req, res) => {
      const indexPath = path.join(staticDir, "index.html");
      res.sendFile(indexPath);
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: HOST,
        port: PORT,
        allowedHosts: true,
      },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Express + PostgreSQL] Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[Express Server Error]", err);
  process.exit(1);
});

export default startServer;
