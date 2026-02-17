"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useSoundFX } from "@/hooks/useSoundFX";
import { getAssetPath } from "@/lib/utils";

const ExperienceGrid = () => {
    const { t } = useLanguage();
    const { playSound } = useSoundFX();

    const experiences = [
        {
            title: t("exp.item1.cat"),
            subtitle: t("exp.item1.title"),
            description: t("exp.item1.desc"),
            image: getAssetPath("/images/dest_anak_krakatau.png"),
            link: "/story/krakatau",
            color: "bg-orange-500"
        },
        {
            title: t("exp.item2.cat"),
            subtitle: t("exp.item2.title"),
            description: t("exp.item2.desc"),
            image: getAssetPath("/images/dest_tanjung_lesung.png"),
            link: "/story/tanjung-lesung",
            color: "bg-blue-500"
        },
        {
            title: t("exp.item3.cat"),
            subtitle: t("exp.item3.title"),
            description: t("exp.item3.desc"),
            image: getAssetPath("/images/dest_kampung_baduy.png"),
            link: "/story/baduy",
            color: "bg-emerald-500"
        }
    ];
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-4">{t("exp.vibe")}</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-black tracking-tight">{t("exp.title")}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-placeholder transition-all duration-700"
                        >
                            <OptimizedImage
                                src={exp.image}
                                alt={exp.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-4 ${exp.color}`}>
                                    {exp.title}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">{exp.subtitle}</h3>
                                <p className="text-white/60 text-xs md:text-sm font-light mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                    {exp.description}
                                </p>
                                <Link
                                    to={exp.link}
                                    onMouseEnter={() => playSound("hover")}
                                    onClick={() => playSound("click")}
                                    className="flex items-center gap-2 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-[#C5A065] transition-colors group/link w-fit"
                                >
                                    {t("common.explore_now")}
                                    <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceGrid;
