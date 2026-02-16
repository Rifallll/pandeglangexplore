"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn("text-center mb-12 px-4", className)}>
      <h2 className="text-3xl md:text-5xl font-serif text-black mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-black/60 font-light max-w-3xl mx-auto font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;