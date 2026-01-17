"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
  category: string;
  size?: "large" | "small";
  className?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  imageSrc,
  title,
  description,
  link,
  category,
  size = "small",
  className,
}) => {
  if (size === "large") {
    return (
      <div
        className={cn(
          "relative rounded-xl overflow-hidden shadow-lg h-[500px] group cursor-pointer",
          className
        )}
      >
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-pandeglang-white-100">
          <span className="bg-pandeglang-green-500 text-pandeglang-white-100 text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">
            {category}
          </span>
          <h3 className="text-4xl font-bold mb-2 drop-shadow-md">{title}</h3>
          <p className="text-lg mb-4 drop-shadow-sm">{description}</p>
          <Button asChild className="bg-pandeglang-green-500 hover:bg-pandeglang-green-600 text-pandeglang-white-100 text-base px-6 py-3 rounded-full shadow-md">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
              Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden shadow-lg bg-pandeglang-white-100 border border-pandeglang-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer",
        className
      )}
    >
      <div className="relative h-48">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
        <span className="absolute top-4 left-4 bg-pandeglang-green-500 text-pandeglang-white-100 text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="px-4 py-2"> {/* Mengurangi padding vertikal */}
        <h4 className="text-xl font-semibold text-pandeglang-green-700 mb-1">{title}</h4> {/* Mengurangi margin-bottom */}
        <p className="text-pandeglang-brown-500 text-sm">{description}</p> {/* Menghapus margin-bottom */}
      </div>
    </div>
  );
};

export default DestinationCard;