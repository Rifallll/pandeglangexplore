"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getAssetPath } from "@/lib/utils";

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    objectFit?: "cover" | "contain" | "fill";
    fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className,
    priority = false,
    objectFit = "cover",
    fallbackSrc = "/placeholder.svg"
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
            setImageSrc(getAssetPath(fallbackSrc));
            // Force load set to true so the fallback displays
            setIsLoaded(true);
        }
    };

    return (
        <div className={cn("relative overflow-hidden bg-gray-200", className)}>
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gray-200 animate-pulse"
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
                    error ? "opacity-50 grayscale p-8" : ""
                )}
            />
        </div>
    );
};

export default OptimizedImage;
