"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const CulinarySpotlight = () => {
    const { lang, t } = useLanguage();

    const delicacies = lang === "ID" ? [
        { name: "Sate Bandeng", desc: "Sate ikan bandeng tanpa tulang dengan bumbu rempah rahasia." },
        { name: "Emping Melinjo", desc: "Kerupuk gurih khas Menes yang mendunia." },
        { name: "Otak-otak Labuan", desc: "Camilan ikan segar panggang dengan sambal kacang ikonik." },
    ] : [
        { name: "Milkfish Satay", desc: "Boneless milkfish satay with secret spiced seasoning." },
        { name: "Melinjo Crackers", desc: "World-famous savory crackers from Menes." },
        { name: "Labuan Fish Cakes", desc: "Grilled fresh fish snacks with iconic peanut sauce." },
    ];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -inset-4 bg-[#C5A065]/10 blur-3xl rounded-full"></div>
                        <img
                            src="/images/culinary_prestige.png"
                            alt="Kuliner Pandeglang"
                            className="relative rounded-[2rem] md:rounded-[2.5rem] w-full h-[350px] md:h-[600px] object-cover shadow-2xl border border-gray-100"
                        />

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-10"
                    >
                        <div>
                            <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-4">{lang === "ID" ? "Warisan Rasa & Kriya" : "Heritage of Taste & Craft"}</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight tracking-tight">
                                {lang === "ID" ? "Simfoni" : "Symphony of"} <span className="italic text-[#C5A065]">{lang === "ID" ? "Kuliner" : "Culinary"}</span> {lang === "ID" ? "& Budaya" : "& Culture"}
                            </h2>
                        </div>

                        <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
                            {lang === "ID"
                                ? "Perjalanan ke Pandeglang tidak lengkap tanpa mencicipi mahakarya kulinernya. Dari gurihnya Sate Bandeng hingga renyahnya Emping Melinjo, setiap suapan adalah cerita tentang kekayaan laut dan tanah Banten."
                                : "A trip to Pandeglang is incomplete without tasting its culinary masterpieces. From savory Milkfish Satay to crispy Melinjo Crackers, every bite is a story of Banten's sea and soil wealth."}
                        </p>

                        <div className="space-y-6">
                            {delicacies.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#C5A065]/5 rounded-xl flex items-center justify-center text-[#C5A065] group-hover:bg-[#C5A065] group-hover:text-white transition-all">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black group-hover:text-[#C5A065] transition-colors">{item.name}</h4>
                                        <p className="text-sm text-gray-400 font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link to="/culinary" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-black border-b-2 border-[#C5A065] pb-2 hover:text-[#C5A065] transition-colors group">
                            {lang === "ID" ? "Eksplorasi Kuliner Selengkapnya" : "Explore More Culinary"}
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CulinarySpotlight;
