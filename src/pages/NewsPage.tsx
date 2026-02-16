
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewsItem, fetchRegionalNews } from "@/services/newsService";
import { ShieldCheck, Calendar, ArrowRight, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const NewsPage = () => {
    const { lang } = useLanguage();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            const data = await fetchRegionalNews(lang as "ID" | "EN");
            setNews(data);
            setLoading(false);
        };
        loadNews();
    }, [lang]);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-[#C5A065] selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 text-[#C5A065] mb-4">
                        <Newspaper size={20} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">
                            {lang === "ID" ? "Pusat Informasi" : "News Center"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        {lang === "ID" ? "Berita" : "News"} <span className="text-[#C5A065]">Pandeglang</span>.
                    </h1>
                    <p className="text-white/60 max-w-2xl text-lg font-light">
                        {lang === "ID"
                            ? "Kabar terkini seputar pariwisata, budaya, dan peristiwa penting di wilayah Pandeglang dan sekitarnya. Terkurasi otomatis untuk Anda."
                            : "Latest updates on tourism, culture, and important events in the Pandeglang region. Curated automatically for you."}
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 bg-white/5 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item, idx) => (
                            <motion.a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group block bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                                        {item.source}
                                    </span>
                                    <div className="flex items-center gap-2 text-white/40 text-xs">
                                        <Calendar size={12} />
                                        <span>{new Date(item.pubDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-[#C5A065] transition-colors line-clamp-3">
                                    {item.title}
                                </h3>
                                {/* Simple HTML stripper for description */}
                                <p className="text-sm text-white/60 line-clamp-3 mb-6 font-light">
                                    {item.description.replace(/<[^>]*>?/gm, '')}
                                </p>

                                <div className="flex items-center text-[#C5A065] text-xs font-bold uppercase tracking-widest gap-2">
                                    Baca Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <Newspaper size={48} className="mx-auto text-white/20 mb-4" />
                        <h3 className="text-xl font-bold text-white/80">Belum Ada Berita Terbaru</h3>
                        <p className="text-white/40 mt-2">Coba lagi nanti untuk update seputar Pandeglang.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default NewsPage;
