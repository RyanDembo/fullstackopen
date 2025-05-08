import axios from "axios";

const getAllCountries = () => {
  return axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => response.data);
};

const getCountry = (countryName) => {
    return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then((response) => response.data);
}

export default {getAllCountries, getCountry};
