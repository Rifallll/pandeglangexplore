import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Navigation, Compass, Filter, Sparkles, ChevronDown, Terminal, ShieldAlert, Star, Calendar, ArrowRight, Zap, LucideIcon, Coffee, Thermometer, Waves } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useWeatherSmart } from '@/hooks/useWeatherSmart';
import { useDestinationsSearch } from '@/hooks/useDestinationsSearch';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface AdvancedSearchProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSelect?: (title: string) => void;
    className?: string;
    mode?: 'sidebar' | 'modal' | 'floating';
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
    isOpen: propIsOpen,
    onClose,
    onSelect,
    className,
    mode = 'sidebar'
}) => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const { query, setQuery, suggestions, filteredResults, activeCategory, setActiveCategory } = useDestinationsSearch();
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { recommendation, loading: weatherLoading } = useWeatherSmart();

    const isOpen = mode === 'modal' ? (propIsOpen ?? false) : localIsOpen;

    const setIsOpen = React.useCallback((val: boolean) => {
        if (mode === 'modal') {
            if (!val && onClose) onClose();
        } else {
            setLocalIsOpen(val);
        }
    }, [mode, onClose]);

    // Keyboard shortcut (Ctrl+K / Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (mode === 'modal' && !isOpen && onClose) {
                    // This is tricky as we can't easily trigger the prop from here
                    // but we can assume the Navbar handles it if needed
                } else if (mode !== 'modal') {
                    setIsOpen(true);
                }
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, mode, onClose, setIsOpen]);

    // Close when clicking outside (non-modal)
    useEffect(() => {
        if (mode === 'modal') return;
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mode, setIsOpen]);

    const handleSelect = (title: string) => {
        setQuery(title);
        setIsOpen(false);
        if (onSelect) {
            onSelect(title);
        } else {
            // Default behavior: go to map and search
            navigate(`/peta?search=${encodeURIComponent(title)}`);
        }
    };

    const SearchContent = (
        <div
            ref={containerRef}
            className={cn(
                "relative transition-all duration-500",
                mode === 'floating' ? "w-full max-w-lg mx-auto" : "w-full",
                mode === 'modal' ? "max-w-2xl mx-auto mt-[10vh]" : "",
                className
            )}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Main Search Bar */}
            <div className={cn(
                "flex items-center gap-2 md:gap-3 px-3 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 shadow-2xl transition-all duration-700",
                isFocused ? "border-[#C5A065]/50 bg-white/10" : "",
                mode === 'sidebar' ? "rounded-2xl" : "rounded-full"
            )}>
                <Search size={18} className={cn("transition-colors duration-500", isFocused ? "text-[#C5A065]" : "text-white/20")} />

                <input
                    ref={inputRef}
                    type="text"
                    autoFocus={mode === 'modal'}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (mode !== 'modal') setIsOpen(true);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        if (mode !== 'modal') setIsOpen(true);
                    }}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    placeholder={lang === "ID" ? "Cari apapun di Pandeglang..." : "Search anything in Pandeglang..."}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-white/20 font-sans tracking-wide"
                />

                <div className="flex items-center gap-1 md:gap-2">
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            aria-label="Clear Search"
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={14} className="text-white/40" />
                        </button>
                    )}

                    <div className="w-px h-6 bg-white/10 mx-1 md:mx-2 hidden md:block"></div>

                    <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                        <Terminal size={12} className="text-white/20" />
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-tighter">Ctrl K</span>
                    </div>
                </div>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {(isOpen || (mode === 'modal' && (query || suggestions.length > 0))) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className={cn(
                            "absolute top-full left-0 right-0 mt-4 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl z-[3000]",
                            mode === 'modal' ? "max-h-[70vh] md:max-h-[60vh]" : "max-h-[400px]"
                        )}
                    >
                        <div className="p-6 overflow-y-auto no-scrollbar">
                            {/* Weather Smart Tip - The "Assistant" Feel */}
                            {mode === 'modal' && !weatherLoading && recommendation && !query && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-10 p-6 bg-white/5 rounded-3xl border border-[#C5A065]/20 relative overflow-hidden group"
                                >
                                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#C5A065]/5 rounded-full blur-3xl group-hover:bg-[#C5A065]/10 transition-colors"></div>
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className={`p-4 rounded-2xl bg-black/40 ${recommendation.color} border border-white/5 shadow-xl`}>
                                            <recommendation.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A065] animate-pulse"></div>
                                                <span className="text-[#C5A065] text-[10px] font-black uppercase tracking-[0.4em]">{lang === "ID" ? "Saran Hari Ini" : "Today's Smart Tip"}</span>
                                            </div>
                                            <h4 className="text-white text-xl font-serif font-bold mb-2">{recommendation.title}</h4>
                                            <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xl">{recommendation.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {recommendation.tips.map((tip, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-white/40 border border-white/5">
                                                        {tip}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleSelect(recommendation.category === 'Culinary' ? 'Kuliner' : (recommendation.category === 'Beach' ? 'Pantai' : 'Air Terjun'))}
                                            className="hidden md:flex items-center gap-2 self-center p-4 bg-[#C5A065] text-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#C5A065]/20"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest">{lang === "ID" ? "Jelajahi" : "Explore"}</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggestions Headlines */}
                            {suggestions.length > 0 && (
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 px-4 mb-4">
                                        <Sparkles size={14} className="text-[#C5A065]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A065]">{lang === "ID" ? "Rekomendasi Pintar" : "Smart Suggestions"}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5 px-2">
                                        {suggestions.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => handleSelect(s)}
                                                className="px-5 py-2.5 bg-white/5 hover:bg-[#C5A065] hover:text-black rounded-full text-xs font-bold text-white/70 transition-all border border-white/10 hover:border-[#C5A065] hover:scale-105 active:scale-95"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Results List */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-white/40" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{lang === "ID" ? "Hasil Eksplorasi" : "Discovery Results"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-[#C5A065] bg-[#C5A065]/10 px-3 py-1 rounded-full border border-[#C5A065]/20">
                                        <ShieldAlert size={10} />
                                        <span>SAFETY MONITORED</span>
                                    </div>
                                </div>

                                {filteredResults.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-2">
                                        {filteredResults.slice(0, 10).map((dest, idx) => (
                                            <button
                                                key={dest.title}
                                                onClick={() => handleSelect(dest.title)}
                                                className="w-full flex items-center gap-5 p-4 hover:bg-white/5 rounded-[1.5rem] transition-all group/item border border-transparent hover:border-white/10"
                                            >
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                                                    <img src={dest.imageSrc} alt={dest.title} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000" />
                                                </div>
                                                <div className="text-left flex-1 min-w-0">
                                                    <h4 className="text-base font-bold text-white group-hover/item:text-[#C5A065] transition-colors truncate">{dest.title}</h4>
                                                    <p className="text-xs text-white/40 font-medium truncate mt-0.5">{dest.location} • {dest.category}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-[8px] px-2 py-0.5 bg-white/5 text-white/30 rounded border border-white/5 uppercase tracking-widest font-black">Official</span>
                                                        <span className="text-[8px] text-[#C5A065]/60 font-bold uppercase tracking-widest italic">Verified</span>
                                                    </div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:bg-[#C5A065] group-hover/item:text-black transition-all">
                                                    <Navigation size={16} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-16 text-center">
                                        <div className="relative w-20 h-20 mx-auto mb-6">
                                            <Compass size={80} className="text-white/5 absolute inset-0 animate-spin-slow" />
                                            <Search size={30} className="text-[#C5A065] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                                        </div>
                                        <p className="text-lg text-white/40 font-serif italic mb-2">
                                            {lang === "ID" ? "Misteri Pandeglang menanti..." : "Pandeglang mysteries await..."}
                                        </p>
                                        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
                                            {lang === "ID" ? "Coba cari 'Tanjung Lesung' atau 'Ujung Kulon'" : "Try searching 'Tanjung Lesung' or 'Ujung Kulon'"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="p-5 bg-white/5 border-t border-white/10 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                            <div className="flex items-center gap-4">
                                <span>{filteredResults.length} SITES FOUND</span>
                                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                <span className="text-[#C5A065]/50">Pandeglang Premium Search</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Press ESC to exit</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    if (mode === 'modal') {
        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-2xl px-6 md:px-0"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute top-8 right-8 p-3 text-white/40 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={32} />
                        </motion.button>
                        {SearchContent}
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return SearchContent;
};

export default AdvancedSearch;
