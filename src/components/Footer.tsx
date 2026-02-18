"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#111] text-white pt-12 md:pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Column 1: Brand & Description */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-white tracking-tight">
              Pandeglang
            </h3>
            <p className="text-white/60 mb-6 font-light text-sm leading-relaxed text-justify">
              {t("footer.desc")}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Kunjungi Facebook kami" className="bg-white/5 hover:bg-white/20 p-2.5 rounded-full transition-colors duration-300 group">
                <Facebook size={18} strokeWidth={1.5} className="text-white/70 group-hover:text-white" />
              </a>
              <a href="#" aria-label="Ikuti Instagram kami" className="bg-white/5 hover:bg-white/20 p-2.5 rounded-full transition-colors duration-300 group">
                <Instagram size={18} strokeWidth={1.5} className="text-white/70 group-hover:text-white" />
              </a>
              <a href="#" aria-label="Ikuti Twitter kami" className="bg-white/5 hover:bg-white/20 p-2.5 rounded-full transition-colors duration-300 group">
                <Twitter size={18} strokeWidth={1.5} className="text-white/70 group-hover:text-white" />
              </a>
              <a href="#" aria-label="Tonton Youtube kami" className="bg-white/5 hover:bg-white/20 p-2.5 rounded-full transition-colors duration-300 group">
                <Youtube size={18} strokeWidth={1.5} className="text-white/70 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Jelajahi */}
          <nav aria-label="Navigasi Jelajah">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t("footer.explore")}</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="/" className="hover:text-white transition-colors duration-300">{t("footer.links.home")}</a></li>
              <li><a href="/peta" className="hover:text-white transition-colors duration-300">{t("footer.links.map")}</a></li>
              <li><a href="/kuliner" className="hover:text-white transition-colors duration-300">{t("footer.links.culinary")}</a></li>
              <li><a href="/albums" className="hover:text-white transition-colors duration-300">{t("footer.links.gallery")}</a></li>
            </ul>
          </nav>

          {/* Column 3: Informasi */}
          <nav aria-label="Navigasi Informasi">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t("footer.info")}</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="/about" className="hover:text-white transition-colors duration-300">{t("footer.links.about")}</a></li>
              <li><a href="/kalender" className="hover:text-white transition-colors duration-300">{t("footer.links.events")}</a></li>
              <li><a href="/konservasi" className="hover:text-white transition-colors duration-300">{t("footer.links.conservation")}</a></li>
              <li><a href="/peta" className="hover:text-white transition-colors duration-300">{t("footer.links.guide")}</a></li>
            </ul>
          </nav>

          {/* Column 4: Kontak */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t("footer.contact")}</h4>
            <ul className="space-y-5 text-sm font-light text-white/60">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span className="leading-relaxed">Jl. Mayor Widagdo No.1, Pandeglang</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="shrink-0" />
                <span>+62 253 123 456</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="shrink-0" />
                <a href="mailto:info@pandeglang.go.id" className="hover:text-white transition-colors">info@pandeglang.go.id</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-sans tracking-wide">
          <p>&copy; {new Date().getFullYear()} Kabupaten Pandeglang. {t("footer.rights")}</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;