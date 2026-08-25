import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, FileText, Globe2, HomeIcon, UserCheck } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import galleryStudy from "@/assets/gallery-study.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20mengenai%20persyaratan%20program%20ke%20Jerman.";

export const Route = createFileRoute("/persyaratan")({
  head: () => ({
    meta: [
      { title: "Persyaratan — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Persyaratan program Ich Liebe Deutsch Medan: Ausbildung (maks. 32 tahun, min. B1), Au Pair (maks. 26 tahun, min. A1), FSJ/BFD (min. A1), dan Kuliah (B2/C1).",
      },
      { property: "og:title", content: "Persyaratan — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Pelajari persyaratan untuk mengikuti program Ausbildung, Au Pair, FSJ/BFD, G to G, dan Kuliah ke Jerman bersama Ich Liebe Deutsch Medan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Persyaratan,
});

const REQUIREMENTS = [
  {
    icon: FileText,
    title: "Ausbildung",
    desc: "Maksimal 32 tahun saat mendaftar les, lulusan SMA/sederajat, dan belajar bahasa Jerman sampai level minimal B1 (level menyesuaikan jurusan yang dipilih).",
  },
  {
    icon: HomeIcon,
    title: "Au Pair",
    desc: "Maksimal umur 26 tahun, dengan bahasa Jerman minimal level A1 — lebih disarankan belajar minimal sampai level A2.",
  },
  {
    icon: UserCheck,
    title: "FSJ / BFD",
    desc: "FSJ maksimal umur 26 tahun. BFD tidak ada batasan umur (namun beberapa perusahaan mensyaratkan usia). Bahasa Jerman minimal level A1.",
  },
  {
    icon: Globe2,
    title: "Kuliah / Studium",
    desc: "Kemampuan bahasa Jerman sesuai persyaratan universitas/program — umumnya level B2 atau C1, tergantung universitas dan program studinya.",
  },
];

const REQUIREMENT_LIST = [
  "Ausbildung: maks. 32 tahun, lulusan SMA/sederajat, bahasa Jerman min. B1",
  "Au Pair: maks. 26 tahun, bahasa Jerman min. A1 (disarankan A2)",
  "FSJ: maks. 26 tahun / BFD: tanpa batasan umur, bahasa Jerman min. A1",
  "Kuliah/Studium: bahasa Jerman B2 atau C1 sesuai universitas",
];

function Persyaratan() {
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
            Informasi
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Persyaratan
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Ketahui syarat-syarat umum yang perlu dipenuhi untuk mengikuti program Ich Liebe Deutsch Medan
            Indonesia menuju Jerman.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Persyaratan
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Syarat umum untuk seluruh program
              </h2>
              <p className="mt-5 font-display text-xl text-muted-foreground">
                Ich Liebe Deutsch Medan
              </p>
            </div>
            <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Setiap program Ich Liebe Deutsch Medan — Ausbildung, Au Pair, FSJ/BFD, G to G,
                maupun Kuliah/Studium — memiliki persyaratan yang harus dipenuhi oleh setiap
                kandidat sebelum mendaftar.
              </p>
              <p>
                Pastikan Anda memenuhi seluruh persyaratan di bawah ini. Untuk detail tiap program,
                silakan lihat halaman masing-masing program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement cards */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Persyaratan
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Empat Syarat Utama
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Berikut persyaratan dasar yang berlaku untuk seluruh program Ich Liebe Deutsch Medan.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {REQUIREMENTS.map((req) => (
              <article
                key={req.title}
                className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <req.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{req.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{req.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + image */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src={galleryStudy}
                alt="Peserta belajar bahasa Jerman di Ich Liebe Deutsch Medan"
                className="rounded-2xl object-cover shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Ringkasan
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Persyaratan Program
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Pastikan Anda memenuhi seluruh persyaratan berikut sebelum mendaftar.
              </p>
              <ul className="mt-8 space-y-4">
                {REQUIREMENT_LIST.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Konsultasi sekarang juga!
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Masih ragu apakah Anda memenuhi persyaratan? Hubungi tim kami untuk konsultasi gratis.
            </p>
          </div>
          <a
            href={WA_LINK}
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
