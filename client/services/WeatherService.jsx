import { apiKey } from "../src/config.js";


export const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
  );
  if (!response.ok) {
    throw new Error("City not found");
  }
  return await response.json();
};
