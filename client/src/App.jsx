// src/App.jsx
import { useState } from 'react';
import { getCurrentWeather, getAstronomyData } from './services/dataAccess';
import { WeatherCard } from './components/WeatherCard';
import { SkyTracker } from './components/SkyTracker';
import { RainOverlay } from './components/RainOverlay';
import { SailorScene } from './components/SailorScene';

export const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [astro, setAstro] = useState(null);

  const getWeather = async () => {
    try {
      const weatherData = await getCurrentWeather(city);
      setWeather(weatherData);

      const astroData = await getAstronomyData(city);
      setAstro(astroData);
    } catch (err) {
      alert(err.message);
    }
  };

  const isRaining = weather?.current?.condition?.text
    ?.toLowerCase()
    .includes('rain');

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 className="arcade-title">🌤️ RETRO WEATHER</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {astro && <SkyTracker astro={astro} />}
      {weather && <WeatherCard weather={weather} />}

      {weather && <SailorScene windMph={weather.current?.wind_mph} />}

      {isRaining && <RainOverlay />}
    </div>
  );
};
