import { useState } from "react";
import { useEffect } from "react";
import Search from "./components/Search";
import Country from "./components/Country";
import countryService from "./services/country-service";
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //get all countries, put it in set countries state
    countryService
      .getAllCountries()
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
    },[])   
  const onUpdateSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderCountries = () => {
    const toRender = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    // console.log(search);
    // console.log(toRender);
    if (toRender.length > 10 && search.length > 0 ){
      return <div>Too many countries, please narrow down your search!</div>
    }

    if (toRender.length === 1) {
      return <Country toShow={true} countryData={toRender[0]} />;
    } else {
      return toRender.map((country) => (
        <Country key={country.cca3} toShow={false} countryData={country} />
      ));
    }
  };

  return (
    <>
      <div>
        find countries{" "}
        <Search searchTerm={search} onUpdateSearch={onUpdateSearch} />
      </div>
      {renderCountries()}
    </>
  );
}

export default App;
