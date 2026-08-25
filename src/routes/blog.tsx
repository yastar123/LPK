import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, User } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import { BLOG_POSTS } from "@/lib/blog-posts";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20bertanya%20mengenai%20program%20ke%20Jerman.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Wawasan seputar program Aupair, Ausbildung Gastronomie, dan FSJ Keperawatan serta peluang karier di Jerman bersama Ich Liebe Deutsch Medan.",
      },
      { property: "og:title", content: "Blog — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Artikel dan informasi seputar hidup, belajar, dan berkarier di Jerman bersama Ich Liebe Deutsch Medan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroBrandenburg}
          alt="Gerbang Brandenburg di Berlin, Jerman"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative mx-auto flex min-h-[42vh] flex-col justify-center px-6 py-24 md:min-h-[48vh]">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-surface/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-surface">
            Update
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Blog
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Wawasan seputar hidup, belajar, dan berkarier di Jerman bersama Ich Liebe Deutsch Medan
            Indonesia.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Artikel Terbaru
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Ich Liebe Deutsch Medan
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                    {post.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" /> {post.date}
                    </span>
                  </div>
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
