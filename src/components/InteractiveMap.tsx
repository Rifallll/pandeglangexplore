"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const InteractiveMap = () => {
  return (
    <div className="relative w-full h-96 bg-pandeglang-brown-100 rounded-lg overflow-hidden shadow-xl flex items-center justify-center">
      <img
        src="/placeholder.svg" // Placeholder image for the map
        alt="Peta Interaktif Pandeglang"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="relative z-10 text-center bg-pandeglang-white-100/80 p-8 rounded-lg shadow-lg">
        <MapPin className="h-16 w-16 text-pandeglang-blue-700 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-pandeglang-brown-700 mb-2">Peta Interaktif Pandeglang</h3>
        <p className="text-lg text-pandeglang-brown-500 mb-6">
          Temukan lokasi wisata, kuliner, dan budaya favorit Anda.
        </p>
        <Button className="bg-pandeglang-green-500 hover:bg-pandeglang-green-600 text-pandeglang-white-100 text-lg px-6 py-3 rounded-full shadow-md">
          Lihat Peta
        </Button>
      </div>
    </div>
  );
};

export default InteractiveMap;