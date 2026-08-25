import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Globe2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";

const WHATSAPP_NUMBER = "6281265421893"; // 081265421893
const TELEPHONE = "081265965231";
const WEBSITE = "www.germaneducation.co.id";
const EMAIL = "indonesiagerman@gmail.com";
const ADDRESS =
  "Jl. Flamboyan Raya Kompleks Waikiki Blok F No. 49 RT 00/00 Kelurahan Tj. Selamat Kec. Medan Tuntungan Kotamadya Medan – Sumatera Utara";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

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
    .email("Format e-mail tidak valid")
    .max(255, "E-mail maksimal 255 karakter"),
  phone: z
    .string()
    .trim()
    .nonempty("Nomor telepon tidak boleh kosong")
    .max(30, "Nomor telepon maksimal 30 karakter"),
  message: z
    .string()
    .trim()
    .nonempty("Pesan tidak boleh kosong")
    .max(1000, "Pesan maksimal 1000 karakter"),
});

type ContactForm = z.infer<typeof contactSchema>;

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Hubungi Ich Liebe Deutsch Medan melalui WhatsApp, telepon, email, atau isi formulir kontak untuk konsultasi program Aupair, Ausbildung, dan FSJ ke Jerman.",
      },
      { property: "og:title", content: "Kontak — Ich Liebe Deutsch Medan" },
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
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof ContactForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    setSent(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const data = result.data;
    const text = `Halo Ich Liebe Deutsch Medan, saya ingin menghubungi Anda.%0A%0A` +
      `Nama: ${encodeURIComponent(data.name)}%0A` +
      `E-mail: ${encodeURIComponent(data.email)}%0A` +
      `Telepon: ${encodeURIComponent(data.phone)}%0A` +
      `Pesan: ${encodeURIComponent(data.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
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
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-surface/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-surface">
            Contact Us
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Kontak
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Hubungi tim Ich Liebe Deutsch Medan untuk konsultasi program ke Jerman.
          </p>
        </div>
      </section>

      {/* Contact info */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value="081265421893"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
            />
            <ContactCard icon={Phone} label="Telephone" value={TELEPHONE} href={`tel:${TELEPHONE}`} />
            <ContactCard icon={Globe2} label="Website" value={WEBSITE} href={`https://${WEBSITE}`} />
          </div>
        </div>
      </section>

      {/* Address + socials + form */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2">
            {/* Left: address & socials */}
            <div>
              <div className="mb-10">
                <h2 className="mb-5 flex items-center gap-2 font-display text-2xl leading-tight md:text-3xl">
                  <MapPin className="h-5 w-5 text-primary" /> Alamat
                </h2>
                <p className="max-w-[44ch] text-pretty leading-relaxed text-muted-foreground">
                  {ADDRESS}
                </p>
              </div>

              <div className="mb-10">
                <h2 className="mb-5 flex items-center gap-2 font-display text-2xl leading-tight md:text-3xl">
                  <Mail className="h-5 w-5 text-primary" /> Email
                </h2>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-primary transition-colors hover:underline"
                >
                  {EMAIL}
                </a>
              </div>

              <div>
                <h2 className="mb-5 font-display text-2xl leading-tight md:text-3xl">
                  Media Sosial
                </h2>
                <div className="flex flex-wrap gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Globe2 className="h-5 w-5" />
                      <span className="sr-only">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <h2 className="font-display text-2xl leading-tight md:text-3xl">
                Isi Form di Bawah Ini
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Silakan isi form di bawah ini untuk menghubungi kami.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <Field
                  id="name"
                  label="Name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  placeholder="Nama lengkap Anda"
                />
                <Field
                  id="email"
                  label="E-mail"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="email@contoh.com"
                />
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  error={errors.phone}
                  placeholder="08xxxxxxxxxx"
                />
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tulis pesan Anda di sini"
                    rows={5}
                    aria-invalid={!!errors.message}
                    className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                >
                  Kirim Lewat WhatsApp <Send className="h-4 w-4" />
                </button>

                {sent && (
                  <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">
                    Terima kasih! Form Anda telah diarahkan ke WhatsApp. Jika jendela tidak terbuka,
                    pastikan pop-up tidak diblokir.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Konsultasi sekarang juga!
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Tim Ich Liebe Deutsch Medan siap membantu menjawab pertanyaan Anda seputar program ke Jerman.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Mulai Konsultasi <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Back to top */}
      <div className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Back To Top
          </button>
        </div>
      </div>
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
