

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin, Waves, Mountain, Camera, Palmtree, Navigation, X, Share2, Sparkles, Map, Play, Pause, Search } from "lucide-react";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

import { allDestinations } from "@/data/destinations";
import { getWeather, getMarineWeather, getWeatherDescription, getWeatherIcon, type WeatherData } from "@/services/weather";
import { Sun, CloudSun, CloudFog, CloudRain, CloudLightning, Cloud, Thermometer, Sunrise, Sunset, Zap, AlertTriangle } from "lucide-react";
import { cn, getGoogleMapsLink } from "@/lib/utils";
import MagneticButton from "@/components/MagneticButton";

// Helper to map categories to map-friendly types
const getMapCategory = (cat: string) => {
  const c = cat.toLowerCase();
  if (c === 'beach') return 'beach';
  if (['nature', 'waterfall', 'mountain', 'volcano', 'scenery', 'adventure', 'lake'].includes(c)) return 'nature';
  return 'culture';
};

const getDayName = (date: Date, lang: string) => {
  return new Intl.DateTimeFormat(lang === "ID" ? 'id-ID' : 'en-US', { weekday: 'long' }).format(date);
};



const categories = [
  { id: "all", label: "Semua", icon: MapPin, color: "#111" },
  { id: "beach", label: "Pantai & Laut", icon: Waves, color: "#3B82F6" },
  { id: "nature", label: "Gunung & Alam", icon: Mountain, color: "#10B981" },
  { id: "culture", label: "Budaya & Edukasi", icon: Camera, color: "#C5A065" },
];



