
import { useState, useMemo } from 'react';
import { allDestinations, Destination } from '@/data/destinations';

export const useDestinationsSearch = () => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]); // Example range

    const filteredResults = useMemo(() => {
        return allDestinations.filter(dest => {
            const matchesQuery = dest.title.toLowerCase().includes(query.toLowerCase()) ||
                dest.location.toLowerCase().includes(query.toLowerCase()) ||
                dest.category.toLowerCase().includes(query.toLowerCase());

            const matchesCategory = activeCategory === 'all' || dest.category.toLowerCase() === activeCategory.toLowerCase();

            // Add more filter logic here as needed (price, rating, etc.)
            return matchesQuery && matchesCategory;
        });
    }, [query, activeCategory]);

    const suggestions = useMemo(() => {
        if (!query) return [];
        return allDestinations
            .filter(dest => dest.title.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map(dest => dest.title);
    }, [query]);

    return {
        query,
        setQuery,
        activeCategory,
        setActiveCategory,
        filteredResults,
        suggestions
    };
};
