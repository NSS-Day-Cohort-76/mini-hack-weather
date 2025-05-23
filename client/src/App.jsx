// src/App.jsx
import { useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { SailorScene } from './components/SailorScene';

export const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 className="arcade-title">🌤️ RETRO WEATHER</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
      />
      <button onClick={getWeather}>Get Weather</button>
      {weather && <WeatherCard weather={weather} />}
      {weather && <SailorScene windMph={weather.current?.wind_mph} />}
      
    </div>
  );
};
