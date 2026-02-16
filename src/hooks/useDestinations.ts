import { useState, useEffect } from 'react';
import { allDestinations } from '@/data/destinations';
import { Destination } from '@/services/pocketbase';

export const useDestinations = () => {
    // Directly use the imported static data
    // We wrap it in state to maintain the same API surface (async simulation if needed, but synchronous is fine)
    const [destinations, setDestinations] = useState<Destination[]>(allDestinations as unknown as Destination[]);
    const [loading, setLoading] = useState(false); // No loading needed for static data
    const [error, setError] = useState<string | null>(null);

    // No useEffect needed effectively, but kept if we want to simulate async loading later
    // or if we switch back to API. For now, it's instant.

    return { destinations, loading, error };
};
