import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Profil Perusahaan",
    children: [
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Legalitas", href: "/legalitas" },
      { label: "Struktur", href: "/struktur" },
    ],
  },
  {
    label: "Program",
    children: [
      { label: "Ausbildung", href: "/program-ausbildung" },
      { label: "Au Pair", href: "/program-aupair" },
      { label: "FSJ / BFD", href: "/program-fsj" },
      { label: "G to G", href: "/program-gtog" },
      { label: "Kuliah / Studium", href: "/program-kuliah" },
    ],
  },
  {
    label: "Portofolio",
    children: [
      { label: "Foto", href: "/foto" },
      { label: "Video", href: "/video" },
      { label: "Kegiatan Program", href: "/kegiatan-program" },
      { label: "Gathering", href: "/gathering" },
      { label: "Cooking Class", href: "/cooking-class" },
      { label: "Kegiatan Belajar", href: "/kegiatan-belajar" },
    ],
  },
  { label: "Team", href: "/team" },
  { label: "Persyaratan", href: "/persyaratan" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
];

const WA_LINK =
  "https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman.";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-foreground">
            I
          </div>
          <span className="text-sm font-semibold uppercase tracking-tight">
            Ich Liebe Deutsch Medan
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full w-60 translate-y-2 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background ring-1 ring-foreground/10 transition-colors hover:bg-primary sm:inline-block"
          >
            Mulai Konsultasi
          </a>
          <button
            type="button"
            className="rounded-md p-1.5 transition-colors hover:bg-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="max-h-[70vh] overflow-y-auto border-t border-border bg-background px-6 py-4 lg:hidden"
          aria-label="Navigasi seluler"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-muted">
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mb-1 ml-3 space-y-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-2">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Mulai Konsultasi
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
