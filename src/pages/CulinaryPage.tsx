import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Utensils, MapPin, Tag, ArrowRight, Star, Clock, Info, ExternalLink, ChevronRight, X, Flame, Coffee, Compass, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useSoundFX } from "@/hooks/useSoundFX";
import { CULINARY_DISHES_ID, CULINARY_DISHES_EN, CulinaryDish } from "@/data/culinaryDishes";

const TasteMeter = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[8px] font-mono uppercase text-white/40">
            <span>{label}</span>
            <span>{value}/5</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / 5) * 100}%` }}
                className={`h-full ${color}`}
            />
        </div>
    </div>
);

const FoodCard = ({ dish, onOpen }: { dish: CulinaryDish; onOpen: (dish: CulinaryDish) => void }) => {
    const { lang } = useLanguage();
    const { playSound } = useSoundFX();

    return (
        <motion.div
            layoutId={`card-${dish.id}`}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-[#C5A065]/50 transition-all duration-500"
        >
            <div onClick={() => { onOpen(dish); playSound("click"); }} className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <OptimizedImage src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div className="absolute top-4 left-4 z-20">
                <div className="bg-[#C5A065] text-black px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xl">
                    <Tag size={12} className="opacity-70" />
                    <span className="text-xs font-black font-mono tracking-tighter">{dish.displayPrice}</span>
                </div>
            </div>

            <div className="absolute top-4 right-4 z-20">
                <MagneticButton strength={20}>
                    <button
                        onClick={() => { onOpen(dish); playSound("click"); }}
                        onMouseEnter={() => playSound("hover")}
                        aria-label="View Details"
                        className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-[#C5A065] hover:text-black transition-all shadow-xl border border-white/10"
                    >
                        <Info size={18} />
                    </button>
                </MagneticButton>
            </div>

            <div onClick={() => onOpen(dish)} className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A065] mb-2 block">{dish.category}</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C5A065] transition-colors">{dish.name}</h3>

                <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <TasteMeter label={lang === "ID" ? "Pedas" : "Spicy"} value={dish.profile.spicy} color="bg-red-500" />
                    <TasteMeter label={lang === "ID" ? "Gurih" : "Savory"} value={dish.profile.savory} color="bg-[#C5A065]" />
                    <TasteMeter label={lang === "ID" ? "Manis" : "Sweet"} value={dish.profile.sweet} color="bg-blue-400" />
                </div>
            </div>
        </motion.div>
    );
};

const DetailModal = ({ dish, onClose }: { dish: CulinaryDish; onClose: () => void }) => {
    const { lang } = useLanguage();
    const [isMD, setIsMD] = useState(false);

    useEffect(() => {
        setIsMD(window.innerWidth < 768);
        const handleResize = () => setIsMD(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!dish) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-12 overflow-y-hidden"
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>

            <motion.div
                layoutId={!isMD ? `card-${dish.id}` : undefined}
                initial={isMD ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
                animate={isMD ? { y: 0 } : { opacity: 1, scale: 1 }}
                exit={isMD ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                drag={isMD ? "y" : false}
                dragConstraints={{ top: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                    if (isMD && info.offset.y > 100) onClose();
                }}
                className={cn(
                    "relative w-full bg-[#0F0F0F] border-t md:border border-white/10 overflow-hidden shadow-2xl flex flex-col",
                    "rounded-t-3xl h-[85svh] md:h-auto md:max-w-5xl md:rounded-3xl"
                )}
            >
                {/* Drag Handle (Mobile) */}
                <div className="md:hidden w-full flex justify-center py-4 absolute top-0 z-30"><div className="w-12 h-1 bg-white/20 rounded-full"></div></div>

                <button
                    onClick={onClose}
                    aria-label="Close Modal"
                    className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col lg:flex-row h-full overflow-y-auto no-scrollbar pb-12 md:pb-0">
                    <div className="w-full lg:w-5/12 aspect-square lg:aspect-auto relative shrink-0">
                        <OptimizedImage src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                            <div className="bg-[#C5A065] text-black px-4 py-2 font-black text-xl rounded-sm shadow-xl tracking-tighter uppercase whitespace-nowrap">{lang === "ID" ? "ESTIMASI" : "ESTIMATE"}: {dish.displayPrice}</div>
                        </div>
                    </div>

                    <div className="w-full lg:w-7/12 p-8 md:p-16 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[#C5A065] font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                                <Flame size={12} /> {dish.category}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-3xl font-black text-white mb-6 leading-tight tracking-tighter">{dish.name}</h2>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-3">{lang === "ID" ? "Profil Rasa" : "Flavor Profile"}</h4>
                                    <div className="grid grid-cols-1 gap-4 bg-white/5 p-4 rounded-xl">
                                        <TasteMeter label={lang === "ID" ? "Tingkat Pedas" : "Spicy Level"} value={dish.profile.spicy} color="bg-red-500" />
                                        <TasteMeter label={lang === "ID" ? "Tingkat Gurih" : "Savory Level"} value={dish.profile.savory} color="bg-[#C5A065]" />
                                        <TasteMeter label={lang === "ID" ? "Tingkat Manis" : "Sweet Level"} value={dish.profile.sweet} color="bg-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-3">{lang === "ID" ? "Bahan Utama" : "Key Ingredients"}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {dish.ingredients?.map((ing: string) => (
                                            <span key={ing} className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-xs text-white/60">{ing}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-3">{lang === "ID" ? "Kisah & Deskripsi" : "History & Description"}</h4>
                                <p className="text-white/80 text-lg font-light leading-relaxed">{dish.desc}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-8 safe-bottom">
                                <div>
                                    <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-3">{lang === "ID" ? "Harga Akurat" : "Accurate Price"}</h4>
                                    <span className="text-[#C5A065] font-black text-2xl tracking-tighter block mb-1">
                                        Rp {dish.price.toLocaleString("id-ID")}
                                    </span>
                                    <span className="text-[10px] text-white/20 uppercase tracking-widest">Update: Jan 2026</span>
                                </div>
                                <div>
                                    <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-3">{lang === "ID" ? "Lokasi Terpercaya" : "Trusted Location"}</h4>
                                    <span className="text-white font-serif text-xl border-b border-[#C5A065]">{dish.location}</span>
                                </div>
                            </div>

                            <MagneticButton strength={30} className="md:hidden w-full">
                                <Button
                                    className="w-full h-14 bg-[#C5A065] text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-white transition-all duration-500"
                                    onClick={() => window.open(`https://www.google.com/maps/search/${dish.name}+Pandeglang`, '_blank')}
                                >
                                    {lang === "ID" ? "Cari Lokasi Terdekat" : "Find Nearest Location"} <Compass size={18} className="ml-2" />
                                </Button>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const CulinaryPage = () => {
    const { lang, t } = useLanguage();
    const [selectedDish, setSelectedDish] = useState(null);
    const [filter, setFilter] = useState(lang === "ID" ? "Semua" : "All");
    const [searchQuery, setSearchQuery] = useState("");
    const { playSound } = useSoundFX();

    const DISHES = lang === "ID" ? CULINARY_DISHES_ID : CULINARY_DISHES_EN;

    const categories = lang === "ID"
        ? ["Semua", "Makanan Berat", "Lauk Pauk", "Camilan", "Kue Tradisional", "Oleh-oleh"]
        : ["All", "Heavy Meals", "Side Dishes", "Snacks", "Traditional Cake", "Souvenirs"];

    const filteredDishes = DISHES.filter(d => {
        const matchesFilter = filter === (lang === "ID" ? "Semua" : "All") || d.category === filter;
        const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setFilter(lang === "ID" ? "Semua" : "All");
    }, [lang]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#C5A065] selection:text-black"
        >
            <SEO
                title={lang === "ID" ? "Wisata Kuliner Pandeglang | Cita Rasa Autentik" : "Pandeglang Culinary | Authentic Taste"}
                description={lang === "ID"
                    ? "Manjakan lidah Anda dengan Angeun Lada, Otak-otak Labuan, dan durian jatuhan Pandeglang. Jelajahi kekayaan rasa di Banten."
                    : "Pamper your palate with Angeun Lada, Labuan Fish Cakes, and Pandeglang's fallen durian. Explore the richness of Banten flavors."}
            />
            <Navbar />

            {/* Cinematic Hero */}
            <section className="min-h-[85svh] md:h-[85vh] relative flex items-center justify-center overflow-hidden py-24">
                <div className="absolute inset-0">
                    <img src="/images/dest_rampak_bedug.png" className="w-full h-full object-cover opacity-10 grayscale brightness-50" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-8"
                    >
                        <span className="h-[1px] w-6 md:w-8 bg-[#C5A065]/40 text-center"></span>
                        <span className="text-[#C5A065] font-mono text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase">
                            {lang === "ID" ? "Eksplorasi Gastronomi" : "Gastronomy Exploration"}
                        </span>
                        <span className="h-[1px] w-6 md:w-8 bg-[#C5A065]/40"></span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8"
                    >
                        THE EPIC<br /><span className="text-[#C5A065] font-serif italic font-light">{lang === "ID" ? "KULINER" : "CULINARY"}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12 px-4"
                    >
                        {lang === "ID"
                            ? "Simulasi budget jajan, temukan resep rahasia, dan jelajahi rute rasa terbaik di Tanah Jawara."
                            : "Simulate snack budgets, discover secret recipes, and explore the best taste routes in the Land of Champions."}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative group w-full max-w-xl mx-auto px-4 sm:px-0"
                    >
                        <div className="absolute -inset-1 bg-[#C5A065]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C5A065] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder={lang === "ID" ? "Cari rasa otentik..." : "Search authentic flavors..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-[#C5A065]/40 transition-all backdrop-blur-xl text-sm md:text-base"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filter Hub */}
            <div className="sticky top-16 md:top-20 z-[70] bg-[#050505]/80 backdrop-blur-xl border-y border-white/5 py-4 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-2 md:gap-3 pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setFilter(cat); playSound("click"); }}
                                onMouseEnter={() => playSound("hover")}
                                className={`whitespace-nowrap px-5 md:px-6 py-2 rounded-full font-mono text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-300 border ${filter === cat ? "bg-[#C5A065] border-[#C5A065] text-black" : "bg-white/5 border-white/10 text-white/50 hover:border-[#C5A065]/40"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Master Grid */}
            <section className="py-16 md:py-24 container mx-auto px-6 min-h-[600px]">
                {filteredDishes.length === 0 ? (
                    <div className="text-center py-32 opacity-30">
                        <Search size={48} className="mx-auto mb-4" />
                        <h3 className="text-xl font-mono uppercase tracking-widest px-6">
                            {lang === "ID" ? "Tidak menemukan rasa yang Anda cari" : "Taste not found"}
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredDishes.map(dish => (
                            <FoodCard
                                key={dish.id}
                                dish={dish}
                                onOpen={setSelectedDish}
                            />
                        ))}
                    </div>
                )}
            </section>

            <AnimatePresence>
                {selectedDish && (
                    <DetailModal
                        dish={selectedDish}
                        onClose={() => setSelectedDish(null)}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </motion.div>
    );
};

export default CulinaryPage;
