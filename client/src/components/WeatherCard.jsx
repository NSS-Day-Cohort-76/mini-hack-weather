// src/components/WeatherCard.jsx
import './WeatherCard.css';

export const WeatherCard = ({ weather }) => {
  // Guard-rail so we don’t crash while data is loading or on API errors
  if (!weather?.location || !weather?.current) {
    return <p className="weather-card__empty">Waiting for weather data… 🕹️</p>;
  }

  // Destructure what we need
  const {
    location: { name, region },
    current: {
      temp_c,
      temp_f,
      feelslike_c,
      wind_kph,
      wind_dir,
      cloud,
      humidity,
      uv,
      condition: { text: conditionText, icon },
    },
  } = weather;

  return (
    <div className="weather-card">
      <h2 className="weather-card__title">
        {name}, {region}
      </h2>

      <img
        className="weather-card__icon"
        src={`https:${icon}`}
        alt={conditionText}
      />

      <p className="weather-card__condition">{conditionText}</p>

      <ul className="weather-card__stats">
        <li>
          🌡️ {temp_c}°C / {temp_f}°F
        </li>
        <li>🥵 Feels like {feelslike_c}°C</li>
        <li>
          💨 {wind_kph} kph ({wind_dir})
        </li>
        <li>☁️ Cloud {cloud}%</li>
        <li>💧 Humidity {humidity}%</li>
        <li>🔆 UV {uv}</li>
      </ul>
    </div>
  );
};
