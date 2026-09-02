import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  Heart,
  Award,
  Users,
} from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const galleryCooking = "/assets/gallery-cooking.jpg";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/cooking-class")({
  head: () => ({
    meta: [
      { title: "Cooking Class Kuliner Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Sesi Cooking Class Ich Liebe Deutsch Medan: Seluruh peserta Au Pair & Ausbildung dibekali keterampilan memasak masakan Jerman dan melatih kemandirian hidup sebelum berangkat.",
      },
      { property: "og:title", content: "Cooking Class — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Pembekalan keterampilan memasak kuliner Eropa & Jerman untuk melatih kemandirian hidup dan adaptasi budaya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CookingClass,
});

export function CookingClass() {
  const { cms } = useCms();
  const cc = cms.cookingClass;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "081265965231").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20tertarik%20dengan%20program%20ke%20Jerman.`;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const defaultPhotos: LightboxPhoto[] = [
    {
      id: "cc-1",
      src: galleryCooking,
      title: "Praktik Membuat Menu Jerman",
      caption:
        "Peserta belajar meracik bumbu dan mengolah hidangan khas Jerman seperti Schnitzel, Kartoffelsalat, dan Spätzle.",
      category: "Cooking Class",
    },
  ];

  const photos: LightboxPhoto[] =
    cc.photos && cc.photos.length > 0
      ? cc.photos.map((p, i) => ({
          id: p.id || `cc-photo-${i}`,
          src: p.src,
          alt: p.alt || p.caption,
          title: p.caption || "Dokumentasi Cooking Class",
          caption: p.caption,
          category: "Cooking Class",
        }))
      : defaultPhotos;

  return (
    <main className="bg-slate-50/50">
      {/* 1. Hero Header */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white border-b border-amber-900/40">
        <img
          src={heroBrandenburg}
          alt="Gerbang Brandenburg di Berlin, Jerman"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative mx-auto flex min-h-[40vh] sm:min-h-[46vh] max-w-7xl flex-col justify-center px-6 py-20 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md mb-4 w-fit">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>{cc.heroBadge || "Pilar 2: Keterampilan Hidup & Budaya"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {cc.heroTitle || "Cooking Class Kuliner Jerman"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {cc.heroSubtitle ||
              "Seluruh peserta Au Pair & Ausbildung dibekali kemampuan memasak masakan khas Eropa sebagai bekal kemandirian hidup dan modal berharga saat tinggal bersama keluarga Jerman (Gastfamilie)."}
          </p>
        </div>
      </section>

      {/* 2. Tujuan & Nilai Plus */}
      <section className="py-20 bg-white border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 border border-amber-100">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Mengapa Cooking Class Sangat Penting?</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Bekal Mandiri Sebelum Berangkat ke Jerman
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {cc.introText ||
                "Tinggal di negara baru dengan kebiasaan kuliner yang berbeda membutuhkan adaptasi. Melalui Cooking Class, siswa ILD Medan telah terbiasa menggunakan peralatan dapur Eropa, mengenal bahan makanan setempat, dan memasak menu sehari-hari."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {cc.points && cc.points.length > 0 ? (
              cc.points.map((v, i) => (
                <div
                  key={v.id || i}
                  className="rounded-3xl border border-amber-100 bg-amber-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-amber-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 mb-4">
                    <UtensilsCrossed className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {v.desc}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="rounded-3xl border border-amber-100 bg-amber-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-amber-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 mb-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Adaptasi Gastfamilie</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Peserta Au Pair dapat memasakkan hidangan lezat bagi keluarga asuh (Gastfamilie)
                    dan anak-anak mereka dengan penuh percaya diri.
                  </p>
                </div>
                <div className="rounded-3xl border border-amber-100 bg-amber-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-amber-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Kemandirian & Hemat</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Siswa Ausbildung dapat mengatur pengeluaran bulanan secara hemat dan bergizi
                    dengan memasak makanan sendiri di apartemen mereka.
                  </p>
                </div>
                <div className="rounded-3xl border border-amber-100 bg-amber-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-amber-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Kerja Sama & Interaksi</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Sesi memasak bersama melatih komunikasi bahasa Jerman dalam konteks nyata dan
                    mempererat rasa kekeluargaan antar siswa.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Galeri Foto Cooking Class */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>Dokumentasi Praktik</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
              Momen Sesi Memasak & Kebersamaan
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
                className="group relative overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm cursor-pointer transition-all hover:shadow-2xl hover:border-amber-300 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.caption || "Cooking Class"}
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
              Tertarik Mengikuti Program Au Pair atau Ausbildung ke Jerman?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Dapatkan bimbingan bahasa Jerman Goethe-Zertifikat dan pembekalan keterampilan hidup
              lengkap di Ich Liebe Deutsch Medan.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Hubungi Kami via WhatsApp</span>
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
