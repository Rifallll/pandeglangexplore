"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { MapPin, Info, Sparkles, Filter, ChevronRight, Bell, ArrowDown } from "lucide-react";
import { eventData, EventItem, EventType } from "@/data/events";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import EventCard3D from "@/components/EventCard3D";

// Helper for Countdown
const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-3 md:mx-8 min-w-[60px] md:min-w-[100px]">
        <span className="text-[clamp(2.5rem,10vw,4.5rem)] font-serif text-[#C5A065] font-light leading-none mb-2">
            {value.toString().padStart(2, "0")}
        </span>
        <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">
            {label}
        </span>
    </div>
);

const KalenderAcara = () => {
    const { lang, t } = useLanguage();
    const [filter, setFilter] = useState<EventType | "All">("All");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const { scrollYProgress } = useScroll();

    useEffect(() => {
        window.scrollTo(0, 0);

        // Simple countdown logic to a fixed future date (e.g., Festival Tanjung Lesung)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 14);
        targetDate.setHours(targetDate.getHours() + 5);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const localizedEvents = eventData.map(item => {
        if (lang === "ID") return item;

        // Basic EN overrides for main events
        const overrides: Record<number, Partial<EventItem>> = {
            1: { title: "New Year's Day", date: "Jan 1", month: "January", description: "Global year-end celebration. Usually livened up with fireworks at Carita Beach and Tanjung Lesung." },
            10: { title: "Isra Mi'raj", date: "Jan 16", month: "January", description: "Commemoration of Prophet Muhammad's holy journey. A moment of spiritual reflection for Muslims in Pandeglang." },
            11: { title: "Chinese New Year", date: "Feb 17", month: "February", description: "New Year celebration for the Chinese community. Decorated with red ornaments and dragon dances." },
            13: { title: "Nyepi Day", date: "Mar 19", month: "March", description: "Day of silence for Hindus. A time for meditation and self-purification." },
            15: { title: "Eid al-Fitr 1447 H", date: "Mar 21-22", month: "March", description: "Victory day for Muslims after a month of fasting. A time for family gatherings and forgiveness." },
            14: { title: "Pandeglang Regency Anniversary", date: "Apr 1", month: "April", description: "Celebration of the 152nd anniversary of Pandeglang. Livened up with cultural parades and SME exhibitions." },
            2: { title: "Seba Baduy", location: "Kanekes & Rangkasbitung", date: "May 1-3", month: "May", description: "Annual tradition of the Baduy Tribe walking to meet regional leaders with agricultural products as gratitude." },
            4: { title: "Tanjung Lesung Festival", location: "KEK Tanjung Lesung", date: "Sep 4-6", month: "September", description: "International tourism festival with coastal culture, sailing parade, and mangrove conservation campaign." },
            5: { title: "Rampak Bedug Festival", location: "Pandeglang Square", date: "Aug 15-20", month: "August", description: "Stunning traditional percussion art of Banten. A provincial competition celebrating Indonesia's Independence Day." }
        };

        const override = overrides[item.id];
        if (override) {
            return { ...item, ...override };
        }
        return item;
    });

    const filteredItems = localizedEvents.filter(item =>
        filter === "All" ? true : item.type === filter
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A065] selection:text-black overflow-x-hidden">
            <Navbar />

            {/* CINEMATIC HERO SPOTLIGHT */}
            <header className="relative min-h-[90svh] md:h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-0">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=60"
                        alt="Event Atmosphere"
                        className="w-full h-full object-cover opacity-20 md:opacity-30 transform scale-105 animate-[kenburns_20s_infinite_alternate]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-transparent to-[#050505]"></div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-[#C5A065]/30 rounded-full bg-[#C5A065]/5 backdrop-blur-md">
                            <Sparkles className="text-[#C5A065] animate-pulse" size={12} />
                            <span className="text-[#C5A065] text-[9px] md:text-[10px] font-black tracking-[0.25em] md:tracking-[0.3em] uppercase">
                                {lang === "ID" ? "Sorotan Utama" : "Featured Spotlight"}
                            </span>
                        </div>

                        <h1 className="text-[clamp(2.5rem,12vw,6rem)] font-serif font-medium leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 px-4">
                            Festival <span className="italic text-[#C5A065]">Tanjung Lesung</span>
                        </h1>

                        <p className="text-white/40 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-16 px-6">
                            {lang === "ID"
                                ? "Saksikan perpaduan harmonis antara olahraga ekstrem, budaya pesisir, dan keindahan samudra dalam satu panggung megah."
                                : "Witness the harmonious blend of extreme sports, coastal culture, and oceanic beauty in one magnificent stage."}
                        </p>

                        {/* COUNTDOWN */}
                        <div className="flex justify-center items-center divide-x divide-white/10 mb-20 px-4">
                            <CountdownUnit value={timeLeft.days} label={lang === "ID" ? "Hari" : "Days"} />
                            <CountdownUnit value={timeLeft.hours} label={lang === "ID" ? "Jam" : "Hours"} />
                            <CountdownUnit value={timeLeft.minutes} label={lang === "ID" ? "Min" : "Mins"} />
                            <CountdownUnit value={timeLeft.seconds} label={lang === "ID" ? "Detik" : "Secs"} />
                        </div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="opacity-30"
                        >
                            <span className="text-[8px] uppercase tracking-[0.4em] mb-4 block">
                                {lang === "ID" ? "Jelajahi Agenda Lain" : "Explore Other Agenda"}
                            </span>
                            <ArrowDown className="mx-auto text-[#C5A065]" size={18} />
                        </motion.div>
                    </motion.div>
                </div>
            </header>

            {/* FILTER & TIMELINE SECTION */}
            <section className="py-20 bg-[#0a0a0a] relative">
                {/* Filter Tabs */}
                <div className="container mx-auto px-4 mb-24">
                    <div className="flex flex-wrap justify-center gap-8 border-b border-white/10 pb-8">
                        <button
                            onClick={() => setFilter("All")}
                            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-[#C5A065] ${filter === "All" ? "text-white" : "text-white/30"}`}
                        >
                            {lang === "ID" ? "Semua" : "All"}
                        </button>
                        <button
                            onClick={() => setFilter("Event")}
                            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-[#C5A065] ${filter === "Event" ? "text-white" : "text-white/30"}`}
                        >
                            {lang === "ID" ? "Event Budaya" : "Cultural Events"}
                        </button>
                        <button
                            onClick={() => setFilter("Holiday")}
                            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-[#C5A065] ${filter === "Holiday" ? "text-white" : "text-white/30"}`}
                        >
                            {lang === "ID" ? "Hari Libur" : "Holidays"}
                        </button>
                    </div>
                </div>

                {/* TIMELINE CONTAINER */}
                <div className="container mx-auto px-4 relative max-w-7xl">
                    <div className="space-y-12">
                        {filteredItems.map((item, index) => (
                            <EventCard3D key={item.id} item={item} index={index} lang={lang as "ID" | "EN"} />
                        ))}
                    </div>

                    {/* End Line Decoration */}
                    <div className="text-center mt-32 relative z-10">
                        <div className="w-2 h-32 bg-gradient-to-b from-[#C5A065] to-transparent mx-auto opacity-20"></div>
                        <span className="text-[#C5A065] text-[10px] font-bold tracking-[0.5em] uppercase mt-4 block">
                            {lang === "ID" ? "Akhir Agenda 2026" : "End of 2026 Agenda"}
                        </span>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default KalenderAcara;
