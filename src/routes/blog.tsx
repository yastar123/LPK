import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Wawasan Seputar Jerman — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Kumpulan artikel, panduan, dan wawasan seputar program Ausbildung, Au Pair, FSJ, dan tips sukses belajar bahasa Jerman di Medan.",
      },
      { property: "og:title", content: "Blog & Wawasan — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Panduan praktis, kisah inspiratif, dan tips persiapan karier di Jerman bersama Ich Liebe Deutsch Medan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

export function Blog() {
  const { cms } = useCms();
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "081265965231").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20tertarik%20dengan%20program%20ke%20Jerman.`;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Merge CMS posts with static blog posts
  const posts =
    cms.blog?.posts && cms.blog.posts.length > 0
      ? cms.blog.posts
      : BLOG_POSTS.map((p) => ({
          id: p.slug,
          slug: p.slug,
          title: p.title,
          category: p.tag,
          date: p.date,
          image: p.img,
          author: p.author,
          readTime: "5 mnt baca",
          summary: p.excerpt,
        }));

  const categories = ["Semua", "Au Pair", "Ausbildung", "FSJ", "Karier & Visa"];

  const filteredPosts = posts.filter((post) => {
    const matchesCat =
      selectedCategory === "Semua" ||
      post.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            <BookOpen className="h-3.5 w-3.5" />
            <span>Pusat Edukasi & Informasi</span>
          </span>
          <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Blog & Wawasan Seputar Jerman
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Temukan panduan praktis, tips belajar bahasa Jerman, kisah inspiratif alumni, dan info
            terbaru seputar program Ausbildung, Au Pair, serta FSJ.
          </p>
        </div>
      </section>

      {/* 2. Search & Filter Bar */}
      <section className="py-12 bg-white border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul artikel..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </section>

      {/* 3. Articles Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-sky-100 p-8">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Tidak ada artikel yang sesuai</h3>
              <p className="text-xs text-slate-500 mt-1">
                Coba ubah kata kunci pencarian atau pilih kategori lain.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id || post.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition-all hover:shadow-xl hover:border-sky-300 hover:-translate-y-1"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="relative aspect-16/10 w-full overflow-hidden bg-slate-900 block"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2.5">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3 text-sky-600" />
                          <span>{post.author || "Admin ILD"}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3 text-sky-600" />
                          <span>{post.date}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:text-sky-700"
                      >
                        <span>Baca Selengkapnya</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA */}
      <section className="border-t border-sky-100 bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Punya Pertanyaan Seputar Artikel & Program Kami?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Hubungi tim konsultan Ich Liebe Deutsch Medan untuk berdiskusi langsung mengenai
              pilihan program ke Jerman.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Konsultasi WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
