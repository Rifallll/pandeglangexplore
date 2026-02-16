import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[200000] bg-black flex flex-col items-center justify-center p-8">
            {/* Background Cinematic Texture */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] aspect-square rounded-full bg-gradient-to-br from-[#C5A065]/20 to-transparent blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] aspect-square rounded-full bg-gradient-to-tr from-[#C5A065]/10 to-transparent blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
                {/* Diamond Ornament */}
                <motion.div
                    initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 45, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-12 h-12 border border-[#C5A065]/30 mb-12 flex items-center justify-center"
                >
                    <div className="w-4 h-4 bg-[#C5A065]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-white text-3xl md:text-4xl font-serif font-black tracking-[0.4em] uppercase mb-4">
                        Pandeglang
                    </h1>
                    <p className="text-[#C5A065] text-[10px] font-black tracking-[0.6em] uppercase opacity-60">
                        Heritage & Nature
                    </p>
                </motion.div>

                {/* Global Luxury Progress Bar */}
                <div className="w-full h-[1px] bg-white/5 rounded-full relative overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-[#C5A065]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>

                <div className="mt-4 flex justify-between w-full">
                    <span className="text-white/20 text-[8px] font-mono uppercase tracking-widest">Initialising Core</span>
                    <span className="text-[#C5A065] text-[8px] font-mono font-bold tracking-widest">{progress}%</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 text-white text-[8px] uppercase tracking-[0.5em] font-light italic"
            >
                Edisi Eksklusif 2026
            </motion.div>
        </div>
    );
};

export default SplashScreen;
