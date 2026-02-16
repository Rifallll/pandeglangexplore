import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article" | "tourist_attraction";
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    keywords?: string;
    canonicalUrl?: string;
    location?: string;
    rating?: number;
}

const SEO = ({
    title,
    description,
    image = "/og-image.png",
    type = "website",
    author,
    publishedTime,
    modifiedTime,
    keywords,
    canonicalUrl
}: SEOProps) => {
    const { lang } = useLanguage();

    const defaultTitle = lang === "ID" ? "Eksplor Pandeglang | Pintu Gerbang Petualangan" : "Pandeglang Explore | The Gateway to Adventure";
    const defaultDesc = lang === "ID"
        ? "Temukan keajaiban alam, budaya, dan kuliner Pandeglang. Dari Ujung Kulon hingga Tanjung Lesung, petualangan tak terlupakan menanti Anda."
        : "Discover the wonders of Pandeglang's nature, culture, and culinary. From Ujung Kulon to Tanjung Lesung, unforgettable adventures await you.";

    const defaultKeywords = lang === "ID"
        ? "Pandeglang, wisata Pandeglang, Ujung Kulon, Tanjung Lesung, Badak Jawa, wisata Banten, pantai Pandeglang, kuliner Pandeglang"
        : "Pandeglang, Pandeglang tourism, Ujung Kulon, Tanjung Lesung, Javan Rhino, Banten tourism, Pandeglang beaches, Pandeglang culinary";

    const finalTitle = title || defaultTitle;
    const finalDesc = description || defaultDesc;
    const finalKeywords = keywords || defaultKeywords;
    const siteUrl = "https://pandeglangexplore.com";
    const finalCanonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);
    const finalImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    useEffect(() => {
        // Update Document Title
        document.title = finalTitle;

        // Helper function to update or create meta tag
        const updateMeta = (selector: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attribute}="${selector}"]`);
            if (meta) {
                meta.setAttribute("content", content);
            } else {
                meta = document.createElement("meta");
                meta.setAttribute(attribute, selector);
                meta.setAttribute("content", content);
                document.head.appendChild(meta);
            }
        };

        // Basic Meta Tags
        updateMeta("description", finalDesc);
        updateMeta("keywords", finalKeywords);
        updateMeta("author", author || "Pandeglang Explore");

        // Open Graph Tags
        updateMeta("og:title", finalTitle, true);
        updateMeta("og:description", finalDesc, true);
        updateMeta("og:image", finalImage, true);
        updateMeta("og:url", finalCanonical, true);
        updateMeta("og:type", type, true);
        updateMeta("og:site_name", "Pandeglang Explore", true);
        updateMeta("og:locale", lang === "ID" ? "id_ID" : "en_US", true);

        // Twitter Card Tags
        updateMeta("twitter:card", "summary_large_image");
        updateMeta("twitter:title", finalTitle);
        updateMeta("twitter:description", finalDesc);
        updateMeta("twitter:image", finalImage);
        updateMeta("twitter:site", "@PandeglangExplore");
        updateMeta("twitter:creator", "@PandeglangExplore");

        // Article-specific tags
        if (type === "article") {
            if (publishedTime) updateMeta("article:published_time", publishedTime, true);
            if (modifiedTime) updateMeta("article:modified_time", modifiedTime, true);
            if (author) updateMeta("article:author", author, true);
        }

        // Canonical URL
        let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (linkCanonical) {
            linkCanonical.href = finalCanonical;
        } else {
            linkCanonical = document.createElement("link");
            linkCanonical.rel = "canonical";
            linkCanonical.href = finalCanonical;
            document.head.appendChild(linkCanonical);
        }

        // Structured Data (JSON-LD)
        let structuredData: Record<string, unknown> = {
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            "name": "Pandeglang Explore",
            "description": finalDesc,
            "url": siteUrl,
            "logo": `${siteUrl}/logo.png`,
            "image": finalImage,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pandeglang",
                "addressRegion": "Banten",
                "addressCountry": "ID"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-6.3",
                "longitude": "105.8"
            }
        };

        if (type === "tourist_attraction") {
            structuredData = {
                "@context": "https://schema.org",
                "@type": "TouristAttraction",
                "name": finalTitle,
                "description": finalDesc,
                "image": finalImage,
                "url": finalCanonical,
                "location": {
                    "@type": "Place",
                    "name": location || "Pandeglang",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Pandeglang",
                        "addressRegion": "Banten",
                        "addressCountry": "ID"
                    }
                }
            };
        }

        // Remove existing structured data
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Add new structured data
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

    }, [finalTitle, finalDesc, finalImage, finalKeywords, finalCanonical, type, author, publishedTime, modifiedTime, lang]);

    return null;
};

export default SEO;
