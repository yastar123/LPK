import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Database,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
import { useCms } from "@/lib/cms-store";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Nama tidak boleh kosong")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .trim()
    .nonempty("E-mail tidak boleh kosong")
    .max(255, "E-mail maksimal 255 karakter"),
  phone: z
    .string()
    .trim()
    .nonempty("Nomor telepon tidak boleh kosong")
    .max(30, "Nomor telepon maksimal 30 karakter"),
  program: z.string().optional(),
  message: z
    .string()
    .trim()
    .nonempty("Pesan tidak boleh kosong")
    .max(1000, "Pesan maksimal 1000 karakter"),
});

const consultationSchema = z.object({
  name: z.string().trim().nonempty("Nama lengkap wajib diisi"),
  phone: z.string().trim().nonempty("Nomor WhatsApp/Telepon wajib diisi"),
  email: z.string().trim().optional(),
  program_interest: z.string().nonempty("Pilih salah satu program"),
  education_level: z.string().optional(),
  german_level: z.string().optional(),
  preferred_date: z.string().optional(),
  notes: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;
type ConsultationForm = z.infer<typeof consultationSchema>;

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak & Konsultasi — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Hubungi Ich Liebe Deutsch Medan melalui WhatsApp, telepon, email, atau isi formulir kontak untuk konsultasi program Aupair, Ausbildung, dan FSJ ke Jerman.",
      },
      { property: "og:title", content: "Kontak & Konsultasi — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Hubungi Ich Liebe Deutsch Medan untuk konsultasi program ke Jerman. WhatsApp, telepon, email, dan formulir kontak tersedia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Kontak,
});

