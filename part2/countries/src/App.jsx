import { useState } from "react";
import { useEffect } from "react";
import Search from "./components/Search";
import Country from "./components/Country";
import countryService from "./services/country-service";
function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    //get all countries, put it in set countries state
    countryService.getAllCountries().then((data) => {
      setCountries(data);
      setShowCountries(
        data.reduce((accu, curr, i, data) => {
          const id = data[i].cca3;
          return { ...accu, [id]: false };
        }, {})
      );
      console.log(data);
    });
  }, []);
  const onUpdateSearch = (e) => {
    setSearch(e.target.value);
  };

  const onShowBtnClick = (id) => {
    setShowCountries({ ...showCountries, [id]: true });
  };

  const renderCountries = () => {
    const toRender = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    // console.log(search);
    // console.log(toRender);
    if (toRender.length > 10 && search.length > 0) {
      return <div>Too many countries, please narrow down your search!</div>;
    }

    if (toRender.length === 1) {
      return (
        <Country
          countryData={toRender[0]}
          onClick={onShowBtnClick}
          showCountries={showCountries}
          override = {true}
        />
      );
    } else {
      return toRender.map((country) => (
        <Country
          key={country.cca3}
          countryData={country}
          onClick={onShowBtnClick}
          showCountries={showCountries}
          override={false}
        />
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
