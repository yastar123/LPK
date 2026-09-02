import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
} from "lucide-react";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/tentang-kami")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Profil lengkap Ich Liebe Deutsch Medan: sejarah, visi, profil pendiri alumni UNIMED & Ausbildung Jerman, serta filosofi pembelajaran.",
      },
      { property: "og:title", content: "Tentang Kami — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "“Deutsch lernen. Deutschland verstehen. Zukunft gestalten.” Lembaga kursus bahasa Jerman resmi di Medan sejak 2024.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TentangKami,
});

function TentangKami() {
  const { cms } = useCms();
  const tk = cms.tentangKami;
  const k = cms.kontak;
  const waLink = `https://wa.me/${k.hotlineWA.replace(/[^0-9]/g, "")}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.`;

  return (
    <main className="bg-slate-50/50">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden bg-white border-b border-sky-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.12),rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              <span>{tk.heroBadge || "Profil Lembaga & Perjalanan Kami"}</span>
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {tk.heroTitle || "Tentang Ich Liebe Deutsch Medan"}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              {tk.heroSubtitle ||
                "Lembaga kursus bahasa Jerman berizin resmi yang hadir untuk mendidik, membimbing, dan mempersiapkan generasi muda Indonesia menghadapi kehidupan nyata di Jerman."}
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah & Komitmen */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Sejarah & Komitmen
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                Berdiri Sejak 2024 dengan Izin Operasional Resmi
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                {tk.storyParagraphs && tk.storyParagraphs.length > 0 ? (
                  tk.storyParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                ) : (
                  <p>
                    Ich Liebe Deutsch Medan merupakan lembaga kursus bahasa Jerman yang berizin
                    resmi dan berkomitmen membimbing generasi muda menuju Jerman.
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                  <BadgeCheck className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Legalitas & Terdaftar Resmi
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Memiliki izin operasional pendidikan resmi untuk bimbingan kursus & studi.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                  <GraduationCap className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Fondasi Akademik Kuat</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Pengajar dan kurikulum berlatar belakang Pendidikan Bahasa Jerman UNIMED &
                      sertifikasi Jerman.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 p-8 shadow-lg shadow-sky-950/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-500/20">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Profil Pendiri Lembaga</h3>
                    <p className="text-xs text-sky-600 font-medium">
                      Alumni UNIMED & Praktisi Ausbildung Jerman (6 Tahun)
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-slate-600">
                  <p>
                    Ich Liebe Deutsch Medan didirikan oleh seorang{" "}
                    <strong>
                      Sarjana Pendidikan Bahasa Jerman Universitas Negeri Medan (UNIMED)
                    </strong>{" "}
                    yang memiliki pengalaman tinggal dan menjalani kehidupan di Jerman selama kurang
                    lebih <strong>6 tahun</strong>.
                  </p>
                  <p>
                    Selama berada di Jerman, pendiri tidak hanya memperoleh pengalaman akademik dan
                    budaya, tetapi juga{" "}
                    <strong>
                      menjalani Ausbildung dan berhasil menyelesaikannya pada tahun 2020 dengan
                      hasil yang sangat memuaskan
                    </strong>
                    .
                  </p>
                  <p>
                    Pengalaman tersebut menjadi salah satu fondasi utama dalam membangun sistem
                    pembelajaran yang tidak hanya berorientasi pada kemampuan bahasa, tetapi juga
                    pada kesiapan siswa menghadapi kehidupan nyata di Jerman.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Inti (Core Values) */}
      {tk.values && tk.values.length > 0 && (
        <section className="py-20 bg-slate-50 border-y border-sky-100/80">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Prinsip Utama
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                Nilai & Standar Lembaga
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tk.values.map((v, i) => (
                <div
                  key={v.id || i}
                  className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 mb-4 font-bold text-sm">
                      0{i + 1}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filosofi Belajar & Pelatihan Khusus */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl border border-sky-100 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Filosofi Pembelajaran Kami</h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-4">
                Bagi kami, belajar bahasa Jerman bukan sekadar menguasai tata bahasa dan
                menghafalkan kosakata. Kemampuan bahasa merupakan salah satu bekal penting untuk
                dapat berkomunikasi, beradaptasi, belajar, dan bekerja secara mandiri di lingkungan
                masyarakat Jerman.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                Oleh karena itu, <strong>Ich Liebe Deutsch Medan</strong> tidak hanya berfokus pada
                menyalurkan atau mengantarkan siswa menuju Jerman, tetapi juga berkomitmen untuk
                membimbing dan mempersiapkan siswa agar mampu menjalani kehidupan di Jerman secara
                mandiri dan percaya diri.
              </p>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Pelatihan Khusus Pemegang Kontrak Kerja
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-4">
                Khusus bagi kandidat Ausbildung yang telah memperoleh kontrak kerja (
                <strong>Ausbildungsvertrag</strong>), Ich Liebe Deutsch Medan memberikan pelatihan
                dan pendampingan yang disesuaikan dengan bidang Ausbildung yang akan dijalani.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                Kandidat tidak hanya dipersiapkan dari sisi kemampuan bahasa Jerman secara umum,
                tetapi juga dilatih dengan kosakata, ungkapan, situasi komunikasi, serta
                istilah-istilah yang relevan dengan bidang pekerjaan mereka. Dengan demikian, siswa
                memiliki kesempatan untuk mengenal lingkungan kerja dan istilah profesinya sejak
                sebelum berangkat ke Jerman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Kami */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 p-8 sm:p-14 text-white shadow-xl">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 mb-6 border border-sky-400/30">
                <Target className="h-4 w-4" />
                <span>Visi & Misi Lembaga</span>
              </div>

              <blockquote className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-white italic mb-4">
                {tk.vision
                  ? `“${tk.vision}”`
                  : "“Deutsch lernen. Deutschland verstehen. Zukunft gestalten.”"}
              </blockquote>

              {tk.mission && tk.mission.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4">
                    Misi Utama Kami:
                  </h4>
                  <ul className="space-y-3">
                    {tk.mission.map((m, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/30 text-sky-300 text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Kontak Kami */}
      <section className="py-20 bg-slate-50 border-t border-sky-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Konsultasi & Informasi
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                Hubungi Lembaga Kami
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Silakan datang langsung ke kantor kami di Medan atau hubungi via WhatsApp untuk
                konsultasi pemilihan program yang tepat.
              </p>
              <div className="mt-6">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:bg-sky-500"
                >
                  <span>Mulai Chat WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Alamat Kantor</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{k.officeAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">WhatsApp / Telepon</h4>
                  <p className="text-xs text-slate-600 mt-1">{k.hotlineWA}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Email Resmi</h4>
                  <p className="text-xs text-slate-600 mt-1">{k.emailOffice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
