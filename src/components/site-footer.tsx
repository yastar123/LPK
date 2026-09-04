import { Link } from "@tanstack/react-router";
import { Database, Mail, MapPin, Phone, Send, Check, LogIn, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useCms } from "@/lib/cms-store";

export function SiteFooter() {
  const { cms } = useCms();
  const footer = cms.footer;
  const navbar = cms.navbar;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus("success");
      setMsg(data.message || "Terima kasih telah berlangganan info program!");
      setEmail("");
    } catch {
      setStatus("success");
      setMsg("Terima kasih telah berlangganan info program!");
      setEmail("");
    }
  }

  const cleanWhatsappNumber = (footer.whatsapp || "082127324453").replace(/[^0-9]/g, "");
  const formattedWa = cleanWhatsappNumber.startsWith("0")
    ? "62" + cleanWhatsappNumber.slice(1)
    : cleanWhatsappNumber;

  return (
    <footer
      id="kontak"
      className="scroll-mt-24 border-t border-sky-900/30 bg-slate-950 text-slate-400"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden bg-white/10 p-0.5">
                <img
                  src={navbar.logoUrl || "/logo.png"}
                  alt={navbar.brandTitle || "ICH LIEBE DEUTSCH MEDAN"}
                  className="h-full w-full object-contain rounded-full"
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
              <div>
                <h3 className="font-bold text-base text-white">
                  {navbar.brandTitle || "ICH LIEBE DEUTSCH MEDAN"}
                </h3>
                <p className="text-[11px] text-sky-400 font-medium">
                  {navbar.brandSubtitle || "Medan • German Pathway"}
                </p>
              </div>
            </div>
            <p className="mb-5 max-w-[36ch] text-xs leading-relaxed text-slate-400">
              {footer.brandDesc ||
                "Lembaga persiapan dan penyelenggara program Ausbildung, Au Pair, & FSJ ke Jerman terpercaya di Sumatera Utara."}
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-950/40 px-3 py-1 text-[11px] font-medium text-sky-300">
              <Database className="h-3 w-3 text-sky-400" />
              <span>{footer.badgeText || "ReactJS + ExpressJS + PostgreSQL"}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <MapPin className="h-4 w-4 text-sky-400" /> Alamat Kantor
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              {footer.officeAddress || "Jl. Ternak II No. 39, Medan Polonia"}
            </p>
            {footer.operatingHours && (
              <p className="mt-2 text-[11px] text-slate-500">{footer.operatingHours}</p>
            )}
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <Phone className="h-4 w-4 text-sky-400" /> Kontak Kami
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-sky-400">WA:</span>
                <a
                  href={`https://wa.me/${formattedWa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-sky-300"
                >
                  {footer.whatsapp || "082127324453"}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-sky-400">Telp:</span>{" "}
                {footer.phone || "082127324453"}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-sky-400" />
                <a
                  href={`mailto:${footer.email || "ichliebedtschmedan@gmail.com"}`}
                  className="transition-colors hover:text-sky-300"
                >
                  {footer.email || "ichliebedtschmedan@gmail.com"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              {footer.newsletterTitle || "Buletin & Info Beasiswa"}
            </h4>
            <p className="mb-3 text-xs leading-relaxed text-slate-400">
              {footer.newsletterDesc ||
                "Dapatkan pembaruan jadwal seleksi dan info beasiswa pelatihan bahasa Jerman."}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                  className="w-full rounded-xl border border-sky-900/60 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600 text-white transition-colors hover:bg-sky-500"
                  aria-label="Subscribe"
                >
                  {status === "success" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              {status === "success" && (
                <p className="text-[11px] text-sky-400 font-medium">{msg}</p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-6 text-[11px] font-medium text-slate-500 md:flex-row">
          <p>{footer.copyrightText || "©2026 Ich Liebe Deutsch Medan. All rights reserved."}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-400 transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>{footer.portalLinkText || "Portal Masuk Siswa & Pengajar"}</span>
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Admin Dashboard CMS</span>
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <p className="text-sky-400/80">{footer.domainText || "www.germaneducation.or.id"}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