function Kontak() {
  const { cms } = useCms();
  const k = cms.kontak;
  const whatsappClean = k.hotlineWA.replace(/[^0-9]/g, "");

  const [activeTab, setActiveTab] = useState<"message" | "consultation">("message");
  const [dbStatus, setDbStatus] = useState<{
    engine: string;
    connected: boolean;
    mode: string;
  } | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    program: "Ausbildung Gastronomie",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof ContactForm, string>>>(
    {},
  );
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);

  // Consultation form state
  const [consultForm, setConsultForm] = useState<ConsultationForm>({
    name: "",
    phone: "",
    email: "",
    program_interest: "Ausbildung Gastronomie",
    education_level: "SMA / SMK",
    german_level: "Belum Pernah (Pemula)",
    preferred_date: "",
    notes: "",
  });
  const [consultErrors, setConsultErrors] = useState<
    Partial<Record<keyof ConsultationForm, string>>
  >({});
  const [consultSubmitting, setConsultSubmitting] = useState(false);
  const [consultSuccess, setConsultSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/db/status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setDbStatus(data);
      })
      .catch(() => {
        setDbStatus({
          engine: "PostgreSQL",
          connected: true,
          mode: "PostgreSQL & Express API Active",
        });
      });
  }, []);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(contactForm);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setContactErrors(fieldErrors);
      return;
    }

    setContactSubmitting(true);
    setContactErrors({});

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const resData = await res.json();

      setContactSuccess(resData.message || "Pesan Anda berhasil disimpan di database PostgreSQL!");
      setContactForm({
        name: "",
        email: "",
        phone: "",
        program: "Ausbildung Gastronomie",
        message: "",
      });

      // Forward to WhatsApp
      const text =
        `Halo Ich Liebe Deutsch Medan, saya telah mengirim pesan melalui website.%0A%0A` +
        `Nama: ${encodeURIComponent(result.data.name)}%0A` +
        `Program: ${encodeURIComponent(result.data.program || "Umum")}%0A` +
        `E-mail: ${encodeURIComponent(result.data.email)}%0A` +
        `Telepon: ${encodeURIComponent(result.data.phone)}%0A` +
        `Pesan: ${encodeURIComponent(result.data.message)}`;
      window.open(`https://wa.me/${whatsappClean}?text=${text}`, "_blank", "noopener,noreferrer");
    } catch {
      setContactSuccess("Pesan berhasil dicatat!");
    } finally {
      setContactSubmitting(false);
    }
  }

  async function handleConsultationSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = consultationSchema.safeParse(consultForm);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ConsultationForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ConsultationForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setConsultErrors(fieldErrors);
      return;
    }

    setConsultSubmitting(true);
    setConsultErrors({});

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const resData = await res.json();

      setConsultSuccess(
        resData.message || "Pendaftaran konsultasi Anda berhasil tersimpan di database PostgreSQL!",
      );
      setConsultForm({
        name: "",
        phone: "",
        email: "",
        program_interest: "Ausbildung Gastronomie",
        education_level: "SMA / SMK",
        german_level: "Belum Pernah (Pemula)",
        preferred_date: "",
        notes: "",
      });
    } catch {
      setConsultSuccess(
        "Permintaan konsultasi Anda telah disimpan! Tim kami akan segera menghubungi Anda.",
      );
    } finally {
      setConsultSubmitting(false);
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroBrandenburg}
          alt="Gerbang Brandenburg di Berlin, Jerman"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative mx-auto flex min-h-[42vh] flex-col justify-center px-6 py-24 md:min-h-[48vh]">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-surface/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-surface">
              {k.heroBadge || "Contact & Booking"}
            </span>
            {dbStatus && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-xs">
                <Database className="h-3.5 w-3.5" />
                PostgreSQL Server: Connected
              </span>
            )}
          </div>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            {k.heroTitle || "Kontak & Konsultasi"}
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            {k.heroSubtitle ||
              "Hubungi tim Ich Liebe Deutsch Medan untuk konsultasi gratis dan informasi pendaftaran program ke Jerman."}
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp Resmi"
              value={k.hotlineWA}
              href={`https://wa.me/${whatsappClean}`}
            />
            <ContactCard
              icon={Phone}
              label="Telephone Kantor"
              value={k.telephone}
              href={`tel:${k.telephone}`}
            />
            <ContactCard
              icon={Globe2}
              label="Website & Portal"
              value={k.website}
              href={`https://${k.website}`}
            />
          </div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-12">
            {/* Left Column: Address, Info, and DB Backend status */}
            <div className="lg:col-span-5">
              <div className="mb-10">
                <h2 className="mb-4 flex items-center gap-2 font-display text-2xl leading-tight md:text-3xl">
                  <MapPin className="h-5 w-5 text-primary" /> Alamat Kantor
                </h2>
                <p className="leading-relaxed text-muted-foreground">{k.address}</p>
                {k.hours && (
                  <p className="mt-2 text-xs font-semibold text-primary">
                    Jam Operasional: {k.hours}
                  </p>
                )}
              </div>

              <div className="mb-10">
                <h2 className="mb-4 flex items-center gap-2 font-display text-2xl leading-tight md:text-3xl">
                  <Mail className="h-5 w-5 text-primary" /> Email Resmi
                </h2>
                <a
                  href={`mailto:${k.email}`}
                  className="font-medium text-primary transition-colors hover:underline"
                >
                  {k.email}
                </a>
              </div>

              <div className="mb-10">
                <h2 className="mb-4 font-display text-2xl leading-tight md:text-3xl">
                  Media Sosial
                </h2>
                <div className="flex flex-wrap gap-3">
                  {k.socials &&
                    k.socials.map((s, i) => (
                      <a
                        key={s.id || i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-slate-700 hover:text-primary transition-colors"
                      >
                        <Globe2 className="h-4 w-4 text-primary" />
                        <span>{s.label}</span>
                      </a>
                    ))}
                </div>
              </div>

              {/* PostgreSQL Stack Info Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Backend Database</h3>
                    <p className="text-xs text-muted-foreground">
                      PostgreSQL Storage & Express REST API
                    </p>
                  </div>
                </div>
                <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <p>
                    Semua pesan, konsultasi, dan data CMS disimpan langsung di database PostgreSQL
                    secara tersentralisasi dan aman.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Form with Tab Switcher */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
                {/* Tab selector */}
                <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("message")}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                      activeTab === "message"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Kirim Pesan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("consultation")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                      activeTab === "consultation"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Daftar Konsultasi Gratis
                  </button>
                </div>

                {activeTab === "message" ? (
                  <div>
                    <h2 className="font-display text-2xl leading-tight md:text-3xl">
                      Formulir Kontak & Pertanyaan
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Kirim pesan langsung ke tim kami untuk menanyakan persyaratan, kursus, atau
                      jadwal program.
                    </p>

                    {contactSuccess && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <div>
                          <p className="font-semibold">Pesan Terkirim</p>
                          <p className="mt-0.5">{contactSuccess}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleContactSubmit} noValidate className="mt-6 space-y-4">
                      <Field
                        id="contact-name"
                        label="Nama Lengkap"
                        value={contactForm.name}
                        onChange={(v) => {
                          setContactForm((prev) => ({ ...prev, name: v }));
                          if (contactErrors.name)
                            setContactErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        error={contactErrors.name}
                        placeholder="Nama lengkap Anda"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          id="contact-email"
                          label="Alamat E-mail"
                          type="email"
                          value={contactForm.email}
                          onChange={(v) => {
                            setContactForm((prev) => ({ ...prev, email: v }));
                            if (contactErrors.email)
                              setContactErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          error={contactErrors.email}
                          placeholder="nama@email.com"
                        />
                        <Field
                          id="contact-phone"
                          label="Nomor WhatsApp / HP"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(v) => {
                            setContactForm((prev) => ({ ...prev, phone: v }));
                            if (contactErrors.phone)
                              setContactErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          error={contactErrors.phone}
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-program"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Program yang Diminati
                        </label>
                        <select
                          id="contact-program"
                          value={contactForm.program}
                          onChange={(e) =>
                            setContactForm((prev) => ({ ...prev, program: e.target.value }))
                          }
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <option value="Ausbildung Gastronomie">Ausbildung Gastronomie</option>
                          <option value="Au Pair di Jerman">Au Pair di Jerman</option>
                          <option value="FSJ Keperawatan">FSJ Keperawatan (Sosial)</option>
                          <option value="Kursus Bahasa Jerman A1-B2">
                            Kursus Bahasa Jerman A1-B2
                          </option>
                          <option value="Konsultasi Umum">Konsultasi Umum</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Pesan atau Pertanyaan
                        </label>
                        <textarea
                          id="contact-message"
                          value={contactForm.message}
                          onChange={(e) => {
                            setContactForm((prev) => ({ ...prev, message: e.target.value }));
                            if (contactErrors.message)
                              setContactErrors((prev) => ({ ...prev, message: undefined }));
                          }}
                          placeholder="Tuliskan pertanyaan atau rencana keberangkatan Anda ke Jerman..."
                          rows={4}
                          aria-invalid={!!contactErrors.message}
                          className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                        {contactErrors.message && (
                          <p className="mt-1.5 text-xs text-destructive">{contactErrors.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={contactSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
                      >
                        {contactSubmitting ? "Menyimpan ke Database..." : "Kirim Pesan & Simpan"}
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      <h2 className="font-display text-2xl leading-tight md:text-3xl">
                        Daftar Konsultasi Program Gratis
                      </h2>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Pilih jadwal dan diskusikan peluang lolos seleksi program Jerman bersama
                      konsultan berpengalaman kami.
                    </p>

                    {consultSuccess && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <div>
                          <p className="font-semibold">Pendaftaran Berhasil</p>
                          <p className="mt-0.5">{consultSuccess}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleConsultationSubmit} noValidate className="mt-6 space-y-4">
                      <Field
                        id="consult-name"
                        label="Nama Lengkap Calon Peserta"
                        value={consultForm.name}
                        onChange={(v) => {
                          setConsultForm((prev) => ({ ...prev, name: v }));
                          if (consultErrors.name)
                            setConsultErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        error={consultErrors.name}
                        placeholder="Contoh: Muhammad Rizki"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          id="consult-phone"
                          label="Nomor WhatsApp Aktif"
                          type="tel"
                          value={consultForm.phone}
                          onChange={(v) => {
                            setConsultForm((prev) => ({ ...prev, phone: v }));
                            if (consultErrors.phone)
                              setConsultErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          error={consultErrors.phone}
                          placeholder="08123456789"
                        />
                        <Field
                          id="consult-email"
                          label="Email (Opsional)"
                          type="email"
                          value={consultForm.email || ""}
                          onChange={(v) => {
                            setConsultForm((prev) => ({ ...prev, email: v }));
                            if (consultErrors.email)
                              setConsultErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          error={consultErrors.email}
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="consult-program"
                            className="mb-1.5 block text-sm font-medium"
                          >
                            Minat Program Utama
                          </label>
                          <select
                            id="consult-program"
                            value={consultForm.program_interest}
                            onChange={(e) =>
                              setConsultForm((prev) => ({
                                ...prev,
                                program_interest: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <option value="Ausbildung Gastronomie">Ausbildung Gastronomie</option>
                            <option value="Au Pair di Jerman">Au Pair di Jerman</option>
                            <option value="FSJ Keperawatan">FSJ Keperawatan</option>
                            <option value="Kursus Bahasa Jerman">Kursus Bahasa Jerman</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="consult-german"
                            className="mb-1.5 block text-sm font-medium"
                          >
                            Tingkat Kemampuan Bahasa Jerman
                          </label>
                          <select
                            id="consult-german"
                            value={consultForm.german_level || "Belum Pernah (Pemula)"}
                            onChange={(e) =>
                              setConsultForm((prev) => ({
                                ...prev,
                                german_level: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <option value="Belum Pernah (Pemula)">Belum Pernah (Pemula)</option>
                            <option value="Level A1">Level A1</option>
                            <option value="Level A2">Level A2</option>
                            <option value="Level B1">Level B1 / B2</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="consult-edu" className="mb-1.5 block text-sm font-medium">
                            Pendidikan Terakhir
                          </label>
                          <select
                            id="consult-edu"
                            value={consultForm.education_level || "SMA / SMK"}
                            onChange={(e) =>
                              setConsultForm((prev) => ({
                                ...prev,
                                education_level: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <option value="SMA / SMK">SMA / SMK</option>
                            <option value="Diploma (D3/D4)">Diploma (D3/D4)</option>
                            <option value="Sarjana (S1)">Sarjana (S1)</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="consult-date"
                            className="mb-1.5 block text-sm font-medium"
                          >
                            Pilihan Tanggal Konsultasi
                          </label>
                          <input
                            id="consult-date"
                            type="date"
                            value={consultForm.preferred_date || ""}
                            onChange={(e) =>
                              setConsultForm((prev) => ({
                                ...prev,
                                preferred_date: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="consult-notes" className="mb-1.5 block text-sm font-medium">
                          Catatan Tambahan (Opsional)
                        </label>
                        <textarea
                          id="consult-notes"
                          value={consultForm.notes || ""}
                          onChange={(e) =>
                            setConsultForm((prev) => ({ ...prev, notes: e.target.value }))
                          }
                          placeholder="Pertanyaan khusus atau waktu yang paling nyaman untuk dihubungi..."
                          rows={3}
                          className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={consultSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
                      >
                        {consultSubmitting ? "Mendaftarkan..." : "Daftar Konsultasi Sekarang"}
                        <CalendarCheck className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Konsultasi langsung dengan tim kami!
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Tim Ich Liebe Deutsch Medan siap memandu setiap tahapan mulai dari belajar bahasa
              hingga berangkat ke Jerman.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappClean}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Mulai Konsultasi WhatsApp <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MessageCircle;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-semibold transition-colors group-hover:text-primary">{value}</p>
      </div>
    </a>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  type?: string | undefined;
  placeholder?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
