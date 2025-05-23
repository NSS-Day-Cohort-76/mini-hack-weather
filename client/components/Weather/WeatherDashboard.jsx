import { useEffect, useState } from "react";
import { fetchWeather } from "../../services/WeatherService";
import { getCities, addCity, deleteCity } from "../../services/CitiesServive";

export const WeatherDashboard = () => {
  const [cityInput, setCityInput] = useState("");          
  const [savedCities, setSavedCities] = useState([]);      
  const [weatherData, setWeatherData] = useState({});     
  
  useEffect(() => {
    async function loadCities() {
      const cities = await getCities();
      setSavedCities(cities);

      for (const city of cities) {
        const data = await fetchWeather(city.name);
        setWeatherData(prev => ({ ...prev, [city.name]: data }));
      }
    }

    loadCities();
  }, []);

 
  async function handleAddCity(event) {
    event.preventDefault();
    const newCity = cityInput.trim();

 
    if (!newCity || savedCities.some(c => c.name.toLowerCase() === newCity.toLowerCase())) {
      return;
    }

   
    const addedCity = await addCity(newCity);
    setSavedCities(prev => [...prev, addedCity]);

 
    const data = await fetchWeather(newCity);
    setWeatherData(prev => ({ ...prev, [newCity]: data }));

    setCityInput(""); 
  }


  async function handleDeleteCity(id, name) {
    await deleteCity(id);
    setSavedCities(prev => prev.filter(city => city.id !== id));

  
    setWeatherData(prev => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }

  return (
    <div className="weather-card">
      <h2>Weather Favorites</h2>

      <form onSubmit={handleAddCity}>
        <input
          type="text"
          placeholder="Enter a city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div>
        {savedCities.length === 0 && <p>No cities saved yet.</p>}

        {savedCities.map((city) => {
          const data = weatherData[city.name];

          return data ? (
            <div key={city.id} className="city-weather-card">
              <h3>{data.location.name}, {data.location.country}</h3>
              <p>{data.current.condition.text}</p>
              <img
                src={`https:${data.current.condition.icon}`}
                alt={data.current.condition.text}
              />
              <p>Temperature: {data.current.temp_f}°F</p>
              <button onClick={() => handleDeleteCity(city.id, city.name)}>Remove</button>
            </div>
          ) : (
            <p key={city.id}>Loading weather for {city.name}...</p>
          );
        })}
      </div>
    </div>
  );
}