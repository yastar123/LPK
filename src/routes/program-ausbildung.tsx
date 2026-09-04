import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Cpu,
  CreditCard,
  GraduationCap,
  Plane,
  Sparkles,
  Stethoscope,
  Users2,
  UtensilsCrossed,
  Wrench,
  Clock,
  Euro,
  FileCheck,
  Send,
} from "lucide-react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const programAusbildung = "/assets/program-ausbildung.jpg";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/program-ausbildung")({
  head: () => ({
    meta: [
      { title: "Program Ausbildung ke Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Program Ausbildung di Jerman: Sekolah kejuruan dual sistem + praktik kerja bergaji resmi €900 - €1.400/bulan di perusahaan Jerman. Bimbingan lengkap di Medan.",
      },
      { property: "og:title", content: "Program Ausbildung — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Sekolah kejuruan dual sistem + praktik kerja bergaji di Jerman. Bimbingan bahasa Jerman Goethe dan persiapan kontrak kerja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramAusbildung,
});

export function ProgramAusbildung() {
  const { cms } = useCms();
  const aus = cms.ausbildung;
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20tertarik%20dengan%20program%20Ausbildung%20ke%20Jerman.`;

  const timelineSteps = [
    {
      step: "01",
      title: "Konsultasi & Pendaftaran",
      desc: "Penentuan minat bidang profesi dan placement test kemampuan bahasa Jerman awal di ILD Medan.",
    },
    {
      step: "02",
      title: "Kursus Intensif A1 – B1",
      desc: "Bimbingan bahasa Jerman berstandar CEFR Goethe-Institut, Cooking Class, dan simulasi wawancara kerja.",
    },
    {
      step: "03",
      title: "Ujian Sertifikat Goethe",
      desc: "Mengikuti ujian resmi Goethe-Zertifikat level B1 (atau B2 untuk perawat) di pusat ujian terakreditasi.",
    },
    {
      step: "04",
      title: "Pencarian Kontrak & Wawancara",
      desc: "Pembuatan dokumen lamaran berstandar Jerman (Lebenslauf, Anschreiben) dan interview langsung dengan perusahaan mitra.",
    },
    {
      step: "05",
      title: "Pengajuan Visa & Keberangkatan",
      desc: "Pengurusan visa Ausbildung di Kedutaan Besar Jerman Jakarta, tiket penerbangan, dan pendampingan setibanya di Jerman.",
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
            <Briefcase className="h-3.5 w-3.5" />
            <span>{aus.heroBadge || "Pendidikan Vokasi Dual Sistem Jerman"}</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {aus.heroTitle || "Program Ausbildung di Jerman"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {aus.heroSubtitle ||
              "Sistem pendidikan vokasi resmi di Jerman: perpaduan sekolah teori kejuruan (Berufsschule) dengan praktik kerja bergaji resmi €900 - €1.400/bulan di perusahaan Jerman."}
          </p>

          {/* Quick Facts Chips */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Euro className="h-3.5 w-3.5 text-amber-400" />
              <span>Gaji: €900 – €1.400 / bln</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Durasi: 2 – 3,5 Tahun</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/10 text-sky-300">
              <GraduationCap className="h-3.5 w-3.5 text-sky-400" />
              <span>Bahasa: Sertifikat B1 / B2</span>
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
                Apa itu Program Ausbildung?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {aus.description ||
                  "Ausbildung adalah sistem pendidikan vokasi dual Jerman yang diakui secara global. Selama 2 hingga 3,5 tahun, peserta membagi waktu antara belajar teori di sekolah kejuruan (Berufsschule) dan bekerja langsung di perusahaan Jerman untuk mendapatkan keterampilan nyata."}
              </p>

              <div className="mt-6 space-y-3">
                {(
                  aus.benefits || [
                    "Mendapatkan gaji bulanan resmi (Ausbildungsvergütung) sejak bulan pertama",
                    "Bebas biaya pendidikan sekolah kejuruan di Jerman (100% Gratis)",
                    "Memperoleh sertifikat keahlian resmi Jerman (IHK / HWK) yang diakui di seluruh dunia",
                    "Peluang emas langsung diangkat menjadi karyawan tetap profesional di Jerman",
                    "Mendapatkan asuransi kesehatan, jaminan pensiun, dan cuti tahunan resmi",
                  ]
                ).map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/50 p-3.5 transition-colors hover:bg-sky-50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-sky-100 shadow-2xl">
                <img
                  src={programAusbildung}
                  alt="Peserta Ausbildung di Jerman"
                  className="w-full h-auto object-cover max-h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Gaji Bulanan Terjamin
                    </p>
                    <p className="text-sm sm:text-base font-bold mt-0.5">
                      Rata-rata penghasilan peserta Rp 16 juta – Rp 25 juta/bulan selama masa
                      pendidikan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bidang Kejuruan / Fields */}
      <section className="py-20 bg-slate-50 border-y border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Bidang Populer</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Pilihan Bidang Ausbildung di Jerman
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Terdapat ratusan spesialisasi kejuruan terakreditasi yang dapat Anda pilih sesuai
              dengan minat dan latar belakang pendidikan.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(
              aus.fields || [
                {
                  title: "Keperawatan & Kesehatan (Pflegefachkraft)",
                  desc: "Merawat pasien di rumah sakit atau klinik modern dengan jenjang karier dan gaji tertinggi.",
                },
                {
                  title: "Gastronomi & Perhotelan (Hotelfachmann/Koch)",
                  desc: "Koki profesional, manajemen restoran, dan operasional perhotelan berbintang di Eropa.",
                },
                {
                  title: "Teknik Mekanik & Mekatronika",
                  desc: "Industri manufaktur mesin, otomasi pabrik, dan teknologi rekayasa presisi Jerman.",
                },
                {
                  title: "Teknologi Informasi & Software",
                  desc: "Pengembangan perangkat lunak, administrasi jaringan, dan keamanan sistem komputer.",
                },
                {
                  title: "Mekanik Otomotif (Kfz-Mechatroniker)",
                  desc: "Perawatan dan perbaikan sistem kendaraan standar industri otomotif kelas dunia.",
                },
                {
                  title: "Manajemen Bisnis & Logistik",
                  desc: "Administrasi perkantoran modern, supply chain, dan manajemen gudang internasional.",
                },
                {
                  title: "Laboratorium & Farmasi",
                  desc: "Pengujian kimiawi, bioteknologi klinis, dan industri obat-obatan terkemuka Jerman.",
                },
                {
                  title: "Pendidikan Anak Usia Dini (Erzieher)",
                  desc: "Pendidik dan pendamping tumbuh kembang anak di taman kanak-kanak (Kita) Jerman.",
                },
              ]
            ).map((f, i) => (
              <div
                key={f.title || i}
                className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-sky-300 hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 mb-3">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline Tahapan Pendaftaran */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-100">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Alur Proses</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Tahapan Menuju Ausbildung di Jerman
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {timelineSteps.map((s) => (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-3xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:bg-white hover:shadow-lg hover:border-sky-300"
              >
                <div>
                  <span className="inline-block text-2xl font-black text-sky-600 mb-2 font-mono">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="border-t border-sky-100 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-16 sm:py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Siap Memulai Persiapan Ausbildung Bersama Kami?
            </h2>
            <p className="mt-2 text-sm text-sky-100 max-w-xl">
              Konsultasikan jurusan Ausbildung yang tepat dan ikuti kelas bahasa Jerman intensif
              bersama pengajar berpengalaman di Medan.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-sky-700 shadow-xl transition-all hover:bg-sky-50 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi Ausbildung via WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
