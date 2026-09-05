import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cpu,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  HelpCircle,
  Landmark,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Users2,
  UtensilsCrossed,
  Wrench,
  Clock,
  Calendar,
} from "lucide-react";
import { useState } from "react";

import { HeroSlider } from "@/components/hero-slider";
import { PhotoLightbox, type LightboxPhoto } from "@/components/ui/photo-lightbox";
import { useCms } from "@/lib/cms-store";

const programAupair = "/assets/program-aupair.jpg";
const programAusbildung = "/assets/program-ausbildung.jpg";
const programFsj = "/assets/program-fsj.jpg";
const galleryCity = "/assets/gallery-city.jpg";
const galleryClass = "/assets/gallery-class.jpg";
const galleryCooking = "/assets/gallery-cooking.jpg";
const galleryGathering = "/assets/gallery-gathering.jpg";
const galleryGraduation = "/assets/gallery-graduation.jpg";
const galleryStudy = "/assets/gallery-study.jpg";
const blogAupair = "/assets/blog-aupair.jpg";
const blogAusbildung = "/assets/blog-ausbildung.jpg";
const blogFsj = "/assets/blog-fsj.jpg";
const blogKarir = "/assets/blog-karir.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICH LIEBE DEUTSCH MEDAN — Program Ausbildung, Au Pair, FSJ & Kuliah di Jerman" },
      {
        name: "description",
        content:
          "ICH LIEBE DEUTSCH MEDAN — Lembaga kursus bahasa Jerman terpadu di Medan. Bimbingan resmi program Ausbildung, Au Pair, FSJ/BFD, G to G, dan Kuliah ke Jerman.",
      },
      { property: "og:title", content: "ICH LIEBE DEUTSCH MEDAN — German Pathway" },
      {
        property: "og:description",
        content:
          "Deutsch lernen. Deutschland verstehen. Zukunft gestalten. Persiapan bahasa & pendampingan resmi ke Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const AUSBILDUNG_MAJORS = [
  {
    icon: Stethoscope,
    label: "Perawat / Pflege",
    desc: "Gaji tertinggi & peluang karir luas di RS Jerman",
  },
  {
    icon: UtensilsCrossed,
    label: "Gastronomi & Perhotelan",
    desc: "Chef, Restoran, dan Manajemen Hotel",
  },
  {
    icon: Wrench,
    label: "Teknik & Industri",
    desc: "Teknik mesin, mekatronika, & manufaktur Jerman",
  },
  {
    icon: Cpu,
    label: "Teknologi Informasi (IT)",
    desc: "Software developer, network & sistem informasi",
  },
  { icon: Car, label: "Mekanik Otomotif", desc: "Pelatihan mekanik standar otomotif Eropa" },
  {
    icon: Building2,
    label: "Bisnis & Administrasi",
    desc: "Manajemen perkantoran & logistik modern",
  },
  { icon: Briefcase, label: "Laboratorium & Sains", desc: "Analis kimia, bioteknologi & farmasi" },
  {
    icon: Users2,
    label: "Pendidikan & Anak (Erzieher)",
    desc: "Pendidik & pendamping tumbuh kembang anak",
  },
];

