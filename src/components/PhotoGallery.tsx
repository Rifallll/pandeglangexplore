"use client";

import React from "react";

interface PhotoGalleryProps {
  images: { src: string; alt: string }[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg shadow-md group cursor-pointer relative"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-pandeglang-white-100 text-lg font-semibold text-center px-4">
              {image.alt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;