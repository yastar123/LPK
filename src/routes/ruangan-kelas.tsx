import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, School, Filter, Maximize2, Sparkles } from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/ruangan-kelas")({
  head: () => ({
    meta: [
      { title: "Ruangan Kelas & Fasilitas Belajar — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Intip fasilitas ruangan kelas bimbingan intensif bahasa Jerman di Ich Liebe Deutsch Medan. Ruangan modern, AC, proyektor interaktif, dan suasana kondusif.",
      },
      {
        property: "og:title",
        content: "Ruangan Kelas & Fasilitas Belajar — Ich Liebe Deutsch Medan",
      },
      {
        property: "og:description",
        content:
          "Fasilitas ruang kelas representatif dan lengkap untuk mendukung fokus pembelajaran bahasa Jerman yang interaktif dan menyenangkan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RuanganKelas,
});

export function RuanganKelas() {
  const { cms } = useCms();
  const kelasConfig = cms.ruanganKelas || {
    heroBadge: "Fasilitas Belajar Representatif",
    title: "Ruangan Kelas ILD Medan",
    subtitle:
      "Dukung kenyamanan belajar bahasa Jerman intensif dengan suasana kelas modern, interaktif, dan berfasilitas lengkap.",
    photos: [],
  };
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20tertarik%20melihat%20langsung%20dan%20mendaftar%20kelas%20kursus%20bahasa%20Jerman.`;

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Default seed photos if empty
  const defaultPhotos: LightboxPhoto[] = [
    {
      id: "kelas-seed-1",
      src: "/assets/gallery-class.jpg",
      title: "Ruang Kelas Teori Modern",
      caption:
        "Dilengkapi dengan proyektor interaktif, AC, dan tata meja diskusi lingkaran untuk interaksi aktif.",
      category: "Ruang Kelas",
    },
    {
      id: "kelas-seed-2",
      src: "/assets/gallery-study.jpg",
      title: "Ruang Belajar Mandiri & Perpustakaan",
      caption:
        "Area tenang dengan koleksi modul latihan Goethe, kamus Jerman-Indonesia, dan akses Wi-Fi berkecepatan tinggi.",
      category: "Perpustakaan",
    },
    {
      id: "kelas-seed-3",
      src: "/assets/gallery-cooking.jpg",
      title: "Dapur Pembelajaran Praktik",
      caption:
        "Fasilitas dapur terintegrasi untuk kegiatan Cooking Class masakan khas Jerman secara langsung.",
      category: "Dapur Praktik",
    },
  ];

  // Merge with CMS photos if provided
  const allPhotos: LightboxPhoto[] =
    kelasConfig.photos && kelasConfig.photos.length > 0
      ? kelasConfig.photos.map((p, i) => ({
          id: p.id || `kelas-photo-${i}`,
          src: p.imgUrl || p.src,
          alt: p.caption || p.title,
          title: p.title || "Fasilitas Kelas",
          caption: p.caption,
          category: p.category || "Fasilitas",
        }))
      : defaultPhotos;

  // Extract categories for filtering
  const categories = [
    "Semua",
    ...Array.from(new Set(allPhotos.map((p) => p.category || "Fasilitas"))),
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
            <School className="h-3.5 w-3.5" />
            <span>{kelasConfig.heroBadge || "Fasilitas Belajar Representatif"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {kelasConfig.title || "Ruangan Kelas ILD Medan"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {kelasConfig.subtitle ||
              "Dukung kenyamanan belajar bahasa Jerman intensif dengan suasana kelas modern, interaktif, dan berfasilitas lengkap."}
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
                <span>Filter Area / Fasilitas</span>
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                Lingkungan Belajar yang Nyaman & Kondusif
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
          {filteredPhotos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      alt={photo.alt || photo.caption || "Dokumentasi Fasilitas Kelas"}
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
                        <span className="rounded-full bg-sky-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
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
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
              <span className="text-4xl">🏫</span>
              <h3 className="mt-4 text-lg font-bold text-slate-800">Belum Ada Foto</h3>
              <p className="text-sm text-slate-500 mt-1">
                Foto fasilitas untuk kategori ini belum ditambahkan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. CTA Section */}
      <section className="border-t border-sky-100 bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Kunjungi Kampus Kami
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ingin Merasakan Sensasi Belajar Nyaman di Sini?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Kami menyambut hangat kunjungan konsultasi Anda ke kantor dan ruangan kelas kami di
              Medan Polonia. Silakan buat janji kunjungan hari ini.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Jadwalkan Kunjungan</span>
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