const PROGRAMS = [
  {
    icon: Briefcase,
    title: "1. Ausbildung",
    tagline: "Sekolah Kejuruan + Praktik Kerja di Jerman",
    badge: "Gaji Rp 18jt - 25jt / bulan",
    image: programAusbildung,
    duration: "2–3,5 Tahun",
    href: "/program-ausbildung",
    desc: "Sistem pendidikan dan pelatihan kejuruan di Jerman yang menggabungkan belajar teori di sekolah kejuruan (Berufsschule) dengan praktik kerja bergaji di perusahaan Jerman.",
    benefits: [
      "Gaji pelatihan resmi dari perusahaan Jerman setiap bulan",
      "Bebas biaya pendidikan sekolah kejuruan (Berufsschule)",
      "Sertifikat keahlian berstandar IHK/HWK yang diakui di seluruh Eropa",
      "Peluang langsung menjadi pekerja profesional tetap di Jerman",
    ],
    syarat: [
      "Usia 18 – 32 Tahun saat mendaftar",
      "Lulusan minimal SMA / SMK / Sederajat",
      "Sertifikat bahasa Jerman minimal level B1",
    ],
  },
  {
    icon: GraduationCap,
    title: "2. Au Pair",
    tagline: "Tinggal Bersama Host Family & Pertukaran Budaya",
    badge: "Uang Saku ~€300 + Kamar & Makan Gratis",
    image: programAupair,
    duration: "12 Bulan (1 Tahun)",
    href: "/program-aupair",
    desc: "Program pertukaran budaya resmi di mana pemuda-pemudi Indonesia tinggal bersama keluarga asuh di Jerman (Host Family) sambil membantu pengasuhan anak dan mengasah bahasa Jerman harian.",
    benefits: [
      "Tempat tinggal (kamar pribadi) & makan gratis disediakan Host Family",
      "Mendapat uang saku bulanan (Taschengeld) & asuransi kesehatan",
      "Subsidi kursus bahasa Jerman dari Host Family",
      "Batu loncatan ideal sebelum melanjutkan ke jenjang Ausbildung atau Kuliah",
    ],
    syarat: [
      "Usia 18 – 26 Tahun",
      "Kemampuan bahasa Jerman minimal level A1 / A2",
      "Menyukai anak-anak dan siap beradaptasi dengan keluarga Jerman",
    ],
  },
  {
    icon: HeartPulse,
    title: "3. FSJ / BFD",
    tagline: "Tahun Sukarelawan Sosial di Fasilitas Kesehatan",
    badge: "Uang Saku + Pengalaman Medis Nyata",
    image: programFsj,
    duration: "12 Bulan (1 Tahun)",
    href: "/program-fsj",
    desc: "Freiwilliges Soziales Jahr & Bundesfreiwilligendienst — Program relawan sosial resmi di rumah sakit, panti lansia (Altenheim), atau fasilitas penyandang disabilitas di Jerman.",
    benefits: [
      "Mendapatkan uang saku bulanan, akomodasi, dan asuransi penuh",
      "Pengalaman kerja nyata di sistem kesehatan dan sosial Jerman",
      "Bimbingan resmi dan sertifikat relawan berstandar pemerintah Jerman",
      "Jalur paling strategis dan diutamakan untuk Ausbildung Keperawatan (Pflege)",
    ],
    syarat: [
      "FSJ: Usia maksimal 26 Tahun | BFD: Tidak ada batas usia",
      "Kemampuan bahasa Jerman minimal level A1 (disarankan A2)",
      "Memiliki jiwa sosial dan minat di bidang pelayanan kemanusiaan",
    ],
  },
  {
    icon: Landmark,
    title: "4. G to G (Government to Government)",
    tagline: "Penempatan Resmi Tenaga Kesehatan Antarpemerintah",
    badge: "Perawat Profesional (D3/S1/Ners)",
    image: galleryCity,
    duration: "Kontrak Kerja Profesional",
    href: "/persyaratan",
    desc: "Program penempatan kerja resmi antarpemerintah Indonesia (BP2MI) dan pemerintah Jerman (BA/GIZ) khusus bagi perawat Indonesia untuk bekerja di rumah sakit ternama Jerman.",
    benefits: [
      "Perlindungan hukum penuh dari kedua negara",
      "Gaji standar perawat profesional Jerman (mulai €2.800+/bulan)",
      "Proses rekognisi ijazah keperawatan terstruktur",
    ],
    syarat: [
      "Lulusan D3 / S1 Keperawatan + Profesi Ners",
      "STR aktif dan pengalaman kerja klinis",
      "Sertifikat bahasa Jerman level B1/B2",
    ],
  },
  {
    icon: BookOpen,
    title: "5. Kuliah / Studium",
    tagline: "Pendidikan Tinggi di Universitas Negeri Jerman",
    badge: "Bebas Uang Kuliah (Tuition-Free)",
    image: galleryClass,
    duration: "S1 (3 Tahun) / S2 (2 Tahun)",
    href: "/persyaratan",
    desc: "Melanjutkan studi jenjang Sarjana (Bachelor) atau Magister (Master) di universitas negeri Jerman dengan mutu akademik kelas dunia yang diakui secara global.",
    benefits: [
      "Bebas biaya perkuliahan (0 tuition fee) di universitas negeri Jerman",
      "Gelar internasional terkemuka dan kesempatan riset modern",
      "Izin kerja part-time hingga 140 hari per tahun untuk mahasiswa",
    ],
    syarat: [
      "Ijazah pendidikan sebelumnya (SMA/S1) yang diakui anabin/Uni-Assist",
      "Sertifikat bahasa Jerman level B2/C1 atau TestDaF",
      "Persiapan Studienkolleg (jika diperlukan untuk lulusan SMA kurikulum nasional)",
    ],
  },
];

