import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { Suspense, lazy, useState, useEffect } from "react";
import LoadingState from "@/components/LoadingState";
import SplashScreen from "@/components/SplashScreen";
import { LanguageProvider } from "@/context/LanguageContext";
import { AudioProvider } from "@/context/AudioContext";

// Luxury Code Splitting
const Index = lazy(() => import("./pages/Index"));
const Albums = lazy(() => import("./pages/Albums"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const CulinaryPage = lazy(() => import("./pages/CulinaryPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const KalenderAcara = lazy(() => import("./pages/KalenderAcara"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const ConservationPage = lazy(() => import("./pages/ConservationPage"));
const DiscoveryStory = lazy(() => import("./pages/DiscoveryStory"));
const PocketBaseTest = lazy(() => import("./pages/PocketBaseTest"));
const NewsPage = lazy(() => import("./pages/NewsPage")); // Lazy load NewsPage
const SearchPage = lazy(() => import("./pages/SearchPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import SoundscapeWidget from "@/components/SoundscapeWidget";
import LiveStatus from "@/components/LiveStatus";
import CustomCursor from "@/components/CustomCursor";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingState />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/berita" element={<NewsPage />} /> {/* New News Route */}
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/kuliner" element={<CulinaryPage />} />
          <Route path="/peta" element={<MapPage />} />
          <Route path="/kalender" element={<KalenderAcara />} />
          <Route path="/kalender/:id" element={<EventDetail />} />
          <Route path="/konservasi" element={<ConservationPage />} />
          <Route path="/story/:id" element={<DiscoveryStory />} />
          <Route path="/pocketbase-test" element={<PocketBaseTest />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: true, // Improve touch sync
      syncTouchLerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <AudioProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AnimatePresence mode="wait">
              {showSplash ? (
                <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
              ) : (
                <motion.div
                  key="app"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Toaster />
                  <Sonner />
                  <BrowserRouter
                    basename={import.meta.env.BASE_URL}
                    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
                  >
                    <AnimatedRoutes />
                    <SoundscapeWidget />
                    <LiveStatus />
                    <CustomCursor />
                  </BrowserRouter>
                </motion.div>
              )}
            </AnimatePresence>
          </TooltipProvider>
        </QueryClientProvider>
      </AudioProvider>
    </LanguageProvider>
  );
};

export default App;
