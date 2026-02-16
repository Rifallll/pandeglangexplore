"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
    const [cursorType, setCursorType] = useState("default");
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Faster spring config for more responsive feel
    const springConfig = { damping: 25, stiffness: 700, mass: 0.3 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            // Set values immediately
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], .cursor-pointer")) {
                setCursorType("pointer");
            } else if (target.closest("img, [data-cursor='expand']")) {
                setCursorType("expand");
            } else {
                setCursorType("default");
            }
        };

        window.addEventListener("mousemove", moveMouse, { passive: true });
        window.addEventListener("mouseover", handleHover, { passive: true });

        // Hide default cursor globally
        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mouseover", handleHover);
            document.body.style.cursor = "auto";
        };
    }, [mouseX, mouseY]);

    const variants = {
        default: {
            height: 12,
            width: 12,
            backgroundColor: "#C5A065",
            mixBlendMode: "normal" as const,
        },
        pointer: {
            height: 40,
            width: 40,
            backgroundColor: "white",
            mixBlendMode: "difference" as const,
            border: "1px solid #C5A065",
        },
        expand: {
            height: 80,
            width: 80,
            backgroundColor: "transparent",
            border: "1px solid white",
            mixBlendMode: "difference" as const,
        }
    };

    return (
        <motion.div
            style={{
                translateX: cursorX,
                translateY: cursorY,
                x: "-50%",
                y: "-50%",
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999
            }}
            variants={variants}
            animate={cursorType}
            className="hidden md:block rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            {cursorType === "expand" && (
                <div className="flex items-center justify-center w-full h-full text-[10px] font-bold text-white uppercase tracking-widest">
                    Lihat
                </div>
            )}
        </motion.div>
    );
};

export default CustomCursor;
