import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Share2, BookOpen, Play, Pause, Type, Minus, Plus, Volume2 } from "lucide-react";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// Content Database with Pull Quotes
const articles = {
    "sejarah": {
        title: "Jejak Langkah Peradaban",
        subtitle: "Menelusuri Akar Sejarah Pandeglang dari Masa Tarumanegara hingga Era Kolonial",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Prasasti_Munjul.jpg/1280px-Prasasti_Munjul.jpg",
        content: [
            "Pandeglang bukan sekadar nama di peta administratif Banten. Ia adalah saksi bisu perjalanan panjang peradaban manusia di ujung barat Pulau Jawa. Sejarah mencatat, wilayah ini telah dihuni dan menjadi pusat aktivitas penting sejak ribuan tahun silam.",
            "Bukti paling otentik adalah keberadaan Prasasti Munjul di aliran Sungai Cidanghiang, Kecamatan Munjul. Prasasti ini berasal dari abad ke-5 Masehi, masa kejayaan Kerajaan Tarumanegara di bawah Raja Purnawarman. Inskripsi dalam huruf Pallawa dan bahasa Sanskerta ini menegaskan bahwa wilayah ini adalah bagian dari mandala kekuasaan yang makmur dan beradab.",
            "Memasuki era Kesultanan Banten, Pandeglang menjadi penyangga penting bagi kedaulatan maritim Banten. Hutan-hutannya menyediakan kayu untuk kapal, dan tanahnya yang subur menjadi lumbung pangan. Nama 'Pandeglang' sendiri konon berasal dari kisah 'Pandai Gelang', seorang empu pembuat gelang sakti, yang menyiratkan bahwa daerah ini sejak dulu dihuni oleh para pengrajin dan ahli yang terampil.",
            "Pada masa kolonial, tepatnya 1 April 1874, pemerintah Hindia Belanda secara administratif menetapkan Pandeglang sebagai sebuah Kabupaten. Tata kota dirancang dengan konsep tradisional Jawa yang dipadukan dengan arsitektur kolonial, menciptakan lanskap kota yang unik seperti yang kita lihat pada Alun-alun dan Pendopo Kabupaten hari ini.",
            "Kini, warisan sejarah itu tidak hanya tersimpan di museum, tetapi hidup dalam denyut nadi masyarakatnya. Pandeglang terus melangkah ke depan tanpa melupakan jejak langkah para leluhur yang telah meletakkan batu pertama peradaban di tanah ini."
        ],
        quote: "Prasasti Munjul adalah bukti tak terbantahkan bahwa peradaban tinggi telah bersemi di tanah ini sejak abad ke-5 Masehi.",
        meta: {
            date: "Diperbarui: 2024",
            readTime: "5 Menit Baca",
            author: "Tim Riset Sejarah"
        }
    },
    "identitas": {
        title: "Harmoni Kota Santri",
        subtitle: "Menyelami Identitas Kultural dan Spiritual Masyarakat Pandeglang",
        image: "https://images.unsplash.com/photo-1564344586026-66236b28eb97?w=1600&q=80",
        content: [
            "Identitas Pandeglang tidak bisa dilepaskan dari julukannya sebagai 'Kota Santri'. Julukan ini bukan semata slogan, melainkan cerminan realitas sosiologis yang mengakar kuat. Ribuan pondok pesantren, baik salafi (tradisional) maupun modern, tersebar hingga ke pelosok desa, menjadikan pendidikan agama sebagai basis pembentukan karakter masyarakat.",
            "Di Pandeglang, suara lantunan ayat suci Al-Qur'an bersahutan dengan debur ombak pantai selatan, menciptakan atmosfer spiritual yang khas. Nilai-nilai religius ini teranyam rapi dengan kebudayaan lokal, melahirkan bentuk-bentuk kesenian yang unik dan bernafaskan Islam.",
            "Salah satu ikon budaya yang membanggakan adalah 'Rampak Bedug'. Kesenian ini dulunya hanya tradisi membangunkan sahur atau memeriahkan Idul Fitri di masjid-masjid. Kini, Rampak Bedug telah bertransformasi menjadi seni pertunjukan perkusi yang atraktif, memadukan ritme dinamis dengan gerakan tari yang energik, bahkan telah mendunia hingga tampil di panggung internasional.",
            "Tak kalah unik adalah 'Wayang Thengul' atau Wayang Golek khas Banten. Berbeda dengan saudaranya di Jawa Barat, Wayang Thengul memiliki ciri visual dan gaya penceritaan yang lebih egaliter dan lugas, mencerminkan karakter 'Wong Banten' yang tegas dan pemberani.",
            "Inilah Pandeglang, di mana tradisi dan religi tidak saling menegasikan, melainkan saling menguatkan, membentuk identitas masyarakat yang modern namun tetap teguh memegang prinsip."
        ],
        quote: "Di sini, tradisi dan religi tidak saling menegasikan, melainkan saling menguatkan dalam harmoni yang indah.",
        meta: {
            date: "Diperbarui: 2024",
            readTime: "4 Menit Baca",
            author: "Dinas Kebudayaan"
        }
    },
    "alam": {
        title: "Surga Biodiversitas",
        subtitle: "Menjelajahi Ujung Kulon dan Kekayaan Alam yang Mendunia",
        image: "https://images.unsplash.com/photo-1550505187-575ba9595562?w=1600&q=80",
        content: [
            "Jika surga memiliki serambi, mungkin Ujung Kulon adalah salah satunya. Taman Nasional Ujung Kulon, yang terletak di ujung paling barat semenanjung ini, adalah monumen alam yang diakui UNESCO sebagai Warisan Dunia (World Heritage Site). Hutan hujan tropis dataran rendah yang tersisa di Pulau Jawa ini menyimpan rahasia kehidupan yang tak ternilai.",
            "Di sinilah rumah terakhir bagi Badak Jawa (Rhinoceros sondaicus), mamalia besar paling langka di muka bumi. Hewan purba bercula satu ini adalah simbol ketangguhan alam Pandeglang yang harus kita jaga bersama. Keberadaannya menjadi barometer kesehatan ekosistem hutan tropis kita.",
            "Namun pesona alam Pandeglang tidak berhenti di Ujung Kulon. Tengoklah ke atas, Gunung Karang menjulang gagah setinggi 1.778 mdpl. Ia adalah paku bumi Banten, tempat para pendaki mencari ketenangan dan para peziarah mencari keberkahan di Sumur Tujuh. Lereng-lerengnya yang subur menghasilkan komoditas unggulan seperti Cengkeh, Durian Jatuhan, dan yang kini sedang naik daun: Talas Beneng.",
            "Talas Beneng adalah emas kuning dari tanah Pandeglang. Tanaman yang dulunya dianggap liar ini kini menjadi komoditas ekspor bernilai tinggi. Daunnya diolah menjadi tembakau herbal bebas nikotin yang diminati pasar Eropa, sementara umbinya menjadi sumber pangan alternatif yang sehat.",
            "Dari kedalaman hutan hingga puncak gunung, dari dasar laut hingga tanah perkebunan, alam Pandeglang adalah anugerah tak terhingga yang menawarkan kesejahteraan, asalkan kita bijak dalam mengelolanya."
        ],
        quote: "Ujung Kulon bukan hanya taman nasional, ia adalah monumen kehidupan terakhir bagi spesies purba yang bertahan melintasi zaman.",
        meta: {
            date: "Diperbarui: 2024",
            readTime: "5 Menit Baca",
            author: "National Geographic Team"
        }
    }
};

