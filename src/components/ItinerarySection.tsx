"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ItinerarySection = () => {
    const { lang, t } = useLanguage();

    const itineraries = lang === "ID" ? [
        {
            title: "The Coastal Escape",
            duration: "2 Hari 1 Malam",
            vibe: "Relaksasi & Pantai",
            highlights: ["Resort Tanjung Lesung", "Snorkeling di Pulau Liwungan", "Matahari Terbenam"],
            description: "Sempurna untuk liburan akhir pekan singkat bersama pasangan atau keluarga.",
            color: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "The Wild Journey",
            duration: "3 Hari 2 Malam",
            vibe: "Alam & Petualangan",
            highlights: ["Taman Nasional Ujung Kulon", "Pulau Peucang", "Melihat Badak Jawa"],
            description: "Jelajahi situs warisan dunia UNESCO yang masih perawan dan penuh keajaiban.",
            color: "from-emerald-500/20 to-teal-500/20"
        },
        {
            title: "Culture & Heritage",
            duration: "1 Hari",
            vibe: "Edukasi & Tradisi",
            highlights: ["Suku Baduy Luar", "Kerajinan Lokal", "Makan Siang Tradisional"],
            description: "Selami kearifan lokal yang telah dijaga selama berabad-abad di kaki gunung.",
            color: "from-[#C5A065]/20 to-amber-500/20"
        }
    ] : [
        {
            title: "The Coastal Escape",
            duration: "2 Days 1 Night",
            vibe: "Relaxation & Beach",
            highlights: ["Tanjung Lesung Resort", "Snorkeling at Liwungan Island", "Sunset Watching"],
            description: "Perfect for a short weekend getaway with your partner or family.",
            color: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "The Wild Journey",
            duration: "3 Days 2 Nights",
            vibe: "Nature & Adventure",
            highlights: ["Ujung Kulon National Park", "Peucang Island", "Javan Rhino Spotting"],
            description: "Explore the pristine UNESCO world heritage site full of wonders.",
            color: "from-emerald-500/20 to-teal-500/20"
        },
        {
            title: "Culture & Heritage",
            duration: "1 Day",
            vibe: "Education & Tradition",
            highlights: ["Outer Baduy Tribe", "Local Crafts", "Traditional Lunch"],
            description: "Dive into local wisdom preserved for centuries at the foot of the mountain.",
            color: "from-[#C5A065]/20 to-amber-500/20"
        }
    ];
    return (
        <section className="py-24 bg-[#fafafa]">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-4">{t("common.travel_guide")}</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-black tracking-tight leading-tight">
                        {t("common.itinerary_title")} <span className="italic underline decoration-[#C5A065]/30">{lang === "ID" ? "Terpilih" : "Selected"}</span> {lang === "ID" ? "Untuk Anda" : "For You"}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {itineraries.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} rounded-bl-full -z-10 opacity-30 group-hover:scale-150 transition-transform duration-700`}></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gray-50 rounded-xl text-[#C5A065]">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{item.duration}</p>
                                    <p className="text-sm font-medium text-black">{item.vibe}</p>
                                </div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-serif text-black mb-4 group-hover:text-[#C5A065] transition-colors">{item.title}</h3>
                            <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">
                                {item.description}
                            </p>

                            <div className="space-y-4">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Highlights:</p>
                                {item.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#C5A065]"></div>
                                        <span className="text-xs text-gray-600 font-medium">{h}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-10 w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A065] transition-colors shadow-lg shadow-black/10">
                                {t("common.view_detail")}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ItinerarySection;
