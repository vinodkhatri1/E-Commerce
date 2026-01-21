import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    id: 1,
    category: "Computing",
    title: "Work Faster. Play Harder.",
    subtitle:
      "The 2026 Notebook Pro features liquid-cooled mobile chips for desktop-class performance.",
    image: "https://techterms.com/img/xl/laptop_586.png",
    link: "/category/laptops",
    accent: "bg-blue-600",
    textAccent: "text-blue-600",
    gradient: "from-blue-50/50 to-indigo-50/30",
    shadow: "shadow-blue-500/20",
  },
  {
    id: 2,
    category: "Audio",
    title: "Silence Never Better.",
    subtitle:
      "Experience 85 hours of immersion with adaptive noise cancellation technology.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    link: "/category/audio",
    accent: "bg-rose-600",
    textAccent: "text-rose-600",
    gradient: "from-rose-50/50 to-orange-50/30",
    shadow: "shadow-rose-500/20",
  },
  {
    id: 3,
    category: "Wearables",
    title: "Health, In Real Time.",
    subtitle:
      "Monitor vital signs with clinical accuracy using the ZenWatch Series 5.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    link: "/category/wearables",
    accent: "bg-emerald-600",
    textAccent: "text-emerald-600",
    gradient: "from-emerald-50/50 to-teal-50/30",
    shadow: "shadow-emerald-500/20",
  },
];

const AUTO_TIME = 6000;

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  useEffect(() => {
    if (isHovered) {
      clearInterval(timerRef.current);
      return;
    }
    const startTime = Date.now() - (progress / 100) * AUTO_TIME;
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / AUTO_TIME) * 100;
      if (newProgress >= 100) {
        nextSlide();
      } else {
        setProgress(newProgress);
      }
    }, 16);
    return () => clearInterval(timerRef.current);
  }, [isHovered, nextSlide, progress]);

  const slide = slides[current];

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-700 bg-gradient-to-br ${slide.gradient}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/5 z-50">
        <div
          className={`h-full transition-all linear ${slide.accent}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Container - Increased z-index to stay above background elements */}
      <div className="container mx-auto px-12 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between min-h-[450px] lg:min-h-[550px] py-10 md:py-0 relative z-10">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:gap-5 text-center md:text-left items-center md:items-start max-w-lg">
          <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100">
              <Sparkles size={12} className={slide.textAccent} />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                {slide.category} • 2026 Edition
              </span>
            </div>
          </div>

          <h1
            key={`title-${current}`}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {slide.title.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? slide.textAccent : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <p
            key={`sub-${current}`}
            className="text-sm md:text-base text-slate-600 font-medium max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
          >
            {slide.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <Link to={slide.link} className="z-20">
              <button
                className={`${slide.accent} ${slide.shadow} text-white rounded-xl px-6 py-3 font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center gap-2 group`}
              >
                <ShoppingBag size={16} /> Shop Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full max-w-[280px] md:max-w-md lg:max-w-lg flex justify-center items-center mb-6 md:mb-0">
          <div
            className={`absolute inset-0 scale-110 opacity-10 blur-[80px] rounded-full transition-all duration-700 ${slide.accent}`}
          />
          <div
            key={`img-${current}`}
            className="relative z-10 animate-in zoom-in-95 fade-in duration-700"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[220px] md:h-[350px] lg:h-[400px] object-contain drop-shadow-xl mix-blend-mode-multiply"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-slate-900/5 blur-2xl rounded-[100%]" />
          </div>
        </div>
      </div>

      {/* --- FIXED NAVIGATION BUTTONS --- */}
      {/* pointer-events-none allows clicks to pass through the container to the content below */}
      <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-4 pointer-events-none z-30">
        <button
          onClick={prevSlide}
          className="p-3 md:p-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-slate-800 hover:bg-white transition-all shadow-xl pointer-events-auto active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 md:p-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-slate-800 hover:bg-white transition-all shadow-xl pointer-events-auto active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-6 left-0 w-full px-10 flex justify-between items-center z-40">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setProgress(0);
              }}
              className={`h-1 rounded-full transition-all duration-500 overflow-hidden ${current === index ? "w-10 bg-slate-200" : "w-4 bg-slate-300"}`}
            >
              {current === index && (
                <div
                  className={`h-full ${slide.accent}`}
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
            0{current + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