const FAQS = [
  {
    q: "Apakah harus bisa bahasa Jerman sebelum mendaftar di ILD Medan?",
    a: "Tidak harus! Kami membuka kelas dari tingkat paling dasar (Level A1 untuk pemula total) hingga level B1/B2 dengan metode intensif komunikatif yang dirancang khusus agar Anda siap menghadapi ujian Goethe-Zertifikat dan wawancara Jerman.",
  },
  {
    q: "Berapa lama waktu persiapan hingga bisa berangkat ke Jerman?",
    a: "Rata-rata waktu persiapan berkisar antara 6 hingga 10 bulan tergantung program yang Anda pilih. Waktu ini mencakup kursus bahasa Jerman (A1 hingga B1), pengurusan dokumen, pencarian kontrak/mitra di Jerman, hingga pengajuan visa di Kedutaan Besar Jerman Jakarta.",
  },
  {
    q: "Apakah program Ausbildung di Jerman benar-benar digaji?",
    a: "Ya, 100% benar! Peserta Ausbildung menerima gaji pelatihan resmi (Ausbildungsvergütung) dari perusahaan tempat mereka praktik sejak bulan pertama, berkisar antara €900 hingga €1.400+ per bulan (sekitar Rp 16 juta – Rp 25 juta/bulan).",
  },
  {
    q: "Mengapa harus memilih Ich Liebe Deutsch Medan?",
    a: "ILD Medan didirikan oleh alumni pendidikan bahasa Jerman UNIMED yang telah tinggal di Jerman selama 6 tahun dan menyelesaikan Ausbildung dengan predikat memuaskan. Kami tidak hanya mengajarkan tata bahasa, tetapi juga membekali Anda dengan Cooking Class kuliner Jerman, Gathering pembinaan mental, dan simulasi kehidupan nyata di Eropa.",
  },
  {
    q: "Apakah ada batasan usia untuk mengikuti program ke Jerman?",
    a: "Untuk Au Pair dan FSJ, batas usia maksimal adalah 26 tahun. Untuk Ausbildung, usia maksimal umumnya 30-32 tahun. Sedangkan untuk program BFD dan Kuliah S2/Master, tidak ada batasan usia yang ketat.",
  },
];

