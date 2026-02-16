import React from "react";
import Navbar from "@/components/Navbar";
import InteractiveMap from "@/components/InteractiveMap";

const MapPage = () => {
    return (
        <div className="h-[100dvh] w-full font-sans bg-[#050505] text-white overflow-hidden selection:bg-[#C5A065] selection:text-white flex flex-col">
            <Navbar />
            <main className="flex-1 relative overflow-hidden h-full">
                <InteractiveMap />
            </main>
        </div>
    );
};

export default MapPage;
