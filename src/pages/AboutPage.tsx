import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Layers, Plus, Clock, Globe, Info, Hash, Phone, Users, Ruler, MoveRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- Utility Components ---

const LiveWidget = () => {
    const { lang } = useLanguage();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed top-24 right-6 z-40 hidden md:flex flex-col items-end gap-1 mix-blend-difference pointer-events-none">
            <div className="flex items-center gap-2 text-[#C5A065] text-xs font-mono uppercase tracking-widest">
                <Globe size={12} className="animate-pulse" />
                <span>6°21' LS - 105°49' BT</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-[10px] font-mono">
                <Clock size={10} />
                <span>{time.toLocaleTimeString(lang === 'ID' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                <span className="w-[1px] h-3 bg-white/20"></span>
                <span>27°C (Feel 31°C)</span>
            </div>
        </div>
    );
};

const StickyNav = ({ activeSection, scrollTo }) => {
    const { lang } = useLanguage();
    const sections = lang === "ID" ? [
        { id: "hero", label: "BERANDA" },
        { id: "sejarah", label: "SEJARAH" },
        { id: "identitas", label: "IDENTITAS" },
        { id: "alam", label: "ALAM" },
        { id: "info", label: "INFORMASI" },
        { id: "statistik", label: "DATA" }
    ] : [
        { id: "hero", label: "HOME" },
        { id: "sejarah", label: "HISTORY" },
        { id: "identitas", label: "IDENTITY" },
        { id: "alam", label: "NATURE" },
        { id: "info", label: "INFORMATION" },
        { id: "statistik", label: "DATA" }
    ];

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="group flex items-center justify-end gap-2"
                >
                    <span className={`text-[10px] uppercase font-mono tracking-widest transition-all duration-300 ${activeSection === id ? "text-[#C5A065] opacity-100" : "text-white opacity-0 group-hover:opacity-50"} `}>
                        {label}
                    </span>
                    <div className={`w-2 h-2 rounded-full border border-white/40 transition-all duration-300 ${activeSection === id ? "bg-[#C5A065] border-[#C5A065] scale-125" : "bg-transparent group-hover:bg-white/20"}`}></div>
                </button>
            ))}
        </div>
    );
};

// --- New Components: Info Hub ---

