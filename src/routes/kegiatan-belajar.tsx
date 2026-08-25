import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import galleryStudy from "@/assets/gallery-study.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import galleryCooking from "@/assets/gallery-cooking.jpg";
import galleryGathering from "@/assets/gallery-gathering.jpg";
import galleryCity from "@/assets/gallery-city.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20tentang%20program%20ke%20Jerman.";

export const Route = createFileRoute("/kegiatan-belajar")({
  head: () => ({
    meta: [
      { title: "Kegiatan Belajar — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Kegiatan Belajar Ich Liebe Deutsch Medan: kelas bahasa Jerman intensif yang membekali peserta Aupair, Ausbildung, dan FSJ Keperawatan hingga level A1/B1 sebelum berangkat ke Jerman.",
      },
      { property: "og:title", content: "Kegiatan Belajar — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Kelas bahasa Jerman intensif Ich Liebe Deutsch Medan untuk mempersiapkan peserta program menguasai bahasa sebelum berangkat ke Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KegiatanBelajar,
});

const POINTS = [
  {
    title: "Bahasa Jerman Intensif",
    desc: "Kelas bahasa Jerman intensif bersama pengajar berpengalaman, dipersiapkan sampai level A1/B1 sesuai kebutuhan masing-masing program.",
  },
  {
    title: "Materi Terstruktur",
    desc: "Materi disusun secara terstruktur mulai dari tata bahasa, kosakata, hingga percakapan sehari-hari yang relevan dengan kehidupan di Jerman.",
  },
  {
    title: "Kesiapan Menghadapi Ujian",
    desc: "Peserta dibekali latihan soal dan simulasi ujian bahasa agar siap menghadapi sertifikasi yang disyaratkan program Aupair dan Ausbildung.",
  },
];

const PHOTOS = [
  { src: galleryStudy, alt: "Kelas belajar bahasa Jerman", caption: "Belajar Bahasa (1)" },
  { src: galleryClass, alt: "Suasana kelas Ich Liebe Deutsch Medan", caption: "Belajar Bahasa (2)" },
  { src: galleryGathering, alt: "Belajar bersama peserta", caption: "Belajar Bersama (3)" },
  { src: galleryCooking, alt: "Kegiatan kelas tambahan", caption: "Kegiatan Kelas (4)" },
  { src: galleryCity, alt: "Diskusi peserta program", caption: "Diskusi Peserta (5)" },
  { src: galleryGraduation, alt: "Kelulusan peserta kelas", caption: "Wisuda & Kelulusan (6)" },
];

function KegiatanBelajar() {
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
            Kegiatan Program
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Kegiatan Belajar
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Sebelum berangkat ke Jerman, seluruh peserta program Aupair, Ausbildung, dan FSJ
            Keperawatan mengikuti kelas bahasa Jerman intensif sebagai bekal komunikasi sehari-hari.
          </p>
        </div>
      </section>

      {/* Tujuan */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Tujuan Kegiatan Belajar
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Bekal bahasa untuk hidup di Jerman
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Kemampuan bahasa Jerman adalah kunci utama agar peserta dapat beradaptasi dengan cepat
              di lingkungan keluarga asuh, sekolah, maupun tempat kerja.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {POINTS.map((v) => (
              <article key={v.title} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Kegiatan Belajar */}
      <section className="border-t border-border bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Galeri Kegiatan Belajar
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Momen belajar bersama kami
            </h2>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {PHOTOS.map((photo, idx) => (
              <figure
                key={`${photo.caption}-${idx}`}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-surface opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Ingin ikut kelas belajar Ich Liebe Deutsch Medan?
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
    </main>
  );
}
