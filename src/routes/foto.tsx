import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import galleryCity from "@/assets/gallery-city.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import galleryCooking from "@/assets/gallery-cooking.jpg";
import galleryGathering from "@/assets/gallery-gathering.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";
import galleryStudy from "@/assets/gallery-study.jpg";
import programAupair from "@/assets/program-aupair.jpg";
import programAusbildung from "@/assets/program-ausbildung.jpg";
import programFsj from "@/assets/program-fsj.jpg";
import blogAupair from "@/assets/blog-aupair.jpg";
import blogAusbildung from "@/assets/blog-ausbildung.jpg";
import blogFsj from "@/assets/blog-fsj.jpg";
import blogKarir from "@/assets/blog-karir.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20tentang%20program%20ke%20Jerman.";

export const Route = createFileRoute("/foto")({
  head: () => ({
    meta: [
      { title: "Foto — Galeri Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Galeri foto kegiatan Ich Liebe Deutsch Medan: kelas bahasa Jerman, gathering, cooking class, dan pengalaman peserta program Aupair, Ausbildung, dan FSJ Keperawatan.",
      },
      { property: "og:title", content: "Foto — Galeri Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Lihat suasana kegiatan, belajar, dan pengalaman peserta program Ich Liebe Deutsch Medan dalam galeri foto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Foto,
});

const PHOTOS = [
  { src: galleryClass, alt: "Kelas bahasa Jerman Ich Liebe Deutsch Medan", caption: "Kelas Bahasa Jerman" },
  { src: galleryStudy, alt: "Peserta belajar bahasa Jerman", caption: "Belajar Bahasa" },
  { src: galleryGathering, alt: "Gathering peserta program", caption: "Gathering Peserta" },
  { src: galleryCooking, alt: "Cooking class peserta", caption: "Cooking Class" },
  { src: galleryCity, alt: "Suasana kota di Jerman", caption: "Suasana Kota Jerman" },
  { src: galleryGraduation, alt: "Wisuda dan kelulusan peserta", caption: "Wisuda & Kelulusan" },
  { src: programAupair, alt: "Program Aupair Ich Liebe Deutsch Medan", caption: "Program Aupair" },
  { src: programAusbildung, alt: "Program Ausbildung Ich Liebe Deutsch Medan", caption: "Program Ausbildung" },
  { src: programFsj, alt: "Program FSJ Keperawatan Ich Liebe Deutsch Medan", caption: "Program FSJ Keperawatan" },
  { src: blogAupair, alt: "Kegiatan program Aupair", caption: "Kegiatan Aupair" },
  { src: blogAusbildung, alt: "Kegiatan program Ausbildung", caption: "Kegiatan Ausbildung" },
  { src: blogFsj, alt: "Kegiatan program FSJ Keperawatan", caption: "Kegiatan FSJ" },
  { src: blogKarir, alt: "Kegiatan dan karier peserta", caption: "Karier Peserta" },
  { src: galleryClass, alt: "Suasana kelas Ich Liebe Deutsch Medan", caption: "Suasana Kelas" },
  { src: galleryGathering, alt: "Gathering anggota Ich Liebe Deutsch Medan", caption: "Gathering Anggota" },
  { src: galleryCooking, alt: "Sesi cooking class", caption: "Sesi Cooking Class" },
];

function Foto() {
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
            Foto
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Kumpulan momen kegiatan, belajar, dan pengalaman peserta Ich Liebe Deutsch Medan.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Galeri Foto
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Momen Ich Liebe Deutsch Medan
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Lihat suasana kelas, gathering, cooking class, dan pengalaman peserta program kami.
            </p>
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
    </main>
  );
}
