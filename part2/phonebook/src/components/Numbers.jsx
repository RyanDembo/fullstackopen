const Numbers = ({ search, persons }) => {
  const renderNumbers = () => {
    if (search === "") {
      return persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ));
    } else {
      return persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ));
    }
  };

  return <>{renderNumbers()}</>;
};

export default Numbers;
