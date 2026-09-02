import { Router } from "express";
import {
  createApplication,
  createConsultation,
  createContact,
  getApplications,
  getConsultations,
  getContacts,
  deleteContact,
  deleteConsultation,
  deleteApplication,
  getNewsletterSubscribers,
  getDbStatus,
  subscribeNewsletter,
  saveCmsData,
  getCmsData,
} from "./db";
import { BLOG_POSTS, getPostBySlug } from "../lib/blog-posts";

export const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Ich Liebe Deutsch Medan",
    stack: {
      frontend: "React 19 + TanStack Router + Tailwind CSS",
      backend: "Express.js 5 + Node.js (TypeScript)",
      database: "PostgreSQL with Drizzle ORM",
    },
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Database connectivity & engine status
apiRouter.get("/db/status", (_req, res) => {
  res.json(getDbStatus());
});

// Programs metadata
apiRouter.get("/programs", (_req, res) => {
  res.json({
    programs: [
      {
        id: "ausbildung",
        title: "Ausbildung Gastronomie & Pflege",
        duration: "3 Tahun",
        salary: "€950 - €1,400 / bulan",
        germanRequirement: "Level B1",
        description:
          "Program sekolah kejuruan dual di Jerman dengan gaji bulanan di bidang perhotelan, kuliner, dan keperawatan.",
      },
      {
        id: "aupair",
        title: "Au Pair di Jerman",
        duration: "12 Bulan",
        allowance: "€280/bulan + kamar & makan",
        germanRequirement: "Level A1",
        description:
          "Tinggal bersama keluarga Jerman untuk mendalami bahasa dan budaya sembari merawat anak.",
      },
      {
        id: "fsj",
        title: "FSJ Keperawatan (Voluntary Social Year)",
        duration: "12 - 18 Bulan",
        allowance: "€450 - €750 / bulan",
        germanRequirement: "Level B1",
        description:
          "Pengabdian sosial sukarela di rumah sakit dan panti sosial Jerman sebagai batu loncatan karier perawat.",
      },
    ],
  });
});

// Blog posts API
apiRouter.get("/blog", (_req, res) => {
  res.json({ posts: BLOG_POSTS });
});

apiRouter.get("/blog/:slug", (req, res) => {
  const post = getPostBySlug(req.params.slug);
  if (!post) {
    return res.status(404).json({ error: "Artikel tidak ditemukan" });
  }
  return res.json({ post });
});

// Contact submissions
apiRouter.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body as {
      name?: string;
      email?: string;
      phone?: string;
      program?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Nama, email, dan pesan wajib diisi." });
    }

    const contact = await createContact({ name, email, phone, program, message });
    return res.status(201).json({
      success: true,
      message: "Pesan Anda berhasil dikirim ke tim Ich Liebe Deutsch Medan!",
      data: contact,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan pesan kontak";
    return res.status(500).json({ error: message });
  }
});

apiRouter.get("/contacts", async (_req, res) => {
  try {
    const contacts = await getContacts();
    return res.json({ contacts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

apiRouter.delete("/contacts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteContact(id);
    return res.json({ success: true, message: "Pesan berhasil dihapus dari database." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

// Consultation requests
apiRouter.post("/consultations", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      program_interest,
      education_level,
      german_level,
      preferred_date,
      notes,
    } = req.body as {
      name?: string;
      phone?: string;
      email?: string;
      program_interest?: string;
      education_level?: string;
      german_level?: string;
      preferred_date?: string;
      notes?: string;
    };

    if (!name || !phone || !program_interest) {
      return res
        .status(400)
        .json({ error: "Nama, nomor WhatsApp/telepon, dan minat program wajib diisi." });
    }

    const consultation = await createConsultation({
      name,
      phone,
      email,
      program_interest,
      education_level,
      german_level,
      preferred_date,
      notes,
    });

    return res.status(201).json({
      success: true,
      message:
        "Pendaftaran konsultasi gratis berhasil diserahkan! Konsultan kami akan segera menghubungi Anda.",
      data: consultation,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal mendaftarkan konsultasi";
    return res.status(500).json({ error: message });
  }
});

apiRouter.get("/consultations", async (_req, res) => {
  try {
    const consultations = await getConsultations();
    return res.json({ consultations });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

apiRouter.delete("/consultations/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteConsultation(id);
    return res.json({ success: true, message: "Data konsultasi berhasil dihapus dari database." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

// Program registration applications
apiRouter.post("/applications", async (req, res) => {
  try {
    const {
      program_type,
      full_name,
      email,
      whatsapp,
      city,
      age,
      last_education,
      german_proficiency,
      motivation,
    } = req.body as {
      program_type?: string;
      full_name?: string;
      email?: string;
      whatsapp?: string;
      city?: string;
      age?: number;
      last_education?: string;
      german_proficiency?: string;
      motivation?: string;
    };

    if (!program_type || !full_name || !email || !whatsapp) {
      return res
        .status(400)
        .json({ error: "Program, nama lengkap, email, dan WhatsApp wajib diisi." });
    }

    const application = await createApplication({
      program_type,
      full_name,
      email,
      whatsapp,
      city,
      age: age ? Number(age) : undefined,
      last_education,
      german_proficiency,
      motivation,
    });

    return res.status(201).json({
      success: true,
      message: "Pendaftaran program berhasil dikirimkan!",
      data: application,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal mengirim pendaftaran program";
    return res.status(500).json({ error: message });
  }
});

apiRouter.get("/applications", async (_req, res) => {
  try {
    const applications = await getApplications();
    return res.json({ applications });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

apiRouter.delete("/applications/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteApplication(id);
    return res.json({ success: true, message: "Pendaftaran berhasil dihapus dari database." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

// Newsletter subscription
apiRouter.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Alamat email tidak valid." });
    }

    const result = await subscribeNewsletter(email);
    return res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

apiRouter.get("/newsletter", async (_req, res) => {
  try {
    const subscribers = await getNewsletterSubscribers();
    return res.json({ subscribers });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

// CMS Content Management (PostgreSQL Direct Sync)
apiRouter.get("/cms/:key", async (req, res) => {
  try {
    const data = await getCmsData(req.params.key);
    if (!data) {
      return res.status(404).json({ error: "Data CMS tidak ditemukan" });
    }
    return res.json({ success: true, key: req.params.key, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});

apiRouter.post("/cms/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Data payload diperlukan." });
    }
    await saveCmsData(key, data);
    return res.json({
      success: true,
      message: `Konten CMS '${key}' berhasil disimpan ke database PostgreSQL!`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
});
