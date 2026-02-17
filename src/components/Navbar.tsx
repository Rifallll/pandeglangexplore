import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import WeatherWidget from "@/components/WeatherWidget";
import MagneticButton from "@/components/MagneticButton";
import AdvancedSearch from "@/components/AdvancedSearch";
import EmergencyHub from "@/components/EmergencyHub";
import { Search, MapPin, AlertCircle, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { useSoundFX } from "@/hooks/useSoundFX";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { isMuted, setIsMuted } = useAudio();
  const { playSound } = useSoundFX();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock with smooth transition
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [isOpen]);

  const navLinks = [
    { name: t("nav.home"), href: "/", desc: t("nav.home_desc") },
    { name: t("nav.culinary"), href: "/kuliner", desc: t("nav.culinary_desc") },
    { name: t("nav.map"), href: "/peta", desc: t("nav.map_desc") },
    { name: t("nav.calendar"), href: "/kalender", desc: t("nav.calendar_desc") },
    { name: t("nav.about"), href: "/about", desc: t("nav.about_desc") },
  ];

  const handleNavClick = (e: React.MouseEvent, link: { name: string; href: string }) => {
    e.preventDefault();
    playSound("click");
    setIsOpen(false);
    navigate(link.href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const preloadRoute = (href: string) => {
    if (href === "/peta") import("../pages/MapPage");
    if (href === "/kuliner") import("../pages/CulinaryPage");
    if (href === "/albums") import("../pages/Albums");
    if (href === "/about") import("../pages/AboutPage");
    if (href === "/kalender") import("../pages/KalenderAcara");
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-[5000] flex justify-center transition-all duration-700 ${scrolled ? "top-4" : "top-6 md:top-8"
          }`}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-700
            ${scrolled
              ? "w-[95%] md:w-[90%] max-w-7xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 shadow-2xl"
              : "w-full max-w-7xl px-6 md:px-12 py-4 bg-transparent border-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo(0, 0); }}
            className="flex-none group flex items-center gap-3 z-50 mr-8"
          >
            <div className={`w-8 h-8 rounded-full border-2 border-[#C5A065] flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 ${scrolled ? "bg-[#C5A065]" : "bg-transparent"}`}>
              <span className={`text-[10px] font-bold ${scrolled ? "text-black" : "text-[#C5A065]"}`}>P</span>
            </div>
            <span className={`font-serif text-xl tracking-tighter font-bold transition-colors duration-500 hidden sm:block text-white`}>
              Pandeglang<span className="text-[#C5A065]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation - Clean & Minimal */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <MagneticButton strength={15} key={link.name}>
                  <button
                    onClick={(e) => handleNavClick(e, link)}
                    onMouseEnter={() => { preloadRoute(link.href); playSound("hover"); }}
                    aria-label={`Navigasi ke ${link.name}`}
                    className={`group relative text-[11px] uppercase tracking-widest font-bold transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-full ${scrolled ? "text-white/80 hover:text-white hover:bg-white/5" : "text-white/90 hover:text-[#C5A065] hover:bg-white/5"
                      }`}
                  >
                    {link.name}
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C5A065] transition-all duration-300 group-hover:w-4"></span>
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Desktop Tools - Right */}
          <div className="hidden md:flex items-center justify-end gap-3 flex-none ml-auto">
            <div className="flex items-center gap-2">
              {/* Global Search Trigger */}
              <div className="relative z-50 flex items-center gap-2">
                <MagneticButton strength={20}>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className={`p-2 rounded-full transition-all border ${scrolled ? "bg-white/10 border-white/10 text-white" : "bg-black/20 border-white/5 text-[#C5A065]"} hover:bg-[#C5A065] hover:text-black hover:border-[#C5A065] shadow-xl`}
                    aria-label="Cari Pandeglang"
                  >
                    <Search size={18} />
                  </button>
                </MagneticButton>

                <MagneticButton strength={25}>
                  <button
                    onClick={() => setIsEmergencyOpen(true)}
                    className={`p-2 rounded-full transition-all border animate-pulse ${scrolled ? "bg-red-500/20 border-red-500/50 text-red-500" : "bg-red-500/10 border-red-500/20 text-red-400"} hover:bg-red-500 hover:text-white hover:border-red-500 shadow-xl shadow-red-500/20`}
                    aria-label="Kontak Darurat"
                  >
                    <AlertCircle size={18} />
                  </button>
                </MagneticButton>
              </div>

              {/* Weather Widget Divider */}
              <div className="h-4 w-[1px] bg-white/20 hidden xl:block"></div>

              <div className="block">
                <WeatherWidget />
              </div>

              {/* Audio Toggle */}
              <div className="h-4 w-[1px] bg-white/20"></div>
              <MagneticButton strength={20}>
                <button
                  onClick={() => { setIsMuted(!isMuted); if (isMuted) playSound("success"); }}
                  className={`p-2 rounded-full transition-all border ${scrolled ? "bg-white/10 border-white/10 text-white" : "bg-black/20 border-white/5 text-[#C5A065]"} hover:bg-[#C5A065] hover:text-black hover:border-[#C5A065] shadow-xl`}
                  aria-label={isMuted ? "Enable Sound" : "Mute Sound"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </MagneticButton>

              {/* Simple Weather for smaller screens - Removed to use unified WeatherWidget */}

              {/* Language Switcher */}
              <button
                onClick={() => { setLang(lang === "ID" ? "EN" : "ID"); playSound("click"); }}
                className="text-white/60 hover:text-[#C5A065] text-[9px] md:text-[10px] font-black tracking-widest transition-colors flex items-center gap-1 md:gap-2 ml-0.5 md:ml-1"
              >
                {lang}
              </button>
            </div>
          </div>

          {/* Mobile Tools & Toggle */}
          <div className="lg:hidden flex items-center gap-1.5 ml-auto">
            <div className="bg-white/5 rounded-full border border-white/5 py-1 px-2.5 flex items-center gap-2 md:hidden">
              <WeatherWidget />
            </div>

            <button
              onClick={() => { setIsMuted(!isMuted); if (isMuted) playSound("success"); }}
              className={`p-2 rounded-full border ${isMuted ? "bg-white/5 border-white/10 text-white/40" : "bg-[#C5A065]/10 border-[#C5A065]/20 text-[#C5A065]"} md:hidden`}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#C5A065] bg-white/5 rounded-full border border-white/5 md:hidden"
              aria-label="Cari"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="p-2 text-red-500 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse md:hidden"
              aria-label="Darurat"
            >
              <AlertCircle size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>   {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[100010] bg-black/95 backdrop-blur-2xl flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[-10%] right-[-10%] w-[60%] aspect-square rounded-full bg-gradient-to-br from-[#C5A065]/20 to-transparent blur-3xl"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] aspect-square rounded-full bg-gradient-to-tr from-[#C5A065]/10 to-transparent blur-3xl"></div>
            </div>

            <div className="flex-1 flex flex-col justify-between min-h-[100svh] p-6 pb-32 relative z-10 w-full">
              <div className="space-y-4 mb-10">
                <p className="text-[#C5A065] font-mono text-[10px] tracking-[0.5em] uppercase border-l border-[#C5A065] pl-4 mb-6">Navigasi Utama</p>
                <div className="px-2">
                  <WeatherWidget />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={(e) => handleNavClick(e, link)}
                    aria-label={`Buka halaman ${link.name}`}
                    className="group flex flex-col items-start w-full"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-white/10 font-mono text-2xl group-active:text-[#C5A065] transition-colors">0{idx + 1}</span>
                      <h2 className="text-4xl font-bold text-white tracking-tighter group-active:text-[#C5A065] transition-all">
                        {link.name}
                      </h2>
                    </div>
                    <p className="text-white/30 text-[10px] uppercase font-mono tracking-widest pl-12 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.desc}
                    </p>
                  </motion.button>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-8 pb-8 safe-bottom">
                <div className="flex justify-between items-center px-2">
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-1">Status Pariwisata</p>
                    <p className="text-[10px] text-white/60 font-medium">Buka • Selalu Tersedia</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-1">Zona Waktu</p>
                    <p className="text-[10px] text-[#C5A065] font-bold">GMT+7 (WIB)</p>
                  </div>
                </div>

                {/* BOTTOM QUICK DOCK (Mobile Action Center) */}
                <div className="grid grid-cols-2 gap-3 px-1">
                  <button
                    onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 active:bg-[#C5A065] active:text-black transition-all"
                  >
                    <Search size={18} className="text-[#C5A065]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Cari</span>
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); setIsEmergencyOpen(true); }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 rounded-2xl border border-red-500/20 active:bg-red-500 active:text-white transition-all"
                  >
                    <AlertCircle size={18} className="text-red-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 group-active:text-white">Darurat</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 px-1">
                  <button
                    onClick={(e) => handleNavClick(e, { name: "Home", href: "/" })}
                    aria-label="Kembali ke Beranda"
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5 active:bg-[#C5A065] active:text-black transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-active:bg-black"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Beranda</span>
                  </button>
                  <button
                    onClick={(e) => handleNavClick(e, { name: "Peta", href: "/peta" })}
                    aria-label="Buka Peta Interaktif"
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5 active:bg-[#C5A065] active:text-black transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-active:bg-black"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Peta</span>
                  </button>
                  <button
                    onClick={(e) => handleNavClick(e, { name: "Kuliner", href: "/kuliner" })}
                    aria-label="Buka Daftar Kuliner"
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5 active:bg-[#C5A065] active:text-black transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-active:bg-black"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Kuliner</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdvancedSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        mode="modal"
      />

      <EmergencyHub
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </>
  );
};

export default Navbar;