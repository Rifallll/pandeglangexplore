import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Shield, Leaf, Heart, ArrowLeft, TreePine, Camera, Sparkles, Globe, Quote, BookOpen, Fingerprint, Award, CheckCircle2, Loader2, X, Copy, CreditCard, ExternalLink, ChevronRight, QrCode, Download, PartyPopper, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

const ConservationPage = () => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [activeTier, setActiveTier] = useState<string | null>(null);
    const [activeAmount, setActiveAmount] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"bank" | "qris">("bank");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        if (showSuccess) {
            // Play success sound
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
            audio.volume = 0.3;
            audio.play().catch(() => { }); // Browser autoplay policy

            const timer = setTimeout(() => setShowSuccess(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const handleContribute = (tier: string, amount: string) => {
        setActiveTier(tier);
        setActiveAmount(amount);
        setIsProcessing(true);
        // Simulate real transaction/action
        setTimeout(() => {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setShowPayment(true);
            }, 1000);
        }, 1500);
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Guardian of Pandeglang',
            text: lang === "ID"
                ? `Saya baru saja menjadi ${activeTier} untuk melestarikan alam Pandeglang. Mari bergabung menjaga warisan hijau kita!`
                : `I just became a ${activeTier} to preserve Pandeglang's nature. Join us in protecting our green heritage!`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                toast.success("Misi Berhasil Dibagikan");
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                toast.success("Link Misi Berhasil Disalin", {
                    description: "Silakan bagikan secara manual ke teman Anda.",
                });
            }
        } catch (err) {
            // Error handled by toast notification
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(lang === "ID" ? `${label} Berhasil Disalin` : `${label} Copied Successfully`, {
            description: lang === "ID" ? "Silakan lanjutkan pembayaran di aplikasi bank Anda." : "Please proceed with payment in your bank app.",
        });
    };

    const galleryImages = lang === "ID" ? [
        { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80", title: "Dipterocarpaceae", desc: "Kanopi raksasa penyerap 200 ton CO2." },
        { url: "https://images.unsplash.com/photo-1544256718-473dcc028197?w=1200&q=80", title: "Cloud Forest", desc: "Hutan lumut Gunung Pulosari yang mistis." },
        { url: "https://images.unsplash.com/photo-1463190806509-518e4758d83a?w=1200&q=80", title: "Cikuray Water", desc: "Filtrasi alami untuk 15 komunitas desa." },
        { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=80", title: "West Coast Line", desc: "Habitat penetasan Penyu Hijau langka." },
        { url: "https://images.unsplash.com/photo-1516972087570-5b65df06371c?w=1200&q=80", title: "Ancient Falls", desc: "Saksi bisu evolusi geologi jutaan tahun." },
        { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", title: "The Deep Wild", desc: "Zona inti yang tak pernah tersentuh manusia." },
    ] : [
        { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80", title: "Dipterocarpaceae", desc: "Giant canopy absorbing 200 tons of CO2." },
        { url: "https://images.unsplash.com/photo-1544256718-473dcc028197?w=1200&q=80", title: "Cloud Forest", desc: "Mystical moss forest of Mount Pulosari." },
        { url: "https://images.unsplash.com/photo-1463190806509-518e4758d83a?w=1200&q=80", title: "Cikuray Water", desc: "Natural filtration for 15 village communities." },
        { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=80", title: "West Coast Line", desc: "Nesting habitat for rare Green Turtles." },
        { url: "https://images.unsplash.com/photo-1516972087570-5b65df06371c?w=1200&q=80", title: "Ancient Falls", desc: "Silent witness to millions of years of geology." },
        { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", title: "The Deep Wild", desc: "Core zone never touched by humans." },
    ];

    const impactTiers = lang === "ID" ? [
        {
            level: "Silver Guardian",
            amount: "IDR 500K",
            benefit: "Satu Pohon Asli",
            desc: "Menanam dan merawat satu bibit pohon 'Ulin' di zona restorasi.",
            icon: Leaf,
            color: "text-slate-400"
        },
        {
            level: "Emerald Legacy",
            amount: "IDR 2.5M",
            benefit: "Patroli 1 Bulan",
            desc: "Membiayai perlengkapan tim patroli ranger untuk 30 hari penuh.",
            icon: Shield,
            color: "text-[#C5A065]",
            featured: true
        },
        {
            level: "Apex Protector",
            amount: "IDR 10M",
            benefit: "Satu Satelit Tracking",
            desc: "Pemasangan satu kamera trap cerdas berbasis AI untuk pemantauan Badak.",
            icon: Award,
            color: "text-blue-400"
        }
    ] : [
        {
            level: "Silver Guardian",
            amount: "IDR 500K",
            benefit: "One Native Tree",
            desc: "Plant and nurture one 'Ironwood' sapling in the restoration zone.",
            icon: Leaf,
            color: "text-slate-400"
        },
        {
            level: "Emerald Legacy",
            amount: "IDR 2.5M",
            benefit: "1 Month Patrol",
            desc: "Fund ranger patrol team equipment for a full 30 days.",
            icon: Shield,
            color: "text-[#C5A065]",
            featured: true
        },
        {
            level: "Apex Protector",
            amount: "IDR 10M",
            benefit: "One Tracking Satellite",
            desc: "Deployment of one AI-based smart camera trap for Rhino monitoring.",
            icon: Award,
            color: "text-blue-400"
        }
    ];

    const journalLogs = lang === "ID" ? [
        { date: "Oct 12, 2025", author: "Ranger Aris", text: "Ditemukan jejak kaki Badak Jawa baru di sektor III. Ukuran menunjukkan ini adalah anakan sehat. Harapan baru." },
        { date: "Nov 05, 2025", author: "Dr. Maya", text: "Densitas vegetasi di area restorasi meningkat 15%. Burung Rangkong mulai kembali bersarang." },
        { date: "Jan 10, 2026", author: "Community Lead", text: "Desa Cigondrong resmi berpindah ke energi surya. Ancaman penebangan ilegal turun drastis." },
    ] : [
        { date: "Oct 12, 2025", author: "Ranger Aris", text: "Found new Javan Rhino footprints in sector III. Size indicates a healthy calf. A new hope." },
        { date: "Nov 05, 2025", author: "Dr. Maya", text: "Vegetation density in the restoration area increased by 15%. Rhinoceros Hornbills are nesting again." },
        { date: "Jan 10, 2026", author: "Community Lead", text: "Cigondrong Village officially switched to solar energy. Illegal logging threats dropped drastically." },
    ];

    return (
        <div ref={containerRef} className="bg-[#050505] text-white selection:bg-[#C5A065]/30 overflow-x-hidden relative">
            {/* Organic Ambient Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 150, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        x: [0, -150, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-[#C5A065]/5 rounded-full blur-[200px]"
                />
            </div>

            {/* Payment Modal Overlay */}
            <AnimatePresence>
                {showPayment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative my-auto"
                        >
                            <button
                                onClick={() => setShowPayment(false)}
                                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-16">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#C5A065]/20 flex items-center justify-center text-[#C5A065]">
                                            <CreditCard size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-serif">{lang === "ID" ? "Detail Pembayaran" : "Payment Details"}</h3>
                                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Guardian Tier: {activeTier}</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                                        <button
                                            onClick={() => setPaymentMethod("bank")}
                                            className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${paymentMethod === "bank" ? "bg-[#C5A065] text-black" : "text-white/40 hover:text-white"}`}
                                        >
                                            Bank
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod("qris")}
                                            className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${paymentMethod === "qris" ? "bg-[#C5A065] text-black" : "text-white/40 hover:text-white"}`}
                                        >
                                            QRIS
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-3xl p-8 mb-10 border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#C5A065]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-bold block mb-4 relative z-10">{lang === "ID" ? "Total Kontribusi" : "Total Contribution"}</span>
                                    <div className="text-4xl md:text-5xl font-serif text-[#C5A065] tracking-tighter relative z-10">{activeAmount}</div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {paymentMethod === "bank" ? (
                                        <motion.div
                                            key="bank"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                                        >
                                            {/* BCA */}
                                            <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 hover:border-[#C5A065]/30 transition-all group">
                                                <div className="flex justify-between items-center mb-6">
                                                    <span className="text-xl font-bold tracking-tighter">BCA</span>
                                                    <button
                                                        onClick={() => copyToClipboard("1234567890", "Nomor Rekening BCA")}
                                                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#C5A065] hover:bg-[#C5A065]/10 transition-all"
                                                    >
                                                        <Copy size={14} />
                                                    </button>
                                                </div>
                                                <div className="text-2xl font-mono tracking-wider mb-2">1234 567 890</div>
                                                <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">A.N. Yayasan Lestari Pandeglang</div>
                                            </div>

                                            {/* Mandiri */}
                                            <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 hover:border-[#C5A065]/30 transition-all group">
                                                <div className="flex justify-between items-center mb-6">
                                                    <span className="text-xl font-bold tracking-tighter">MANDIRI</span>
                                                    <button
                                                        onClick={() => copyToClipboard("0987654321", "Nomor Rekening Mandiri")}
                                                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#C5A065] hover:bg-[#C5A065]/10 transition-all"
                                                    >
                                                        <Copy size={14} />
                                                    </button>
                                                </div>
                                                <div className="text-2xl font-mono tracking-wider mb-2">0987 654 321</div>
                                                <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">A.N. Yayasan Lestari Pandeglang</div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="qris"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="mb-12"
                                        >
                                            <div className="bg-white p-8 rounded-[3rem] max-w-[280px] mx-auto mb-8 shadow-2xl shadow-emerald-500/10">
                                                <div className="flex justify-center mb-4">
                                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=LESTARI_PANDEGLANG_CONSERVATION" alt="QRIS" className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex items-center justify-center gap-2 text-black/20 font-bold text-[8px] uppercase tracking-[0.4em]">
                                                    <QrCode size={12} /> QRIS Pelestarian
                                                </div>
                                            </div>
                                            <p className="text-center text-white/40 text-xs font-light mb-6">Pindai menggunakan aplikasi bank atau e-wallet Anda.</p>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => toast.success("QR Code Sedang Diunduh")}
                                                    className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                                                >
                                                    <Download size={14} /> Unduh QR
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#C5A065]/20 flex items-center justify-center text-[#C5A065] text-[10px] font-bold mt-1">1</div>
                                        <p className="text-white/50 text-sm font-light leading-relaxed">
                                            {paymentMethod === "bank"
                                                ? (lang === "ID" ? "Lakukan transfer sesuai nominal di atas melalui bank favorit Anda." : "Perform the transfer according to the amount above via your favorite bank.")
                                                : (lang === "ID" ? "Buka aplikasi pembayaran dan pindai kode QRIS di atas." : "Open your payment app and scan the QRIS code above.")}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#C5A065]/20 flex items-center justify-center text-[#C5A065] text-[10px] font-bold mt-1">2</div>
                                        <p className="text-white/50 text-sm font-light leading-relaxed">
                                            {paymentMethod === "bank"
                                                ? (lang === "ID" ? <>Berikan catatan <span className="text-[#C5A065] font-bold">"Guardian {activeTier}"</span> pada saat melakukan transfer.</> : <>Add note <span className="text-[#C5A065] font-bold">"Guardian {activeTier}"</span> when performing the transfer.</>)
                                                : (lang === "ID" ? "Pastikan nominal yang tertera sesuai dengan tingkatan kontribusi Anda." : "Ensure the amount listed matches your contribution tier.")}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#C5A065]/20 flex items-center justify-center text-[#C5A065] text-[10px] font-bold mt-1">3</div>
                                        <p className="text-white/50 text-sm font-light leading-relaxed">
                                            {lang === "ID"
                                                ? "Simpan bukti transaksi dan bagikan keberanian Anda untuk menjaga alam."
                                                : "Save the transaction receipt and share your courage to protect nature."}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowPayment(false);
                                        setShowSuccess(true);
                                    }}
                                    className="w-full mt-12 bg-white text-black py-6 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#C5A065] hover:text-white transition-all flex items-center justify-center gap-4 group shadow-xl shadow-white/5"
                                >
                                    {lang === "ID" ? "Konfirmasi Pembayaran" : "Confirm Payment"}
                                    <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Processing Modal Overlay */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="text-center"
                        >
                            <Loader2 className="w-16 h-16 text-[#C5A065] animate-spin mx-auto mb-8" />
                            <h3 className="text-3xl font-serif mb-4">{lang === "ID" ? "Mengamankan Masa Depan..." : "Securing the Future..."}</h3>
                            <p className="text-white/40 text-sm tracking-widest uppercase">{lang === "ID" ? `Sedang memproses kontribusi ${activeTier}` : `Processing ${activeTier} contribution`}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transaction Success Celebratory Screen */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Celebration Background Particles */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        opacity: 0,
                                        x: Math.random() * window.innerWidth,
                                        y: window.innerHeight + 100
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: -200,
                                        rotate: 360
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 5
                                    }}
                                    className="absolute w-2 h-2 text-[#C5A065]"
                                >
                                    <Sparkles size={Math.random() * 20 + 10} />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ scale: 0.8, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="text-center max-w-2xl relative z-10 py-12 my-auto"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                                className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#C5A065] mx-auto mb-12 flex items-center justify-center text-black shadow-[0_0_100px_rgba(197,160,101,0.5)]"
                            >
                                <PartyPopper size={48} className="md:w-24 md:h-24" />
                            </motion.div>

                            <h2 className="text-4xl md:text-8xl font-serif tracking-tighter mb-8 leading-none">
                                {lang === "ID" ? <>Transaksi <br /> <span className="italic text-[#C5A065]">Berhasil</span></> : <>Transaction <br /> <span className="italic text-[#C5A065]">Successful</span></>}
                            </h2>

                            <div className="h-px w-24 bg-white/20 mx-auto mb-8" />

                            <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed mb-16 italic">
                                {lang === "ID"
                                    ? "\"Satu langkah kecil Anda, adalah nafas baru bagi setiap inci keaslian Pandeglang. Anda kini adalah bagian dari Guardian Circle.\""
                                    : "\"Your one small step is a new breath for every inch of Pandeglang's authenticity. You are now part of the Guardian Circle.\""}
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="w-full md:w-auto px-12 py-5 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#C5A065] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl shadow-white/5"
                                >
                                    {lang === "ID" ? "Selesai" : "Done"}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="w-full md:w-auto px-12 py-5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white transition-all flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] transform hover:scale-110 active:scale-95"
                                >
                                    <Share2 size={14} /> {lang === "ID" ? "Bagikan Misi" : "Share Mission"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#C5A065] z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Premium Navigation */}
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-8 md:px-16 z-50 mix-blend-difference">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-4 group"
                >
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-50 group-hover:opacity-100 transition-opacity">{lang === "ID" ? "Kembali" : "Back"}</span>
                </button>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[8px] uppercase tracking-[0.3em] opacity-40">{lang === "ID" ? "Program Hijau" : "Green Program"}</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A065]">Lestari Pandeglang</span>
                    </div>
                    <Fingerprint size={24} className="text-[#C5A065]" />
                </div>
            </nav>

            {/* Cinematic Hero - Persuasive Header */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#050505] z-10" />
                    <img
                        src="/images/conservation_pandeglang.png"
                        alt="Immersive Wild"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                </motion.div>

                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="flex items-center gap-4 justify-center mb-12">
                            <div className="h-px w-12 bg-[#C5A065]" />
                            <span className="text-[#C5A065] text-[10px] font-bold tracking-[0.8em] uppercase">{lang === "ID" ? "Edisi Eksklusif 2026" : "Exclusive 2026 Edition"}</span>
                            <div className="h-px w-12 bg-[#C5A065]" />
                        </div>
                        <h1 className="text-5xl md:text-[12rem] font-serif font-light leading-[1] md:leading-[0.8] tracking-tighter mb-12 text-center">
                            {lang === "ID" ? <>Memahat <br /> </> : <>Sculpting <br /> </>}
                            <span className="italic text-[#C5A065] relative inline-block">
                                {lang === "ID" ? "Keabadian" : "Eternity"}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 2 }}
                                    className="absolute -bottom-4 left-0 h-1 bg-[#C5A065]/30"
                                />
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-white/40 text-xl md:text-3xl font-light leading-relaxed text-center font-serif italic">
                            {lang === "ID"
                                ? "\"Berhenti sejenak, dengarkan nafas hutan yang mulai melemah. Jadilah alasan ia kembali bergemuruh.\""
                                : "\"Stop for a moment, listen to the weakening breath of the forest. Be the reason it roars again.\""}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
                >
                    <span className="text-[8px] uppercase tracking-[0.5em] font-bold">{lang === "ID" ? "Terus Menjelajah" : "Keep Exploring"}</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                </motion.div>
            </section>

            {/* The Guardian's Manifesto - Persuasive Statement */}
            <section className="py-48 bg-[#050505] relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Quote className="text-[#C5A065] mx-auto mb-12 opacity-20" size={64} />
                        <h2 className="text-3xl md:text-6xl font-serif leading-tight mb-16 px-4">
                            {lang === "ID"
                                ? <>Konsep kami bukan tentang <span className="text-[#C5A065] italic underline decoration-1 underline-offset-8">donasi</span>, tapi tentang <span className="italic text-white">investasi kehidupan</span>.</>
                                : <>Our concept is not about <span className="text-[#C5A065] italic underline decoration-1 underline-offset-8">donation</span>, but about <span className="italic text-white">investment in life</span>.</>}
                        </h2>
                        <p className="text-white/30 text-lg md:text-2xl font-light leading-relaxed mb-24 max-w-2xl mx-auto">
                            {lang === "ID"
                                ? "Setiap kepingan yang Anda berikan adalah nafas bagi Badak Jawa yang terancam sunyi, air bagi akar yang kering, dan harga diri bagi para pendekar hutan kami."
                                : "Every piece you give is a breath for the Javan Rhinos threatened by silence, water for thirsty roots, and pride for our forest warriors."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Artisanal Field Journal - "Manual" Section */}
            <section className="py-48 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="container mx-auto px-8 md:px-24">
                    <div className="flex flex-col lg:flex-row gap-24 items-start">
                        <div className="lg:w-1/3">
                            <div className="inline-flex items-center gap-3 text-[#C5A065] mb-8">
                                <BookOpen size={20} />
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">{lang === "ID" ? "Log Catatan Lapangan" : "Field Journal Logs"}</span>
                            </div>
                            <h3 className="text-3xl md:text-6xl font-serif mb-12">{lang === "ID" ? <>Laporan <br /><span className="italic">Garis Depan</span></> : <>Frontline <br /><span className="italic">Reports</span></>}</h3>
                            <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                                {lang === "ID"
                                    ? "Transparansi total. Simak apa yang terjadi hari ini di tengah rimbunnya Pandeglang melalui mata para penjaga kami."
                                    : "Total transparency. See what's happening today in the lushness of Pandeglang through the eyes of our guardians."}
                            </p>
                            <div className="w-full h-px bg-white/10" />
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 gap-12">
                            {journalLogs.map((log, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="p-12 bg-black border border-white/5 rounded-[2rem] relative group hover:border-[#C5A065]/20 transition-all duration-700 overflow-hidden"
                                >
                                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#C5A065]/5 rounded-full blur-[80px] group-hover:bg-[#C5A065]/10 transition-all" />
                                    <span className="absolute top-8 right-12 text-[10px] uppercase font-bold text-[#C5A065] opacity-40">{log.date}</span>
                                    <h5 className="text-[#C5A065] text-sm uppercase tracking-widest font-bold mb-6 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#C5A065]" />
                                        {log.author}
                                    </h5>
                                    <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed italic relative z-10">"{log.text}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Tiers - Exclusive "Selling" Section */}
            <section className="py-48 bg-white/[0.03] rounded-[5rem] mx-4 md:mx-12 lg:mx-24 mb-48 border border-white/5 relative overflow-hidden z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C5A065]/5 via-transparent to-transparent" />

                <div className="container mx-auto px-12 md:px-24 relative z-10">
                    <div className="text-center mb-32">
                        <span className="inline-block px-6 py-2 rounded-full border border-[#C5A065]/30 text-[#C5A065] text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Investment in Nature</span>
                        <h2 className="text-4xl md:text-8xl font-serif tracking-tighter">Pilih <span className="italic">Level</span> Kontribusimu</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {impactTiers.map((tier, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                onClick={() => handleContribute(tier.level, tier.amount)}
                                className={`p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] border cursor-pointer ${tier.featured ? 'bg-[#C5A065] border-[#C5A065] text-black shadow-[0_50px_100px_-20px_rgba(197,160,101,0.3)]' : 'bg-black border-white/10 text-white'} relative group transition-all duration-700`}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="h-full"
                                >
                                    {tier.featured && (
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-xl">
                                            {lang === "ID" ? "Paling Berdampak" : "Most Impactful"}
                                        </div>
                                    )}
                                    <tier.icon className={`mb-12 ${tier.featured ? 'text-black' : tier.color}`} size={48} />
                                    <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4 opacity-50">{tier.level}</h4>
                                    <div className="text-4xl md:text-5xl font-serif mb-8 tracking-tighter">{tier.amount}</div>
                                    <div className="h-px w-12 bg-current opacity-20 mb-8" />
                                    <h5 className="text-xl font-serif mb-6">{tier.benefit}</h5>
                                    <p className={`text-sm font-light leading-relaxed mb-12 ${tier.featured ? 'text-black/60' : 'text-white/40'}`}>
                                        {tier.desc}
                                    </p>
                                    <button
                                        className={`w-full py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative overflow-hidden group/btn ${tier.featured ? 'bg-black text-white' : 'bg-white text-black'}`}
                                    >
                                        <span className="relative z-10">{lang === "ID" ? "Mulai Kontribusi" : "Start Contributing"}</span>
                                        <motion.div
                                            className="absolute inset-0 bg-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                                        />
                                    </button>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Editorial Footer */}
            <footer className="py-32 border-t border-white/5 px-8 md:px-24 bg-black relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 items-start">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-12">
                            <Fingerprint size={32} className="text-[#C5A065]" />
                            <span className="text-2xl font-serif tracking-tighter">Lestari Pandeglang</span>
                        </div>
                        <p className="text-white/20 text-xs font-light leading-relaxed max-w-sm mb-12">
                            {lang === "ID"
                                ? "Kami adalah kolektif independen yang berdedikasi menjaga detak jantung terakhir hutan hujan Jawa. Bergabunglah dalam misi mustahil ini."
                                : "We are an independent collective dedicated to protecting the last heartbeat of the Javan rainforest. Join us in this impossible mission."}
                        </p>
                    </div>

                    <div>
                        <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/30 mb-8 block">Navigasi</span>
                        <ul className="space-y-6 text-sm font-light text-white/50">
                            <li className="hover:text-[#C5A065] transition-colors cursor-pointer">{lang === "ID" ? "Eksplorasi Destinasi" : "Destination Exploration"}</li>
                            <li className="hover:text-[#C5A065] transition-colors cursor-pointer">{lang === "ID" ? "Kalender Konservasi" : "Conservation Calendar"}</li>
                            <li className="hover:text-[#C5A065] transition-colors cursor-pointer">{lang === "ID" ? "Galeri Visual" : "Visual Gallery"}</li>
                        </ul>
                    </div>

                    <div>
                        <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/30 mb-8 block">{lang === "ID" ? "Bantuan" : "Support"}</span>
                        <ul className="space-y-6 text-sm font-light text-white/50">
                            <li className="hover:text-[#C5A065] transition-colors cursor-pointer">{lang === "ID" ? "Laporan Donasi" : "Donation Reports"}</li>
                            <li className="hover:text-[#C5A065] transition-colors cursor-pointer">{lang === "ID" ? "Hubungi Kami" : "Contact Us"}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold text-center">
                    <span>&copy; 2026 Pandeglang Explore &bull; {lang === "ID" ? "Misi Hijau" : "Green Mission"}</span>
                    <div className="flex gap-12">
                        <span>Legal Ethics</span>
                        <span>Wildlife Policy</span>
                    </div>
                </div>

                <div className="mt-24 opacity-5 pointer-events-none text-center">
                    <span className="text-[15vw] font-serif leading-none select-none tracking-tighter">PRESERVE</span>
                </div>
            </footer>
        </div>
    );
};

export default ConservationPage;
