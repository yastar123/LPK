import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Load environment variables from .env and fallback to .env.example
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}
if (fs.existsSync(".env.example")) {
  dotenv.config({ path: ".env.example" });
}

// Normalize credentials in process.env
if (process.env.ADMIN_EMAIL) {
  process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL.replace(/^["']|["']$/g, "").trim();
}
if (process.env.ADMIN_PASSWORD) {
  process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD.replace(/^["']|["']$/g, "").trim();
}

import { initPostgres } from "./src/server/db";
import { apiRouter } from "./src/server/routes";

const PORT = 3000;
const HOST = "0.0.0.0";

async function startServer() {
  const app = express();

  // Basic security and parsing middleware with high payload capacity for rich CMS content & base64 images
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Handle payload or parsing errors gracefully with JSON response
  app.use(
    (err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
      const errorObj = err as { status?: number; type?: string; message?: string };
      if (errorObj && (errorObj.status === 413 || errorObj.type === "entity.too.large")) {
        return res.status(413).json({
          success: false,
          error:
            "Ukuran data yang dikirim terlalu besar. Harap perkecil atau kompres file media sebelum menyimpan.",
        });
      }
      if (errorObj && errorObj.status === 400 && "body" in errorObj) {
        return res.status(400).json({
          success: false,
          error: "Format payload JSON tidak valid.",
        });
      }
      next(err);
    },
  );

  // SEO: Canonical Host & URL Normalization
  app.use((req, res, next) => {
    const rawHost = (req.headers["x-forwarded-host"] || req.headers.host || "")
      .toString()
      .toLowerCase();
    const isWww = rawHost.startsWith("www.ichliebedeutschmedan.or.id");

    // 1. Redirect www to non-www with 301 Permanent Redirect
    if (isWww) {
      const redirectUrl = `https://ichliebedeutschmedan.or.id${req.originalUrl}`;
      return res.redirect(301, redirectUrl);
    }

    // 2. Trailing slash normalization (e.g. /program-ausbildung/ -> /program-ausbildung)
    if (req.method === "GET" && req.path.length > 1 && req.path.endsWith("/")) {
      const cleanPath = req.path.slice(0, -1);
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, cleanPath + query);
    }

    // 3. Inject HTTP Link header for canonical URL for web crawlers
    if (req.method === "GET" && !req.path.startsWith("/api") && !req.path.includes(".")) {
      const canonicalPath = req.path === "/" ? "/" : req.path.replace(/\/+$/, "");
      res.setHeader(
        "Link",
        `<https://ichliebedeutschmedan.or.id${canonicalPath}>; rel="canonical"`,
      );
    }

    next();
  });

  // Security: Block access to sensitive system files (.env, .git, .aws, etc.)
  // while allowing Vite internal assets and dependencies
  app.use((req, res, next) => {
    const p = req.path.toLowerCase();
    if (
      p.includes(".vite") ||
      p.includes("vite_cache") ||
      p.includes("@id") ||
      p.includes("@react-refresh")
    ) {
      return next();
    }
    if (req.path.startsWith("/.") || req.path.includes("/.")) {
      return res.status(403).send("Forbidden");
    }
    next();
  });

  // Initialize PostgreSQL database connection and auto-create schema
  await initPostgres();

  // Google Search Console verification endpoint
  app.get("/google4dfae9546e319b9f.html", (_req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send("google-site-verification: google4dfae9546e319b9f.html");
  });

  // Sitemap & Robots
  app.get("/sitemap.xml", (_req, res) => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      return res.sendFile(sitemapPath);
    }
    res.status(404).end();
  });

  app.get("/robots.txt", (_req, res) => {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.sendFile(robotsPath);
    }
    res.status(404).end();
  });

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
