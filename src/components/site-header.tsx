import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X, LogIn, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCms } from "@/lib/cms-store";

export function SiteHeader() {
  const { cms } = useCms();
  const navbar = cms.navbar;

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const location = useLocation();
  const currentPath = location.pathname;

  const taglines =
    navbar.taglines && navbar.taglines.length > 0 ? navbar.taglines : ["Medan • German Pathway"];

  // Rotasi tagline header otomatis setiap 3 detik
  useEffect(() => {
    if (taglines.length <= 1) return;
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [taglines.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = currentPath === "/" || currentPath === "";
  const isTransparent = isHome && !isScrolled;
  const navItems = navbar.navItems || [];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "top-0 text-white bg-transparent border-b border-transparent"
          : "top-3 sm:top-4 px-3 sm:px-6 text-slate-800"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          isTransparent
            ? "h-20 w-full max-w-7xl px-4 sm:px-6"
            : "h-16 w-[96%] sm:w-[94%] max-w-7xl rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-950/10 px-3 sm:px-5 lg:px-6"
        }`}
      >
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full overflow-hidden transition-transform group-hover:scale-105">
            <img
              src={navbar.logoUrl || "/logo.png"}
              alt={`${navbar.brandTitle} Logo`}
              className="h-full w-full object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.innerHTML =
                    '<div class="flex h-full w-full items-center justify-center bg-sky-500 text-white font-bold text-xs rounded-full">ILD</div>';
                }
              }}
            />
          </div>
          <div className="shrink-0">
            <span
              className={`block text-xs sm:text-sm font-bold tracking-tight leading-none whitespace-nowrap ${
                isTransparent
                  ? "text-white drop-shadow-xs"
                  : "text-slate-900 group-hover:text-sky-600 transition-colors"
              }`}
            >
              {navbar.brandTitle || "Ich Liebe Deutsch"}
            </span>
            <span
              key={taglineIndex}
              className={`block text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap mt-0.5 animate-fade-in transition-all ${
                isTransparent ? "text-sky-400 drop-shadow-xs" : "text-sky-600"
              }`}
            >
              {taglines[taglineIndex % taglines.length]}
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden items-center gap-0.5 lg:flex xl:gap-1 text-xs font-semibold"
          aria-label="Navigasi utama"
        >
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isActive =
              item.href === currentPath ||
              (item.children && item.children.some((c) => c.href === currentPath));

            if (hasChildren) {
              return (
                <div key={item.id || item.label} className="relative group py-2">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 xl:px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                      isTransparent
                        ? isActive
                          ? "bg-white/20 text-white border border-white/20 shadow-xs backdrop-blur-xs"
                          : "text-slate-200 hover:text-white hover:bg-white/15"
                        : isActive
                          ? "bg-sky-50 text-sky-700 font-bold"
                          : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </button>

                  <div className="absolute left-0 top-full hidden pt-2 group-hover:block group-focus-within:block animate-fade-in z-50">
                    <ul className="min-w-[200px] rounded-2xl bg-white/95 backdrop-blur-xl p-2 shadow-2xl border border-slate-200/80 text-slate-800 space-y-0.5">
                      {item.children?.map((child) => {
                        const isChildActive = child.href === currentPath;
                        return (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              className={`block rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                                isChildActive
                                  ? "bg-sky-500 text-white font-bold shadow-xs"
                                  : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.id || item.label}
                href={item.href || "/"}
                className={`rounded-full px-2.5 xl:px-3 py-1.5 transition-colors whitespace-nowrap ${
                  isTransparent
                    ? isActive
                      ? "bg-white/20 text-white border border-white/20 shadow-xs backdrop-blur-xs"
                      : "text-slate-200 hover:text-white hover:bg-white/15"
                    : isActive
                      ? "bg-sky-50 text-sky-700 font-bold"
                      : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button (Pill Layout matching reference image) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Link
            to="/login"
            className={`items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all inline-flex ${
              isTransparent
                ? "text-white/90 hover:text-white hover:bg-white/15 border border-white/20"
                : "text-slate-700 hover:text-sky-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Masuk</span>
          </Link>

          <a
            href={navbar.ctaButton?.href || "https://wa.me/6282127324453"}
            target={navbar.ctaButton?.isExternal ? "_blank" : undefined}
            rel="noreferrer"
            className={`hidden items-center gap-1.5 rounded-full px-3.5 xl:px-5 py-2 text-xs font-bold whitespace-nowrap shrink-0 transition-all sm:inline-flex ${
              isTransparent
                ? "bg-white text-sky-700 shadow-md hover:bg-slate-100 hover:shadow-lg"
                : "bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30"
            }`}
          >
            <span className="whitespace-nowrap">
              {navbar.ctaButton?.label || "Konsultasi Gratis"}
            </span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>

          <button
            type="button"
            className={`rounded-full p-2 shrink-0 transition-colors lg:hidden ${
              isTransparent
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <nav
          className={`mx-auto mt-2 max-h-[80vh] overflow-y-auto rounded-3xl p-5 lg:hidden animate-fade-up shadow-2xl max-w-lg ${
            isTransparent
              ? "border border-white/10 bg-slate-950/95 backdrop-blur-xl text-white"
              : "border border-slate-200 bg-white/95 backdrop-blur-xl text-slate-800"
          }`}
          aria-label="Navigasi seluler"
        >
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.id || item.label}>
                {item.children ? (
                  <details className="group">
                    <summary
                      className={`flex cursor-pointer list-none items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold ${
                        isTransparent
                          ? "text-slate-200 hover:bg-white/10"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul
                      className={`mb-1 ml-3 space-y-1 border-l pl-3 pt-1 ${
                        isTransparent ? "border-white/10" : "border-slate-200"
                      }`}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`block rounded-lg px-3 py-2 text-xs font-medium ${
                              isTransparent
                                ? "text-slate-300 hover:bg-sky-600 hover:text-white"
                                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                            }`}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a
                    href={item.href || "/"}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold ${
                      isTransparent
                        ? "text-slate-200 hover:bg-white/10"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-3 space-y-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-center text-xs font-bold border transition-colors ${
                  isTransparent
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-800 hover:bg-slate-50"
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span>Masuk ke Portal</span>
              </Link>
              <a
                href={navbar.ctaButton?.href || "https://wa.me/6282127324453"}
                target={navbar.ctaButton?.isExternal ? "_blank" : undefined}
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:bg-sky-600"
              >
                <span>{navbar.ctaButton?.label || "Konsultasi Gratis"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
