"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    objectFit?: "cover" | "contain" | "fill";
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className,
    priority = false,
    objectFit = "cover"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setError(true);
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden bg-white/5", className)}>
            {/* Low Quality / Placeholder Blur */}
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-3xl"
                    />
                )}
            </AnimatePresence>

            {/* Main Image */}
            <motion.img
                initial={{ opacity: 0, scale: priority ? 1 : 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : (priority ? 1 : 1.05)
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                className={cn(
                    "w-full h-full transition-all duration-1000",
                    objectFit === "cover" ? "object-cover" :
                        objectFit === "contain" ? "object-contain" : "object-fill",
                    !isLoaded && "blur-md scale-110"
                )}
            />

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">Visual Not Found</span>
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;
