import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Users } from "lucide-react";
import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Tim Ich Liebe Deutsch Medan: Founder, Kepala Kursus, Staf Pengajar Ausbildung & Aupair, serta Staf Admin yang mendampingi peserta program ke Jerman.",
      },
      { property: "og:title", content: "Team — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Kenali tim Ich Liebe Deutsch Medan yang mengelola dan mendampingi peserta program Aupair, Ausbildung, dan FSJ Keperawatan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Team,
});

function Team() {
  const { cms } = useCms();
  const tm = cms.team;
  const k = cms.kontak;
  const waLink = `https://wa.me/${k.hotlineWA.replace(/[^0-9]/g, "")}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.`;

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
            {tm.heroBadge || "Ich Liebe Deutsch Medan"}
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            {tm.heroTitle || "Team"}
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            {tm.heroSubtitle ||
              "Tim Ich Liebe Deutsch Medan yang mengelola dan mendampingi peserta program Aupair, Ausbildung, dan FSJ Keperawatan menuju Jerman."}
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Team Members
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Berikut ini team member Ich Liebe Deutsch Medan
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Tim yang berdedikasi mempersiapkan peserta secara akademis, mental, dan administratif
              sebelum berangkat ke Jerman.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tm.members &&
              tm.members.map((member) => (
                <article
                  key={member.id || member.name}
                  className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-shadow hover:shadow-lg"
                >
                  <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-display font-semibold text-primary">
                    {member.initials ||
                      member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                  </div>
                  <h3 className="font-display text-xl">{member.name}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {member.role}
                  </p>
                  <span className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    Our Team
                  </span>
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
              Ingin bergabung dengan keluarga Ich Liebe Deutsch Medan?
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Konsultasikan program Aupair, Ausbildung, dan FSJ Keperawatan bersama tim German
              Education Indonesia.
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
