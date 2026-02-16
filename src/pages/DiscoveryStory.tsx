"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft,
    Scroll,
    Sparkles,
    Wind,
    Compass,
    Waves,
    Volume2,
    VolumeX,
    Info,
    X
} from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/context/LanguageContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useSoundFX } from "@/hooks/useSoundFX";
import { useAudio } from "@/context/AudioContext";

// Duration for each slide in auto-progress mode
const SLIDE_DURATION = 12000;

const STORIES_DATA = {
    "baduy": {
        title: "Jiwa Baduy",
        location: "Lebak, Banten",
        mapUrl: "https://www.google.com/maps/place/Suku+Baduy/@-6.5546059,106.1954157,11z/",
        ambient: "https://www.soundjay.com/nature/sounds/wind-breeze-01.mp3",
        overlayType: "sunrays",
        slides: [
            {
                id: 1,
                type: "history",
                title: "Titipan Pajajaran",
                content: "Suku Baduy bukanlah pengungsi biasa. Menurut legenda, mereka adalah keturunan murni Kerajaan Pajajaran yang memilih jalan asketik untuk menjaga kemurnian spiritual tatar Sunda.",
                image: "/images/dest_kampung_baduy.png",
                icon: <Scroll className="text-[#C5A065]" />,
                trivia: "Warga Baduy memiliki 'Puun' sebagai pemimpin tertinggi yang sangat dihormati."
            },
            {
                id: 2,
                type: "mystery",
                title: "Sasaka Domas",
                content: "Di hulu sungai Ciujung, terdapat Sasaka Domas tempat paling sakral bagi suku Baduy yang konon merupakan 'pusat alam semesta'. Lokasi pastinya dirahasiakan rapat.",
                image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=1600&q=80",
                icon: <Sparkles className="text-[#C5A065]" />,
                trivia: "Konon, batu di Sasaka Domas berjumlah ribuan namun hanya Puun yang bisa menghitungnya."
            },
            {
                id: 3,
                type: "ritual",
                title: "Puasa Kawalu",
                content: "Selama tiga bulan setiap tahun, Baduy Dalam menerapkan ritual Kawalu. Pada masa ini, wilayah mereka tertutup total bagi wisatawan demi doa keselamatan jagat raya.",
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
                icon: <Wind className="text-[#C5A065]" />,
                trivia: "Kawalu adalah masa 'puasa' dan meditasi terdalam bagi masyarakat Kanekes."
            },
            {
                id: 4,
                type: "map",
                title: "Akar Kehidupan",
                content: "Setelah menyelami sejarah dan ritual mereka, kini saatnya melihat di mana harmoni ini dijaga. Setiap jengkal tanah Kanekes adalah saksi bisu kesederhanaan.",
                image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=1600&q=80",
                icon: <Compass className="text-[#C5A065]" />,
                trivia: "Tidak ada teknologi atau listrik yang diperbolehkan di area Baduy Dalam."
            }
        ]
    },
    "krakatau": {
        title: "Legenda Krakatau",
        location: "Selat Sunda",
        mapUrl: "https://www.google.com/maps/place/Anak+Krakatau/@-6.1020444,105.4215949,15z/",
        ambient: "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3",
        overlayType: "haze",
        slides: [
            {
                id: 1,
                type: "history",
                title: "Dentuman 1883",
                content: "Letusan Gunung Krakatau pada 1883 adalah bencana terdahsyat sejarah modern. Suaranya terdengar hingga Australia, menghancurkan pulau, dan meredupkan matahari global.",
                image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1600&q=80",
                icon: <Scroll className="text-[#C5A065]" />,
                trivia: "Letusan krakatau setara dengan 13.000 kali bom atom Hiroshima."
            },
            {
                id: 2,
                type: "mystery",
                title: "Amuk Samudra",
                content: "Masyarakat lokal percaya Krakatau dijaga entitas gaib. Sebelum letusan, nelayan melaporkan air laut mendidih dan cahaya aneh di puncak gunung yang sunyi.",
                image: "https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?w=1600&q=80",
                icon: <Sparkles className="text-[#C5A065]" />,
                trivia: "Legenda mengatakan ada sebuah keraton gaib tepat di bawah kawah Krakatau."
            },
            {
                id: 3,
                type: "ritual",
                title: "Larung Sesaji",
                content: "Masyarakat pesisir Pandeglang melakukan ritual penghormatan kepada penguasa laut dan gunung melalui Larung Sesaji untuk tetap selaras dengan alam vulkanik.",
                image: "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?w=1600&q=80",
                icon: <Waves className="text-[#C5A065]" />,
                trivia: "Sesaji yang dilarung merupakan simbol syukur atas hasil laut yang melimpah."
            },
            {
                id: 4,
                type: "map",
                title: "Sang Anak Bangkit",
                content: "Kini, Anak Krakatau terus tumbuh dari sisa ledakan masa lalu. Mari saksikan keperkasaan gunung api yang lahir dari laut dan menjadi kebanggaan Banten.",
                image: "/images/dest_anak_krakatau.png",
                icon: <Compass className="text-[#C5A065]" />,
                trivia: "Anak Krakatau tumbuh sekitar 5 meter setiap tahunnya sejak 1927."
            }
        ]
    },
    "tanjung-lesung": {
        title: "Pantai Legenda",
        location: "Panimbang, Pandeglang",
        mapUrl: "https://www.google.com/maps/place/Tanjung+Lesung+Beach/@-6.4719875,105.6565545,15z/",
        ambient: "https://www.soundjay.com/nature/sounds/wind-breeze-02.mp3",
        overlayType: "golden",
        slides: [
            {
                id: 1,
                type: "history",
                title: "Dewi Padi",
                content: "Nama Tanjung Lesung diambil dari bentuk daratannya yang menyerupai 'Lesung'. Legenda mengisahkan cinta antara Raden Kasungka dan Dewi Padi yang menjadi asal-usul kesuburan.",
                image: "/images/dest_tanjung_lesung.png",
                icon: <Scroll className="text-[#C5A065]" />,
                trivia: "Lesung adalah alat tradisional untuk menumbuk padi menjadi beras."
            },
            {
                id: 2,
                type: "mystery",
                title: "Batu Alit",
                content: "Di sudut pantainya, terdapat formasi batuan karang 'Batu Alit' dipercayai memiliki 'pintu gaib'. Beberapa pelancong mengaku merasakan aura tenang yang luar biasa.",
                image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80",
                icon: <Sparkles className="text-[#C5A065]" />,
                trivia: "Banyak warga lokal bermeditasi di sini saat bulan purnama tiba."
            },
            {
                id: 3,
                type: "ritual",
                title: "Seni Debus",
                content: "Tanjung Lesung sering menjadi panggung pementasan Debus seni bela diri spiritual khas Banten yang memamerkan kekebalan tubuh sebagai bukti keteguhan iman.",
                image: "https://images.unsplash.com/photo-1552055660-2b234c9d7848?w=1600&q=80",
                icon: <Wind className="text-[#C5A065]" />,
                trivia: "Debus sudah ada sejak abad ke-16 sebagai sarana syiar agama."
            },
            {
                id: 4,
                type: "map",
                title: "Gerbang Pasifik",
                content: "Pesona matahari terbenam dengan siluet Krakatau di cakrawala menanti Anda. Tanjung Lesung bukan sekadar pantai; ia adalah gerbang petualangan.",
                image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80",
                icon: <Compass className="text-[#C5A065]" />,
                trivia: "Kawasan ini kini menjadi Kawasan Ekonomi Khusus pariwisata."
            }
        ]
    },
    "ujung-kulon": {
        title: "Dunia Hilang",
        location: "Sumur, Pandeglang",
        mapUrl: "https://www.google.com/maps/place/Taman+Nasional+Ujung+Kulon/@-6.7490013,105.334032,12z/",
        ambient: "https://www.soundjay.com/nature/sounds/rainforest-ambience-1.mp3",
        overlayType: "mist",
        slides: [
            {
                id: 1,
                type: "history",
                title: "Ujung Jagat",
                content: "Taman Nasional Ujung Kulon adalah saksi bisu ekosistem purba yang tersisa di Pulau Jawa. Situs Warisan Dunia UNESCO ini menjaga keanekaragaman hayati sejak jutaan tahun lalu.",
                image: "/images/dest_ujung_kulon.png",
                icon: <Scroll className="text-[#C5A065]" />,
                trivia: "Ujung Kulon resmi menjadi Situs Warisan Dunia UNESCO pada tahun 1991."
            },
            {
                id: 2,
                type: "mystery",
                title: "Badak Cula Satu",
                content: "Sebagai mamalia terlangka di dunia, Badak Jawa adalah simbol kemisteriusan rimba ini. Hanya tersisa sedikit individu yang hidup bebas di kedalaman hutan yang tak terjamah.",
                image: "https://images.unsplash.com/photo-1550505187-575ba9595562?w=1600&q=80",
                icon: <Sparkles className="text-[#C5A065]" />,
                trivia: "Badak Jawa kabarnya memiliki pendengaran dan penciuman yang sangat tajam meski penglihatannya kurang."
            },
            {
                id: 3,
                type: "ritual",
                title: "Pulau Peucang",
                content: "Peucang bukan sekadar pulau, ia adalah suaka bagi rusa dan monyet ekor panjang yang hidup berdampingan. Ritual kesunyian alam di sini adalah penyembuh bagi jiwa lelah.",
                image: "/images/dest_pulau_peucang.png",
                icon: <Waves className="text-[#C5A065]" />,
                trivia: "Nama 'Peucang' diambil dari bahasa Sunda yang berarti sejenis kijang."
            },
            {
                id: 4,
                type: "map",
                title: "Tepi Terakhir",
                content: "Menjelajahi Ujung Kulon berarti menghormati batas terakhir alam liar. Setiap langkah di semenanjung ini adalah perjalanan menuju masa lalu bumi yang asri.",
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
                icon: <Compass className="text-[#C5A065]" />,
                trivia: "Semenanjung ini terletak di titik paling barat Pulau Jawa."
            }
        ]
    }
};

