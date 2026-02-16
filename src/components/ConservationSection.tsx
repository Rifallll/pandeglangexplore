"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const ConservationSection = () => {
    const { lang, t } = useLanguage();
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="bg-[#0f1410] rounded-[3.5rem] overflow-hidden relative">
                    {/* Decorative Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Image Section */}
                        <div className="lg:w-1/2 relative h-[500px] lg:h-[700px] w-full">
                            <img
                                src="/images/conservation_pandeglang.png"
                                alt="Konservasi Badak Jawa"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f1410] hidden lg:block"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1410] lg:hidden"></div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-1/2 p-8 md:p-16 lg:p-24 relative z-10 text-white">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                                <Shield className="text-emerald-500" size={16} />
                                <span className="text-emerald-500 text-[10px] font-bold tracking-[0.3em] uppercase">{lang === "ID" ? "Misi Pelestarian" : "Conservation Mission"}</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-10 leading-tight">
                                {lang === "ID" ? "Menjaga" : "Preserving"} <span className="italic text-emerald-500">{lang === "ID" ? "Pusaka" : "The Last"}</span> {lang === "ID" ? "Terakhir Dunia" : "Heritage"}
                            </h2>

                            <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                                {lang === "ID"
                                    ? "Pandeglang adalah rumah bagi Badak Jawa (Rhinoceros sondaicus), mamalia besar paling langka di bumi. Melalui Taman Nasional Ujung Kulon, kami berkomitmen untuk menjaga keseimbangan alam dan memastikan warisan prasejarah ini tetap hidup untuk generasi mendatang."
                                    : "Pandeglang is home to the Javan Rhino (Rhinoceros sondaicus), the rarest large mammal on earth. Through Ujung Kulon National Park, we are committed to maintaining natural balance and ensuring this prehistoric heritage lives on for future generations."}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500">
                                        <Leaf size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Eco-Tourism</h4>
                                        <p className="text-white/40 text-sm font-light">
                                            {lang === "ID" ? "Wisata bertanggung jawab yang mendukung komunitas lokal." : "Responsible tourism that supports local communities."}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{lang === "ID" ? "Berbagi Kepedulian" : "Shared Care"}</h4>
                                        <p className="text-white/40 text-sm font-light">
                                            {lang === "ID" ? "Setiap kunjungan Anda berkontribusi pada dana konservasi." : "Every visit you make contributes to conservation funds."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/konservasi">
                                <button className="border border-white/20 hover:bg-white hover:text-[#0f1410] px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500">
                                    {lang === "ID" ? "Pelajari Program Hijau Kami" : "Learn Our Green Program"}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConservationSection;
