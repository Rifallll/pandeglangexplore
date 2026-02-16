import { allDestinations } from '../data/destinations';

export interface WeatherData {
    temp: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Partly Cloudy' | 'Stormy';
    location: string;
    humidity: number;
    windSpeed: number;
}

// Extract unique sub-districts (Kecamatan)
const subDistricts = Array.from(new Set(allDestinations.map(d => d.location))).map(loc => ({
    name: loc,
    baseTemp: 28, // Default for towns
    type: 'District'
}));

// Extract all tourist spots with custom temp based on category
const spots = allDestinations.map(d => {
    let baseTemp = 29;

    // Cooler for nature/mountains/waterfalls
    if (['Mountain', 'Nature', 'Waterfall', 'Scenery'].includes(d.category)) {
        baseTemp = 24;
    }
    // Warmer for beaches and islands
    if (['Beach', 'Island'].includes(d.category)) {
        baseTemp = 31;
    }

    return {
        name: d.title,
        baseTemp,
        type: 'Spot'
    };
});

// Combine and shuffle slightly for variety
export const mockLocations = [...subDistricts, ...spots].sort(() => Math.random() - 0.5);

export const getCurrentWeather = async (): Promise<WeatherData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get random location
    const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];

    return generateMockWeather(location);
};

export const getWeatherForLocation = async (locationName: string): Promise<WeatherData> => {
    const location = mockLocations.find(l => l.name === locationName) || mockLocations[0];
    return generateMockWeather(location);
}

const generateMockWeather = (location: { name: string, baseTemp: number }): WeatherData => {
    // Simulate random variations
    const conditions: WeatherData['condition'][] = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'];
    // Bias towards sunny/cloudy (it's a beach destination!)
    const condition = Math.random() > 0.3 ?
        (Math.random() > 0.5 ? 'Sunny' : 'Partly Cloudy') :
        conditions[Math.floor(Math.random() * conditions.length)];

    return {
        location: location.name,
        temp: location.baseTemp + Math.floor(Math.random() * 3) - 1, // Random variation +/- 1
        condition,
        humidity: 70 + Math.floor(Math.random() * 20),
        windSpeed: 10 + Math.floor(Math.random() * 15),
    };
}
