import { useState } from "react";
import ShowBtn from "./ShowBtn";

const Country = ({ countryData, showCountries, onClick }) => {  
  const toShow = showCountries[countryData.cca3];

  if (!toShow) {
    return (
      <div>
        {countryData.name.common} <ShowBtn onClick={onClick} id={countryData.cca3} />
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
      </>
    );
  }
};

export default Country;
