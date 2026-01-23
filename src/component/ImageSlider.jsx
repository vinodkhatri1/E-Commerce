import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import ProductData from "../Data/ProductData";
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
    gradient: "from-blue-50 to-indigo-100",
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
    gradient: "from-rose-50 to-orange-100",
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
    gradient: "from-emerald-50 to-teal-100",
    shadow: "shadow-emerald-500/20",
  },
];

const AUTO_TIME = 7000;
const dynamicCategories = [
  ...new Set(ProductData?.map((p) => p.category) || []),
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };
  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(
      () => {
        nextSlide();
      },
      AUTO_TIME * (1 - progress / 100),
    );

    return () => clearTimeout(timer);
  }, [current, isHovered, progress, nextSlide]);
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, AUTO_TIME / 200);

    return () => clearInterval(interval);
  }, [isHovered, current]);

  const slide = slides[current];

  return (
    <div className="flex flex-col md:flex-row w-full bg-white overflow-hidden rounded-3xl shadow-2xl border border-slate-100">
      {/* --- SIDEBAR CATEGORIES --- */}
      <div className="w-full md:w-72 bg-slate-50/50 p-4 border-r border-slate-100 hidden lg:block">
        <div className="mb-4 px-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Collections
          </h3>
        </div>
        <div className="space-y-1">
          {dynamicCategories.slice(0, 11).map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="group flex items-center justify-between h-11 px-4 rounded-xl transition-all hover:bg-white hover:shadow-sm hover:translate-x-1"
            >
              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors capitalize">
                {cat}
              </span>
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 text-slate-400 transition-all"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* --- SLIDER MAIN AREA --- */}
      <div
        className={`relative flex-1 overflow-hidden transition-colors duration-1000 bg-linear-to-br ${slide.gradient}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/5 backdrop-blur-sm z-50 overflow-hidden">
          <div
            className={`h-full ${slide.accent} shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all ease-linear`}
            style={{
              width: `${progress}%`,
              transitionDuration: isHovered ? "0ms" : "100ms", // Smooth gliding
            }}
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-8 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between min-h-125 lg:min-h-150 py-12 relative z-10">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start max-w-xl">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-white/50">
                <Sparkles size={14} className={slide.textAccent} />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  {slide.category} • 2026 Edition
                </span>
              </div>
            </div>

            <h1
              key={`title-${current}`}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700"
            >
              {slide.title.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? slide.textAccent : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p
              key={`sub-${current}`}
              className="text-base md:text-lg text-slate-600 font-medium max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100"
            >
              {slide.subtitle}
            </p>

            <div className="pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              <Link to={slide.link}>
                <button
                  className={`${slide.accent} ${slide.shadow} text-white rounded-2xl px-8 py-4 font-black text-xs uppercase tracking-[0.15em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group`}
                >
                  <ShoppingBag size={18} /> Explore Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative w-full max-w-70 md:max-w-md lg:max-w-lg flex justify-center items-center">
            {/* Background Glow */}
            <div
              className={`absolute inset-0 scale-125 opacity-20 blur-[100px] rounded-full transition-all duration-1000 ${slide.accent}`}
            />

            <div
              key={`img-${current}`}
              className="relative z-10 animate-in zoom-in-90 fade-in duration-1000"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-auto max-h-112.5 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              />
              {/* Product Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-slate-900/10 blur-3xl rounded-[100%]" />
            </div>
          </div>
        </div>

        {/* --- NAVIGATION CONTROLS --- */}
        <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-6 pointer-events-none z-30">
          <button
            onClick={prevSlide}
            className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-2xl pointer-events-auto active:scale-90 group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-2xl pointer-events-auto active:scale-90 group"
          >
            <ChevronRight
              size={20}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Bottom Pagination */}
        <div className="absolute bottom-8 left-0 w-full px-12 flex justify-between items-end z-40">
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative h-1.5 rounded-full transition-all duration-500 bg-slate-300/50 overflow-hidden ${
                  current === index
                    ? "w-16"
                    : "w-6 hover:w-10 hover:bg-slate-400"
                }`}
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

          <div className="hidden sm:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="text-slate-900 text-sm">0{current + 1}</span> / 0
              {slides.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
