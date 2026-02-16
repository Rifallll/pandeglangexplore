"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Truck, Sun, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TravelTips = () => {
    const { lang, t } = useLanguage();

    const tips = lang === "ID" ? [
        {
            icon: Truck,
            title: "Transportasi Mudah",
            description: "Pandeglang berjarak sekitar 3-4 jam dari Jakarta via Tol Tangerang-Merak. Gunakan kendaraan pribadi atau layanan shuttle untuk kenyamanan maksimal.",
        },
        {
            icon: Sun,
            title: "Waktu Kunjungan",
            description: "Mei hingga September adalah bulan terbaik untuk mengunjungi pantai dan mendaki. Untuk pengalaman budaya, cek kalendar festival lokal.",
        },
        {
            icon: ShieldCheck,
            title: "Etika & Keamanan",
            description: "Hargai kearifan lokal, terutama saat berkunjung ke Suku Baduy. Selalu ikuti instruksi instruktur saat melakukan watersport atau pendakian.",
        },
        {
            icon: Info,
            title: "Perlengkapan Wisata",
            description: "Jangan lupa membawa sunblock untuk pantai, jaket tipis untuk area pegunungan, dan sepatu trekking jika ingin ke Ujung Kulon.",
        },
    ] : [
        {
            icon: Truck,
            title: "Easy Transportation",
            description: "Pandeglang is about 3-4 hours from Jakarta via the Tangerang-Merak Toll Road. Use a private vehicle or shuttle service for maximum comfort.",
        },
        {
            icon: Sun,
            title: "Visiting Time",
            description: "May to September are the best months for visiting beaches and hiking. For cultural experiences, check the local festival calendar.",
        },
        {
            icon: ShieldCheck,
            title: "Ethics & Safety",
            description: "Respect local wisdom, especially when visiting the Baduy Tribe. Always follow instructor instructions for watersports or hiking.",
        },
        {
            icon: Info,
            title: "Travel Gear",
            description: "Don't forget to bring sunblock for the beach, a light jacket for mountain areas, and trekking shoes if you want to head to Ujung Kulon.",
        },
    ];
    return (
        <section className="py-24 bg-black text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A065]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/3">
                        <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-6">Pro Traveler Tips</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-8">
                            {lang === "ID" ? "Hal Penting Sebelum" : "Essential Tips Before"} <span className="italic text-[#C5A065]">{lang === "ID" ? "Berangkat" : "Departure"}</span>
                        </h2>
                        <p className="text-white/50 font-light leading-relaxed mb-10">
                            {lang === "ID"
                                ? "Persiapan yang matang adalah kunci perjalanan yang tak terlupakan. Kami merangkum poin-poin penting untuk memudahkan Anda merencanakan petualangan di Pandeglang."
                                : "Careful preparation is the key to an unforgettable journey. We summarize important points to make it easier for you to plan your adventure in Pandeglang."}
                        </p>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <p className="text-[#C5A065] font-serif text-lg mb-2">{lang === "ID" ? "Butuh Bantuan?" : "Need Help?"}</p>
                            <p className="text-white/40 text-sm">
                                {lang === "ID" ? "Hubungi pusat informasi wisata kami untuk panduan personal." : "Contact our tourism information center for personal guidance."}
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tips.map((tip, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#C5A065]/20 flex items-center justify-center text-[#C5A065] mb-6 group-hover:scale-110 transition-transform">
                                    <tip.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-3">{tip.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed font-light">
                                    {tip.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TravelTips;
