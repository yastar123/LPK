import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, GraduationCap, HeartPulse, UtensilsCrossed } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";
import programAupair from "@/assets/program-aupair.jpg";
import programAusbildung from "@/assets/program-ausbildung.jpg";
import programFsj from "@/assets/program-fsj.jpg";
import galleryCity from "@/assets/gallery-city.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import galleryCooking from "@/assets/gallery-cooking.jpg";
import galleryGathering from "@/assets/gallery-gathering.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";
import galleryStudy from "@/assets/gallery-study.jpg";
import blogAupair from "@/assets/blog-aupair.jpg";
import blogAusbildung from "@/assets/blog-ausbildung.jpg";
import blogFsj from "@/assets/blog-fsj.jpg";
import blogKarir from "@/assets/blog-karir.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ich Liebe Deutsch Medan — Program Aupair, Ausbildung & FSJ ke Jerman" },
      {
        name: "description",
        content:
          "Ich Liebe Deutsch Medan membantu pemuda-pemudi Indonesia berangkat ke Jerman lewat program Aupair, Ausbildung Gastronomie, dan FSJ Keperawatan.",
      },
      { property: "og:title", content: "Ich Liebe Deutsch Medan — Jalan Anda ke Jerman" },
      {
        property: "og:description",
        content:
          "Program Aupair, Ausbildung Gastronomie, dan FSJ Keperawatan dengan pendampingan penuh dari Medan sampai Jerman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PROGRAMS = [
  {
    icon: UtensilsCrossed,
    title: "Ausbildung",
    image: programAusbildung,
    duration: "2–3,5 tahun",
    desc: "Sistem pendidikan dan pelatihan kejuruan di Jerman: sekolah kejuruan + praktik di perusahaan, dengan banyak pilihan jurusan.",
    points: ["Gaji pelatihan dari perusahaan", "Jurusan: Pflege, gastronomi, teknik, IT, dll.", "Pengalaman kerja langsung"],
  },
  {
    icon: GraduationCap,
    title: "Au Pair",
    image: programAupair,
    duration: "12 bulan",
    desc: "Tinggal bersama keluarga Jerman (host family) sambil membantu pengasuhan anak dan pekerjaan rumah ringan.",
    points: ["Tempat tinggal & makanan", "Uang saku", "Kesempatan kursus bahasa Jerman"],
  },
  {
    icon: HeartPulse,
    title: "FSJ / BFD",
    image: programFsj,
    duration: "12 bulan",
    desc: "Tahun sukarelawan sosial di Jerman — sebagai relawan di rumah sakit, panti lansia, fasilitas disabilitas, atau lembaga sosial.",
    points: ["Uang saku & fasilitas program", "Kegiatan sukarela berpendampingan", "BFD tanpa batasan umur"],
  },
  {
    icon: Landmark,
    title: "G to G",
    image: galleryCity,
    duration: "Jalur resmi",
    desc: "Government to Government — penempatan tenaga kerja Indonesia ke Jerman melalui kerja sama resmi pemerintah kedua negara.",
    points: ["Jalur resmi pemerintah", "Untuk tenaga kesehatan/perawat", "Proses melalui lembaga yang ditunjuk"],
  },
  {
    icon: BookOpen,
    title: "Kuliah / Studium",
    image: galleryClass,
    duration: "S1 / S2",
    desc: "Melanjutkan kuliah berbahasa Jerman di universitas Jerman dengan syarat bahasa sesuai program studi.",
    points: ["Umumnya butuh level B2/C1", "Syarat sesuai universitas", "Persiapan bahasa bersama kami"],
  },
];

const STEPS = [
  { n: "01", t: "Konsultasi & Seleksi", d: "Wawancara awal, cek dokumen, dan pemetaan program yang paling sesuai." },
  { n: "02", t: "Kursus Bahasa Jerman", d: "Belajar sampai level A1/B1 bersama pengajar berpengalaman." },
  { n: "03", t: "Matching & Kontrak", d: "Pencarian gastfamily atau perusahaan Jerman hingga kontrak diterbitkan." },
  { n: "04", t: "Visa & Keberangkatan", d: "Pendampingan berkas kedutaan, visa, tiket, sampai tiba di Jerman." },
];

const REQUIREMENTS = [
  "Ausbildung: maks. 32 tahun saat mendaftar les, lulusan SMA/sederajat, bahasa Jerman min. B1",
  "Au Pair: maks. 26 tahun, bahasa Jerman min. A1 (disarankan A2)",
  "FSJ: maks. 26 tahun / BFD: tanpa batasan umur, bahasa Jerman min. A1",
  "Kuliah/Studium: bahasa Jerman B2 atau C1 sesuai universitas dan program studi",
];

const GALLERY = [
  { src: galleryClass, alt: "Kelas bahasa Jerman peserta Ich Liebe Deutsch Medan" },
  { src: galleryCooking, alt: "Cooking class peserta program Ausbildung Gastronomie" },
  { src: galleryStudy, alt: "Kegiatan belajar kelompok peserta" },
  { src: galleryGraduation, alt: "Wisuda peserta program Ich Liebe Deutsch Medan" },
  { src: galleryCity, alt: "Peserta menjelajah kota di Jerman" },
  { src: galleryGathering, alt: "Gathering alumni dan peserta Ich Liebe Deutsch Medan" },
];

