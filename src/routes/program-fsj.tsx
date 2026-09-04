import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  HeartPulse,
  Plane,
  Sparkles,
  Clock,
  Euro,
  Users2,
  Stethoscope,
} from "lucide-react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const programFsj = "/assets/program-fsj.jpg";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/program-fsj")({
  head: () => ({
    meta: [
      { title: "Program FSJ / BFD di Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "FSJ & BFD di Jerman: Program relawan sosial di fasilitas medis & rumah sakit Jerman. Uang saku bulanan, akomodasi, asuransi, dan batu loncatan Ausbildung Keperawatan.",
      },
      { property: "og:title", content: "Program FSJ / BFD — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Tahun relawan sosial di Jerman bersama Ich Liebe Deutsch Medan. Pengalaman medis internasional berharga.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramFsj,
});

export function ProgramFsj() {
  const { cms } = useCms();
  const fsj = cms.fsj;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20tertarik%20dengan%20program%20FSJ%20ke%20Jerman.`;

  const timelineSteps = [
    {
      step: "01",
      title: "Konsultasi & Kursus A1 / A2",
      desc: "Belajar bahasa Jerman intensif dan pembekalan terminologi medis/sosial dasar.",
    },
    {
      step: "02",
      title: "Pemberkasan & Wawancara Träger",
      desc: "Penyusunan berkas lamaran dan interview bersama yayasan penyelenggara sosial (Träger) di Jerman.",
    },
    {
      step: "03",
      title: "Kontrak Resmi & Asuransi",
      desc: "Penandatanganan FSJ-Vertrag resmi dan penyiapan jaminan akomodasi tempat tinggal di Jerman.",
    },
    {
      step: "04",
      title: "Pengajuan Visa & Penempatan",
      desc: "Pengajuan visa di Kedubes Jerman Jakarta dan penjemputan di bandara kota tujuan di Jerman.",
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
            <HeartPulse className="h-3.5 w-3.5" />
            <span>{fsj.heroBadge || "Program Relawan Sosial & Medis Jerman"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {fsj.heroTitle || "Program FSJ / BFD di Jerman"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {fsj.heroSubtitle ||
              "Freiwilliges Soziales Jahr & Bundesfreiwilligendienst — Pengalaman relawan sosial di fasilitas kesehatan Jerman dengan uang saku bulanan, akomodasi, dan pendampingan resmi."}
          </p>

          {/* Quick Facts */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Euro className="h-3.5 w-3.5 text-amber-400" />
              <span>Uang Saku: ~€400 – €500 / bln</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Durasi: 12 – 18 Bulan</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Stethoscope className="h-3.5 w-3.5 text-sky-400" />
              <span>Jalur: Menuju Ausbildung Medis</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gambaran & Penempatan */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Gambaran Program
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Apa itu FSJ / BFD?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {fsj.description ||
                  "FSJ (Freiwilliges Soziales Jahr) dan BFD (Bundesfreiwilligendienst) adalah program kerja sukarelawan berbadan hukum resmi di Jerman. Peserta berkontribusi dalam pelayanan kemanusiaan di rumah sakit (Krankenhaus), panti rawat lansia (Seniorenheim), atau institusi sosial sembari mengasah keterampilan bahasa dan mendapatkan sertifikat penghargaan dari pemerintah Jerman."}
              </p>

              <div className="mt-6 space-y-3">
                {(
                  fsj.placements || [
                    {
                      title: "Rumah Sakit & Klinik (Krankenhaus)",
                      desc: "Membantu tenaga perawat dalam pelayanan pasien dan pengenalan peralatan medis modern.",
                    },
                    {
                      title: "Panti Perawatan Lansia (Altenheim/Seniorenheim)",
                      desc: "Mendampingi aktivitas harian para lansia dengan pendekatan penuh empati dan kasih sayang.",
                    },
                    {
                      title: "Fasilitas Disabilitas & Rehabilitasi",
                      desc: "Mendampingi individu berkebutuhan khusus dalam kegiatan integrasi sosial dan terapi.",
                    },
                    {
                      title: "Batu Loncatan Ausbildung Perawat",
                      desc: "Alumni FSJ memiliki prioritas tertinggi untuk diterima langsung pada program Ausbildung Perawat bergaji tinggi.",
                    },
                  ]
                ).map((p, i) => {
                  const title = typeof p === "string" ? p : p.title;
                  const desc = typeof p === "string" ? null : p.desc;
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
                  src={programFsj}
                  alt="Peserta FSJ di Jerman"
                  className="w-full h-auto object-cover max-h-[460px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Persyaratan & Tahapan */}
      <section className="py-20 bg-slate-50 border-y border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Kualifikasi
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Persyaratan Calon FSJ / BFD
              </h2>
              <ul className="mt-6 space-y-3.5">
                {(
                  fsj.requirements || [
                    "FSJ: Usia 18 – 26 Tahun | BFD: Tidak ada batasan usia maksimal",
                    "Lulusan minimal SMA / SMK / Sederajat (terbuka untuk semua jurusan)",
                    "Memiliki sertifikat bahasa Jerman minimal level A1 (sangat disarankan A2)",
                    "Memiliki empati, kesabaran, dan minat tinggi di bidang pelayanan sosial / kesehatan",
                    "Sehat jasmani & bebas dari penyakit menular",
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
                Tahapan Bimbingan FSJ
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
              Tertarik Mengikuti Program FSJ / BFD ke Jerman?
            </h2>
            <p className="mt-2 text-sm text-sky-100 max-w-xl">
              Konsultasikan minat pelayanan Anda dan dapatkan pendampingan lengkap dari tim Ich
              Liebe Deutsch Medan.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-sky-700 shadow-xl transition-all hover:bg-sky-50 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi FSJ via WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
