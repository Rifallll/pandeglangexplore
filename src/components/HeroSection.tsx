import React, { useEffect } from "react";
const heroBg = "/images/hero_pandeglang.png";
import { ChevronDown, Crown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { useWeatherSmart } from "@/hooks/useWeatherSmart";
import { Sparkles } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const { t, lang } = useLanguage();
  const { recommendation, loading } = useWeatherSmart();

  // Parallax & Fade Effects
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center bg-black perspective-1000">
      {/* Background Image - Fixed Scenery with Parallax */}
      <motion.div
        style={{
          scale,
          x: useSpring(useTransform(scrollY, [0, 0], [mousePosition.x * -30, mousePosition.x * -30]), { stiffness: 50, damping: 20 }),
          y: useSpring(useTransform(scrollY, [0, 0], [mousePosition.y * -30, mousePosition.y * -30]), { stiffness: 50, damping: 20 })
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 1 }} // Slight zoom to allow movement edges
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[-5%]" // Expand slightly to avoid white edges during move
      >
        <OptimizedImage
          src={heroBg}
          alt="Pandeglang Scenery"
          priority={true}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* MAHAKARYA LABEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-6 border border-[#C5A065]/30 px-6 py-2 rounded-full bg-[#C5A065]/10 backdrop-blur-md shadow-[0_0_20px_rgba(197,160,101,0.2)]"
          >
            <Crown size={14} className="text-[#C5A065] animate-pulse" />
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#C5A065] font-black">
              {lang === "ID" ? "MAHAKARYA PANDEGLANG" : "THE GRAND MASTERPIECE"}
            </span>
          </motion.div>

          <motion.h1
            style={{ y: y1 }}
            className="text-[clamp(2.5rem,12vw,9rem)] font-serif text-white mb-8 tracking-tighter leading-[0.85] font-bold"
          >
            {t("hero.title")}<span className="text-[#C5A065]">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="text-sm md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-14 font-sans font-light tracking-wide italic px-4"
          >
            {t("hero.subtitle")}
          </motion.p>

          <Button
            className="group relative bg-[#C5A065] border border-[#C5A065] text-black hover:bg-white hover:border-white text-[10px] tracking-[0.3em] uppercase px-12 py-7 rounded-full transition-all duration-700 font-black shadow-[0_20px_50px_rgba(197,160,101,0.3)] overflow-hidden gold-pulse mb-8"
            onClick={handleScrollDown}
          >
            <span className="relative z-10">{t("hero.cta")}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Button>

          {/* Weather Smart Suggestion */}
          <AnimatePresence>
            {!loading && recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="group cursor-help relative"
              >
                <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:bg-black/60 transition-all duration-500 w-[calc(100vw-2rem)] md:max-w-md mx-auto">
                  <div className={`p-2.5 md:p-3 rounded-xl bg-white/5 ${recommendation.color} shadow-inner flex-shrink-0`}>
                    <recommendation.icon size={18} className="animate-pulse" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Sparkles size={8} className="text-[#C5A065]" />
                      <span className="text-[#C5A065] text-[8px] md:text-[9px] font-black uppercase tracking-widest truncate">{lang === "ID" ? "Saran Jawara" : "Jawara Choice"}</span>
                    </div>
                    <h4 className="text-white text-[11px] md:text-xs font-bold mb-0.5 truncate">{recommendation.title}</h4>
                    <p className="text-white/40 text-[9px] md:text-[10px] leading-snug line-clamp-1 italic">{recommendation.description}</p>
                  </div>
                </div>

                {/* Tooltip on Hover - Only for Desktop */}
                <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-4 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-50 shadow-2xl scale-95 group-hover:scale-100">
                  <p className="text-[#C5A065] text-[8px] font-black uppercase tracking-widest mb-3 border-b border-white/10 pb-2">{lang === "ID" ? "Tips Perjalanan" : "Travel Tips"}</p>
                  <ul className="space-y-2">
                    {recommendation.tips.map((tip, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-white/70">
                        <div className="w-1 h-1 rounded-full bg-[#C5A065]"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#C5A065] to-transparent"></div>
        <ChevronDown className="h-4 w-4 text-[#C5A065] animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;