"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AudioContextType {
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("audio_muted") === "true";
        }
        return false; // Default to UNMUTED so user hears it immediately
    });
    const [volume, setVolume] = useState(0.8); // Boost default volume

    useEffect(() => {
        localStorage.setItem("audio_muted", String(isMuted));
    }, [isMuted]);

    return (
        <AudioContext.Provider value={{ isMuted, setIsMuted, volume, setVolume }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
