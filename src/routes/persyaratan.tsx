import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  HeartPulse,
  HomeIcon,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/persyaratan")({
  head: () => ({
    meta: [
      { title: "Persyaratan Resmi Program ke Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Kriteria dan persyaratan resmi program Ausbildung, Au Pair, FSJ / BFD, G to G Keperawatan, dan Kuliah di Jerman. Panduan dokumen lengkap bersama ILD Medan.",
      },
      { property: "og:title", content: "Persyaratan Program — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Persyaratan resmi program Ausbildung, Au Pair, FSJ/BFD, G to G, dan Kuliah ke Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Persyaratan,
});

export function Persyaratan() {
  const { cms } = useCms();
  const ps = cms.persyaratan;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "081265965231").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20kelayakan%20persyaratan%20program%20ke%20Jerman.`;

  const [activeFilter, setActiveFilter] = useState("Semua");

  const generalDocuments = [
    {
      title: "KTP & Kartu Keluarga (KK)",
      desc: "Identitas kependudukan resmi WNI yang masih berlaku.",
    },
    { title: "Akta Kelahiran", desc: "Dokumen asli dan terjemahan tersumpah bahasa Jerman." },
    {
      title: "Ijazah & Transkrip Nilai",
      desc: "SMA / SMK / D3 / S1 dengan legalisir sekolah atau kampus.",
    },
    { title: "Paspor RI Aktif", desc: "Masa berlaku paspor minimal 12–18 bulan ke depan." },
    {
      title: "Sertifikat Bahasa Goethe",
      desc: "Sertifikat resmi Goethe-Zertifikat level A1 / A2 / B1 / B2.",
    },
    {
      title: "Curriculum Vitae (Lebenslauf)",
      desc: "Format standar tabel Eropa (Europass) dalam bahasa Jerman.",
    },
  ];

  const items = ps.items || [];
  const filteredItems =
    activeFilter === "Semua"
      ? items
      : items.filter(
          (item) =>
            item.title?.toLowerCase().includes(activeFilter.toLowerCase()) ||
            item.tag?.toLowerCase().includes(activeFilter.toLowerCase()),
        );

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
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{ps.heroBadge || "Panduan Standar & Kriteria Resmi"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {ps.heroTitle || "Persyaratan Program ke Jerman"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {ps.heroSubtitle ||
              "Setiap program memiliki batasan usia, kualifikasi ijazah, dan standar kemampuan sertifikat bahasa Jerman yang spesifik. Pastikan Anda memenuhi persyaratannya bersama bimbingan kami."}
          </p>
        </div>
      </section>

      {/* 2. Program Qualifications Section */}
      <section className="py-20 bg-white border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-100">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Kualifikasi Khusus</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Persyaratan Tiap Program
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Pilih program yang sesuai dengan latar belakang usia, pendidikan, dan cita-cita masa
              depan Anda.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {["Semua", "Ausbildung", "Au Pair", "FSJ", "G to G", "Studium"].map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            {filteredItems.map((prog, idx) => {
              const icons = [Briefcase, HomeIcon, HeartPulse, Landmark, GraduationCap];
              const IconComponent = icons[idx % icons.length];
              return (
                <div
                  key={prog.id || idx}
                  className="rounded-3xl border border-sky-100 bg-linear-to-r from-white via-sky-50/20 to-white p-6 sm:p-8 shadow-xs transition-all hover:shadow-lg hover:border-sky-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/20 shrink-0">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          {prog.title}
                        </h3>
                        {prog.tag && (
                          <span className="inline-block mt-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
                            {prog.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ul className="grid sm:grid-cols-2 gap-3.5">
                    {prog.syarat &&
                      prog.syarat.map((item, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-3 rounded-2xl border border-sky-100/70 bg-white p-3.5 text-xs sm:text-sm text-slate-700 shadow-xs"
                        >
                          <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Dokumen Umum yang Diperlukan */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
              <FileCheck className="h-3.5 w-3.5" />
              <span>Dokumen Administratif</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Checklist Berkas Pokok
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Berkas-berkas standar yang disiapkan untuk proses legalisasi, penterjemah tersumpah,
              dan pengajuan visa di Kedutaan Jerman.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {generalDocuments.map((doc, i) => (
              <div
                key={i}
                className="rounded-3xl border border-sky-100 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:border-sky-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 mb-3">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{doc.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="border-t border-sky-100 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-16 sm:py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Belum Yakin Program Mana yang Cocok dengan Kualifikasi Anda?
            </h2>
            <p className="mt-2 text-sm text-sky-100 max-w-xl">
              Konsultasikan latar belakang pendidikan dan usia Anda kepada konsultan kami untuk
              rekomendasi program terbaik secara gratis.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-sky-700 shadow-xl transition-all hover:bg-sky-50 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi Kelayakan Sekarang</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
