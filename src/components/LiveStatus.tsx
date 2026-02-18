

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Cloud, CloudRain, AlertTriangle, ShieldCheck, MapPin, ChevronRight, X, Wind, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { fetchLatestEarthquake, fetchWeatherPandeglang } from "@/services/bmkgService";
import { getKrakatauStatus } from "@/services/magmaService";


interface StatusItem {
    id: string;
    type: string;
    location: string;
    status: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    detail: string;
    link?: string;
}

const LiveStatus = () => {
    const { lang, t } = useLanguage();
    const [index, setIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const [statuses, setStatuses] = useState<StatusItem[]>([]);

    useEffect(() => {
        const initData = async () => {
            const newStatuses: StatusItem[] = [];

            // 1. Earthquake Data
            const earthquake = await fetchLatestEarthquake();
            if (earthquake) {
                const isRelevant =
                    parseFloat(earthquake.magnitude) >= 5.0 ||
                    earthquake.location.toLowerCase().includes("banten") ||
                    earthquake.location.toLowerCase().includes("sunda") ||
                    earthquake.location.toLowerCase().includes("pandeglang");

                if (isRelevant) {
                    newStatuses.push({
                        id: "gempa",
                        type: "alert",
                        location: lang === "ID" ? "Gempabumi Terkini" : "Latest Earthquake",
                        status: `M ${earthquake.magnitude}`,
                        icon: AlertTriangle,
                        color: "text-red-500",
                        bg: "bg-red-500/10",
                        detail: `${earthquake.location}, ${earthquake.datetime}. Kedalaman ${earthquake.depth}. ${earthquake.potensi}`
                    });
                }
            }

            // 2. Volcano Status (Anak Krakatau)
            const krakatau = await getKrakatauStatus();
            if (krakatau) {
                let color = "text-emerald-500";
                let bg = "bg-emerald-500/10";
                let type = "info";

                if (krakatau.ga_status.includes("Level II")) {
                    color = "text-orange-500";
                    bg = "bg-orange-500/10";
                    type = "warning";
                } else if (krakatau.ga_status.includes("Level III") || krakatau.ga_status.includes("Level IV")) {
                    color = "text-red-500";
                    bg = "bg-red-500/10";
                    type = "alert";
                }

                newStatuses.push({
                    id: "krakatau",
                    type: type,
                    location: "Anak Krakatau",
                    status: krakatau.ga_status,
                    icon: AlertTriangle,
                    color: color,
                    bg: bg,
                    detail: `${krakatau.var_rekomendasi} (Update: ${krakatau.var_data_date})`
                });
            }

            // 3. Real-Time Weather (Pandeglang)
            const weather = await fetchWeatherPandeglang();
            if (weather) {
                const isExtreme = weather.status.toLowerCase().includes("lebat") ||
                    weather.status.toLowerCase().includes("petir") ||
                    weather.status.toLowerCase().includes("badai");

                if (isExtreme) {
                    newStatuses.push({
                        id: "weather-extreme",
                        type: "alert",
                        location: lang === "ID" ? "Peringatan Cuaca" : "Weather Alert",
                        status: weather.status,
                        icon: CloudRain,
                        color: "text-red-500",
                        bg: "bg-red-500/10",
                        detail: `Kondisi ekstrem di Pandeglang: ${weather.status}. Waspada terhadap potensi banjir dan angin kencang.`
                    });
                } else if (weather.status.toLowerCase().includes("hujan")) {
                    newStatuses.push({
                        id: "weather-info",
                        type: "warning",
                        location: "Cuaca: Pandeglang",
                        status: weather.status,
                        icon: CloudRain,
                        color: "text-orange-500",
                        bg: "bg-orange-500/10",
                        detail: `Sedang terjadi ${weather.status}. Siapkan payung dan hati-hati berkendara.`
                    });
                }
            }

            // Fallback: If no alerts, show general safety status
            if (newStatuses.length === 0) {
                newStatuses.push({
                    id: "info-aman",
                    type: "info",
                    location: "Status Keamanan",
                    status: "Kondusif",
                    icon: ShieldCheck,
                    color: "text-emerald-500",
                    bg: "bg-emerald-500/10",
                    detail: "Kondisi Pandeglang saat ini terpantau aman. Tidak ada aktivitas seismik atau cuaca ekstrem yang membahayakan."
                });
            }

            setStatuses(newStatuses);
        };

        initData();
        // Refresh every 10 minutes
        const interval = setInterval(initData, 600000);
        return () => clearInterval(interval);
    }, [lang]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isExpanded) {
                setIndex((prev) => (prev + 1) % statuses.length);
            }
        }, 5000);
        return () => clearInterval(timer);
    }, [isExpanded, statuses.length]);

    const current = statuses[index];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const checkMenu = () => {
            setIsMenuOpen(document.body.style.overflow === 'hidden');
        };
        const observer = new MutationObserver(checkMenu);
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
        return () => observer.disconnect();
    }, []);

    if (isMenuOpen || statuses.length === 0 || !current) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:top-24 md:right-8 md:translate-x-0 z-[100] flex flex-col items-center md:items-end pointer-events-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isExpanded ? "expanded" : current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`relative group bg-white/90 backdrop-blur-2xl border border-white/40 shadow-2xl transition-all duration-700 ${isExpanded ? "rounded-[1.5rem] md:rounded-[2rem] w-[calc(100vw-2rem)] max-w-xs p-6 md:p-8" : "rounded-full py-2.5 px-5 md:py-3 md:px-6 cursor-pointer hover:shadow-2xl"
                        }`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                >
                    {isExpanded ? (
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                aria-label="Close Alert Details"
                                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <X size={14} />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-2xl ${current.bg} ${current.color}`}>
                                    <current.icon size={20} />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A065]">
                                        {current.type === "alert" ? (lang === "ID" ? "Peringatan Darurat" : "Emergency Alert") :
                                            (lang === "ID" ? "Pusat Informasi Keamanan" : "Safety Info Center")}
                                    </h5>
                                    <p className="font-serif text-lg text-black">{current.location}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">{lang === "ID" ? "Kondisi" : "Condition"}</span>
                                    <span className={`font-bold ${current.color}`}>{current.status}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed font-light">
                                    {current.detail}
                                </p>
                                {current.link && (
                                    <a
                                        href={current.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C5A065] hover:underline pt-2 uppercase tracking-wider"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Read Full Article <ChevronRight size={12} />
                                    </a>
                                )}

                            </div>

                            {/* Status Switcher Dots */}
                            <div className="flex justify-center gap-2 mt-8">
                                {statuses.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                                        aria-label={`View Alert ${i + 1}`}
                                        className={`h-1 rounded-full transition-all duration-500 ${index === i ? "w-8 bg-[#C5A065]" : "w-2 bg-gray-200"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${current.type === 'alert' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                            <div className="flex items-center gap-2 max-w-[85vw] md:max-w-none overflow-hidden">
                                <current.icon size={12} className={current.color} />
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-black/40 whitespace-nowrap flex-shrink-0">{current.location}:</span>
                                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-black whitespace-nowrap`}>
                                    {current.status}
                                </span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LiveStatus;
