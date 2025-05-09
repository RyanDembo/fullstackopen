import { useEffect, useState } from "react";
import { getWeather } from "../services/weather-service";

const Weather = ({ lat, long }) => {

if (!lat || !long){
    return <div>Capital Location Not determined </div>
}

  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getWeather(lat, long).then((weatherData) => {
      const data = weatherData;
      setWeather({
        temp: data.main.temp,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        description: data.weather[0].description
      });
    });
  }, []);

  if (weather === null) {
    return null;
  } else {
    return (
      <>
        <div>Temperature: {weather.temp} Fahrenheit</div>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
        <div>Wind: {weather.wind} mph</div>
        <br />
      </>
    );
  }
};

export default Weather;