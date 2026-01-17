"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import DestinationCard from "@/components/DestinationCard";
import StoryCard from "@/components/StoryCard";
import PhotoGallery from "@/components/PhotoGallery";
import InteractiveMap from "@/components/InteractiveMap";
import Footer from "@/components/Footer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const Index = () => {
  const destinationData = [
    {
      imageSrc: "/placeholder.svg",
      title: "Tanjung Lesung",
      description: "Pantai indah dengan pasir putih dan air jernih, cocok untuk relaksasi dan olahraga air.",
      link: "#",
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Gunung Karang",
      description: "Puncak tertinggi di Pandeglang, menawarkan pemandangan spektakuler dan udara segar.",
      link: "#",
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Curug Putri",
      description: "Air terjun alami dengan kolam jernih, tersembunyi di tengah hutan yang asri.",
      link: "#",
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Pulau Peucang",
      description: "Surga tersembunyi di Ujung Kulon, dengan keanekaragaman hayati laut dan darat.",
      link: "#",
    },
  ];

  const storyData = [
    {
      avatarSrc: "/placeholder.svg",
      name: "Bapak Budi",
      story: "Saya bangga menjadi bagian dari Pandeglang. Alamnya yang indah dan masyarakatnya yang ramah selalu membuat saya bersyukur.",
    },
    {
      avatarSrc: "/placeholder.svg",
      name: "Ibu Siti",
      story: "Kuliner Pandeglang tak ada duanya! Dari sate bandeng hingga emping melinjo, semuanya lezat dan otentik.",
    },
    {
      avatarSrc: "/placeholder.svg",
      name: "Adik Rani",
      story: "Belajar di Pandeglang sangat menyenangkan. Banyak tempat bersejarah yang bisa dikunjungi dan menambah wawasan.",
    },
  ];

  const galleryImages = [
    { src: "/placeholder.svg", alt: "Pemandangan Pantai" },
    { src: "/placeholder.svg", alt: "Sawah Hijau" },
    { src: "/placeholder.svg", alt: "Upacara Adat" },
    { src: "/placeholder.svg", alt: "Kuliner Lokal" },
    { src: "/placeholder.svg", alt: "Sunset di Laut" },
    { src: "/placeholder.svg", alt: "Hutan Lindung" },
  ];

  return (
    <div className="min-h-screen text-pandeglang-brown-700 font-sans bg-pandeglang-white-100">
      <Navbar />
      <HeroSection />

      <main>
        {/* Section: Identitas Pandeglang */}
        <FadeInOnScroll>
          <section id="identitas" className="min-h-screen flex flex-col justify-center bg-pandeglang-white-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title="Mengenal Pandeglang"
                subtitle="Sebuah gerbang keindahan alam dan kekayaan budaya di ujung barat Pulau Jawa."
              />
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-lg leading-relaxed text-pandeglang-brown-600">
                  <p className="mb-4">
                    Pandeglang, sebuah kabupaten yang mempesona di Provinsi Banten, Indonesia, adalah permata tersembunyi yang menawarkan perpaduan sempurna antara keindahan alam, warisan budaya yang kaya, dan keramahan masyarakatnya. Dari pesisir pantai yang memukau hingga pegunungan yang menjulang, setiap sudut Pandeglang menyimpan cerita dan pengalaman yang tak terlupakan.
                  </p>
                  <p>
                    Kami mengundang Anda untuk menyelami lebih dalam identitas Pandeglang, merasakan denyut kehidupannya, dan menemukan mengapa tempat ini begitu istimewa.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                  <img src="/placeholder.svg" alt="Identitas Pandeglang" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-pandeglang-green-700/30"></div>
                </div>
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        {/* Section: Kekayaan Alam */}
        <FadeInOnScroll delay={200}>
          <section id="alam" className="min-h-screen flex flex-col justify-center bg-pandeglang-white-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title="Kekayaan Alam yang Memukau"
                subtitle="Dari pantai berpasir putih hingga puncak gunung yang menawan, Pandeglang adalah surga bagi pecinta alam."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {destinationData.map((destination, index) => (
                  <DestinationCard key={index} {...destination} />
                ))}
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        {/* Section: Budaya & Sejarah */}
        <FadeInOnScroll delay={400}>
          <section id="budaya-sejarah" className="min-h-screen flex flex-col justify-center bg-pandeglang-white-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title="Jejak Budaya dan Sejarah"
                subtitle="Menyelami akar tradisi dan kisah masa lalu yang membentuk Pandeglang hari ini."
              />
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-80 rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
                  <img src="/placeholder.svg" alt="Budaya Pandeglang" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-pandeglang-blue-700/30"></div>
                </div>
                <div className="text-lg leading-relaxed text-pandeglang-brown-600 order-1 md:order-2">
                  <p className="mb-4">
                    Pandeglang kaya akan warisan budaya dan sejarah yang tak ternilai. Dari situs-situs purbakala hingga tradisi adat yang masih lestari, setiap elemen menceritakan perjalanan panjang sebuah peradaban. Kesenian tradisional seperti Rampak Bedug, pencak silat, dan berbagai upacara adat masih hidup dan diwariskan dari generasi ke generasi.
                  </p>
                  <p>
                    Jelajahi museum lokal, saksikan pertunjukan seni, dan berinteraksi dengan para sesepuh untuk memahami kedalaman jiwa Pandeglang.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        {/* Section: Kehidupan Masyarakat Lokal */}
        <FadeInOnScroll delay={600}>
          <section id="warga" className="min-h-screen flex flex-col justify-center bg-pandeglang-white-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title="Cerita dari Hati Warga Lokal"
                subtitle="Dengarkan kisah-kisah inspiratif dan pengalaman otentik dari penduduk Pandeglang."
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {storyData.map((story, index) => (
                  <StoryCard key={index} {...story} />
                ))}
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        {/* Section: Galeri Foto Imersif */}
        <FadeInOnScroll delay={800}>
          <section id="galeri" className="min-h-screen flex flex-col justify-center bg-pandeglang-white-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title="Momen Tak Terlupakan"
                subtitle="Sebuah koleksi visual yang menangkap esensi keindahan dan kehidupan di Pandeglang."
              />
              <PhotoGallery images={galleryImages} />
            </div>
          </section>
        </FadeInOnScroll>

        {/* Section: Peta Interaktif */}
        <FadeInOnScroll delay={1000}>
          <section id="peta" className="min-h-screen flex flex-col justify-center bg-pandeglang-white-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title="Temukan Petualangan Anda"
                subtitle="Gunakan peta interaktif kami untuk merencanakan perjalanan Anda di Pandeglang."
              />
              <InteractiveMap />
            </div>
          </section>
        </FadeInOnScroll>
      </main>

      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Index;