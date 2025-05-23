import { React, useState } from "react";
import { apiKey } from "../../src/config";
import "./WeatherCard.css";
import { useNavigate } from "react-router-dom";

export const WeatherCard = () => {
  const [city, setCity] = useState("Nashville");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found or API error.");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-card">
      <h2>Weather App</h2>
      <button className="button" onClick={()=>navigate(`/favorites`)}>Favorites</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p className="weather-loading">Loading...</p>}
      {error && <p className="weather-error">Error: {error}</p>}

      {weather && (
        <>
          <h2>Weather in {weather.location.name}, {weather.location.region}</h2>
          <p className="weather-condition">{weather.current.condition.text}</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            className="weather-icon"
          />
          <p>Temp: {weather.current.temp_f}°F</p>
          <p>Feels Like: {weather.current.feelslike_f}°F</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_mph} mph {weather.current.wind_dir}</p>
        </>
      )}
    </div>
  );
};

