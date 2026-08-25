import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play, Video as VideoIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import videoAsset from "@/assets/video-german-education.mp4.asset.json";

const videoSrc = videoAsset.url;
import galleryClass from "@/assets/gallery-class.jpg";
import galleryStudy from "@/assets/gallery-study.jpg";
import galleryCity from "@/assets/gallery-city.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";
import galleryCooking from "@/assets/gallery-cooking.jpg";
import galleryGathering from "@/assets/gallery-gathering.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20tentang%20program%20ke%20Jerman.";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Tonton video kegiatan Ich Liebe Deutsch Medan: kelas bahasa Jerman, gathering, cooking class, dan pengalaman peserta program Aupair, Ausbildung, dan FSJ Keperawatan.",
      },
      { property: "og:title", content: "Video — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Galeri video kegiatan dan pengalaman peserta program Ich Liebe Deutsch Medan menuju Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Video,
});

type Clip = {
  src: typeof galleryClass;
  poster: typeof galleryClass;
  title: string;
  desc: string;
};

const CLIPS: Clip[] = [
  {
    src: videoSrc,
    poster: heroBrandenburg,
    title: "Sambutan Ich Liebe Deutsch Medan",
    desc: "Cuplikan suasana dan semangat Ich Liebe Deutsch Medan.",
  },
  {
    src: videoSrc,
    poster: galleryClass,
    title: "Suasana Kelas Bahasa Jerman",
    desc: "Belajar bahasa Jerman bersama teman-teman baru.",
  },
  {
    src: videoSrc,
    poster: galleryCooking,
    title: "Cooking Class Bersama",
    desc: "Memasak dan berbagi kebersamaan sesi cooking class.",
  },
  {
    src: videoSrc,
    poster: galleryGathering,
    title: "Gathering Peserta Program",
    desc: "Momen berkumpul dan mempererat persahabatan.",
  },
  {
    src: videoSrc,
    poster: galleryGraduation,
    title: "Wisuda & Kelulusan",
    desc: "Perayaan kelulusan peserta siap berangkat ke Jerman.",
  },
  {
    src: videoSrc,
    poster: galleryCity,
    title: "Suasana Kota di Jerman",
    desc: "Sekilas kehidupan sehari-hari di Jerman.",
  },
];

function Video() {
  const [active, setActive] = useState<Clip | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

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
            Portofolio
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Video
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Tonton cuplikan kegiatan, belajar, dan pengalaman peserta Ich Liebe Deutsch Medan.
          </p>
        </div>
      </section>

      {/* Featured video */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <VideoIcon className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Video Unggulan
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Ich Liebe Deutsch Medan
            </h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <video
              src={videoSrc}
              poster={heroBrandenburg}
              controls
              playsInline
              className="aspect-video w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Clips grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Galeri Video
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Kegiatan & Pengalaman Peserta
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Pilih cuplikan untuk menonton suasana kegiatan Ich Liebe Deutsch Medan.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLIPS.map((clip) => (
              <button
                key={clip.title}
                type="button"
                onClick={() => setActive(clip)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={clip.poster}
                    alt={clip.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-night/30 transition-colors duration-300 group-hover:bg-night/50" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface/90 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5 fill-primary" />
                    </span>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{clip.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{clip.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Ingin menjadi bagian dari kami?
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Konsultasikan program Aupair, Ausbildung, dan FSJ Keperawatan bersama tim German
              Education Indonesia.
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

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-surface/10 text-surface transition-colors hover:bg-surface/20"
            onClick={() => setActive(null)}
            aria-label="Tutup video"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{active.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{active.desc}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
