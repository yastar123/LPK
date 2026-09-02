import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Layers } from "lucide-react";
import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/kegiatan-program")({
  head: () => ({
    meta: [
      { title: "Kegiatan Program — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Kegiatan program Ich Liebe Deutsch Medan: Gathering, Cooking Class, dan Kegiatan Belajar yang membina peserta Aupair, Ausbildung, dan FSJ Keperawatan menuju Jerman.",
      },
      { property: "og:title", content: "Kegiatan Program — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Rangkaian kegiatan program Ich Liebe Deutsch Medan: gathering, cooking class, dan kegiatan belajar bahasa Jerman untuk peserta program.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KegiatanProgram,
});

function KegiatanProgram() {
  const { cms } = useCms();
  const kp = cms.kegiatanProgram;
  const k = cms.kontak;
  const waLink = `https://wa.me/${k.hotlineWA.replace(/[^0-9]/g, "")}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20tentang%20program%20ke%20Jerman.`;

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
            {kp.heroBadge || "Portofolio"}
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            {kp.heroTitle || "Kegiatan Program"}
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            {kp.heroSubtitle ||
              "Rangkaian kegiatan Ich Liebe Deutsch Medan yang membina peserta secara menyeluruh — dari belajar bahasa hingga pembinaan mental dan kebersamaan."}
          </p>
        </div>
      </section>

      {/* Daftar Kegiatan */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Kegiatan Program
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Tiga kegiatan utama kami
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              {kp.introText ||
                "Setiap kegiatan dirancang untuk mempersiapkan peserta secara akademis, mental, dan sosial sebelum berangkat ke Jerman."}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {kp.activities &&
              kp.activities.map((a) => (
                <article
                  key={a.id || a.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="mb-3 font-display text-2xl">{a.title}</h3>
                    <p className="mb-6 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {a.desc}
                    </p>
                    {a.to ? (
                      <Link
                        to={a.to}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:underline"
                      >
                        Lihat detail <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        Segera hadir
                      </span>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/40 py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Ingin mengikuti kegiatan program kami?
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Konsultasikan program Aupair, Ausbildung, dan FSJ Keperawatan bersama tim kami.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <span>Hubungi Kami</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