const ArticlePage = () => {
    const { lang } = useLanguage();
    const { slug } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Reading State
    const [fontSize, setFontSize] = useState("text-xl"); // text-lg, text-xl, text-2xl
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Stop any previous speech
        window.speechSynthesis.cancel();
    }, [slug]);

    const article = articles[slug];

    // TTS Setup
    useEffect(() => {
        if (!article) return;

        const textToRead = `${article.title}. ${article.subtitle}. ${article.content.join(" ")}`;
        const newUtterance = new SpeechSynthesisUtterance(textToRead);
        newUtterance.lang = "id-ID"; // Indonesian Language
        newUtterance.rate = 0.9; // Slightly slower for storytelling

        newUtterance.onend = () => setIsPlaying(false);

        setUtterance(newUtterance);

        return () => window.speechSynthesis.cancel();
    }, [article]);

    const togglePlay = () => {
        if (!utterance) return;

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    const increaseFont = () => {
        if (fontSize === "text-lg") setFontSize("text-xl");
        if (fontSize === "text-xl") setFontSize("text-2xl");
    };

    const decreaseFont = () => {
        if (fontSize === "text-2xl") setFontSize("text-xl");
        if (fontSize === "text-xl") setFontSize("text-lg");
    };

    if (!article) return <div className="min-h-screen bg-black flex items-center justify-center text-white">{lang === "ID" ? "Artikel tidak ditemukan" : "Article not found"}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-[#050505] text-white font-serif selection:bg-[#C5A065] selection:text-black"
        >
            <SEO
                title={`${article.title} | Pandeglang Explore`}
                description={article.subtitle}
                image={article.image}
            />
            <Navbar />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#C5A065] transform origin-left z-50"
                style={{ scaleX }}
            />

            {/* Reading Tools (Adaptive: Mobile Bottom Bar vs Desktop Floating) */}
            <div className={cn(
                "fixed z-40 transition-all duration-500",
                "bottom-8 right-8 flex flex-col gap-3 md:flex-col", // Desktop Default
                "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:p-4 max-md:bg-gradient-to-t max-md:from-black max-md:to-transparent max-md:flex-row max-md:justify-center max-md:items-center max-md:gap-4 max-md:safe-bottom" // Mobile Override
            )}>
                {/* Font Control Group */}
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex items-center shadow-2xl">
                    <button
                        onClick={decreaseFont}
                        className="w-10 h-10 flex items-center justify-center hover:text-[#C5A065] transition-colors"
                        title={lang === "ID" ? "Perkecil Teks" : "Decrease Text"}
                    >
                        <Minus size={16} />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <div className="px-2 flex items-center gap-1.5 min-w-[32px] justify-center">
                        <Type size={12} className="text-[#C5A065]" />
                        <span className="text-[9px] font-black uppercase font-sans">{fontSize === "text-lg" ? "S" : fontSize === "text-xl" ? "M" : "L"}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button
                        onClick={increaseFont}
                        className="w-10 h-10 flex items-center justify-center hover:text-[#C5A065] transition-colors"
                        title={lang === "ID" ? "Perbesar Teks" : "Increase Text"}
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {/* Audio Control Button */}
                <button
                    onClick={togglePlay}
                    className={cn(
                        "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border transition-all duration-500 shadow-2xl",
                        isPlaying
                            ? "bg-[#C5A065] border-[#C5A065] text-black shadow-[0_0_30px_rgba(197,160,101,0.3)]"
                            : "bg-black/90 border-white/20 text-white hover:border-[#C5A065]"
                    )}
                    title={lang === "ID" ? "Dengarkan Artikel" : "Listen to Article"}
                >
                    {isPlaying ? <Pause size={20} className="animate-pulse" /> : <Volume2 size={20} />}
                </button>
            </div>

            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 pb-12">
                    <Link to="/about" className="inline-flex items-center gap-2 text-white/60 hover:text-[#C5A065] mb-8 transition-colors font-sans text-xs uppercase tracking-widest">
                        <ArrowLeft size={14} /> {lang === "ID" ? "Kembali" : "Back"}
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 max-w-4xl"
                    >
                        {article.title}
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-2xl font-sans">
                        {article.subtitle}
                    </p>
                </div>
            </div>

            {/* Meta Data Bar */}
            <div className="border-y border-white/10 bg-[#0A0A0A]">
                <div className="container mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4 font-sans text-xs uppercase tracking-widest text-white/50">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2"><Clock size={14} /> {article.meta.readTime}</span>
                        <span className="flex items-center gap-2"><BookOpen size={14} /> {article.meta.author}</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#C5A065] transition-colors">
                        <Share2 size={14} /> {lang === "ID" ? "Bagikan" : "Share"}
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-24 max-w-3xl">
                <div className="space-y-8">
                    {/* First Drop Cap paragraph */}
                    <p className={`${fontSize === "text-2xl" ? "text-3xl" : "text-2xl"} leading-relaxed text-white/90 first-letter:text-7xl first-letter:font-bold first-letter:text-[#C5A065] first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px]`}>
                        {article.content[0]}
                    </p>

                    {/* Content Loop with Pull Quote Injection */}
                    {article.content.slice(1).map((paragraph, idx) => (
                        <React.Fragment key={idx}>
                            <p className={`${fontSize} leading-[1.8] text-white/70 font-sans font-light transition-all duration-300`}>
                                {paragraph}
                            </p>

                            {/* Inject Pull Quote after 2nd paragraph */}
                            {idx === 1 && (
                                <div className="py-12 my-8 border-y border-[#C5A065]/20 relative">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#050505] px-4 text-[#C5A065] text-4xl font-serif">"</span>
                                    <p className="text-2xl md:text-3xl font-serif text-center text-white italic leading-tight px-4 md:px-12">
                                        {article.quote}
                                    </p>
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    <div className="py-12 border-t border-white/10 mt-12 text-center">
                        <span className="text-[#C5A065] text-2xl">***</span>
                    </div>
                </div>
            </article>

            {/* Next Article Suggestion */}
            <section className="bg-[#111] py-24 text-center">
                <div className="container mx-auto px-6">
                    <span className="text-xs font-sans uppercase tracking-widest text-white/40 mb-4 block">{lang === "ID" ? "Bacaan Selanjutnya" : "Next Reading"}</span>
                    <h3 className="text-3xl font-serif text-white hover:text-[#C5A065] transition-colors cursor-pointer inline-block">
                        Menemukan Surga Tersembunyi di Pulau Peucang
                    </h3>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
};

export default ArticlePage;
