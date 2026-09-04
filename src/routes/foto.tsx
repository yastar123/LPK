import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Image as ImageIcon, Sparkles, Filter, Maximize2 } from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const galleryClass = "/assets/gallery-class.jpg";
const galleryCooking = "/assets/gallery-cooking.jpg";
const galleryStudy = "/assets/gallery-study.jpg";
const galleryGraduation = "/assets/gallery-graduation.jpg";
const galleryCity = "/assets/gallery-city.jpg";
const galleryGathering = "/assets/gallery-gathering.jpg";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/foto")({
  head: () => ({
    meta: [
      { title: "Galeri Foto Kegiatan & Alumni — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Dokumentasi lengkap kegiatan belajar bahasa Jerman, cooking class, gathering, dan pelepasan siswa Ich Liebe Deutsch Medan ke Jerman.",
      },
      { property: "og:title", content: "Galeri Foto — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Lihat momen dan suasana nyata bimbingan intensif persiapan program ke Jerman di ILD Medan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Foto,
});

export function Foto() {
  const { cms } = useCms();
  const ft = cms.foto;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.`;

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Default seed photos
  const defaultPhotos: LightboxPhoto[] = [
    {
      id: "ph-1",
      src: galleryClass,
      title: "Suasana Belajar Bahasa Jerman Intensif",
      caption: "Siswa berlatih percakapan bahasa Jerman aktif dan tata bahasa di kelas ILD Medan.",
      category: "Belajar & Kelas",
    },
    {
      id: "ph-2",
      src: galleryCooking,
      title: "Cooking Class Kuliner Jerman",
      caption:
        "Pelatihan memasak menu khas Jerman sebagai bekal kemandirian hidup peserta Au Pair dan Ausbildung.",
      category: "Cooking Class",
    },
    {
      id: "ph-3",
      src: galleryStudy,
      title: "Simulasi Ujian Goethe & Wawancara",
      caption: "Sesi try out intensif persiapan ujian sertifikat bahasa Jerman internasional.",
      category: "Belajar & Kelas",
    },
    {
      id: "ph-4",
      src: galleryGathering,
      title: "Gathering Bulanan & Sharing Session",
      caption: "Kebersamaan dan pembinaan mental siswa bersama alumni yang telah berada di Jerman.",
      category: "Gathering Siswa",
    },
    {
      id: "ph-5",
      src: galleryGraduation,
      title: "Pelepasan Siswa Lulus Visa",
      caption: "Momen haru dan bangga pelepasan siswa yang telah mengantongi visa resmi ke Jerman.",
      category: "Pelepasan & Wisuda",
    },
    {
      id: "ph-6",
      src: galleryCity,
      title: "Aktivitas Siswa di Kota Jerman",
      caption: "Dokumentasi peserta yang telah aktif bekerja dan menempuh pendidikan di Jerman.",
      category: "Kehidupan di Jerman",
    },
  ];

  // Merge with CMS photos if provided
  const allPhotos: LightboxPhoto[] =
    ft.photos && ft.photos.length > 0
      ? ft.photos.map((p, i) => ({
          id: p.id || `cms-photo-${i}`,
          src: p.src,
          alt: p.alt || p.caption,
          title: p.caption || "Dokumentasi Kegiatan",
          caption: p.caption,
          category:
            ((p as Record<string, unknown>).category as string) ||
            (i % 2 === 0 ? "Belajar & Kelas" : "Cooking Class"),
        }))
      : defaultPhotos;

  const categories = [
    "Semua",
    "Belajar & Kelas",
    "Cooking Class",
    "Gathering Siswa",
    "Pelepasan & Wisuda",
    "Kehidupan di Jerman",
  ];

  const filteredPhotos =
    selectedCategory === "Semua"
      ? allPhotos
      : allPhotos.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

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
            <ImageIcon className="h-3.5 w-3.5" />
            <span>{ft.heroBadge || "Portofolio & Dokumentasi"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {ft.heroTitle || "Galeri Foto Kegiatan"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {ft.heroSubtitle ||
              "Kumpulan momen nyata pembelajaran bahasa Jerman, cooking class, gathering siswa, dan pelepasan kandidat menuju Jerman."}
          </p>
        </div>
      </section>

      {/* 2. Photo Gallery Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
                <Filter className="h-3.5 w-3.5" />
                <span>Kategori Foto</span>
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                Momen & Jejak Langkah Siswa
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-105"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-600"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Layout with Lightbox Trigger */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotos.map((photo, idx) => (
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
                    alt={photo.alt || photo.caption || "Dokumentasi Foto"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/logo.png";
                    }}
                  />
                  {/* Atmospheric overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Expand button badge */}
                  <div className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all group-hover:scale-105">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Category badge */}
                  {photo.category && (
                    <div className="absolute top-3.5 left-3.5">
                      <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-sm">
                        {photo.category}
                      </span>
                    </div>
                  )}

                  {/* Caption & Title */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    {photo.title && (
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1 drop-shadow-sm">
                        {photo.title}
                      </h3>
                    )}
                    {photo.caption && (
                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA Section */}
      <section className="border-t border-sky-100 bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Bergabung Bersama Kami
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ingin Menjadi Bagian Dari Galeri Momen Sukses Berikutnya?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Daftarkan diri Anda untuk kelas bahasa Jerman intensif dan raih peluang emas berkarier
              atau menempuh pendidikan di Jerman.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi WhatsApp Sekarang</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Interactive Lightbox Viewer */}
      <PhotoLightbox
        photos={filteredPhotos}
        currentIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(idx) => setPhotoIndex(idx)}
      />
    </main>
  );
}
