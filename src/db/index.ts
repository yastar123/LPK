import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
import * as schema from "./schema.ts";

declare global {
  var _postgresPool: pg.Pool | undefined;
}

export function createPool(): pg.Pool {
  if (!global._postgresPool) {
    const connectionString =
      process.env.DATABASE_URL ||
      (process.env.PGHOST
        ? `postgresql://${process.env.PGUSER || "postgres"}:${process.env.PGPASSWORD || ""}@${process.env.PGHOST}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || "postgres"}`
        : undefined);

    global._postgresPool = new Pool({
      connectionString,
      host: process.env.SQL_HOST || process.env.PGHOST,
      user: process.env.SQL_USER || process.env.PGUSER || "postgres",
      password: process.env.SQL_PASSWORD || process.env.PGPASSWORD,
      database: process.env.SQL_DB_NAME || process.env.PGDATABASE || "postgres",
      port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
      max: 10,
      connectionTimeoutMillis: 10000,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });

    global._postgresPool.on("error", (err) => {
      console.error("[PostgreSQL Pool Error]", err);
    });
  }
  return global._postgresPool;
}

export const pool = createPool();
export const db = drizzle(pool, { schema });
export { schema };
