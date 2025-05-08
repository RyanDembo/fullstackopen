const Country = ({ countryData, toShow }) => {
  if (!toShow) {
    return <div>{countryData.name.common}</div>;
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
