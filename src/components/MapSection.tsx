"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Mountain, Waves } from "lucide-react";
import SectionTitle from "./SectionTitle";

const MapSection = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const categories = [
        { id: "all", label: "Semua Lokasi", icon: MapPin },
        { id: "beach", label: "Pantai & Laut", icon: Waves },
        { id: "nature", label: "Pegunungan", icon: Mountain },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-bl-full -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <SectionTitle
                        title="Peta Jelajah"
                        subtitle="Temukan lokasi destinasi favorit Anda di seluruh penjuru Pandeglang."
                        className="text-black items-center text-center"
                    />
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Filter */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h4 className="font-serif text-lg font-bold mb-6 text-black">Kategori</h4>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveFilter(cat.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${activeFilter === cat.id ? "bg-black text-white shadow-lg" : "hover:bg-gray-200 text-gray-600"}`}
                                    >
                                        <cat.icon size={16} />
                                        <span className="text-sm font-medium">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#111] p-6 rounded-xl text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-full">
                                    <Navigation size={20} className="text-[#C5A065]" />
                                </div>
                                <h4 className="font-serif text-lg">Panduan Arus</h4>
                            </div>
                            <p className="text-white/60 text-xs leading-relaxed mb-4">
                                Cek kondisi lalu lintas dan cuaca terkini sebelum memulai perjalanan Anda ke Pandeglang.
                            </p>
                            <button className="text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                                Lihat Info Traffic &rarr;
                            </button>
                        </div>
                    </div>

                    {/* Real Google Map Embed */}
                    <div className="lg:col-span-3 h-[500px] bg-slate-100 rounded-2xl relative overflow-hidden border border-gray-200 shadow-sm">
                        <iframe
                            src="https://maps.google.com/maps?q=Kabupaten%20Pandeglang,%20Banten&t=&z=10&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        ></iframe>

                        {/* Overlay hint if needed, or simply leave the map clean */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
