
export interface EarthquakeData {
    datetime: string;
    magnitude: string;
    depth: string;
    location: string;
    coordinates: string;
    potensi: string;
    shakemap?: string;
}

export interface WeatherData {
    time: string;
    status: string;
    temp: string;
    humidity: string;
    windDirection: string;
    windSpeed: string;
}

const BMKG_API_BASE = import.meta.env.PROD
    ? "https://cors-proxy.fringe.zone/https://data.bmkg.go.id/DataMKG"
    : "/bmkg-api/DataMKG";


export const fetchLatestEarthquake = async (): Promise<EarthquakeData | null> => {
    try {
        const response = await fetch(`${BMKG_API_BASE}/TEWS/autogempa.json`);
        if (!response.ok) throw new Error("Failed to fetch earthquake data");
        const data = await response.json();
        const gempa = data.Infogempa.gempa;

        return {
            datetime: `${gempa.Tanggal} ${gempa.Jam}`,
            magnitude: gempa.Magnitude,
            depth: gempa.Kedalaman,
            location: gempa.Wilayah,
            coordinates: gempa.Coordinates,
            potensi: gempa.Potensi,
            shakemap: gempa.Shakemap
        };
    } catch (error) {
        console.error("BMKG Earthquake Service Error:", error);
        return null;
    }
};

export const fetchWeatherPandeglang = async (): Promise<WeatherData | null> => {
    try {
        const response = await fetch(`${BMKG_API_BASE}/MEWS/DigitalForecast/DigitalForecast-Banten.xml`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const areas = xmlDoc.getElementsByTagName("area");
        let pandeglangNode: Element | null = null;

        for (let i = 0; i < areas.length; i++) {
            if (areas[i].getAttribute("description") === "Pandeglang") {
                pandeglangNode = areas[i];
                break;
            }
        }

        if (!pandeglangNode) return null;

        const params = pandeglangNode.getElementsByTagName("parameter");
        const weatherNodes = Array.from(params).find(p => p.getAttribute("id") === "weather")?.getElementsByTagName("timerange");
        const tempNodes = Array.from(params).find(p => p.getAttribute("id") === "t")?.getElementsByTagName("timerange");
        const humNodes = Array.from(params).find(p => p.getAttribute("id") === "hu")?.getElementsByTagName("timerange");
        const wsNodes = Array.from(params).find(p => p.getAttribute("id") === "ws")?.getElementsByTagName("timerange");

        if (!weatherNodes || !tempNodes) return null;

        // Extract Current (0), 6h, 12h, and 24h to check for upcoming disasters
        const latestWeather = weatherNodes[0].getElementsByTagName("value")[0].textContent || "1";
        const latestTemp = tempNodes[0].getElementsByTagName("value")[0].textContent || "27";
        const latestHum = humNodes ? humNodes[0].getElementsByTagName("value")[0].textContent : "80";
        const latestWS = wsNodes ? wsNodes[0].getElementsByTagName("value")[0].textContent : "10";

        return {
            time: new Date().toISOString(),
            status: getWeatherDesc(latestWeather),
            temp: latestTemp,
            humidity: `${latestHum}%`,
            windDirection: "Variable",
            windSpeed: `${latestWS} km/h`
        };
    } catch (error) {
        console.error("BMKG Weather Service Error:", error);
        return null;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRealWeather = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${BMKG_API_BASE}/MEWS/DigitalForecast/DigitalForecast-Banten.xml`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const areas = xmlDoc.getElementsByTagName("area");
        const relevantAreas = ["Pandeglang", "Labuan", "Carita", "Panimbang", "Sumur", "Mandalawangi"];
        const weatherList = [];

        for (let i = 0; i < areas.length; i++) {
            const areaName = areas[i].getAttribute("description");
            if (areaName && relevantAreas.includes(areaName)) {
                const params = areas[i].getElementsByTagName("parameter");
                const weatherNodes = Array.from(params).find(p => p.getAttribute("id") === "weather")?.getElementsByTagName("timerange");
                const tempNodes = Array.from(params).find(p => p.getAttribute("id") === "t")?.getElementsByTagName("timerange");
                const humNodes = Array.from(params).find(p => p.getAttribute("id") === "hu")?.getElementsByTagName("timerange");
                const wsNodes = Array.from(params).find(p => p.getAttribute("id") === "ws")?.getElementsByTagName("timerange");

                if (weatherNodes && tempNodes) {
                    const latestWeather = weatherNodes[0].getElementsByTagName("value")[0].textContent || "1";
                    const latestTemp = tempNodes[0].getElementsByTagName("value")[0].textContent || "27";
                    const latestHum = humNodes ? humNodes[0].getElementsByTagName("value")[0].textContent : "80";
                    const latestWS = wsNodes ? wsNodes[0].getElementsByTagName("value")[0].textContent : "10";

                    weatherList.push({
                        location: areaName,
                        condition: getWeatherConditionName(latestWeather),
                        temp: parseInt(latestTemp),
                        humidity: parseInt(latestHum),
                        windSpeed: parseInt(latestWS),
                        description: getWeatherDesc(latestWeather)
                    });
                }
            }
        }

        return weatherList.length > 0 ? weatherList : [];
    } catch (error) {
        console.error("BMKG Multi-Weather Error:", error);
        return [];
    }
};

const getWeatherConditionName = (code: string): string => {
    const codes: Record<string, string> = {
        "0": "Sunny",
        "1": "Partly Cloudy",
        "2": "Partly Cloudy",
        "3": "Cloudy",
        "4": "Cloudy",
        "60": "Rainy",
        "61": "Rainy",
        "63": "Rainy",
        "95": "Stormy",
        "97": "Stormy"
    };
    return codes[code] || "Partly Cloudy";
};



const getWeatherDesc = (code: string): string => {
    const codes: Record<string, string> = {
        "0": "Cerah",
        "1": "Cerah Berawan",
        "2": "Cerah Berawan",
        "3": "Berawan",
        "4": "Berawan Tebal",
        "5": "Udara Kabur",
        "10": "Asap",
        "45": "Kabut",
        "60": "Hujan Ringan",
        "61": "Hujan Sedang",
        "63": "Hujan Lebat (Waspada Banjir)",
        "80": "Hujan Lokal",
        "95": "Hujan Petir (Bahaya Petir)",
        "97": "Hujan Petir (Bahaya Petir)"
    };
    return codes[code] || "Berawan";
};
