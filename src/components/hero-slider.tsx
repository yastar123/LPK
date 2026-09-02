import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCms } from "@/lib/cms-store";

export function HeroSlider() {
  const { cms } = useCms();
  const slides = cms.home?.heroSlides || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide timer every 4.5 seconds when not paused
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) {
    return null;
  }

  const safeIndex = currentIndex % slides.length;
  const currentSlide = slides[safeIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="hero-slider"
      className="relative min-h-[640px] h-[92vh] sm:h-[95vh] lg:h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center select-none bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Slider Utama"
    >
      {/* Background Images with Cross-Fade & Ken Burns slow zoom */}
      {slides.map((slide, index) => {
        const isActive = index === safeIndex;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`h-full w-full object-cover object-center transition-transform duration-8000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
            {/* Multi-layer atmospheric dark overlay for pristine contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/40" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        );
      })}

      {/* German Flag Subtle Color Accent Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex h-1 w-full">
        <div className="h-full flex-1 bg-slate-900" />
        <div className="h-full flex-1 bg-red-600" />
        <div className="h-full flex-1 bg-amber-400" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 pt-24 pb-20 text-center">
        <div key={safeIndex} className="animate-fade-up">
          {/* Subheading Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-widest text-sky-300 shadow-md mb-4 sm:mb-5">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>{currentSlide.subheading || "German Pathway Medan"}</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white [text-shadow:_0_3px_24px_rgb(0_0_0_/_80%)] leading-[1.12]">
            {currentSlide.title}
          </h1>

          {/* Gold Divider Line */}
          <div className="mx-auto my-4 sm:my-5 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-md shadow-amber-400/30" />

          {/* Description Text */}
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-100 font-normal sm:font-medium [text-shadow:_0_2px_12px_rgb(0_0_0_/_80%)]">
            {currentSlide.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {currentSlide.button1 && (
              <a
                href={currentSlide.button1.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 backdrop-blur-md px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold tracking-wider text-white transition-all hover:bg-white hover:text-slate-900 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span>{currentSlide.button1.label}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            )}

            {currentSlide.button2 && (
              <a
                href={currentSlide.button2.href}
                target={currentSlide.button2.isExternal ? "_blank" : undefined}
                rel={currentSlide.button2.isExternal ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold tracking-wider text-white shadow-xl shadow-sky-600/30 transition-all hover:scale-105 hover:shadow-sky-500/50 active:scale-95"
              >
                <span>{currentSlide.button2.label}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/30 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 hover:scale-110 shadow-lg active:scale-95"
            aria-label="Slide Sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/30 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 hover:scale-110 shadow-lg active:scale-95"
            aria-label="Slide Selanjutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Bottom Slider Indicators / Dot Progression */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-8 h-2 bg-gradient-to-r from-amber-400 to-sky-400 shadow-md"
                    : "w-2 h-2 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Pindah ke Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
