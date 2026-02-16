"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const TravelQuiz = () => {
    const { lang, t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<{ title: string; desc: string; link: string } | null>(null);

    const questions = lang === "ID" ? [
        {
            id: 1,
            text: "Apa suasana yang Anda cari?",
            options: [
                { text: "Deburan Ombak & Pasir", value: "Pantai", icon: "🌊" },
                { text: "Hutan & Udara Dingin", value: "Alam", icon: "🌲" },
                { text: "Budaya & Tradisi", value: "Budaya", icon: "🏺" },
            ],
        },
        {
            id: 2,
            text: "Dengan siapa Anda bepergian?",
            options: [
                { text: "Sendirian (Solo)", value: "Solo", icon: "🚶" },
                { text: "Pasangan / Teman", value: "Duo", icon: "👫" },
                { text: "Keluarga Besar", value: "Family", icon: "👨‍👩‍👧‍👦" },
            ],
        },
    ] : [
        {
            id: 1,
            text: "What vibe are you looking for?",
            options: [
                { text: "Waves & Sand", value: "Pantai", icon: "🌊" },
                { text: "Forest & Cool Air", value: "Alam", icon: "🌲" },
                { text: "Culture & Tradition", value: "Budaya", icon: "🏺" },
            ],
        },
        {
            id: 2,
            text: "Who are you traveling with?",
            options: [
                { text: "Solo Traveler", value: "Solo", icon: "🚶" },
                { text: "Partner / Friends", value: "Duo", icon: "👫" },
                { text: "Large Family", value: "Family", icon: "👨‍👩‍👧‍👦" },
            ],
        },
    ];

    const results = lang === "ID" ? {
        "Pantai-Solo": { title: "Pulau Peucang", desc: "Ketenangan mutlak dan kejernihan air untuk refleksi diri.", link: "/peta" },
        "Pantai-Duo": { title: "Tanjung Lesung", desc: "Nikmati watersport dan makan malam romantis di tepi pantai.", link: "/peta" },
        "Pantai-Family": { title: "Pantai Carita", desc: "Fasilitas lengkap dan ombak landai yang aman untuk anak-anak.", link: "/peta" },
        "Alam-Solo": { title: "Gunung Krakatau", desc: "Uji nyali dan temukan kekuatan diri di puncak gunung legendaris.", link: "/peta" },
        "Alam-Duo": { title: "Curug Putri", desc: "Eksplorasi 'Green Canyon' Banten yang memukau bersama partner.", link: "/peta" },
        "Alam-Family": { title: "Taman Nasional Ujung Kulon", desc: "Petualangan edukatif melihat fauna langka untuk seluruh keluarga.", link: "/peta" },
        "Budaya-Solo": { title: "Kampung Baduy Dalam", desc: "Perjalanan spiritual mendalami kesederhanaan hidup.", link: "/peta" },
        "Budaya-Duo": { title: "Wisata Baduy Luar", desc: "Mengenal budaya sambil trekking santai di perbukitan indah.", link: "/peta" },
        "Budaya-Family": { title: "Situs Sejarah Banten Lama", desc: "Belajar sejarah kejayaan masa lalu dalam suasana edukatif.", link: "/peta" },
    } : {
        "Pantai-Solo": { title: "Peucang Island", desc: "Absolute serenity and crystal clear waters for self-reflection.", link: "/peta" },
        "Pantai-Duo": { title: "Tanjung Lesung", desc: "Enjoy watersports and romantic beachfront dinners.", link: "/peta" },
        "Pantai-Family": { title: "Carita Beach", desc: "Complete facilities and gentle waves safe for children.", link: "/peta" },
        "Alam-Solo": { title: "Krakatau Volcano", desc: "Test your courage and find your strength at the legendary summit.", link: "/peta" },
        "Alam-Duo": { title: "Curug Putri", desc: "Explore the stunning 'Green Canyon' of Banten with your partner.", link: "/peta" },
        "Alam-Family": { title: "Ujung Kulon National Park", desc: "An educational adventure seeing rare wildlife for the whole family.", link: "/peta" },
        "Budaya-Solo": { title: "Inner Baduy Village", desc: "A spiritual journey deep into the simplicity of life.", link: "/peta" },
        "Budaya-Duo": { title: "Outer Baduy Tourism", desc: "Get to know the culture while light trekking in beautiful hills.", link: "/peta" },
        "Budaya-Family": { title: "Old Banten Historical Site", desc: "Learn about past glory in an educational atmosphere.", link: "/peta" },
    };

    const handleAnswer = (val: string) => {
        const newAnswers = [...answers, val];
        setAnswers(newAnswers);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const key = `${newAnswers[0]}-${newAnswers[1]}`;
            setResult(results[key as keyof typeof results] || results["Pantai-Solo"]);
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <img src="/images/quiz_pandeglang.png" alt="Quiz Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="w-16 h-16 bg-[#C5A065]/20 rounded-2xl flex items-center justify-center text-[#C5A065] mb-6">
                            <Compass size={32} className="animate-spin-slow" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                            {lang === "ID" ? "Bingung Mau Ke Mana?" : "Confused Where to Go?"}
                        </h2>
                        <p className="text-white/40 font-light">
                            {lang === "ID" ? "Biarkan sistem cerdas kami merekomendasikan destinasi terbaik untuk Anda." : "Let our smart system recommend the best destination for you."}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                                        {lang === "ID" ? `Pertanyaan ${step + 1} dari ${questions.length}` : `Question ${step + 1} of ${questions.length}`}
                                    </span>
                                    <p className="text-2xl md:text-3xl font-serif text-white">{questions[step].text}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {questions[step].options.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleAnswer(opt.value)}
                                            className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#C5A065] hover:border-[#C5A065] transition-all duration-500 text-center"
                                        >
                                            <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform">{opt.icon}</span>
                                            <span className="text-white font-medium block">{opt.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A065]/20 border border-[#C5A065]/30 mb-8 text-[#C5A065]">
                                    <Sparkles size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        {lang === "ID" ? "Rekomendasi Spesial" : "Special Recommendation"}
                                    </span>
                                </div>

                                <h3 className="text-4xl md:text-6xl font-serif text-white mb-6 italic">"{result.title}"</h3>
                                <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                                    {result.desc}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to={result.link} className="bg-[#C5A065] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                                        {lang === "ID" ? "Lihat Selengkapnya" : "See More"} <ArrowRight size={16} />
                                    </Link>
                                    <button onClick={reset} className="bg-white/10 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                        {lang === "ID" ? "Ulangi Quiz" : "Repeat Quiz"} <RefreshCw size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TravelQuiz;
