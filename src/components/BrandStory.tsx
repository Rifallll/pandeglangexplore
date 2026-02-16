"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

const BrandStory = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const floatY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section ref={sectionRef} className="py-32 bg-[#0a0a0a] text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
                            <motion.img
                                style={{ scale: imageScale }}
                                src="/images/baduyy.jpg"
                                alt="Warisan Budaya Pandeglang"
                                className="w-full h-[450px] md:h-[650px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            <motion.div
                                style={{ y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : floatY }}
                                className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10"
                            >
                                <p className="text-[#C5A065] font-serif italic text-lg md:text-2xl leading-relaxed">
                                    {t("brand.floating_quote")}
                                </p>
                            </motion.div>
                        </div>

                        {/* Aesthetic Ornament */}
                        <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 border-t-2 border-l-2 border-[#C5A065]/30 rounded-tl-[2rem] md:rounded-tl-[4rem]"></div>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 space-y-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <MagneticButton strength={20}>
                                <span className="text-[#C5A065] text-[10px] font-bold tracking-[0.6em] uppercase block mb-6 px-4 py-1.5 border border-[#C5A065]/30 rounded-full w-fit hover:bg-[#C5A065]/10 transition-colors">
                                    {t("brand.top_label")}
                                </span>
                            </MagneticButton>
                            <h2 className="text-3xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1] md:leading-[0.85] tracking-tighter mb-8">
                                {t("brand.title_main")} <br />
                                {t("brand.title_accent")} <span className="italic text-[#C5A065]">{t("brand.title_suffix")}</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="text-white/50 text-xl md:text-2xl font-light leading-relaxed max-w-xl"
                        >
                            {t("brand.desc")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-6 md:gap-12 pt-8 md:pt-12 border-t border-white/10"
                        >
                            <div>
                                <h4 className="text-3xl md:text-5xl font-serif text-[#C5A065] mb-2 tracking-tighter">22+</h4>
                                <p className="text-white/30 text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold leading-tight">{t("brand.stat.iconic")}</p>
                            </div>
                            <div>
                                <h4 className="text-3xl md:text-5xl font-serif text-[#C5A065] mb-2 tracking-tighter">UNESCO</h4>
                                <p className="text-white/30 text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold leading-tight">{t("brand.stat.unesco")}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;
