"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getAssetPath } from "@/lib/utils";
import { FALLBACK_MAP } from "@/lib/constants";

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    objectFit?: "cover" | "contain" | "fill";
    fallbackSrc?: string;
    category?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className,
    priority = false,
    objectFit = "cover",
    fallbackSrc,
    category = "default"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        setImageSrc(src);
        setError(false);
        setIsLoaded(false);
    }, [src]);

    const handleError = () => {
        if (!error) {
            setError(true);
            // 1. Try provided fallbackSrc first
            // 2. Try Smart Category Fallback (KW Images)
            // 3. Last resort: default placeholder

            const smartFallback = FALLBACK_MAP[category] || FALLBACK_MAP["default"];

            // Check if user provided a specific fallback, otherwise use smart fallback
            const finalFallback = fallbackSrc ? getAssetPath(fallbackSrc) : smartFallback;

            setImageSrc(finalFallback);
            setIsLoaded(true);
        }
    };

    return (
        <div className={cn("relative overflow-hidden bg-muted", className)}>
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-muted animate-pulse"
                    />
                )}
            </AnimatePresence>

            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={imageSrc}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                onLoad={() => setIsLoaded(true)}
                onError={handleError}
                className={cn(
                    "w-full h-full transition-all duration-700",
                    objectFit === "cover" ? "object-cover" :
                        objectFit === "contain" ? "object-contain" : "object-fill",
                    // When error/fallback is active, maybe apply a subtle separation? 
                    // But user wants "KW" images to look real, so keep them vibrant.
                )}
            />
            {error && (
                <div className="absolute top-2 right-2 bg-black/50 text-[10px] text-white px-2 py-1 rounded-full backdrop-blur-sm">
                    Image Substitute
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;
