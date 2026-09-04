import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Heart,
  Home,
  MessageSquare,
  Plane,
  Sparkles,
  Utensils,
  Wallet,
  Clock,
  Euro,
  Users2,
  GraduationCap,
} from "lucide-react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const programAupair = "/assets/program-aupair.jpg";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/program-aupair")({
  head: () => ({
    meta: [
      { title: "Program Au Pair di Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Program Au Pair ke Jerman: Tinggal bersama Host Family, kamar pribadi & makan gratis, uang saku bulanan, subsidi kursus bahasa, dan batu loncatan Ausbildung.",
      },
      { property: "og:title", content: "Program Au Pair — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Wujudkan pengalaman hidup di Jerman sebagai Au Pair bersama Ich Liebe Deutsch Medan. Bimbingan bahasa level A1-A2 dan pencarian Host Family aman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramAupair,
});

export function ProgramAupair() {
  const { cms } = useCms();
  const aup = cms.aupair;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20tertarik%20dengan%20program%20Aupair%20ke%20Jerman.`;

  const timelineSteps = [
    {
      step: "01",
      title: "Pendaftaran & Kursus A1 / A2",
      desc: "Belajar bahasa Jerman intensif dan mengikuti Cooking Class untuk pembekalan kemandirian hidup.",
    },
    {
      step: "02",
      title: "Pembuatan Profil & Wawancara",
      desc: "Menyusun biodata Au Pair (Dear Host Family Letter) dan wawancara online via video call dengan keluarga asuh.",
    },
    {
      step: "03",
      title: "Penandatanganan Kontrak",
      desc: "Penerbitan kontrak resmi Au Pair (Au-Pair-Vertrag) dan polis asuransi dari Host Family di Jerman.",
    },
    {
      step: "04",
      title: "Pengajuan Visa & Berangkat",
      desc: "Wawancara visa di Kedubes Jerman Jakarta, tiket pesawat, dan penyambutan langsung oleh Host Family.",
    },
  ];

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

        <div className="relative mx-auto flex min-h-[46vh] sm:min-h-[52vh] max-w-7xl flex-col justify-center px-6 py-20 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md mb-4 w-fit">
            <Heart className="h-3.5 w-3.5" />
            <span>{aup.heroBadge || "Program Pertukaran Budaya & Bahasa"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {aup.heroTitle || "Program Au Pair di Jerman"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {aup.heroSubtitle ||
              "Tinggal bersama keluarga asuh Jerman (Host Family), perdalam kemampuan bahasa Jerman secara alami, nikmati kamar pribadi & makan gratis, serta dapatkan uang saku bulanan."}
          </p>

          {/* Quick Facts */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Euro className="h-3.5 w-3.5 text-amber-400" />
              <span>Uang Saku: ~€300 / bln</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Durasi: 12 Bulan (1 Tahun)</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Users2 className="h-3.5 w-3.5 text-sky-400" />
              <span>Usia: 18 – 26 Tahun</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gambaran & Keuntungan */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Gambaran Program
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Apa itu Program Au Pair?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {aup.description ||
                  "Au Pair adalah program pertukaran budaya resmi yang diakui pemerintah Jerman. Peserta tinggal bersama keluarga Jerman sebagai anggota keluarga, membantu tugas pengasuhan anak ringan, serta memiliki kesempatan emas memperdalam bahasa Jerman dan menjelajahi negara-negara Eropa."}
              </p>

              <div className="mt-6 space-y-3">
                {(
                  aup.benefits || [
                    {
                      title: "Kamar Pribadi & Makan Gratis",
                      desc: "Akomodasi kamar pribadi dan makan sehari-hari sepenuhnya ditanggung oleh Host Family.",
                    },
                    {
                      title: "Uang Saku Bulanan (Taschengeld)",
                      desc: "Menerima uang saku bulanan minimal €280 – €350 per bulan untuk kebutuhan pribadi.",
                    },
                    {
                      title: "Asuransi & Subsidi Kursus",
                      desc: "Host Family wajib menyediakan asuransi kesehatan lengkap dan memberikan subsidi biaya kursus bahasa Jerman.",
                    },
                    {
                      title: "Batu Loncatan Ideal",
                      desc: "Sangat strategis sebagai langkah awal mencari kontrak Ausbildung atau mendaftar kuliah di Jerman setelah selesai 1 tahun.",
                    },
                  ]
                ).map((b, i) => {
                  const title = typeof b === "string" ? b : b.title;
                  const desc = typeof b === "string" ? null : b.desc;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4 transition-colors hover:bg-sky-50"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                        <span>{title}</span>
                      </h4>
                      {desc && <p className="text-xs text-slate-600 mt-1 pl-6">{desc}</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-sky-100 shadow-2xl">
                <img
                  src={programAupair}
                  alt="Peserta Au Pair di Jerman"
                  className="w-full h-auto object-cover max-h-[460px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Persyaratan & Timeline */}
      <section className="py-20 bg-slate-50 border-y border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Kualifikasi
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Persyaratan Calon Au Pair
              </h2>
              <ul className="mt-6 space-y-3.5">
                {(
                  aup.requirements || [
                    "Usia 18 – 26 Tahun saat pengajuan visa",
                    "Lulusan minimal SMA / SMK / Sederajat",
                    "Memiliki sertifikat bahasa Jerman minimal Goethe-Zertifikat Level A1 (disarankan A2)",
                    "Menyukai anak-anak dan memiliki kesabaran serta kemampuan adaptasi yang baik",
                    "Belum menikah dan belum memiliki anak",
                    "Sehat jasmani dan rohani",
                  ]
                ).map((req, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-white p-4 text-xs sm:text-sm text-slate-800 shadow-xs"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Alur & Langkah
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Tahapan Menuju Au Pair
              </h2>
              <div className="mt-6 space-y-3.5">
                {timelineSteps.map((s) => (
                  <div
                    key={s.step}
                    className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-4 shadow-xs"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white font-mono text-xs font-bold">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="border-t border-sky-100 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-16 sm:py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ingin Merasakan Pengalaman Hidup di Jerman Lewat Au Pair?
            </h2>
            <p className="mt-2 text-sm text-sky-100 max-w-xl">
              Kami bimbing persiapan bahasa Jerman dari dasar dan fasilitasi pencarian Host Family
              yang aman dan terpercaya.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-sky-700 shadow-xl transition-all hover:bg-sky-50 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi Au Pair via WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
