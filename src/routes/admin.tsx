import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Compass,
  Sliders,
  FileText,
  Users,
  Image as ImageIcon,
  Award,
  Phone,
  Building,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Layers,
  GraduationCap,
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  MapPin,
  Mail,
  ShieldCheck,
  FileCheck,
  HeartHandshake,
  Heart,
  Utensils,
  Video,
  Activity,
  BookOpen,
  LogOut,
} from "lucide-react";
import {
  useCms,
  HeroSlide,
  BlogPostItem,
  TeamMemberItem,
  LegalDocumentItem,
  GalleryPhotoItem,
  LearningClassItem,
  NavItem,
  CmsContextValue,
  FooterConfig,
  AusbildungFieldItem,
} from "@/lib/cms-store";

// Import Modular Tabs
import { OverviewTab } from "@/components/admin/overview-tab";
import { PersyaratanCrudTab } from "@/components/admin/persyaratan-tab";
import { CookingClassCrudTab } from "@/components/admin/cooking-class-tab";
import { GatheringCrudTab } from "@/components/admin/gathering-tab";
import { KegiatanProgramCrudTab } from "@/components/admin/kegiatan-program-tab";
import { VideoCrudTab } from "@/components/admin/video-tab";
import { KontakCrudTab } from "@/components/admin/kontak-tab";
import { InboxCrudTab } from "@/components/admin/inbox-tab";
import { TentangKamiCrudTab } from "@/components/admin/tentang-tab";
import { StrukturCrudTab } from "@/components/admin/struktur-tab";
import { AupairCrudTab } from "@/components/admin/aupair-tab";
import { FsjCrudTab } from "@/components/admin/fsj-tab";
import { BlogCrudTab } from "@/components/admin/blog-tab";
import { ImageUploader, BulkImageUploader } from "@/components/ui/device-media-uploader";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard CMS — Ich Liebe Deutsch Medan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

export type TabKey =
  | "overview"
  | "navbar"
  | "footer"
  | "kontak"
  | "inbox"
  | "home"
  | "ausbildung"
  | "aupair"
  | "fsj"
  | "persyaratan"
  | "kegiatan_belajar"
  | "kegiatan_program"
  | "cooking_class"
  | "gathering"
  | "tentang_kami"
  | "struktur"
  | "team"
  | "legalitas"
  | "foto"
  | "video"
  | "blog";

