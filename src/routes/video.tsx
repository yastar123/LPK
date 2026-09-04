import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Play,
  Video as VideoIcon,
  X,
  Sparkles,
  Youtube,
  Film,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
import videoAsset from "@/assets/video-german-education.mp4.asset.json";
import { useCms, type VideoDocumentationItem } from "@/lib/cms-store";

const defaultVideoSrc = videoAsset.url;

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Dokumentasi & Testimoni — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Tonton video dokumentasi kegiatan Ich Liebe Deutsch Medan: kelas bahasa Jerman, gathering, cooking class, dan pengalaman peserta program Aupair, Ausbildung, dan FSJ.",
      },
      { property: "og:title", content: "Video Dokumentasi — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Galeri video kegiatan dan testimoni alumni Ich Liebe Deutsch Medan yang telah berkarir di Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Video,
});

export function Video() {
  const { cms } = useCms();
  const vid = cms.video;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.`;

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    description?: string;
    youtubeId?: string;
    videoUrl?: string;
  } | null>(null);

  // List of all videos from CMS or fallbacks
  const allVideos: (
    | VideoDocumentationItem
    | {
        id: string;
        title: string;
        youtubeId: string;
        category: string;
        description: string;
        speaker: string;
        duration: string;
        thumbnail?: string;
      }
  )[] =
    vid.videos && vid.videos.length > 0
      ? vid.videos
      : [
          {
            id: "vid-1",
            title: "Profil Resmi Lembaga Ich Liebe Deutsch Medan",
            youtubeId: "dQw4w9WgXcQ",
            category: "Profil & Kelas",
            description:
              "Pengenalan fasilitas, kurikulum A1-B2 Goethe, dan bimbingan karir vokasi Jerman di Medan.",
            speaker: "Pimpinan & Tim Pengajar ILD",
            duration: "03:45",
          },
          {
            id: "vid-2",
            title: "Testimoni Alumni Ausbildung Gastronomie di Bayern",
            youtubeId: "dQw4w9WgXcQ",
            category: "Testimoni Alumni",
            description:
              "Kisah sukses siswa ILD Medan menjalani sekolah kejuruan dan praktik kerja di hotel ternama Jerman.",
            speaker: "Alumni Angkatan 2023",
            duration: "05:12",
          },
          {
            id: "vid-3",
            title: "Sesi Cooking Class Persiapan Adaptasi di Jerman",
            youtubeId: "dQw4w9WgXcQ",
            category: "Cooking Class",
            description:
              "Pelatihan memasak kuliner khas Jerman untuk mengasah kemandirian hidup sebelum berangkat.",
            speaker: "Peserta Au Pair & Ausbildung",
            duration: "04:30",
          },
          {
            id: "vid-4",
            title: "Gathering Siswa & Sesi Sharing Mental Juang",
            youtubeId: "dQw4w9WgXcQ",
            category: "Gathering",
            description:
              "Momen silaturahmi keluarga besar ILD Medan, pembinaan motivasi, dan kebersamaan antar kandidat.",
            speaker: "Keluarga Besar ILD Medan",
            duration: "03:15",
          },
        ];

  const categories = ["Semua", "Testimoni Alumni", "Profil & Kelas", "Cooking Class", "Gathering"];

  const filteredVideos =
    selectedCategory === "Semua"
      ? allVideos
      : allVideos.filter(
          (v) =>
            v.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(v.category?.toLowerCase() || ""),
        );

  // Close modal on Escape
  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  // Helper to extract clean youtube ID if given full link
  const getYoutubeEmbedUrl = (rawIdOrUrl: string) => {
    if (!rawIdOrUrl) return "";
    if (rawIdOrUrl.includes("youtube.com/watch?v=")) {
      const match = rawIdOrUrl.match(/v=([a-zA-Z0-9_-]+)/);
      return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : rawIdOrUrl;
    }
    if (rawIdOrUrl.includes("youtu.be/")) {
      const match = rawIdOrUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : rawIdOrUrl;
    }
    return `https://www.youtube.com/embed/${rawIdOrUrl}?autoplay=1`;
  };

  const isDirectVideo = (val?: string) => {
    if (!val) return false;
    return (
      val.startsWith("data:video") ||
      (val.startsWith("http") &&
        (val.endsWith(".mp4") || val.endsWith(".webm") || val.includes("/video")))
    );
  };

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
            <Film className="h-3.5 w-3.5" />
            <span>{vid.heroBadge || "Galeri Media & Dokumentasi"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {vid.title || "Video Kegiatan & Testimoni"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {vid.subtitle ||
              "Saksikan secara langsung cuplikan suasana belajar, pelatihan kuliner, gathering pembinaan mental, dan cerita inspiratif dari para alumni di Jerman."}
          </p>
        </div>
      </section>

      {/* 2. Featured Video Showcase */}
      <section className="py-16 bg-white border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-100">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Video Unggulan</span>
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Profil Resmi Ich Liebe Deutsch Medan
            </h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-sky-200 bg-slate-900 shadow-2xl">
            <div className="relative aspect-video w-full">
              <video
                src={defaultVideoSrc}
                poster={heroBrandenburg}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Ich Liebe Deutsch Medan — German Pathway
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Bimbingan bahasa Jerman Goethe-Zertifikat, Cooking Class, dan pendampingan resmi
                  program ke Jerman.
                </p>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition-colors shrink-0"
              >
                <span>Konsultasi Sekarang</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter & Video Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
                <VideoIcon className="h-3.5 w-3.5" />
                <span>Koleksi Video</span>
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                Galeri Video & Dokumentasi Siswa
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

          {/* Grid of video cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((item, idx) => {
              const hasDirectVideo = isDirectVideo(item.youtubeId);
              return (
                <div
                  key={item.id || idx}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition-all hover:shadow-xl hover:border-sky-300 hover:-translate-y-1"
                >
                  {/* Video Thumbnail Preview / Play trigger */}
                  <div
                    onClick={() =>
                      setActiveVideo({
                        title: item.title,
                        description: item.description,
                        youtubeId: item.youtubeId,
                        videoUrl: hasDirectVideo ? item.youtubeId : undefined,
                      })
                    }
                    className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={item.thumbnail || heroBrandenburg}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-xl shadow-sky-500/40 transition-transform duration-300 group-hover:scale-115">
                        <Play className="h-6 w-6 translate-x-0.5 fill-white" />
                      </div>
                    </div>

                    {/* Category Badge & Duration */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-sm">
                        {item.category || "Dokumentasi"}
                      </span>
                    </div>

                    {item.duration && (
                      <div className="absolute bottom-3 right-3 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white">
                        {item.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.speaker && (
                        <p className="text-xs font-semibold text-sky-600 mt-1">
                          Narasumber: {item.speaker}
                        </p>
                      )}
                      {item.description && (
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveVideo({
                            title: item.title,
                            description: item.description,
                            youtubeId: item.youtubeId,
                            videoUrl: hasDirectVideo ? item.youtubeId : undefined,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Tonton Video</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="border-t border-sky-100 bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Bergabung Bersama Kami
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ingin Menjadi Bagian Dari Kisah Sukses Berikutnya?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Konsultasikan persiapan bahasa Jerman, pemilihan bidang Ausbildung, Au Pair, maupun
              FSJ bersama tim konsultan kami di Medan.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Mulai Konsultasi WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 5. Video Player Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-slate-950 text-white">
              <h4 className="text-sm font-bold truncate pr-4">{activeVideo.title}</h4>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors"
                onClick={() => setActiveVideo(null)}
                aria-label="Tutup video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              {isDirectVideo(activeVideo.youtubeId) ? (
                <video
                  src={activeVideo.youtubeId || defaultVideoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <iframe
                  src={getYoutubeEmbedUrl(activeVideo.youtubeId || "dQw4w9WgXcQ")}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              )}
            </div>

            {/* Video Description */}
            {activeVideo.description && (
              <div className="p-4 sm:p-5 bg-slate-900 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/10">
                {activeVideo.description}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
