import React, { createContext, useContext, useEffect, useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";
const programAusbildung = "/assets/program-ausbildung.jpg";
const programAupair = "/assets/program-aupair.jpg";
const programFsj = "/assets/program-fsj.jpg";
const galleryClass = "/assets/gallery-class.jpg";
const galleryStudy = "/assets/gallery-study.jpg";
const galleryCooking = "/assets/gallery-cooking.jpg";
const galleryGathering = "/assets/gallery-gathering.jpg";
const galleryCity = "/assets/gallery-city.jpg";
const galleryGraduation = "/assets/gallery-graduation.jpg";
const blogKarir = "/assets/blog-karir.jpg";
const blogAusbildung = "/assets/blog-ausbildung.jpg";
const blogAupair = "/assets/blog-aupair.jpg";
const blogFsj = "/assets/blog-fsj.jpg";

/* =========================================================================
   TYPE DEFINITIONS FOR ALL PUBLIC PAGES & MODULES
   ========================================================================= */

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavChild[];
}

export interface NavbarConfig {
  logoUrl: string;
  brandTitle: string;
  brandSubtitle: string;
  taglines: string[];
  navItems: NavItem[];
  ctaButton: {
    label: string;
    href: string;
    isExternal: boolean;
  };
}

export interface FooterConfig {
  brandDesc: string;
  badgeText: string;
  officeAddress: string;
  phone: string;
  whatsapp: string;
  email: string;
  operatingHours: string;
  newsletterTitle: string;
  newsletterDesc: string;
  copyrightText: string;
  domainText: string;
  portalLinkText: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subheading: string;
  description: string;
  button1: {
    label: string;
    href: string;
  };
  button2: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  program: string;
  city: string;
  year: string;
  quote: string;
  avatarUrl?: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  initials: string;
  almaMater: string;
  experience: string;
  photoUrl?: string;
  bio: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  date: string;
  author: string;
  img: string;
  content: string[];
}

export interface LegalDocumentItem {
  id: string;
  title: string;
  skNumber: string;
  issuer: string;
  date: string;
  status: "Resmi & Aktif" | "Terverifikasi" | "Tercatat";
  description: string;
}

export interface AusbildungFieldItem {
  id: string;
  title: string;
  germanTitle: string;
  duration: string;
  salaryRange: string;
  desc: string;
  prospect: string;
}

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: "Kelas" | "Cooking Class" | "Gathering" | "Pemberangkatan" | "Alumni";
  date: string;
  imgUrl: string;
  caption: string;
}

export interface VideoDocumentationItem {
  id: string;
  title: string;
  category: "Testimoni" | "Dokumentasi Kelas" | "Pelepasan Siswa" | "Tips Jerman";
  youtubeId: string;
  duration: string;
  desc: string;
}

export interface LearningClassItem {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "TestDaF";
  name: string;
  target: string;
  duration: string;
  schedule: string;
  curriculum: string[];
  isPopular?: boolean;
}

export interface OrgLevelItem {
  id: string;
  title: string;
  members: string[];
}

export interface ActivityCardItem {
  id: string;
  title: string;
  image: string;
  desc: string;
  to: string;
}

export interface CookingPointItem {
  id: string;
  title: string;
  desc: string;
}

export interface GatheringValueItem {
  id: string;
  title: string;
  desc: string;
}

export interface StepItem {
  id: string;
  step: number;
  title: string;
  desc: string;
}

export interface DocChecklistItem {
  id: string;
  name: string;
  note: string;
  required: boolean;
}

export interface ProgramRequirementItem {
  id: string;
  programName: string;
  tag: string;
  syarat: string[];
}

export interface SiteCmsData {
  navbar: NavbarConfig;
  footer: FooterConfig;
  home: {
    heroSlides: HeroSlide[];
    stats: StatItem[];
    features: FeatureItem[];
    testimonials: TestimonialItem[];
    ctaBanner: {
      badge: string;
      title: string;
      desc: string;
      primaryButtonText: string;
      primaryButtonHref: string;
      secondaryButtonText: string;
      secondaryButtonHref: string;
    };
  };
  tentangKami: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    storyParagraphs: string[];
    vision: string;
    mission: string[];
    values: { id: string; title: string; desc: string }[];
  };
  struktur: {
    heroBadge: string;
    title: string;
    subtitle: string;
    description: string;
    orgLevels: OrgLevelItem[];
  };
  legalitas: {
    heroBadge: string;
    title: string;
    subtitle: string;
    documents: LegalDocumentItem[];
  };
  programAusbildung: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    salaryBadge: string;
    durationBadge: string;
    fields: AusbildungFieldItem[];
    requirements: string[];
    steps: StepItem[];
  };
  programAupair: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    pocketMoneyBadge: string;
    ageLimitBadge: string;
    benefits: string[];
    requirements: string[];
    steps: StepItem[];
  };
  programFsj: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    allowanceBadge: string;
    scopeBadge: string;
    areas: string[];
    benefits: string[];
    requirements: string[];
    steps: StepItem[];
  };
  persyaratan: {
    heroBadge: string;
    title: string;
    subtitle: string;
    programs: ProgramRequirementItem[];
    docList: DocChecklistItem[];
    visaSteps: StepItem[];
  };
  team: {
    heroBadge: string;
    title: string;
    subtitle: string;
    members: TeamMemberItem[];
  };
  blog: {
    heroBadge: string;
    title: string;
    subtitle: string;
    posts: BlogPostItem[];
  };
  kegiatanBelajar: {
    heroBadge: string;
    title: string;
    subtitle: string;
    classes: LearningClassItem[];
  };
  kegiatanProgram: {
    heroBadge: string;
    title: string;
    subtitle: string;
    description: string;
    activities: ActivityCardItem[];
  };
  cookingClass: {
    heroBadge: string;
    title: string;
    subtitle: string;
    description: string;
    points: CookingPointItem[];
    photos: { id: string; src: string; alt: string; caption: string }[];
  };
  gathering: {
    heroBadge: string;
    title: string;
    subtitle: string;
    description: string;
    values: GatheringValueItem[];
    photos: { id: string; src: string; alt: string; caption: string }[];
  };
  foto: {
    heroBadge: string;
    title: string;
    subtitle: string;
    photos: GalleryPhotoItem[];
  };
  video: {
    heroBadge: string;
    title: string;
    subtitle: string;
    videos: VideoDocumentationItem[];
  };
  kontak: {
    heroBadge: string;
    title: string;
    subtitle: string;
    hotlineWA: string;
    phoneLandline: string;
    emailOffice: string;
    officeAddress: string;
    mapsEmbedUrl: string;
    operatingHoursText: string;
  };
}

/* =========================================================================
   DEFAULT CMS SEED DATA (POSTGRESQL SYNCHRONIZED)
   ========================================================= */

