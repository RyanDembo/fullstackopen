import { useState } from "react";
import ShowBtn from "./ShowBtn";
import Weather from "./Weather";
const Country = ({ countryData, showCountries, onClick, override}) => {
  const toShow = showCountries[countryData.cca3];
  try {
    var lat = countryData.capitalInfo.latlng[0];
    var long = countryData.capitalInfo.latlng[1];
  } catch (error) {
    var lat=null, long=null;
  }

  if (!toShow && !override ) {
    return (
      <div>
        {countryData.name.common}{" "}
        <ShowBtn onClick={onClick} id={countryData.cca3} />
      </div>
    );
  } else {
    return (
      <>
        <h1>{countryData.name.common}</h1>
        <div>Capital: {countryData.capital[0]}</div>
        <div>Area: {countryData.area}</div>

        <h2>Languages</h2>
        <ul>
          {Object.values(countryData.languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
        <div>
          <img
            src={countryData.flags.png}
            alt={`Flag of ${countryData.name.common}`}
          />
        </div>
        <h2>Weather in {countryData.capital[0]}</h2>
        <Weather lat={lat} long={long}/>
      </>
    );
  }
};

export default Country;
