import { useState, useMemo } from "react";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  Eye,
  ArrowLeft,
  CalendarDays,
  User,
  Clock,
  Share2,
  CheckCircle2,
  Sparkles,
  FileText,
  Layers,
  Copy,
  MessageCircle,
  Globe,
  Tag,
  Hash,
  ListOrdered,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { type BlogPostItem, type CmsContextValue } from "@/lib/cms-store";
import { ImageUploader } from "@/components/ui/device-media-uploader";

interface BlogCrudTabProps {
  cmsStore: CmsContextValue;
  showToast: (msg: string) => void;
}

type DetailSubTab = "baca" | "edit" | "preview_publik" | "seo";

export function BlogCrudTab({ cmsStore, showToast }: BlogCrudTabProps) {
  const rawPosts = cmsStore.cms.blog.posts;
  const posts = useMemo(() => rawPosts || [], [rawPosts]);

  // Navigation State
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [detailTab, setDetailTab] = useState<DetailSubTab>("baca");

  // Filter & Search State for list
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  // Editing State
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [contentDraft, setContentDraft] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Computed Selected Post
  const currentPost = useMemo(() => {
    if (!selectedPostId) return null;
    return posts.find((p) => p.id === selectedPostId || p.slug === selectedPostId) || null;
  }, [posts, selectedPostId]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.tag) set.add(p.tag);
    });
    return ["Semua", ...Array.from(set)];
  }, [posts]);

  // Filtered posts for list
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat =
        categoryFilter === "Semua" || p.tag.toLowerCase() === categoryFilter.toLowerCase();
      const matchSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, categoryFilter, searchQuery]);

  // Handlers
  const handleOpenCreate = () => {
    const newId = `post-${Date.now()}`;
    const newDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const blankPost: BlogPostItem = {
      id: newId,
      slug: `artikel-baru-${Date.now()}`,
      title: "",
      tag: "Ausbildung",
      excerpt: "",
      date: newDate,
      author: "Admin ILD Medan",
      img: "/logo.png",
      content: [],
    };
    setEditingPost(blankPost);
    setContentDraft("");
    setIsCreating(true);
    setSelectedPostId(null);
  };

  const handleOpenDetail = (post: BlogPostItem, subTab: DetailSubTab = "baca") => {
    setSelectedPostId(post.id);
    setIsCreating(false);
    setDetailTab(subTab);
    if (subTab === "edit") {
      setEditingPost(post);
      setContentDraft(post.content ? post.content.join("\n\n") : "");
    }
  };

  const handleStartEditCurrent = () => {
    if (!currentPost) return;
    setEditingPost(currentPost);
    setContentDraft(currentPost.content ? currentPost.content.join("\n\n") : "");
    setDetailTab("edit");
  };

  const handleSave = () => {
    if (!editingPost) return;
    if (!editingPost.title.trim()) {
      showToast("Judul artikel tidak boleh kosong!");
      return;
    }
    if (!editingPost.slug.trim()) {
      showToast("Slug URL tidak boleh kosong!");
      return;
    }

    const splitParagraphs = contentDraft
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const readyPost: BlogPostItem = {
      ...editingPost,
      title: editingPost.title.trim(),
      slug: editingPost.slug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-"),
      tag: editingPost.tag.trim() || "Umum",
      excerpt:
        editingPost.excerpt.trim() ||
        (splitParagraphs[0] ? splitParagraphs[0].slice(0, 150) + "..." : ""),
      content:
        splitParagraphs.length > 0
          ? splitParagraphs
          : [editingPost.excerpt || "Konten artikel belum diisi."],
    };

    if (isCreating) {
      cmsStore.addBlogPost(readyPost);
      showToast("Artikel baru berhasil dipublikasikan!");
      setIsCreating(false);
      setSelectedPostId(readyPost.id);
      setDetailTab("baca");
    } else {
      cmsStore.updateBlogPost(readyPost.id, readyPost);
      showToast("Artikel berhasil diperbarui!");
      setSelectedPostId(readyPost.id);
      setDetailTab("baca");
    }
    setEditingPost(null);
  };

  const handleDelete = (id: string, title?: string) => {
    const name = title ? `"${title}"` : "artikel ini";
    if (window.confirm(`Apakah Anda yakin ingin menghapus artikel ${name}?`)) {
      cmsStore.deleteBlogPost(id);
      showToast("Artikel berhasil dihapus!");
      if (selectedPostId === id) {
        setSelectedPostId(null);
        setEditingPost(null);
      }
    }
  };

  const handleCopyPublicUrl = (slug: string) => {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast("Tautan publik berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Helper stats calculation
  const getWordCount = (post: BlogPostItem) => {
    const fullText = [post.title, post.excerpt, ...(post.content || [])].join(" ");
    return fullText.trim().split(/\s+/).filter(Boolean).length;
  };

  const getReadingTime = (post: BlogPostItem) => {
    const words = getWordCount(post);
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} menit`;
  };

  // =========================================================================
  // VIEW: FORM TULIS ARTIKEL BARU (CREATE MODE)
  // =========================================================================
  if (isCreating && editingPost) {
    return (
      <div className="space-y-6 animate-fade-in w-full max-w-5xl mx-auto pb-12">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPost(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Batal & Kembali</span>
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Plus className="h-5 w-5 text-sky-600" />
                <span>Tulis Artikel / Berita Baru</span>
              </h2>
              <p className="text-xs text-slate-500">
                Lengkapi judul, kategori, foto sampul, dan teks isi artikel untuk website.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-all shadow-md shadow-sky-600/20"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Publikasikan Sekarang</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Judul Artikel <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const autoSlug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");
                  setEditingPost({
                    ...editingPost,
                    title,
                    slug: autoSlug,
                  });
                }}
                placeholder="Contoh: Panduan Lengkap Program Ausbildung Perawat di Jerman 2026"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Slug URL (Permalink) <span className="text-rose-500">*</span>
              </label>
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:bg-white focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20">
                <span className="bg-slate-100 px-3 py-2 text-xs font-mono text-slate-500 border-r border-slate-200 select-none flex items-center">
                  /blog/
                </span>
                <input
                  type="text"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  placeholder="panduan-lengkap-ausbildung-perawat"
                  className="w-full bg-transparent px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Kategori / Tag
              </label>
              <input
                type="text"
                list="category-suggestions"
                value={editingPost.tag}
                onChange={(e) => setEditingPost({ ...editingPost, tag: e.target.value })}
                placeholder="Ausbildung / Au Pair / FSJ / Belajar Bahasa"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <datalist id="category-suggestions">
                <option value="Ausbildung" />
                <option value="Au Pair" />
                <option value="FSJ" />
                <option value="Tips Belajar" />
                <option value="Karier & Visa" />
                <option value="Kehidupan Jerman" />
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Penulis (Author)
              </label>
              <input
                type="text"
                value={editingPost.author}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                placeholder="Admin ILD Medan / Tim Konsultan"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Tanggal Publikasi
              </label>
              <input
                type="text"
                value={editingPost.date}
                onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                placeholder="Contoh: 15 Juli 2026"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Ringkasan Singkat (Excerpt)
            </label>
            <textarea
              rows={2}
              value={editingPost.excerpt}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              placeholder="Tuliskan 1–2 kalimat ringkasan yang menarik untuk ditampilkan di kartu artikel..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 leading-relaxed"
            />
          </div>

          <ImageUploader
            label="Foto Sampul Artikel (Cover Header)"
            value={editingPost.img}
            onChange={(url) => setEditingPost({ ...editingPost, img: url })}
            aspectRatio="wide"
            placeholderText="Upload Foto Cover Artikel dari Perangkat (JPG, PNG, WebP)"
            helperText="Foto ini akan tampil sebagai gambar utama di kartu artikel dan header detail bacaan."
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Isi Konten Lengkap Artikel
              </label>
              <span className="text-[11px] text-slate-500">
                Gunakan <strong>2x Enter (Baris Kosong)</strong> untuk memisahkan antar-paragraf
              </span>
            </div>
            <textarea
              rows={12}
              value={contentDraft}
              onChange={(e) => setContentDraft(e.target.value)}
              placeholder="Tuliskan isi artikel lengkap di sini...&#10;&#10;Paragraf kedua: Anda dapat menuliskan penjelasan materi, syarat, benefit, atau tips secara mendalam...&#10;&#10;Paragraf ketiga: Penutup artikel dengan call-to-action ke program ILD Medan..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm font-sans text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 leading-relaxed font-normal"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPost(null);
              }}
              className="rounded-xl px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-all shadow-md shadow-sky-600/20"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Publikasikan Artikel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: DETAIL ARTIKEL KHUSUS ADMIN (FULL DETAIL SCREEN)
  // =========================================================================
  if (currentPost) {
    const wordCount = getWordCount(currentPost);
    const readingTime = getReadingTime(currentPost);
    const paragraphs = currentPost.content || [currentPost.excerpt];

    return (
      <div className="space-y-6 animate-fade-in w-full max-w-6xl mx-auto pb-16">
        {/* 1. Breadcrumb & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedPostId(null);
                setEditingPost(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft className="h-4 w-4 text-slate-500" />
              <span>Semua Artikel</span>
            </button>
            <div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>Admin CMS</span>
                <ChevronRight className="h-3 w-3" />
                <span>Blog & Berita</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-sky-600 font-semibold truncate max-w-[200px]">
                  {currentPost.title}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate max-w-xl">
                Detail Artikel & Berita
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopyPublicUrl(currentPost.slug)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              title="Salin tautan web artikel"
            >
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
            </button>
            <a
              href={`/blog/${currentPost.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs font-bold text-sky-700 hover:bg-sky-100 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Buka di Web Publik</span>
            </a>
            {detailTab !== "edit" && (
              <button
                onClick={handleStartEditCurrent}
                className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition-all shadow-sm shadow-sky-600/20"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit Artikel</span>
              </button>
            )}
            <button
              onClick={() => handleDelete(currentPost.id, currentPost.title)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors"
              title="Hapus artikel ini"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Hapus</span>
            </button>
          </div>
        </div>

        {/* 2. Top Summary Stat Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-3 py-0.5 text-xs font-bold text-sky-700">
                  <Tag className="h-3 w-3" />
                  <span>{currentPost.tag}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Status: Terpublikasi</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {currentPost.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {currentPost.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic border-l-2 border-sky-400 pl-3">
                "{currentPost.excerpt}"
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
              <div className="flex-1 rounded-2xl bg-slate-50 border border-slate-100 p-3.5 text-center min-w-[100px]">
                <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                  <Clock className="h-3.5 w-3.5 text-sky-600" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Durasi</span>
                </div>
                <div className="text-sm font-extrabold text-slate-800">{readingTime}</div>
              </div>
              <div className="flex-1 rounded-2xl bg-slate-50 border border-slate-100 p-3.5 text-center min-w-[100px]">
                <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                  <FileText className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    Jumlah Kata
                  </span>
                </div>
                <div className="text-sm font-extrabold text-slate-800">{wordCount} kata</div>
              </div>
              <div className="flex-1 rounded-2xl bg-slate-50 border border-slate-100 p-3.5 text-center min-w-[100px]">
                <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                  <Layers className="h-3.5 w-3.5 text-amber-600" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    Paragraf
                  </span>
                </div>
                <div className="text-sm font-extrabold text-slate-800">
                  {paragraphs.length} blok
                </div>
              </div>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center gap-2 border-t border-slate-100 mt-6 pt-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setDetailTab("baca")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                detailTab === "baca"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Baca & Struktur Paragraf</span>
            </button>
            <button
              onClick={() => {
                setDetailTab("edit");
                setEditingPost(currentPost);
                setContentDraft(currentPost.content ? currentPost.content.join("\n\n") : "");
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                detailTab === "edit"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>Editor Lengkap</span>
            </button>
            <button
              onClick={() => setDetailTab("preview_publik")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                detailTab === "preview_publik"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Simulasi Tampilan Pembaca</span>
            </button>
            <button
              onClick={() => setDetailTab("seo")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                detailTab === "seo"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Meta SEO & Social Media</span>
            </button>
          </div>
        </div>

        {/* 3. Sub-tab Content Areas */}
        {detailTab === "baca" && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Cover & Paragraphs */}
            <div className="lg:col-span-8 space-y-6">
              {/* Cover Photo */}
              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="relative aspect-16/9 w-full bg-slate-900">
                  <img
                    src={currentPost.img}
                    alt={currentPost.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/logo.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="rounded-full bg-sky-500/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {currentPost.tag}
                      </span>
                      <p className="text-sm font-bold text-white mt-1">Foto Sampul Header Publik</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paragraphs Breakdown */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ListOrdered className="h-4 w-4 text-sky-600" />
                    <span>Naskah Isi Artikel ({paragraphs.length} Paragraf)</span>
                  </h3>
                  <button
                    onClick={handleStartEditCurrent}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Ubah Naskah</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {paragraphs.map((para, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:bg-white hover:border-sky-200 hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                        <span className="flex items-center gap-1.5 text-sky-700 font-mono">
                          <Hash className="h-3.5 w-3.5" />
                          <span>Paragraf #{idx + 1}</span>
                        </span>
                        <span>{para.split(/\s+/).filter(Boolean).length} kata</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                        {para}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Metadata Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Publication Details */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
                  Informasi Publikasi
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Penulis</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <User className="h-3.5 w-3.5 text-sky-600" />
                      <span>{currentPost.author}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tanggal Terbit</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <CalendarDays className="h-3.5 w-3.5 text-sky-600" />
                      <span>{currentPost.date}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Slug URL</span>
                    <code className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md mt-0.5 block break-all text-[11px]">
                      /blog/{currentPost.slug}
                    </code>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Kategori</span>
                    <span className="inline-block font-bold text-slate-800 mt-0.5">
                      {currentPost.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultation Callout in this article */}
              <div className="rounded-3xl border border-emerald-200 bg-linear-to-b from-emerald-50 to-white p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 mb-3">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">CTA WhatsApp di Artikel Ini</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Calon siswa yang membaca artikel ini dapat mengklik tombol konsultasi langsung
                  yang otomatis menyertakan judul artikel ini.
                </p>
                <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] text-emerald-800 font-mono break-all">
                  Teks WA: "Halo ILD Medan, saya membaca artikel '{currentPost.title}'..."
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-tab: Edit Form */}
        {detailTab === "edit" && editingPost && (
          <div className="rounded-3xl border border-sky-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-sky-600" />
                <span>Ubah Konten Artikel: {currentPost.title}</span>
              </h3>
              <span className="text-xs text-slate-400">ID: {editingPost.id}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Judul Artikel <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Slug URL <span className="text-rose-500">*</span>
                </label>
                <div className="flex rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:bg-white focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20">
                  <span className="bg-slate-100 px-3 py-2 text-xs font-mono text-slate-500 border-r border-slate-200 select-none flex items-center">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full bg-transparent px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Kategori / Tag
                </label>
                <input
                  type="text"
                  list="category-suggestions-edit"
                  value={editingPost.tag}
                  onChange={(e) => setEditingPost({ ...editingPost, tag: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <datalist id="category-suggestions-edit">
                  <option value="Ausbildung" />
                  <option value="Au Pair" />
                  <option value="FSJ" />
                  <option value="Tips Belajar" />
                  <option value="Karier & Visa" />
                  <option value="Kehidupan Jerman" />
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Penulis (Author)
                </label>
                <input
                  type="text"
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Tanggal Publikasi
                </label>
                <input
                  type="text"
                  value={editingPost.date}
                  onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Ringkasan (Excerpt)
              </label>
              <textarea
                rows={2}
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 leading-relaxed"
              />
            </div>

            <ImageUploader
              label="Foto Sampul Artikel"
              value={editingPost.img}
              onChange={(url) => setEditingPost({ ...editingPost, img: url })}
              aspectRatio="wide"
              placeholderText="Upload Foto Cover Artikel Baru dari Perangkat (JPG, PNG, WebP)"
              helperText="Pilih foto landscape dengan rasio 16:9 atau 16:10 untuk hasil terbaik."
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Isi Konten Artikel (Gunakan 2x Enter untuk pemisah paragraf)
                </label>
                <span className="text-[11px] text-slate-500">
                  {contentDraft.split(/\s+/).filter(Boolean).length} kata total
                </span>
              </div>
              <textarea
                rows={12}
                value={contentDraft}
                onChange={(e) => setContentDraft(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm font-sans text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setDetailTab("baca")}
                className="rounded-xl px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-all shadow-md shadow-sky-600/20"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        )}

        {/* Sub-tab: Public Mock Preview */}
        {detailTab === "preview_publik" && (
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md">
            <div className="bg-slate-900 px-6 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Eye className="h-4 w-4 text-sky-400" />
                <span>Simulasi Pratinjau Tampilan Web Publik</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">/blog/{currentPost.slug}</span>
            </div>

            <div className="p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
              <div>
                <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
                  {currentPost.tag}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {currentPost.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <User className="h-3.5 w-3.5 text-sky-600" />
                    <span>{currentPost.author}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-sky-600" />
                    <span>{currentPost.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{readingTime} baca</span>
                  </span>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                <img
                  src={currentPost.img}
                  alt={currentPost.title}
                  className="w-full h-auto object-cover max-h-[420px]"
                />
              </div>

              <div className="space-y-6 text-base text-slate-700 leading-relaxed">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sub-tab: Meta SEO & Social Preview */}
        {detailTab === "seo" && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Google Search Snippet */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-sky-600" />
                <span>Pratinjau Hasil Pencarian Google</span>
              </h4>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-1.5">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <span>https://ichliebedeutsch.id</span>
                  <span>›</span>
                  <span>blog</span>
                  <span>›</span>
                  <span className="text-slate-700">{currentPost.slug}</span>
                </div>
                <h5 className="text-base font-semibold text-blue-700 hover:underline cursor-pointer leading-snug">
                  {currentPost.title} — Ich Liebe Deutsch Medan
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {currentPost.excerpt}
                </p>
              </div>
            </div>

            {/* Social Share WhatsApp Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Share2 className="h-4 w-4 text-emerald-600" />
                <span>Pratinjau Berbagi Tautan (WhatsApp / Social)</span>
              </h4>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 overflow-hidden shadow-xs">
                <div className="h-32 bg-slate-800 relative">
                  <img
                    src={currentPost.img}
                    alt={currentPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3.5 space-y-1 bg-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    ichliebedeutsch.id
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {currentPost.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                    {currentPost.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: DAFTAR SEMUA ARTIKEL (ARTICLE LIST VIEW)
  // =========================================================================
  return (
    <div className="space-y-6 animate-fade-in w-full pb-12">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-sky-600" />
            <span>Artikel, Berita & Panduan Hidup di Jerman</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola artikel edukasi, panduan program Ausbildung, Au Pair, FSJ, dan berita seputar
            Jerman.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-all shadow-md shadow-sky-600/20"
        >
          <Plus className="h-4 w-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* 2. Quick Stat Counters */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Artikel
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{posts.length} Artikel</h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Kategori Aktif
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              {categories.length - 1} Topik
            </h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Tag className="h-5 w-5" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Status Sistem
            </span>
            <h3 className="text-xl font-black text-emerald-600 mt-0.5">Live & Terindeks</h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 3. Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul / penulis / slug..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Article Grid Cards */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-800">Tidak ada artikel yang sesuai</h4>
          <p className="text-xs text-slate-500 mt-1">
            Silakan ubah kata kunci pencarian atau klik tombol "Tulis Artikel Baru".
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post: BlogPostItem) => (
            <div
              key={post.id || post.slug}
              className="group rounded-3xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs transition-all hover:shadow-xl hover:border-sky-300 hover:-translate-y-0.5"
            >
              {/* Card Image Header */}
              <div
                onClick={() => handleOpenDetail(post, "baca")}
                className="relative aspect-16/9 w-full bg-slate-900 cursor-pointer overflow-hidden block"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/logo.png";
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-sky-700 shadow-xs border border-slate-100">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <User className="h-3 w-3 text-sky-600" />
                      <span>{post.author}</span>
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h3
                    onClick={() => handleOpenDetail(post, "baca")}
                    className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 cursor-pointer group-hover:text-sky-600 transition-colors"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenDetail(post, "baca")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Lihat Detail</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenDetail(post, "edit")}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Konten"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Buka Halaman Publik"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
