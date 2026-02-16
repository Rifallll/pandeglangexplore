
import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
    current: {
        temperature: number;
        weatherCode: number;
        windSpeed: number;
        time: Date;
    };
    hourly: {
        time: Date[];
        temperature: number[];
        precipitation: number[];
        uvIndex: number[];
    };
    daily: {
        time: Date[];
        weatherCode: number[];
        temperatureMax: number[];
        temperatureMin: number[];
        sunrise: Date[];
        sunset: Date[];
    };
    marine?: {
        waveHeight: number;
    };
}

export const getWeather = async (lat: number | number[], lng: number | number[]): Promise<WeatherData[] | null> => {
    const params = {
        latitude: lat,
        longitude: lng,
        current: ["temperature_2m", "weather_code", "wind_speed_10m"],
        hourly: ["temperature_2m", "precipitation", "uv_index"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
        timezone: "auto",
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    try {
        const responses = await fetchWeatherApi(url, params);

        return responses.map((response, idx) => {
            // Current values
            const currentData = response.current();
            const hourly = response.hourly();
            const daily = response.daily();

            if (!currentData || !hourly || !daily) {
                console.warn(`Missing weather data sections for coordinate index ${idx}`, { currentData, hourly, daily });
                // Return a dummy object if data is missing for one location in a batch
                return {
                    current: { temperature: 0, weatherCode: 0, windSpeed: 0, time: new Date() },
                    hourly: { time: [], temperature: [], precipitation: [], uvIndex: [] },
                    daily: { time: [], weatherCode: [], temperatureMax: [], temperatureMin: [], sunrise: [], sunset: [] }
                };
            }

            // Helper to get time range
            const range = (start: number, stop: number, step: number) =>
                Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

            // Safely extract variables by index with fallback
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const getVar = (obj: any, index: number) => {
                try {
                    const variable = obj.variables(index);
                    if (!variable) return null;
                    return variable;
                } catch (e) {
                    console.warn(`Error extracting variable at index ${index}`, e);
                    return null;
                }
            };

            // Fix: Open-Meteo SDK returns timestamps in UTC seconds as BigInt
            const toDate = (t: bigint | number | null | undefined) => {
                if (t === null || t === undefined) return new Date(0);
                const val = Number(t);
                if (isNaN(val) || val === 0) return new Date(0);
                return new Date(val * 1000);
            };

            // FAIL-SAFE: If API returns Fahrenheit despite request, convert it manually.
            // Threshold: 55°C is world record territory. Anything above is likely F.
            const sanitizeTemp = (val: number) => {
                if (val > 55) {
                    return Math.round((val - 32) * (5 / 9));
                }
                return Math.round(val);
            };

            return {
                current: {
                    temperature: sanitizeTemp(getVar(currentData, 0)?.value() ?? 0),
                    weatherCode: getVar(currentData, 1)?.value() ?? 0,
                    windSpeed: Math.round(getVar(currentData, 2)?.value() ?? 0),
                    time: toDate(currentData.time()),
                },
                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(toDate),
                    temperature: Array.from(getVar(hourly, 0)?.valuesArray() ?? new Float32Array()).map((t: number) => sanitizeTemp(t)),
                    precipitation: Array.from(getVar(hourly, 1)?.valuesArray() ?? new Float32Array()) as number[],
                    uvIndex: Array.from(getVar(hourly, 2)?.valuesArray() ?? new Float32Array()) as number[],
                },
                daily: {
                    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(toDate),
                    weatherCode: Array.from(getVar(daily, 0)?.valuesArray() ?? new Float32Array()) as number[],
                    temperatureMax: Array.from(getVar(daily, 1)?.valuesArray() ?? new Float32Array()).map((t: number) => sanitizeTemp(t)),
                    temperatureMin: Array.from(getVar(daily, 2)?.valuesArray() ?? new Float32Array()).map((t: number) => sanitizeTemp(t)),
                    sunrise: Array.from(getVar(daily, 3)?.valuesArray() ?? new BigInt64Array()).map(toDate),
                    sunset: Array.from(getVar(daily, 4)?.valuesArray() ?? new BigInt64Array()).map(toDate),
                }
            };
        });
    } catch (error) {
        // Weather is optional feature - silent fail
        return null;
    }
};

export const getMarineWeather = async (lat: number, lng: number) => {
    const params = {
        latitude: lat,
        longitude: lng,
        current: ["wave_height"],
        timezone: "auto",
    };
    const url = "https://marine-api.open-meteo.com/v1/marine";

    try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        const current = response.current();

        if (!current) return null;

        return {
            waveHeight: current.variables(0)!.value()
        };
    } catch (error) {
        // Marine API might fail for inland locations, this is expected
        return null;
    }
};

export const getWeatherDescription = (code: number): string => {
    const codes: Record<number, string> = {
        0: "Cerah",
        1: "Cerah Berawan",
        2: "Berawan",
        3: "Mendung",
        45: "Berkabut",
        48: "Kabut Es",
        51: "Gerimis Ringan",
        53: "Gerimis Sedang",
        55: "Gerimis Lebat",
        61: "Hujan Ringan",
        63: "Hujan Sedang",
        65: "Hujan Lebat",
        80: "Hujan Lokal",
        81: "Hujan Deras",
        82: "Hujan Badai",
        95: "Badai Petir",
        96: "Badai Petir Ringan",
        99: "Badai Petir Berat"
    };
    return codes[code] || "Tidak Diketahui";
};

export const getWeatherIcon = (code: number) => {
    // Simple mapping to generic names that can be used to pick Lucide icons or similar in the component
    if (code === 0) return "sun";
    if (code >= 1 && code <= 3) return "cloud-sun";
    if (code >= 45 && code <= 48) return "cloud-fog";
    if (code >= 51 && code <= 67) return "cloud-rain";
    if (code >= 80 && code <= 99) return "cloud-lightning";
    return "cloud";
}
