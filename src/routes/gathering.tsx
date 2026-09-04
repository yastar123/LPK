import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Users2, Sparkles, HeartHandshake, ShieldAlert, Trophy } from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const galleryGathering = "/assets/gallery-gathering.jpg";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/gathering")({
  head: () => ({
    meta: [
      { title: "Gathering & Pembinaan Mental — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Gathering rutin Ich Liebe Deutsch Medan: membangun kekeluargaan, penguatan mental juang, dan sharing session bersama alumni yang telah berada di Jerman.",
      },
      { property: "og:title", content: "Gathering Siswa & Alumni — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Pembinaan mental, motivasi dan komunitas pembelajar bahasa Jerman yang saling menguatkan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gathering,
});

export function Gathering() {
  const { cms } = useCms();
  const gth = cms.gathering;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20tertarik%20konsultasi%20program%20ke%20Jerman.`;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const defaultPhotos: LightboxPhoto[] = [
    {
      id: "gth-1",
      src: galleryGathering,
      title: "Gathering & Sharing Session",
      caption:
        "Pertemuan silaturahmi akbar siswa dan orang tua bersama tim pengajar dan konsultan ILD Medan.",
      category: "Gathering Siswa",
    },
  ];

  const photos: LightboxPhoto[] =
    gth.photos && gth.photos.length > 0
      ? gth.photos.map((p, i) => ({
          id: p.id || `gth-photo-${i}`,
          src: p.src,
          alt: p.alt || p.caption,
          title: p.caption || "Dokumentasi Gathering",
          caption: p.caption,
          category: "Gathering Siswa",
        }))
      : defaultPhotos;

  return (
    <main className="bg-slate-50/50">
      {/* 1. Hero Header */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white border-b border-emerald-900/40">
        <img
          src={heroBrandenburg}
          alt="Gerbang Brandenburg di Berlin, Jerman"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative mx-auto flex min-h-[40vh] sm:min-h-[46vh] max-w-7xl flex-col justify-center px-6 py-20 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md mb-4 w-fit">
            <Users2 className="h-3.5 w-3.5" />
            <span>{gth.heroBadge || "Pilar 3: Pembinaan Mental & Komunitas"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {gth.heroTitle || "Gathering & Pembinaan Mental"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {gth.heroSubtitle ||
              "Menjalani kehidupan dan pelatihan kerja di Jerman membutuhkan kesiapan psikologis yang matang. Kami rutin mengadakan gathering dan pembinaan mental agar para siswa tangguh menghadapi segala tantangan di Eropa."}
          </p>
        </div>
      </section>

      {/* 2. Mengapa Pembinaan Mental Penting */}
      <section className="py-20 bg-white border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Kesiapan Holistik</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Membentuk Karakter Mandiri & Berdaya Juang
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {gth.introText ||
                "Gathering berkala mempertemukan calon peserta, orang tua, alumni, dan tim pengajar ILD Medan untuk saling bertukar pengalaman nyata, mengatasi culture shock, dan membangun jaringan persahabatan yang solid sebelum berangkat."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {gth.values && gth.values.length > 0 ? (
              gth.values.map((v, i) => (
                <div
                  key={v.id || i}
                  className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-emerald-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 mb-4">
                    <Users2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {v.desc}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-emerald-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 mb-4">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Networking & Dukungan Teman</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Mengenal rekan seperjuangan yang akan berangkat ke Jerman sehingga tidak merasa
                    sendirian dan memiliki jejaring bantuan ketika tiba di sana.
                  </p>
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-emerald-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 mb-4">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Antisipasi Culture Shock</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Pemahaman mendalam seputar etika kerja Jerman, ketepatan waktu (Pünktlichkeit),
                    dan cara berkomunikasi langsung (Direktheit).
                  </p>
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-7 transition-all hover:bg-white hover:shadow-xl hover:border-emerald-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 mb-4">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Sharing Session Alumni</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    Mendengarkan langsung kiat sukses, pengalaman hidup, dan tips praktis dari
                    alumni ILD Medan yang saat ini aktif di Jerman.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Galeri Foto Gathering */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Users2 className="h-3.5 w-3.5" />
              <span>Dokumentasi Kebersamaan</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
              Momen Gathering & Kehangatan Komunitas
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
                className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm cursor-pointer transition-all hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.caption || "Gathering"}
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
              Bergabunglah Bersama Keluarga Besar Ich Liebe Deutsch Medan
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Jadilah bagian dari komunitas pembelajar bahasa Jerman yang saling menguatkan dan
              meraih masa depan cerah di Jerman.
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
