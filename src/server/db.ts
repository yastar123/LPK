import pg from "pg";
const { Pool } = pg;
import { drizzle } from "drizzle-orm/node-postgres";
import { desc, eq } from "drizzle-orm";
import * as schema from "../db/schema.ts";

export interface ContactRecord {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  program?: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface ConsultationRecord {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  program_interest: string;
  education_level?: string | null;
  german_level?: string | null;
  preferred_date?: string | null;
  notes?: string | null;
  status: string;
  created_at: string;
}

export interface ApplicationRecord {
  id: number;
  program_type: string;
  full_name: string;
  email: string;
  whatsapp: string;
  city?: string | null;
  age?: number | null;
  last_education?: string | null;
  german_proficiency?: string | null;
  motivation?: string | null;
  status: string;
  created_at: string;
}

export interface NewsletterRecord {
  id: number;
  email: string;
  created_at: string;
}

export interface BlogPostRecord {
  id: number;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  date: string;
  author: string;
  content: string[];
  image?: string | null;
  created_at: string;
}

// In-memory store fallback for offline/preview resilience
const memoryStore = {
  contacts: [] as ContactRecord[],
  consultations: [] as ConsultationRecord[],
  applications: [] as ApplicationRecord[],
  newsletter: [] as NewsletterRecord[],
  blog: [] as BlogPostRecord[],
  cmsContent: {} as Record<string, unknown>,
  auditLogs: [] as Array<{
    id: number;
    module: string;
    action: string;
    details: string;
    created_at: string;
  }>,
};

let pool: pg.Pool | null = null;
let drizzleDb: ReturnType<typeof drizzle> | null = null;
let isConnectedToPostgres = false;
let dbInitializationError: string | null = null;

export function getDbStatus() {
  return {
    engine: "PostgreSQL",
    orm: "Drizzle ORM",
    driver: "pg (node-postgres)",
    connected: isConnectedToPostgres,
    mode: isConnectedToPostgres
      ? "Live PostgreSQL Database (Drizzle ORM)"
      : "In-Memory Store (PG Ready)",
    databaseUrlConfigured: !!(process.env.DATABASE_URL || process.env.PGHOST),
    error: dbInitializationError,
    stats: {
      contactsCount: isConnectedToPostgres ? "PostgreSQL Live" : memoryStore.contacts.length,
      consultationsCount: isConnectedToPostgres
        ? "PostgreSQL Live"
        : memoryStore.consultations.length,
      applicationsCount: isConnectedToPostgres
        ? "PostgreSQL Live"
        : memoryStore.applications.length,
      newsletterCount: isConnectedToPostgres ? "PostgreSQL Live" : memoryStore.newsletter.length,
      blogCount: isConnectedToPostgres ? "PostgreSQL Live" : memoryStore.blog.length,
    },
  };
}

export async function initPostgres(): Promise<boolean> {
  const connectionString =
    process.env.DATABASE_URL ||
    (process.env.PGHOST
      ? `postgresql://${process.env.PGUSER || "postgres"}:${process.env.PGPASSWORD || ""}@${process.env.PGHOST}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || "postgres"}`
      : null);

  if (!connectionString && !process.env.SQL_HOST) {
    console.log(
      "[Database] No DATABASE_URL or SQL_HOST provided. Running with integrated In-Memory PG Data Store.",
    );
    return false;
  }

  const isLocalHost = Boolean(
    !connectionString ||
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1") ||
    process.env.SQL_HOST === "localhost" ||
    process.env.SQL_HOST === "127.0.0.1" ||
    process.env.PGHOST === "localhost" ||
    process.env.PGHOST === "127.0.0.1",
  );

  const useSsl =
    !isLocalHost &&
    (process.env.PGSSL === "true" ||
      connectionString?.includes("sslmode=require") ||
      (process.env.NODE_ENV === "production" && !connectionString?.includes("sslmode=disable")));

  try {
    pool = new Pool({
      connectionString: connectionString || undefined,
      host: process.env.SQL_HOST || process.env.PGHOST,
      user: process.env.SQL_USER || process.env.PGUSER || "postgres",
      password: process.env.SQL_PASSWORD || process.env.PGPASSWORD,
      database: process.env.SQL_DB_NAME || process.env.PGDATABASE || "postgres",
      port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
      connectionTimeoutMillis: 5000,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
    });

    pool.on("error", (err) => {
      console.warn("[PostgreSQL Pool Warning]", err.message);
    });

    const client = await pool.connect();
    console.log("[Database] Successfully connected to PostgreSQL server via node-postgres!");

    // Initialize/Verify tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        program VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        program_interest VARCHAR(100) NOT NULL,
        education_level VARCHAR(100),
        german_level VARCHAR(50),
        preferred_date VARCHAR(50),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS program_applications (
        id SERIAL PRIMARY KEY,
        program_type VARCHAR(100) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        city VARCHAR(100),
        age INTEGER,
        last_education VARCHAR(100),
        german_proficiency VARCHAR(50),
        motivation TEXT,
        status VARCHAR(50) DEFAULT 'submitted',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS blog_articles (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(100) NOT NULL,
        excerpt TEXT NOT NULL,
        date VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL,
        content JSONB NOT NULL,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cms_content (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cms_audit_logs (
        id SERIAL PRIMARY KEY,
        module VARCHAR(100) NOT NULL,
        action VARCHAR(100) NOT NULL,
        details TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    client.release();
    drizzleDb = drizzle(pool, { schema });
    isConnectedToPostgres = true;
    dbInitializationError = null;
    return true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[Database] PostgreSQL connection failed: ${message}. Operating in resilient fallback mode.`,
    );
    dbInitializationError = message;
    isConnectedToPostgres = false;
    return false;
  }
}

// Contacts CRUD with Drizzle ORM
export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  program?: string;
  message: string;
}): Promise<ContactRecord> {
  if (isConnectedToPostgres && drizzleDb) {
    try {
      const inserted = await drizzleDb
        .insert(schema.contacts)
        .values({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          program: data.program || null,
          message: data.message,
        })
        .returning();
      const r = inserted[0];
      return {
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        program: r.program,
        message: r.message,
        status: r.status || "unread",
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      };
    } catch (e) {
      console.error("[Drizzle Insert Error]", e);
    }
  }

  const record: ContactRecord = {
    id: memoryStore.contacts.length + 1,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    program: data.program || null,
    message: data.message,
    status: "unread",
    created_at: new Date().toISOString(),
  };
  memoryStore.contacts.unshift(record);
  return record;
}

export async function getContacts(): Promise<ContactRecord[]> {
  if (isConnectedToPostgres && drizzleDb) {
    try {
      const rows = await drizzleDb
        .select()
        .from(schema.contacts)
        .orderBy(desc(schema.contacts.createdAt));
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        program: r.program,
        message: r.message,
        status: r.status || "unread",
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      }));
    } catch (e) {
      console.error("[Drizzle Select Error]", e);
    }
  }
  return memoryStore.contacts;
}

export async function deleteContact(id: number): Promise<boolean> {
  if (isConnectedToPostgres && pool) {
    try {
      await pool.query(`DELETE FROM contacts WHERE id = $1`, [id]);
      return true;
    } catch (e) {
      console.error("[Delete Contact Error]", e);
    }
  }
  memoryStore.contacts = memoryStore.contacts.filter((c) => c.id !== id);
  return true;
}

// Consultations CRUD with Drizzle ORM
export async function createConsultation(data: {
  name: string;
  phone: string;
  email?: string;
  program_interest: string;
  education_level?: string;
  german_level?: string;
  preferred_date?: string;
  notes?: string;
}): Promise<ConsultationRecord> {
  if (isConnectedToPostgres && drizzleDb) {
    try {
      const inserted = await drizzleDb
        .insert(schema.consultations)
        .values({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          programInterest: data.program_interest,
          educationLevel: data.education_level || null,
          germanLevel: data.german_level || null,
          preferredDate: data.preferred_date || null,
          notes: data.notes || null,
        })
        .returning();
      const r = inserted[0];
      return {
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email,
        program_interest: r.programInterest,
        education_level: r.educationLevel,
        german_level: r.germanLevel,
        preferred_date: r.preferredDate,
        notes: r.notes,
        status: r.status || "pending",
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      };
    } catch (e) {
      console.error("[Drizzle Insert Error]", e);
    }
  }

  const record: ConsultationRecord = {
    id: memoryStore.consultations.length + 1,
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    program_interest: data.program_interest,
    education_level: data.education_level || null,
    german_level: data.german_level || null,
    preferred_date: data.preferred_date || null,
    notes: data.notes || null,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  memoryStore.consultations.unshift(record);
  return record;
}

export async function getConsultations(): Promise<ConsultationRecord[]> {
  if (isConnectedToPostgres && drizzleDb) {
    try {
      const rows = await drizzleDb
        .select()
        .from(schema.consultations)
        .orderBy(desc(schema.consultations.createdAt));
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email,
        program_interest: r.programInterest,
        education_level: r.educationLevel,
        german_level: r.germanLevel,
        preferred_date: r.preferredDate,
        notes: r.notes,
        status: r.status || "pending",
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      }));
    } catch (e) {
      console.error("[Drizzle Select Error]", e);
    }
  }
  return memoryStore.consultations;
}

export async function deleteConsultation(id: number): Promise<boolean> {
  if (isConnectedToPostgres && pool) {
    try {
      await pool.query(`DELETE FROM consultations WHERE id = $1`, [id]);
      return true;
    } catch (e) {
      console.error("[Delete Consultation Error]", e);
    }
  }
  memoryStore.consultations = memoryStore.consultations.filter((c) => c.id !== id);
  return true;
}

// Program Applications CRUD
export async function createApplication(data: {
  program_type: string;
  full_name: string;
  email: string;
  whatsapp: string;
  city?: string;
  age?: number;
  last_education?: string;
  german_proficiency?: string;
  motivation?: string;
}): Promise<ApplicationRecord> {
  if (isConnectedToPostgres && drizzleDb) {
    try {
      const inserted = await drizzleDb
        .insert(schema.programApplications)
        .values({
          programType: data.program_type,
          fullName: data.full_name,
          email: data.email,
          whatsapp: data.whatsapp,
          city: data.city || null,
          age: data.age || null,
          lastEducation: data.last_education || null,
          germanProficiency: data.german_proficiency || null,
          motivation: data.motivation || null,
        })
        .returning();
      const r = inserted[0];
      return {
        id: r.id,
        program_type: r.programType,
        full_name: r.fullName,
        email: r.email,
        whatsapp: r.whatsapp,
        city: r.city,
        age: r.age,
        last_education: r.lastEducation,
        german_proficiency: r.germanProficiency,
        motivation: r.motivation,
        status: r.status || "submitted",
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      };
    } catch (e) {
      console.error("[Drizzle Insert Error]", e);
    }
  }

  const record: ApplicationRecord = {
    id: memoryStore.applications.length + 1,
    program_type: data.program_type,
    full_name: data.full_name,
    email: data.email,
    whatsapp: data.whatsapp,
    city: data.city || null,
    age: data.age || null,
    last_education: data.last_education || null,
    german_proficiency: data.german_proficiency || null,
    motivation: data.motivation || null,
    status: "submitted",
    created_at: new Date().toISOString(),
  };
  memoryStore.applications.unshift(record);
  return record;
}

export async function getApplications(): Promise<ApplicationRecord[]> {
  if (isConnectedToPostgres && drizzleDb) {
    try {
      const rows = await drizzleDb
        .select()
        .from(schema.programApplications)
        .orderBy(desc(schema.programApplications.createdAt));
      return rows.map((r) => ({
        id: r.id,
        program_type: r.programType,
        full_name: r.fullName,
        email: r.email,
        whatsapp: r.whatsapp,
        city: r.city,
        age: r.age,
        last_education: r.lastEducation,
        german_proficiency: r.germanProficiency,
        motivation: r.motivation,
        status: r.status || "submitted",
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      }));
    } catch (e) {
      console.error("[Drizzle Select Error]", e);
    }
  }
  return memoryStore.applications;
}

export async function deleteApplication(id: number): Promise<boolean> {
  if (isConnectedToPostgres && pool) {
    try {
      await pool.query(`DELETE FROM program_applications WHERE id = $1`, [id]);
      return true;
    } catch (e) {
      console.error("[Delete Application Error]", e);
    }
  }
  memoryStore.applications = memoryStore.applications.filter((a) => a.id !== id);
  return true;
}

// Newsletter
export async function subscribeNewsletter(
  email: string,
): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (isConnectedToPostgres && drizzleDb) {
    try {
      await drizzleDb
        .insert(schema.newsletterSubscribers)
        .values({ email: cleanEmail })
        .onConflictDoNothing();
      return { success: true, message: "Berhasil berlangganan buletin Ich Liebe Deutsch Medan!" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, message };
    }
  }

  const exists = memoryStore.newsletter.some((n) => n.email === cleanEmail);
  if (!exists) {
    memoryStore.newsletter.push({
      id: memoryStore.newsletter.length + 1,
      email: cleanEmail,
      created_at: new Date().toISOString(),
    });
  }
  return { success: true, message: "Berhasil berlangganan buletin Ich Liebe Deutsch Medan!" };
}

export async function getNewsletterSubscribers(): Promise<NewsletterRecord[]> {
  if (isConnectedToPostgres && pool) {
    try {
      const res = await pool.query(
        `SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC`,
      );
      return res.rows;
    } catch (e) {
      console.error("[Get Newsletter Error]", e);
    }
  }
  return memoryStore.newsletter;
}

function sanitizeCmsPayload(key: string, rawData: unknown): unknown {
  if (!rawData || typeof rawData !== "object") return rawData;
  if (key === "main_cms_config") {
    const d = { ...(rawData as Record<string, unknown>) };
    const kontak = (d.kontak || {}) as Record<string, unknown>;
    const footer = (d.footer || {}) as Record<string, unknown>;
    const navbar = (d.navbar || {}) as Record<string, unknown>;

    d.kontak = {
      ...kontak,
      officeAddress: "Jl. Ternak II No. 39, Medan Polonia",
      hotlineWA: "082127324453",
      phoneLandline: "082127324453",
      emailOffice: "ichliebedtschmedan@gmail.com",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Jl.+Ternak+II+No.+39+Medan+Polonia&t=&z=16&ie=UTF8&iwloc=&output=embed",
      operatingHoursText: "Senin – Sabtu: 08:30 – 17:30 WIB (Minggu & Hari Libur Nasional Tutup)",
    };

    d.footer = {
      ...footer,
      officeAddress: "Jl. Ternak II No. 39, Medan Polonia",
      phone: "082127324453",
      whatsapp: "082127324453",
      email: "ichliebedtschmedan@gmail.com",
    };

    d.navbar = {
      ...navbar,
      brandTitle: "ICH LIEBE DEUTSCH MEDAN",
      ctaButton: {
        label: "Konsultasi WA",
        href: "https://wa.me/6282127324453?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.",
        isExternal: true,
      },
    };

    return d;
  }
  return rawData;
}

// CMS Persistence in PostgreSQL
export async function saveCmsData(key: string, data: unknown): Promise<boolean> {
  const cleanData = sanitizeCmsPayload(key, data);
  if (isConnectedToPostgres && pool) {
    try {
      await pool.query(
        `INSERT INTO cms_content (key, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`,
        [key, JSON.stringify(cleanData)],
      );
      // Log audit
      await pool.query(
        `INSERT INTO cms_audit_logs (module, action, details, created_at)
         VALUES ($1, $2, $3, NOW())`,
        ["CMS_CONFIG", "UPDATE", `Konten '${key}' diperbarui pada ${new Date().toISOString()}`],
      );
      return true;
    } catch (e) {
      console.error("[Save CMS DB Error]", e);
    }
  }
  memoryStore.cmsContent[key] = cleanData;
  return true;
}

export async function getCmsData(key: string): Promise<unknown | null> {
  if (isConnectedToPostgres && pool) {
    try {
      const res = await pool.query(`SELECT data FROM cms_content WHERE key = $1`, [key]);
      if (res.rows.length > 0) {
        const sanitized = sanitizeCmsPayload(key, res.rows[0].data);
        return sanitized;
      }
    } catch (e) {
      console.error("[Get CMS DB Error]", e);
    }
  }
  return sanitizeCmsPayload(key, memoryStore.cmsContent[key] || null);
}
