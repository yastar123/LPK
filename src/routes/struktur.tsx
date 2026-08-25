import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Users } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.";

export const Route = createFileRoute("/struktur")({
  head: () => ({
    meta: [
      { title: "Struktur Organisasi — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Struktur organisasi Ich Liebe Deutsch Medan yang mengelola program Aupair, Ausbildung, dan FSJ Keperawatan ke Jerman.",
      },
      { property: "og:title", content: "Struktur Organisasi — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Kenali susunan organisasi Ich Liebe Deutsch Medan dan tim yang mendampingi peserta program ke Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Struktur,
});

const ORG_LEVELS = [
  {
    title: "Pembina",
    members: ["Ketua Pembina"],
  },
  {
    title: "Pengurus",
    members: ["Ketua Yayasan", "Sekretaris", "Bendahara"],
  },
  {
    title: "Divisi Operasional",
    members: [
      "Kepala Divisi Program Aupair",
      "Kepala Divisi Ausbildung",
      "Kepala Divisi FSJ Keperawatan",
    ],
  },
  {
    title: "Tim Pendukung",
    members: ["Instruktur Bahasa Jerman", "Tim Dokumen & Visa", "Tim Marketing & Komunikasi"],
  },
];

function Struktur() {
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
            Profil Perusahaan
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Struktur
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Struktur organisasi Ich Liebe Deutsch Medan.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Struktur Organisasi
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Susunan pengurus Ich Liebe Deutsch Medan
              </h2>
            </div>
            <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Ich Liebe Deutsch Medan dikelola oleh tim yang berpengalaman di
                bidang pendidikan, bahasa Jerman, dan administrasi program internasional. Struktur
                organisasi ini dirancang untuk memberikan pendampingan terbaik bagi setiap peserta
                yang bercita-cita belajar dan berkarier di Jerman.
              </p>
              <p>
                Setiap divisi memiliki tanggung jawab spesifik, mulai dari seleksi peserta,
                pengajaran bahasa Jerman, penyiapan dokumen, hingga koordinasi dengan mitra di
                Jerman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Org chart */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Struktur Organisasi Yayasan
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Susunan hierarki dan tanggung jawab utama dalam menjalankan program Ich Liebe Deutsch Medan.
            </p>
          </div>

          <div className="relative space-y-10">
            {ORG_LEVELS.map((level, idx) => (
              <div key={level.title} className="relative">
                {idx !== ORG_LEVELS.length - 1 && (
                  <div className="absolute left-1/2 top-full h-10 w-px -translate-x-1/2 bg-border" />
                )}
                <div className="text-center">
                  <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {level.title}
                  </h3>
                  <div
                    className={`grid gap-4 ${
                      level.members.length === 1
                        ? "place-content-center"
                        : "sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {level.members.map((member) => (
                      <div
                        key={member}
                        className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                      >
                        <p className="font-semibold text-foreground">{member}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Ingin bergabung dengan keluarga Ich Liebe Deutsch Medan?
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Hubungi tim kami untuk informasi lengkap seputar program dan pendampingan ke Jerman.
            </p>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Hubungi Kami <ArrowUpRight className="h-4 w-4" />
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
