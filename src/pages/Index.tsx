

import React from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import BrandStory from "@/components/BrandStory";
import { useLanguage } from "@/context/LanguageContext";
import ExperienceGrid from "@/components/ExperienceGrid";
import TravelQuiz from "@/components/TravelQuiz";
import ItinerarySection from "@/components/ItinerarySection";
import EventCalendar from "@/components/EventCalendar";
import GallerySpotlight from "@/components/GallerySpotlight";
import CulinarySpotlight from "@/components/CulinarySpotlight";
import HiddenGems from "@/components/HiddenGems";
import FAQSection from "@/components/FAQSection";
import TravelTips from "@/components/TravelTips";
import ConservationSection from "@/components/ConservationSection";
import QuickFacts from "@/components/QuickFacts";
import SectionTitle from "@/components/SectionTitle";
import DestinationCard from "@/components/DestinationCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "@/components/MagneticButton";

import { getGoogleMapsLink } from "@/lib/utils";

import { allDestinations } from "@/data/destinations";
import { useDestinations } from "@/hooks/useDestinations";
import { getImageUrl } from "@/services/pocketbase";





const Index = () => {
  const { t, lang } = useLanguage();
  const { destinations: pbDestinations, loading: pbLoading } = useDestinations();

  const getDestLink = (title: string) => {
    const dest = allDestinations.find(d => d.title === title);
    if (dest && dest.coords) return getGoogleMapsLink(dest.coords as [number, number]);
    return "#";
  };

  const destinationData = [
    {
      imageSrc: "/images/dest_tanjung_lesung.png",
      title: "Tanjung Lesung",
      description: lang === "ID" ? "Pantai eksotis dengan pasir putih dan air biru jernih. Surga bagi pecinta snorkeling dan watersport." : "Exotic beach with white sand and crystal blue water. A paradise for snorkeling and watersport lovers.",
      link: getDestLink("Tanjung Lesung"),
      category: lang === "ID" ? "Pantai & Resort" : "Beach & Resort",
      size: "large" as const,
      coords: [-6.4837, 105.6565] as [number, number],
      location: "Panimbang",
      audioMood: "ocean"
    },
    {
      imageSrc: "/images/dest_anak_krakatau.png",
      title: "Gunung Krakatau",
      description: lang === "ID" ? "Saksikan keagungan Anak Krakatau dari dekat. Pengalaman mendaki gunung berapi aktif." : "Witness the majesty of Anak Krakatau up close. Experience hiking an active volcano.",
      link: getDestLink("Anak Krakatau"),
      category: lang === "ID" ? "Petualangan" : "Adventure",
      size: "small" as const,
      coords: [-6.1021, 105.423] as [number, number],
      location: "Selat Sunda",
      audioMood: "ocean"
    },
    {
      imageSrc: "/images/dest_ujung_kulon.png",
      title: "Ujung Kulon",
      description: lang === "ID" ? "Habitat Badak Jawa yang langka. Jelajahi hutan hujan tropis yang masih perawan." : "Home of the rare Javan Rhino. Explore pristine tropical rainforests.",
      link: getDestLink("Hutan Ujung Kulon"),
      category: lang === "ID" ? "Alam Liar" : "Wild Nature",
      size: "large" as const,
      coords: [-6.75, 105.3] as [number, number],
      location: "Sumur",
      audioMood: "forest"
    },
    {
      imageSrc: "/images/dest_kampung_baduy.png",
      title: "Kampung Baduy",
      description: lang === "ID" ? "Menyelami kehidupan Suku Baduy yang menjaga tradisi leluhur dengan teguh." : "Immerse yourself in the life of the Baduy Tribe, steadfastly guarding ancestral traditions.",
      link: getDestLink("Wisata Baduy Luar"),
      category: lang === "ID" ? "Budaya" : "Culture",
      size: "small" as const,
      coords: [-6.65, 106.22] as [number, number],
      location: "Kanekes",
      audioMood: "wind"
    },
    {
      imageSrc: "/images/dest_pulau_peucang.png",
      title: "Pulau Peucang",
      description: lang === "ID" ? "Surga tersembunyi dengan keanekaragaman hayati laut dan darat yang memukau." : "A hidden paradise with stunning marine and terrestrial biodiversity.",
      link: getDestLink("Pulau Peucang"),
      category: lang === "ID" ? "Pulau Eksotis" : "Exotic Island",
      size: "small" as const,
      coords: [-6.7411, 105.2592] as [number, number],
      location: "Ujung Kulon",
      audioMood: "forest"
    },
    {
      imageSrc: "/images/dest_curug_putri.png",
      title: "Curug Putri",
      description: lang === "ID" ? "The Little Green Canyon of Banten. Air terjun dengan tebing bebatuan yang indah." : "The Little Green Canyon of Banten. A stunning waterfall with rocky cliffs.",
      link: getDestLink("Curug Putri Tahura"),
      category: lang === "ID" ? "Air Terjun" : "Waterfall",
      size: "small" as const,
      coords: [-6.3117, 105.8642] as [number, number],
      location: "Carita",
      audioMood: "wind"
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-background text-foreground overflow-x-hidden selection:bg-[#C5A065] selection:text-white">

      <SEO
        title="Pandeglang Explore | The Gateway to Adventure"
        description="Jelajahi keajaiban Pandeglang: Dari Ujung Kulon hingga Tanjung Lesung. Situs resmi panduan wisata, kuliner, dan budaya Pandeglang."
      />
      <Navbar />
      <HeroSection />

      <main>
        {/* Quick Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <QuickFacts />
        </motion.div>

        {/* Brand Story Section */}
        <BrandStory />

        {/* Experience Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ExperienceGrid />
        </motion.div>

        {/* Travel Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <TravelQuiz />
        </motion.div>

        <HiddenGems />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <GallerySpotlight />
        </motion.div>

        <ItinerarySection />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <EventCalendar />
        </motion.div>

        <CulinarySpotlight />

        {/* Section: Destinasi Pilihan */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="alam"
          className="py-32 bg-gray-50/30"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-[#C5A065] text-sm font-bold tracking-[0.3em] uppercase block mb-4">{t("dest.top_label")}</span>
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-black leading-tight mb-4">{t("dest.title")}</h2>
                <p className="text-gray-500 font-light text-lg">{t("dest.subtitle")}</p>
              </div>
              <Link to="/peta" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C5A065] hover:text-black transition-all pb-2 md:pb-6 border-b-2 border-transparent hover:border-[#C5A065]">
                {t("dest.view_map")}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {destinationData.map((destination, index) => (
                <div
                  key={destination.title}
                  className="w-full h-full"
                >
                  <DestinationCard
                    {...destination}
                    index={index}
                    className="w-full shadow-2xl hover:shadow-placeholder transition-all duration-700 rounded-[2rem] overflow-hidden bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <FAQSection />
        <TravelTips />
        <ConservationSection />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <TestimonialsSection />
        </motion.div>

        {/* Section: Call to Action */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="py-32 bg-[#050505] text-white text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A065]/50 to-transparent"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A065]/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C5A065]/10 rounded-full blur-[120px]"></div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="text-[#C5A065] text-[10px] font-bold tracking-[0.4em] uppercase">{t("cta.badge")}</span>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-10 tracking-tighter max-w-5xl leading-[0.9]">
              {t("cta.title").split("Pandeglang")[0]} <span className="italic text-[#C5A065]">Pandeglang</span>
            </h2>

            <p className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-light text-white/50 leading-relaxed italic text-center">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton strength={50}>
                <Link to="/peta" className="bg-[#C5A065] text-white text-xs font-bold tracking-[0.3em] uppercase px-14 py-6 rounded-full hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-3 group shadow-[0_20px_50px_rgba(197,160,101,0.3)]">
                  {t("cta.main")}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={30}>
                <Link to="/peta" className="bg-transparent border border-white/20 text-white text-xs font-bold tracking-[0.3em] uppercase px-14 py-6 rounded-full hover:bg-white/10 transition-all duration-700 flex items-center justify-center backdrop-blur-sm">
                  {t("cta.secondary")}
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;