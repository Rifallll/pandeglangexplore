"use client";

import { useCallback, useRef } from "react";
import { useAudio } from "@/context/AudioContext";

export const useSoundFX = () => {
    const { isMuted, volume } = useAudio();
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (typeof window === "undefined") return;
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioContextClass) {
                audioCtxRef.current = new AudioContextClass();
            }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }
    }, []);

    const playSound = useCallback((type: "click" | "hover" | "success" | "whoosh") => {
        if (isMuted) return;

        try {
            initAudio();
            const ctx = audioCtxRef.current!;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            switch (type) {
                case "click":
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(800, now);
                    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15); // Longer decay
                    gain.gain.setValueAtTime(volume, now); // Full volume
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                    osc.start(now);
                    osc.stop(now + 0.15);
                    break;
                case "hover":
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(300, now); // Higher pitch for clarity
                    osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
                    gain.gain.setValueAtTime(volume * 0.3, now); // Louder hover
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;
                case "whoosh":
                    osc.type = "sine"; // Smoother whoosh
                    osc.frequency.setValueAtTime(200, now);
                    osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
                    gain.gain.setValueAtTime(volume * 0.4, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                    break;
                case "success":
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
                    gain.gain.setValueAtTime(volume * 0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                    osc.start(now);
                    osc.stop(now + 0.2);
                    break;
            }
        } catch (e) {
            console.warn("Audio Context hindered by browser policy", e);
        }
    }, [isMuted, volume, initAudio]);

    return { playSound };
};
