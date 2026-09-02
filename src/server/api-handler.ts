import {
  createApplication,
  createConsultation,
  createContact,
  deleteApplication,
  deleteConsultation,
  deleteContact,
  getApplications,
  getConsultations,
  getContacts,
  getDbStatus,
  getNewsletterSubscribers,
  saveCmsData,
  getCmsData,
  subscribeNewsletter,
} from "./db";
import { BLOG_POSTS, getPostBySlug } from "../lib/blog-posts";

export async function handleApiRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!pathname.startsWith("/api")) {
    return null;
  }

  const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  // GET /api/health
  if (pathname === "/api/health" && request.method === "GET") {
    return new Response(
      JSON.stringify({
        status: "ok",
        app: "Ich Liebe Deutsch Medan",
        stack: {
          frontend: "React 19 + TanStack Router + Tailwind CSS",
          backend: "Express.js 5 + Node.js (TypeScript)",
          database: "PostgreSQL with Drizzle ORM",
        },
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      }),
      { status: 200, headers: jsonHeaders },
    );
  }

  // GET /api/db/status
  if (pathname === "/api/db/status" && request.method === "GET") {
    return new Response(JSON.stringify(getDbStatus()), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // POST /api/login
  if (pathname === "/api/login" && request.method === "POST") {
    try {
      const body = (await request.json()) as { email?: string; password?: string };
      const adminEmail = process.env.ADMIN_EMAIL || "admin@acc.co.id";
      const adminPassword = process.env.ADMIN_PASSWORD || "password123";

      const inputEmail = (body.email || "").trim().toLowerCase();
      const targetEmail = adminEmail.trim().toLowerCase();

      if (inputEmail === targetEmail && body.password === adminPassword) {
        return new Response(
          JSON.stringify({
            success: true,
            user: {
              email: adminEmail,
              name: "Administrator LPK",
              role: "admin",
              permissions: ["all_read_write_delete"],
            },
            token: `rbac_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          }),
          { status: 200, headers: jsonHeaders },
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "E-mail atau kata sandi yang Anda masukkan salah.",
          }),
          { status: 401, headers: jsonHeaders },
        );
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  }

  // GET /api/programs
  if (pathname === "/api/programs" && request.method === "GET") {
    return new Response(
      JSON.stringify({
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
      }),
      { status: 200, headers: jsonHeaders },
    );
  }

  // GET /api/blog
  if (pathname === "/api/blog" && request.method === "GET") {
    return new Response(JSON.stringify({ posts: BLOG_POSTS }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // GET /api/blog/:slug
  if (pathname.startsWith("/api/blog/") && request.method === "GET") {
    const slug = pathname.replace("/api/blog/", "");
    const post = getPostBySlug(slug);
    if (!post) {
      return new Response(JSON.stringify({ error: "Artikel tidak ditemukan" }), {
        status: 404,
        headers: jsonHeaders,
      });
    }
    return new Response(JSON.stringify({ post }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // POST /api/contacts
  if (pathname === "/api/contacts" && request.method === "POST") {
    try {
      const body = (await request.json()) as {
        name?: string;
        email?: string;
        phone?: string;
        program?: string;
        message?: string;
      };
      const { name, email, phone, program, message } = body;
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Nama, email, dan pesan wajib diisi." }), {
          status: 400,
          headers: jsonHeaders,
        });
      }
      const data = await createContact({ name, email, phone, program, message });
      return new Response(
        JSON.stringify({
          success: true,
          message: "Pesan Anda berhasil dikirim ke tim Ich Liebe Deutsch Medan!",
          data,
        }),
        { status: 201, headers: jsonHeaders },
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan pesan kontak";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  }

  // GET /api/contacts
  if (pathname === "/api/contacts" && request.method === "GET") {
    const contacts = await getContacts();
    return new Response(JSON.stringify({ contacts }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // DELETE /api/contacts/:id
  if (pathname.startsWith("/api/contacts/") && request.method === "DELETE") {
    const id = Number(pathname.replace("/api/contacts/", ""));
    await deleteContact(id);
    return new Response(
      JSON.stringify({ success: true, message: "Pesan berhasil dihapus dari database." }),
      { status: 200, headers: jsonHeaders },
    );
  }

  // POST /api/consultations
  if (pathname === "/api/consultations" && request.method === "POST") {
    try {
      const body = (await request.json()) as {
        name?: string;
        phone?: string;
        email?: string;
        program_interest?: string;
        education_level?: string;
        german_level?: string;
        preferred_date?: string;
        notes?: string;
      };
      const {
        name,
        phone,
        email,
        program_interest,
        education_level,
        german_level,
        preferred_date,
        notes,
      } = body;

      if (!name || !phone || !program_interest) {
        return new Response(
          JSON.stringify({
            error: "Nama, nomor WhatsApp/telepon, dan minat program wajib diisi.",
          }),
          { status: 400, headers: jsonHeaders },
        );
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

      return new Response(
        JSON.stringify({
          success: true,
          message:
            "Pendaftaran konsultasi gratis berhasil diserahkan! Konsultan kami akan segera menghubungi Anda.",
          data: consultation,
        }),
        { status: 201, headers: jsonHeaders },
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mendaftarkan konsultasi";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  }

  // GET /api/consultations
  if (pathname === "/api/consultations" && request.method === "GET") {
    const consultations = await getConsultations();
    return new Response(JSON.stringify({ consultations }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // DELETE /api/consultations/:id
  if (pathname.startsWith("/api/consultations/") && request.method === "DELETE") {
    const id = Number(pathname.replace("/api/consultations/", ""));
    await deleteConsultation(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Data konsultasi berhasil dihapus dari database.",
      }),
      { status: 200, headers: jsonHeaders },
    );
  }

  // POST /api/applications
  if (pathname === "/api/applications" && request.method === "POST") {
    try {
      const body = (await request.json()) as {
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
      } = body;

      if (!program_type || !full_name || !email || !whatsapp) {
        return new Response(
          JSON.stringify({
            error: "Program, nama lengkap, email, dan WhatsApp wajib diisi.",
          }),
          { status: 400, headers: jsonHeaders },
        );
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

      return new Response(
        JSON.stringify({
          success: true,
          message: "Pendaftaran program berhasil dikirimkan!",
          data: application,
        }),
        { status: 201, headers: jsonHeaders },
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mengirim pendaftaran";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  }

  // GET /api/applications
  if (pathname === "/api/applications" && request.method === "GET") {
    const applications = await getApplications();
    return new Response(JSON.stringify({ applications }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // DELETE /api/applications/:id
  if (pathname.startsWith("/api/applications/") && request.method === "DELETE") {
    const id = Number(pathname.replace("/api/applications/", ""));
    await deleteApplication(id);
    return new Response(
      JSON.stringify({ success: true, message: "Pendaftaran berhasil dihapus dari database." }),
      { status: 200, headers: jsonHeaders },
    );
  }

  // POST /api/newsletter
  if (pathname === "/api/newsletter" && request.method === "POST") {
    try {
      const body = (await request.json()) as { email?: string };
      const { email } = body;
      if (!email || !email.includes("@")) {
        return new Response(JSON.stringify({ error: "Alamat email tidak valid." }), {
          status: 400,
          headers: jsonHeaders,
        });
      }
      const result = await subscribeNewsletter(email);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: jsonHeaders,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  }

  // GET /api/newsletter
  if (pathname === "/api/newsletter" && request.method === "GET") {
    const subscribers = await getNewsletterSubscribers();
    return new Response(JSON.stringify({ subscribers }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // GET /api/cms/:key
  if (pathname.startsWith("/api/cms/") && request.method === "GET") {
    const key = pathname.replace("/api/cms/", "");
    const data = await getCmsData(key);
    if (!data) {
      return new Response(JSON.stringify({ error: "Data CMS tidak ditemukan" }), {
        status: 404,
        headers: jsonHeaders,
      });
    }
    return new Response(JSON.stringify({ success: true, key, data }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  // POST /api/cms/:key
  if (pathname.startsWith("/api/cms/") && request.method === "POST") {
    try {
      const key = pathname.replace("/api/cms/", "");
      const body = (await request.json()) as { data?: unknown };
      if (!body.data) {
        return new Response(JSON.stringify({ error: "Data payload diperlukan." }), {
          status: 400,
          headers: jsonHeaders,
        });
      }
      await saveCmsData(key, body.data);
      return new Response(
        JSON.stringify({
          success: true,
          message: `Konten CMS '${key}' berhasil disimpan ke database PostgreSQL!`,
        }),
        { status: 200, headers: jsonHeaders },
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  }

  return new Response(JSON.stringify({ error: "Endpoint tidak ditemukan" }), {
    status: 404,
    headers: jsonHeaders,
  });
}
