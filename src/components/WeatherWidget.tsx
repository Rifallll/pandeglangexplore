import { useEffect, useState, useCallback } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, CloudLightning, Wind, Droplets } from 'lucide-react';
import { getRealWeather } from '@/services/bmkgService';
import { getWeatherForLocation, mockLocations } from '@/services/weatherService';
import { motion, AnimatePresence } from 'framer-motion';

interface WeatherData {
    location: string;
    condition: string;
    temp: number | string;
    humidity: number | string;
    windSpeed: number | string;
}

const WeatherWidget = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchWeather = useCallback(async () => {
        try {
            const realData = await getRealWeather();

            if (realData && realData.length > 0) {
                const item = realData[currentIndex % realData.length];
                setData(item);
            } else {
                // Fallback to internal mock if BMKG is empty/failing
                const location = mockLocations[currentIndex % mockLocations.length];
                const weather = await getWeatherForLocation(location.name);
                setData(weather);
            }
        } catch (error) {
            console.error("Weather error:", error);
            // Fallback
            const location = mockLocations[currentIndex % mockLocations.length];
            const weather = await getWeatherForLocation(location.name);
            setData(weather);
        } finally {
            setLoading(false);
        }
    }, [currentIndex]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const getIcon = (condition: string) => {
        switch (condition) {
            case 'Sunny': return <Sun size={14} className="text-yellow-500" />;
            case 'Partly Cloudy': return <CloudSun size={14} className="text-orange-400" />;
            case 'Cloudy': return <Cloud size={14} className="text-gray-400" />;
            case 'Rainy': return <CloudRain size={14} className="text-blue-400" />;
            case 'Stormy': return <CloudLightning size={14} className="text-purple-500" />;
            default: return <Sun size={14} className="text-yellow-500" />;
        }
    };

    const getLabel = (condition: string) => {
        switch (condition) {
            case 'Sunny': return 'Cerah';
            case 'Partly Cloudy': return 'Cerah Berawan';
            case 'Cloudy': return 'Berawan';
            case 'Rainy': return 'Hujan';
            case 'Stormy': return 'Badai';
            default: return condition;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-white/5 rounded-full border border-white/10 animate-pulse">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/10"></div>
                <div className="w-12 md:w-16 h-2 md:h-3 rounded-full bg-white/10"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex relative group">
            {/* Widget */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={data.location}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-default"
                >
                    {getIcon(data.condition)}
                    <span className="text-[9px] md:text-[10px] font-medium text-white/90 tracking-wide uppercase w-20 md:w-24 truncate text-center">
                        {data.location}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-bold text-[#C5A065]">
                        {data.temp}°C
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* Hover Card */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl w-48 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-800">{data.location}</span>
                        {getIcon(data.condition)}
                    </div>

                    <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-gray-900">{data.temp}°</span>
                        <p className="text-xs text-gray-500 font-medium">{getLabel(data.condition)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Humidity</span>
                            <div className="flex items-center gap-1 text-gray-700">
                                <Droplets size={12} className="text-blue-400" />
                                <span className="text-xs font-bold">{data.humidity}%</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center border-l border-gray-100">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Wind</span>
                            <div className="flex items-center gap-1 text-gray-700">
                                <Wind size={12} className="text-gray-400" />
                                <span className="text-xs font-bold">{data.windSpeed} km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
