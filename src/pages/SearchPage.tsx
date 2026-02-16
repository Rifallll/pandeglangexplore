import { useSearchParams, Link } from 'react-router-dom';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { allDestinations } from '@/data/destinations';
import { eventData } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, FileText, Sparkles, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    // Prepare search data
    const searchData: SearchResult[] = useMemo(() => {
        const data: SearchResult[] = [];

        // Add destinations
        allDestinations.forEach((dest) => {
            data.push({
                id: dest.title,
                type: 'destination',
                title: dest.title,
                description: dest.description || '',
                category: dest.category,
                location: dest.location,
                link: dest.link || '#',
                image: dest.imageSrc,
            });
        });

        // Add events
        eventData.forEach((event) => {
            data.push({
                id: event.id.toString(),
                type: 'event',
                title: event.title,
                description: event.description,
                category: event.category,
                location: event.location,
                link: `/kalender/${event.id}`,
                image: event.image,
            });
        });

        return data;
    }, []);

    const { groupedResults, totalResults, isSearching } = useSearch(query, searchData);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
            <Navbar />

            <main className="container mx-auto px-4 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Header with Soft Gradient */}
                    <div className="mb-16 text-center">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-block mb-6"
                        >
                            <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-full border border-purple-200/40 backdrop-blur-sm">
                                <Sparkles size={16} className="text-purple-500" />
                                <span className="text-xs font-semibold tracking-wider text-purple-700 uppercase">Search Results</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent"
                        >
                            Hasil Pencarian
                        </motion.h1>

                        {query && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <p className="text-lg text-gray-500 mb-2">
                                    Menampilkan hasil untuk
                                </p>
                                <p className="text-3xl font-bold text-gray-800">
                                    "{query}"
                                </p>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100"
                        >
                            <TrendingUp size={18} className="text-purple-500" />
                            <span className="font-bold text-gray-800">{totalResults}</span>
                            <span className="text-gray-600">hasil ditemukan</span>
                        </motion.div>
                    </div>

                    {/* Loading State */}
                    {isSearching && (
                        <div className="text-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="w-14 h-14 border-3 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-4"
                            />
                            <p className="text-lg text-gray-600 font-medium">Mencari...</p>
                        </div>
                    )}

                    {/* No Query */}
                    {!query && !isSearching && (
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-32 bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-purple-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Mulai Pencarian</h2>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Ketik kata kunci di search bar untuk mencari destinasi, artikel, atau event
                            </p>
                        </motion.div>
                    )}

                    {/* No Results */}
                    {query && totalResults === 0 && !isSearching && (
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-32 bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-red-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Tidak Ada Hasil</h2>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Coba kata kunci lain atau periksa ejaan Anda
                            </p>
                        </motion.div>
                    )}

                    {/* Results */}
                    {totalResults > 0 && !isSearching && (
                        <div className="space-y-16">
                            {/* Destinations */}
                            {groupedResults.destinations.length > 0 && (
                                <section>
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="flex items-center gap-3 mb-8"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-sm">
                                            <MapPin size={22} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800">Destinasi</h2>
                                            <p className="text-gray-500">{groupedResults.destinations.length} lokasi ditemukan</p>
                                        </div>
                                    </motion.div>
                                    <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
                                        {groupedResults.destinations.map((result, index) => (
                                            <div key={result.id} className="break-inside-avoid mb-8">
                                                <ResultCard result={result} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Events */}
                            {groupedResults.events.length > 0 && (
                                <section>
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="flex items-center gap-3 mb-8"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-sm">
                                            <Calendar size={22} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800">Event</h2>
                                            <p className="text-gray-500">{groupedResults.events.length} acara ditemukan</p>
                                        </div>
                                    </motion.div>
                                    <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
                                        {groupedResults.events.map((result, index) => (
                                            <div key={result.id} className="break-inside-avoid mb-8">
                                                <ResultCard result={result} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Articles */}
                            {groupedResults.articles.length > 0 && (
                                <section>
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="flex items-center gap-3 mb-8"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-sm">
                                            <FileText size={22} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800">Artikel</h2>
                                            <p className="text-gray-500">{groupedResults.articles.length} artikel ditemukan</p>
                                        </div>
                                    </motion.div>
                                    <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
                                        {groupedResults.articles.map((result, index) => (
                                            <div key={result.id} className="break-inside-avoid mb-8">
                                                <ResultCard result={result} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

// Soft Result Card Component
const ResultCard = ({ result, index }: { result: SearchResult; index: number }) => {
    return (
        <Link to={result.link} className="block group">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100/50 h-full"
            >
                {/* Image with Soft Overlay */}
                {result.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Soft Category Badge */}
                        {result.category && (
                            <div className="absolute top-4 left-4">
                                <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-md text-purple-600 text-xs font-semibold rounded-full shadow-sm border border-purple-100/50">
                                    {result.category}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                        {result.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {result.description}
                    </p>

                    {/* Soft Location */}
                    {result.location && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
                                <MapPin size={14} className="text-purple-500" />
                            </div>
                            <span className="font-medium">{result.location}</span>
                        </div>
                    )}
                </div>

                {/* Soft Hover Border */}
                <div className="absolute inset-0 border-2 border-purple-300/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    );
};

export default SearchPage;