export const DEFAULT_CMS_DATA: SiteCmsData = {
  navbar: {
    logoUrl: "/logo.png",
    brandTitle: "Ich Liebe Deutsch",
    brandSubtitle: "Medan • German Pathway",
    taglines: [
      "Medan • German Pathway",
      "Ausbildung • Au Pair • FSJ",
      "Kursus Bahasa Jerman A1–B2",
      "Konsultasi Resmi Medan",
    ],
    navItems: [
      { id: "nav-home", label: "Home", href: "/" },
      {
        id: "nav-profil",
        label: "Profil",
        children: [
          { label: "Tentang Kami", href: "/tentang-kami" },
          { label: "Struktur Organisasi", href: "/struktur" },
          { label: "Legalitas Resmi", href: "/legalitas" },
          { label: "Team & Pengajar", href: "/team" },
        ],
      },
      {
        id: "nav-program",
        label: "Program",
        children: [
          { label: "Ausbildung Kejuruan", href: "/program-ausbildung" },
          { label: "Au Pair Gastfamilie", href: "/program-aupair" },
          { label: "FSJ / BFD Relawan", href: "/program-fsj" },
          { label: "Persyaratan Program", href: "/persyaratan" },
        ],
      },
      {
        id: "nav-layanan",
        label: "Layanan & Galeri",
        children: [
          { label: "Kegiatan Belajar", href: "/kegiatan-belajar" },
          { label: "Kegiatan Program", href: "/kegiatan-program" },
          { label: "Cooking Class", href: "/cooking-class" },
          { label: "Gathering Siswa", href: "/gathering" },
          { label: "Galeri Foto", href: "/foto" },
          { label: "Video Dokumentasi", href: "/video" },
        ],
      },
      { id: "nav-blog", label: "Blog", href: "/blog" },
      { id: "nav-kontak", label: "Kontak", href: "/kontak" },
    ],
    ctaButton: {
      label: "Konsultasi WA",
      href: "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.",
      isExternal: true,
    },
  },
  footer: {
    brandDesc:
      "Lembaga persiapan dan penyelenggara program Ausbildung, Au Pair, & FSJ ke Jerman terpercaya di Sumatera Utara.",
    badgeText: "Terakreditasi & Berbadan Hukum Resmi",
    officeAddress:
      "Komplek Waikiki, Jl. Flamboyan Raya No. 49 Blok F, Tj. Selamat, Kec. Medan Tuntungan, Kota Medan, Sumatera Utara 20135",
    phone: "0812-6596-5231",
    whatsapp: "0812-6596-5231",
    email: "indonesiagerman@gmail.com",
    operatingHours: "Senin - Sabtu: 08:30 - 17:30 WIB",
    newsletterTitle: "Buletin & Info Beasiswa",
    newsletterDesc: "Dapatkan pembaruan jadwal seleksi dan info beasiswa pelatihan bahasa Jerman.",
    copyrightText: "©2026 Ich Liebe Deutsch Medan. All rights reserved.",
    domainText: "www.germaneducation.or.id",
    portalLinkText: "Portal Masuk Siswa & Pengajar",
    socials: {
      instagram: "https://instagram.com/ichliebedeutsch_medan",
      facebook: "https://facebook.com/ichliebedeutsch",
      youtube: "https://youtube.com/@ichliebedeutsch",
      tiktok: "https://tiktok.com/@ichliebedeutschmedan",
    },
  },
  home: {
    heroSlides: [
      {
        id: "slide-ausbildung",
        image: programAusbildung,
        title: "Program Ausbildung",
        subheading: "PENDIDIKAN VOKASI & PELATIHAN KERJA DUAL DI JERMAN",
        description:
          "Sekolah kejuruan dual dengan gaji pelatihan dari perusahaan Jerman sejak hari pertama. Tersedia 8 bidang kejuruan unggulan.",
        button1: {
          label: "DETAIL AUSBILDUNG",
          href: "/program-ausbildung",
        },
        button2: {
          label: "DAFTAR SEKARANG",
          href: "https://wa.me/6281265965231",
          isExternal: true,
        },
      },
      {
        id: "slide-aupair-fsj",
        image: programAupair,
        title: "Program Au Pair & FSJ",
        subheading: "TINGGAL DI JERMAN, PERTUKARAN BUDAYA & RELAWAN SOSIAL",
        description:
          "Kesempatan tinggal bersama keluarga Jerman (Au Pair) atau program relawan resmi (FSJ/BFD) dengan uang saku bulanan dan akomodasi.",
        button1: {
          label: "PROGRAM AU PAIR",
          href: "/program-aupair",
        },
        button2: {
          label: "KONSULTASI GRATIS",
          href: "https://wa.me/6281265965231",
          isExternal: true,
        },
      },
      {
        id: "slide-kursus",
        image: galleryClass,
        title: "Kursus Bahasa Jerman",
        subheading: "PERSIAPAN GOETHE-ZERTIFIKAT LEVEL A1, A2, HINGGA B2",
        description:
          "Metode intensif komunikatif dibimbing langsung oleh instruktur berpengalaman lulusan Jerman dan UNIMED.",
        button1: {
          label: "INFO KELAS",
          href: "/kegiatan-belajar",
        },
        button2: {
          label: "HUBUNGI KAMI",
          href: "/kontak",
        },
      },
    ],
    stats: [
      { id: "stat-1", value: "500+", label: "Alumni Berangkat", sublabel: "Ke Jerman sejak 2018" },
      { id: "stat-2", value: "100%", label: "Legalitas Resmi", sublabel: "Kemenkumham & Disnaker" },
      {
        id: "stat-3",
        value: "8+",
        label: "Bidang Ausbildung",
        sublabel: "Gastronomie, Pflege, dll",
      },
      {
        id: "stat-4",
        value: "€950 - €1.400",
        label: "Gaji / Uang Saku",
        sublabel: "Per bulan selama program",
      },
    ],
    features: [
      {
        id: "feat-1",
        title: "Instruktur Berpengalaman",
        desc: "Dididik oleh pengajar bersertifikasi Goethe C1 dan alumni universitas ternama.",
        iconName: "GraduationCap",
      },
      {
        id: "feat-2",
        title: "Pendampingan Visa & Kontrak",
        desc: "Bimbingan penuh wawancara kedutaan Jerman, kontrak kerja, hingga pencarian tiket pesawat.",
        iconName: "ShieldCheck",
      },
      {
        id: "feat-3",
        title: "Jaringan Mitra di Jerman",
        desc: "Kerjasama langsung dengan rumah sakit, hotel, dan lembaga sosial terpercaya di Jerman.",
        iconName: "Building2",
      },
    ],
    testimonials: [
      {
        id: "testi-1",
        name: "Jessica Sinaga",
        program: "Ausbildung Hotelfachfrau",
        city: "Munich, Jerman",
        year: "Angkatan 2023",
        quote:
          "Ich Liebe Deutsch Medan sangat membantu dari nol bahasa Jerman hingga lolos wawancara kontrak kerja di hotel bintang 4 di Munich. Sangat direkomendasikan!",
      },
      {
        id: "testi-2",
        name: "Rian Pratama",
        program: "FSJ Pflegefachmann",
        city: "Frankfurt, Jerman",
        year: "Angkatan 2024",
        quote:
          "Bimbingan dokumen visa dan kelas B1 sangat intensif. Pengajar benar-benar peduli dengan kesiapan mental kami sebelum berangkat ke Jerman.",
      },
      {
        id: "testi-3",
        name: "Putri Anggraini",
        program: "Au Pair Gastfamilie",
        city: "Hamburg, Jerman",
        year: "Angkatan 2024",
        quote:
          "Proses matching dengan keluarga asuh di Jerman berjalan lancar dan aman didampingi tim ILD Medan sampai tiba di Hamburg.",
      },
    ],
    ctaBanner: {
      badge: "Wujudkan Impian Karier di Jerman",
      title: "Siap Memulai Langkah Menuju Jerman?",
      desc: "Konsultasikan minat dan jurusan yang Anda inginkan bersama tim konsultan profesional Ich Liebe Deutsch Medan secara gratis.",
      primaryButtonText: "Konsultasi WhatsApp Gratis",
      primaryButtonHref: "https://wa.me/6281265965231",
      secondaryButtonText: "Lihat Persyaratan Program",
      secondaryButtonHref: "/persyaratan",
    },
  },
  tentangKami: {
    heroBadge: "Profil Lembaga & Perjalanan Kami",
    heroTitle: "Tentang Ich Liebe Deutsch Medan",
    heroSubtitle:
      "Lembaga kursus bahasa Jerman berizin resmi yang hadir untuk mendidik, membimbing, dan mempersiapkan generasi muda Indonesia menghadapi kehidupan nyata di Jerman.",
    storyParagraphs: [
      "Ich Liebe Deutsch Medan berawal dari kepedulian mendalam terhadap banyaknya pemuda-pemudi di Medan dan Sumatera Utara yang berkeinginan melanjutkan studi, bekerja, maupun meniti karier di Jerman, namun terkendala oleh minimnya akses pembinaan bahasa Jerman yang berkualitas dan transparan.",
      "Didirikan oleh para alumni perguruan tinggi dan alumni program Jerman yang telah berpengalaman bertahun-tahun di Jerman, lembaga kami memadukan kurikulum standar Goethe-Institut dengan pembinaan mental, pemahaman etos kerja Jerman, serta pendampingan administrasi yang menyeluruh.",
      "Kami meyakini bahwa belajar bahasa Jerman bukan sekadar menghafal kosakata, melainkan membangun kepercayaan diri untuk beradaptasi, berkomunikasi secara profesional, dan berprestasi di tingkat internasional.",
    ],
    vision:
      "Menjadi lembaga pendidikan dan pelatihan bahasa Jerman terdepan dan terpercaya di Indonesia yang melahirkan generasi berdaya saing global, berintegritas tinggi, dan sukses di Jerman.",
    mission: [
      "Menyelenggarakan pembelajaran bahasa Jerman berstandar Goethe-Zertifikat A1 hingga B2 dengan metode interaktif.",
      "Membekali peserta dengan wawasan budaya (Interkulturelle Kompetenz), etika kerja, dan kesiapan mental hidup di Jerman.",
      "Memberikan pendampingan menyeluruh mulai dari pendaftaran, kontrak kerja, hingga pengajuan visa resmi ke Jerman.",
      "Menjalin kemitraan strategis dengan institusi pendidikan, rumah sakit, dan perusahaan terkemuka di Jerman.",
    ],
    values: [
      {
        id: "val-1",
        title: "Integritas & Transparansi",
        desc: "Menyajikan informasi program, biaya, dan tahapan secara jujur tanpa janji berlebihan.",
      },
      {
        id: "val-2",
        title: "Kualitas Pembelajaran",
        desc: "Instruktur bersertifikat resmi dengan rasio kelas kecil agar perhatian ke setiap siswa optimal.",
      },
      {
        id: "val-3",
        title: "Pendampingan Holistik",
        desc: "Tidak hanya bahasa, namun juga pembinaan karakter, cooking class, dan pembekalan budaya Jerman.",
      },
      {
        id: "val-4",
        title: "Koneksi Resmi",
        desc: "Bekerjasama langsung dengan institusi dan perusahaan terdaftar di Republik Federal Jerman.",
      },
    ],
  },
  struktur: {
    heroBadge: "Profil Perusahaan & Tata Kelola",
    title: "Struktur Organisasi",
    subtitle:
      "Susunan kepengurusan dan divisi profesional yang mengelola serta mendampingi peserta program ke Jerman.",
    description:
      "Struktur organisasi Ich Liebe Deutsch Medan dirancang untuk memastikan tata kelola lembaga yang akuntabel, transparan, dan berorientasi pada keberhasilan setiap peserta.",
    orgLevels: [
      {
        id: "lvl-1",
        title: "Pembina Yayasan",
        members: ["Ketua Pembina Yayasan", "Dewan Penasihat Akademik"],
      },
      {
        id: "lvl-2",
        title: "Pengurus Harian",
        members: ["Ketua Pengurus / Direktur Utama", "Sekretaris Eksekutif", "Bendahara Lembaga"],
      },
      {
        id: "lvl-3",
        title: "Divisi Operasional & Program",
        members: [
          "Kepala Divisi Ausbildung Kejuruan",
          "Kepala Divisi Au Pair Gastfamilie",
          "Kepala Divisi FSJ / BFD Keperawatan & Sosial",
        ],
      },
      {
        id: "lvl-4",
        title: "Tim Pengajar & Pendukung",
        members: [
          "Instruktur Bahasa Jerman (A1 - B2)",
          "Tim Legalitas, Dokumen & Pengurusan Visa",
          "Tim Konsultasi & Layanan Informasi",
        ],
      },
    ],
  },
  legalitas: {
    heroBadge: "Legalitas & Akreditasi Resmi",
    title: "Legalitas Resmi Lembaga",
    subtitle:
      "Ich Liebe Deutsch Medan beroperasi dengan legalitas lengkap dan terdaftar secara resmi di instansi pemerintah Republik Indonesia.",
    documents: [
      {
        id: "leg-1",
        title: "Pengesahan Badan Hukum Kemenkumham RI",
        skNumber: "AHU-0014298.AH.01.04.Tahun 2024",
        issuer: "Kementerian Hukum dan HAM Republik Indonesia",
        date: "2024",
        status: "Resmi & Aktif",
        description:
          "Akta pendirian dan pengesahan resmi sebagai badan hukum lembaga penyelenggara pendidikan dan pelatihan.",
      },
      {
        id: "leg-2",
        title: "Izin Operasional Lembaga Pelatihan Kerja (LPK)",
        skNumber: "563/128/DISNAKER-MDN/2024",
        issuer: "Dinas Ketenagakerjaan Kota Medan",
        date: "2024",
        status: "Resmi & Aktif",
        description:
          "Izin resmi penyelenggaraan pelatihan kerja kejuruan dan persiapan tenaga kerja ke luar negeri.",
      },
      {
        id: "leg-3",
        title: "Nomor Induk Berusaha (NIB)",
        skNumber: "1284000392817",
        issuer: "Kementerian Investasi / BKPM RI (OSS RBA)",
        date: "2024",
        status: "Terverifikasi",
        description:
          "Nomor Induk Berusaha berbasis risiko untuk aktivitas pendidikan bahasa dan pelatihan vokasi swasta.",
      },
      {
        id: "leg-4",
        title: "NPWP Badan Lembaga",
        skNumber: "61.849.203.4-122.000",
        issuer: "Direktorat Jenderal Pajak (KPP Pratama Medan)",
        date: "2024",
        status: "Tercatat",
        description:
          "Kepatuhan perpajakan nasional dan terdaftar sebagai wajib pajak badan yang taat azas.",
      },
    ],
  },
  programAusbildung: {
    heroBadge: "Vokasi & Pelatihan Kerja Jerman",
    heroTitle: "Program Ausbildung di Jerman",
    heroSubtitle:
      "Program sekolah kejuruan dual (Dual Ausbildung) di Jerman selama 3 tahun dengan gaji pelatihan bulanan, asuransi, dan jaminan karier profesional di Eropa.",
    salaryBadge: "Gaji: €950 – €1.400 / bln",
    durationBadge: "Durasi: 3 Tahun Resmi",
    requirements: [
      "Usia 18 – 32 tahun pada saat mendaftar",
      "Pendidikan minimal SMA / SMK / D3 / S1 semua jurusan",
      "Lulus ujian sertifikat bahasa Jerman minimal Goethe-Zertifikat B1",
      "Kondisi fisik sehat dan memiliki motivasi kuat untuk belajar dan bekerja di Jerman",
      "Lolos seleksi berkas dan wawancara dengan perwakilan institusi / perusahaan Jerman",
    ],
    fields: [
      {
        id: "field-1",
        title: "Ausbildung Gastronomie & Perhotelan",
        germanTitle: "Hotelfachmann / Hotelfachfrau / Koch",
        duration: "3 Tahun",
        salaryRange: "€950 - €1.200 / bln",
        desc: "Pendidikan kejuruan di hotel berbintang dan restoran Jerman meliputi tata boga kuliner, manajemen restoran, dan operasional perhotelan.",
        prospect:
          "Peluang kerja langsung sebagai Supervisor Hotel atau Chef dengan gaji €2.500+/bln.",
      },
      {
        id: "field-2",
        title: "Ausbildung Keperawatan & Kesehatan",
        germanTitle: "Pflegefachmann / Pflegefachfrau",
        duration: "3 Tahun",
        salaryRange: "€1.150 - €1.400 / bln",
        desc: "Pelatihan perawat profesional berstandar Uni Eropa di rumah sakit modern dan klinik terkemuka di seluruh negara bagian Jerman.",
        prospect:
          "Karier Perawat Terdaftar (Registered Nurse) di Jerman dengan gaji €3.000 - €3.800/bln.",
      },
      {
        id: "field-3",
        title: "Ausbildung Teknik Mekatronika & Otomotif",
        germanTitle: "Mechatroniker / Kfz-Mechatroniker",
        duration: "3.5 Tahun",
        salaryRange: "€1.000 - €1.300 / bln",
        desc: "Kombinasi teori dan praktik di industri permesinan, robotika manufaktur, dan teknologi otomotif Jerman.",
        prospect:
          "Teknisi spesialis industri Jerman dengan jenjang karier Meister berskala internasional.",
      },
      {
        id: "field-4",
        title: "Ausbildung Ritel & Manajemen Toko",
        germanTitle: "Kaufmann / Kauffrau im Einzelhandel",
        duration: "3 Tahun",
        salaryRange: "€950 - €1.150 / bln",
        desc: "Keahlian manajemen rantai pasok, customer relation, dan administrasi bisnis ritel modern di jaringan ritel Jerman.",
        prospect: "Kepala Cabang / Store Manager ritel multinasional di kawasan Eropa.",
      },
    ],
    steps: [
      {
        id: "step-1",
        step: 1,
        title: "Kursus Bahasa Jerman (A1 - B1)",
        desc: "Belajar intensif di kelas Ich Liebe Deutsch Medan selama 6-8 bulan hingga lulus ujian resmi Goethe-Zertifikat B1.",
      },
      {
        id: "step-2",
        step: 2,
        title: "Penyusunan Berkas (Bewerbung)",
        desc: "Pembuatan Anschreiben, Lebenslauf standar Jerman, penerjemahan tersumpah ijazah, dan legalisasi dokumen.",
      },
      {
        id: "step-3",
        step: 3,
        title: "Wawancara dengan Perusahaan Jerman",
        desc: "Simulasi wawancara intensif dan pendampingan saat interview online dengan calon pemberi kerja di Jerman.",
      },
      {
        id: "step-4",
        step: 4,
        title: "Penerbitan Kontrak & Pengurusan Visa",
        desc: "Penandatanganan kontrak Ausbildung resmi dan pengurusan visa nasional tipe D di Kedutaan Besar Jerman di Jakarta.",
      },
      {
        id: "step-5",
        step: 5,
        title: "Pemberangkatan & Orientasi di Jerman",
        desc: "Pendampingan tiket penerbangan, penjemputan mitra di bandara Jerman, pendaftaran domisili, dan pembukaan rekening bank.",
      },
    ],
  },
  programAupair: {
    heroBadge: "Pertukaran Budaya & Keluarga Asuh",
    heroTitle: "Program Au Pair di Jerman",
    heroSubtitle:
      "Tinggal bersama keluarga Jerman (Gastfamilie) selama 12 bulan untuk mendalami bahasa dan budaya Jerman secara langsung dengan uang saku bulanan, kamar pribadi, dan makan gratis.",
    pocketMoneyBadge: "Uang Saku: €280 / bln + Kursus",
    ageLimitBadge: "Batas Usia: 18 – 26 Tahun",
    benefits: [
      "Kamar tidur pribadi (Einzelzimmer) dan makan 3x sehari disediakan oleh Gastfamilie",
      "Uang saku bulanan sebesar minimal €280 (Taschengeld) bebas pajak",
      "Tunjangan subsidi kursus bahasa Jerman sebesar €50 / bulan dari keluarga asuh",
      "Asuransi kesehatan, kecelakaan, dan tanggung jawab hukum (Haftpflichtversicherung) ditanggung penuh",
      "Hari libur 1.5 hari per minggu dan 4 minggu libur bergaji per tahun",
      "Jembatan terbaik untuk melanjutkan ke program Ausbildung atau Kuliah di Jerman",
    ],
    requirements: [
      "Pria / Wanita berusia 18 hingga 26 tahun saat pendaftaran visa",
      "Lulusan minimal SMA / SMK sederajat",
      "Memiliki sertifikat bahasa Jerman minimal Goethe-Zertifikat A1 (disarankan A2)",
      "Menyukai anak-anak dan memiliki keterampilan dasar pekerjaan rumah tangga",
      "Belum menikah dan belum memiliki anak",
      "Berkepribadian ramah, bertanggung jawab, dan mudah beradaptasi",
    ],
    steps: [
      {
        id: "step-1",
        step: 1,
        title: "Belajar Bahasa Jerman Level A1/A2",
        desc: "Mengikuti kursus intensif dan lulus ujian Goethe-Zertifikat A1 di Medan.",
      },
      {
        id: "step-2",
        step: 2,
        title: "Pembuatan Profil & Matching Gastfamilie",
        desc: "Menyiapkan foto, video perkenalan, dan surat keluarga untuk dicocokkan dengan keluarga asuh di Jerman.",
      },
      {
        id: "step-3",
        step: 3,
        title: "Wawancara Video Call",
        desc: "Sesi kenalan langsung antara peserta dan calon keluarga asuh Jerman.",
      },
      {
        id: "step-4",
        step: 4,
        title: "Penandatanganan Kontrak Au Pair",
        desc: "Kontrak resmi disahkan oleh agensi Jerman dan dikirim untuk pengajuan visa.",
      },
      {
        id: "step-5",
        step: 5,
        title: "Pengurusan Visa & Keberangkatan",
        desc: "Proses wawancara visa di Kedubes Jerman Jakarta dan tiket penerbangan ke Jerman.",
      },
    ],
  },
  programFsj: {
    heroBadge: "Relawan Sosial & Medis Jerman",
    heroTitle: "Program FSJ / BFD Keperawatan di Jerman",
    heroSubtitle:
      "Freiwilliges Soziales Jahr (FSJ) dan Bundesfreiwilligendienst (BFD) adalah program relawan sosial resmi pemerintah Jerman di rumah sakit dan panti wreda selama 12-18 bulan.",
    allowanceBadge: "Uang Saku: €450 – €750 / bln",
    scopeBadge: "Durasi: 12 – 18 Bulan",
    areas: [
      "Rumah Sakit Umum & Klinik Khusus (Krankenhaus)",
      "Panti Wreda & Perawatan Lansia (Seniorenheim / Altenpflege)",
      "Pusat Rehabilitasi & Terapi Disabilitas (Behindertenhilfe)",
      "Lembaga Pelayanan Anak & Remaja (Kinder- und Jugendhilfe)",
    ],
    benefits: [
      "Uang saku bulanan (Taschengeld) berkisar antara €450 hingga €750 / bulan",
      "Akomodasi (tempat tinggal) dan uang makan (Verpflegung) disediakan atau diganti dalam bentuk subsidi",
      "Jaminan asuransi sosial dan kesehatan penuh dari lembaga penyalur Jerman",
      "Minimal 25 hari seminar pelatihan pengembangan diri dan bahasa Jerman selama program",
      "Surat rekomendasi resmi pemerintah Jerman untuk melamar Ausbildung Keperawatan / Medis",
    ],
    requirements: [
      "Usia 18 – 27 tahun (FSJ) atau tanpa batas usia atas untuk program BFD",
      "Pendidikan minimal SMA / SMK / D3 / S1 (latar belakang kesehatan diutamakan, namun terbuka untuk semua jurusan)",
      "Memiliki sertifikat bahasa Jerman minimal Goethe-Zertifikat B1",
      "Memiliki jiwa empati sosial yang tinggi, sabar, dan komunikatif",
      "Sehat jasmani dan rohani serta siap bekerja dalam tim medis multikultural",
    ],
    steps: [
      {
        id: "step-1",
        step: 1,
        title: "Kelas Bahasa Jerman Level B1",
        desc: "Persiapan bahasa Jerman intensif hingga meraih sertifikat B1.",
      },
      {
        id: "step-2",
        step: 2,
        title: "Aplikasi ke Lembaga Penyalur Jerman (Träger)",
        desc: "Pengiriman berkas lamaran ke Träger resmi seperti Caritas, Diakonie, atau Palang Merah Jerman (DRK).",
      },
      {
        id: "step-3",
        step: 3,
        title: "Wawancara & Kesepakatan Kontrak FSJ",
        desc: "Wawancara daring dengan pengelola panti/rumah sakit dan penerbitan kontrak Vereinbarung.",
      },
      {
        id: "step-4",
        step: 4,
        title: "Pengurusan Visa Relawan Sosial",
        desc: "Pengajuan visa FSJ di Kedubes Jerman Jakarta dengan jaminan akomodasi dan asuransi.",
      },
      {
        id: "step-5",
        step: 5,
        title: "Mulai Bertugas di Jerman",
        desc: "Tiba di Jerman, orientasi tempat tinggal, dan pembekalan sebelum mulai bertugas.",
      },
    ],
  },
  persyaratan: {
    heroBadge: "Panduan & Kriteria Pendaftaran",
    title: "Persyaratan Program ke Jerman",
    subtitle:
      "Kriteria resmi dan daftar dokumen yang wajib dipersiapkan untuk mengikuti program Ausbildung, Au Pair, dan FSJ.",
    programs: [
      {
        id: "req-ausbildung",
        programName: "Program Ausbildung",
        tag: "Kejuruan Dual (3 Tahun)",
        syarat: [
          "Usia maksimal 32 tahun saat pendaftaran",
          "Lulusan SMA / SMK / D3 / S1 sederajat",
          "Sertifikat bahasa Jerman Goethe-Zertifikat minimal level B1",
          "Surat motivasi (Motivationsschreiben) & CV (Lebenslauf) berbahasa Jerman",
          "Surat Keterangan Catatan Kepolisian (SKCK) yang masih berlaku",
        ],
      },
      {
        id: "req-aupair",
        programName: "Program Au Pair",
        tag: "Tinggal Bersama Keluarga Asuh (1 Tahun)",
        syarat: [
          "Usia 18 – 26 tahun saat pengajuan visa ke kedutaan",
          "Lulusan minimal SMA / sederajat",
          "Sertifikat bahasa Jerman Goethe-Zertifikat level minimal A1",
          "Belum menikah dan belum memiliki anak",
          "Pengalaman merawat anak / referensi penitipan anak (Babysitting)",
        ],
      },
      {
        id: "req-fsj",
        programName: "Program FSJ / BFD Keperawatan",
        tag: "Relawan Sosial & Medis (1–1.5 Tahun)",
        syarat: [
          "Usia 18 – 27 tahun (FSJ) atau usia terbuka (BFD)",
          "Lulusan minimal SMA / SMK (kesehatan/umum) / D3 / S1",
          "Sertifikat bahasa Jerman Goethe-Zertifikat level minimal B1",
          "Surat keterangan sehat dan catatan vaksinasi lengkap",
          "Memiliki minat mendalam di bidang pelayanan sosial dan kesehatan",
        ],
      },
    ],
    docList: [
      {
        id: "doc-1",
        name: "Paspor RI Elektronik / Reguler",
        note: "Masa berlaku minimal 18 bulan ke depan",
        required: true,
      },
      {
        id: "doc-2",
        name: "Ijazah & Transkrip Nilai Terakhir",
        note: "Diterjemahkan oleh penerjemah tersumpah bahasa Jerman",
        required: true,
      },
      {
        id: "doc-3",
        name: "Sertifikat Goethe-Zertifikat (A1/A2/B1)",
        note: "Diterbitkan resmi oleh Goethe-Institut",
        required: true,
      },
      {
        id: "doc-4",
        name: "Curriculum Vitae (Tabellarischer Lebenslauf)",
        note: "Format standar Jerman tanpa gap tahun kosong",
        required: true,
      },
      {
        id: "doc-5",
        name: "Surat Motivasi (Anschreiben)",
        note: "Menjelaskan alasan memilih jurusan dan Jerman",
        required: true,
      },
      {
        id: "doc-6",
        name: "Akta Kelahiran & Kartu Keluarga",
        note: "Diterjemahkan tersumpah ke bahasa Jerman",
        required: true,
      },
    ],
    visaSteps: [
      {
        id: "vstep-1",
        step: 1,
        title: "Pembuatan Janji Temu (Termin)",
        desc: "Pendaftaran antrean wawancara visa nasional di Kedutaan Besar Republik Federal Jerman di Jakarta.",
      },
      {
        id: "vstep-2",
        step: 2,
        title: "Pemeriksaan Kelengkapan Berkas",
        desc: "Pemeriksaan berlapis terhadap seluruh dokumen asli dan salinan formulir visa VIDEX oleh konsultan ILD Medan.",
      },
      {
        id: "vstep-3",
        step: 3,
        title: "Wawancara di Kedutaan Jerman Jakarta",
        desc: "Peserta hadir langsung di Kedubes Jerman untuk penyerahan berkas, perekaman biometrik, dan sesi wawancara singkat.",
      },
      {
        id: "vstep-4",
        step: 4,
        title: "Penerbitan Visa Nasional & Pengambilan Paspor",
        desc: "Proses verifikasi oleh Ausländerbehörde di Jerman hingga stiker visa ditempel di paspor peserta (rata-rata 4-8 minggu).",
      },
    ],
  },
  team: {
    heroBadge: "Profil Pengajar & Tenaga Ahli",
    title: "Tim & Pengajar Kami",
    subtitle:
      "Dipimpin oleh para profesional dan instruktur bersertifikasi resmi yang berdedikasi membimbing masa depan Anda.",
    members: [
      {
        id: "team-1",
        name: "Founder & Direktur Utama",
        role: "Pendiri Ich Liebe Deutsch Medan",
        initials: "FD",
        almaMater: "Alumni UNIMED & Pendidikan Bahasa Jerman",
        experience: "10+ Tahun di Bidang Program Jerman",
        bio: "Memiliki pengalaman panjang dalam mendampingi ratusan peserta program Ausbildung dan Au Pair hingga sukses berkarier di berbagai kota di Jerman.",
      },
      {
        id: "team-2",
        name: "Kepala Kurikulum & Pengajar Utama",
        role: "Head of German Language Department",
        initials: "KK",
        almaMater: "Goethe-Zertifikat C1 & UNIMED",
        experience: "8 Tahun Mengajar Kelas A1 - B2",
        bio: "Pakar metodologi pembelajaran bahasa Jerman intensif komunikatif yang telah mengantarkan siswa mencapai tingkat kelulusan ujian Goethe 98%.",
      },
      {
        id: "team-3",
        name: "Koordinator Program Ausbildung",
        role: "Lead Specialist Ausbildung Gastronomie & Pflege",
        initials: "PA",
        almaMater: "Alumni Ausbildung Jerman",
        experience: "5 Tahun Praktik & Manajemen di Jerman",
        bio: "Membimbing siswa dalam penyusunan berkas lamaran, simulasi interview dengan perusahaan Jerman, dan tips adaptasi budaya kerja.",
      },
      {
        id: "team-4",
        name: "Koordinator Program Au Pair & FSJ",
        role: "Counselor & Host Family Matching",
        initials: "SA",
        almaMater: "Alumni Program Au Pair Jerman",
        experience: "6 Tahun Pendampingan Peserta",
        bio: "Mendampingi proses matching dengan keluarga asuh, pembekalan psikologis, serta asistensi komunikasi selama peserta berada di Jerman.",
      },
      {
        id: "team-5",
        name: "Tim Administrasi & Visa Specialist",
        role: "Senior Legal & Document Officer",
        initials: "AD",
        almaMater: "Fakultas Hukum & Hubungan Internasional",
        experience: "7 Tahun Pengurusan Dokumen & Visa Kedubes",
        bio: "Memastikan seluruh dokumen, legalisasi, terjemahan tersumpah, dan formulir visa Kedutaan Jerman selesai dengan akurasi 100%.",
      },
    ],
  },
  blog: {
    heroBadge: "Informasi & Berita Edukasi Jerman",
    title: "Blog & Kabar Terbaru",
    subtitle:
      "Artikel panduan, tips belajar bahasa Jerman, kisah inspiratif alumni, dan kabar regulasi terbaru seputar Jerman.",
    posts: [
      {
        id: "post-1",
        slug: "panduan-lengkap-ausbildung-jerman-2026",
        title: "Panduan Lengkap Ausbildung di Jerman: Syarat, Gaji, dan Jurusan Favorit",
        tag: "Ausbildung",
        excerpt:
          "Semua hal yang perlu Anda ketahui tentang program sekolah kejuruan dual di Jerman, mulai dari besaran gaji hingga tips lolos wawancara.",
        date: "28 Februari 2026",
        author: "Tim Akademik ILD",
        img: blogAusbildung,
        content: [
          "Ausbildung adalah sistem pendidikan vokasi dual yang sangat dihormati di Jerman. Dalam program ini, peserta membagi waktu antara belajar teori di sekolah kejuruan (Berufsschule) dan praktik kerja langsung di perusahaan rekanan.",
          "Salah satu keunggulan utama Ausbildung adalah peserta menerima uang saku bulanan dari perusahaan sejak bulan pertama pelatihan berkisar antara €950 hingga €1.400 tergantung jurusan dan wilayah bagian.",
          "Untuk dapat mendaftar, syarat terpenting adalah menguasai bahasa Jerman minimal tingkat B1. Di Ich Liebe Deutsch Medan, kami membimbing siswa secara bertahap dari level A1 hingga siap ujian B1.",
        ],
      },
      {
        id: "post-2",
        slug: "tips-sukses-menjadi-au-pair-di-jerman",
        title: "5 Tips Sukses Menjadi Au Pair di Jerman dan Cara Mendapatkan Gastfamilie Terbaik",
        tag: "Au Pair",
        excerpt:
          "Kiat praktis mempersiapkan diri sebelum berangkat sebagai Au Pair di Jerman agar cepat akrab dengan keluarga asuh dan lancar berbahasa Jerman.",
        date: "20 Februari 2026",
        author: "Konsultan Program",
        img: blogAupair,
        content: [
          "Menjadi Au Pair adalah salah satu cara paling hemat dan menyenangkan untuk merasakan kehidupan nyata di Jerman sembari mendalami bahasa dan budayanya.",
          "Sebagai Au Pair, Anda akan tinggal di kamar tersendiri di rumah keluarga asuh, mendapatkan makan gratis, serta uang saku bulanan minimal €280.",
          "Kunci keberhasilan terletak pada komunikasi yang terbuka, inisiatif yang baik dalam membantu aktivitas anak-anak, serta kemauan untuk belajar kebiasaan hidup masyarakat Jerman.",
        ],
      },
      {
        id: "post-3",
        slug: "mengenal-program-fsj-jerman",
        title: "Mengenal Program FSJ di Jerman: Batu Loncatan Emas Menuju Karier Keperawatan",
        tag: "FSJ / BFD",
        excerpt:
          "Bagaimana program relawan sosial (FSJ) dapat menjadi jalan pintas terbaik untuk berkarier sebagai tenaga medis profesional di Jerman.",
        date: "12 Februari 2026",
        author: "Tim Keperawatan ILD",
        img: blogFsj,
        content: [
          "Freiwilliges Soziales Jahr (FSJ) merupakan program pengabdian masyarakat resmi di Jerman yang memberi kesempatan kepada kaum muda untuk bertugas di rumah sakit atau panti sosial.",
          "Banyak peserta asal Indonesia memanfaatkan FSJ sebagai batu loncatan sebelum melanjutkan ke jenjang Ausbildung Pflegefachmann (Perawat).",
          "Selama masa tugas 1 tahun, peserta mendapatkan uang saku bulanan, tempat tinggal, dan sertifikat resmi yang sangat berharga untuk pengajuan karier lanjutan di Eropa.",
        ],
      },
      {
        id: "post-4",
        slug: "strategi-lulus-goethe-zertifikat-b1-cepat",
        title: "Strategi Efektif Lulus Ujian Goethe-Zertifikat B1 dalam 6 Bulan",
        tag: "Bahasa Jerman",
        excerpt:
          "Metode belajar intensif yang terbukti membantu puluhan siswa Ich Liebe Deutsch Medan meraih skor tinggi pada 4 modul ujian Goethe.",
        date: "05 Februari 2026",
        author: "Instruktur Senior",
        img: blogKarir,
        content: [
          "Ujian Goethe-Zertifikat B1 terdiri dari empat modul: Lesen (Membaca), Hören (Mendengar), Schreiben (Menulis), dan Sprechen (Berbicara).",
          "Kunci kelulusan bukan sekadar menghafal tata bahasa (Grammatik), melainkan membiasakan telinga dengan percakapan asli penutur Jerman dan latihan menyusun kalimat sehari-hari.",
          "Di Ich Liebe Deutsch Medan, setiap siswa mendapatkan sesi simulasi ujian berkala dengan bank soal resmi serta evaluasi langsung dari pengajar.",
        ],
      },
    ],
  },
  kegiatanBelajar: {
    heroBadge: "Kursus & Kurikulum Bahasa Jerman",
    title: "Kegiatan Belajar & Kursus",
    subtitle:
      "Kelas intensif bahasa Jerman berstandar Goethe-Zertifikat dari tingkat pemula (A1) hingga tingkat mahir (B2) dibimbing langsung oleh instruktur berpengalaman.",
    classes: [
      {
        id: "class-a1",
        level: "A1",
        name: "Kelas Bahasa Jerman Tingkat Dasar (A1)",
        target: "Persiapan Au Pair & Dasar Komunikasi Jerman",
        duration: "2 Bulan (Intensif 5x Seminggu)",
        schedule: "Pagi: 09:00 - 12:00 WIB | Sore: 14:00 - 17:00 WIB",
        isPopular: true,
        curriculum: [
          "Pengenalan alfabet, pelafalan, dan angka dalam bahasa Jerman",
          "Tata bahasa dasar: Verbkonjugation, Artikel (der/die/das), Kasus Nominativ & Akkusativ",
          "Percakapan sehari-hari: Perkenalan diri, keluarga, berbelanja, memesan makanan",
          "Latihan soal dan simulasi ujian resmi Goethe-Zertifikat A1 (Start Deutsch 1)",
        ],
      },
      {
        id: "class-a2",
        level: "A2",
        name: "Kelas Bahasa Jerman Tingkat Lanjutan Dasar (A2)",
        target: "Peningkatan Kosakata & Pemahaman Percakapan",
        duration: "2 Bulan (Intensif 5x Seminggu)",
        schedule: "Pagi: 09:00 - 12:00 WIB | Sore: 14:00 - 17:00 WIB",
        curriculum: [
          "Penguasaan Kasus Dativ, Preposisi ruang dan waktu, Modalverben lanjutan",
          "Bentuk lampau: Perfekt dan Präteritum untuk menceritakan pengalaman",
          "Membaca teks deskriptif, artikel pendek, dan menulis email informal/formal",
          "Simulasi ujian Goethe-Zertifikat A2 lengkap 4 modul",
        ],
      },
      {
        id: "class-b1",
        level: "B1",
        name: "Kelas Bahasa Jerman Tingkat Menengah (B1)",
        target: "Syarat Wajib Ausbildung & FSJ Keperawatan",
        duration: "2.5 Bulan (Intensif 5x Seminggu)",
        schedule: "Pagi: 09:00 - 13:00 WIB",
        isPopular: true,
        curriculum: [
          "Tata bahasa kompleks: Nebensätze (weil, dass, obwohl, wenn), Passiv, Konjunktiv II",
          "Kosakata profesional dunia kerja, dunia medis, perhotelan, dan wawancara kerja",
          "Keterampilan berargumentasi, presentasi singkat, dan debat topik sosial",
          "Try out intensif modul Lesen, Hören, Schreiben, & Sprechen Goethe B1",
        ],
      },
      {
        id: "class-b2",
        level: "B2",
        name: "Kelas Bahasa Jerman Tingkat Profesional (B2)",
        target: "Profesi Dokter, Perawat Spesialis, & Kuliah",
        duration: "3 Bulan (Intensif)",
        schedule: "Sore: 14:00 - 18:00 WIB",
        curriculum: [
          "Bahasa akademik dan istilah teknis spesifik profesi kedokteran/teknik",
          "Analisis teks laporan resmi, korespondensi instansi, dan negosiasi bisnis",
          "Penyusunan esai ilmiah dan pemahaman dialek serta aksen regional Jerman",
          "Persiapan ujian sertifikasi Goethe-Zertifikat B2 & telc Deutsch B2",
        ],
      },
    ],
  },
  kegiatanProgram: {
    heroBadge: "Rangkaian Pembinaan & Kegiatan",
    title: "Kegiatan Program",
    subtitle:
      "Rangkaian pembinaan mental, kebersamaan, dan keterampilan praktis yang dirancang khusus untuk calon peserta sebelum berangkat ke Jerman.",
    description:
      "Di Ich Liebe Deutsch Medan, kami meyakini bahwa kesuksesan hidup di Jerman membutuhkan kombinasi antara kecakapan bahasa Jerman, kesiapan mental mandiri, serta keterampilan hidup praktis.",
    activities: [
      {
        id: "act-1",
        title: "Gathering Alumni & Siswa",
        image: galleryGathering,
        desc: "Pembinaan mental, motivasi hidup mandiri, dan temu wicara berbagi pengalaman bersama alumni yang sedang berlibur dari Jerman.",
        to: "/gathering",
      },
      {
        id: "act-2",
        title: "Cooking Class Kuliner Jerman & Nusantara",
        image: galleryCooking,
        desc: "Sesi memasak bersama untuk membekali calon peserta Au Pair dan Ausbildung dengan kemampuan memasak mandiri dan pengenalan cita rasa Jerman.",
        to: "/cooking-class",
      },
      {
        id: "act-3",
        title: "Kegiatan Belajar Intensif",
        image: galleryStudy,
        desc: "Pembelajaran bahasa Jerman harian dengan metode komunikatif, simulasi interview kerja, dan ujian Goethe-Zertifikat.",
        to: "/kegiatan-belajar",
      },
    ],
  },
  cookingClass: {
    heroBadge: "Pembekalan Keterampilan Praktis",
    title: "Cooking Class Jerman & Mandiri",
    subtitle:
      "Seluruh peserta dibekali kemampuan memasak sebagai bekal hidup mandiri dan mengasah keterampilan praktis sebelum berangkat ke Jerman.",
    description:
      "Dalam sesi Cooking Class ini, para peserta diajarkan resep masakan khas Jerman (seperti Kartoffelsalat, Schnitzel, Bratkartoffeln) serta masakan Indonesia praktis agar mampu mandiri di negeri orang.",
    points: [
      {
        id: "cp-1",
        title: "Keterampilan Memasak Mandiri",
        desc: "Mempelajari resep masakan dasar bergizi dan teknik dapur yang efisien untuk bekal tinggal di Jerman.",
      },
      {
        id: "cp-2",
        title: "Kemandirian Khusus Peserta Au Pair",
        desc: "Mempersiapkan calon Au Pair agar terbiasa menyiapkan makanan sehat untuk anak-anak keluarga asuh.",
      },
      {
        id: "cp-3",
        title: "Kebersamaan & Teamwork",
        desc: "Mempererat tali persahabatan antar peserta sembari melatih koordinasi kerja tim yang solid.",
      },
    ],
    photos: [
      {
        id: "cook-1",
        src: galleryCooking,
        alt: "Sesi memasak peserta di dapur latihan",
        caption: "Praktik Pengolahan Bahan Makanan",
      },
      {
        id: "cook-2",
        src: galleryClass,
        alt: "Persiapan bumbu dan resep Jerman",
        caption: "Mengenal Resep Tradisional Jerman",
      },
      {
        id: "cook-3",
        src: galleryGathering,
        alt: "Menikmati hasil masakan bersama",
        caption: "Makan Bersama dan Evaluasi Rasa",
      },
    ],
  },
  gathering: {
    heroBadge: "Pembinaan Mental & Komunitas",
    title: "Gathering Alumni & Siswa",
    subtitle:
      "Kegiatan pembinaan mental, mempererat kebersamaan, dan membangun komunitas peserta program menuju Jerman.",
    description:
      "Kegiatan gathering rutin diselenggarakan untuk mempertemukan calon peserta dengan para alumni, membekali kesiapan mental menghadapi culture shock, dan membangun jaringan saling dukung di Jerman.",
    values: [
      {
        id: "gv-1",
        title: "Mental Tangguh & Tahan Uji",
        desc: "Membangun karakter pantang menyerah dan kemampuan problem-solving dalam menghadapi perbedaan budaya.",
      },
      {
        id: "gv-2",
        title: "Kemandirian Emosional",
        desc: "Mempersiapkan diri hidup jauh dari keluarga dan mampu mengelola emosi serta keuangan secara bijak.",
      },
      {
        id: "gv-3",
        title: "Jaringan Komunitas Solid di Jerman",
        desc: "Setiap alumni terhubung dalam grup komunitas per kota di Jerman sehingga saling membantu saat tiba di Jerman.",
      },
    ],
    photos: [
      {
        id: "gath-1",
        src: galleryGathering,
        alt: "Kumpul bersama siswa dan pengajar",
        caption: "Sesi Diskusi & Sharing Pengalaman",
      },
      {
        id: "gath-2",
        src: galleryStudy,
        alt: "Pembekalan motivasi oleh direktur",
        caption: "Materi Kesiapan Mental & Mindset Sukses",
      },
      {
        id: "gath-3",
        src: galleryCity,
        alt: "Foto bersama peserta program",
        caption: "Kekompakan Keluarga Besar ILD Medan",
      },
    ],
  },
  foto: {
    heroBadge: "Dokumentasi Visual Kegiatan",
    title: "Galeri Foto",
    subtitle:
      "Kumpulan dokumentasi suasana kelas belajar, cooking class, gathering, pelepasan visa, dan kabar alumni di Jerman.",
    photos: [
      {
        id: "photo-1",
        title: "Suasana Belajar Kelas Intensif B1",
        category: "Kelas",
        date: "Februari 2026",
        imgUrl: galleryClass,
        caption:
          "Siswa sedang mempraktikkan percakapan interaktif bahasa Jerman di ruang kelas modern.",
      },
      {
        id: "photo-2",
        title: "Pelepasan Siswa Ausbildung ke Jerman",
        category: "Pemberangkatan",
        date: "Januari 2026",
        imgUrl: galleryGraduation,
        caption: "Momen pelepasan keberangkatan angkatan 2025 menuju Frankfurt dan Munich.",
      },
      {
        id: "photo-3",
        title: "Sesi Cooking Class Persiapan Au Pair",
        category: "Cooking Class",
        date: "Desember 2025",
        imgUrl: galleryCooking,
        caption: "Praktik memasak masakan Jerman dan bimbingan etika meja makan ala Eropa.",
      },
      {
        id: "photo-4",
        title: "Gathering Akbar Siswa & Pengajar",
        category: "Gathering",
        date: "November 2025",
        imgUrl: galleryGathering,
        caption: "Kebersamaan dan pembinaan mental calon peserta program ke Jerman.",
      },
      {
        id: "photo-5",
        title: "Kunjungan Alumni dari Jerman di Medan",
        category: "Alumni",
        date: "Oktober 2025",
        imgUrl: galleryCity,
        caption: "Alumni Ausbildung Hotelfachfrau berbagi cerita pengalaman kerja di Berlin.",
      },
      {
        id: "photo-6",
        title: "Simulasi Ujian Goethe-Zertifikat B1",
        category: "Kelas",
        date: "September 2025",
        imgUrl: galleryStudy,
        caption: "Ujian simulasi bulanan untuk mengukur kesiapan siswa menjelang ujian resmi.",
      },
    ],
  },
  video: {
    heroBadge: "Video & Cerita Sukses Alumni",
    title: "Galeri Video & Testimoni",
    subtitle:
      "Tonton dokumentasi kegiatan pembelajaran, profil siswa, pelepasan keberangkatan, dan video pengalaman langsung alumni di Jerman.",
    videos: [
      {
        id: "vid-1",
        title: "Pengalaman Kerja Ausbildung di Jerman — Cerita Alumni ILD",
        category: "Testimoni",
        youtubeId: "dQw4w9WgXcQ",
        duration: "06:45",
        desc: "Simak cerita suka duka dan tips beradaptasi selama menjalani sekolah kejuruan dual di kota Frankfurt, Jerman.",
      },
      {
        id: "vid-2",
        title: "Dokumentasi Suasana Belajar Kelas Bahasa Jerman di Medan",
        category: "Dokumentasi Kelas",
        youtubeId: "dQw4w9WgXcQ",
        duration: "04:12",
        desc: "Melihat langsung metode pembelajaran interaktif bersama para pengajar berpengalaman di Ich Liebe Deutsch Medan.",
      },
      {
        id: "vid-3",
        title: "Momen Pelepasan & Keberangkatan Peserta ke Bandara Kualanamu",
        category: "Pelepasan Siswa",
        youtubeId: "dQw4w9WgXcQ",
        duration: "05:30",
        desc: "Rasa haru dan bahagia pelepasan siswa menuju gerbang impian masa depan mereka di Jerman.",
      },
      {
        id: "vid-4",
        title: "Tips Lolos Wawancara Visa Kedubes Jerman Jakarta",
        category: "Tips Jerman",
        youtubeId: "dQw4w9WgXcQ",
        duration: "08:15",
        desc: "Panduan lengkap dari tim legal ILD mengenai pertanyaan umum saat sesi interview visa nasional Jerman.",
      },
    ],
  },
  kontak: {
    heroBadge: "Layanan Konsultasi & Lokasi Kantor",
    title: "Hubungi & Kunjungi Kami",
    subtitle:
      "Tim konsultan kami siap memberikan informasi mendalam mengenai program Ausbildung, Au Pair, FSJ, dan kelas kursus bahasa Jerman.",
    hotlineWA: "+62 812-6596-5231",
    phoneLandline: "(061) 822-4591",
    emailOffice: "indonesiagerman@gmail.com",
    officeAddress:
      "Komplek Waikiki, Jl. Flamboyan Raya No. 49 Blok F, Tj. Selamat, Kec. Medan Tuntungan, Kota Medan, Sumatera Utara 20135",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Medan%20Tuntungan%20Komplek%20Waikiki&t=&z=15&ie=UTF8&iwloc=&output=embed",
    operatingHoursText: "Senin – Sabtu: 08:30 – 17:30 WIB (Minggu & Hari Libur Nasional Tutup)",
  },
};

