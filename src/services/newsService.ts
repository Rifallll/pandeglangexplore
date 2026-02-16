export interface NewsItem {
    title: string;
    link: string;
    source: string;
    pubDate: string;
    description: string;
}

export const fetchRegionalNews = async (lang: "ID" | "EN"): Promise<NewsItem[]> => {
    // High-Prestige Mock Service (Simulating real Pandeglang News pulse)
    const news: NewsItem[] = [
        {
            title: lang === "ID" ? "Festival Tanjung Lesung Berlangsung Meriah" : "Tanjung Lesung Festival Held Successfully",
            link: "https://pandeglangkab.go.id",
            source: "Pandeglang News",
            pubDate: new Date().toISOString(),
            description: lang === "ID" ? "Berbagai atraksi seni dan budaya dipamerkan di kawasan ekonomi khusus Tanjung Lesung, menarik ribuan wisatawan." : "Various cultural and artistic attractions were displayed at the Tanjung Lesung Special Economic Zone, attracting thousands of tourists."
        },
        {
            title: lang === "ID" ? "Upaya Konservasi Badak Jawa di Ujung Kulon Ditingkatkan" : "Javan Rhino Conservation Efforts in Ujung Kulon Boosted",
            link: "https://ujungkulon.org",
            source: "Conservation Hub",
            pubDate: new Date().toISOString(),
            description: lang === "ID" ? "Pemerintah daerah bersama pihak balai taman nasional memperkuat pengawasan di zona inti habitat Badak Jawa." : "Local government and national park authorities are strengthening supervision in the core habitat zone of the Javan Rhino."
        },
        {
            title: lang === "ID" ? "Akses Wisata Menuju Curug Putri Carita Kini Lebih Nyaman" : "Tourist Access to Curug Putri Carita is Now More Comfortable",
            link: "https://wisatabanten.com",
            source: "Banten Pulse",
            pubDate: new Date().toISOString(),
            description: lang === "ID" ? "Perbaikan infrastruktur jalan menuju destinasi 'Little Grand Canyon' Banten ini telah rampung, memberikan kenyamanan ekstra bagi pengunjung." : "Road infrastructure improvements to Banten's 'Little Grand Canyon' destination have been completed, providing extra comfort for visitors."
        }
    ];

    return new Promise(resolve => setTimeout(() => resolve(news), 800));
};
