import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CalendarDays, User } from "lucide-react";

import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20mengenai%20program%20ke%20Jerman.";

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

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      {/* Hero with image */}
      <section className="relative isolate overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/75" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-3xl flex-col justify-center px-6 py-24 md:min-h-[48vh]">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-surface/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-surface">
            {post.tag}
          </span>
          <h1 className="text-balance font-display text-4xl leading-[1.1] text-surface md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-surface/75">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> {post.date}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
          </Link>
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-foreground/90">
            {post.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 font-display text-2xl leading-tight md:text-3xl">Artikel Lainnya</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <article key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-base font-semibold leading-snug">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="transition-colors hover:text-primary"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                </div>
              </article>
            ))}
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
              Ingin tahu lebih banyak tentang program Ich Liebe Deutsch Medan? Hubungi tim kami.
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

function BlogPostNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl md:text-5xl">Artikel tidak ditemukan</h1>
      <p className="mt-4 text-muted-foreground">
        Artikel yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        to="/blog"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" /> Lihat semua artikel
      </Link>
    </main>
  );
}