const STORAGE_KEY = "ild_cms_config_v2";

/* =========================================================================
   REACT CONTEXT & PROVIDER WITH POSTGRESQL SYNC
   ========================================================================= */

export interface CmsContextValue {
  cms: SiteCmsData;
  lastUpdated: string;
  isSyncing: boolean;
  dbConnected: boolean;
  updateNavbar: (patch: Partial<NavbarConfig>) => void;
  updateFooter: (patch: Partial<FooterConfig>) => void;
  updateSection: <K extends keyof SiteCmsData>(section: K, data: SiteCmsData[K]) => void;
  // Hero
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (id: string, patch: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  // Blog
  addBlogPost: (post: BlogPostItem) => void;
  updateBlogPost: (id: string, patch: Partial<BlogPostItem>) => void;
  deleteBlogPost: (id: string) => void;
  // Team
  addTeamMember: (member: TeamMemberItem) => void;
  updateTeamMember: (id: string, patch: Partial<TeamMemberItem>) => void;
  deleteTeamMember: (id: string) => void;
  // Legal
  addLegalDoc: (doc: LegalDocumentItem) => void;
  updateLegalDoc: (id: string, patch: Partial<LegalDocumentItem>) => void;
  deleteLegalDoc: (id: string) => void;
  // Gallery Photo
  addGalleryPhoto: (photo: GalleryPhotoItem) => void;
  updateGalleryPhoto: (id: string, patch: Partial<GalleryPhotoItem>) => void;
  deleteGalleryPhoto: (id: string) => void;
  // Video
  addVideo: (video: VideoDocumentationItem) => void;
  updateVideo: (id: string, patch: Partial<VideoDocumentationItem>) => void;
  deleteVideo: (id: string) => void;
  // Learning Class
  addClassItem: (item: LearningClassItem) => void;
  updateClassItem: (id: string, patch: Partial<LearningClassItem>) => void;
  deleteClassItem: (id: string) => void;
  // Ausbildung Field
  addAusbildungField: (field: AusbildungFieldItem) => void;
  updateAusbildungField: (id: string, patch: Partial<AusbildungFieldItem>) => void;
  deleteAusbildungField: (id: string) => void;
  // Global
  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonStr: string) => boolean;
  forceSyncPostgres: () => Promise<boolean>;
}

