import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Clock, Mail, MapPin, Phone, Target, Users } from "lucide-react";

import heroBrandenburg from "@/assets/hero-brandenburg.jpg";

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.";

export const Route = createFileRoute("/tentang-kami")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Kenali Ich Liebe Deutsch Medan: visi, misi, sejarah, dan komitmen kami membantu pemuda-pemudi Indonesia menimba ilmu di Jerman.",
      },
      { property: "og:title", content: "Tentang Kami — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content:
          "Ich Liebe Deutsch Medan membuka kesempatan bagi pemuda-pemudi Indonesia menimba ilmu di Jerman melalui program Aupair, Ausbildung, dan FSJ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TentangKami,
});

const MILESTONES = [
  {
    icon: Award,
    year: "2024",
    title: "Lembaga Resmi Berdiri",
    desc: "Ich Liebe Deutsch Medan berdiri dan terdaftar serta memiliki izin operasional sebagai lembaga pendidikan.",
  },
  {
    icon: Clock,
    year: "6 Tahun",
    title: "Pengalaman di Jerman",
    desc: "Pendiri kami menjalani kehidupan di Jerman selama kurang lebih 6 tahun dan menyelesaikan Ausbildung pada tahun 2020 dengan hasil yang sangat memuaskan.",
  },
  {
    icon: Users,
    year: "Sekarang",
    title: "Pendampingan Penuh",
    desc: "Membimbing dan mempersiapkan siswa agar mampu menjalani kehidupan di Jerman secara mandiri dan percaya diri.",
  },
];

function TentangKami() {
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
            Profil Perusahaan
          </span>
          <h1 className="max-w-[18ch] text-balance font-display text-5xl leading-[1.05] text-surface md:text-6xl lg:text-7xl">
            Tentang Kami
          </h1>
          <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-surface/75">
            Ich Liebe Deutsch Medan — jembatan persahabatan Indonesia–Jerman untuk generasi
            penerus bangsa.
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Company Profile
              </p>
              <h2 className="max-w-[20ch] text-balance font-display text-4xl leading-tight md:text-5xl">
                Ich Liebe Deutsch Medan
              </h2>
              <p className="mt-5 font-display text-xl text-muted-foreground">
                Ich Liebe Deutsch Medan
              </p>
            </div>
            <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Ich Liebe Deutsch Medan merupakan lembaga kursus bahasa Jerman yang berdiri sejak
                tahun 2024 dan telah terdaftar serta memiliki izin operasional sebagai lembaga
                pendidikan. Kehadirannya berawal dari sebuah komitmen untuk membantu masyarakat
                Indonesia, khususnya dari Kota Medan dan sekitarnya, dalam mempersiapkan diri untuk
                melanjutkan pendidikan, mengikuti pelatihan kerja, maupun membangun kehidupan di
                Jerman.
              </p>
              <p>
                Ich Liebe Deutsch Medan didirikan oleh seorang Sarjana Pendidikan Bahasa Jerman
                Universitas Negeri Medan (UNIMED) yang memiliki pengalaman tinggal dan menjalani
                kehidupan di Jerman selama kurang lebih 6 tahun, serta menyelesaikan Ausbildung pada
                tahun 2020 dengan hasil yang sangat memuaskan. Pengalaman tersebut menjadi fondasi
                utama dalam membangun sistem pembelajaran yang tidak hanya berorientasi pada
                kemampuan bahasa, tetapi juga pada kesiapan siswa menghadapi kehidupan nyata di
                Jerman.
              </p>
              <p>
                Khusus bagi kandidat Ausbildung yang telah memperoleh kontrak kerja
                (Ausbildungsvertrag), kami memberikan pelatihan dan pendampingan yang disesuaikan
                dengan bidang Ausbildung yang akan dijalani — termasuk kosakata, ungkapan, situasi
                komunikasi, serta istilah yang relevan dengan bidang pekerjaan mereka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Perjalanan Kami
          </p>
          <h2 className="mb-14 max-w-[22ch] text-balance font-display text-4xl leading-tight md:text-5xl">
            Dari pengalaman nyata di Jerman menjadi lembaga pendidikan
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {MILESTONES.map((m) => (
              <article
                key={m.year}
                className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
              >
                <m.icon className="mb-5 h-7 w-7 text-primary" />
                <span className="font-display text-3xl text-accent">{m.year}</span>
                <h3 className="mt-3 text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2">
            <div className="rounded-3xl bg-ink p-8 text-surface md:p-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h2 className="font-display text-3xl">Unsere Vision</h2>
              </div>
              <blockquote className="text-pretty text-xl leading-relaxed text-surface/90 md:text-2xl">
                “Deutsch lernen. Deutschland verstehen. Zukunft gestalten.”
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-surface/70">
                Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan
                dengan lebih baik.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-3xl">Mission</h2>
              </div>
              <ul className="space-y-5">
                {[
                  "Belajar bahasa Jerman bukan sekadar menguasai tata bahasa dan menghafal kosakata — bahasa adalah bekal untuk berkomunikasi, beradaptasi, belajar, dan bekerja secara mandiri di Jerman",
                  "Kami tidak hanya mengantarkan siswa menuju Jerman, tetapi membimbing dan mempersiapkan siswa agar mampu menjalani kehidupan di Jerman secara mandiri dan percaya diri",
                  "Keberhasilan di Jerman ditentukan oleh kesiapan bahasa, mental, pengetahuan budaya, kemampuan beradaptasi, dan kemandirian menjalani kehidupan sehari-hari",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-pretty leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Info & CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 max-w-[20ch] text-balance font-display text-3xl leading-tight md:text-4xl">
                Hubungi Ich Liebe Deutsch Medan
              </h2>
              <p className="max-w-[50ch] text-pretty leading-relaxed text-muted-foreground">
                Punya pertanyaan seputar program Aupair, Ausbildung, atau FSJ Keperawatan? Tim kami
                siap membantu Anda.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Konsultasi Sekarang <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-6 rounded-2xl border border-border bg-card p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Alamat</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Komplek Waikiki, Jl. Flamboyan Raya No. 49 Blok F, Tj. Selamat, Kec. Medan
                    Tuntungan, Kota Medan, Sumatera Utara 20135
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Kontak</h3>
                  <p className="text-sm text-muted-foreground">WhatsApp: 0812-6596-5231</p>
                  <p className="text-sm text-muted-foreground">Telephone: 0812-6596-5231</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Email</h3>
                  <a
                    href="mailto:indonesiagerman@gmail.com"
                    className="text-sm text-primary transition-colors hover:underline"
                  >
                    indonesiagerman@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
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
