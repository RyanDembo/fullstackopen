const Country = ({ countryData, toShow }) => {
  if (!toShow) {
    return <div>{countryData.name.common}</div>;
  }
  return <div> to implement </div>;
};

export default Country;
