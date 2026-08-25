import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Plane,
  Star,
  Users,
} from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import programAusbildung from "@/assets/program-ausbildung.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import galleryStudy from "@/assets/gallery-study.jpg";
import galleryCity from "@/assets/gallery-city.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20Ausbildung%20ke%20Jerman.";

export const Route = createFileRoute("/program-ausbildung")({
  head: () => ({
    meta: [
      { title: "Program Ausbildung — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Ausbildung: pendidikan dan pelatihan kejuruan di Jerman selama 2–3,5 tahun dengan banyak pilihan jurusan — perawat, gastronomi, teknik, IT, dan lainnya.",
      },
      {
        property: "og:title",
        content: "Program Ausbildung — Ich Liebe Deutsch Medan",
      },
      {
        property: "og:description",
        content:
          "Sekolah kejuruan + praktik di perusahaan = Ausbildung. Pelajari jurusan, persyaratan, dan prosedurnya bersama Ich Liebe Deutsch Medan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramAusbildung,
});

const FIELDS = [
  { title: "Perawat / Pflege", desc: "Perawatan dan pendampingan pasien di fasilitas kesehatan." },
  { title: "Gastronomi & Perhotelan", desc: "Koki, layanan restoran, dan operasional hotel." },
  { title: "Teknik", desc: "Bidang teknik dan keterampilan teknis industri." },
  { title: "IT", desc: "Teknologi informasi dan pengembangan perangkat lunak." },
  { title: "Mekanik Kendaraan", desc: "Perawatan dan perbaikan kendaraan bermotor." },
  { title: "Administrasi & Bisnis", desc: "Administrasi perkantoran dan manajemen bisnis." },
  { title: "Laboratorium", desc: "Analisis dan kerja laboratorium." },
  { title: "Pendidikan/Pendampingan Anak", desc: "Pendidikan dan pendampingan anak-anak." },
];

const PROCEDURES = [
  {
    icon: CalendarDays,
    title: "Kursus 6 Bulan",
    desc: "Kursus bahasa Jerman dilaksanakan selama 6 bulan dengan jadwal yang terstruktur.",
  },
  {
    icon: BookOpen,
    title: "Ujian Goethe Institut Jakarta",
    desc: "Setelah kursus, peserta mengikuti ujian B1 di Goethe Institut Jakarta.",
  },
  {
    icon: Plane,
    title: "Biaya Sendiri",
    desc: "Tiket penerbangan ke Jerman, biaya ujian, dan biaya visa ditanggung masing-masing kandidat.",
  },
];

const REQUIREMENTS = [
  "Maksimal 32 tahun saat mendaftar les",
  "Lulusan SMA/sederajat",
  "Belajar bahasa Jerman sampai level minimal B1 (level menyesuaikan jurusan yang dipilih)",
];

const GALLERY = [
  { src: galleryClass, alt: "Kelas bahasa Jerman Ich Liebe Deutsch Medan" },
  { src: galleryStudy, alt: "Peserta belajar bahasa Jerman" },
  { src: galleryCity, alt: "Suasana kota di Jerman" },
  { src: galleryGraduation, alt: "Wisuda dan kelulusan peserta" },
];

const FEES = [
  { item: "Pendaftaran", amount: "Rp. 200,000" },
  { item: "Buku", amount: "Rp. 650,000" },
  {
    item: "Kursus bahasa Jerman level B-1 (10 bulan, 12 jam/minggu)",
    amount: "Rp. 1,500,000/bulan",
  },
  { item: "Biaya Ujian dan pengajuan Visa", amount: "Dibayar langsung di Kedubes Jerman" },
];

const INSTALLMENTS = [
  "Rp. 2,000,000 saat Mendaftar Agency",
  "Rp. 2,000,000 setelah Turun Kontrak",
  "Rp. 2,000,000 setelah Turun Visa",
];

function ProgramAusbildung() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroBrandenburg}
          alt="Gerbang Brandenburg di Berlin, Jerman"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative mx-auto flex min-h-[42vh] flex-col justify-center px-6 py-24 md:min-h-[48vh]">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-surface/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-surface">
            Program
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Program Ausbildung
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Sekolah sambil bekerja selama 3 tahun di Jerman — sekolah gratis, praktek kerja, dan
            gaji dari perusahaan.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Program Ausbildung
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Sekolah kejuruan sambil bekerja di Jerman
              </h2>
              <p className="mt-5 font-display text-xl text-muted-foreground">
                Ich Liebe Deutsch Medan
              </p>
            </div>
            <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Ausbildung adalah sistem pendidikan dan pelatihan kejuruan di Jerman yang
                menggabungkan belajar teori dengan praktik kerja. Sederhananya: sekolah kejuruan +
                praktik di perusahaan = Ausbildung. Lama Ausbildung umumnya sekitar 2–3,5 tahun,
                tergantung bidang dan programnya.
              </p>
              <p>
                Peserta belajar teori di sekolah kejuruan (Berufsschule), melakukan praktik di
                perusahaan, mendapatkan pengalaman kerja langsung, dan dalam banyak program
                mendapatkan gaji pelatihan dari perusahaan. Ausbildung bukan satu jenis sekolah atau
                satu pekerjaan, melainkan sistem pelatihan dengan banyak pilihan profesi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fields */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Jurusan Ausbildung
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Jurusan Ausbildung yang Tersedia
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Pilih jurusan yang sesuai dengan minat dan tujuan karier Anda di Jerman.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FIELDS.map((field) => (
              <article
                key={field.title}
                className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{field.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{field.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Prosedur
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Alur Program Ausbildung
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Ikuti langkah-langkah berikut untuk bergabung dalam program Ausbildung ke Jerman.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PROCEDURES.map((step, idx) => (
              <article
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
              >
                <span className="absolute right-6 top-6 font-display text-5xl text-muted/50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + image */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src={programAusbildung}
                alt="Ilustrasi program Ausbildung Ich Liebe Deutsch Medan"
                className="rounded-2xl object-cover shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Persyaratan
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Persyaratan Program Ausbildung Gastronomie
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Pastikan Anda memenuhi persyaratan berikut sebelum mendaftar program Ausbildung.
              </p>
              <ul className="mt-8 space-y-4">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Galeri
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Momen Program Ausbildung
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-muted-foreground">
              Lihat suasana kegiatan, belajar, dan pengalaman peserta program Ausbildung.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((img) => (
              <div
                key={img.alt}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-surface opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Biaya Program
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Rincian biaya Program Ausbildung
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Berikut estimasi biaya yang perlu dipersiapkan untuk mengikuti program Ausbildung.
                Biaya ujian dan pengajuan visa dapat dilihat di website Goethe Institute dan
                Kedutaan Besar Jerman di Jakarta.
              </p>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="grid grid-cols-2 gap-4 border-b border-border bg-muted/50 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>Keterangan</span>
                  <span className="text-right">Biaya</span>
                </div>
                <ul>
                  {FEES.map((fee) => (
                    <li
                      key={fee.item}
                      className="grid grid-cols-2 gap-4 border-b border-border px-6 py-4 last:border-b-0"
                    >
                      <span className="text-sm font-medium text-foreground">{fee.item}</span>
                      <span className="text-right text-sm text-muted-foreground">{fee.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="mb-4 text-sm font-semibold text-foreground">
                  Fee Pengurusan ke Jerman Rp. 6,000,000 dicicil 3 kali:
                </p>
                <ul className="space-y-3">
                  {INSTALLMENTS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
              Konsultasi sekarang juga!
            </h2>
            <p className="mt-3 max-w-[50ch] text-pretty text-muted-foreground">
              Tanyakan detail program Ausbildung, jadwal kursus, dan persyaratan lainnya kepada tim
              kami.
            </p>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Mulai Konsultasi <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Back to top */}
      <div className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Back To Top
          </button>
        </div>
      </div>
    </main>
  );
}
