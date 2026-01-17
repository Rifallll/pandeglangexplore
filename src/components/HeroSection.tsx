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
        style={{ backgroundImage: "url('/hero-background.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-pandeglang-brown-900/60 via-pandeglang-blue-900/30 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-lg md:text-xl text-pandeglang-white-100 mb-2 animate-fade-in-up">
          SELAMAT DATANG DI
        </p>
        <h1 className="text-6xl md:text-8xl font-serif font-extrabold text-pandeglang-white-100 drop-shadow-lg mb-4 animate-fade-in-up">
          Pandeglang
        </h1>
        <p className="text-xl md:text-2xl text-pandeglang-white-100 max-w-3xl leading-relaxed drop-shadow-md mb-8 animate-fade-in-up delay-200">
          Dimana alam berbicara, budaya bernafas, dan kehangatan masyarakat menyambut. Jelajahi pesona tersembunyi di ujung barat Pulau Jawa.
        </p>
        <div className="flex space-x-4 animate-fade-in-up delay-400">
          <Button
            className="bg-pandeglang-white-100 hover:bg-pandeglang-white-200 text-pandeglang-green-700 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={handleScrollDown}
          >
            Mulai Jelajahi
          </Button>
          <Button
            variant="outline"
            className="border-2 border-pandeglang-white-100 text-pandeglang-white-100 hover:bg-pandeglang-white-100/20 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => console.log('Tonton Video clicked')} // Placeholder for video action
          >
            Tonton Video
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-10 w-10 text-pandeglang-white-100" />
      </div>
    </section>
  );
};

export default HeroSection;