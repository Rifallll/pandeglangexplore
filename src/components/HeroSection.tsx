"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg')" }} // Placeholder image
      >
        <div className="absolute inset-0 bg-gradient-to-t from-pandeglang-brown-900/60 via-pandeglang-blue-900/30 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-pandeglang-white-100 drop-shadow-lg mb-4 animate-fade-in-up">
          Pesona Pandeglang
        </h1>
        <p className="text-xl md:text-2xl text-pandeglang-white-100 max-w-3xl leading-relaxed drop-shadow-md mb-8 animate-fade-in-up delay-200">
          Gerbang ke keindahan alam Banten, tempat di mana laut bertemu gunung, dan budaya berpadu dengan keramahan.
        </p>
        <Button
          className="bg-pandeglang-green-500 hover:bg-pandeglang-green-600 text-pandeglang-white-100 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400"
          onClick={handleScrollDown}
        >
          Jelajahi Pandeglang
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-10 w-10 text-pandeglang-white-100" />
      </div>
    </section>
  );
};

export default HeroSection;