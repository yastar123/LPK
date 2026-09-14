import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  HelpCircle,
  Home,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/daftar")({
  head: () => ({
    meta: [
      { title: "Pendaftaran Kursus Bahasa Jerman — ICH LIEBE DEUTSCH MEDAN" },
      {
        name: "description",
        content:
          "Formulir pendaftaran resmi kursus bahasa Jerman Level A1, A2, B1, B2 dan persiapan program Ausbildung, Au Pair, serta FSJ bersama Ich Liebe Deutsch Medan.",
      },
      { property: "og:title", content: "Pendaftaran Kursus Bahasa Jerman — ICH LIEBE DEUTSCH MEDAN" },
      {
        property: "og:description",
        content:
          "Daftar kelas bahasa Jerman A1, A2, B1, B2 di Medan. Isi data diri dan langsung terhubung dengan WhatsApp resmi admin ILD Medan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PendaftaranPage,
});

interface RegistrationForm {
  nama: string;
  alamat: string;
  umur: string;
  ijazahTerakhir: string;
  levelBahasa: "A1" | "A2" | "B1" | "B2" | "";
  whatsapp: string;
  email: string;
  program: string;
  catatan: string;
}

const GERMAN_LEVELS = [
  {
    id: "A1",
    level: "Level A1",
    name: "Pemula Total (Anfänger)",
    desc: "Pengenalan tata bahasa dasar, alfabet, angka, salam, perkenalan diri, dan percakapan harian sederhana.",
    badge: "Dasar / Pemula",
    color: "from-sky-500 to-blue-600",
    borderActive: "border-sky-500 bg-sky-50/70 ring-2 ring-sky-500",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    id: "A2",
    level: "Level A2",
    name: "Pra-Menengah (Grundstufe)",
    desc: "Mampu menceritakan latar belakang diri, rutinitas, berbelanja, petunjuk arah, dan situasi umum di Jerman.",
    badge: "Pra-Menengah",
    color: "from-blue-600 to-indigo-600",
    borderActive: "border-blue-600 bg-blue-50/70 ring-2 ring-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "B1",
    level: "Level B1",
    name: "Menengah (Mittelstufe)",
    desc: "Syarat utama pendaftaran Ausbildung & Au Pair. Mampu berkomunikasi mandiri, menulis teks, dan wawancara kerja.",
    badge: "Syarat Ausbildung",
    color: "from-amber-500 to-amber-600",
    borderActive: "border-amber-500 bg-amber-50/70 ring-2 ring-amber-500",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "B2",
    level: "Level B2",
    name: "Menengah Lanjut (Gute Mittelstufe)",
    desc: "Kelancaran komunikasi spontan, istilah teknis vokasi & medis, persiapan studi universitas atau program perawat.",
    badge: "Tingkat Lanjut",
    color: "from-emerald-500 to-teal-600",
    borderActive: "border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
] as const;

const IJAZAH_OPTIONS = [
  "SMA / SMK / MA / Sederajat",
  "Diploma (D3 / D4)",
  "Sarjana (S1)",
  "Magister (S2)",
  "Sedang Kuliah",
  "Lainnya",
];

const PROGRAM_OPTIONS = [
  "Kursus Bahasa Jerman Reguler / Intensif",
  "Persiapan Program Ausbildung (Vokasi Jerman)",
  "Persiapan Program Au Pair (Tinggal Bersama Gastfamilie)",
  "Persiapan Program FSJ / BFD (Relawan Sosial)",
  "Persiapan Studi / Kuliah di Jerman",
  "Belum Yakin (Ingin Konsultasi Terlebih Dahulu)",
];

export function PendaftaranPage() {
  const { cms } = useCms();
  const officialWaNumber = "082127324453";
  const whatsappClean = "6282127324453";

  const [form, setForm] = useState<RegistrationForm>({
    nama: "",
    alamat: "",
    umur: "",
    ijazahTerakhir: "",
    levelBahasa: "A1",
    whatsapp: "",
    email: "",
    program: "Kursus Bahasa Jerman Reguler / Intensif",
    catatan: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    waUrl: string;
    formSnapshot: RegistrationForm;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationForm, string>> = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama lengkap wajib diisi.";
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = "Nama lengkap minimal 3 karakter.";
    }

    if (!form.alamat.trim()) {
      newErrors.alamat = "Alamat domisili wajib diisi.";
    }

    if (!form.umur.trim()) {
      newErrors.umur = "Umur wajib diisi.";
    } else {
      const numAge = Number(form.umur);
      if (isNaN(numAge) || numAge < 10 || numAge > 70) {
        newErrors.umur = "Masukkan umur yang valid (10 - 70 tahun).";
      }
    }

    if (!form.ijazahTerakhir.trim()) {
      newErrors.ijazahTerakhir = "Pilih atau tuliskan ijazah terakhir Anda.";
    }

    if (!form.levelBahasa) {
      newErrors.levelBahasa = "Pilih level bahasa Jerman yang diinginkan (A1, A2, B1, B2).";
    }

    const cleanPhone = form.whatsapp.replace(/[^0-9]/g, "");
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi agar kami dapat mengonfirmasi.";
    } else if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      newErrors.whatsapp = "Format nomor WhatsApp tidak valid (minimal 9 digit).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstErrKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrKey}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Simpan ke database PostgreSQL / Express REST API
      const cleanPhone = form.whatsapp.replace(/[^0-9]/g, "");
      const safeEmail = form.email.trim() || `pendaftar-${cleanPhone}@pendaftar.ild`;

      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program_type: form.program || `Kursus Jerman Level ${form.levelBahasa}`,
          full_name: form.nama.trim(),
          email: safeEmail,
          whatsapp: form.whatsapp.trim(),
          city: form.alamat.trim(),
          age: Number(form.umur),
          last_education: form.ijazahTerakhir,
          german_proficiency: form.levelBahasa,
          motivation: form.catatan.trim() || `Pilihan Level: ${form.levelBahasa}`,
        }),
      }).catch((err) => {
        console.warn("[Pendaftaran API]", err);
      });

      // 2. Susun template pesan WhatsApp yang rapi dan terstruktur
      const waMessage =
        `*PENDAFTARAN KURSUS - ICH LIEBE DEUTSCH MEDAN*%0A` +
        `----------------------------------------------%0A` +
        `Halo Admin ICH LIEBE DEUTSCH MEDAN, saya ingin mendaftar kursus bahasa Jerman dengan data berikut:%0A%0A` +
        `👤 *Nama Lengkap:* ${encodeURIComponent(form.nama.trim())}%0A` +
        `📍 *Alamat:* ${encodeURIComponent(form.alamat.trim())}%0A` +
        `🎂 *Umur:* ${encodeURIComponent(form.umur.trim())} Tahun%0A` +
        `🎓 *Ijazah Terakhir:* ${encodeURIComponent(form.ijazahTerakhir)}%0A` +
        `🇩🇪 *Level Bahasa Jerman yang Dipilih:* ${encodeURIComponent(form.levelBahasa)}%0A` +
        `📱 *Nomor WhatsApp:* ${encodeURIComponent(form.whatsapp.trim())}%0A` +
        (form.email.trim() ? `✉️ *Email:* ${encodeURIComponent(form.email.trim())}%0A` : "") +
        `🎯 *Program Tujuan:* ${encodeURIComponent(form.program)}%0A` +
        (form.catatan.trim() ? `📝 *Catatan Tambahan:* ${encodeURIComponent(form.catatan.trim())}%0A` : "") +
        `----------------------------------------------%0A` +
        `Mohon informasi ketersediaan jadwal kelas terdekat, biaya, dan tahapan selanjutnya. Terima kasih!`;

      const waUrl = `https://wa.me/${whatsappClean}?text=${waMessage}`;

      setSubmittedData({
        waUrl,
        formSnapshot: { ...form },
      });

      // 3. Direct / redirect user ke WhatsApp
      const popup = window.open(waUrl, "_blank");
      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        // Jika popup terblokir browser, redirect di tab saat ini
        window.location.href = waUrl;
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20 pt-24 sm:pt-28">
      {/* Top Breadcrumbs & Section Header */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-sky-600 transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span>Beranda</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Pendaftaran</span>
        </nav>

        {/* Hero Banner Header */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 p-6 sm:p-10 text-white shadow-xl shadow-slate-950/15 relative overflow-hidden">
          {/* Accent flags top bar */}
          <div className="absolute top-0 left-0 right-0 flex h-1.5 w-full">
            <div className="h-full flex-1 bg-slate-900" />
            <div className="h-full flex-1 bg-red-600" />
            <div className="h-full flex-1 bg-amber-400" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-4 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Formulir Pendaftaran Resmi • ILD Medan</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Pendaftaran Kursus Bahasa Jerman
            </h1>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
              Lengkapi formulir pendaftaran di bawah ini untuk memulai langkah Anda menuju Jerman.
              Data Anda akan langsung diteruskan ke WhatsApp resmi tim <strong>ICH LIEBE DEUTSCH MEDAN</strong> untuk konfirmasi kelas.
            </p>

            {/* Micro Highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-5 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Lembaga Berizin Resmi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Standar Goethe-Zertifikat A1–B2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Medan Polonia, Sumatera Utara</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form & Information Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: The Registration Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-9 shadow-sm"
              noValidate
            >
              <div className="border-b border-slate-100 pb-5 mb-7">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Data Calon Peserta
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Harap mengisi data diri dengan benar sesuai identitas resmi Anda.
                </p>
              </div>

              <div className="space-y-6">
                {/* 1. Nama Lengkap */}
                <div id="field-nama">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-sky-600" />
                      Nama Lengkap <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">Sesuai KTP / Ijazah</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => {
                      setForm({ ...form, nama: e.target.value });
                      if (errors.nama) setErrors({ ...errors, nama: undefined });
                    }}
                    placeholder="Contoh: Muhammad Rizky Pratama"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.nama
                        ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                        : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-200"
                    }`}
                  />
                  {errors.nama && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.nama}</p>
                  )}
                </div>

                {/* 2. Alamat Domisili */}
                <div id="field-alamat">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-sky-600" />
                      Alamat Domisili <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">Kota / Daerah saat ini</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={form.alamat}
                    onChange={(e) => {
                      setForm({ ...form, alamat: e.target.value });
                      if (errors.alamat) setErrors({ ...errors, alamat: undefined });
                    }}
                    placeholder="Contoh: Jl. Sisingamangaraja No. 45, Medan Kota"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                      errors.alamat
                        ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                        : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-200"
                    }`}
                  />
                  {errors.alamat && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.alamat}</p>
                  )}
                </div>

                {/* Row: Umur & Nomor WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 3. Umur */}
                  <div id="field-umur">
                    <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-sky-600" />
                      Umur / Usia <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="10"
                        max="70"
                        required
                        value={form.umur}
                        onChange={(e) => {
                          setForm({ ...form, umur: e.target.value });
                          if (errors.umur) setErrors({ ...errors, umur: undefined });
                        }}
                        placeholder="Contoh: 21"
                        className={`w-full rounded-2xl border px-4 py-3 text-sm pr-16 transition-all focus:outline-none focus:ring-2 ${
                          errors.umur
                            ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                            : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-200"
                        }`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        Tahun
                      </span>
                    </div>
                    {errors.umur && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.umur}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div id="field-whatsapp">
                    <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      Nomor WhatsApp Anda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) => {
                        setForm({ ...form, whatsapp: e.target.value });
                        if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                      }}
                      placeholder="Contoh: 081234567890"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.whatsapp
                          ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                          : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-200"
                      }`}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.whatsapp}</p>
                    )}
                  </div>
                </div>

                {/* 4. Ijazah Terakhir */}
                <div id="field-ijazahTerakhir">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-sky-600" />
                    Ijazah Terakhir <span className="text-red-500">*</span>
                  </label>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2 mb-2.5">
                    {IJAZAH_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, ijazahTerakhir: opt });
                          if (errors.ijazahTerakhir) setErrors({ ...errors, ijazahTerakhir: undefined });
                        }}
                        className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                          form.ijazahTerakhir === opt
                            ? "bg-sky-600 text-white shadow-xs font-semibold"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    required
                    value={form.ijazahTerakhir}
                    onChange={(e) => {
                      setForm({ ...form, ijazahTerakhir: e.target.value });
                      if (errors.ijazahTerakhir) setErrors({ ...errors, ijazahTerakhir: undefined });
                    }}
                    placeholder="Ketik atau pilih jenjang pendidikan terakhir Anda"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.ijazahTerakhir
                        ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                        : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-200"
                    }`}
                  />
                  {errors.ijazahTerakhir && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.ijazahTerakhir}</p>
                  )}
                </div>

                {/* 5. Level Bahasa Jerman yang Mau Dipilih: A1, A2, B1, B2 */}
                <div id="field-levelBahasa" className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-sky-600" />
                      Level Bahasa Jerman yang Mau Dipilih <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] font-medium text-slate-500">Pilih salah satu (A1, A2, B1, B2)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {GERMAN_LEVELS.map((lvl) => {
                      const isSelected = form.levelBahasa === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => {
                            setForm({ ...form, levelBahasa: lvl.id as any });
                            if (errors.levelBahasa) setErrors({ ...errors, levelBahasa: undefined });
                          }}
                          className={`cursor-pointer rounded-2xl border p-4 transition-all relative ${
                            isSelected
                              ? lvl.borderActive
                              : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50/70"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-extrabold text-sm text-white bg-gradient-to-br ${lvl.color}`}
                              >
                                {lvl.id}
                              </span>
                              <div>
                                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                                  {lvl.level}
                                </h3>
                                <p className="text-[11px] text-slate-500 font-medium">
                                  {lvl.name}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                isSelected
                                  ? "border-sky-600 bg-sky-600 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>

                          <p className="mt-2.5 text-[11px] text-slate-600 leading-relaxed">
                            {lvl.desc}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                            <span
                              className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${lvl.badgeColor}`}
                            >
                              {lvl.badge}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {lvl.id === "A1" ? "Kelas Pemula" : "Lanjutan"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.levelBahasa && (
                    <p className="mt-2 text-xs text-red-500 font-medium">{errors.levelBahasa}</p>
                  )}
                </div>

                {/* Additional Optional: Program Pilihan */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                    Peminatan Program ke Jerman (Opsional)
                  </label>
                  <select
                    value={form.program}
                    onChange={(e) => setForm({ ...form, program: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  >
                    {PROGRAM_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email (Opsional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-500" />
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  />
                </div>

                {/* Catatan / Pertanyaan Tambahan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
                    Catatan atau Pertanyaan Tambahan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={form.catatan}
                    onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                    placeholder="Contoh: Saya ingin kelas malam / kelas hari Sabtu, apakah ada?"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 resize-none"
                  />
                </div>

                {/* Disclaimer / Privacy Notice */}
                <div className="rounded-2xl bg-sky-50/70 border border-sky-100 p-4 text-xs text-sky-900 flex items-start gap-3">
                  <Info className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Setelah menekan tombol kirim, Anda akan langsung dialihkan ke <strong>WhatsApp resmi ICH LIEBE DEUTSCH MEDAN ({officialWaNumber})</strong> dengan format pesan yang sudah terisi otomatis. Tim kami akan segera membalas rincian biaya, jadwal kelas terdekat, dan modul belajar.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-600/25 transition-all hover:scale-[1.01] hover:shadow-emerald-600/40 active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Menyiapkan WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5 fill-white" />
                        <span>Kirim Pendaftaran &amp; Hubungkan ke WhatsApp</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Contact & Program Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Hotline WhatsApp Resmi</span>
              </h3>

              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 mb-4">
                <p className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider">
                  Admin Pendaftaran &amp; Konsultasi
                </p>
                <p className="text-lg font-extrabold text-emerald-700 mt-0.5">
                  {officialWaNumber}
                </p>
                <p className="text-xs text-emerald-800/80 mt-1">
                  Respon cepat pada jam operasional: Senin – Sabtu, 08:30 – 17:30 WIB.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Alamat Kantor:</strong>
                    <span>Jl. Ternak II No. 39, Medan Polonia, Kota Medan</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Email Resmi:</strong>
                    <a
                      href="mailto:Ichliebedeutschmedan@gmail.com"
                      className="text-sky-600 hover:underline"
                    >
                      Ichliebedeutschmedan@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose ILD Card */}
            <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50/80 to-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-sky-950 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Keunggulan Belajar di ILD</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Metode Intensif &amp; Teruji:</strong> Fokus penguasaan 4 keterampilan (Membaca, Menulis, Mendengar, Berbicara).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pengajar Berpengalaman:</strong> Sertifikasi resmi Goethe-Institut dengan pengalaman langsung di Jerman.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pendampingan Karir:</strong> Konsultasi kontrak Ausbildung, Au Pair, FSJ, dan simulasi wawancara visa.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Kelas Fleksibel:</strong> Tersedia kelas tatap muka di Medan dan kelas daring interaktif.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success / Redirect Modal fallback */}
      {submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-fade-up">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Pendaftaran Berhasil Dikirim!</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Terima kasih, <strong>{submittedData.formSnapshot.nama}</strong>! Data pendaftaran Anda untuk{" "}
              <strong>Level {submittedData.formSnapshot.levelBahasa}</strong> telah kami terima dan langsung dihubungkan ke WhatsApp admin kami.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-left text-xs space-y-1.5 text-slate-700">
              <p>
                <strong>Nama:</strong> {submittedData.formSnapshot.nama}
              </p>
              <p>
                <strong>Alamat:</strong> {submittedData.formSnapshot.alamat}
              </p>
              <p>
                <strong>Umur:</strong> {submittedData.formSnapshot.umur} Tahun
              </p>
              <p>
                <strong>Ijazah Terakhir:</strong> {submittedData.formSnapshot.ijazahTerakhir}
              </p>
              <p>
                <strong>Level Bahasa Jerman:</strong> Level {submittedData.formSnapshot.levelBahasa}
              </p>
              <p>
                <strong>Nomor WhatsApp:</strong> {submittedData.formSnapshot.whatsapp}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={submittedData.waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 transition-all cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Buka WhatsApp Sekarang</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="w-full sm:w-auto rounded-2xl border border-slate-200 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
