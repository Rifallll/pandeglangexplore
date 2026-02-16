"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useSoundFX } from "@/hooks/useSoundFX";

const galleryImages = [
    { src: "/images/dest_ujung_kulon.png", size: "col-span-2 row-span-2", alt: "Panorama Ujung Kulon" },
    { src: "/images/dest_pemandian_citaman.png", size: "col-span-1 row-span-1", alt: "Mata Air Citaman" },
    { src: "/images/dest_cikoromoy.png", size: "col-span-1 row-span-1", alt: "Pemandian Cikoromoy" },
    { src: "/images/dest_curug_ciajeng.png", size: "col-span-1 row-span-2", alt: "Curug Ciajeng" },
    { src: "/images/dest_pantai_bugel.png", size: "col-span-1 row-span-1", alt: "Pantai Bugel" },
];

const GallerySpotlight = () => {
    const { playSound } = useSoundFX();
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-4">Momen Abadi</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-black tracking-tight leading-tight">
                            Menangkap <span className="italic underline decoration-[#C5A065]/30">Keindahan</span> Di Setiap Lensa
                        </h2>
                    </div>
                    <Link
                        to="/albums"
                        onMouseEnter={() => playSound("hover")}
                        onClick={() => playSound("click")}
                        className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C5A065] hover:text-black transition-all pb-2 md:pb-6 border-b-2 border-transparent hover:border-[#C5A065]">
                        Lihat Galeri Penuh
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 md:gap-6 h-[600px] md:h-[800px]">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative overflow-hidden rounded-3xl group ${img.size}`}
                        >
                            <OptimizedImage
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <Camera className="text-[#C5A065] mx-auto mb-3" size={32} />
                                    <p className="text-white text-sm font-bold tracking-widest uppercase">{img.alt}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySpotlight;
