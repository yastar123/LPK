import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
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

  // Initialize PostgreSQL database connection and auto-create schema
  await initPostgres();

  // Mount API endpoints
  app.use("/api", apiRouter);

  // Vite middleware in development vs Static assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: HOST,
        port: PORT,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
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
