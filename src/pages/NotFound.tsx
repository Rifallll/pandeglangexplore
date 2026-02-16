
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Home, ArrowLeft, Compass, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#C5A065] selection:text-white">
      <SEO
        title={lang === "ID" ? "Halaman Tidak Ditemukan | Pandeglang Explore" : "Page Not Found | Pandeglang Explore"}
        description={lang === "ID"
          ? "Maaf, halaman yang Anda cari tidak dapat ditemukan. Kembali ke beranda untuk melanjutkan eksplorasi Pandeglang."
          : "Sorry, the page you are looking for cannot be found. Return to the homepage to continue exploring Pandeglang."}
      />
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C5A065]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C5A065]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <h1 className="text-[150px] md:text-[200px] leading-none font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#C5A065] to-[#C5A065]/20 opacity-90 select-none">
            404
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
          >
            <Compass size={250} strokeWidth={0.5} className="text-[#C5A065]" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl md:text-4xl font-serif mb-6"
        >
          {lang === "ID" ? "Anda Tersesat di " : "Lost in the "}<span className="text-[#C5A065] italic">{lang === "ID" ? "Alam Liar?" : "Wilderness?"}</span>
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/60 text-lg mb-12 max-w-md mx-auto leading-relaxed"
        >
          {lang === "ID"
            ? "Halaman yang Anda cari tidak ditemukan. Mungkin telah dipindahkan atau memang belum pernah ada di peta kami."
            : "The page you are looking for was not found. It may have been moved or never existed on our map."}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 bg-[#C5A065] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 shadow-[0_0_30px_-10px_#C5A065]"
          >
            <Home size={16} />
            <span>{lang === "ID" ? "Beranda" : "Home"}</span>
          </Link>

          <Link
            to="/peta"
            className="group flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-500 hover:border-[#C5A065]/50"
          >
            <MapPin size={16} className="text-[#C5A065]" />
            <span>{lang === "ID" ? "Lihat Peta" : "View Map"}</span>
          </Link>
        </motion.div>

        {/* Quick Links for Recovery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/5 w-full"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6 font-bold">{lang === "ID" ? "Mungkin Anda Mencari:" : "You Might Be Looking For:"}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: lang === "ID" ? "Tanjung Lesung" : "Tanjung Lesung", href: "/article/tanjung-lesung" },
              { name: lang === "ID" ? "Ujung Kulon" : "Ujung Kulon", href: "/article/ujung-kulon" },
              { name: lang === "ID" ? "Kuliner Lokal" : "Local Cuisine", href: "/kuliner" }
            ].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-xs font-semibold text-white/70 group-hover:text-[#C5A065]">{link.name}</span>
                <ArrowRight size={14} className="text-white/20 group-hover:text-[#C5A065] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-white/20 text-[10px] uppercase tracking-[0.3em]"
      >
        Pandeglang Explore &copy; 2026
      </motion.div>
    </div>
  );
};

export default NotFound;
