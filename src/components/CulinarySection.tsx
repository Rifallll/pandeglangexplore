"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CulinaryItem {
    imageSrc: string;
    name: string;
    description: string;
    priceRange?: string;
}

interface CulinarySectionProps {
    items: CulinaryItem[];
}

const CulinarySection: React.FC<CulinarySectionProps> = ({ items }) => {
    return (
        <section id="kuliner" className="py-24 bg-[#111] overflow-hidden text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
                    <div className="max-w-2xl">
                        <span className="text-[#C5A065] font-sans tracking-[0.2em] uppercase text-xs mb-3 block">
                            Gastronomy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                            Cita Rasa Lokal
                        </h2>
                        <p className="text-white/60 text-lg font-light max-w-lg">
                            Rasakan kelezatan otentik dari dapur tradisional Pandeglang.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex mt-4 md:mt-0 border-white/20 text-white hover:bg-white hover:text-black rounded-none tracking-widest uppercase text-xs py-6 px-8 transition-all bg-transparent">
                        Lihat Menu Lengkap
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-64 md:h-72 overflow-hidden mb-6 bg-white/5">
                                <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-0 right-0 bg-[#C5A065] p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Utensils className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-2xl font-serif text-white group-hover:text-[#C5A065] transition-colors">
                                        {item.name}
                                    </h3>
                                    <span className="text-xs font-bold text-[#C5A065] font-sans">{item.priceRange}</span>
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                                    {item.description}
                                </p>
                                <div className="w-8 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#C5A065] transition-all duration-300"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" size="lg" className="w-full rounded-none border-white/20 text-white bg-transparent">
                        Lihat Menu Lengkap
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CulinarySection;
