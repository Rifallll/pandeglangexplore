"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { getAssetPath } from "@/lib/utils";

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Wijaya",
            role: "Travel Blogger",
            quote: "Pandeglang adalah definisi 'Hidden Gem' sesungguhnya. Pantai Tanjung Lesung memberikan ketenangan yang tidak saya temukan di tempat lain.",
            rating: 5,
            image: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Budi Santoso",
            role: "Photographer",
            quote: "Sebagai fotografer, Ujung Kulon adalah surga. Cahaya matahari terbenam di sana magis, dan satwanya luar biasa.",
            rating: 5,
            image: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Jessica Tan",
            role: "Foodie",
            quote: "Saya datang untuk pantainya, tapi jatuh cinta pada kulinernya. Angeun Lada dan Sate Bandeng di sini juara!",
            rating: 4,
            image: "/placeholder.svg",
        },
    ];

    return (
        <section className="py-24 bg-[#F9F9F9] border-t border-gray-200">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="Kata Mereka"
                    subtitle="Cerita dari para petualang yang telah merasakan pesona Pandeglang."
                    className="mb-16 text-black text-center items-center"
                />

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow duration-300"
                        >
                            <Quote className="absolute top-6 right-6 text-gray-100 group-hover:text-[#C5A065]/20 transition-colors duration-300" size={48} fill="currentColor" />

                            <div className="flex gap-1 mb-6 text-[#C5A065]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-gray-300"} />
                                ))}
                            </div>

                            <p className="text-gray-600 font-light italic mb-8 leading-relaxed relative z-10">
                                "{item.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    <img src={getAssetPath(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-black">{item.name}</h4>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">{item.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