// Haversine Distance Calculation (in km)
const calculateDistance = (coord1: [number, number], coord2: [number, number]) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (coord2[0] - coord1[0]) * (Math.PI / 180);
  const dLon = (coord2[1] - coord1[1]) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1[0] * (Math.PI / 180)) * Math.cos(coord2[0] * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const InteractiveMap = () => {
  const { lang, t } = useLanguage();

  const categories = useMemo(() => lang === "ID" ? [
    { id: "all", label: "Semua", icon: MapPin, color: "#111" },
    { id: "beach", label: "Pantai & Laut", icon: Waves, color: "#3B82F6" },
    { id: "nature", label: "Gunung & Alam", icon: Mountain, color: "#10B981" },
    { id: "culture", label: "Budaya & Edukasi", icon: Camera, color: "#C5A065" },
  ] : [
    { id: "all", label: "All", icon: MapPin, color: "#111" },
    { id: "beach", label: "Beach & Sea", icon: Waves, color: "#3B82F6" },
    { id: "nature", label: "Mountain & Nature", icon: Mountain, color: "#10B981" },
    { id: "culture", label: "Culture & Education", icon: Camera, color: "#C5A065" },
  ], [lang]);

  const getTravelTip = (weather: WeatherData) => {
    if (!weather || !weather.current || !weather.hourly) return {
      text: lang === "ID" ? "Cuaca bagus untuk eksplorasi!" : "Great weather for exploration!",
      icon: Zap,
      color: "text-green-400"
    };

    const code = weather.current.weatherCode;
    const temp = weather.current.temperature;
    const hour = new Date().getHours();
    const uv = (weather.hourly.uvIndex && weather.hourly.uvIndex.length > hour) ? weather.hourly.uvIndex[hour] : 0;

    if (code >= 51) return {
      text: lang === "ID" ? "Bawa payung atau jas hujan ☔" : "Bring an umbrella or raincoat ☔",
      icon: AlertTriangle,
      color: "text-red-400"
    };
    if (uv > 6) return {
      text: lang === "ID" ? "Indeks UV tinggi, gunakan sunblock 🧴" : "High UV index, wear sunblock 🧴",
      icon: Sun,
      color: "text-amber-400"
    };
    if (hour >= 16 && hour <= 18 && code <= 3) return {
      text: lang === "ID" ? "Waktu terbaik untuk foto Sunset! 🌅" : "Best time for Sunset photos! 🌅",
      icon: Zap,
      color: "text-orange-400"
    };
    if (hour >= 5 && hour <= 7 && code <= 3) return {
      text: lang === "ID" ? "Golden Hour! Siapkan kamera Anda 📸" : "Golden Hour! Prepare your camera 📸",
      icon: Sunrise,
      color: "text-yellow-400"
    };
    if (temp > 30) return {
      text: lang === "ID" ? "Cuaca panas, tetap terhidrasi 💧" : "Hot weather, stay hydrated 💧",
      icon: Thermometer,
      color: "text-blue-400"
    };

    return {
      text: lang === "ID" ? "Cuaca bagus untuk eksplorasi!" : "Great weather for exploration!",
      icon: Zap,
      color: "text-green-400"
    };
  };

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});

  // SONIC MAP: Audio Refs
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [activeSound, setActiveSound] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Audio Ambience
    audioRefs.current = {
      'beach': new Audio('https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3'),
      'nature': new Audio('https://www.soundjay.com/nature/sounds/forest-wind-and-birds-1.mp3'),
      'culture': new Audio('https://www.soundjay.com/human/sounds/market-1.mp3') // PlaceholderCrowd
    };

    Object.values(audioRefs.current).forEach(audio => {
      audio.loop = true;
      audio.volume = 0; // Start silent for fade-in
    });

    return () => {
      Object.values(audioRefs.current).forEach(audio => audio.pause());
    };
  }, []);

  const fadeAudio = (category: string | null) => {
    // Fade out all others
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (key !== category) {
        // Simple fade out logic (could be improved with interval)
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (category && audioRefs.current[category]) {
      const audio = audioRefs.current[category];
      audio.volume = 0.4;
      audio.play().catch(() => { }); // Browser autoplay policy
      setActiveSound(category);
    } else {
      setActiveSound(null);
    }
  };

  const destinations = useMemo(() => allDestinations.map((dest, idx) => ({
    id: idx + 1,
    name: dest.title,
    coords: (dest.coords || [-6.3086, 106.1067]) as [number, number],
    category: getMapCategory(dest.category),
    originalCategory: dest.category,
    description: dest.description,
    image: dest.imageSrc,
    link: getGoogleMapsLink((dest.coords || [-6.3086, 106.1067]) as [number, number])
  })), []);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLocation, setActiveLocation] = useState(destinations[0]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Weather State
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [regionalWeather, setRegionalWeather] = useState<{ [key: number]: { temp: number, code: number } }>({});

  // Cinematic Tour State
  const [isTouring, setIsTouring] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const tourIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Route Builder State
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [routeDestinations, setRouteDestinations] = useState<typeof destinations>([]);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  // Haversine Distance Calculation (in km)


  const routeStats = useMemo(() => {
    if (routeDestinations.length < 2) return { distance: 0, time: 0 };
    let totalDist = 0;
    for (let i = 0; i < routeDestinations.length - 1; i++) {
      totalDist += calculateDistance(routeDestinations[i].coords, routeDestinations[i + 1].coords);
    }
    // Assume average speed of 40km/h for winding roads
    const timeHours = totalDist / 40;
    return { distance: totalDist.toFixed(1), time: Math.ceil(timeHours * 60) }; // Time in minutes
  }, [routeDestinations]);

  // Tour Logic
  useEffect(() => {
    if (isTouring) {
      // Start playing the current location's audio (if sonic map is active)
      const currentDest = destinations[tourIndex];
      setActiveLocation(currentDest);
      setHoveredCategory(currentDest.category); // Highlight marker

      // Auto-pilot camera
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(currentDest.coords, 16, {
          duration: 3,
          easeLinearity: 0.1
        });
      }

      tourIntervalRef.current = setTimeout(() => {
        setTourIndex((prev) => (prev + 1) % destinations.length);
      }, 8000); // 8 seconds per stop

    } else {
      if (tourIntervalRef.current) clearTimeout(tourIntervalRef.current);
      if (mapInstanceRef.current) mapInstanceRef.current.setZoom(10); // Reset zoom
    }

    return () => {
      if (tourIntervalRef.current) clearTimeout(tourIntervalRef.current);
    };
  }, [isTouring, tourIndex, destinations]);

  const toggleTour = () => {
    if (isTouring) {
      setIsTouring(false);
      setTourIndex(0);
    } else {
      setIsTouring(true);
      setIsRouteMode(false); // Conflict resolution
      setTourIndex(0);
    }
  };

  // Route Mode Toggle Handler
  const toggleRouteMode = () => {
    setIsRouteMode(!isRouteMode);
    setIsTouring(false); // Conflict resolution
    setRouteDestinations([]);
    setActiveLocation(destinations[0]); // Reset to default
  };

  // Add/Remove Destination to Route
  const handleRouteSelection = useCallback((dest: typeof destinations[0]) => {
    if (routeDestinations.find(d => d.id === dest.id)) {
      setRouteDestinations(routeDestinations.filter(d => d.id !== dest.id));
    } else {
      setRouteDestinations([...routeDestinations, dest]);
    }
  }, [routeDestinations]);

  // SMART SORT: Nearest Neighbor Algorithm
  const optimizeRoute = () => {
    if (routeDestinations.length < 3) return; // No need to sort if less than 3

    const sorted = [routeDestinations[0]]; // Start with the first selected point
    const remaining = [...routeDestinations.slice(1)];

    while (remaining.length > 0) {
      const current = sorted[sorted.length - 1];
      let nearestIdx = 0;
      let minDist = Infinity;

      remaining.forEach((dest, idx) => {
        const dist = calculateDistance(current.coords, dest.coords);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = idx;
        }
      });

      sorted.push(remaining[nearestIdx]);
      remaining.splice(nearestIdx, 1);
    }
    setRouteDestinations(sorted);
  };

  // EXPORT TO GOOGLE MAPS
  const handleExportToGoogleMaps = () => {
    if (routeDestinations.length === 0) return;

    // Format: https://www.google.com/maps/dir/lat1,lng1/lat2,lng2/...
    const coordsPath = routeDestinations.map(d => `${d.coords[0]},${d.coords[1]}`).join('/');
    const url = `https://www.google.com/maps/dir/${coordsPath}`;

    window.open(url, '_blank');
  };

  // Fetch individual location weather + marine
  useEffect(() => {
    const fetchWeather = async () => {
      if (!activeLocation) return;
      setIsWeatherLoading(true);

      const [weatherDataArr, marineData] = await Promise.all([
        getWeather(activeLocation.coords[0], activeLocation.coords[1]),
        activeLocation.category === 'beach'
          ? getMarineWeather(activeLocation.coords[0], activeLocation.coords[1])
          : Promise.resolve(null)
      ]);

      if (weatherDataArr && weatherDataArr.length > 0) {
        setWeather({
          ...weatherDataArr[0],
          marine: marineData || undefined
        });
      }
      setIsWeatherLoading(false);
    };

    fetchWeather();
  }, [activeLocation]);

  // BATCH FETCH FOR ALL MARKERS (Efficient single request)
  useEffect(() => {
    const fetchRegional = async () => {
      if (destinations.length === 0) return;

      const lats = destinations.map(d => d.coords[0]);
      const lngs = destinations.map(d => d.coords[1]);

      try {
        const dataArr = await getWeather(lats, lngs);

        if (dataArr && dataArr.length > 0) {
          const results: { [key: number]: { temp: number, code: number } } = {};
          dataArr.forEach((data, idx) => {
            if (destinations[idx]) {
              results[destinations[idx].id] = {
                code: data.current.weatherCode,
                temp: data.current.temperature
              };
            }
          });
          setRegionalWeather(results);
        }
      } catch (e) {
        // Weather fetch is optional - silent fail
      }
    };
    fetchRegional();
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest =>
      activeCategory === "all" ? true : dest.category === activeCategory
    );
  }, [activeCategory, destinations]);

  // Draw Route Polyline
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing route
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    if (isRouteMode && routeDestinations.length > 1) {
      const latlngs = routeDestinations.map(d => d.coords);
      const polyline = L.polyline(latlngs, {
        color: '#C5A065',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
        lineCap: 'round'
      }).addTo(mapInstanceRef.current);

      routeLayerRef.current = polyline;
      mapInstanceRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [routeDestinations, isRouteMode]);

  const getMarkerIcon = useCallback((category: string, isActive: boolean, index: number, destId: number) => {
    const categoryInfo = categories.find(c => c.id === category);
    const color = categoryInfo?.color || "#C5A065";
    const size = isActive ? 60 : 44; // Mobile friendly tap target (min 44px)

    // Check if in route
    const indexInRoute = routeDestinations.findIndex(d => d.id === destId);
    const isInRoute = indexInRoute !== -1;

    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
          ${isActive || isInRoute ? `
            <div style="position: absolute; width: 100%; height: 100%; background: ${color}; opacity: 0.3; border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; width: 70%; height: 70%; background: ${color}; opacity: 0.5; border-radius: 50%;"></div>
          ` : `
            <div style="position: absolute; width: 100%; height: 100%; background: transparent;"></div>
          `}
          <div style="
            width: ${isActive ? '24px' : '14px'}; 
            height: ${isActive ? '24px' : '14px'}; 
            background: ${isInRoute ? '#fff' : color}; 
            border: ${isInRoute ? `4px solid ${color}` : `2px solid #fff`}; 
            border-radius: 50%; 
            box-shadow: 0 0 15px ${color};
            transition: all 0.3s ease;
          "></div>
          ${isInRoute ? `<div style="position: absolute; top: -10px; background: ${color}; color: #000; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 10px; border: 1px solid #fff;">${indexInRoute + 1}</div>` : ''}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  }, [categories, routeDestinations]);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // STRICT BOUNDS for Pandeglang
      const southWest = L.latLng(-7.0, 105.0);
      const northEast = L.latLng(-5.8, 106.3);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map(mapContainerRef.current, {
        dragging: true,
        scrollWheelZoom: true,
        touchZoom: true,
        doubleClickZoom: true,
        zoomControl: false,
        attributionControl: false,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        minZoom: 9,
        maxZoom: 18
      }).setView([-6.45, 105.75], 10);

      // DARK MATTER TILES (High Contrast Dark Mode)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Light labels layer for better readability if needed, but DarkMatter usually includes them.
      // We can add a second layer if we want hybrid, but CartoDB Dark is usually sufficient.

      mapInstanceRef.current = map;
      setTimeout(() => {
        if (mapInstanceRef.current) {
          map.invalidateSize();
        }
      }, 500);
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    filteredDestinations.forEach((dest, idx) => {
      const marker = L.marker(dest.coords, {
        icon: getMarkerIcon(dest.category, activeLocation?.id === dest.id, idx, dest.id)
      })
        .addTo(map)
        .bindPopup(`<b>${dest.name}</b><br>${dest.description}`);

      markersRef.current[dest.id] = marker;
      marker.on('click', () => {
        if (isRouteMode) {
          handleRouteSelection(dest);
        } else {
          setActiveLocation(dest);
        }
      });

      // SONIC TRIGGER
      marker.on('mouseover', () => {
        fadeAudio(dest.category);
        setHoveredCategory(dest.category); // Sync visual state
      });
      marker.on('mouseout', () => {
        fadeAudio(null);
        setHoveredCategory(null);
      });

    });
  }, [activeCategory, filteredDestinations, activeLocation, hoveredCategory, regionalWeather, getMarkerIcon, isRouteMode, routeDestinations, handleRouteSelection]);

  useEffect(() => {
    if (mapInstanceRef.current && activeLocation && !isRouteMode) {
      mapInstanceRef.current.flyTo(activeLocation.coords, 14, { duration: 1.5 });
      const marker = markersRef.current[activeLocation.id];
      if (marker) marker.openPopup();
    }
  }, [activeLocation, isRouteMode]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050505] font-sans selection:bg-[#C5A065] selection:text-white">
      {/* 1. MAP CONTAINER */}
      <div id="map-container" ref={mapContainerRef} className="absolute inset-0 z-0 bg-[#0a0a0a]" />


      {/* 2. PC SIDEBAR (Desktop Only) */}
      {!isMobile && (
        <motion.div
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          className="absolute top-24 left-6 bottom-6 w-[400px] z-[2000] pointer-events-none flex flex-col gap-4"
        >
          {/* PC Filters */}
          <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl pointer-events-auto">
            <h3 className="text-[#C5A065] text-[10px] font-black uppercase tracking-[0.4em] mb-4 pl-2">{lang === "ID" ? "Filter Destinasi" : "Destination Filter"}</h3>
            <div className="grid grid-cols-1 gap-2">
              {categories.map(cat => (
                <MagneticButton strength={10} key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-between group",
                      activeCategory === cat.id
                        ? "bg-[#C5A065] text-black shadow-[0_10px_20px_rgba(197,160,101,0.2)]"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={16} className={activeCategory === cat.id ? "text-black" : "text-[#C5A065]"} />
                      <span>{cat.label}</span>
                    </div>
                    {activeCategory === cat.id && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                  </button>
                </MagneticButton>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between px-2">
              <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">{lang === "ID" ? "Tour Otomatis" : "Auto Tour"}</span>
              <MagneticButton strength={20}>
                <button
                  onClick={toggleTour}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all",
                    isTouring ? "bg-red-500 text-white" : "bg-white/5 text-[#C5A065] hover:bg-white/10"
                  )}
                >
                  {isTouring ? (lang === "ID" ? "Berhenti" : "Stop") : (lang === "ID" ? "Mulai Tour" : "Start Tour")}
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* PC Detail Card */}
          <AnimatePresence mode="wait">
            {activeLocation && (
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex-1 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
              >
                <div className="h-48 relative shrink-0">
                  <img src={activeLocation.image} alt={activeLocation.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  <button
                    onClick={() => setActiveLocation(null)}
                    aria-label="Close Details"
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-[#C5A065] transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-4 left-6">
                    <span className="text-[#C5A065] text-[9px] font-black uppercase tracking-widest">
                      {categories.find(c => c.id === activeLocation.category)?.label}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tighter">{activeLocation.name}</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 border-l-2 border-[#C5A065]/30 pl-4">
                    {activeLocation.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Button
                      variant="outline"
                      className="h-12 bg-transparent border-white/10 text-white hover:bg-white/5 text-[9px] uppercase font-black"
                      onClick={() => handleRouteSelection(activeLocation)}
                    >
                      {routeDestinations.some(d => d.id === activeLocation.id)
                        ? (lang === "ID" ? "Hapus Rute" : "Remove Route")
                        : (lang === "ID" ? "+ Rute" : "+ Route")}
                    </Button>
                    <Button
                      className="h-12 bg-[#C5A065] text-black hover:bg-white text-[9px] uppercase font-black"
                      onClick={() => window.open(activeLocation.link, '_blank')}
                    >
                      {lang === "ID" ? "Navigasi" : "Navigation"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* 3. MOBILE CONTROLS (Floating Bottom) */}
      {isMobile && (
        <>
          <div className={cn(
            "absolute bottom-0 left-0 right-0 z-[2500] px-4 pb-8 safe-bottom pointer-events-none flex flex-col items-center gap-4 transition-all duration-500",
            activeLocation ? "translate-y-[-72svh]" : "translate-y-0"
          )}>
            {/* Mobile Filters Bar */}
            <div className="w-full max-w-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center shadow-2xl pointer-events-auto overflow-hidden">
              <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-1 px-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all gap-2 flex items-center justify-center whitespace-nowrap",
                      activeCategory === cat.id ? "bg-[#C5A065] text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    <cat.icon size={12} />
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
              <div className="w-px h-6 bg-white/20 mx-1 shrink-0"></div>
              <button onClick={toggleTour} className={cn("p-2.5 rounded-full transition-all shrink-0", isTouring ? "bg-red-500 text-white" : "text-[#C5A065]")}>
                {isTouring ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeLocation && (
              <motion.div
                key={activeLocation.id}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) setActiveLocation(null);
                }}
                className="fixed inset-x-0 bottom-0 z-[3000] bg-[#0a0a0a] border-t border-white/10 rounded-t-[32px] h-[72svh] overflow-hidden flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.5)] touch-pan-y"
              >
                <div className="w-full flex justify-center py-4 absolute top-0 z-30"><div className="w-12 h-1 bg-white/20 rounded-full"></div></div>
                <div className="h-48 relative shrink-0">
                  <img src={activeLocation.image} alt={activeLocation.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                  <button onClick={() => setActiveLocation(null)} aria-label="Close Details" className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white"><X size={20} /></button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto no-scrollbar flex flex-col safe-bottom">
                  <span className="text-[#C5A065] text-[10px] font-black uppercase tracking-widest mb-2">{categories.find(c => c.id === activeLocation.category)?.label}</span>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{activeLocation.name}</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">{activeLocation.description}</p>
                  <div className="mt-auto flex gap-3 pb-4">
                    <Button variant="outline" className="flex-1 h-12 bg-transparent border-white/10 text-white uppercase text-[9px] font-black" onClick={() => handleRouteSelection(activeLocation)}>
                      {lang === "ID" ? "Rute" : "Route"}
                    </Button>
                    <Button className="flex-1 h-12 bg-[#C5A065] text-black uppercase text-[9px] font-black" onClick={() => window.open(activeLocation.link, '_blank')}>
                      {lang === "ID" ? "Navigasi" : "Navigation"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* 4. ROUTE TOOL (Common Overlay) */}
      <AnimatePresence>
        {isRouteMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "absolute z-[2000] pointer-events-auto shadow-2xl",
              isMobile ? "top-24 right-4" : "top-24 right-8"
            )}
          >
            <div className="bg-black/95 backdrop-blur-xl border border-[#C5A065]/30 rounded-2xl p-4 text-white min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[#C5A065] text-[10px] font-black uppercase tracking-widest">Rute Planner</h4>
                <button onClick={() => { setIsRouteMode(false); setRouteDestinations([]); }} aria-label="Close Route Planner" className="text-white/20 hover:text-white"><X size={14} /></button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end"><span className="text-[9px] text-white/40 uppercase">{lang === "ID" ? "Tujuan Aktif" : "Active Destinations"}</span><span className="text-xl font-bold font-mono">{routeDestinations.length}</span></div>
                <div className="flex justify-between items-end"><span className="text-[9px] text-white/40 uppercase">{lang === "ID" ? "Total Jarak" : "Total Distance"}</span><span className="text-xl font-bold font-mono text-[#C5A065]">{routeStats.distance} km</span></div>
                <Button onClick={handleExportToGoogleMaps} className="w-full h-10 bg-white text-black hover:bg-[#C5A065] text-[9px] font-black">{lang === "ID" ? "BUKA GOOGLE MAPS" : "OPEN GOOGLE MAPS"}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. GESTURE GUIDE Overlay */}
      <div className="absolute bottom-6 right-8 z-[1000] hidden lg:flex items-center gap-4 opacity-20 pointer-events-none group hover:opacity-100 transition-opacity">
        <div className="text-right">
          <p className="text-[10px] text-[#C5A065] font-black uppercase tracking-widest leading-none">Pandeglang Explore</p>
          <p className="text-[8px] text-white uppercase tracking-[0.3em] mt-1">Interactive Geospatial System v2.0</p>
        </div>
        <div className="w-px h-10 bg-white/20"></div>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center animate-pulse"><Sparkles size={12} className="text-[#C5A065]" /></div>
      </div>
    </div>
  );
};

export default InteractiveMap;