const POSTS = [
  { img: blogAupair, tag: "Aupair", title: "Hidup Setahun Bersama Gastfamily di Jerman", excerpt: "Cerita keseharian, tugas, dan tips beradaptasi sebagai Aupair." },
  { img: blogAusbildung, tag: "Ausbildung", title: "Kenapa Ausbildung Gastronomie Banyak Diminati?", excerpt: "Sekolah sambil digaji dan jalur karier jangka panjang di Eropa." },
  { img: blogFsj, tag: "FSJ", title: "FSJ: Langkah Awal Karier Keperawatan di Jerman", excerpt: "Apa saja yang dikerjakan peserta FSJ di fasilitas kesehatan Jerman." },
  { img: blogKarir, tag: "Karier", title: "Peluang Kerja Setelah Program Selesai", excerpt: "Dari izin tinggal pelajar menuju kontrak kerja tetap." },
];

function Index() {
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
        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl flex-col justify-center px-6 py-24">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-surface/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-surface">
            Ich Liebe Deutsch Medan
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-7xl">
            Wujudkan Masa Depanmu di Jerman
          </h1>
          <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-surface/75">
            Program Aupair, Ausbildung Gastronomie, dan FSJ Keperawatan dengan pendampingan
            penuh — dari kursus bahasa di Medan hingga hari pertama Anda di Jerman.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Mulai Konsultasi <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#program"
              className="inline-flex items-center rounded-full border border-surface/30 px-7 py-3 text-sm font-semibold text-surface transition-colors hover:bg-surface/10"
            >
              Lihat Program
            </a>
          </div>
          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-surface/15 pt-8">
            {[
              ["500+", "Peserta diberangkatkan"],
              ["10+", "Tahun pengalaman"],
              ["3", "Program unggulan"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-accent">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-surface/60">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang" className="scroll-mt-24 border-b border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Tentang Kami
            </p>
            <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
              Jembatan persahabatan Indonesia–Jerman
            </h2>
          </div>
          <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Ich Liebe Deutsch Medan adalah lembaga
              penyelenggara kesempatan bagi pemuda-pemudi Indonesia untuk menimba ilmu dan
              pengalaman di Jerman, khususnya melalui program Aupair dan Ausbildung.
            </p>
            <p>
              Kami mendampingi peserta secara menyeluruh: kelas bahasa Jerman, penyiapan
              dokumen, pencarian gastfamily maupun perusahaan mitra, proses visa, hingga
              pendampingan selama berada di Jerman.
            </p>
            <div id="legalitas" className="scroll-mt-24 grid gap-4 pt-4 sm:grid-cols-2">
              {[
                "Berbadan hukum yayasan resmi",
                "Terdaftar Kemenkumham RI",
                "Mitra agensi resmi di Jerman",
                "Pendampingan sampai tiba di Jerman",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="scroll-mt-24 bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Program
          </p>
          <h2 className="mb-14 max-w-[22ch] text-balance font-display text-4xl leading-tight md:text-5xl">
            Tiga jalur menuju karier internasional
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
                    {p.duration}
                  </span>
                </div>
                <div className="p-7">
                  <p.icon className="mb-4 h-6 w-6 text-primary" />
                  <h3 className="mb-3 font-display text-2xl">{p.title}</h3>
                  <p className="mb-5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <ul className="space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prosedur & Persyaratan */}
      <section id="prosedur" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Prosedur & Persyaratan
          </p>
          <h2 className="mb-14 max-w-[24ch] text-balance font-display text-4xl leading-tight md:text-5xl">
            Empat langkah dari Indonesia ke Jerman
          </h2>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <ol className="grid gap-6 sm:grid-cols-2">
              {STEPS.map((s) => (
                <li key={s.n} className="rounded-2xl border border-border bg-card p-7">
                  <span className="font-display text-3xl text-accent">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
            <div className="rounded-2xl bg-ink p-8 text-surface">
              <h3 className="mb-6 font-display text-2xl">Persyaratan Umum</h3>
              <ul className="space-y-4">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-surface/70">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {r}
                  </li>
                ))}
              </ul>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Tanya Persyaratan <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section id="galeri" className="scroll-mt-24 bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Portofolio
          </p>
          <h2 className="mb-14 max-w-[22ch] text-balance font-display text-4xl leading-tight md:text-5xl">
            Momen para peserta kami
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g) => (
              <figure key={g.alt} className="group overflow-hidden rounded-2xl">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gathering / Team */}
      <section id="gathering" className="scroll-mt-24 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <figure className="overflow-hidden rounded-3xl">
            <img
              src={galleryGathering}
              alt="Gathering keluarga besar Ich Liebe Deutsch Medan"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Team & Gathering
            </p>
            <h2 className="mb-6 max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
              Komunitas yang menemani sepanjang jalan
            </h2>
            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              Tim kami terdiri dari konsultan pendidikan, pengajar bahasa Jerman, dan alumni
              program yang siap membantu setiap peserta. Gathering rutin mempertemukan calon
              peserta dengan alumni yang sudah lebih dulu berangkat.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Konsultan pendidikan", "Pengajar bahasa bersertifikat", "Mentor alumni", "Pendamping visa & dokumen"].map(
                (t) => (
                  <li key={t} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium">
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="scroll-mt-24 bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Blog
          </p>
          <h2 className="mb-14 max-w-[22ch] text-balance font-display text-4xl leading-tight md:text-5xl">
            Wawasan seputar hidup & belajar di Jerman
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {POSTS.map((post) => (
              <article key={post.title} className="group">
                <div className="mb-5 overflow-hidden rounded-2xl">
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {post.tag}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[24ch] text-balance font-display text-3xl leading-tight md:text-4xl">
            Siap memulai perjalanan Anda ke Jerman?
          </h2>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Konsultasi Gratis <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
