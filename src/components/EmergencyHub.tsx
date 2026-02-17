"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, X, Shield, Activity, Flame, Wind, HeartPulse, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

interface EmergencyHubProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmergencyHub: React.FC<EmergencyHubProps> = ({ isOpen, onClose }) => {
    const { lang } = useLanguage();

    const contacts = [
        {
            name: "NTPD (Darurat Umum)",
            number: "112",
            icon: Shield,
            color: "text-red-500",
            bg: "bg-red-500/10",
            desc: lang === "ID" ? "Layanan darurat terpadu" : "Integrated emergency services"
        },
        {
            name: "Polres Pandeglang",
            number: "110",
            icon: Shield,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            desc: lang === "ID" ? "Kepolisian Resor Pandeglang" : "Pandeglang District Police"
        },
        {
            name: "Lapor Pak Kapolres",
            number: "6281382522003",
            icon: MessageSquare,
            type: "whatsapp",
            color: "text-green-500",
            bg: "bg-green-500/10",
            desc: lang === "ID" ? "WhatsApp langsung Kapolres" : "Direct WhatsApp to Chief of Police"
        },
        {
            name: "SAR Pandeglang",
            number: "115",
            icon: Wind,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            desc: lang === "ID" ? "Pencarian dan Penyelamatan" : "Search and Rescue"
        },
        {
            name: "RSUD Berkah",
            number: "0253202077",
            icon: HeartPulse,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            desc: lang === "ID" ? "RSUD Berkah Pandeglang" : "Berkah General Hospital"
        },
        {
            name: "PSC Kesehatan",
            number: "119",
            icon: Activity,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            desc: lang === "ID" ? "Layanan ambulans & medis" : "Ambulance & medical services"
        },
        {
            name: "BPBD Pandeglang",
            number: "08111383112",
            icon: Wind,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            desc: lang === "ID" ? "Penanggulangan Bencana" : "Disaster Management"
        },
        {
            name: "Damkar Pandeglang",
            number: "0253201113",
            icon: Flame,
            color: "text-red-600",
            bg: "bg-red-600/10",
            desc: lang === "ID" ? "Pemadam Kebakaran" : "Fire Department"
        }
    ];

    const handleCall = (number: string, type?: string) => {
        if (type === "whatsapp") {
            window.open(`https://wa.me/${number}`, "_blank");
        } else {
            window.location.href = `tel:${number}`;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100001] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 md:p-0"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[#0f0f0f] border border-white/10 rounded-[2rem] md:rounded-[3rem] w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative p-8 md:p-12">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <span className="text-[#C5A065] text-xs font-black uppercase tracking-[0.4em]">Emergency Hub</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter">
                                        Jawara Safety <span className="italic text-[#C5A065]">One-Tap</span>
                                    </h2>
                                    <p className="text-white/40 text-sm md:text-base mt-4 max-w-lg">
                                        {lang === "ID"
                                            ? "Akses cepat ke layanan darurat resmi di wilayah Kabupaten Pandeglang. Hubungi bantuan dalam satu sentuhan."
                                            : "Quick access to official emergency services in Pandeglang. Call for help in a single touch."}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="sticky top-0 right-0 p-3 md:p-4 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all border border-white/10 backdrop-blur-md z-50 shrink-0"
                                    title="Tutup"
                                    aria-label="Tutup Emergency Hub"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Contacts Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                {contacts.map((contact, idx) => (
                                    <MagneticButton key={idx} strength={15}>
                                        <button
                                            onClick={() => handleCall(contact.number, contact.type)}
                                            className="w-full flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all text-left group"
                                        >
                                            <div className={`w-14 h-14 rounded-xl ${contact.bg} ${contact.color} flex items-center justify-center shrink-0 border border-white/5 shadow-inner group-hover:scale-110 transition-transform`}>
                                                <contact.icon size={28} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold tracking-tight text-lg leading-none mb-1">{contact.name}</h4>
                                                <p className="text-[#C5A065] font-mono text-sm mb-2">{contact.number}</p>
                                                <p className="text-white/30 text-[10px] uppercase font-black tracking-widest truncate">{contact.desc}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Phone size={14} className="text-[#C5A065]" />
                                            </div>
                                        </button>
                                    </MagneticButton>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest">
                                    <UserCheck size={14} />
                                    <span>Verified Official Pandeglang Data</span>
                                </div>
                                <div className="flex items-center gap-2 px-6 py-2 bg-[#C5A065] text-black rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#C5A065]/20">
                                    <Phone size={12} fill="currentColor" />
                                    <span>Stay Safe in Pandeglang</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EmergencyHub;