const InfoCard = ({ icon: Icon, title, data }) => (
    <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-[#C5A065]/50 transition-colors group">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-[#C5A065]/10 rounded-full text-[#C5A065] group-hover:bg-[#C5A065] group-hover:text-black transition-colors">
                <Icon size={18} />
            </div>
            <h4 className="text-white font-serif text-lg">{title}</h4>
        </div>
        <ul className="space-y-2">
            {data.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                    <span className="text-white/50">{item.label}</span>
                    <span className="text-white font-medium text-right">{item.value}</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- 3D Hero Component ---

const Hero3D = ({ id }) => {
    const { lang } = useLanguage();
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX / width) - 0.5;
        const yPct = (clientY / height) - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const mouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const exactRotateX = useSpring(rotateX, springConfig);
    const exactRotateY = useSpring(rotateY, springConfig);

    const translateText = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const translateBg = useTransform(mouseX, [-0.5, 0.5], [20, -20]);

    return (
        <section
            id={id}
            className="min-h-[90svh] md:h-screen w-full relative overflow-hidden bg-[#050505] flex items-center justify-center perspective-container py-24 md:py-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={mouseLeave}
            style={{ perspective: "1200px" }}
        >
            <motion.div
                className="relative w-[95%] md:w-[90%] h-full md:h-[80%] flex items-center justify-center preserve-3d"
                style={{
                    rotateX: exactRotateX,
                    rotateY: exactRotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 1. Deep Background Layer */}
                <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 opacity-30 md:opacity-40"
                    style={{
                        x: translateBg,
                        transform: "translateZ(-100px) scale(1.1)"
                    }}
                >
                    <img
                        src="/images/conservation_pandeglang.png"
                        alt="Background"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
                </motion.div>

                {/* 2. Middle Layer - Main Typography */}
                <motion.div
                    className="relative z-10 text-center mix-blend-screen translate-z-[50px] px-6"
                    style={{ transform: "translateZ(50px)" }}
                >
                    <span className="text-[#C5A065] font-mono text-[9px] md:text-xs tracking-[0.6em] md:tracking-[1em] uppercase block mb-6">
                        {lang === "ID" ? "Mutiara dari Banten" : "Pearl of Banten"}
                    </span>
                    <h1 className="text-[14vw] md:text-[12vw] leading-none font-bold text-white tracking-tighter cursor-default selection:bg-transparent uppercase">
                        Pandeglang
                    </h1>
                    <p className="text-white/50 text-base md:text-xl font-light tracking-[0.2em] mt-6 uppercase">
                        {lang === "ID" ? "Berdiri 1874" : "Established 1874"}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};


// --- Modern Content Components ---

const Hotspot = ({ top, left, label, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute z-30" style={{ top, left }}>
            <button
                className="w-8 h-8 rounded-full bg-[#C5A065] flex items-center justify-center relative cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <Plus size={16} className={`text-black transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                <span className="absolute inset-0 rounded-full bg-[#C5A065] animate-ping opacity-20"></span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-black/90 border border-[#C5A065]/30 p-4 rounded-lg backdrop-blur-xl shadow-2xl z-50 pointer-events-none"
                    >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 rotate-45 border-t border-l border-[#C5A065]/30"></div>
                        <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest block mb-1">{label}</span>
                        <p className="text-white/80 text-xs leading-relaxed">{content}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const RevealRow = ({ id, subtitle, title, desc, img, reverse = false, hotspotData, link }) => {
    const { lang } = useLanguage();
    return (
        <div id={id} className="py-32 container mx-auto px-6 scroll-mt-24">
            <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-16 md:gap-32 items-center`}>
                <div className="w-full md:w-1/2">
                    <div className="relative overflow-visible rounded-sm group">
                        {/* Hotspot Layer */}
                        {hotspotData && (
                            <Hotspot
                                top={hotspotData.top}
                                left={hotspotData.left}
                                label={hotspotData.label}
                                content={hotspotData.content}
                            />
                        )}

                        <div className="absolute inset-0 bg-[#C5A065]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-10 mix-blend-overlay pointer-events-none"></div>
                        <img src={img} alt={title} className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <span className="text-[#C5A065] text-xs font-mono uppercase tracking-widest mb-6 block flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#C5A065] rounded-full"></span>
                        {subtitle}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">{title}</h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed mb-10 border-l border-white/10 pl-6">
                        {desc}
                    </p>
                    {link ? (
                        <Link to={link}>
                            <button className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest hover:text-[#C5A065] transition-colors">
                                {lang === "ID" ? "Baca Selengkapnya" : "Read More"} <ArrowRight size={14} />
                            </button>
                        </Link>
                    ) : (
                        <button className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest hover:text-[#C5A065] transition-colors">
                            {lang === "ID" ? "Baca Selengkapnya" : "Read More"} <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const GlassStat = ({ value, label, subtext }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-[#C5A065] transition-colors">{value}</h3>
        <span className="text-xs font-mono uppercase text-[#C5A065] tracking-widest block mb-2">{label}</span>
        <p className="text-white/40 text-[10px] leading-relaxed">{subtext}</p>
    </div>
);

// --- Page ---

const AboutPage = () => {
    const { lang } = useLanguage();
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        document.title = lang === "ID" ? "Tentang Pandeglang | The Sunset of Java" : "About Pandeglang | The Sunset of Java";
        const handleScroll = () => {
            const sections = ["hero", "sejarah", "identitas", "alam", "info", "statistik"];
            const scrollPos = window.scrollY + 350;

            for (const id of sections) {
                const element = document.getElementById(id);
                if (element && element.offsetTop <= scrollPos && (element.offsetTop + element.offsetHeight) > scrollPos) {
                    setActiveSection(id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lang]);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#C5A065] selection:text-black"
        >
            <Navbar />

            <LiveWidget />
            <StickyNav activeSection={activeSection} scrollTo={scrollTo} />

            <Hero3D id="hero" />

            {/* Narrative Flow */}
            <div className="bg-[#050505] relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-white/5 hidden md:block"></div>

                <RevealRow
                    id="sejarah"
                    subtitle={lang === "ID" ? "01 // AKAR SEJARAH" : "01 // HISTORICAL ROOTS"}
                    title={lang === "ID" ? "Sejak 1 April 1874" : "Since April 1, 1874"}
                    desc={lang === "ID"
                        ? "Pandeglang resmi berdiri sebagai Kabupaten pada 1 April 1874. Namun jejak peradabannya jauh lebih tua, terbukti dari Prasasti Munjul (Abad ke-4) yang menandai kekuasaan Kerajaan Tarumanegara."
                        : "Pandeglang was officially established as a Regency on April 1, 1874. However, its civilization traces back much further, evidenced by the Munjul Inscription (4th Century) marking the Tarumanegara Kingdom's reign."}
                    img="/PDG1.jpg"
                    hotspotData={{
                        top: "20%",
                        left: "20%",
                        label: lang === "ID" ? "Prasasti Munjul" : "Munjul Inscription",
                        content: lang === "ID"
                            ? "Ditemukan tahun 1947 di aliran Sungai Cidanghiang, berisi puisi Sanskerta yang memuji Raja Purnawarman. Salah satu bukti tertulis tertua di Banten."
                            : "Found in 1947 in the Cidanghiang River flow, containing a Sanskrit poem praising King Purnawarman. One of the oldest written evidences in Banten."
                    }}
                    link="/article/sejarah"
                />

                <RevealRow
                    id="identitas"
                    reverse={true}
                    subtitle={lang === "ID" ? "02 // IDENTITAS BUDAYA" : "02 // CULTURAL IDENTITY"}
                    title={lang === "ID" ? "Bumi Para Santri" : "Land of Students"}
                    desc={lang === "ID"
                        ? "Dijuluki 'Kota Santri' karena ribuan pesantren yang tersebar hingga pelosok. Pandeglang juga memiliki seni 'Wayang Thengul' dan 'Rampak Bedug' yang unik dan tidak ditemukan di daerah lain."
                        : "Nicknamed 'Kota Santri' due to thousands of Islamic boarding schools scattered throughout. Pandeglang also has 'Wayang Thengul' and 'Rampak Bedug' arts which are unique and not found elsewhere."}
                    img="/PDG2.jpg"
                    hotspotData={{
                        top: "50%",
                        left: "30%",
                        label: "Wayang Thengul",
                        content: lang === "ID"
                            ? "Berbeda dengan wayang kulit, Wayang Thengul di Pandeglang menggunakan boneka kayu 3 dimensi dan menceritakan kisah lokal."
                            : "Differing from shadow puppets, Pandeglang's Wayang Thengul uses 3D wooden puppets and tells local stories."
                    }}
                    link="/article/identitas"
                />

                <RevealRow
                    id="alam"
                    subtitle={lang === "ID" ? "03 // KEKAYAAN ALAM" : "03 // NATURAL WEALTH"}
                    title={lang === "ID" ? "Megabiodiversitas" : "Megabiodiversity"}
                    desc={lang === "ID"
                        ? "Dari puncak Gunung Karang (1.778 mdpl) hingga Ujung Kulon. Pandeglang adalah rumah bagi Badak Jawa dan komoditas unggulan seperti Talas Beneng yang mendunia."
                        : "From the peak of Mount Karang (1,778 masl) to Ujung Kulon. Pandeglang is home to the Javan Rhino and superior commodities like the world-renowned Talas Beneng."}
                    img="/images/PDG3.jpeg"
                    hotspotData={{
                        top: "60%",
                        left: "70%",
                        label: "Talas Beneng",
                        content: lang === "ID"
                            ? "Komoditas asli Pandeglang. Daunnya digunakan sebagai pengganti tembakau herbal, umbinya menjadi sumber pangan alternatif."
                            : "Native Pandeglang commodity. Its leaves are used as a herbal tobacco substitute, while its tubers serve as an alternative food source."
                    }}
                    link="/article/alam"
                />
            </div>

            {/* NEW: Info Hub Section */}
            <section id="info" className="py-24 bg-[#050505] border-t border-white/5 scroll-mt-12">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[1px] bg-[#C5A065]"></div>
                        <h3 className="text-2xl font-serif text-white">{lang === "ID" ? "Pusat Informasi Daerah" : "Regional Information Hub"}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <InfoCard
                            icon={Hash}
                            title={lang === "ID" ? "Kode Administratif" : "Administrative Codes"}
                            data={[
                                { label: lang === "ID" ? "Plat Nomor Kendaraan" : "Vehicle License Plate", value: "A (Banten)" },
                                { label: lang === "ID" ? "Kode Telepon" : "Area Code", value: "0253" },
                                { label: lang === "ID" ? "Kode Pos Utama" : "Main Postal Code", value: "422xx" }
                            ]}
                        />
                        <InfoCard
                            icon={Users}
                            title={lang === "ID" ? "Demografis" : "Demographics"}
                            data={[
                                { label: lang === "ID" ? "Suku Dominan" : "Dominant Tribe", value: "Sunda Banten" },
                                { label: lang === "ID" ? "Bahasa" : "Language", value: lang === "ID" ? "Sunda Banten, Indo" : "Bantenese Sundanese, Indo" },
                                { label: lang === "ID" ? "Agama Mayoritas" : "Majority Religion", value: "Islam (99%)" }
                            ]}
                        />
                        <InfoCard
                            icon={Ruler}
                            title={lang === "ID" ? "Batas Wilayah" : "Regional Borders"}
                            data={[
                                { label: lang === "ID" ? "Utara" : "North", value: lang === "ID" ? "Kabupaten Serang" : "Serang Regency" },
                                { label: lang === "ID" ? "Selatan" : "South", value: lang === "ID" ? "Samudra Hindia" : "Indian Ocean" },
                                { label: lang === "ID" ? "Barat" : "West", value: lang === "ID" ? "Selat Sunda" : "Sunda Strait" }
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Modern Stats */}
            <section id="statistik" className="py-32 bg-[#080808] border-t border-white/5 scroll-mt-12">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <h3 className="text-3xl font-light">{lang === "ID" ? "Data " : "Factual "} <strong className="text-white">{lang === "ID" ? "Faktual" : "Data"}</strong></h3>
                        <Layers className="text-[#C5A065] opacity-50" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <GlassStat
                            value="1874"
                            label={lang === "ID" ? "Didirikan" : "Established"}
                            subtext={lang === "ID" ? "Resmi berdiri pada era kolonial Belanda (1 April)." : "Officially established in the Dutch colonial era (April 1)."}
                        />
                        <GlassStat
                            value="35"
                            label={lang === "ID" ? "Kecamatan" : "Districts"}
                            subtext={lang === "ID" ? "Terdiri dari 35 Kecamatan & 339 Desa/Kelurahan." : "Consists of 35 Districts & 339 Villages."}
                        />
                        <GlassStat
                            value="2.747"
                            label={lang === "ID" ? "Luas (km²)" : "Area (km²)"}
                            subtext={lang === "ID" ? "Salah satu wilayah terluas di Provinsi Banten." : "One of the largest regions in Banten Province."}
                        />
                        <GlassStat
                            value={lang === "ID" ? "1,2 Juta" : "1.2 Million"}
                            label={lang === "ID" ? "Penduduk" : "Population"}
                            subtext={lang === "ID" ? "Sumber daya manusia yang agamis & produktif." : "Religious & productive human resources."}
                        />
                    </div>
                </div>
            </section>

            {/* Draggable Gallery */}
            <section className="py-32 overflow-hidden border-t border-white/5">
                <div className="container mx-auto px-6 mb-12 flex justify-between items-center">
                    <h3 className="text-2xl font-bold tracking-tight">{lang === "ID" ? "Galeri Visual" : "Visual Gallery"}</h3>
                    <div className="flex gap-2 text-white/30 text-xs font-mono uppercase">
                        <MoveRight className="animate-pulse" size={12} /> {lang === "ID" ? "Geser untuk jelajah" : "Scroll to explore"}
                    </div>
                </div>

                <div className="flex gap-8 px-6 w-full overflow-x-auto pb-12 no-scrollbar md:pl-[20vw] cursor-grab active:cursor-grabbing">
                    {[
                        "/images/dest_menes_heritage.png",
                        "/images/event_rampak_bedug.png",
                        "/images/dest_pulau_peucang.png",
                        "/images/event_hut_pandeglang.png",
                        "/images/dest_ujung_kulon.png"
                    ].map((src, i) => (
                        <div key={i} className="shrink-0 w-[300px] md:w-[450px] aspect-[16/9] relative group overflow-hidden rounded-lg">
                            <img src={src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="absolute bottom-4 left-4 font-mono text-xs text-[#C5A065] opacity-0 group-hover:opacity-100 transition-opacity delay-100">0{i + 1}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </motion.div>
    );
};

export default AboutPage;
