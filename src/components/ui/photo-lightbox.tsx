import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2, Maximize2 } from "lucide-react";

export interface LightboxPhoto {
  id?: string;
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  category?: string;
  date?: string;
}

interface PhotoLightboxProps {
  photos: LightboxPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: PhotoLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onIndexChange((currentIndex + 1) % photos.length);
      } else if (e.key === "ArrowLeft") {
        onIndexChange((currentIndex - 1 + photos.length) % photos.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, photos.length, onClose, onIndexChange]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title:
            currentPhoto.title || currentPhoto.caption || "Dokumentasi Ich Liebe Deutsch Medan",
          text: currentPhoto.caption || "Dokumentasi kegiatan Ich Liebe Deutsch Medan",
          url: window.location.href,
        });
      } catch {
        // User cancelled or share not supported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan foto berhasil disalin ke clipboard!");
    }
  };

  return (
    <div
      id="photo-lightbox-modal"
      className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-md transition-all duration-300 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Foto"
    >
      {/* Top Header Bar */}
      <div
        className="flex h-16 w-full items-center justify-between px-4 sm:px-6 text-white/90 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-xs text-sky-400">
            {currentIndex + 1} / {photos.length}
          </span>
          {currentPhoto.category && (
            <span className="hidden sm:inline-block rounded-full bg-sky-500/20 border border-sky-400/30 px-2.5 py-0.5 text-[11px] font-semibold text-sky-300">
              {currentPhoto.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Bagikan foto"
            aria-label="Bagikan foto"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <a
            href={currentPhoto.src}
            download={`ILD-foto-${currentIndex + 1}.jpg`}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Buka gambar resolusi penuh"
            aria-label="Buka gambar penuh"
          >
            <Maximize2 className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-red-500 transition-colors"
            title="Tutup (Esc)"
            aria-label="Tutup penampil foto"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Area with Navigation Buttons */}
      <div className="relative flex flex-1 items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((currentIndex - 1 + photos.length) % photos.length);
            }}
            className="absolute left-3 sm:left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs border border-white/10 hover:bg-sky-600 transition-all shadow-xl hover:scale-110"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Center Image Container */}
        <div
          className="relative max-h-[75vh] max-w-[90vw] sm:max-w-5xl overflow-hidden rounded-2xl shadow-2xl bg-black/40 border border-white/10 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentPhoto.src}
            alt={
              currentPhoto.alt || currentPhoto.title || currentPhoto.caption || "Dokumentasi Foto"
            }
            className="max-h-[75vh] max-w-full w-auto object-contain transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logo.png";
            }}
          />
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((currentIndex + 1) % photos.length);
            }}
            className="absolute right-3 sm:right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs border border-white/10 hover:bg-sky-600 transition-all shadow-xl hover:scale-110"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Thumbnail Strip */}
      <div
        className="w-full bg-slate-900/80 border-t border-white/10 px-4 py-3 sm:px-8 text-center text-white/90 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {(currentPhoto.title || currentPhoto.caption) && (
          <div className="max-w-2xl mx-auto">
            {currentPhoto.title && (
              <h4 className="text-sm font-bold text-white mb-0.5">{currentPhoto.title}</h4>
            )}
            {currentPhoto.caption && (
              <p className="text-xs text-slate-300 leading-relaxed">{currentPhoto.caption}</p>
            )}
          </div>
        )}

        {/* Mini thumbnail strip */}
        {photos.length > 1 && (
          <div className="mt-2.5 flex items-center justify-center gap-1.5 overflow-x-auto py-1 max-w-xl mx-auto no-scrollbar">
            {photos.map((p, idx) => (
              <button
                key={p.id || idx}
                type="button"
                onClick={() => onIndexChange(idx)}
                className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  idx === currentIndex
                    ? "border-sky-400 scale-105 shadow-md shadow-sky-500/30 ring-2 ring-sky-400/50"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={p.src}
                  alt={p.caption || `Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
