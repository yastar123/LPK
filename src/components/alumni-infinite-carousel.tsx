import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, GraduationCap, ChevronRight, Sparkles, Eye } from "lucide-react";
import { useCms } from "@/lib/cms-store";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";

export function AlumniInfiniteCarousel({
  variant = "embedded-hero",
}: {
  variant?: "embedded-hero" | "standalone-section";
}) {
  const { cms } = useCms();
  const alumniData = cms.fotoAlumni?.photos || [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // If there are no alumni photos, fallback gracefully
  if (alumniData.length === 0) {
    return null;
  }

  // Map to LightboxPhoto objects
  const allPhotos: LightboxPhoto[] = alumniData.map((p, idx) => ({
    id: p.id || `alumni-${idx}`,
    src: p.imgUrl || (p as unknown as { src?: string }).src || "/assets/gallery-city.jpg",
    alt: p.title || p.caption || "Foto Alumni di Jerman",
    title: p.title || "Alumni ILD Medan",
    caption: p.caption || "Dokumentasi kehidupan & kesuksesan alumni di Jerman.",
    category: p.category || "Alumni",
  }));

  // Multiply photos array if length is small so marquee fills large viewports
  let expandedPhotos = [...allPhotos];
  while (expandedPhotos.length < 10) {
    expandedPhotos = [...expandedPhotos, ...allPhotos];
  }
  // Double for seamless 50% infinite translation loop
  const duplicatedPhotos = [...expandedPhotos, ...expandedPhotos];

  const isHeroVariant = variant === "embedded-hero";

  return (
    <section
      className={`relative w-full overflow-hidden select-none ${
        isHeroVariant
          ? "bg-slate-950/80 border-t border-b border-white/10 py-6 sm:py-8 text-white backdrop-blur-md"
          : "bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-y border-sky-900/30 py-10 sm:py-14 text-white"
      }`}
      aria-label="Carousel Foto Alumni di Jerman"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-300">
            <GraduationCap className="h-4 w-4 text-amber-300" />
            <span>Alumni di Jerman</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-xs text-slate-300 font-normal normal-case">
              Dokumentasi Foto Kehidupan, Kerja & Vokasi
            </span>
          </div>
        </div>

        <Link
          to="/foto-alumni"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors group"
        >
          <span>Lihat Semua Foto Alumni ({allPhotos.length})</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Infinite Marquee Container with side gradient masks */}
      <div className="relative w-full overflow-hidden">
        {/* Side Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent" />

        {/* Marquee Track */}
        <div
          className="animate-infinite-scroll flex items-center gap-4 sm:gap-5 py-2 px-2"
          style={{ animation: "infinite-scroll 35s linear infinite", width: "max-content" }}
        >
          {duplicatedPhotos.map((photo, index) => {
            const originalIndex = index % allPhotos.length;
            return (
              <div
                key={`${photo.id}-${index}`}
                onClick={() => {
                  setSelectedPhotoIndex(originalIndex);
                  setLightboxOpen(true);
                }}
                className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-slate-900/90 shadow-lg transition-all duration-300 hover:scale-105 hover:border-sky-400/80 hover:shadow-sky-500/20 hover:shadow-2xl w-[220px] sm:w-[270px] md:w-[300px]"
              >
                {/* Photo Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950">
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.title || "Foto Alumni ILD Medan"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/gallery-city.jpg";
                    }}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category Badge */}
                  {photo.category && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 border border-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-sky-300 backdrop-blur-md shadow-sm">
                        <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                        <span>{photo.category}</span>
                      </span>
                    </div>
                  )}

                  {/* Top Right Quick View Eye Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/90 text-white shadow-md backdrop-blur-md">
                      <Eye className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Bottom Text Details */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10">
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 drop-shadow-sm group-hover:text-sky-200 transition-colors">
                      {photo.title}
                    </h3>
                    {photo.caption && (
                      <p className="mt-0.5 text-[11px] text-slate-300 line-clamp-1 leading-snug">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={allPhotos}
        currentIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(idx) => setSelectedPhotoIndex(idx)}
      />
    </section>
  );
}
