"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HiddenGems = () => {
    const { lang, t } = useLanguage();
    return (
        <section className="py-24 bg-[#080808] relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A065]/5 rounded-full blur-[150px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A065]/10 border border-[#C5A065]/20 mb-6"
                    >
                        <Sparkles className="text-[#C5A065]" size={16} />
                        <span className="text-[#C5A065] text-[10px] font-bold tracking-[0.3em] uppercase">{t("common.limited_edition")}</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-white mb-8 tracking-tighter leading-none">
                        {lang === "ID" ? "Permata" : "Hidden"} <span className="italic text-[#C5A065]">{lang === "ID" ? "Tersembunyi" : "Gems"}</span>
                    </h2>

                    <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                        {lang === "ID"
                            ? "Hanya untuk mereka yang berani menjelajah lebih jauh. Temukan sudut-sudut rahasia Pandeglang yang belum terjamah oleh keramaian."
                            : "Only for those who dare to explore further. Discover secret corners of Pandeglang untouched by the crowds."}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative group rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5"
                >
                    <img
                        src="/images/dest_curug_putri.png"
                        alt="Curug Putri Pandeglang"
                        className="w-full h-[600px] md:h-[700px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 text-[#C5A065] mb-4">
                                <MapPin size={20} />
                                <span className="text-sm font-bold tracking-widest uppercase">{lang === "ID" ? "Rahasia Terjaga" : "Secret Kept"}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">{lang === "ID" ? "Curug Putri: Little Green Canyon" : "Curug Putri: Little Green Canyon"}</h3>
                            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                                {lang === "ID"
                                    ? "Susuri sungai jernih di antara tebing eksotis yang menjulang tinggi. Curug Putri adalah mahakarya alam Pandeglang yang menawarkan ketenangan mutlak dan keindahan visual yang luar biasa."
                                    : "Wander through crystal-clear rivers between exotic towering cliffs. Curug Putri is Pandeglang's natural masterpiece offering absolute serenity and extraordinary visual beauty."}
                            </p>
                        </div>

                        <a
                            href="https://www.google.com/maps/dir/?api=1&destination=-6.666276,105.583161"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transform transition-all duration-500 hover:bg-[#C5A065] hover:text-white hover:scale-105 active:scale-95 whitespace-nowrap inline-block"
                        >
                            {t("common.get_route")}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HiddenGems;
