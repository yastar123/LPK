import { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp, X, Sparkles, Send } from "lucide-react";
import { useCms } from "@/lib/cms-store";

export function FloatingConsultation() {
  const { cms } = useCms();
  const k = cms.kontak;
  const navbar = cms.navbar;

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cleanWa = (k.hotlineWA || "081265965231").replace(/[^0-9]/g, "");
  const formattedWa = cleanWa.startsWith("0") ? "62" + cleanWa.slice(1) : cleanWa;
  const waUrl = `https://wa.me/${formattedWa}?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20tertarik%20untuk%20konsultasi%20program%20ke%20Jerman.`;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="floating-actions"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
    >
      {/* Back to top button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg border border-slate-200/80 backdrop-blur-md transition-all hover:bg-sky-50 hover:text-sky-600 hover:scale-110 active:scale-95"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Floating WhatsApp / Quick Contact Button */}
      <div className="relative group">
        {/* Pulsing glow ring */}
        <div className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-sm animate-pulse" />

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 hover:shadow-emerald-600/50"
          aria-label="Chat WhatsApp Admin ILD Medan"
        >
          <div className="relative flex h-6 w-6 items-center justify-center">
            <MessageCircle className="h-5 w-5 fill-white text-emerald-600" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
          </div>
          <span className="hidden sm:inline">Konsultasi WA</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
