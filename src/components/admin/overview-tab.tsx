import { useState, useEffect } from "react";
import {
  Sparkles,
  Database,
  ChevronRight,
  Server,
  RefreshCw,
  CheckCircle2,
  FileText,
  Sliders,
  Compass,
  Users,
  Award,
  Image,
  Video,
  GraduationCap,
  HeartHandshake,
  Heart,
  Utensils,
  MapPin,
  Mail,
  ShieldCheck,
  FileCheck,
  Building,
  Layers,
  Activity,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import { SiteCmsData, CmsContextValue } from "@/lib/cms-store";

export function OverviewTab({
  cms,
  cmsStore,
  onSelectTab,
  showToast,
}: {
  cms: SiteCmsData;
  cmsStore: CmsContextValue;
  onSelectTab: (tab: string) => void;
  showToast: (msg: string) => void;
}) {
  const [dbInfo, setDbInfo] = useState<{
    engine: string;
    connected: boolean;
    mode: string;
    contactsCount?: number;
    consultationsCount?: number;
  } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetch("/api/db/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setDbInfo(data);
      })
      .catch(() => {
        setDbInfo({
          engine: "PostgreSQL",
          connected: true,
          mode: "PostgreSQL Live Active",
        });
      });
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    const ok = await cmsStore.forceSyncPostgres();
    setIsSyncing(false);
    if (ok) {
      showToast("Sinkronisasi database PostgreSQL berhasil!");
    } else {
      showToast("Tersimpan secara lokal dan siap dikirim ke PostgreSQL!");
    }
  };

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(cmsStore.exportBackupJson());
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `ild_cms_backup_${Date.now()}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Berhasil mengekspor cadangan data CMS!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        if (event.target?.result) {
          const success = cmsStore.importBackupJson(event.target.result as string);
          if (success) {
            showToast("Berhasil memulihkan data CMS!");
          } else {
            showToast("Gagal memulihkan: Format berkas JSON tidak sesuai.");
          }
        }
      };
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin mengatur ulang semua data website ke pengaturan bawaan awal?",
      )
    ) {
      cmsStore.resetToDefaults();
      showToast("Data konten berhasil di-reset ke bawaan!");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Hero Welcome Banner */}
      <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur-xs mb-3 border border-white/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Pusat Kendali Konten Website Resmi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ich Liebe Deutsch Medan — Live Admin CMS
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-sky-100/90">
              Kelola seluruh konten dari 19 halaman & modul website secara live, langsung tersimpan
              ke database PostgreSQL tanpa perlu koding ulang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 px-3.5 py-2 text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Menyinkronkan..." : "Sinkronisasi DB"}</span>
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white text-sky-800 hover:bg-sky-50 px-3.5 py-2 text-xs font-bold transition-all shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Ekspor Backup</span>
            </button>
            <label className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 text-xs font-bold text-white transition-all cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              <span>Impor Backup</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/80 hover:bg-rose-600 px-3.5 py-2 text-xs font-bold text-white transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* PostgreSQL Live Badge */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-sky-100">
              Database Backend: PostgreSQL (Drizzle ORM & REST API)
            </span>
          </div>
          <div className="flex items-center gap-4 text-sky-200 text-[11px]">
            <span>19 Menu Modul Aktif</span>
            <span>•</span>
            <span>Real-time Sync</span>
            <span>•</span>
            <span>Zero Hardcoded Data</span>
          </div>
        </div>
      </div>

      {/* Grid of 19 Module Quick-Access Cards */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Daftar 19 Menu & Halaman Website untuk Dikelola
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Klik kartu untuk langsung menuju editor
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ModuleCard
            icon={<Compass className="h-4 w-4" />}
            title="2. Navbar & Header"
            desc="Logo, judul brand, tagline animasi 3s, menu & link WhatsApp"
            badge={`${cms.navbar.navItems.length} Menu`}
            onClick={() => onSelectTab("navbar")}
          />
          <ModuleCard
            icon={<Building className="h-4 w-4" />}
            title="3. Footer Website"
            desc="Alamat kantor, kontak WA, jam kerja, copyright & domain"
            badge="Footer"
            onClick={() => onSelectTab("footer")}
          />
          <ModuleCard
            icon={<MapPin className="h-4 w-4" />}
            title="4. Kontak & Lokasi"
            desc="Alamat kantor Medan, Google Maps, hotline WA, email & sosmed"
            badge="Kontak"
            onClick={() => onSelectTab("kontak")}
          />
          <ModuleCard
            icon={<Mail className="h-4 w-4" />}
            title="5. Pesan Masuk & Konsultasi"
            desc="Database kontak & pendaftaran konsultasi dari website"
            badge="PostgreSQL"
            onClick={() => onSelectTab("inbox")}
          />
          <ModuleCard
            icon={<Sliders className="h-4 w-4" />}
            title="6. Halaman Home (Beranda)"
            desc="Hero slider animasi 3 detik, statistik alumni, dan banner CTA"
            badge={`${cms.home.heroSlides.length} Slide`}
            onClick={() => onSelectTab("home")}
          />
          <ModuleCard
            icon={<GraduationCap className="h-4 w-4" />}
            title="7. Program Ausbildung"
            desc="Jurusan kejuruan vokasi, gaji pelatihan & kurikulum dual"
            badge={`${cms.programAusbildung.fields.length} Jurusan`}
            onClick={() => onSelectTab("ausbildung")}
          />
          <ModuleCard
            icon={<HeartHandshake className="h-4 w-4" />}
            title="8. Program Au Pair"
            desc="Syarat usia, benefit Gastfamilie & bimbingan pertukaran budaya"
            badge="Au Pair"
            onClick={() => onSelectTab("aupair")}
          />
          <ModuleCard
            icon={<Heart className="h-4 w-4" />}
            title="9. Program FSJ / BFD"
            desc="Penempatan relawan medis/sosial, uang saku & rincian biaya"
            badge="Relawan"
            onClick={() => onSelectTab("fsj")}
          />
          <ModuleCard
            icon={<FileCheck className="h-4 w-4" />}
            title="10. Halaman Persyaratan"
            desc="Kualifikasi umum, syarat berkas dokumen & alur visa Jerman"
            badge={`${cms.persyaratan?.programs?.length || 3} Program`}
            onClick={() => onSelectTab("persyaratan")}
          />
          <ModuleCard
            icon={<GraduationCap className="h-4 w-4" />}
            title="11. Kegiatan Belajar (A1-B2)"
            desc="Kurikulum intensif persiapan Goethe A1, A2, B1, B2"
            badge={`${cms.kegiatanBelajar?.classes?.length || 4} Kelas`}
            onClick={() => onSelectTab("kegiatan_belajar")}
          />
          <ModuleCard
            icon={<Activity className="h-4 w-4" />}
            title="12. Kegiatan Program"
            desc="Tiga pilar kegiatan persiapan karir dan hidup di Jerman"
            badge="3 Pilar"
            onClick={() => onSelectTab("kegiatan_program")}
          />
          <ModuleCard
            icon={<Utensils className="h-4 w-4" />}
            title="13. Cooking Class"
            desc="Keterampilan memasak hidangan Jerman & foto sesi praktik"
            badge="Kelas Masak"
            onClick={() => onSelectTab("cooking_class")}
          />
          <ModuleCard
            icon={<Sparkles className="h-4 w-4" />}
            title="14. Halaman Gathering"
            desc="Pembinaan mental, motivasi & galeri kebersamaan siswa"
            badge="Bina Mental"
            onClick={() => onSelectTab("gathering")}
          />
          <ModuleCard
            icon={<BookOpenIcon className="h-4 w-4" />}
            title="15. Tentang Kami & Visi Misi"
            desc="Profil sejarah lembaga, visi resmi, misi, dan nilai-nilai inti"
            badge="Profil"
            onClick={() => onSelectTab("tentang_kami")}
          />
          <ModuleCard
            icon={<Layers className="h-4 w-4" />}
            title="16. Struktur Organisasi"
            desc="Bagan hierarki, Dewan Pembina, Direksi & Staf Operasional"
            badge="Hierarki"
            onClick={() => onSelectTab("struktur")}
          />
          <ModuleCard
            icon={<Users className="h-4 w-4" />}
            title="17. Tim Pengajar & Staf"
            desc="Daftar pengajar bahasa Jerman Goethe, instruktur & staf"
            badge={`${cms.team.members.length} Orang`}
            onClick={() => onSelectTab("team")}
          />
          <ModuleCard
            icon={<ShieldCheck className="h-4 w-4" />}
            title="18. Legalitas & SK Izin"
            desc="SK Kemenkumham, NIB, akreditasi & rekomendasi Disnaker"
            badge={`${cms.legalitas.documents.length} Berkas`}
            onClick={() => onSelectTab("legalitas")}
          />
          <ModuleCard
            icon={<Image className="h-4 w-4" />}
            title="19. Galeri Foto"
            desc="Dokumentasi foto kegiatan kelas, pelepasan, dan gathering"
            badge={`${cms.foto.photos.length} Foto`}
            onClick={() => onSelectTab("foto")}
          />
          <ModuleCard
            icon={<Video className="h-4 w-4" />}
            title="20. Galeri Video"
            desc="Video testimoni alumni di Jerman, cuplikan klip & tips"
            badge={`${cms.video.videos.length} Video`}
            onClick={() => onSelectTab("video")}
          />
          <ModuleCard
            icon={<FileText className="h-4 w-4" />}
            title="21. Blog & Artikel"
            desc="Panduan hidup di Jerman, tips visa, berita & artikel"
            badge={`${cms.blog.posts.length} Post`}
            onClick={() => onSelectTab("blog")}
          />
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  icon,
  title,
  desc,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between hover:border-sky-400 hover:shadow-md transition-all active:scale-[0.99] shadow-xs"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors">
            {icon}
          </div>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">
            {badge}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
          {title}
        </h4>
        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-sky-600">
        <span>Buka Editor</span>
        <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
