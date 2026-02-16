import PocketBase from 'pocketbase';

// Initialize PocketBase
export const pb = new PocketBase('http://127.0.0.1:8090');

// Disable auto cancellation
pb.autoCancellation(false);

// Types
export interface Destination {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    image?: string;
    price?: string;
    rating?: number;
    created: string;
    updated: string;
}

// Helper: Get image URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImageUrl = (record: any, filename: string) => {
    if (!filename) return '';
    return pb.files.getUrl(record, filename);
};

// Fetch all destinations
export const getDestinations = async (): Promise<Destination[]> => {
    try {
        const records = await pb.collection('destinations').getList<Destination>(1, 50);
        return records.items;
    } catch (error) {
        console.error('Failed to fetch destinations:', error);
        return [];
    }
};
