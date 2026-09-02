import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Award,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const galleryClass = "/assets/gallery-class.jpg";
const galleryStudy = "/assets/gallery-study.jpg";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/kegiatan-belajar")({
  head: () => ({
    meta: [
      { title: "Kegiatan Belajar Bahasa Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Metode pembelajaran bahasa Jerman intensif level A1, A2, dan B1 di Ich Liebe Deutsch Medan: kurikulum standar Goethe-Zertifikat, simulasi ujian, dan latihan percakapan aktif.",
      },
      { property: "og:title", content: "Kegiatan Belajar Bahasa Jerman — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Bimbingan intensif bahasa Jerman dengan pengajar alumni UNIMED & Jerman. Siap ujian Goethe dan wawancara kerja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KegiatanBelajar,
});

export function KegiatanBelajar() {
  const { cms } = useCms();
  const kb = cms.kegiatanBelajar;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "081265965231").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20tertarik%20mengikuti%20kursus%20bahasa%20Jerman.`;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const defaultPhotos: LightboxPhoto[] = [
    {
      id: "kb-1",
      src: galleryClass,
      title: "Kelas Bahasa Intensif",
      caption: "Sesi interaktif pengajaran tata bahasa dan latihan percakapan harian level A1-B1.",
      category: "Belajar & Kelas",
    },
    {
      id: "kb-2",
      src: galleryStudy,
      title: "Simulasi Ujian Goethe-Zertifikat",
      caption:
        "Try out membaca (Lesen), mendengar (Hören), menulis (Schreiben), dan berbicara (Sprechen).",
      category: "Belajar & Kelas",
    },
  ];

  const photos: LightboxPhoto[] =
    kb.photos && kb.photos.length > 0
      ? kb.photos.map((p, i) => ({
          id: p.id || `kb-photo-${i}`,
          src: p.src,
          alt: p.alt || p.caption,
          title: p.caption || "Dokumentasi Belajar",
          caption: p.caption,
          category: "Belajar & Kelas",
        }))
      : defaultPhotos;

  return (
    <main className="bg-slate-50/50">
      {/* 1. Hero Header */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white border-b border-sky-900/40">
        <img
          src={heroBrandenburg}
          alt="Gerbang Brandenburg di Berlin, Jerman"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative mx-auto flex min-h-[40vh] sm:min-h-[46vh] max-w-7xl flex-col justify-center px-6 py-20 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md mb-4 w-fit">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{kb.heroBadge || "Pilar 1: Kurikulum & Akademik"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {kb.heroTitle || "Kegiatan Belajar Bahasa Jerman"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {kb.heroSubtitle ||
              "Kurikulum intensif dan komunikatif yang dirancang untuk mengantarkan siswa lulus ujian Goethe-Zertifikat Level A1, A2, dan B1 dengan predikat terbaik."}
          </p>
        </div>
      </section>

      {/* 2. Metode & Keunggulan Belajar */}
      <section className="py-20 bg-white border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-100">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Metode Pembelajaran</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Fokus Pada Keterampilan Komunikasi Nyata
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {kb.introText ||
                "Kami memadukan pemahaman tata bahasa Jerman yang sistematis dengan latihan percakapan interaktif, simulasi wawancara kerja, dan pembekalan istilah profesi (Fachsprache) sesuai tujuan program peserta."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {kb.methods && kb.methods.length > 0 ? (
              kb.methods.map((m, i) => (
                <div
                  key={m.id || i}
                  className="rounded-3xl border border-sky-100 bg-sky-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-sky-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/20 mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {m.desc}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="rounded-3xl border border-sky-100 bg-sky-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-sky-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/20 mb-4">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Standar CEFR Goethe-Institut</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Materi dan latihan terstruktur mencakup 4 modul kemampuan: Membaca (Lesen),
                    Mendengar (Hören), Menulis (Schreiben), dan Berbicara (Sprechen).
                  </p>
                </div>
                <div className="rounded-3xl border border-sky-100 bg-sky-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-sky-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/20 mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Praktik Komunikasi Aktif</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Setiap pertemuan dilengkapi sesi dialog dan roleplay situasi kehidupan nyata di
                    Jerman (belanja, transportasi, di tempat kerja, dan di rumah).
                  </p>
                </div>
                <div className="rounded-3xl border border-sky-100 bg-sky-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-sky-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/20 mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Try Out & Simulasi Wawancara</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Simulasi ujian berkala dan latihan wawancara bersama penutur asli / pengajar
                    alumni Jerman untuk mengasah rasa percaya diri.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Galeri Foto Belajar */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Dokumentasi Kelas</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
              Momen Suasana Belajar Intensif
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, idx) => (
              <figure
                key={photo.id || idx}
                onClick={() => {
                  setPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm cursor-pointer transition-all hover:shadow-2xl hover:border-sky-300 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.caption || "Kegiatan Belajar"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs sm:text-sm font-semibold text-white leading-snug drop-shadow-sm">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="border-t border-sky-100 bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Siap Memulai Kursus Bahasa Jerman Bersama Kami?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Pilih kelas bahasa Jerman level A1, A2, atau B1 sesuai kebutuhan dan program impian
              Anda ke Jerman.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Daftar Kelas via WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <PhotoLightbox
        photos={photos}
        currentIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(idx) => setPhotoIndex(idx)}
      />
    </main>
  );
}
