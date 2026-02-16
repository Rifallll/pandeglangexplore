"use client";

import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { eventData } from "@/data/events";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Share2,
    Bell,
    Sparkles,
    ChevronRight,
    Clock,
    ShieldCheck,
    Smartphone
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const EventDetail = () => {
    const { lang } = useLanguage();
    const { id } = useParams();
    const navigate = useNavigate();
    const event = eventData.find(e => e.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <h2 className="text-4xl font-serif mb-6">{lang === "ID" ? "Agenda Tidak Ditemukan" : "Event Not Found"}</h2>
                <Link to="/kalender" className="text-[#C5A065] font-bold uppercase tracking-widest border-b-2 border-[#C5A065]/20 hover:border-[#C5A065] transition-all pb-1">
                    {lang === "ID" ? "Kembali ke Kalender" : "Back to Calendar"}
                </Link>
            </div>
        );
    }

    const relatedEvents = eventData
        .filter(item => item.id !== event.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-white selection:bg-[#C5A065] selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-black">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={event.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&auto=format&fit=crop&q=80"}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
                </motion.div>

                <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Link to="/kalender" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{lang === "ID" ? "Kembali ke Kalender" : "Back to Calendar"}</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${event.type === "Event" ? "bg-[#C5A065] text-white" : "bg-blue-600 text-white"
                                }`}>
                                {event.type === "Event" ? event.category : "Libur Nasional"}
                            </span>
                            <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                                <Calendar size={14} className="text-[#C5A065]" />
                                {event.date} {event.year}
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-serif text-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                            {event.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 -mt-10 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Main Info */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="prose prose-xl max-w-none">
                                <p className="text-2xl font-light leading-relaxed text-gray-600 italic border-l-4 border-[#C5A065] pl-8 py-2">
                                    {event.description}
                                </p>
                                <div className="h-8"></div>
                                <p className="text-lg text-gray-500 leading-relaxed font-light">
                                    {event.longDescription || (lang === "ID"
                                        ? "Informasi mendalam mengenai penyelenggaraan acara ini sedang disiapkan oleh tim Dinas Pariwisata Pandeglang. Pastikan Anda terus memantau pembaruan untuk detail lokasi spesifik, pengisi acara, dan protokol kunjungan."
                                        : "Detailed information about this event is being prepared by the Pandeglang Tourism Office team. Make sure to keep monitoring updates for specific location details, event performers, and visit protocols.")}
                                </p>
                            </div>

                            {event.highlights && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                                    {event.highlights.map((highlight, idx) => (
                                        <div key={idx} className="p-8 bg-gray-50 rounded-3xl border border-transparent hover:border-[#C5A065]/20 transition-all">
                                            <Sparkles className="text-[#C5A065] mb-4" size={24} />
                                            <h4 className="font-bold text-gray-900 mb-2">{highlight}</h4>
                                            <p className="text-sm text-gray-400 font-light">{lang === "ID" ? "Momen spesial yang tidak boleh Anda lewatkan." : "A special moment you shouldn't miss."}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Tips / Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                                <div className="flex gap-6 p-8 bg-black text-white rounded-[2.5rem] items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Clock size={24} className="text-[#C5A065]" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold uppercase text-[10px] tracking-widest text-[#C5A065] mb-1">{lang === "ID" ? "Waktu Terbaik" : "Best Time"}</h5>
                                        <p className="text-sm text-white/60 font-light">{lang === "ID" ? "Datanglah 1-2 jam sebelum acara dimulai untuk posisi terbaik." : "Arrive 1-2 hours before the event starts for the best position."}</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 p-8 bg-gray-100 rounded-[2.5rem] items-center text-black">
                                    <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck size={24} className="text-[#C5A065]" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold uppercase text-[10px] tracking-widest text-black/40 mb-1">{lang === "ID" ? "Akses & Keamanan" : "Access & Security"}</h5>
                                        <p className="text-sm text-black/60 font-light">{lang === "ID" ? "Ikuti panduan petugas di lapangan dan jaga barang bawaan." : "Follow field officer guidelines and keep your belongings safe."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Stats */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-2xl space-y-10">
                                {event.location && (
                                    <div>
                                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-2">
                                            <MapPin size={14} /> {lang === "ID" ? "Lokasi Utama" : "Main Location"}
                                        </h5>
                                        <p className="text-xl font-serif">{event.location}</p>
                                        <button className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#C5A065] border-b border-[#C5A065]/30 hover:border-[#C5A065] transition-all pb-1">
                                            {lang === "ID" ? "Buka di Google Maps" : "Open in Google Maps"}
                                        </button>
                                    </div>
                                )}

                                <div>
                                    <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-2">
                                        <Share2 size={14} /> {lang === "ID" ? "Bagikan" : "Share"}
                                    </h5>
                                    <div className="flex gap-4">
                                        <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#C5A065] hover:text-white transition-all text-gray-400">
                                            <span className="font-bold text-xs">FB</span>
                                        </button>
                                        <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#C5A065] hover:text-white transition-all text-gray-400">
                                            <span className="font-bold text-xs">IG</span>
                                        </button>
                                        <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#C5A065] hover:text-white transition-all text-gray-400">
                                            <span className="font-bold text-xs">WA</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <button className="w-full bg-[#C5A065] text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] shadow-[0_20px_40px_rgba(197,160,101,0.3)] hover:translate-y-[-4px] transition-all duration-500">
                                        {lang === "ID" ? "Ingatkan Saya" : "Remind Me"}
                                    </button>
                                    <p className="mt-4 text-[10px] text-center text-gray-400 font-medium">{lang === "ID" ? "Kami akan mengirimkan notifikasi 1 hari sebelumnya." : "We will send a notification 1 day before."}</p>
                                </div>
                            </div>

                            <div className="mt-8 p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-start gap-6">
                                <Smartphone className="text-emerald-500" size={32} />
                                <div>
                                    <h6 className="font-bold text-black mb-1">{lang === "ID" ? "Official Guide App" : "Official Guide App"}</h6>
                                    <p className="text-xs text-black/40 leading-relaxed font-light">{lang === "ID" ? "Gunakan aplikasi kami di lokasi untuk pengalaman AR Audio Guide." : "Use our app on-site for an AR Audio Guide experience."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Events Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif mb-12">{lang === "ID" ? "Agenda Terdekat Lainnya" : "Other Upcoming Events"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedEvents.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    to={`/kalender/${item.id}`}
                                    className="group block bg-white p-8 rounded-[2.5rem] border border-transparent hover:border-[#C5A065] transition-all shadow-sm flex flex-col justify-between h-full"
                                >
                                    <div>
                                        <span className="text-xs font-bold text-[#C5A065] uppercase tracking-widest">{item.month} {item.day}</span>
                                        <h4 className="text-xl font-serif mt-2 group-hover:italic transition-all">{item.title}</h4>
                                        <p className="text-sm text-gray-400 mt-4 line-clamp-2 font-light">{item.description}</p>
                                    </div>
                                    <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C5A065]">
                                        {lang === "ID" ? "DETAIL" : "DETAILS"} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EventDetail;
