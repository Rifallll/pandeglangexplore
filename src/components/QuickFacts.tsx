"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trees, Waves, Sparkles, Map } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const QuickFacts = () => {
    const { lang, t } = useLanguage();

    const facts = lang === "ID" ? [
        {
            icon: Trees,
            title: "Situs UNESCO",
            description: "Taman Nasional Ujung Kulon, habitat terakhir Badak Jawa di dunia.",
        },
        {
            icon: Waves,
            title: "Garis Pantai Epik",
            description: "Lebih dari 200km garis pantai dengan air kristal dan pasir putih.",
        },
        {
            icon: Sparkles,
            title: "Warisan Budaya",
            description: "Rumah bagi Suku Baduy yang menjaga harmoni alam dan tradisi.",
        },
        {
            icon: Map,
            title: "Surga Geologi",
            description: "Situs bersejarah Anak Krakatau dan formasi tebing Curug Putri.",
        },
    ] : [
        {
            icon: Trees,
            title: "UNESCO Site",
            description: "Ujung Kulon National Park, the last habitat of the Javan Rhino in the world.",
        },
        {
            icon: Waves,
            title: "Epic Coastline",
            description: "Over 200km of coastline with crystal waters and white sand.",
        },
        {
            icon: Sparkles,
            title: "Cultural Heritage",
            description: "Home to the Baduy Tribe who maintain harmony between nature and tradition.",
        },
        {
            icon: Map,
            title: "Geology Paradise",
            description: "Historic Anak Krakatau site and stunning Curug Putri cliff formations.",
        },
    ];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {facts.map((fact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-6 p-5 rounded-2xl bg-gray-50 text-[#C5A065] group-hover:bg-[#C5A065] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                                <fact.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-black mb-3">{fact.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light px-4">
                                {fact.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickFacts;
