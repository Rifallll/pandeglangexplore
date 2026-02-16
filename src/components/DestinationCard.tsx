"use client";

import React, { useState } from "react";
import { Star, MapPin, Navigation } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface DestinationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
  category: string;
  size?: "large" | "small";
  layout?: "fixed" | "masonry";
  location?: string;
  coords?: [number, number];
  className?: string;
  index?: number;
  onSelect?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  imageSrc,
  title,
  description,
  link,
  category,
  location,
  coords,
  layout = "fixed",
  className,
  index = 0,
  onSelect,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Weather Logic
  const [weather, setWeather] = useState<{ temp: number; icon: string; desc: string } | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const hasFetchedWeather = React.useRef(false);

  const handleMouseEnter = async () => {
    if (weather || hasFetchedWeather.current || !coords) return;

    setIsWeatherLoading(true);
    hasFetchedWeather.current = true;

    try {
      const { getWeather, getWeatherDescription, getWeatherIcon } = await import("@/services/weather");
      const dataArr = await getWeather(coords[0], coords[1]);

      if (dataArr && dataArr.length > 0) {
        const data = dataArr[0];
        setWeather({
          temp: data.current.temperature,
          icon: getWeatherIcon(data.current.weatherCode),
          desc: getWeatherDescription(data.current.weatherCode)
        });
      }
    } catch (e) {
      // Weather is optional - silent fail
    } finally {
      setIsWeatherLoading(false);
    }
  };

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      layoutId={`card-${index}`}
      onClick={() => onSelect && onSelect()}
      onMouseEnter={handleMouseEnter}
      className={cn("group cursor-pointer relative overflow-hidden rounded-2xl break-inside-avoid", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}

      <motion.img
        layoutId={`image-${index}`}
        src={getAssetPath(imageSrc)}
        alt={title}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
          layout === "fixed" ? "aspect-[4/3]" : "",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      {/* Top Right Weather Badge */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        {/* Coordinate / Location Tag if needed, or just Weather */}
        {isWeatherLoading && (
          <div className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 animate-pulse">
            <span className="text-[10px] text-white">Loading...</span>
          </div>
        )}
        {weather && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg"
          >
            <span className="text-amber-400 text-xs">
              {/* Simple Icon Mapping or just Emoji for now to avoid extensive icon imports in this generic card */}
              {weather.icon.includes('sun') ? '☀️' : weather.icon.includes('rain') ? '🌧️' : weather.icon.includes('cloud') ? '☁️' : '🌤️'}
            </span>
            <span className="text-white font-mono text-xs font-bold">{weather.temp}°C</span>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase rounded-full border border-white/20">
            {category}
          </span>
          {location && (
            <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-medium tracking-wider uppercase rounded-full border border-white/10 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              {location}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-serif text-white mb-4 leading-tight">{title}</h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#C5A065] hover:bg-[#D4B582] text-black text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl w-fit opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 delay-150"
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation size={14} fill="currentColor" />
          Petunjuk Arah
        </a>

      </div>
    </motion.div>
  );
};

export default DestinationCard;