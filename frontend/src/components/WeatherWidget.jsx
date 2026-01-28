import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
    // Initial State
    const [weather, setWeather] = useState({
        temp: '--',
        conditionCode: 0,
        conditionText: 'Loading...',
        isDay: 1, // 1 = Day, 0 = Night
        location: 'Kharga Oasis',
    });
    const [advice, setAdvice] = useState('Fetching latest weather...');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Open-Meteo API Call (No Key Required)
                const response = await axios.get(
                    'https://api.open-meteo.com/v1/forecast?latitude=25.4390&longitude=30.5586&current_weather=true'
                );

                const data = response.data.current_weather;
                const temp = data.temperature;
                const code = data.weathercode;
                const isDay = data.is_day;

                // Update Weather State
                setWeather({
                    temp: temp,
                    conditionCode: code,
                    conditionText: getWeatherConditionText(code),
                    isDay: isDay,
                    location: 'Kharga Oasis'
                });

                // Generate Advice based on new data
                setAdvice(generateAdvice(temp, code));

            } catch (error) {
                console.error("Error fetching weather:", error);
                setAdvice("Could not load weather data. Please try again.");
                setWeather(prev => ({ ...prev, temp: 'N/A', conditionText: 'Error' }));
            }
        };

        fetchWeather();
    }, []);

    // Helper: Map WMO codes to text
    const getWeatherConditionText = (code) => {
        if (code === 0) return 'Clear Sky';
        if (code === 1) return 'Mainly Clear';
        if (code === 2) return 'Partly Cloudy';
        if (code === 3) return 'Overcast';
        if (code > 45) return 'Fog/Rain'; // Simplified for this use case
        return 'Unknown';
    };

    // Helper: Smart Advice Logic
    const generateAdvice = (temp, code) => {
        // Priority 1: Temperature Extremes
        if (temp > 35) return "⚠️ High Heat Alert. Stay hydrated.";
        if (temp < 15) return "🧥 It's cold. Bring a jacket.";

        // Priority 2: Condition Codes
        if (code === 0 || code === 1) return "☀️ Sunny & Clear. Don't forget sunglasses!";
        if (code === 2 || code === 3) return "☁️ Perfect weather for a walking tour.";
        if (code > 45) return "🌫️ Visibility might be low.";

        return "Enjoy the oasis weather!";
    };

    // Helper: Icon Selection
    const getIcon = () => {
        const { conditionCode, isDay } = weather;

        if (conditionCode === 0 || conditionCode === 1) return isDay ? '☀️' : '🌙';
        if (conditionCode === 2) return isDay ? '⛅' : '☁️';
        if (conditionCode === 3) return '☁️';
        if (conditionCode > 45) return '🌧️'; // Catch-all for rain/fog
        return '🌤️';
    };

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-lg w-full max-w-sm animate-fade-in hover:bg-white/20 transition duration-300 transform hover:scale-105">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-bold drop-shadow-md">{weather.location}, EG</h3>
                    <p className="text-xs text-gray-200 opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="text-3xl filter drop-shadow-sm">{getIcon()}</div>
            </div>

            <div className="flex items-center gap-2 mb-3">
                <span className="text-4xl font-bold tracking-tighter drop-shadow-lg">{weather.temp}°C</span>
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {weather.conditionText}
                </span>
            </div>

            <div className="bg-gradient-to-r from-orange-500/80 to-pink-500/80 p-3 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
                <p className="text-sm font-medium leading-relaxed">
                    💡 {advice}
                </p>
            </div>
        </div>
    );
};

export default WeatherWidget;