// Cinematic Letterbox Component
const Letterbox = () => (
    <>
        <div className="fixed top-0 left-0 right-0 h-[10vh] md:h-[8vh] bg-black z-[10002]" />
        <div className="fixed bottom-0 left-0 right-0 h-[10vh] md:h-[8vh] bg-black z-[10002]" />
    </>
);

// Environmental Overlays
const EnvironmentalOverlay = ({ type }: { type: string }) => {
    switch (type) {
        case 'sunrays':
            return (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,180,0.3)_0%,transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,180,0.2)_0%,transparent_30%)] animate-pulse" />
                </div>
            );
        case 'haze':
            return (
                <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 to-transparent backdrop-blur-[2px] animate-pulse [mask-image:linear-gradient(to_top,black,transparent)]" />
                </div>
            );
        case 'golden':
            return (
                <div className="absolute inset-0 pointer-events-none z-10 bg-orange-900/10 mix-blend-overlay" />
            );
        case 'mist':
            return (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    <motion.div
                        animate={{
                            x: ["-20%", "0%"],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-[-50%] top-1/4 h-1/2 bg-white/5 blur-[80px]"
                    />
                    <motion.div
                        animate={{
                            x: ["0%", "-20%"],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-[-50%] top-1/3 h-1/3 bg-white/10 blur-[60px]"
                    />
                </div>
            );
        default:
            return null;
    }
};

const Particles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0
                    }}
                    animate={{
                        y: ["0%", "100%"],
                        x: ["0%", (Math.random() - 0.5) * 50 + "%"],
                        opacity: [0, 0.4, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
};

const AnimatedText = ({ text, className }: { text: string, className: string }) => {
    const words = text.split(" ");
    return (
        <p className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.08, duration: 0.8 }}
                    className="inline-block mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
};

const DiscoveryStory = () => {
    const { lang } = useLanguage();
    const { id } = useParams();
    const navigate = useNavigate();
    const story = STORIES_DATA[id as keyof typeof STORIES_DATA];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showTrivia, setShowTrivia] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const { playSound } = useSoundFX();
    const { isMuted: globalMuted, setIsMuted: setGlobalMuted } = useAudio();

    // Mouse Parallax Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const bgX = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
    const bgY = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Gyroscope & Mouse Parallax Support
    useEffect(() => {
        const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta !== null && e.gamma !== null) {
                // Normalize tilt (range roughly -30 to 30 degrees)
                const x = (e.gamma / 30);
                const y = ((e.beta - 45) / 30); // Offset 45 for natural holding angle
                mouseX.set(Math.max(-1, Math.min(1, x)));
                mouseY.set(Math.max(-1, Math.min(1, y)));
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            mouseX.set(x * 2); // Double mouse intensity for responsiveness
            mouseY.set(y * 2);
        };

        window.addEventListener("deviceorientation", handleDeviceOrientation);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("deviceorientation", handleDeviceOrientation);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        if (!story) {
            navigate("/404");
            return;
        }

        const audio = new Audio(story.ambient);
        audio.loop = true;
        audio.volume = 0.7;
        audioRef.current = audio;

        const attemptPlay = () => {
            audio.play().catch(() => {
                setAudioError(true);
            });
        };

        attemptPlay();

        const unlockAudio = () => {
            if (audioRef.current) {
                audioRef.current.play()
                    .then(() => setAudioError(false))
                    .catch(() => { });
                window.removeEventListener("click", unlockAudio);
            }
        };
        window.addEventListener("click", unlockAudio);

        return () => {
            audio.pause();
            audioRef.current = null;
            window.removeEventListener("click", unlockAudio);
        };
    }, [story, id, navigate]);

    const toggleAudio = (e: React.MouseEvent) => {
        e.stopPropagation();
        playSound("click");
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.play().catch(() => { });
            setIsMuted(false);
            setGlobalMuted(false);
        } else {
            audioRef.current.pause();
            setIsMuted(true);
            setGlobalMuted(true);
        }
    };

    const nextSlide = useCallback(() => {
        playSound("whoosh");
        setProgress(0);
        setShowTrivia(false);
        if (currentSlide < story.slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            setCurrentSlide(0);
        }
    }, [currentSlide, story, playSound]);

    const prevSlide = useCallback(() => {
        playSound("whoosh");
        setProgress(0);
        setShowTrivia(false);
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        } else {
            navigate(-1);
        }
    }, [currentSlide, playSound, navigate]);

    useEffect(() => {
        if (!isPlaying || showTrivia) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        const interval = 50;
        const stepSize = (interval / SLIDE_DURATION) * 100;

        timerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + stepSize;
            });
        }, interval);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, currentSlide, showTrivia, nextSlide]);



    if (!story) return null;
    const slide = story.slides[currentSlide];

    return (
        <div
            className="fixed inset-0 bg-black text-white overflow-hidden flex flex-col z-[9999] font-sans"
            onMouseDown={() => setIsPlaying(false)}
            onMouseUp={() => setIsPlaying(true)}
            onTouchStart={() => setIsPlaying(false)}
            onTouchEnd={() => setIsPlaying(true)}
        >
            <SEO
                title={`${story.title} | Discovery Story`}
                description={lang === "ID"
                    ? `Jelajahi kisah tentang ${story.title} di ${story.location}. Temukan fragmen sejarah, misteri, dan ritual unik.`
                    : `Explore the story of ${story.title} in ${story.location}. Discover fragments of history, mystery, and unique rituals.`}
            />
            <Letterbox />

            {/* Audio Unlock Floating Hint */}
            {audioError && !isMuted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[10005] bg-[#C5A065] text-black px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3"
                    onClick={() => {
                        if (audioRef.current) audioRef.current.play();
                        setAudioError(false);
                    }}
                >
                    <Volume2 size={16} className="animate-pulse" />
                    Ketuk Layar Untuk Mengaktifkan Suara
                </motion.div>
            )}

            {/* Header / Navigation Overlay */}
            <header className="fixed top-0 left-0 right-0 h-auto px-4 md:px-12 z-[20000] flex items-center justify-between pointer-events-none py-6 safe-top">
                <div className="flex-1 hidden md:block" /> {/* Spacer */}

                {/* Progress Indicators - Top center on mobile, wider on desktop */}
                <div className="flex-[2] md:flex-1 max-w-sm flex gap-1 md:gap-2 pointer-events-auto items-center">
                    {story.slides.map((_, idx) => (
                        <div key={idx} className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#C5A065]"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: idx < currentSlide ? "100%" : idx === currentSlide ? `${progress}%` : "0%"
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-1 flex items-center justify-end gap-4 md:gap-8 pointer-events-auto">
                    <button
                        onClick={toggleAudio}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                        className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all ${isMuted ? 'text-white/20 border-white/5' : 'text-[#C5A065] border-[#C5A065]/30 bg-[#C5A065]/5'}`}
                    >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className={audioError ? 'animate-pulse' : ''} />}
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        aria-label="Close Story"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#C5A065] hover:bg-[#C5A065]/10 bg-white/5 transition-all group"
                    >
                        <X size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="relative flex-1 flex flex-col"
                >
                    {/* Background Layers */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            style={{ x: bgX, y: bgY, scale: 1.1 }}
                            className="absolute inset-x-[-5%] inset-y-[-5%] w-[110%] h-[110%]"
                        >
                            <OptimizedImage
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover brightness-[0.35]"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
                        <EnvironmentalOverlay type={story.overlayType} />
                        <Particles />
                    </div>

                    {/* Narrative Zone */}
                    <div className="relative z-20 flex-1 container mx-auto px-6 md:px-12 flex flex-col justify-center max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-8 md:space-y-12"
                        >
                            {/* Label */}
                            <div className="flex items-center gap-6">
                                <span className="h-px w-12 bg-[#C5A065]/50" />
                                <span className="text-[#C5A065] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.8em]">
                                    {slide.type === "history" ? "Fragmen Sejarah" :
                                        slide.type === "mystery" ? "Misteri & Legenda" :
                                            slide.type === "ritual" ? "Ritual & Budaya" : "Eksplorasi"}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.1] md:leading-tight tracking-tight">
                                {slide.title}
                            </h2>

                            {/* Body */}
                            <AnimatedText
                                text={slide.content}
                                className="text-base md:text-2xl lg:text-3xl text-white/60 font-light leading-relaxed max-w-4xl font-serif italic"
                            />

                            {/* Trivia Trigger */}
                            {slide.trivia && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                    className="pt-4"
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowTrivia(!showTrivia); }}
                                        className="flex items-center gap-3 text-[9px] text-[#C5A065] hover:text-white uppercase tracking-[0.4em] font-bold transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-full border border-[#C5A065]/20 flex items-center justify-center group-hover:border-[#C5A065] transition-all">
                                            <Info size={14} />
                                        </div>
                                        Fakta Tersembunyi
                                    </button>
                                </motion.div>
                            )}

                            {/* Trivia Content */}
                            <AnimatePresence>
                                {showTrivia && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="fixed bottom-0 md:absolute md:bottom-24 left-0 md:left-auto right-0 md:right-12 max-w-none md:max-w-sm bg-black/95 md:bg-white/5 backdrop-blur-3xl border-t md:border border-white/10 p-8 md:rounded-[32px] z-50 shadow-2xl safe-bottom"
                                    >
                                        <p className="text-[10px] text-[#C5A065] font-black uppercase tracking-[0.4em] mb-4">Wawasan Tambahan</p>
                                        <p className="text-sm md:text-base text-white/70 font-serif leading-relaxed italic">"{slide.trivia}"</p>
                                        <button
                                            onClick={() => setShowTrivia(false)}
                                            aria-label="Close Trivia"
                                            className="absolute top-4 right-4 text-white/20 hover:text-white p-2"
                                        >
                                            <ChevronRight size={16} className="rotate-90" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CTA */}
                            <div className="pt-8">
                                {slide.type === "map" ? (
                                    <a
                                        href={story.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-8 group"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-[#C5A065]/50 flex items-center justify-center text-[#C5A065] group-hover:bg-[#C5A065] group-hover:text-black transition-all duration-700 shadow-[0_0_50px_rgba(197,160,101,0.2)]"
                                        >
                                            <Compass size={24} className="md:w-8 md:h-8" />
                                        </motion.div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white">Buka di Google Maps</span>
                                            <span className="text-[8px] md:text-[10px] text-white/20 tracking-[0.2em] md:tracking-[0.3em] font-medium mt-1 uppercase">Navigasi Langsung Via Satelit</span>
                                        </div>
                                    </a>
                                ) : (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-[#C5A065] group-hover:text-[#C5A065] transition-all duration-700">
                                            <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/70 group-hover:text-[#C5A065] transition-colors">Lanjutkan</span>
                                            <span className="text-[8px] md:text-[10px] text-white/20 tracking-[0.2em] md:tracking-[0.3em] font-medium mt-1 uppercase">Fragmen Berikutnya</span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Manual Navigation Areas */}
            <div className="absolute inset-y-0 left-0 w-[15%] z-30 cursor-w-resize" onClick={(e) => { e.stopPropagation(); prevSlide(); }} />
            <div className="absolute inset-y-0 right-0 w-[15%] z-30 cursor-e-resize" onClick={(e) => { e.stopPropagation(); nextSlide(); }} />

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 h-auto px-6 md:px-12 z-[20000] flex items-center justify-between pointer-events-none py-8 safe-bottom">
                <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/5 uppercase tracking-[0.6em] mb-1 uppercase">Destinasi</span>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#C5A065] uppercase">{story.title}</span>
                    </div>
                </div>

                <div className="pointer-events-auto flex items-center gap-10">
                    <div className="hidden lg:block text-right">
                        <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em] mb-2 block">Interaksi</span>
                        <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">Tahan Klik Untuk Jeda</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            aria-label="Previous Slide"
                            className="p-3 md:p-5 border border-white/5 rounded-full hover:bg-white/5 transition-all text-white/20 hover:text-white"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            aria-label="Next Slide"
                            className="p-3 md:p-5 border border-white/5 rounded-full hover:bg-white/5 transition-all text-white/20 hover:text-white"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DiscoveryStory;
