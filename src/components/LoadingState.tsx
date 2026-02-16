import React from "react";
import { motion } from "framer-motion";

const LoadingState = () => {
    return (
        <div className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A065]/5 rounded-full blur-[120px]" />

            <div className="relative flex flex-col items-center">
                {/* Cinematic Logo/Letter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                >
                    <div className="w-16 h-16 rounded-full border border-[#C5A065]/30 flex items-center justify-center relative">
                        <span className="text-xl font-serif font-bold text-[#C5A065] tracking-tighter">P</span>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-4px] border-t-2 border-[#C5A065] rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Brand Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-white/40 font-serif text-sm tracking-[0.6em] uppercase font-bold mb-4">
                        Explorasi <span className="text-[#C5A065]">Tanpa Batas</span>
                    </h2>

                    {/* Progress Bar */}
                    <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#C5A065] to-transparent"
                        />
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 text-white/10 text-[9px] uppercase tracking-[0.4em] font-mono"
            >
                Menyusun Keajaiban...
            </motion.div>
        </div>
    );
};

export default LoadingState;
