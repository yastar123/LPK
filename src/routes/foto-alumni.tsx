import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  GraduationCap,
  Filter,
  Maximize2,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/foto-alumni")({
  head: () => ({
    meta: [
      { title: "Foto Alumni di Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Galeri dokumentasi dan kisah sukses para alumni Ich Liebe Deutsch Medan yang saat ini sedang menempuh pendidikan Ausbildung, Au Pair, atau FSJ di Jerman.",
      },
      { property: "og:title", content: "Foto Alumni di Jerman — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Melihat kehidupan, aktivitas kerja, dan kesuksesan para alumni bimbingan intensif ILD Medan langsung di berbagai kota Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FotoAlumni,
});

export function FotoAlumni() {
  const { cms } = useCms();
  const alumniConfig = cms.fotoAlumni || {
    heroBadge: "Kisah Sukses & Testimoni Alumni",
    title: "Foto Alumni di Jerman",
    subtitle:
      "Inspirasi nyata dari para alumni Ich Liebe Deutsch Medan yang saat ini telah sukses belajar dan berkarier di Jerman.",
    photos: [],
  };
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20tertarik%20bertanya%20mengenai%20program%20alumni%20ke%20Jerman.`;

  const [selectedCity, setSelectedCity] = useState<string>("Semua");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // 100% Synced directly from CMS Store / Database
  const cmsPhotos =
    alumniConfig.photos && alumniConfig.photos.length > 0 ? alumniConfig.photos : [];

  const allPhotos: LightboxPhoto[] = cmsPhotos.map((p, i) => ({
    id: p.id || `alumni-photo-${i}`,
    src: p.imgUrl || (p as unknown as { src?: string }).src || "/assets/gallery-city.jpg",
    alt: p.caption || p.title || "Foto Alumni",
    title: p.title || "Foto Alumni",
    caption: p.caption,
    category: p.category || "Jerman",
  }));

  // Extract cities/categories for filtering
  const cities = ["Semua", ...Array.from(new Set(allPhotos.map((p) => p.category || "Alumni")))];

  const filteredPhotos =
    selectedCity === "Semua"
      ? allPhotos
      : allPhotos.filter((p) => p.category?.toLowerCase() === selectedCity.toLowerCase());

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
          {alumniConfig.heroBadge ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md mb-4 w-fit">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{alumniConfig.heroBadge}</span>
            </span>
          ) : null}
          {alumniConfig.title ? (
            <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {alumniConfig.title}
            </h1>
          ) : null}
          {alumniConfig.subtitle ? (
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              {alumniConfig.subtitle}
            </p>
          ) : null}
        </div>
      </section>

      {/* 2. Photo Gallery Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter Kota / Program</span>
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                Jejak Kehidupan Alumni di Jerman
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {cities.map((city) => {
                const isActive = selectedCity === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-105"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-600"
                    }`}
                  >
                    {city}
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
                      alt={photo.alt || photo.caption || "Dokumentasi Foto Alumni"}
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
                    {(photo.title || photo.caption) && (
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
                    )}
                  </div>
                </figure>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
              <span className="text-4xl">📸</span>
              <h3 className="mt-4 text-lg font-bold text-slate-800">Belum Ada Foto</h3>
              <p className="text-sm text-slate-500 mt-1">
                Foto alumni untuk kategori kota ini belum ditambahkan.
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
              Mulai Langkah Sukses Anda
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Siap Menyusul Kesuksesan Alumni Kami ke Jerman?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Ikuti kelas bimbingan intensif bahasa Jerman A1-B2 bersama kami dan dapatkan
              pendampingan penuh untuk berangkat ke Jerman.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi Program Gratis</span>
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
