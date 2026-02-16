import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import { Search, X, MapPin, ArrowRight, ChevronDown, Share2, Copy, Check, Send, Grid } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { allDestinations } from "../data/destinations";

const Albums = () => {
    const { lang } = useLanguage();
    // EXPANDED DATA: High Quality & Valid Unsplash IDs
    // Now imported from external file for better management of high volume data



    // Use URL Search Params for deep linking (e.g. ?category=Kuliner)
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "Semua";

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    // Parallax Logic
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    // Update URL when category changes
    useEffect(() => {
        if (selectedCategory === "Semua") {
            searchParams.delete("category");
        } else {
            searchParams.set("category", selectedCategory);
        }
        setSearchParams(searchParams);
    }, [selectedCategory, setSearchParams, searchParams]);

    // Share Function
    const handleShare = async (title: string, description: string) => {
        const shareData = {
            title: lang === "ID" ? `Jelajahi ${title} - Pandeglang Explore` : `Explore ${title} - Pandeglang Explore`,
            text: description,
            url: window.location.href, // In real app, this would be a specific slug URL
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // Share failed - silent
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(`${title} - ${description} ${window.location.href}`);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // Get Related Destinations Logic
    const getRelatedDestinations = () => {
        if (selectedImage === null) return [];
        const currentCategory = allDestinations[selectedImage].category;
        // Filter by category, exclude current item, take 3
        return allDestinations
            .map((item, originalIndex) => ({ ...item, originalIndex })) // Keep track of original index
            .filter(item => item.category === currentCategory && item.originalIndex !== selectedImage)
            .slice(0, 3);
    };

    const categories = [
        "Semua",
        "Pemandangan",
        "Pantai",
        "Gunung",
        "Air Terjun",
        "Alam",
        "Budaya",
        "Kuliner",
        "Kota",
        "Petualangan",
        "Resort",
        "Sejarah",
        // Hidden technical categories mapped above but not shown if not needed
    ];

    const filteredDestinations = allDestinations.filter((dest) => {
        const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.description.toLowerCase().includes(searchQuery.toLowerCase());

        let normalizedCategory = dest.category;
        if (dest.category === "Beach") normalizedCategory = "Pantai";
        if (dest.category === "Mountain") normalizedCategory = "Gunung";
        if (dest.category === "Waterfall") normalizedCategory = "Air Terjun";
        if (dest.category === "Nature") normalizedCategory = "Alam";
        if (dest.category === "Culture") normalizedCategory = "Budaya";
        if (dest.category === "Culinary") normalizedCategory = "Kuliner";
        if (dest.category === "City") normalizedCategory = "Kota";
        if (dest.category === "Adventure") normalizedCategory = "Petualangan";
        if (dest.category === "History") normalizedCategory = "Sejarah";
        if (dest.category === "Scenery") normalizedCategory = "Pemandangan";
        if (dest.category === "Volcano") normalizedCategory = "Gunung";
        if (dest.category === "Relaxation") normalizedCategory = "Resort"; // Map Hot Springs to Resort/Leisure
        if (dest.category === "Activity") normalizedCategory = "Petualangan"; // Map Waterparks to Adventure
        if (dest.category === "Resort") normalizedCategory = "Resort"; // Ensure explicit Resort mapping matches UI

        // Advanced Filtering Logic
        let matchesCategory = false;

        if (selectedCategory === "Semua") {
            // SHOW EVERYTHING
            matchesCategory = true;
        } else if (selectedCategory === "Pemandangan") {
            // "Pemandangan" is a special curated filter for nature lovers
            const natureCategories = ["Beach", "Mountain", "Volcano", "Waterfall", "Nature", "Scenery", "Resort"];
            matchesCategory = natureCategories.includes(dest.category);
        } else {
            // Normal specific filtering
            matchesCategory = normalizedCategory === selectedCategory;
        }



        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-white selection:bg-black selection:text-white">
            <SEO
                title={lang === "ID" ? "Galeri Visual Pandeglang | Lensa Keindahan" : "Pandeglang Visual Gallery | Lens of Beauty"}
                description={lang === "ID"
                    ? "Koleksi foto terbaik destinasi wisata Pandeglang. Temukan inspirasi visual untuk perjalanan Anda selanjutnya."
                    : "The best photo collection of Pandeglang tourist destinations. Find visual inspiration for your next journey."}
            />
            <Navbar />

            {/* 1. CINEMATIC HERO HEADER */}
            <header className="relative h-[90vh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=80"
                        alt="Pandeglang Cinematic Hero"
                        className="w-full h-full object-cover"
                        fetchPriority="high"
                        initial={{ scale: 1.0, filter: "brightness(0.7)" }}
                        animate={{
                            scale: 1.15,
                            filter: "brightness(0.6)"
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4">

                    <motion.h1
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-7xl md:text-9xl font-serif font-medium text-white mb-6 drop-shadow-2xl tracking-tighter leading-tight text-center"
                    >
                        {lang === "ID" ? "Lensa" : "Lens"} <br />
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="italic font-light bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
                        >
                            Pandeglang
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
                        className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-xl mx-auto drop-shadow-lg tracking-wide mb-10 text-center"
                    >
                        {lang === "ID"
                            ? "Koleksi foto terbaik yang menangkap keindahan alam Pandeglang. Kurasi visual tajam dan estetik untuk inspirasi Anda."
                            : "The best photo collection capturing the natural beauty of Pandeglang. Sharp and aesthetic visual curation for your inspiration."}
                    </motion.p>

                    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 -mt-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="bg-white/95 backdrop-blur-sm rounded-full p-2 pl-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] flex items-center gap-2 border border-white/20"
                        >
                            {/* Category Dropdown */}
                            <div className="relative border-r border-gray-200 pr-2">
                                <button
                                    onClick={() => { setIsFilterOpen(!isFilterOpen); }}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-full transition-all duration-300 group"
                                >
                                    <Grid size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                                    <span className="font-medium text-sm whitespace-nowrap">
                                        {selectedCategory === "Semua" ? (lang === "ID" ? "Kategori" : "Category") : selectedCategory}
                                    </span>
                                    <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-300", isFilterOpen ? "rotate-180" : "")} />
                                </button>

                                <AnimatePresence>
                                    {isFilterOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-[280px] md:w-[600px] z-50 grid grid-cols-1 md:grid-cols-3 gap-1 overflow-hidden"
                                        >
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={cn(
                                                        "px-3 py-2 text-left text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group",
                                                        selectedCategory === category ? "bg-gray-50 font-medium text-black" : "text-gray-600"
                                                    )}
                                                >
                                                    {category === "All" ? "Semua" : category}
                                                    {selectedCategory === category && <Check size={14} className="text-black" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>



                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder={lang === "ID" ? "Cari gambar..." : "Search images..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none text-base"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Search Button */}
                            <button
                                className="bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-full p-4 md:px-8 md:py-4 flex items-center gap-3 transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(229,57,53,0.5)] hover:shadow-[0_12px_25px_-8px_rgba(229,57,53,0.6)] transform active:scale-95 group"
                            >
                                <Search size={20} />
                                <span className="font-semibold tracking-wide hidden md:inline">{lang === "ID" ? "Cari" : "Search"}</span>
                            </button>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 mix-blend-screen"
                >
                    <span className="text-[9px] uppercase tracking-[0.4em] animate-pulse">Scroll</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
                </motion.div>
            </header>

            {/* PARALLAX LIVING GALLERY */}
            <main ref={containerRef} className="px-4 container mx-auto pt-16 relative z-20 pb-40 min-h-screen">
                {filteredDestinations.length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-center">
                        {/* Define Columns based on simple modulo logic for visual distribution */}
                        {[0, 1, 2].map((colIndex) => {
                            // Column Parallax Configs
                            // Col 0: Fast
                            // Col 1: Slow (Reverse)
                            // Col 2: Normal
                            const yTransforms = [y1, y2, y3];

                            return (
                                <motion.div
                                    key={colIndex}
                                    style={{ y: window.innerWidth > 768 ? yTransforms[colIndex] : 0 }}
                                    className="flex-1 flex flex-col gap-6 md:gap-8 w-full"
                                >
                                    {filteredDestinations
                                        .filter((_, i) => i % 3 === colIndex)
                                        .map((dest, i) => {
                                            // Re-calculate original index approximately or pass it down if needed
                                            // Here we just use the filtered index for key
                                            return (
                                                <motion.div
                                                    key={dest.title}
                                                    initial={{ opacity: 0, y: 50 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "100px" }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="relative group"
                                                >
                                                    <DestinationCard
                                                        imageSrc={dest.imageSrc}
                                                        title={dest.title}
                                                        description={dest.description}
                                                        link={dest.link}
                                                        category={dest.category}
                                                        location={dest.location}
                                                        coords={dest.coords as [number, number]}
                                                        index={i}
                                                        layout="fixed"
                                                        // Important: Pass correct global index for modal logic
                                                        onSelect={() => setSelectedImage(allDestinations.findIndex(d => d.title === dest.title))}
                                                        className={cn("w-full shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-700 hover:-translate-y-2 pointer-events-auto", dest.heightClass)}
                                                    />
                                                    {/* Overlay Shine Effect */}
                                                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                                </motion.div>
                                            );
                                        })}
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center opacity-0 animate-fade-in">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <MapPin size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-black mb-3">{lang === "ID" ? "Tidak ditemukan" : "Not found"}</h3>
                        <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
                            {lang === "ID"
                                ? "Kami tidak dapat menemukan destinasi yang cocok dengan pencarian Anda. Coba kata kunci lain atau jelajahi kategori berbeda."
                                : "We couldn't find any destinations matching your search. Try different keywords or explore other categories."}
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="mt-8 px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl"
                        >
                            {lang === "ID" ? "Reset Filter" : "Reset Filter"}
                        </button>
                    </div>
                )}
            </main>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="bg-white rounded-3xl overflow-hidden w-full max-w-6xl h-[85vh] md:h-[80vh] flex flex-col md:flex-row relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            layoutId={`card-${selectedImage}`}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-full md:w-[60%] h-[40%] md:h-full bg-black relative">
                                <motion.img
                                    layoutId={`image-${selectedImage}`}
                                    src={allDestinations[selectedImage].imageSrc}
                                    alt={allDestinations[selectedImage].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="w-full md:w-[40%] h-[60%] md:h-full bg-white p-8 md:p-12 overflow-y-auto flex flex-col"
                            >
                                <div className="mb-6 border-b border-gray-100 pb-6">
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                                        {allDestinations[selectedImage].category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                                        {allDestinations[selectedImage].title}
                                    </h2>
                                    <div className="flex flex-col gap-2 mb-4">
                                        <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium">
                                            <span>★★★★★</span>
                                            <span className="text-gray-400 font-normal">({allDestinations[selectedImage].rating}/5 {lang === "ID" ? "dari" : "from"} {allDestinations[selectedImage].reviewCount} {lang === "ID" ? "Ulasan" : "Reviews"})</span>
                                        </div>
                                        {allDestinations[selectedImage].address && (
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <MapPin size={14} className="shrink-0" />
                                                <span>{allDestinations[selectedImage].address}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="prose prose-lg text-gray-600 font-light leading-relaxed mb-8 flex-grow">
                                    <p className="mb-4">
                                        {allDestinations[selectedImage].description}
                                    </p>
                                    <p className="text-sm text-gray-400 italic">
                                        {lang === "ID"
                                            ? '"Destinasi ini menawarkan pengalaman autentik yang tak terlupakan. Dikelilingi oleh keindahan alam yang masih asri, tempat ini menjadi favorit bagi para petualang dan pencari ketenangan."'
                                            : '"This destination offers an unforgettable authentic experience. Surrounded by pristine natural beauty, this place is a favorite for adventurers and peace seekers."'}
                                    </p>

                                    <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 text-sm">
                                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">{lang === "ID" ? "Informasi Turis" : "Tourist Information"}</h4>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">{lang === "ID" ? "Tiket Masuk" : "Entrance Fee"}</span>
                                                <span className="font-medium text-gray-900 text-right">{allDestinations[selectedImage].price}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">{lang === "ID" ? "Jam Buka" : "Opening Hours"}</span>
                                                <span className="font-medium text-gray-900 text-right">{allDestinations[selectedImage].openTime}</span>
                                            </li>
                                            <li className="flex justify-between items-start">
                                                <span className="text-gray-500 whitespace-nowrap mr-4">{lang === "ID" ? "Fasilitas" : "Facilities"}</span>
                                                <span className="font-medium text-gray-900 text-right leading-snug">{allDestinations[selectedImage].facilities}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* RELATED DESTINATIONS */}
                                    {getRelatedDestinations().length > 0 && (
                                        <div className="mt-10 pt-10 border-t border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">{lang === "ID" ? "Wisata Sejenis" : "Similar Destinations"}</h4>
                                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                                                {getRelatedDestinations().map((related) => (
                                                    <div
                                                        key={related.title}
                                                        onClick={() => setSelectedImage(related.originalIndex)}
                                                        className="group cursor-pointer"
                                                    >
                                                        <div className="overflow-hidden rounded-lg aspect-[4/3] mb-3 relative">
                                                            <img
                                                                src={related.imageSrc}
                                                                alt={related.title}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                                        </div>
                                                        <h5 className="font-serif font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">{related.title}</h5>
                                                        <p className="text-xs text-gray-400 line-clamp-1">{related.category}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 mt-auto">
                                    <a
                                        href={allDestinations[selectedImage].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 group"
                                    >
                                        <MapPin size={20} className="group-hover:animate-bounce" />
                                        {lang === "ID" ? "Lihat di Google Maps" : "View on Google Maps"}
                                    </a>
                                    <button
                                        onClick={() => handleShare(allDestinations[selectedImage].title, allDestinations[selectedImage].description)}
                                        className="w-full mt-3 py-4 text-sm text-gray-400 hover:text-gray-900 font-medium transition-all flex items-center justify-center gap-2 rounded-xl hover:bg-gray-50 bg-transparent border border-transparent hover:border-gray-200"
                                    >
                                        {isCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                                        {isCopied ? (lang === "ID" ? "Link Tersalin!" : "Link Copied!") : (lang === "ID" ? "Bagikan Destinasi Ini" : "Share This Destination")}
                                    </button>
                                </div>
                            </motion.div>

                            {/* RELATED DESTINATIONS (DESKTOP SIDEBAR EXTENSION OR BOTTOM) */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div >
    );
};

export default Albums;
