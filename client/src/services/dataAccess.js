// src/services/dataAccess.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async (city) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  );
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return data;
};

export const getAstronomyData = async (city) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${city}&dt=today`
  );
  if (!res.ok) throw new Error('Astronomy fetch failed');
  const data = await res.json();
  return data.astronomy.astro;
};
