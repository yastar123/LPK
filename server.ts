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

  // Security: Block access to sensitive system files (.env, .git, .aws, etc.)
  // while allowing Vite internal assets and dependencies
  app.use((req, res, next) => {
    const p = req.path.toLowerCase();
    if (p.includes(".vite") || p.includes("vite_cache") || p.includes("@id") || p.includes("@react-refresh")) {
      return next();
    }
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
  // Otherwise, use Vite middleware + TanStack Start SSR
  const outputPublicPath = path.join(process.cwd(), ".output", "public");
  const distPath = path.join(process.cwd(), "dist");
  const hasStaticIndex =
    fs.existsSync(path.join(outputPublicPath, "index.html")) ||
    fs.existsSync(path.join(distPath, "index.html"));

  if (hasStaticIndex) {
    const staticDir = fs.existsSync(outputPublicPath) ? outputPublicPath : distPath;
    app.use(express.static(staticDir));
    // Express 5 compatible catch-all
    app.use((_req, res) => {
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
    });
    app.use(vite.middlewares);

    // TanStack Start SSR fallback handler for Express
    app.use(async (req, res, next) => {
      if (res.headersSent) return;
      try {
        const ssrEnv = (vite.environments as Record<string, unknown>)?.ssr as
          | {
              runner?: {
                import: (id: string) => Promise<{
                  default?: { fetch?: (r: unknown) => Promise<Response> };
                  fetch?: (r: unknown) => Promise<Response>;
                }>;
              };
            }
          | undefined;
        if (ssrEnv?.runner) {
          const { NodeRequest, sendNodeResponse } = await import("srvx/node");
          const webReq = new NodeRequest({ req, res });
          const entry = await ssrEnv.runner.import("virtual:tanstack-start-server-entry");
          const handler = entry?.default ?? entry;
          if (typeof handler?.fetch === "function") {
            const response = await handler.fetch(webReq);
            return await sendNodeResponse(res, response);
          }
        }
      } catch (err) {
        console.error("[TanStack Start SSR Error]", err);
        return next(err);
      }
      next();
    });
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
