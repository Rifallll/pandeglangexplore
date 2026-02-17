import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { EventItem } from "@/data/events";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getAssetPath } from "@/lib/utils";

interface EventCard3DProps {
    item: EventItem;
    index: number;
    lang: "ID" | "EN";
}

const EventCard3D: React.FC<EventCard3DProps> = ({ item, index, lang }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row gap-8 md:gap-20 items-center justify-center py-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
            {/* 3D Card Image Section */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full md:w-1/2 aspect-[4/3] rounded-3xl cursor-pointer group perspective-1000"
            >
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#C5A065]/20 [transform:translateZ(75px)] [transform-style:preserve-3d]"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                    <OptimizedImage
                        src={getAssetPath(item.image || "")}
                        alt={item.title}
                        category={item.category}
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-all duration-1000"
                    />

                    {/* Floating Info Icon */}
                    <div className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <Info size={24} />
                    </div>
                </div>

                {/* Floating Date Badge */}
                <div
                    className={`absolute top-1/2 ${index % 2 === 0 ? "-right-12" : "-left-12"} z-30 hidden md:flex flex-col items-center justify-center w-24 h-24 bg-[#0a0a0a] border border-[#C5A065] rounded-full shadow-[0_0_30px_rgba(197,160,101,0.2)] [transform:translateZ(100px)_translateY(-50%)]`}
                >
                    <span className="text-[#C5A065] font-black text-2xl font-serif">{item.day}</span>
                    <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">{item.month.substring(0, 3)}</span>
                </div>
            </motion.div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 text-left">
                <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"}`}>
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#C5A065] mb-4 flex items-center gap-2">
                        <span className="w-10 h-[1px] bg-[#C5A065]"></span>
                        {item.type === "Event" ? (lang === "ID" ? item.category : "Event") : (lang === "ID" ? "Hari Libur" : "Holiday")}
                    </span>

                    <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1.1] font-medium">
                        {item.title}
                    </h3>

                    <p className={`text-white/60 text-lg font-light leading-relaxed mb-8 max-w-md ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                        {item.description}
                    </p>

                    <Link
                        to={`/kalender/${item.id}`}
                        className={`group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-[#C5A065] transition-colors py-3 border-b border-white/20 hover:border-[#C5A065]`}
                    >
                        {lang === "ID" ? "Jelajahi" : "Explore"}
                        <span className="bg-white/10 p-1 rounded-full group-hover:bg-[#C5A065] group-hover:text-black transition-all">
                            <ChevronRight size={14} />
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard3D;
