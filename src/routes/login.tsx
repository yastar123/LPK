import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
const heroBrandenburg = "/assets/hero-brandenburg.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk Portal Admin — Ich Liebe Deutsch Medan" },
      {
        name: "description",
        content:
          "Halaman login portal resmi Ich Liebe Deutsch Medan untuk staf dan administrator mengelola CMS, data pendaftaran, dan konfigurasi website.",
      },
      { property: "og:title", content: "Masuk Portal Admin — Ich Liebe Deutsch Medan" },
      {
        property: "og:description",
        content: "Akses portal administrasi dan CMS Ich Liebe Deutsch Medan.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.replace(/^["']|["']$/g, "").trim();
    const cleanPassword = password.replace(/^["']|["']$/g, "").trim();

    if (!cleanEmail) {
      setErrorMsg("Silakan masukkan alamat e-mail akun Anda.");
      return;
    }
    if (!cleanPassword) {
      setErrorMsg("Silakan masukkan kata sandi akun Anda.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.success && data.user) {
          localStorage.setItem(
            "admin_session",
            JSON.stringify({
              email: data.user.email,
              role: data.user.role || "admin",
              name: data.user.name || "Administrator LPK",
              token: data.token,
              loggedInAt: new Date().toISOString(),
            }),
          );
          setIsLoading(false);
          navigate({ to: "/admin" });
          return;
        } else {
          setErrorMsg(data.error || "E-mail atau kata sandi yang Anda masukkan salah.");
          setIsLoading(false);
          return;
        }
      } else if (!res.ok && contentType.includes("application/json")) {
        const errorData = await res.json().catch(() => ({}));
        setErrorMsg(errorData.error || "E-mail atau kata sandi yang Anda masukkan salah.");
        setIsLoading(false);
        return;
      }
    } catch {
      // Fallback check continues below
    }

    // Client-side fallback check (for preview & offline resilience)
    const targetEmail = "admin@acc.co.id";
    const targetPass = "password123";

    if (cleanEmail.toLowerCase() === targetEmail.toLowerCase() && cleanPassword === targetPass) {
      localStorage.setItem(
        "admin_session",
        JSON.stringify({
          email: targetEmail,
          role: "admin",
          name: "Administrator LPK",
          loggedInAt: new Date().toISOString(),
        }),
      );
      setIsLoading(false);
      navigate({ to: "/admin" });
    } else {
      setErrorMsg("E-mail atau kata sandi yang Anda masukkan salah.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-x-hidden font-sans">
      {/* LEFT COLUMN: Visual Brand Section (Full Screen Split) */}
      <div className="relative lg:w-1/2 xl:w-7/12 flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16 text-white min-h-[460px] lg:min-h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src={heroBrandenburg}
          alt="Brandenburg Gate Germany"
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-sky-950/75" />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Top Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/30 overflow-hidden p-1 transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Ich Liebe Deutsch"
                className="h-full w-full object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight">
                Ich Liebe Deutsch
              </h2>
              <p className="text-[11px] uppercase tracking-wider font-bold text-sky-400">
                Medan • German Pathway
              </p>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-sky-200 border border-white/15">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Portal Administrator</span>
          </span>
        </div>

        {/* Middle Content Hero */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/30 px-3.5 py-1 text-xs font-bold text-sky-300 mb-4 backdrop-blur-md">
            <KeyRound className="h-3.5 w-3.5 text-sky-400" />
            <span>Sistem Manajemen Terpadu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Pusat Kendali CMS & Registrasi Lembaga
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Kelola seluruh pembaruan informasi website, publikasi program Ausbildung & Au Pair,
            serta verifikasi data konsultasi peserta secara terenkripsi dan otomatis.
          </p>
        </div>

        {/* Bottom Footer Quote */}
        <div className="relative z-10 border-t border-white/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p className="italic text-slate-300">
            “Deutsch lernen. Deutschland verstehen. Zukunft gestalten.”
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistem Online & Aman</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Form Area (Full Height) */}
      <div className="lg:w-1/2 xl:w-5/12 bg-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 min-h-screen text-slate-900 border-l border-slate-200">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <span className="text-xs font-semibold text-slate-500">Ich Liebe Deutsch Medan</span>
        </div>

        {/* Main Center Container */}
        <div className="my-auto max-w-md w-full mx-auto">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-700">
                  <KeyRound className="h-3.5 w-3.5 text-sky-600" />
                  <span>Masuk Administrator</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Masuk Portal Admin
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                Silakan masukkan e-mail resmi staf dan kata sandi Anda di bawah ini.
              </p>
            </div>

            {/* Error Alert */}
            {errorMsg && (
              <div className="mb-5 flex items-start gap-2.5 rounded-2xl bg-rose-50 p-3.5 border border-rose-200 text-rose-700 text-xs animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Element */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Alamat E-mail Administrator
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@acc.co.id"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Kata Sandi (Passwort)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-11 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    Ingat saya di perangkat ini
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 py-3.5 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-sky-500/40 active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Portal Admin</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Quick autofill helper */}
              <div className="mt-3 p-3 rounded-xl bg-slate-100/70 border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                <div>
                  <span className="font-semibold text-slate-700 block">Akun Admin:</span>
                  <span>admin@acc.co.id &bull; password123</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@acc.co.id");
                    setPassword("password123");
                    setErrorMsg("");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold text-[11px] transition-colors"
                >
                  Isi Otomatis
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