function AdminDashboard() {
  const navigate = useNavigate();
  const cmsStore = useCms();
  const { cms } = cmsStore;
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  // Sidebar default open on desktop, togglable
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [sessionUser, setSessionUser] = useState<{
    email: string;
    name: string;
    role: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem("admin_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_session");
    if (!saved) {
      navigate({ to: "/login" });
    } else {
      try {
        setSessionUser(JSON.parse(saved));
      } catch {
        navigate({ to: "/login" });
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    navigate({ to: "/login" });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-emerald-600 text-white px-5 py-3.5 font-semibold text-sm shadow-xl shadow-emerald-900/20 animate-fade-in border border-emerald-500">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-screen">
        {/* Sidebar Tabs Navigation (19+ Menus) */}
        {isSidebarOpen && (
          <aside className="w-full md:w-72 lg:w-80 bg-white border-r border-slate-200 p-3 sm:p-4 shrink-0 flex flex-col overflow-y-auto no-scrollbar space-y-1.5 transition-all duration-300 shadow-xs z-30 max-h-screen sticky top-0">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden p-0.5">
                  <img
                    src="/logo.png"
                    alt="Ich Liebe Deutsch Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xs font-bold text-slate-900 leading-tight">Admin CMS</h1>
                  <p className="text-[10px] text-slate-500">Ich Liebe Deutsch Medan</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  to="/"
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-50 border border-sky-200 px-2 py-1 text-[10px] font-bold text-sky-700 hover:bg-sky-100 transition-colors"
                  title="Buka Website Utama"
                >
                  <span>Web</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-100 border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  title="Tutup Sidebar"
                >
                  <PanelLeftClose className="h-3.5 w-3.5 text-slate-500" />
                  <span>Tutup</span>
                </button>
              </div>
            </div>

            {/* RBAC Session Active User Card */}
            <div className="mb-2 rounded-xl bg-slate-900 p-3 text-white border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="h-3 w-3" />
                  <span>RBAC: {sessionUser?.role?.toUpperCase() || "ADMIN"}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors"
                  title="Keluar / Logout"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Keluar</span>
                </button>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-100 truncate">
                  {sessionUser?.name || "Administrator"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {sessionUser?.email || "admin@acc.co.id"}
                </p>
              </div>
            </div>

            {/* GROUP 1: Navigasi & Global */}
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigasi & Global
            </div>

            <SidebarButton
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="1. Ringkasan Data"
              isActive={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />

            <SidebarButton
              icon={<Compass className="h-4 w-4" />}
              label="2. Navbar & Header"
              badge="Header"
              isActive={activeTab === "navbar"}
              onClick={() => setActiveTab("navbar")}
            />

            <SidebarButton
              icon={<Building className="h-4 w-4" />}
              label="3. Footer Website"
              badge="Footer"
              isActive={activeTab === "footer"}
              onClick={() => setActiveTab("footer")}
            />

            <SidebarButton
              icon={<MapPin className="h-4 w-4" />}
              label="4. Kontak & Lokasi"
              badge="Kantor"
              isActive={activeTab === "kontak"}
              onClick={() => setActiveTab("kontak")}
            />

            <SidebarButton
              icon={<Mail className="h-4 w-4" />}
              label="5. Pesan Masuk & Konsultasi"
              badge="PostgreSQL"
              isActive={activeTab === "inbox"}
              onClick={() => setActiveTab("inbox")}
            />

            {/* GROUP 2: Halaman Utama & Program */}
            <div className="pt-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Halaman Utama & Program
            </div>

            <SidebarButton
              icon={<Sliders className="h-4 w-4" />}
              label="6. Halaman Home (Beranda)"
              badge={`${cms.home.heroSlides.length} Slide`}
              isActive={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />

            <SidebarButton
              icon={<GraduationCap className="h-4 w-4" />}
              label="7. Program Ausbildung"
              badge="Vokasi"
              isActive={activeTab === "ausbildung"}
              onClick={() => setActiveTab("ausbildung")}
            />

            <SidebarButton
              icon={<HeartHandshake className="h-4 w-4" />}
              label="8. Program Au Pair"
              badge="Au Pair"
              isActive={activeTab === "aupair"}
              onClick={() => setActiveTab("aupair")}
            />

            <SidebarButton
              icon={<Heart className="h-4 w-4" />}
              label="9. Program FSJ / BFD"
              badge="Relawan"
              isActive={activeTab === "fsj"}
              onClick={() => setActiveTab("fsj")}
            />

            <SidebarButton
              icon={<FileCheck className="h-4 w-4" />}
              label="10. Halaman Persyaratan"
              badge="Syarat"
              isActive={activeTab === "persyaratan"}
              onClick={() => setActiveTab("persyaratan")}
            />

            {/* GROUP 3: Kegiatan & Pembekalan */}
            <div className="pt-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Kegiatan & Pembekalan
            </div>

            <SidebarButton
              icon={<GraduationCap className="h-4 w-4" />}
              label="11. Kegiatan Belajar (A1-B2)"
              badge={`${cms.kegiatanBelajar?.classes?.length || 4} Kelas`}
              isActive={activeTab === "kegiatan_belajar"}
              onClick={() => setActiveTab("kegiatan_belajar")}
            />

            <SidebarButton
              icon={<Activity className="h-4 w-4" />}
              label="12. Kegiatan Program"
              badge="3 Pilar"
              isActive={activeTab === "kegiatan_program"}
              onClick={() => setActiveTab("kegiatan_program")}
            />

            <SidebarButton
              icon={<Utensils className="h-4 w-4" />}
              label="13. Cooking Class"
              badge="Masak"
              isActive={activeTab === "cooking_class"}
              onClick={() => setActiveTab("cooking_class")}
            />

            <SidebarButton
              icon={<Sparkles className="h-4 w-4" />}
              label="14. Halaman Gathering"
              badge="Bina Mental"
              isActive={activeTab === "gathering"}
              onClick={() => setActiveTab("gathering")}
            />

            {/* GROUP 4: Profil, Tim & Media */}
            <div className="pt-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Profil, Tim & Media
            </div>

            <SidebarButton
              icon={<BookOpen className="h-4 w-4" />}
              label="15. Tentang Kami & Visi Misi"
              badge="Profil"
              isActive={activeTab === "tentang_kami"}
              onClick={() => setActiveTab("tentang_kami")}
            />

            <SidebarButton
              icon={<Layers className="h-4 w-4" />}
              label="16. Struktur Organisasi"
              badge="Bagan"
              isActive={activeTab === "struktur"}
              onClick={() => setActiveTab("struktur")}
            />

            <SidebarButton
              icon={<Users className="h-4 w-4" />}
              label="17. Tim Pengajar & Staf"
              badge={`${cms.team.members.length} Orang`}
              isActive={activeTab === "team"}
              onClick={() => setActiveTab("team")}
            />

            <SidebarButton
              icon={<ShieldCheck className="h-4 w-4" />}
              label="18. Legalitas & SK Izin"
              badge={`${cms.legalitas.documents.length} Berkas`}
              isActive={activeTab === "legalitas"}
              onClick={() => setActiveTab("legalitas")}
            />

            <SidebarButton
              icon={<ImageIcon className="h-4 w-4" />}
              label="19. Galeri Foto"
              badge={`${cms.foto.photos.length} Foto`}
              isActive={activeTab === "foto"}
              onClick={() => setActiveTab("foto")}
            />

            <SidebarButton
              icon={<Video className="h-4 w-4" />}
              label="20. Galeri Video"
              badge={`${cms.video.videos.length} Video`}
              isActive={activeTab === "video"}
              onClick={() => setActiveTab("video")}
            />

            <SidebarButton
              icon={<FileText className="h-4 w-4" />}
              label="21. Blog & Artikel"
              badge={`${cms.blog.posts.length} Post`}
              isActive={activeTab === "blog"}
              onClick={() => setActiveTab("blog")}
            />
          </aside>
        )}

        {/* Dynamic Full-Width Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto no-scrollbar w-full min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs active:scale-95"
              title={isSidebarOpen ? "Tutup Sidebar Menu" : "Buka Sidebar Menu (19 Menu)"}
            >
              {isSidebarOpen ? (
                <>
                  <PanelLeftClose className="h-4 w-4 text-slate-500" />
                  <span>Sembunyikan Sidebar</span>
                </>
              ) : (
                <>
                  <PanelLeftOpen className="h-4 w-4 text-sky-600" />
                  <span className="text-sky-700 font-bold">Buka Menu Sidebar (19 Menu)</span>
                </>
              )}
            </button>
          </div>

          {/* Tab Renderers */}
          {activeTab === "overview" && (
            <OverviewTab
              cms={cms}
              cmsStore={cmsStore}
              onSelectTab={(tab) => setActiveTab(tab)}
              showToast={showToast}
            />
          )}

          {activeTab === "navbar" && (
            <NavbarCrudTab
              cmsStore={cmsStore}
              onSave={() => showToast("Navbar & Header berhasil disimpan!")}
            />
          )}

          {activeTab === "footer" && (
            <FooterCrudTab
              cmsStore={cmsStore}
              onSave={() => showToast("Footer Website berhasil disimpan!")}
            />
          )}

          {activeTab === "kontak" && <KontakCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "inbox" && <InboxCrudTab showToast={showToast} />}

          {activeTab === "home" && <HeroSliderCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "ausbildung" && (
            <AusbildungCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "aupair" && <AupairCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "fsj" && <FsjCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "persyaratan" && (
            <PersyaratanCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "kegiatan_belajar" && (
            <LearningClassesCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "kegiatan_program" && (
            <KegiatanProgramCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "cooking_class" && (
            <CookingClassCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "gathering" && (
            <GatheringCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "tentang_kami" && (
            <TentangKamiCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "struktur" && (
            <StrukturCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "team" && <TeamCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "legalitas" && (
            <LegalitasCrudTab cmsStore={cmsStore} showToast={showToast} />
          )}

          {activeTab === "foto" && <GaleriFotoCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "video" && <VideoCrudTab cmsStore={cmsStore} showToast={showToast} />}

          {activeTab === "blog" && <BlogCrudTab cmsStore={cmsStore} showToast={showToast} />}
        </main>
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT: Sidebar Button
   ========================================================================= */
function SidebarButton({
  icon,
  label,
  badge,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap md:whitespace-normal ${
        isActive
          ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={isActive ? "text-white" : "text-sky-600"}>{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/* =========================================================================
   TAB: NAVBAR CRUD
   ========================================================================= */
function NavbarCrudTab({ cmsStore, onSave }: { cmsStore: CmsContextValue; onSave: () => void }) {
  const navbar = cmsStore.cms.navbar;
  const [logoUrl, setLogoUrl] = useState(navbar.logoUrl || "/logo.png");
  const [brandTitle, setBrandTitle] = useState(navbar.brandTitle || "Ich Liebe Deutsch");
  const [brandSubtitle, setBrandSubtitle] = useState(
    navbar.brandSubtitle || "Medan • German Pathway",
  );
  const [taglines, setTaglines] = useState<string[]>(navbar.taglines || []);
  const [newTagline, setNewTagline] = useState("");
  const [ctaLabel, setCtaLabel] = useState(navbar.ctaButton?.label || "Konsultasi WA");
  const [ctaHref, setCtaHref] = useState(navbar.ctaButton?.href || "");
  const [navItems, setNavItems] = useState<NavItem[]>(navbar.navItems || []);

  const [newItemLabel, setNewItemLabel] = useState("");
  const [newItemHref, setNewItemHref] = useState("");

  const handleSaveNavbar = () => {
    cmsStore.updateNavbar({
      logoUrl,
      brandTitle,
      brandSubtitle,
      taglines,
      ctaButton: {
        label: ctaLabel,
        href: ctaHref,
        isExternal: true,
      },
      navItems,
    });
    onSave();
  };

  const addTagline = () => {
    if (!newTagline.trim()) return;
    setTaglines([...taglines, newTagline.trim()]);
    setNewTagline("");
  };

  const removeTagline = (idx: number) => {
    setTaglines(taglines.filter((_, i) => i !== idx));
  };

  const addNavItem = () => {
    if (!newItemLabel.trim()) return;
    setNavItems([
      ...navItems,
      {
        id: `nav-${Date.now()}`,
        label: newItemLabel.trim(),
        href: newItemHref.trim() || "/",
      },
    ]);
    setNewItemLabel("");
    setNewItemHref("");
  };

  const removeNavItem = (id: string) => {
    setNavItems(navItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pengaturan Navbar & Header</h2>
          <p className="text-xs text-slate-500">
            Ubah logo, judul brand, tagline animasi berganti 3 detik, tombol WhatsApp, dan daftar
            menu.
          </p>
        </div>
        <button
          onClick={handleSaveNavbar}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Perubahan Navbar</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Compass className="h-4 w-4 text-sky-600" />
            <span>Identitas Logo & Nama Brand</span>
          </h3>

          <ImageUploader
            label="Logo Website (Upload dari HP/Laptop atau URL)"
            value={logoUrl}
            onChange={setLogoUrl}
            aspectRatio="square"
            placeholderText="Upload File Logo Website (PNG, SVG, JPG)"
            helperText="Gunakan gambar transparan resolusi tinggi (PNG/SVG) untuk hasil terbaik."
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Brand Utama
            </label>
            <input
              type="text"
              value={brandTitle}
              onChange={(e) => setBrandTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Subtitle Brand
            </label>
            <input
              type="text"
              value={brandSubtitle}
              onChange={(e) => setBrandSubtitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-sky-600" />
            <span>Tagline Animasi Header (Berganti setiap 3 detik)</span>
          </h3>

          <p className="text-xs text-slate-500">
            Teks ini otomatis berotasi di samping logo header setiap 3 detik sekali.
          </p>

          <div className="space-y-2">
            {taglines.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  <span className="font-semibold text-slate-800">{tag}</span>
                </div>
                <button
                  onClick={() => removeTagline(idx)}
                  className="text-rose-600 hover:text-rose-700 p-1"
                  title="Hapus"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              placeholder="Tambah teks tagline baru..."
              onKeyDown={(e) => e.key === "Enter" && addTagline()}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <button
              onClick={addTagline}
              className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-100"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah</span>
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Phone className="h-4 w-4 text-sky-600" />
          <span>Tombol CTA Header (Konsultasi WhatsApp)</span>
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Label Tombol
            </label>
            <input
              type="text"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Link WhatsApp / URL
            </label>
            <input
              type="text"
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Compass className="h-4 w-4 text-sky-600" />
          <span>Struktur Menu Navigasi Utama</span>
        </h3>

        <div className="space-y-2">
          {navItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 gap-3"
            >
              <div>
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <span>{item.label}</span>
                  <span className="text-[10px] font-normal text-slate-500 font-mono">
                    ({item.href || "Dropdown"})
                  </span>
                </div>
                {item.children && item.children.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-2 border-l border-slate-300">
                    {item.children.map((child, cIdx) => (
                      <span
                        key={cIdx}
                        className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium"
                      >
                        {child.label} → {child.href}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => removeNavItem(item.id)}
                  className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  title="Hapus Menu"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-200 grid gap-2 sm:grid-cols-3">
          <input
            type="text"
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            placeholder="Label Menu Baru (cth: FAQ)"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
          <input
            type="text"
            value={newItemHref}
            onChange={(e) => setNewItemHref(e.target.value)}
            placeholder="Path URL (cth: /faq)"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
          <button
            onClick={addNavItem}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-50 border border-sky-200 px-4 py-2 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: FOOTER CRUD
   ========================================================================= */
function FooterCrudTab({ cmsStore, onSave }: { cmsStore: CmsContextValue; onSave: () => void }) {
  const footer = cmsStore.cms.footer;
  const [formData, setFormData] = useState<FooterConfig>({ ...footer });

  const handleChange = <K extends keyof FooterConfig>(field: K, val: FooterConfig[K]) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    cmsStore.updateFooter(formData);
    onSave();
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pengaturan Footer & Informasi Kontak</h2>
          <p className="text-xs text-slate-500">
            Perbarui alamat kantor Medan, nomor WhatsApp, email, jam kerja, dan copyright.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Perubahan Footer</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="h-4 w-4 text-sky-600" />
            <span>Deskripsi & Badge Lembaga</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deskripsi Singkat Footer
            </label>
            <textarea
              rows={3}
              value={formData.brandDesc || ""}
              onChange={(e) => handleChange("brandDesc", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Teks Badge Legalitas
            </label>
            <input
              type="text"
              value={formData.badgeText || ""}
              onChange={(e) => handleChange("badgeText", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Teks Hak Cipta (Copyright)
            </label>
            <input
              type="text"
              value={formData.copyrightText || ""}
              onChange={(e) => handleChange("copyrightText", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Domain Resmi
            </label>
            <input
              type="text"
              value={formData.domainText || ""}
              onChange={(e) => handleChange("domainText", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Phone className="h-4 w-4 text-sky-600" />
            <span>Kontak & Lokasi Kantor</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Alamat Lengkap Kantor
            </label>
            <textarea
              rows={3}
              value={formData.officeAddress || ""}
              onChange={(e) => handleChange("officeAddress", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={formData.whatsapp || ""}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nomor Telepon
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Resmi</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Jam Operasional
            </label>
            <input
              type="text"
              value={formData.operatingHours || ""}
              onChange={(e) => handleChange("operatingHours", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: HERO SLIDER & STATS CRUD (HOME)
   ========================================================================= */
function HeroSliderCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const slides = cmsStore.cms.home.heroSlides || [];
  const stats = cmsStore.cms.home.stats || [];

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [statsData, setStatsData] = useState([...stats]);

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingSlide({
      id: `slide-${Date.now()}`,
      title: "",
      subheading: "",
      description: "",
      image: "/logo.png",
      button1: { label: "INFO PROGRAM", href: "/program-ausbildung" },
      button2: { label: "KONSULTASI WA", href: "https://wa.me/6281265965231", isExternal: true },
    });
  };

  const handleSaveSlide = () => {
    if (!editingSlide || !editingSlide.title.trim()) return;
    if (isCreating) {
      cmsStore.addHeroSlide(editingSlide);
      showToast("Slide baru berhasil ditambahkan!");
    } else {
      cmsStore.updateHeroSlide(editingSlide.id, editingSlide);
      showToast("Slide berhasil diperbarui!");
    }
    setEditingSlide(null);
    setIsCreating(false);
  };

  const handleDeleteSlide = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus slide ini?")) {
      cmsStore.deleteHeroSlide(id);
      showToast("Slide berhasil dihapus!");
    }
  };

  const handleSaveStats = () => {
    cmsStore.updateSection("home", {
      ...cmsStore.cms.home,
      stats: statsData,
    });
    showToast("Statistik beranda berhasil disimpan!");
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Home (Hero Slider 3s & Statistik)
          </h2>
          <p className="text-xs text-slate-500">
            Kelola slide gambar utama (berubah otomatis setiap 3 detik) serta 4 angka pencapaian
            lembaga.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Slide Baru</span>
        </button>
      </div>

      {editingSlide && (
        <div className="rounded-2xl border border-sky-300 bg-white p-6 space-y-4 shadow-lg animate-fade-up">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Edit2 className="h-4 w-4 text-sky-600" />
            <span>{isCreating ? "Tambah Slide Baru" : "Edit Konten Slide"}</span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Judul Utama (H1)
              </label>
              <input
                type="text"
                value={editingSlide.title}
                onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                placeholder="Cth: Program Ausbildung"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Subheading (Uppercase)
              </label>
              <input
                type="text"
                value={editingSlide.subheading}
                onChange={(e) => setEditingSlide({ ...editingSlide, subheading: e.target.value })}
                placeholder="Cth: PENDIDIKAN VOKASI DUAL DI JERMAN"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deskripsi Paragraf
            </label>
            <textarea
              rows={2}
              value={editingSlide.description}
              onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>

          <ImageUploader
            label="Foto / Gambar Latar Slide (Upload dari HP/Laptop atau URL)"
            value={editingSlide.image}
            onChange={(url) => setEditingSlide({ ...editingSlide, image: url })}
            aspectRatio="wide"
            placeholderText="Upload Foto Latar Hero Slide (JPG, PNG, WebP)"
            helperText="Foto akan tampil sebagai latar slide otomatis dengan gradasi gelap agar teks terbaca jelas."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-700">Tombol 1 (Outline)</span>
              <input
                type="text"
                value={editingSlide.button1?.label || ""}
                onChange={(e) =>
                  setEditingSlide({
                    ...editingSlide,
                    button1: { ...editingSlide.button1, label: e.target.value },
                  })
                }
                placeholder="Label (cth: DETAIL AUSBILDUNG)"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
              <input
                type="text"
                value={editingSlide.button1?.href || ""}
                onChange={(e) =>
                  setEditingSlide({
                    ...editingSlide,
                    button1: { ...editingSlide.button1, href: e.target.value },
                  })
                }
                placeholder="Href (cth: /program-ausbildung)"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-700">Tombol 2 (Solid Cyan)</span>
              <input
                type="text"
                value={editingSlide.button2?.label || ""}
                onChange={(e) =>
                  setEditingSlide({
                    ...editingSlide,
                    button2: { ...editingSlide.button2, label: e.target.value },
                  })
                }
                placeholder="Label (cth: DAFTAR SEKARANG)"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
              <input
                type="text"
                value={editingSlide.button2?.href || ""}
                onChange={(e) =>
                  setEditingSlide({
                    ...editingSlide,
                    button2: { ...editingSlide.button2, href: e.target.value },
                  })
                }
                placeholder="Link WhatsApp / URL"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setEditingSlide(null);
                setIsCreating(false);
              }}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleSaveSlide}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-600"
            >
              <Save className="h-4 w-4" />
              <span>Simpan Slide</span>
            </button>
          </div>
        </div>
      )}

      {/* List of existing Hero Slides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide: HeroSlide, idx: number) => (
          <div
            key={slide.id || idx}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs"
          >
            <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
              />
              <div className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-sky-700 border border-slate-200 shadow-xs">
                Slide #{idx + 1}
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 block">
                {slide.subheading}
              </span>
              <h4 className="text-base font-bold text-slate-900 leading-tight">{slide.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{slide.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 p-3 bg-slate-50/50">
              <span className="text-[11px] text-slate-400 font-mono">ID: {slide.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingSlide(slide);
                    setIsCreating(false);
                  }}
                  className="rounded-lg p-1.5 text-sky-600 hover:bg-sky-50"
                  title="Edit Slide"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                  title="Hapus Slide"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Counter CRUD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-sky-600" />
            <span>Angka Statistik Beranda</span>
          </h3>
          <button
            onClick={handleSaveStats}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Simpan Statistik</span>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-2"
            >
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const copy = [...statsData];
                  copy[idx].value = e.target.value;
                  setStatsData(copy);
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-bold text-sky-600 focus:outline-none"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const copy = [...statsData];
                  copy[idx].label = e.target.value;
                  setStatsData(copy);
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none"
              />
              <input
                type="text"
                value={stat.sublabel}
                onChange={(e) => {
                  const copy = [...statsData];
                  copy[idx].sublabel = e.target.value;
                  setStatsData(copy);
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: PROGRAM AUSBILDUNG CRUD
   ========================================================================= */
function AusbildungCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const data = cmsStore.cms.programAusbildung;
  const [formData, setFormData] = useState({ ...data });

  const handleSave = () => {
    cmsStore.updateSection("programAusbildung", formData);
    showToast("Program Ausbildung berhasil diperbarui!");
  };

  const addField = () => {
    const newField: AusbildungFieldItem = {
      id: `f-${Date.now()}`,
      title: "Jurusan Baru",
      germanTitle: "Fachrichtung",
      duration: "3 Tahun",
      salaryRange: "€950 - €1.200 / bulan",
      desc: "Deskripsi singkat kejuruan",
      prospect: "Peluang karir setelah lulus",
    };
    setFormData({
      ...formData,
      fields: [...formData.fields, newField],
    });
  };

  const removeField = (id: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((f) => f.id !== id),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Halaman Program Ausbildung Jerman</h2>
          <p className="text-xs text-slate-500">
            Kelola judul program, badge gaji vokasi, daftar kejuruan (Pflege, Gastronomie, dll), dan
            syarat.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Program Ausbildung</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">Headline & Badge Program</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle || ""}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Gaji</label>
            <input
              type="text"
              value={formData.salaryBadge || ""}
              onChange={(e) => setFormData({ ...formData, salaryBadge: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
          <textarea
            rows={2}
            value={formData.heroSubtitle || ""}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Ausbildung Fields CRUD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-sky-600" />
            <span>Daftar Jurusan Kejuruan Ausbildung</span>
          </h3>
          <button
            onClick={addField}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Jurusan</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.fields?.map((field: AusbildungFieldItem, idx: number) => (
            <div
              key={field.id || idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 font-mono">Jurusan #{idx + 1}</span>
                <button
                  onClick={() => removeField(field.id)}
                  className="text-rose-600 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={field.title}
                  onChange={(e) => {
                    const fields = [...formData.fields];
                    fields[idx].title = e.target.value;
                    setFormData({ ...formData, fields });
                  }}
                  placeholder="Nama Jurusan"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                />
                <input
                  type="text"
                  value={field.salaryRange}
                  onChange={(e) => {
                    const fields = [...formData.fields];
                    fields[idx].salaryRange = e.target.value;
                    setFormData({ ...formData, fields });
                  }}
                  placeholder="Kisaran Gaji Bulanan"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <textarea
                rows={2}
                value={field.desc}
                onChange={(e) => {
                  const fields = [...formData.fields];
                  fields[idx].desc = e.target.value;
                  setFormData({ ...formData, fields });
                }}
                placeholder="Deskripsi kejuruan"
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: KEGIATAN BELAJAR (A1-B2)
   ========================================================================= */
function LearningClassesCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const classes = cmsStore.cms.kegiatanBelajar?.classes || [];
  const [classList, setClassList] = useState<LearningClassItem[]>([...classes]);

  const handleSave = () => {
    cmsStore.updateSection("kegiatanBelajar", {
      ...cmsStore.cms.kegiatanBelajar,
      classes: classList,
    });
    showToast("Silabus & Kelas Kursus berhasil disimpan!");
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Kegiatan Belajar & Tingkatan Kelas Bahasa
          </h2>
          <p className="text-xs text-slate-500">
            Kelola kurikulum, jadwal, dan target capaian Goethe-Zertifikat level A1, A2, B1, dan B2.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Kelas</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {classList.map((cls, idx) => (
          <div
            key={cls.id || idx}
            className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-xs font-extrabold text-sky-700">
                Level {cls.level}
              </span>
              <span className="text-xs text-slate-500">{cls.duration}</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nama Kelas
              </label>
              <input
                type="text"
                value={cls.name}
                onChange={(e) => {
                  const copy = [...classList];
                  copy[idx].name = e.target.value;
                  setClassList(copy);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Target Capaian
              </label>
              <input
                type="text"
                value={cls.target}
                onChange={(e) => {
                  const copy = [...classList];
                  copy[idx].target = e.target.value;
                  setClassList(copy);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Jadwal Belajar
              </label>
              <input
                type="text"
                value={cls.schedule}
                onChange={(e) => {
                  const copy = [...classList];
                  copy[idx].schedule = e.target.value;
                  setClassList(copy);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: LEGALITAS & SK
   ========================================================================= */
function LegalitasCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const docs = cmsStore.cms.legalitas.documents || [];
  const [editingDoc, setEditingDoc] = useState<LegalDocumentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingDoc({
      id: `leg-${Date.now()}`,
      title: "",
      skNumber: "",
      issuer: "",
      date: new Date().toLocaleDateString("id-ID"),
      status: "Resmi & Aktif",
      description: "",
    });
  };

  const handleSaveDoc = () => {
    if (!editingDoc || !editingDoc.title.trim()) return;
    if (isCreating) {
      cmsStore.addLegalDoc(editingDoc);
      showToast("Dokumen legalitas baru berhasil ditambahkan!");
    } else {
      cmsStore.updateLegalDoc(editingDoc.id, editingDoc);
      showToast("Dokumen legalitas berhasil diperbarui!");
    }
    setEditingDoc(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Hapus dokumen legalitas ini?")) {
      cmsStore.deleteLegalDoc(id);
      showToast("Dokumen legalitas dihapus!");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Dokumen Legalitas & Izin Resmi Lembaga
          </h2>
          <p className="text-xs text-slate-500">
            SK Kemenkumham, Nomor Induk Berusaha (NIB), dan rekomendasi Disnaker.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Dokumen SK</span>
        </button>
      </div>

      {editingDoc && (
        <div className="rounded-2xl border border-sky-300 bg-white p-5 space-y-3 shadow-lg">
          <h3 className="text-sm font-bold text-slate-900">
            {isCreating ? "Tambah Dokumen Legalitas" : "Edit Dokumen"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={editingDoc.title}
              onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
              placeholder="Nama Dokumen (cth: Surat Keputusan Kemenkumham)"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={editingDoc.skNumber}
              onChange={(e) => setEditingDoc({ ...editingDoc, skNumber: e.target.value })}
              placeholder="Nomor SK / NIB"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={editingDoc.issuer}
              onChange={(e) => setEditingDoc({ ...editingDoc, issuer: e.target.value })}
              placeholder="Instansi Penerbit"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={editingDoc.date}
              onChange={(e) => setEditingDoc({ ...editingDoc, date: e.target.value })}
              placeholder="Tanggal Terbit"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>
          <textarea
            rows={2}
            value={editingDoc.description}
            onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
            placeholder="Deskripsi fungsi dokumen legalitas..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs text-slate-900 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditingDoc(null)}
              className="rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              Batal
            </button>
            <button
              onClick={handleSaveDoc}
              className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-sky-600"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc: LegalDocumentItem, idx: number) => (
          <div
            key={doc.id || idx}
            className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  {doc.status}
                </span>
                <span className="text-[10px] text-slate-400">{doc.date}</span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-slate-900">{doc.title}</h4>
              <p className="mt-1 text-xs font-mono text-sky-700 font-semibold">{doc.skNumber}</p>
              <p className="mt-1 text-xs text-slate-500">{doc.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingDoc(doc);
                  setIsCreating(false);
                }}
                className="p-1 text-sky-600 hover:text-sky-700"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="p-1 text-rose-600 hover:text-rose-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: TEAM & PENGAJAR CRUD
   ========================================================================= */
function TeamCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const members = cmsStore.cms.team.members || [];
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingMember({
      id: `team-${Date.now()}`,
      name: "",
      role: "",
      initials: "IL",
      almaMater: "",
      experience: "",
      bio: "",
    });
  };

  const handleSave = () => {
    if (!editingMember || !editingMember.name.trim()) return;
    if (isCreating) {
      cmsStore.addTeamMember(editingMember);
      showToast("Anggota tim baru berhasil ditambahkan!");
    } else {
      cmsStore.updateTeamMember(editingMember.id, editingMember);
      showToast("Data tim berhasil diperbarui!");
    }
    setEditingMember(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Hapus anggota tim ini?")) {
      cmsStore.deleteTeamMember(id);
      showToast("Anggota tim dihapus!");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tim Pengajar & Manajemen Lembaga</h2>
          <p className="text-xs text-slate-500">
            Kelola profil pendiri, instruktur bahasa Jerman, dan koordinator penempatan ke Jerman.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Anggota Tim</span>
        </button>
      </div>

      {editingMember && (
        <div className="rounded-2xl border border-sky-300 bg-white p-5 space-y-3 shadow-lg">
          <h3 className="text-sm font-bold text-slate-900">
            {isCreating ? "Tambah Anggota Tim" : "Edit Anggota Tim"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={editingMember.name}
              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
              placeholder="Nama Lengkap & Gelar"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={editingMember.role}
              onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
              placeholder="Jabatan / Peran"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={editingMember.almaMater}
              onChange={(e) => setEditingMember({ ...editingMember, almaMater: e.target.value })}
              placeholder="Lulusan / Sertifikasi"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={editingMember.experience}
              onChange={(e) => setEditingMember({ ...editingMember, experience: e.target.value })}
              placeholder="Pengalaman (cth: 10+ Tahun)"
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <ImageUploader
            label="Foto Profil Anggota Tim (Upload dari HP/Laptop atau URL)"
            value={editingMember.photoUrl || ""}
            onChange={(url) => setEditingMember({ ...editingMember, photoUrl: url })}
            aspectRatio="avatar"
            placeholderText="Upload Foto Profil Tim (JPG, PNG, WebP)"
            helperText="Unggah foto formal portrait untuk profil instruktur/staf."
          />

          <textarea
            rows={2}
            value={editingMember.bio}
            onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
            placeholder="Biografi singkat dan keahlian..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs text-slate-900 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditingMember(null)}
              className="rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-sky-600"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m: TeamMemberItem, idx: number) => (
          <div
            key={m.id || idx}
            className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden">
                  {m.photoUrl ? (
                    <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    m.initials || m.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                  <p className="text-xs font-medium text-sky-600">{m.role}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500 line-clamp-3">{m.bio}</p>
              <div className="mt-2 text-[11px] font-medium text-slate-400">{m.almaMater}</div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingMember(m);
                  setIsCreating(false);
                }}
                className="p-1 text-sky-600 hover:text-sky-700"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="p-1 text-rose-600 hover:text-rose-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: GALERI FOTO CRUD
   ========================================================================= */
function GaleriFotoCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const photos = cmsStore.cms.foto.photos || [];

  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCat, setNewPhotoCat] = useState<GalleryPhotoItem["category"]>("Kelas");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");

  const handleBulkUpload = (uploaded: { imgUrl: string; title: string; category?: string }[]) => {
    uploaded.forEach((item, index) => {
      cmsStore.addGalleryPhoto({
        id: `foto-${Date.now()}-${index}`,
        title: item.title || "Dokumentasi Kegiatan",
        category: (item.category as GalleryPhotoItem["category"]) || "Kelas",
        date: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
        imgUrl: item.imgUrl,
        caption: "Dokumentasi kegiatan siswa dan alumni Ich Liebe Deutsch Medan",
      });
    });
    showToast(`${uploaded.length} foto berhasil diunggah dari perangkat!`);
  };

  const handleAddPhoto = () => {
    if (!newPhotoTitle.trim()) {
      showToast("Judul foto wajib diisi!");
      return;
    }
    cmsStore.addGalleryPhoto({
      id: `foto-${Date.now()}`,
      title: newPhotoTitle.trim(),
      category: newPhotoCat,
      date: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      imgUrl: newPhotoUrl.trim() || "/logo.png",
      caption: newPhotoCaption.trim(),
    });
    showToast("Foto galeri berhasil ditambahkan!");
    setNewPhotoTitle("");
    setNewPhotoUrl("");
    setNewPhotoCaption("");
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Galeri Dokumentasi Foto Kegiatan</h2>
        <p className="text-xs text-slate-500">
          Kelola galeri kegiatan kelas, acara pelepasan siswa, cooking class, dan gathering.
        </p>
      </div>

      {/* Bulk Uploader */}
      <BulkImageUploader onAddPhotos={handleBulkUpload} defaultCategory={newPhotoCat} />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Plus className="h-4 w-4 text-sky-600" />
          <span>Tambah Foto Dokumentasi Spesifik</span>
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={newPhotoTitle}
            onChange={(e) => setNewPhotoTitle(e.target.value)}
            placeholder="Judul Foto Kegiatan"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
          <select
            value={newPhotoCat}
            onChange={(e) => setNewPhotoCat(e.target.value as GalleryPhotoItem["category"])}
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          >
            <option value="Kelas">Kelas</option>
            <option value="Cooking Class">Cooking Class</option>
            <option value="Gathering">Gathering</option>
            <option value="Pemberangkatan">Pemberangkatan</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        <ImageUploader
          label="File Foto dari Perangkat"
          value={newPhotoUrl}
          onChange={setNewPhotoUrl}
          aspectRatio="wide"
          placeholderText="Klik untuk Memilih Foto dari HP/Laptop"
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={newPhotoCaption}
            onChange={(e) => setNewPhotoCaption(e.target.value)}
            placeholder="Keterangan singkat / caption foto..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
          <button
            onClick={handleAddPhoto}
            className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-600 shrink-0"
          >
            Simpan Foto
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo: GalleryPhotoItem, idx: number) => (
          <div
            key={photo.id || idx}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs"
          >
            <div className="h-32 bg-slate-100 relative">
              <img
                src={photo.imgUrl}
                alt={photo.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
              />
              <span className="absolute top-2 left-2 rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-sky-700 shadow-xs border border-slate-200">
                {photo.category}
              </span>
            </div>
            <div className="p-3 space-y-1">
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{photo.title}</h5>
              <p className="text-[11px] text-slate-500 line-clamp-2">{photo.caption}</p>
            </div>
            <div className="p-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  cmsStore.deleteGalleryPhoto(photo.id);
                  showToast("Foto dihapus!");
                }}
                className="p-1 text-rose-600 hover:text-rose-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
