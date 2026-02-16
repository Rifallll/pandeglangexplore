import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simplified global translation dictionary
const translations: Record<Language, Record<string, string>> = {
    ID: {
        // Navbar
        "nav.home": "Beranda",
        "nav.culinary": "Kuliner",
        "nav.map": "Peta",
        "nav.calendar": "Kalender",
        "nav.gallery": "Album",
        "nav.about": "Tentang",
        "nav.home_desc": "Kembali ke awal",
        "nav.culinary_desc": "Jelajah rasa lokal",
        "nav.map_desc": "Navigasi interaktif",
        "nav.calendar_desc": "Acara & festival",
        "nav.gallery_desc": "Galeri visual",
        "nav.about_desc": "Mengenal lebih dekat",

        // Hero
        "hero.top_label": "Pintu Gerbang Petualangan",
        "hero.title": "PANDEGLANG",
        "hero.subtitle": '"Tempat di mana birunya samudra bertemu dengan hijaunya pegunungan. Keajaiban abadi menanti langkah Anda."',
        "hero.cta": "Mulai Eksplorasi",

        // Brand Story
        "brand.floating_quote": '"Warisan leluhur yang tak lekang oleh waktu, menjaga harmoni antara manusia dan alam semesta."',
        "brand.top_label": "Jiwa Pandeglang",
        "brand.title_main": "Menemukan Jiwa di",
        "brand.title_accent": "Ujung Barat",
        "brand.title_suffix": "Jawa",
        "brand.desc": "Pandeglang bukan sekadar destinasi; ia adalah simfoni alam dan budaya yang harmonis. Dari keheningan hutan hujan Ujung Kulon hingga kearifan lokal Suku Baduy yang teguh menjaga tradisi, setiap sudut menawarkan cerita tentang ketenangan dan keaslian.",
        "brand.stat.iconic": "Destinasi Ikonik Terkurasi",
        "brand.stat.unesco": "Situs Warisan Dunia Terdaftar",

        // Destinations Section
        "dest.top_label": "Eksplorasi Tak Terbatas",
        "dest.title": "Destinasi Pilihan Terbaik",
        "dest.subtitle": "Kurasi keindahan alam untuk jiwa yang mencari ketenangan dan inspirasi di setiap langkah perjalanan.",
        "dest.view_map": "Jelajahi Peta",

        // Experience Grid
        "exp.nature": "Alam & Konservasi",
        "exp.culture": "Budaya & Tradisi",
        "exp.culinary": "Kuliner Nusantara",
        "exp.adventure": "Petualangan Liar",

        "exp.vibe": "Pilih Vibe Anda",
        "exp.title": "Tentukan Petualangan Anda",

        "exp.item1.cat": "Petualangan Ekstrem",
        "exp.item1.title": "Taklukkan Anak Krakatau",
        "exp.item1.desc": "Rasakan adrenalin mendaki salah satu gunung berapi paling ikonik di dunia.",

        "exp.item2.cat": "Ketenangan Mewah",
        "exp.item2.title": "Resort Eksklusif Tanjung Lesung",
        "exp.item2.desc": "Manjakan diri Anda dengan kenyamanan kelas dunia di tepi pantai yang memukau.",

        "exp.item3.cat": "Kearifan Lokal",
        "exp.item3.title": "Misteri Suku Baduy",
        "exp.item3.desc": "Kembali ke harmoni alam dan pelajari tradisi yang dijaga selama berabad-abad.",

        // CTA Section
        "cta.badge": "Edisi Eksklusif 2026",
        "cta.title": "Temukan Keajaiban di Pandeglang",
        "cta.subtitle": '"Biarkan alam membimbing Anda kembali ke keseimbangan. Petualangan yang akan mengubah cara Anda memandang dunia menanti di Ujung Barat Jawa."',
        "cta.main": "Mulai Eksplorasi",
        "cta.secondary": "Lihat Peta",

        // Footer
        "footer.desc": "Kabupaten yang kaya akan keindahan alam, warisan budaya, dan kehangatan masyarakat. Selamat datang di rumah kami.",
        "footer.explore": "Jelajahi",
        "footer.info": "Informasi",
        "footer.contact": "Kontak",
        "footer.links.home": "Beranda",
        "footer.links.map": "Peta Wisata",
        "footer.links.culinary": "Wisata Kuliner",
        "footer.links.gallery": "Galeri Album",
        "footer.links.about": "Tentang Pandeglang",
        "footer.links.events": "Event & Festival",
        "footer.links.conservation": "Konservasi Alam",
        "footer.links.guide": "Panduan Perjalanan",
        "footer.rights": "Hak Cipta Dilindungi.",
        "footer.privacy": "Kebijakan Privasi",
        "footer.terms": "Syarat & Ketentuan",

        // Common
        "common.read_more": "Baca Selengkapnya",
        "common.loading": "Memuat...",
        "common.view_all": "Lihat Semua",
        "common.explore_now": "Eksplorasi Sekarang",
        "common.view_detail": "Lihat Detail Penuh",
        "common.get_route": "Dapatkan Akses Rute",
        "common.limited_edition": "Edisi Terbatas",
        "common.hidden_gem": "Permata Tersembunyi",
        "common.travel_guide": "Panduan Perjalanan",
        "common.itinerary_title": "Rencana Perjalanan Terpilih",
    },
    EN: {
        // Navbar
        "nav.home": "Home",
        "nav.culinary": "Culinary",
        "nav.map": "Map",
        "nav.calendar": "Calendar",
        "nav.gallery": "Gallery",
        "nav.about": "About",
        "nav.home_desc": "Return to start",
        "nav.culinary_desc": "Explore local tastes",
        "nav.map_desc": "Interactive navigation",
        "nav.calendar_desc": "Events & festivals",
        "nav.gallery_desc": "Visual gallery",
        "nav.about_desc": "Get to know more",

        // Hero
        "hero.top_label": "Gateway to Adventure",
        "hero.title": "PANDEGLANG",
        "hero.subtitle": '"Where the blue ocean meets the green mountains. Timeless wonders await your footsteps."',
        "hero.cta": "Start Exploration",

        // Brand Story
        "brand.floating_quote": '"Timeless ancestral heritage, preserving harmony between humans and the universe."',
        "brand.top_label": "The Essence of Pandeglang",
        "brand.title_main": "Finding the Soul in the",
        "brand.title_accent": "Western Tip",
        "brand.title_suffix": "of Java",
        "brand.desc": "Pandeglang is not just a destination; it's a harmonious symphony of nature and culture. From the silence of the Ujung Kulon rainforest to the local wisdom of the Baduy Tribe firmly guarding traditions, every corner offers a story of tranquility and authenticity.",
        "brand.stat.iconic": "Curated Iconic Destinations",
        "brand.stat.unesco": "Registered World Heritage Sites",

        // Destinations Section
        "dest.top_label": "Boundless Exploration",
        "dest.title": "Premium Destination Picks",
        "dest.subtitle": "A curation of natural beauty for souls seeking tranquility and inspiration in every step of the journey.",
        "dest.view_map": "Explore Map",

        // Experience Grid (Category Labels)
        "exp.nature": "Nature & Conservation",
        "exp.culture": "Culture & Tradition",
        "exp.culinary": "Archipelago Culinary",
        "exp.adventure": "Wild Adventure",

        "exp.vibe": "Choose Your Vibe",
        "exp.title": "Define Your Adventure",

        "exp.item1.cat": "Extreme Adventure",
        "exp.item1.title": "Conquer Anak Krakatau",
        "exp.item1.desc": "Feel the adrenaline of climbing one of the world's most iconic volcanoes.",

        "exp.item2.cat": "Luxury Serenity",
        "exp.item2.title": "Exclusive Tanjung Lesung Resort",
        "exp.item2.desc": "Indulge in world-class comfort on stunning shores.",

        "exp.item3.cat": "Local Wisdom",
        "exp.item3.title": "Mystery of the Baduy Tribe",
        "exp.item3.desc": "Return to natural harmony and learn traditions preserved for centuries.",

        // CTA Section
        "cta.badge": "Exclusive 2026 Edition",
        "cta.title": "Discover the Magic of Pandeglang",
        "cta.subtitle": '"Let nature guide you back to balance. An adventure that will change the way you see the world awaits at the Western tip of Java."',
        "cta.main": "Start Exploration",
        "cta.secondary": "View Map",

        // Footer
        "footer.desc": "A regency rich in natural beauty, cultural heritage, and warm hospitality. Welcome to our home.",
        "footer.explore": "Explore",
        "footer.info": "Information",
        "footer.contact": "Contact",
        "footer.links.home": "Home",
        "footer.links.map": "Tourism Map",
        "footer.links.culinary": "Culinary Tour",
        "footer.links.gallery": "Photo Gallery",
        "footer.links.about": "About Pandeglang",
        "footer.links.events": "Events & Festivals",
        "footer.links.conservation": "Nature Conservation",
        "footer.links.guide": "Travel Guide",
        "footer.rights": "All Rights Reserved.",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms & Conditions",

        // Common
        "common.read_more": "Read More",
        "common.loading": "Loading...",
        "common.view_all": "View All",
        "common.explore_now": "Explore Now",
        "common.view_detail": "View Full Detail",
        "common.get_route": "Get Route Access",
        "common.limited_edition": "Limited Edition",
        "common.hidden_gem": "Hidden Gems",
        "common.travel_guide": "Travel Guide",
        "common.itinerary_title": "Selected Itineraries",
    }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>(() => {
        const saved = localStorage.getItem("app-lang");
        return (saved as Language) || "ID";
    });

    useEffect(() => {
        localStorage.setItem("app-lang", lang);
        document.documentElement.lang = lang.toLowerCase();
    }, [lang]);

    const t = (key: string) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
