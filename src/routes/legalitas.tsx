import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, Building2, FileCheck, Scale, ShieldCheck } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.";

export const Route = createFileRoute("/legalitas")({
  head: () => ({
    meta: [
      { title: "Legalitas — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Dokumen legal Ich Liebe Deutsch Medan: badan hukum, izin Kemenkumham, NPWP, dan keanggotaan resmi.",
      },
      { property: "og:title", content: "Legalitas — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Ich Liebe Deutsch Medan berbadan hukum resmi dan tercatat di Kemenkumham RI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Legalitas,
});

const LEGAL_ITEMS = [
  {
    icon: Building2,
    title: "Badan Hukum Yayasan",
    desc: "Ich Liebe Deutsch Medan didirikan secara resmi sebagai badan hukum yayasan di wilayah hukum Indonesia.",
    detail: "Status: Aktif",
  },
  {
    icon: FileCheck,
    title: "Pengesahan Kemenkumham RI",
    desc: "Telah memperoleh pengesahan dan pendaftaran dari Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia.",
    detail: "Akta & SK Kemenkumham: tersedia di kantor",
  },
  {
    icon: Scale,
    title: "NPWP Yayasan",
    desc: "Memiliki Nomor Pokok Wajib Pajak atas nama Ich Liebe Deutsch Medan.",
    detail: "NPWP: tersedia perminataan",
  },
  {
    icon: ShieldCheck,
    title: "Komitmen Kepatuhan",
    desc: "Seluruh program dan kegiatan diselenggarakan sesuai peraturan perundang-undangan yang berlaku di Indonesia dan Jerman.",
    detail: "Audit & laporan tahunan: rutin",
  },
];

function Legalitas() {
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
            Legalitas
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Dokumen resmi Ich Liebe Deutsch Medan sebagai
            lembaga penyelenggara program ke Jerman.
          </p>
        </div>
      </section>

      {/* Legal overview */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Dokumen Resmi
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Legalitas Ich Liebe Deutsch Medan
              </h2>
              <p className="mt-5 font-display text-xl text-muted-foreground">
                Ich Liebe Deutsch Medan
              </p>
            </div>
            <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Ich Liebe Deutsch Medan merupakan lembaga kursus bahasa Jerman yang berdiri sejak
                tahun 2024 dan telah terdaftar serta memiliki izin operasional sebagai lembaga
                pendidikan. Kami memastikan setiap program yang kami selenggarakan — Ausbildung,
                Au Pair, FSJ/BFD, G to G, dan Kuliah — memiliki landasan hukum dan administrasi
                yang lengkap.
              </p>
              <p>
                Dokumen legal kami tersedia untuk diperiksa oleh peserta maupun orang tua/wali
                sebagai bentuk transparansi dan akuntabilitas lembaga.
              </p>
              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {[
                  "Berbadan hukum yayasan resmi",
                  "Tercatat di Kemenkumham RI",
                  "NPWP yayasan aktif",
                  "Mitra agensi resmi di Jerman",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal details */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Rincian Legal
          </p>
          <h2 className="mb-14 max-w-[22ch] text-balance font-display text-4xl leading-tight md:text-5xl">
            Informasi badan hukum dan perizinan
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {LEGAL_ITEMS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Ingin memastikan keabsahan dokumen kami?
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Hubungi kami untuk konfirmasi legalitas atau mengajukan pertanyaan seputar program.
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