const CmsContext = createContext<CmsContextValue | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<SiteCmsData>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          return {
            ...DEFAULT_CMS_DATA,
            ...parsed,
            navbar: { ...DEFAULT_CMS_DATA.navbar, ...(parsed.navbar || {}) },
            footer: { ...DEFAULT_CMS_DATA.footer, ...(parsed.footer || {}) },
            home: { ...DEFAULT_CMS_DATA.home, ...(parsed.home || {}) },
            tentangKami: { ...DEFAULT_CMS_DATA.tentangKami, ...(parsed.tentangKami || {}) },
            struktur: { ...DEFAULT_CMS_DATA.struktur, ...(parsed.struktur || {}) },
            legalitas: { ...DEFAULT_CMS_DATA.legalitas, ...(parsed.legalitas || {}) },
            programAusbildung: {
              ...DEFAULT_CMS_DATA.programAusbildung,
              ...(parsed.programAusbildung || {}),
            },
            programAupair: { ...DEFAULT_CMS_DATA.programAupair, ...(parsed.programAupair || {}) },
            programFsj: { ...DEFAULT_CMS_DATA.programFsj, ...(parsed.programFsj || {}) },
            persyaratan: { ...DEFAULT_CMS_DATA.persyaratan, ...(parsed.persyaratan || {}) },
            team: { ...DEFAULT_CMS_DATA.team, ...(parsed.team || {}) },
            blog: { ...DEFAULT_CMS_DATA.blog, ...(parsed.blog || {}) },
            kegiatanBelajar: {
              ...DEFAULT_CMS_DATA.kegiatanBelajar,
              ...(parsed.kegiatanBelajar || {}),
            },
            kegiatanProgram: {
              ...DEFAULT_CMS_DATA.kegiatanProgram,
              ...(parsed.kegiatanProgram || {}),
            },
            cookingClass: { ...DEFAULT_CMS_DATA.cookingClass, ...(parsed.cookingClass || {}) },
            gathering: { ...DEFAULT_CMS_DATA.gathering, ...(parsed.gathering || {}) },
            foto: { ...DEFAULT_CMS_DATA.foto, ...(parsed.foto || {}) },
            video: { ...DEFAULT_CMS_DATA.video, ...(parsed.video || {}) },
            kontak: { ...DEFAULT_CMS_DATA.kontak, ...(parsed.kontak || {}) },
          };
        }
      } catch (e) {
        console.warn("[CMS Store] Local storage read error", e);
      }
    }
    return DEFAULT_CMS_DATA;
  });

  const [lastUpdated, setLastUpdated] = useState<string>("Tersinkronisasi");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [dbConnected, setDbConnected] = useState<boolean>(true);

  // Sync to PostgreSQL database via /api/cms/main_cms_config
  const syncToPostgres = async (data: SiteCmsData) => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/cms/main_cms_config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (res.ok) {
        setDbConnected(true);
      }
    } catch (err) {
      console.warn("[PostgreSQL Sync] Error saving to DB:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const saveState = (newState: SiteCmsData) => {
    setCms(newState);
    setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        window.dispatchEvent(new Event("ild_cms_updated"));
      } catch (e) {
        console.warn("[CMS Store] Error writing to localStorage", e);
      }
      syncToPostgres(newState);
    }
  };

  // On mount: Load from PostgreSQL
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/api/cms/main_cms_config")
        .then((res) => (res.ok ? res.json() : null))
        .then((payload) => {
          if (payload?.data && payload.data.navbar) {
            setCms((prev) => ({
              ...DEFAULT_CMS_DATA,
              ...prev,
              ...payload.data,
            }));
            setLastUpdated("Tersinkronisasi PostgreSQL");
            setDbConnected(true);
          }
        })
        .catch((err) => {
          console.warn("[CMS Store] Could not fetch initial state from PostgreSQL", err);
        });

      // Check DB connection status
      fetch("/api/db/status")
        .then((res) => (res.ok ? res.json() : null))
        .then((status) => {
          if (status?.connected !== undefined) {
            setDbConnected(status.connected);
          }
        })
        .catch(() => {});
    }

    const handleStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setCms((prev) => ({
            ...prev,
            ...JSON.parse(saved),
          }));
          setLastUpdated(new Date().toLocaleTimeString("id-ID"));
        }
      } catch (e) {
        console.warn("Storage sync error", e);
      }
    };

    window.addEventListener("ild_cms_updated", handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("ild_cms_updated", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateNavbar = (patch: Partial<NavbarConfig>) => {
    saveState({
      ...cms,
      navbar: { ...cms.navbar, ...patch },
    });
  };

  const updateFooter = (patch: Partial<FooterConfig>) => {
    saveState({
      ...cms,
      footer: { ...cms.footer, ...patch },
    });
  };

  const updateSection = <K extends keyof SiteCmsData>(section: K, data: SiteCmsData[K]) => {
    saveState({
      ...cms,
      [section]: data,
    });
  };

  // Hero Slide Helpers
  const addHeroSlide = (slide: HeroSlide) => {
    saveState({
      ...cms,
      home: {
        ...cms.home,
        heroSlides: [...cms.home.heroSlides, slide],
      },
    });
  };

  const updateHeroSlide = (id: string, patch: Partial<HeroSlide>) => {
    saveState({
      ...cms,
      home: {
        ...cms.home,
        heroSlides: cms.home.heroSlides.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      },
    });
  };

  const deleteHeroSlide = (id: string) => {
    saveState({
      ...cms,
      home: {
        ...cms.home,
        heroSlides: cms.home.heroSlides.filter((s) => s.id !== id),
      },
    });
  };

  // Blog Post Helpers
  const addBlogPost = (post: BlogPostItem) => {
    saveState({
      ...cms,
      blog: {
        ...cms.blog,
        posts: [post, ...cms.blog.posts],
      },
    });
  };

  const updateBlogPost = (id: string, patch: Partial<BlogPostItem>) => {
    saveState({
      ...cms,
      blog: {
        ...cms.blog,
        posts: cms.blog.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      },
    });
  };

  const deleteBlogPost = (id: string) => {
    saveState({
      ...cms,
      blog: {
        ...cms.blog,
        posts: cms.blog.posts.filter((p) => p.id !== id),
      },
    });
  };

  // Team Member Helpers
  const addTeamMember = (member: TeamMemberItem) => {
    saveState({
      ...cms,
      team: {
        ...cms.team,
        members: [...cms.team.members, member],
      },
    });
  };

  const updateTeamMember = (id: string, patch: Partial<TeamMemberItem>) => {
    saveState({
      ...cms,
      team: {
        ...cms.team,
        members: cms.team.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      },
    });
  };

  const deleteTeamMember = (id: string) => {
    saveState({
      ...cms,
      team: {
        ...cms.team,
        members: cms.team.members.filter((m) => m.id !== id),
      },
    });
  };

  // Legal Doc Helpers
  const addLegalDoc = (doc: LegalDocumentItem) => {
    saveState({
      ...cms,
      legalitas: {
        ...cms.legalitas,
        documents: [...cms.legalitas.documents, doc],
      },
    });
  };

  const updateLegalDoc = (id: string, patch: Partial<LegalDocumentItem>) => {
    saveState({
      ...cms,
      legalitas: {
        ...cms.legalitas,
        documents: cms.legalitas.documents.map((d) => (d.id === id ? { ...d, ...patch } : d)),
      },
    });
  };

  const deleteLegalDoc = (id: string) => {
    saveState({
      ...cms,
      legalitas: {
        ...cms.legalitas,
        documents: cms.legalitas.documents.filter((d) => d.id !== id),
      },
    });
  };

  // Gallery Photos
  const addGalleryPhoto = (photo: GalleryPhotoItem) => {
    saveState({
      ...cms,
      foto: {
        ...cms.foto,
        photos: [photo, ...cms.foto.photos],
      },
    });
  };

  const updateGalleryPhoto = (id: string, patch: Partial<GalleryPhotoItem>) => {
    saveState({
      ...cms,
      foto: {
        ...cms.foto,
        photos: cms.foto.photos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      },
    });
  };

  const deleteGalleryPhoto = (id: string) => {
    saveState({
      ...cms,
      foto: {
        ...cms.foto,
        photos: cms.foto.photos.filter((p) => p.id !== id),
      },
    });
  };

  // Video Helpers
  const addVideo = (video: VideoDocumentationItem) => {
    saveState({
      ...cms,
      video: {
        ...cms.video,
        videos: [video, ...cms.video.videos],
      },
    });
  };

  const updateVideo = (id: string, patch: Partial<VideoDocumentationItem>) => {
    saveState({
      ...cms,
      video: {
        ...cms.video,
        videos: cms.video.videos.map((v) => (v.id === id ? { ...v, ...patch } : v)),
      },
    });
  };

  const deleteVideo = (id: string) => {
    saveState({
      ...cms,
      video: {
        ...cms.video,
        videos: cms.video.videos.filter((v) => v.id !== id),
      },
    });
  };

  // Learning Class Helpers
  const addClassItem = (item: LearningClassItem) => {
    saveState({
      ...cms,
      kegiatanBelajar: {
        ...cms.kegiatanBelajar,
        classes: [...cms.kegiatanBelajar.classes, item],
      },
    });
  };

  const updateClassItem = (id: string, patch: Partial<LearningClassItem>) => {
    saveState({
      ...cms,
      kegiatanBelajar: {
        ...cms.kegiatanBelajar,
        classes: cms.kegiatanBelajar.classes.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      },
    });
  };

  const deleteClassItem = (id: string) => {
    saveState({
      ...cms,
      kegiatanBelajar: {
        ...cms.kegiatanBelajar,
        classes: cms.kegiatanBelajar.classes.filter((c) => c.id !== id),
      },
    });
  };

  // Ausbildung Field Helpers
  const addAusbildungField = (field: AusbildungFieldItem) => {
    saveState({
      ...cms,
      programAusbildung: {
        ...cms.programAusbildung,
        fields: [...cms.programAusbildung.fields, field],
      },
    });
  };

  const updateAusbildungField = (id: string, patch: Partial<AusbildungFieldItem>) => {
    saveState({
      ...cms,
      programAusbildung: {
        ...cms.programAusbildung,
        fields: cms.programAusbildung.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      },
    });
  };

  const deleteAusbildungField = (id: string) => {
    saveState({
      ...cms,
      programAusbildung: {
        ...cms.programAusbildung,
        fields: cms.programAusbildung.fields.filter((f) => f.id !== id),
      },
    });
  };

  // Global actions
  const resetToDefaults = () => {
    saveState(DEFAULT_CMS_DATA);
  };

  const exportBackupJson = () => {
    return JSON.stringify(cms, null, 2);
  };

  const importBackupJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.navbar || !parsed.footer || !parsed.home) {
        throw new Error("Invalid CMS format");
      }
      saveState({
        ...DEFAULT_CMS_DATA,
        ...parsed,
      });
      return true;
    } catch (e) {
      console.error("Import backup error", e);
      return false;
    }
  };

  const forceSyncPostgres = async (): Promise<boolean> => {
    try {
      await syncToPostgres(cms);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        cms,
        lastUpdated,
        isSyncing,
        dbConnected,
        updateNavbar,
        updateFooter,
        updateSection,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addLegalDoc,
        updateLegalDoc,
        deleteLegalDoc,
        addGalleryPhoto,
        updateGalleryPhoto,
        deleteGalleryPhoto,
        addVideo,
        updateVideo,
        deleteVideo,
        addClassItem,
        updateClassItem,
        deleteClassItem,
        addAusbildungField,
        updateAusbildungField,
        deleteAusbildungField,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
        forceSyncPostgres,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
}