export function Index() {
  const { cms } = useCms();
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.`;

  // Gallery Photos for Lightbox
  const galleryItems: LightboxPhoto[] = [
    {
      src: galleryClass,
      caption: "Kelas bahasa Jerman intensif level A1-B1 di ILD Medan",
      category: "Belajar & Kelas",
      title: "Suasana Belajar Intensif",
    },
    {
      src: galleryCooking,
      caption: "Cooking class memasak menu khas Jerman persiapan hidup mandiri",
      category: "Cooking Class",
      title: "Pelatihan Kuliner Jerman",
    },
    {
      src: galleryStudy,
      caption: "Simulasi wawancara kerja & latihan ujian Goethe-Zertifikat",
      category: "Persiapan Ujian",
      title: "Simulasi Wawancara",
    },
    {
      src: galleryGraduation,
      caption: "Pelepasan siswa yang telah lulus visa dan siap terbang ke Jerman",
      category: "Pelepasan Siswa",
      title: "Wisuda & Pelepasan",
    },
    {
      src: galleryCity,
      caption: "Dokumentasi peserta ILD Medan yang telah tiba dan aktif di Jerman",
      category: "Kehidupan di Jerman",
      title: "Tiba di Jerman",
    },
    {
      src: galleryGathering,
      caption: "Gathering bulanan, pembinaan mental, & sharing session alumni",
      category: "Gathering",
      title: "Gathering & Komunitas",
    },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamic Blog posts from CMS or fallback
  const blogPosts =
    cms.blog?.posts && cms.blog.posts.length > 0
      ? cms.blog.posts.slice(0, 4)
      : [
          {
            id: "post-1",
            slug: "hidup-setahun-bersama-gastfamily-di-jerman",
            title: "Pengalaman Hidup Bersama Gastfamily di Jerman",
            category: "Au Pair",
            date: "15 Mei 2024",
            image: blogAupair,
            author: "Alumni Au Pair ILD",
            readTime: "4 mnt baca",
            summary:
              "Tips adaptasi budaya, komunikasi harian dengan anak asuh, dan eksplorasi akhir pekan di kota-kota Eropa.",
          },
          {
            id: "post-2",
            slug: "kenapa-ausbildung-gastronomie-banyak-diminati",
            title: "Mengapa Ausbildung Banyak Diminati Generasi Muda?",
            category: "Ausbildung",
            date: "28 April 2024",
            image: blogAusbildung,
            author: "Instruktur ILD",
            readTime: "5 mnt baca",
            summary:
              "Sekolah kejuruan dual dengan gaji pelatihan dari perusahaan sejak hari pertama di Jerman.",
          },
          {
            id: "post-3",
            slug: "fsj-langkah-awal-karier-keperawatan-di-jerman",
            title: "FSJ: Pintu Masuk Emas Pengalaman Medis di Jerman",
            category: "FSJ",
            date: "10 April 2024",
            image: blogFsj,
            author: "Tim Konsultan",
            readTime: "6 mnt baca",
            summary:
              "Memahami sistem pelayanan sosial Jerman dan persiapan transisi menuju karier keperawatan profesional.",
          },
          {
            id: "post-4",
            slug: "peluang-kerja-setelah-program-selesai",
            title: "Peluang Kerja dan Izin Tinggal Tetap di Jerman",
            category: "Karier & Visa",
            date: "02 Maret 2024",
            image: blogKarir,
            author: "Legal Consultant",
            readTime: "5 mnt baca",
            summary:
              "Panduan transisi dari visa pelatihan dan pendidikan menuju kontrak kerja profesional tetap di Jerman.",
          },
        ];

  return (
    <main className="bg-slate-50/50">
      {/* 1. Dynamic Hero Slider with rich interactive controls */}
      <HeroSlider />

      {/* 2. Trust Credentials & Key Stats Bar */}
      <section className="relative z-20 -mt-8 sm:-mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-3xl bg-white p-4 sm:p-6 shadow-xl border border-sky-100 backdrop-blur-md">
          <div className="flex items-center gap-3.5 p-2 sm:p-3">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-none">100%</p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1">
                Legalitas Resmi & Berizin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:p-3">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-none">
                6+ Thn
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1">
                Founder Alumni Jerman
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:p-3">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-none">
                A1 – B2
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1">
                Standar Goethe-Institut
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:p-3">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-none">
                3 Pilar
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1">
                Bahasa, Kuliner & Mental
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tentang Kami & Founder Profile */}
      <section id="tentang" className="scroll-mt-24 py-20 bg-white mt-12 sm:mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-200">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                <span>Tentang Kami</span>
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight leading-tight sm:text-4xl">
                Lembaga Kursus Bahasa Jerman Terdaftar & Berizin Resmi
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                <strong>Ich Liebe Deutsch Medan</strong> merupakan lembaga kursus bahasa Jerman yang
                berdiri sejak tahun 2024 dan telah terdaftar serta memiliki izin operasional resmi.
                Kehadirannya berawal dari komitmen tulus untuk membimbing generasi muda Indonesia
                dari Medan dan Sumatera Utara agar memiliki keterampilan bahasa yang kuat, mental
                yang tangguh, serta kesiapan budaya sebelum menginjakkan kaki di Jerman.
              </p>

              <div className="mt-6 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5 text-xs font-bold text-sky-900 mb-2">
                  <Target className="h-4 w-4 text-sky-600" />
                  <span>Filosofi Pembelajaran Komprehensif</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Bagi kami, belajar bahasa Jerman bukan sekadar menghafalkan rumus tata bahasa.
                  Kemampuan bahasa adalah instrumen vital untuk beradaptasi, bergaul, belajar
                  mandiri, dan bekerja secara profesional di tengah masyarakat Jerman yang
                  mengutamakan ketepatan dan disiplin.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to="/tentang-kami"
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <span>Baca Selengkapnya Tentang Profil & Legalitas Kami</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {/* Founder Spotlight Card */}
              <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-sky-200">
                <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-3">
                  <BadgeCheck className="h-5 w-5 text-sky-600" />
                  <span>Didirikan Oleh Praktisi & Alumni Ausbildung Jerman</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-3">
                  Ich Liebe Deutsch Medan didirikan oleh seorang{" "}
                  <strong>
                    Sarjana Pendidikan Bahasa Jerman Universitas Negeri Medan (UNIMED)
                  </strong>{" "}
                  yang memiliki pengalaman langsung tinggal dan menjalani kehidupan di Jerman selama
                  kurang lebih <strong>6 tahun</strong>.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  Selama berada di Jerman, pendiri berhasil menyelesaikan program Ausbildung pada
                  tahun 2020 dengan hasil yang sangat memuaskan. Pengalaman nyata tersebut kini
                  menjadi fondasi utama dalam kurikulum pembelajaran kami.
                </p>
              </div>

              {/* Special Training Card */}
              <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-sky-200">
                <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-3">
                  <Briefcase className="h-5 w-5 text-sky-600" />
                  <span>Pelatihan Khusus Bagi Kandidat Pemegang Ausbildungsvertrag</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  Khusus bagi kandidat yang telah memperoleh kontrak kerja (Ausbildungsvertrag),
                  kami memberikan pembekalan terminologi spesifik sesuai bidang profesi (medis,
                  teknik, gastronomi, dll) sehingga siswa sudah percaya diri berbicara istilah kerja
                  sejak hari pertama di Jerman.
                </p>
              </div>

              {/* Quote / Mission Banner */}
              <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-600 to-sky-700 p-6 sm:p-7 text-white shadow-lg shadow-sky-600/10">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-200">
                  Komitmen & Visi Kami
                </p>
                <p className="text-sm sm:text-base font-semibold mt-1.5 leading-relaxed">
                  “Keberhasilan di Jerman bukan hanya diukur dari visa yang terbit, melainkan dari
                  kesiapan mental, kelancaran bahasa, dan kemandirian hidup sehari-hari.”
                </p>
                <p className="text-xs text-sky-100 mt-2 font-medium">
                  — Ich Liebe Deutsch Medan: Partner Resmi Menuju Masa Depan di Jerman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Program Unggulan Section */}
      <section id="program" className="scroll-mt-24 py-20 bg-slate-50 border-y border-sky-100/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
              <BookOpen className="h-3.5 w-3.5 text-sky-600" />
              <span>Program Resmi & Terarah</span>
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              5 Pilihan Program Menuju Jerman
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Pilih jalur yang sesuai dengan latar belakang pendidikan, minat profesi, dan tujuan
              karier Anda di Jerman.
            </p>
          </div>

          <div className="space-y-8">
            {PROGRAMS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition-all hover:border-sky-300 hover:shadow-xl group"
                >
                  <div className="grid lg:grid-cols-12">
                    <div className="relative h-64 lg:h-auto lg:col-span-4 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                      <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                        <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-sky-700 shadow-md">
                          {p.duration}
                        </span>
                        {p.badge && (
                          <span className="rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-md">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 lg:col-span-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wide text-sky-600">
                            {p.tagline}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{p.title}</h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                          {p.desc}
                        </p>

                        <div className="mt-6 grid sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              <span>Keuntungan Program:</span>
                            </h4>
                            <ul className="space-y-2">
                              {p.benefits.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-2 text-xs text-slate-600"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
                              <Target className="h-3.5 w-3.5 text-sky-500" />
                              <span>Persyaratan Utama:</span>
                            </h4>
                            <ul className="space-y-2">
                              {p.syarat.map((s) => (
                                <li
                                  key={s}
                                  className="flex items-start gap-2 text-xs text-slate-600"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <Link
                          to={p.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
                        >
                          <span>Pelajari Rincian Program & Langkah Pendaftaran</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-600/20 transition-all hover:bg-sky-500 hover:scale-105"
                        >
                          <span>Konsultasi Jalur Ini</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 8 Bidang Jurusan Ausbildung */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-100">
              <Briefcase className="h-3.5 w-3.5 text-sky-600" />
              <span>Peluang Karier Vokasi</span>
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              8 Jurusan Ausbildung Terpopuler
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Ausbildung di Jerman mencakup ratusan jenis profesi terakreditasi dengan gaji resmi
              sejak hari pertama.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUSBILDUNG_MAJORS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="flex flex-col justify-between rounded-2xl border border-sky-100 bg-sky-50/40 p-5 transition-all hover:bg-white hover:shadow-lg hover:border-sky-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md shadow-sky-600/20 mb-3.5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{m.label}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-sky-100/60 flex items-center justify-between text-[11px] font-semibold text-sky-600">
                    <span>Gaji €900 - €1.400/bln</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Tiga Pilar Pembekalan Siswa (Belajar, Cooking Class, Gathering) */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 border border-white/10 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Metode Holistik ILD Medan</span>
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              3 Pilar Kesiapan Siswa Menuju Jerman
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Kami tidak hanya membimbing bahasa, tetapi juga mempersiapkan keterampilan hidup
              mandiri dan ketahanan mental budaya.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Pilar 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between transition-all hover:bg-white/10 hover:border-sky-400/50">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/30 mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">1. Bahasa Jerman Intensif</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Kelas level A1 hingga B1/B2 berstandar Goethe-Zertifikat dengan penekanan pada
                  komunikasi aktif, tata bahasa, dan simulasi ujian.
                </p>
              </div>
              <Link
                to="/kegiatan-belajar"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
              >
                <span>Lihat Kegiatan Belajar</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pilar 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between transition-all hover:bg-white/10 hover:border-amber-400/50">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 mb-4">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">2. Cooking Class Budaya</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pembekalan memasak menu Eropa & Jerman untuk melatih kemandirian peserta Au Pair
                  dan Ausbildung saat tinggal di luar negeri.
                </p>
              </div>
              <Link
                to="/cooking-class"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Lihat Cooking Class</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pilar 3 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between transition-all hover:bg-white/10 hover:border-emerald-400/50">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 mb-4">
                  <Users2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">3. Gathering & Sharing Alumni</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pertemuan silaturahmi berkala, sesi tanya jawab bersama alumni yang telah di
                  Jerman, dan penguatan mental kekeluargaan.
                </p>
              </div>
              <Link
                to="/gathering"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>Lihat Gathering Siswa</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Galeri Interaktif dengan Lightbox Viewer */}
      <section id="galeri" className="scroll-mt-24 py-20 bg-slate-50 border-t border-sky-100/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
                <span>Dokumentasi Foto</span>
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Momen Siswa & Pelepasan ke Jerman
              </h2>
            </div>
            <Link
              to="/foto"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              <span>Buka Semua Galeri Foto</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((g, idx) => (
              <figure
                key={idx}
                onClick={() => {
                  setPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm cursor-pointer transition-all hover:shadow-xl hover:border-sky-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <span className="inline-block w-fit rounded-full bg-sky-500/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white mb-1.5">
                      {g.category}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                      {g.caption}
                    </p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Artikel & Edukasi Terbaru (Dynamic from CMS) */}
      <section id="blog" className="scroll-mt-24 py-20 bg-white border-t border-sky-100/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
                <span>Edukasi & Wawasan</span>
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Artikel Seputar Kehidupan di Jerman
              </h2>
            </div>
            <Link
              to="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              <span>Lihat Semua Artikel</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Link
                key={post.id || post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <Calendar className="h-3 w-3 text-sky-600" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:text-sky-700">
                    <span>Baca Artikel</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Accordion Section */}
      <section className="py-20 bg-slate-50 border-t border-sky-100/80">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
              <HelpCircle className="h-3.5 w-3.5 text-sky-600" />
              <span>Tanya Jawab</span>
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Informasi praktis seputar persyaratan, bahasa, dan proses bimbingan ke Jerman.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-sky-100 bg-white transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-sky-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-sky-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. High-Impact CTA Banner */}
      <section className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-16 sm:py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md mb-3">
              Mulai Konsultasi Gratis
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Siap Mewujudkan Impian Berkarier & Belajar di Jerman?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sky-100 leading-relaxed">
              Tim konsultan dan pengajar Ich Liebe Deutsch Medan siap membimbing Anda dari nol
              hingga tiba di Jerman.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-sky-700 shadow-xl shadow-sky-950/20 transition-all hover:scale-105 hover:bg-sky-50 active:scale-95"
            >
              <span>Chat WhatsApp Admin</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/kontak"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 backdrop-blur-md px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-white/20 hover:border-white"
            >
              <span>Formulir Konsultasi</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery Photos */}
      <PhotoLightbox
        photos={galleryItems}
        currentIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(idx) => setPhotoIndex(idx)}
      />
    </main>
  );
}
