
import React, { useRef, useEffect } from "react";

const SoundscapeWidget = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const OCEAN_URL = "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3";

    useEffect(() => {
        // Initialize Audio
        audioRef.current = new Audio(OCEAN_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Attempt Autoplay
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(() => { }); // Browser autoplay policy
            }
        };

        playAudio();

        // Fallback: Trigger play on any user interaction if autoplay failed
        const handleInteraction = () => {
            playAudio();
            // Remove listeners once playing
            if (audioRef.current && !audioRef.current.paused) {
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('keydown', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
            }
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    // Invisible component
    return null;
};

export default SoundscapeWidget;

