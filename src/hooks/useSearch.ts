import { useState, useMemo } from 'react';

export interface SearchResult {
    id: string;
    type: 'destination' | 'article' | 'event';
    title: string;
    description: string;
    category?: string;
    location?: string;
    link: string;
    image?: string;
}

export const useSearch = (query: string, data: SearchResult[]) => {
    const [isSearching, setIsSearching] = useState(false);

    const results = useMemo(() => {
        if (!query || query.trim().length < 2) {
            return [];
        }

        setIsSearching(true);
        const searchTerm = query.toLowerCase().trim();

        const filtered = data.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descMatch = item.description.toLowerCase().includes(searchTerm);
            const categoryMatch = item.category?.toLowerCase().includes(searchTerm);
            const locationMatch = item.location?.toLowerCase().includes(searchTerm);

            return titleMatch || descMatch || categoryMatch || locationMatch;
        });

        // Sort by relevance (title match first)
        const sorted = filtered.sort((a, b) => {
            const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
            const bTitleMatch = b.title.toLowerCase().includes(searchTerm);

            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            return 0;
        });

        setIsSearching(false);
        return sorted;
    }, [query, data]);

    // Group results by type
    const groupedResults = useMemo(() => {
        return {
            destinations: results.filter(r => r.type === 'destination'),
            articles: results.filter(r => r.type === 'article'),
            events: results.filter(r => r.type === 'event'),
        };
    }, [results]);

    return {
        results,
        groupedResults,
        isSearching,
        totalResults: results.length,
    };
};
