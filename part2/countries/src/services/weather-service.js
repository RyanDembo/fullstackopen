import axios from "axios";

const key = import.meta.env.VITE_SOME_KEY;

export const getWeather = (lat, long) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`
    )
    .then((response) => response.data);
};