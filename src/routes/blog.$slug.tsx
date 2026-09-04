import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageCircle,
  Share2,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artikel tidak ditemukan — Ich Liebe Deutsch Medan" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Ich Liebe Deutsch Medan` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} — Ich Liebe Deutsch Medan` },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: BlogPostNotFound,
});

export function BlogPost() {
  const { post } = Route.useLoaderData();
  const { cms } = useCms();
  const k = cms.kontak;
  const rawWa = (k.hotlineWA || "082127324453").replace(/[^0-9]/g, "");
  const cleanWa = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
  const waLink = `https://wa.me/${cleanWa}?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN%2C%20saya%20membaca%20artikel%20"${encodeURIComponent(post.title)}"%20dan%20ingin%20konsultasi.`;

  const [copied, setCopied] = useState(false);

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWa = () => {
    const shareText = encodeURIComponent(
      `${post.title} - Baca selengkapnya di Ich Liebe Deutsch Medan: ${window.location.href}`,
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
  };

  return (
    <main className="bg-slate-50/50">
      {/* 1. Hero Article Header */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white border-b border-sky-900/40">
        <img
          src={post.img}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />

        <div className="relative mx-auto flex min-h-[44vh] sm:min-h-[50vh] max-w-4xl flex-col justify-center px-6 py-20 lg:py-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors mb-6 w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Semua Artikel</span>
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md mb-4 w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{post.tag}</span>
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-sky-400" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-sky-400" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>5 menit baca</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Article Content Body */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Main Featured Image Card */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-100 shadow-xl mb-12">
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[460px]"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Article text */}
            <article className="lg:col-span-8">
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700 font-sans">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share & Actions */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Bagikan:</span>
                  <button
                    type="button"
                    onClick={handleShareWa}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copied ? "Tersalin!" : "Salin Tautan"}</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar info */}
            <aside className="lg:col-span-4 space-y-6">
              {/* WhatsApp consultation box */}
              <div className="rounded-3xl border border-sky-200 bg-linear-to-b from-sky-50 to-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Tertarik Program Ini?</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Konsultasikan impian Anda berkarier atau belajar di Jerman langsung dengan tim
                  konsultan ILD Medan.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 py-3 text-xs font-bold text-white shadow-md shadow-sky-600/20 hover:bg-sky-500 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Tanya Konsultan via WA</span>
                </a>
              </div>

              {/* Quick Key Points */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Poin Penting
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Bimbingan bahasa Jerman bersertifikat Goethe</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Pilihan program Ausbildung, Au Pair, & FSJ</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Pendampingan visa dan relasi alumni di Jerman</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-sky-100">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8">
              Artikel Rekomendasi Lainnya
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <article
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-slate-50 shadow-xs transition-all hover:shadow-lg hover:border-sky-300"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="relative aspect-16/10 w-full overflow-hidden bg-slate-900 block"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                        {p.tag}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1.5 group-hover:text-sky-600 transition-colors line-clamp-2">
                        <Link to="/blog/$slug" params={{ slug: p.slug }}>
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">{p.excerpt}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export function BlogPostNotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-6 py-24">
      <div className="max-w-md text-center bg-white rounded-3xl border border-sky-100 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Artikel Tidak Ditemukan</h2>
        <p className="mt-2 text-xs text-slate-600">
          Artikel yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-sky-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Blog</span>
        </Link>
      </div>
    </main>
  );
}
