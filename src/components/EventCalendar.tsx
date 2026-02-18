"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { eventData } from "@/data/events";
import { getAssetPath } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";

const EventCalendar = () => {
    const { lang, t } = useLanguage();
    // Select specific iconic events for the home page
    const homeEventsRaw = [
        eventData.find(e => e.id === 2), // Seba Baduy
        eventData.find(e => e.id === 4), // Tanjung Lesung Festival
        eventData.find(e => e.id === 5), // Rampak Bedug
    ].filter(Boolean);

    const homeEvents = homeEventsRaw.map(event => {
        if (!event) return null;
        if (lang === "ID") return event;

        // Manual override for localized descriptions on home page
        const overrides: Record<number, { title: string; category: string; description: string }> = {
            2: { title: "Seba Baduy", category: "Tradition", description: "The annual sacred tradition of the Baduy tribe delivering land yields to the local government." },
            4: { title: "Tanjung Lesung Festival", category: "Festival", description: "The biggest maritime festival featuring yacht rallies, food bazaars, and culture." },
            5: { title: "Rampak Bedug", category: "Arts", description: "Magnificent percussion art performance symbolizing local joy and togetherness." }
        };

        return {
            ...event,
            title: overrides[event.id]?.title || event.title,
            category: overrides[event.id]?.category || event.category,
            description: overrides[event.id]?.description || event.description
        };
    }).filter(Boolean);

    // Accent colors for the specific events
    const accents = [
        "from-[#C5A065] to-[#8E6D3E]",
        "from-blue-600 to-indigo-700",
        "from-red-600 to-orange-700"
    ];

    return (
        <section className="py-16 md:py-32 bg-[#FBFBFD] relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A065]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="w-12 h-[1px] bg-[#C5A065]"></span>
                            <span className="text-[#C5A065] text-xs font-bold tracking-[0.4em] uppercase">The 2026 Calendar</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif font-medium text-black leading-[0.9] tracking-tighter">
                            {lang === "ID" ? "Momen" : "Iconic"} <span className="italic text-[#C5A065]">{lang === "ID" ? "Ikonik" : "Moments"}</span> <br />
                            <span className="relative">
                                {lang === "ID" ? "Penuh Makna" : "Full of Meaning"}
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full h-4 text-[#C5A065]/20 fill-none stroke-current stroke-[3]"
                                >
                                    <path d="M5,15 Q150,5 295,15" />
                                </motion.svg>
                            </span>
                        </h2>
                    </div>
                    <Link
                        to="/kalender"
                        onClick={() => window.scrollTo(0, 0)}
                        className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-black"
                    >
                        {lang === "ID" ? "Buka Kalender Penuh" : "Open Full Calendar"}
                        <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {homeEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <Link to={`/kalender/${event?.id}`} className="block relative h-[650px] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white transition-all duration-700 group-hover:-translate-y-4">
                                {/* Image Section */}
                                <div className="absolute inset-0">
                                    <OptimizedImage
                                        src={event?.image ? getAssetPath(event.image) : ""}
                                        alt={event?.title || "Event Image"}
                                        category={event?.category}
                                        className="w-full h-full"
                                        objectFit="cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>
                                </div>

                                {/* Glass Date Overlay */}
                                <div className="absolute top-8 left-8 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-center shadow-2xl">
                                    <span className="block text-4xl font-serif font-bold leading-none mb-1">{event?.day}</span>
                                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{event?.month}</span>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute top-8 right-8">
                                    <div className="px-5 py-2.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest shadow-xl">
                                        {event?.category || event?.type}
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-12 text-white">
                                    <div className="flex items-center gap-2 mb-4 text-[#C5A065]">
                                        <MapPin size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{event?.location || "Pandeglang"}</span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight group-hover:text-[#C5A065] transition-colors">
                                        {event?.title}
                                    </h3>

                                    <p className="text-white/60 text-sm font-light leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                                        {event?.description}
                                    </p>

                                    <div className={`w-full py-5 rounded-2xl bg-gradient-to-r ${accents[index]} text-white font-bold text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0`}>
                                        <Ticket size={18} />
                                        {lang === "ID" ? "Lihat Detail Agenda" : "View Agenda Detail"}
                                    </div>
                                </div>

                                {/* Highlight Line */}
                                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${accents[index]} transition-all duration-700 group-hover:w-full w-0`}></div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-24 border-t border-black/5 pt-12 flex flex-col items-center text-center"
                >
                    <div className="flex items-center gap-1 text-black font-medium mb-4">
                        <Sparkles className="text-[#C5A065]" size={20} />
                        <p>{lang === "ID" ? "Ingin memasukkan acara Anda ke kalender kami?" : "Want to add your event to our calendar?"}</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#C5A065] hover:text-black transition-colors pb-2 border-b-2 border-[#C5A065]/20 hover:border-black">
                        {lang === "ID" ? "Daftarkan Event Sekarang" : "Register Event Now"}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default EventCalendar;
