"use client";

import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pandeglang-brown-900 text-pandeglang-white-100 py-12 mt-16">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4 text-pandeglang-green-500">Pandeglang</h3>
        <p className="text-pandeglang-white-200 max-w-2xl mx-auto mb-8">
          Jelajahi keindahan, kekayaan budaya, dan keramahan masyarakat Pandeglang. Sebuah pengalaman yang tak terlupakan menanti Anda.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-pandeglang-white-100 hover:text-pandeglang-green-500 transition-colors">
            <Facebook size={28} />
          </a>
          <a href="#" className="text-pandeglang-white-100 hover:text-pandeglang-green-500 transition-colors">
            <Instagram size={28} />
          </a>
          <a href="#" className="text-pandeglang-white-100 hover:text-pandeglang-green-500 transition-colors">
            <Twitter size={28} />
          </a>
        </div>
        <div className="border-t border-pandeglang-brown-700 pt-8 text-pandeglang-white-300">
          <p>&copy; {new Date().getFullYear()} Pandeglang. All rights reserved.</p>
          <p className="text-sm mt-2">Dibuat dengan cinta untuk memperkenalkan Pandeglang.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;