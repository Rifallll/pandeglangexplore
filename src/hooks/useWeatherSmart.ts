"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getWeather, type WeatherData } from "@/services/weather";
import { CloudRain, Thermometer, Sun, Zap, Coffee, Waves, Mountain } from "lucide-react";

export interface SmartRecommendation {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    category: string;
    tips: string[];
}

export const useWeatherSmart = () => {
    const { lang } = useLanguage();
    const [recommendation, setRecommendation] = useState<SmartRecommendation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndRecommend = async () => {
            try {
                // Fetch for Pandeglang Center as baseline
                const weatherData = await getWeather(-6.3086, 106.1067);
                if (!weatherData || weatherData.length === 0) return;

                const weather = weatherData[0];
                if (!weather || !weather.current) return;

                const code = weather.current.weatherCode;
                const temp = weather.current.temperature;

                let rec: SmartRecommendation;

                // Logic: RAIN
                if (code >= 51) {
                    rec = {
                        title: lang === "ID" ? "Waktunya Wisata Kuliner" : "Time for Culinary Exploration",
                        description: lang === "ID"
                            ? "Sedang turun hujan di Pandeglang. Rekomendasi terbaik: Nikmati Rabeg hangat atau Sate Bandeng di kedai legendaris."
                            : "It's raining in Pandeglang. Best recommendation: Enjoy warm Rabeg or Sate Bandeng in legendary stalls.",
                        icon: Coffee,
                        color: "text-blue-400",
                        category: "Culinary",
                        tips: lang === "ID"
                            ? ["Gunakan pakaian hangat", "Bawa payung", "Coba Rabeg Khas Pandeglang"]
                            : ["Wear warm clothes", "Bring an umbrella", "Try local Rabeg"]
                    };
                }
                // Logic: HOT
                else if (temp > 31) {
                    rec = {
                        title: lang === "ID" ? "Segarkan Diri di Mata Air" : "Refresh Yourself at the Springs",
                        description: lang === "ID"
                            ? "Cuaca Pandeglang cukup terik hari ini. Waktu yang pas untuk mendinginkan diri di Cikoromoy atau Citaman."
                            : "Pandeglang is quite hot today. Perfect time to cool down at Cikoromoy or Citaman springs.",
                        icon: Thermometer,
                        color: "text-sky-400",
                        category: "Nature",
                        tips: lang === "ID"
                            ? ["Gunakan sunblock", "Tetap terhidrasi", "Bawa baju ganti"]
                            : ["Use sunblock", "Stay hydrated", "Bring extra clothes"]
                    };
                }
                // Logic: CLEAR / SUNNY
                else {
                    rec = {
                        title: lang === "ID" ? "Sempurna untuk Pantai" : "Perfect Day for the Beach",
                        description: lang === "ID"
                            ? "Langit cerah! Segera menuju Pantai Carita atau Tanjung Lesung untuk menikmati sunset terbaik."
                            : "Clear skies! Head to Carita Beach or Tanjung Lesung for the best sunset experience.",
                        icon: Waves,
                        color: "text-amber-400",
                        category: "Beach",
                        tips: lang === "ID"
                            ? ["Siapkan kamera", "Nikmati kelapa muda", "Tunggu hingga Sunset"]
                            : ["Prepare your camera", "Enjoy fresh coconut", "Wait for Sunset"]
                    };
                }

                setRecommendation(rec);
            } catch (err) {
                console.error("Weather Smart Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndRecommend();
    }, [lang]);

    return { recommendation, loading };
};
