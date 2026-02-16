"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FAQSection = () => {
    const { lang, t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = lang === "ID" ? [
        {
            question: "Kapan waktu terbaik untuk mengunjungi Pandeglang?",
            answer: "Mei hingga September adalah waktu ideal karena cuaca cerah, sangat cocok untuk aktivitas pantai seperti di Tanjung Lesung atau trekking di Ujung Kulon.",
        },
        {
            question: "Bagaimana cara menuju Pandeglang dari Jakarta?",
            answer: "Anda bisa menempuh jalur darat via Tol Tangerang-Merak keluar di Serang atau Pandeglang. Perjalanan memakan waktu sekitar 3-4 jam tergantung kondisi jalan.",
        },
        {
            question: "Apakah aman mengunjungi Taman Nasional Ujung Kulon?",
            answer: "Sangat aman selama Anda didampingi pemandu resmi dan mengikuti instruksi keamanan. Ujung Kulon adalah habitat alami, jadi menjaga jarak dengan satwa liar adalah kunci.",
        },
        {
            question: "Apakah ada akomodasi mewah di Pandeglang?",
            answer: "Tentu! Tanjung Lesung menawarkan resort kelas dunia dengan fasilitas lengkap. Selain itu, terdapat banyak penginapan butik yang menawarkan ketenangan dan privasi.",
        },
    ] : [
        {
            question: "When is the best time to visit Pandeglang?",
            answer: "May to September is the ideal time because of the sunny weather, perfect for beach activities in Tanjung Lesung or trekking in Ujung Kulon.",
        },
        {
            question: "How to get to Pandeglang from Jakarta?",
            answer: "You can take the land route via the Tangerang-Merak Toll Road exiting at Serang or Pandeglang. The journey takes about 3-4 hours depending on road conditions.",
        },
        {
            question: "Is it safe to visit Ujung Kulon National Park?",
            answer: "Very safe as long as you are accompanied by official guides and follow safety instructions. Ujung Kulon is a natural habitat, so keeping a distance from wildlife is key.",
        },
        {
            question: "Is there luxury accommodation in Pandeglang?",
            answer: "Certainly! Tanjung Lesung offers world-class resorts with complete facilities. Additionally, there are many boutique lodgings offering tranquility and privacy.",
        },
    ];

    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-6">{lang === "ID" ? "Pusat Bantuan" : "Help Center"}</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-8">
                                {lang === "ID" ? "Pertanyaan yang" : "Frequently"} <span className="italic text-[#C5A065]">{lang === "ID" ? "Sering Diajukan" : "Asked Questions"}</span>
                            </h2>
                            <p className="text-gray-500 font-light mb-10 leading-relaxed">
                                {lang === "ID"
                                    ? "Kami merangkum segala hal yang perlu Anda ketahui sebelum merencanakan perjalanan impian ke Pandeglang."
                                    : "We summarize everything you need to know before planning your dream trip to Pandeglang."}
                            </p>
                            <div className="p-8 bg-black rounded-3xl text-white">
                                <HelpCircle className="text-[#C5A065] mb-4" size={32} />
                                <p className="font-serif text-xl mb-4">{lang === "ID" ? "Masih punya pertanyaan?" : "Still have questions?"}</p>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#C5A065] border-b border-[#C5A065] pb-2 hover:text-white hover:border-white transition-all">
                                    {lang === "ID" ? "Hubungi Advisor Kami" : "Contact Our Advisor"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`rounded-3xl border transition-all duration-500 overflow-hidden ${openIndex === index ? "bg-white border-[#C5A065]/20 shadow-xl" : "bg-transparent border-gray-200"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-8 text-left"
                                >
                                    <span className={`text-xl font-medium transition-colors ${openIndex === index ? "text-black" : "text-gray-600"}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 transition-transform duration-500 ${openIndex === index ? "rotate-90" : ""}`}>
                                        {openIndex === index ? (
                                            <Minus className="text-[#C5A065]" size={20} />
                                        ) : (
                                            <Plus className="text-gray-400" size={20} />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <div className="px-8 pb-8 text-gray-400 font-light leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
