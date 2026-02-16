"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SoundscapeControlProps {
    trackUrl?: string; // URL of the track to play
    initialAutoPlay?: boolean;
}

const SoundscapeControl = ({ trackUrl, initialAutoPlay = false }: SoundscapeControlProps) => {
    const [isPlaying, setIsPlaying] = useState(initialAutoPlay);
    const [isMuted, setIsMuted] = useState(!initialAutoPlay); // Start muted if autoplaying to respect browser policy
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Handle Track Changes
    useEffect(() => {
        if (audioRef.current && trackUrl) {
            // If track changes, fade out old, swap, fade in
            // Simplified: Just swap for now to ensure reliability
            const wasPlaying = !audioRef.current.paused;

            audioRef.current.src = trackUrl;

            if (isPlaying) {
                audioRef.current.play().catch(() => { }); // Browser autoplay policy
            }
        }
    }, [trackUrl, isPlaying]);

    // Handle Play/Pause State
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => {
                audioRef.current.play().catch(() => { }); // Browser autoplay policy
                setIsPlaying(false); // Revert state if failed
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    if (!trackUrl) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 pointer-events-auto">

            {/* Visualizer Bars (Only visible when playing) */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-end gap-[2px] h-8 mb-2 px-2"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [8, 24, 12, 32, 16][i] || 16,
                                }}
                                transition={{
                                    duration: 0.4 + Math.random() * 0.4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.1
                                }}
                                className="w-1.5 bg-[#C5A065] rounded-full shadow-[0_0_10px_rgba(197,160,101,0.5)]"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Control Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className={`
          flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-500 shadow-2xl group
          ${isPlaying
                        ? "bg-[#C5A065]/20 border-[#C5A065] text-[#C5A065] shadow-[0_0_30px_rgba(197,160,101,0.2)]"
                        : "bg-black/60 border-white/10 text-white/50 hover:text-white hover:border-white/30"
                    }
        `}
            >
                <div className="flex flex-col items-end mr-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        {isPlaying ? "Immersive Mode" : "Soundscape"}
                    </span>
                    {isPlaying && (
                        <span className="text-[8px] opacity-60 font-mono tracking-widest uppercase">
                            On Air
                        </span>
                    )}
                </div>

                <div className="relative w-8 h-8 flex items-center justify-center rounded-full border border-current">
                    {isPlaying ? <Volume2 size={14} /> : <Play size={14} className="ml-0.5" />}
                </div>
            </motion.button>
        </div>
    );
};

export default SoundscapeControl;
